// backend/src/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import { ImageAnnotatorClient } from '@google-cloud/vision';

const app = express();
const port = 3001; // Backend port

// Cors middleware for requests from frontend
app.use(cors());
app.use(express.json());

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
});

const visionClient = new ImageAnnotatorClient({
    keyFilename: './food-product-ocr-tool.json'
});

app.post('/api/ocr', upload.single('image'), async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const content = req.file.buffer;
        const [result] = await visionClient.textDetection({
            image: { content },
        });

        const detections = result.textAnnotations;
        if (detections && detections.length > 0) {
            const fullText = detections[0].description;
            res.json({ text: fullText })
        } else {
            res.json({ text: 'No text found in the image.' });
        }

    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).send('Failed to process image.');
    }
});

app.listen(port, () => {
    console.log(`Backend server listening on http://localhost:${port}`);
});