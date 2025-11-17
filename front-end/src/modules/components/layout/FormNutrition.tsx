import React from 'react';
import type { FormNutritionType, NutritionTable } from '~/shared';
import styles from '~styles/components/form.module.scss';

export const FormNutrition: React.FC<FormNutritionType> = ({ tables, onChange }) => {
    // This array defines the ORDER of keys, not the display text.
    const nutrientOrder: (keyof NutritionTable['basic_info'])[] = [
        'energy', 'fat', 'saturated_fat', 'cholesterol', 'carbohydrates',
        'sugars', 'dietary_fiber', 'protein', 'salt', 'calcium', 'potassium'
    ];

    // This array also defines the ORDER of vitamin keys.
    const vitaminOrder: (keyof Omit<NonNullable<NutritionTable['vitamins']>, 'header'>)[] = [
        'vit_A', 'vit_B1', 'vit_B2', 'vit_B3', 'vit_B5', 'vit_B6',
        'vit_B7', 'vit_B9', 'vit_B12', 'vit_C', 'vit_D', 'vit_E', 'vit_K'
    ];

    return (
        <fieldset>
            <legend><h2>Nutrition Tables</h2></legend>
            {tables.map((table, tableIndex) => (
                <div key={tableIndex} className={styles['form-nutrition__nutrition-table']}>
                    <h3>Table ({table.lang})</h3>
                    <div className={styles['form-nutrition__nutrition-table__lang-input-group']}>
                        <label>Language code:</label>
                        <input type="text" value={table.lang} onChange={event => onChange(tableIndex, ['lang'], event.target.value)} />
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Nutrients</th>
                                <th>Per 100 mL / 100 g</th>
                                <th>Per 500 mL / 500 g</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nutrientOrder.map((key) => {
                                const nutrient = table.basic_info[key];
                                return (
                                    <tr key={key}>
                                        <td>
                                            {nutrient.name}
                                            {'xtra' in nutrient && nutrient.xtra && <span className={styles['nutrient-extra']}>({nutrient.xtra})</span>}
                                        </td>
                                        <td>
                                            <input type="text" placeholder="e.g., 10g" value={nutrient.per_100mL} onChange={event => onChange(tableIndex, ['basic_info', key, 'per_100mL'], event.target.value)} />
                                        </td>
                                        <td>
                                            <input type="text" placeholder="e.g., 50g" value={nutrient.per_500mL} onChange={event => onChange(tableIndex, ['basic_info', key, 'per_500mL'], event.target.value)} />
                                        </td>
                                    </tr>
                                );
                            })}

                            {table.vitamins && (
                                <>
                                    <tr>
                                        <td colSpan={3} className={styles['vitamins-header']}>Vitamins</td>
                                    </tr>
                                    {vitaminOrder.map((key) => {
                                        const vitamin = table.vitamins?.[key];
                                        if (vitamin && typeof vitamin === 'object') {
                                            return (
                                                <tr key={key}>
                                                    <td>
                                                        {vitamin.name}
                                                        {'xtra' in vitamin && vitamin.xtra && <span className={styles['nutrient-extra']}> ({vitamin.xtra})</span>}
                                                    </td>
                                                    <td>
                                                        <input type="text" placeholder="e.g., 10μg" value={vitamin.per_100mL} onChange={event => onChange(tableIndex, ['vitamins', key, 'per_100mL'], event.target.value)} />
                                                    </td>
                                                    <td>
                                                        <input type="text" placeholder="e.g., 50μg" value={vitamin.per_500mL} onChange={event => onChange(tableIndex, ['vitamins', key, 'per_500mL'], event.target.value)} />
                                                    </td>
                                                </tr>
                                            );
                                        }
                                        return null;
                                    })}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            ))}
        </fieldset>
    );
};