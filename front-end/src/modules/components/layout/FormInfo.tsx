import React from 'react';
import type { FormInfoType, AiTextData } from '~/shared';
import styles from '~styles/components/form.module.scss';

export const FormInfo: React.FC<FormInfoType> = ({ data, onChange }) => {
    // Define the hardcoded fields to ensure consistent order and presence
    const fields = [
        { key: 'name', label: 'Name' },
        { key: 'brand', label: 'Brand' },
        { key: 'company', label: 'Company' },
        { key: 'country_code', label: 'Country-code' },
        { key: 'country', label: 'Country' },
        { key: 'volume', label: 'Volume' },
        { key: 'weight', label: 'Weight' },
        { key: 'barcode', label: 'Barcode' },
        { key: 'website', label: 'Website' },
    ];

    return (
        <fieldset>
            <legend><h2>General Information</h2></legend>
            {fields.map(field => {
                const fieldKey = field.key as keyof AiTextData['info'];
                const value = data?.[fieldKey] || '';

                return (
                    <div key={fieldKey} className={styles['form-field']}>
                        <label>{field.label}:</label>
                        <input
                            type="text"
                            value={value}
                            onChange={(event) => onChange(fieldKey, event.target.value)}
                        />
                    </div>
                );
            })}
        </fieldset>
    );
};