import React, { useState } from 'react';
import axios from 'axios';

export const OcrWindow: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [ocrText, setOcrText] = useState<string>('');
    const [aiText, setAiText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
            setOcrText('');
            setError('');
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file first.');
            return;
        }

        setIsLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post('http://localhost:3001/api/ocr', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setOcrText(response.data.ocrText || 'No text found.');
            setAiText(response.data.aiText || 'Processing went wrong');
        } catch (err) {
            setError('An error occurred during the OCR/AI process. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>OCR Uploader</h1>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!selectedFile || isLoading}>
                {isLoading ? 'Processing...' : 'Extract Text'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {ocrText && (
                <div>
                    <h2>Extracted Text:</h2>
                    <pre>{ocrText}</pre>
                    <br />
                    <h2>Processed Text:</h2>
                    <pre>{aiText}</pre>
                </div>
            )}
        </div>
    );
};