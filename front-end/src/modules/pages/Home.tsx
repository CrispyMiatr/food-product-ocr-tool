import React, { useState } from 'react';
import { useUploadOcrImages } from '~/shared';
import type { AiTextData, LocalisedText, OcrWindowType } from '~/shared/services/ocrWindow/ocrWindow.service.types';
import { FormInfo, FormLocalised, FormNutrition } from '~/components';

const initialEmptyState: AiTextData = {
    info: { brand: '', name: '', company: '', country_code: '', country: '', volume: '', weight: '', barcode: '', website: '' },
    warning_info: [{ lang: 'EN', text: '' }],
    ingredients_list: [{ lang: 'EN', text: '' }],
    nutrition_tables: [],
};

export const Home: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [error, setError] = useState<string>('');
    const [formData, setFormData] = useState<AiTextData | null>(initialEmptyState);

    const { mutate, isPending, error: mutationError } = useUploadOcrImages({
        onSuccess: (data: OcrWindowType) => setFormData(data.aiText),
        onError: (error: Error) => setError(`Failed to process images: ${error.message}`),
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            if (event.target.files.length > 5) {
                setError('You can only select up to 5 files.');
                setSelectedFiles([]);
                return;
            }
            setSelectedFiles(Array.from(event.target.files));
            setError('');
        }
    };

    const handleUpload = () => {
        if (selectedFiles.length === 0) return setError('Please select at least one file.');
        setError('');
        mutate(selectedFiles);
    };

    const handleInfoChange = (field: keyof AiTextData['info'], value: string) => {
        setFormData(prev => prev ? { ...prev, info: { ...prev.info, [field]: value } } : null);
    };

    const handleLocalisedTextChange = (section: 'warning_info' | 'ingredients_list', index: number, field: keyof LocalisedText, value: string) => {
        setFormData(prev => {
            if (!prev) return null;
            const updatedSection = [...prev[section]];
            updatedSection[index] = { ...updatedSection[index], [field]: value };
            return { ...prev, [section]: updatedSection };
        });
    };

    const handleNutritionChange = (tableIndex: number, path: (string | number)[], value: string) => {
        setFormData(prev => {
            if (!prev) return null;
            const newFormData = JSON.parse(JSON.stringify(prev));
            let current = newFormData.nutrition_tables[tableIndex];
            for (let i = 0; i < path.length - 1; i++) {
                current = current[path[i]];
            }
            current[path[path.length - 1]] = value;
            return newFormData;
        });
    };

    const handleSave = () => {
        console.log('Saving data to database:', JSON.stringify(formData, null, 2));
        alert('Data logged to console.');
    };

    return (
        <div>
            <h1>OCR Uploader</h1>
            <div>
                <input type="file" accept="image/*" onChange={handleFileChange} multiple />
                <button onClick={handleUpload} disabled={selectedFiles.length === 0 || isPending}>
                    {isPending ? 'Processing...' : 'Extract Text'}
                </button>
            </div>

            {isPending && <p>Processing, please wait...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {mutationError && <p style={{ color: 'red' }}>{mutationError.message}</p>}

            {formData && (
                <form>
                    <FormInfo
                        info={formData.info}
                        onChange={handleInfoChange}
                    />

                    <FormLocalised
                        title="Warning Info"
                        items={formData.warning_info}
                        sectionKey="warning_info"
                        onChange={handleLocalisedTextChange}
                    />

                    <FormLocalised
                        title="Ingredients List"
                        items={formData.ingredients_list}
                        sectionKey="ingredients_list"
                        onChange={handleLocalisedTextChange}
                    />

                    <FormNutrition
                        tables={formData.nutrition_tables}
                        onChange={handleNutritionChange}
                    />

                    <hr />
                    <button type="button" onClick={handleSave}>Save to Database</button>
                </form>
            )}
        </div>
    );
};