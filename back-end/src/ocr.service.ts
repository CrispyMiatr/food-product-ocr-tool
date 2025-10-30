import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { ImageAnnotatorClient, protos } from '@google-cloud/vision';
import { VertexAI } from '@google-cloud/vertexai';
import dotenv from 'dotenv';

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
    return `Explain in short what you think the given text is:
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
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
        };
        const resp = await generativeModel.generateContent(request);
        const aiText = resp.response.candidates?.[0]?.content?.parts?.[0]?.text || "Could not process the text.";

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