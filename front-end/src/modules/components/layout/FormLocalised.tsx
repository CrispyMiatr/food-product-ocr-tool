import React from 'react';
import type { FormLocalisedType } from '~/shared';
import styles from '~styles/components/form.module.scss';

export const FormLocalised: React.FC<FormLocalisedType> = ({ title, items, sectionKey, onChange }) => {
    return (
        <fieldset>
            <legend><h2>{title}</h2></legend>
            {items.map((item, index) => (
                <div key={index} className={styles['localised-field']}>
                    <input
                        type="text"
                        value={item.lang}
                        onChange={event => onChange(sectionKey, index, 'lang', event.target.value)}
                        maxLength={2}
                        placeholder="Lang Code"
                    />
                    <textarea
                        value={item.text}
                        onChange={event => onChange(sectionKey, index, 'text', event.target.value)}
                        placeholder="..."
                    ></textarea>
                </div>
            ))}
        </fieldset>
    );
};