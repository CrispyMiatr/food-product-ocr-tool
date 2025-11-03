import React from 'react';
import type { FormNutritionType } from '~/shared';


export const FormNutrition: React.FC<FormNutritionType> = ({ tables, onChange }) => {
    return (
        <fieldset>
            <legend><h2>Nutrition Tables</h2></legend>
            {tables.map((table, tableIndex) => (
                <div key={tableIndex} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
                    <h3>Table ({table.lang})</h3>
                    <label>Language: </label>
                    <input value={table.lang} onChange={e => onChange(tableIndex, ['lang'], e.target.value)} />

                    <h4>Basic Info</h4>
                    {Object.entries(table.basic_info).map(([key, nutrient]) => (
                        <div key={key}>
                            <strong>{nutrient.name}</strong>
                            <input value={nutrient.per_100mL} onChange={e => onChange(tableIndex, ['basic_info', key, 'per_100mL'], e.target.value)} />
                            <input value={nutrient.per_500mL} onChange={e => onChange(tableIndex, ['basic_info', key, 'per_500mL'], e.target.value)} />
                            {'xtra' in nutrient && nutrient.xtra && <span> {nutrient.xtra}</span>}
                        </div>
                    ))}

                    {table.vitamins && (
                        <>
                            <h4>Vitamins</h4>
                            {Object.entries(table.vitamins).map(([key, vitamin]) => {
                                if (key !== 'header' && typeof vitamin === 'object' && vitamin !== null) {
                                    return (
                                        <div key={key}>
                                            <strong>{vitamin.name}</strong>
                                            <input value={vitamin.per_100mL} onChange={e => onChange(tableIndex, ['vitamins', key, 'per_100mL'], e.target.value)} />
                                            <input value={vitamin.per_500mL} onChange={e => onChange(tableIndex, ['vitamins', key, 'per_500mL'], e.target.value)} />
                                            {'xtra' in vitamin && vitamin.xtra && (
                                                <input value={vitamin.xtra} onChange={e => onChange(tableIndex, ['vitamins', key, 'xtra'], e.target.value)} placeholder="xtra info" />
                                            )}
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </>
                    )}
                </div>
            ))}
        </fieldset>
    );
};