import React from 'react';
import type { AiTextData, NutritionTable, Nutrient, Vitamin, OcrDataModalType } from '~/shared';
import styles from '~styles/app.module.scss';

// Helper component for rendering a single nutrient row
const NutrientRow: React.FC<{ nutrient: Nutrient | Vitamin }> = ({ nutrient }) => (
    <tr>
        <td>
            {nutrient.name} {nutrient.xtra && <span className={styles['nutrient-extra']}>{nutrient.xtra}</span>}
        </td>
        <td>{nutrient.per_100mL}</td>
        <td>{nutrient.per_500mL}</td>
    </tr>
);

// Helper component for rendering a full nutrition table
const NutritionTableDisplay: React.FC<{ table: NutritionTable }> = ({ table }) => {
    const nutrientOrder: (keyof typeof table.basic_info)[] = [
        'energy', 'fat', 'saturated_fat', 'cholesterol', 'carbohydrates',
        'sugars', 'dietary_fiber', 'protein', 'salt', 'calcium', 'potassium'
    ];

    const vitaminOrder: (keyof NonNullable<typeof table.vitamins>)[] = [
        'vit_A', 'vit_B1', 'vit_B2', 'vit_B3', 'vit_B5', 'vit_B6',
        'vit_B7', 'vit_B9', 'vit_B12', 'vit_C', 'vit_D', 'vit_E', 'vit_K'
    ];

    return (
        <div className={styles['nutrition-table-display']}>
            <h4>{table.header.title} ({table.lang})</h4>
            <table>
                <thead>
                    <tr>
                        <th>Nutrients</th>
                        <th>{table.header.per_100mL}</th>
                        <th>{table.header.per_500mL}</th>
                    </tr>
                </thead>
                <tbody>
                    {nutrientOrder.map((nutrientKey) => {
                        const nutrient = table.basic_info[nutrientKey];
                        return <NutrientRow key={nutrientKey} nutrient={nutrient} />;
                    })}

                    {table.vitamins && (
                        <>
                            <tr>
                                <th colSpan={3} className={styles['vitamins-header']}>
                                    {typeof table.vitamins.header === 'string' ? table.vitamins.header : 'Vitamins'}
                                </th>
                            </tr>
                            {vitaminOrder.map((vitaminKey) => {
                                const vitamin = table.vitamins?.[vitaminKey];
                                if (vitamin && typeof vitamin === 'object') {
                                    return <NutrientRow key={vitaminKey} nutrient={vitamin} />;
                                }
                                return null;
                            })}
                        </>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export const OcrDataModal: React.FC<OcrDataModalType> = ({ data, onClose }) => {
    const infoFields = [
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
        <div className={styles['modal-overlay']} onClick={onClose}>
            <div className={styles['modal-overlay__modal-content']} onClick={event => event.stopPropagation()}>
                <button onClick={onClose} className={styles['modal-overlay__modal-content__close-button']}>Close</button>
                <h2>OCR Extraction Details</h2>

                <div className={styles['modal-overlay__modal-content__modal-section']}>
                    <h3>General Information</h3>
                    {infoFields.map(field => {
                        const fieldKey = field.key as keyof AiTextData['info'];
                        const value = data.info[fieldKey];
                        return value ? (<p key={fieldKey}><strong>{field.label}:</strong> {value}</p>) : null;
                    })}
                </div>

                <div className={styles['modal-overlay__modal-content__modal-section']}>
                    <h3>Warning Information</h3>
                    {data.warning_info.map((item, index) => (
                        <div key={index}><h4>Warning ({item.lang})</h4><p className={styles['modal-overlay__modal-content__modal-section__pre-wrap']}>{item.text}</p></div>
                    ))}
                </div>

                <div className={styles['modal-overlay__modal-content__modal-section']}>
                    <h3>Ingredients List</h3>
                    {data.ingredients_list.map((item, index) => (
                        <div key={index}><h4>Ingredients ({item.lang})</h4><p className={styles['modal-overlay__modal-content__modal-section__pre-wrap']}>{item.text}</p></div>
                    ))}
                </div>

                <div>
                    <h3>Nutrition Information</h3>
                    {data.nutrition_tables.map((table, index) => (
                        <NutritionTableDisplay key={index} table={table} />
                    ))}
                </div>
            </div>
        </div>
    );
};