import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { ImageAnnotatorClient, protos } from '@google-cloud/vision';
import { VertexAI } from '@google-cloud/vertexai';
import dotenv from 'dotenv';

import { responseSchema } from './responseSchema';

dotenv.config();

const app = express();
const port = 3001;

// For requests from frontend
app.use(cors());
app.use(express.json());

// File handler
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
});

// Initialise Google Cloud Vision API client and VertexAI client
const visionClient = new ImageAnnotatorClient();
const vertexAI = new VertexAI({
    project: process.env.GOOGLE_CLOUD_PROJECT || '',
    location: process.env.GOOGLE_CLOUD_LOCATION || ''
});
const generativeModel = vertexAI.getGenerativeModel({
    model: 'gemini-2.5-pro'
});

// Set custom prompt
const getPrompt = (fullText: string): string => {
    return `Give raw text, do not style it with markdown.
    Given the text extracted from a beverage can, populate the provided JSON schema with all available information.
    If a piece of information is not present in the text, leave the corresponding field empty. Do NOT create new fields. Adhere to the given structure and parameters strictly.
    If the information is not in English, translate it and populate the given fields in the structure. If it is English, leave the "OG" fields empty and only populate the "EN" fields.
    The text is as follows:
    """
    ${fullText}
    """
    `
}

app.post('/api/ocr', upload.array('image', 5), async (req, res) => {
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
        return res.status(400).send('No files uploaded.');
    }

    try {
        const files = req.files as Express.Multer.File[];

        // Prepare requests for batch processing
        const requests = files.map(file => {
            const content = file.buffer;
            return {
                image: { content },
                features: [{ type: 'TEXT_DETECTION' as const }],
            };
        });

        // Vision API - Batch processing
        const [results] = await visionClient.batchAnnotateImages({ requests });
        const allTextAnnotations = results.responses || [];

        let fullText = '';
        allTextAnnotations.forEach((response: protos.google.cloud.vision.v1.IAnnotateImageResponse) => {
            if (response.textAnnotations && response.textAnnotations.length > 0) {
                fullText += response.textAnnotations[0].description + '\n\n';
            }
        });

        if (fullText.trim() === '') {
            fullText = 'No text found in the images.';
        }

        // Vertex Gemeni API
        const prompt = getPrompt(fullText);
        const request = {
            contents: [{
                role: 'user',
                parts: [{ text: prompt }]
            }],
            tools: [{
                functionDeclarations: [{
                    name: "extract_beverage_info",
                    description: "Extracts beverage information based on the provided text.",
                    parameters: responseSchema,
                }],
            }],
        };
        const resp = await generativeModel.generateContent(request);

        // debug log
        console.log('Full Gemini Response:', JSON.stringify(resp.response, null, 2));

        let aiText: any = "Could not process the text.";
        const rawResponse = resp.response.candidates?.[0];
        const part = rawResponse?.content?.parts?.[0];

        if (part?.functionCall?.args) {
            aiText = part.functionCall.args;
        }
        // Fallback for if it sends it as a text string anyway
        else if (part?.text) {
            try {
                // Use a regular expression to find the JSON block. This is more robust.
                const jsonMatch = part.text.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    aiText = JSON.parse(jsonMatch[0]);
                } else {
                    throw new Error("No valid JSON object found in the text response.");
                }
            } catch (error) {
                console.error("Failed to parse AI response JSON:", error);
                console.error("Raw text that failed parsing:", part.text);
                aiText = "Could not process the text: Invalid JSON in response.";
            }
        }

        // Final response
        res.json({
            ocrText: fullText.trim(),
            aiText: aiText
        });

    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).send('Failed to process image.');
    }
});

app.listen(port, () => {
    console.log(`Backend server listening on http://localhost:${port}`);
});