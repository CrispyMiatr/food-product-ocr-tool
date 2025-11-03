import React from 'react';
import type { FormLocalisedType } from '~/shared';


export const FormLocalised: React.FC<FormLocalisedType> = ({ title, items, sectionKey, onChange }) => {
    return (
        <fieldset>
            <legend><h2>{title}</h2></legend>
            {items.map((item, index) => (
                <div key={index}>
                    <input
                        value={item.lang}
                        onChange={e => onChange(sectionKey, index, 'lang', e.target.value)}
                        placeholder="Lang Code"
                    />
                    <textarea
                        value={item.text}
                        onChange={e => onChange(sectionKey, index, 'text', e.target.value)}
                        placeholder="..."
                    ></textarea>
                </div>
            ))}
        </fieldset>
    );
};