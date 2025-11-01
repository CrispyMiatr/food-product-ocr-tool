import React, { useState } from 'react';
import axios from 'axios';

export const OcrWindow: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [ocrText, setOcrText] = useState<string>('');
    const [aiText, setAiText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            if (event.target.files.length > 5) {
                setError('You can only select up to 5 files.');
                setSelectedFiles([]);
                return;
            }
            setSelectedFiles(Array.from(event.target.files));
            setOcrText('');
            setError('');
        }
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            setError('Please select at least one file.');
            return;
        }

        setIsLoading(true);
        setError('');

        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append('image', file);
        });


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
            <input type="file" accept="image/*" onChange={handleFileChange} multiple />
            <button onClick={handleUpload} disabled={selectedFiles.length === 0 || isLoading}>
                {isLoading ? 'Processing...' : 'Extract Text'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {ocrText && (
                <div>
                    <h2>Extracted Text:</h2>
                    <pre>{ocrText}</pre>
                    <br />
                    <h2>Processed Text:</h2>
                    <pre>{JSON.stringify(aiText, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};