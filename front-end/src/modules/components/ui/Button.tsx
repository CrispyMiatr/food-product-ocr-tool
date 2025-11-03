import type { ButtonType } from '~/shared';
import styles from '~styles/app.module.scss';

export const Button = ({ name }: ButtonType) => {
    return (
        <div className={styles['button']}>
            <p className={styles['button__title']}>{name}</p>
        </div>
    );
};
