import React, { useState, useEffect } from 'react';
import { useUploadOcrImages } from '~/shared';
import type { AiTextData, LocalisedText, OcrWindowType } from '~/shared/services/ocrWindow/ocrWindow.service.types';
import { FormInfo, FormLocalised, FormNutrition, OcrDataModal } from '~/components';
import styles from '~styles/app.module.scss';

export const Home: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [error, setError] = useState<string>('');
    const [formData, setFormData] = useState<AiTextData | null>(null);
    const [savedOcrData, setSavedOcrData] = useState<Record<string, AiTextData>>({});
    const [selectedOcrData, setSelectedOcrData] = useState<AiTextData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const ocrData: Record<string, AiTextData> = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith('ocr_data_')) {
                try {
                    ocrData[key] = JSON.parse(localStorage.getItem(key) || '');
                } catch (error) {
                    console.error("Failed to parse localStorage data", error);
                }
            }
        }
        setSavedOcrData(ocrData);
    }, []);

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
        if (selectedFiles.length === 0) {
            setError('Please select at least one file.');
            return;
        }
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
        if (formData) {
            const storageKey = `ocr_data_${new Date().getTime()}`;
            localStorage.setItem(storageKey, JSON.stringify(formData));
            alert('Data saved to your browser.');

            setSavedOcrData(prev => ({ ...prev, [storageKey]: formData }));
        }
    };

    const handleOpenModal = (data: AiTextData) => {
        setSelectedOcrData(data);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedOcrData(null);
        setIsModalOpen(false);
    };

    return (
        <div>
            <h1>Food Product Information Extraction Tool</h1>

            <div>
                <h2>Saved Extractions:</h2>
                {Object.entries(savedOcrData).length === 0 ? (
                    <div>No extractions available.</div>
                ) : (
                    Object.entries(savedOcrData).map(([key, data]) => {
                        const label = [data.info.brand, data.info.name].filter(Boolean).join(' - ');
                        const buttonText = label || `Unnamed Extraction (${new Date(parseInt(key.split('_')[2])).toLocaleTimeString()})`;

                        return (
                            <button className={styles['btn']} key={key} onClick={() => handleOpenModal(data)}>
                                {buttonText}
                            </button>
                        );
                    })
                )}
            </div>

            <hr />

            <div>
                <input type="file" accept="image/*" onChange={handleFileChange} multiple />
                <button onClick={handleUpload} disabled={selectedFiles.length === 0 || isPending}>
                    {isPending ? 'Processing...' : 'Extract Text'}
                </button>
            </div>

            {isPending && <p>Processing, please wait...</p>}
            {(error || mutationError) && (
                <p style={{ color: 'red' }}>{error || mutationError?.message}</p>
            )}

            {formData && (
                <form>
                    <FormInfo
                        data={formData.info}
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
                    <button className={styles['btn-save']} type="button" onClick={handleSave}>Save</button>
                </form>
            )}

            {isModalOpen && selectedOcrData && (
                <OcrDataModal data={selectedOcrData} onClose={handleCloseModal} />
            )}
        </div>
    );
};