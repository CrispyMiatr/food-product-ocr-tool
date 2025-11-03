import axios from 'axios';
import type { OcrWindowType } from './ocrWindow.service.types';

const API_URL = 'http://localhost:3001/api/ocr';

class OcrWindowService {
    async uploadImages(files: File[]): Promise<OcrWindowType> {
        const formData = new FormData();
        files.forEach(file => {
            formData.append('image', file);
        });

        try {
            const response = await axios.post<OcrWindowType>(API_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'An error occurred during the upload.');
            }
            throw new Error('An unexpected error occurred.');
        }
    }
}

export const ocrWindowService = new OcrWindowService();