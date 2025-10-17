import { OcrWindow } from '~/components';
import styles from '~styles/app.module.scss';

export const Home: React.FC = () => {

    return (
        <div className={styles['home-container']}>
            <h1>Welcome!</h1>
            <OcrWindow />
        </div>
    );
};
