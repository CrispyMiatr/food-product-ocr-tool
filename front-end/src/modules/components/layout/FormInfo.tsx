import React from 'react';
import type { AiTextData } from '~/shared/services/ocrWindow/ocrWindow.service.types';

interface FormInfoProps {
    info: AiTextData['info'];
    onChange: (field: keyof AiTextData['info'], value: string) => void;
}

export const FormInfo: React.FC<FormInfoProps> = ({ info, onChange }) => {
    return (
        <fieldset>
            <legend><h2>General Information</h2></legend>
            {Object.keys(info).map((key) => (
                <div key={key}>
                    <label>{key.replace(/_/g, ' ')}: </label>
                    <input
                        type="text"
                        value={info[key as keyof AiTextData['info']]}
                        onChange={(e) => onChange(key as keyof AiTextData['info'], e.target.value)}
                    />
                </div>
            ))}
        </fieldset>
    );
};