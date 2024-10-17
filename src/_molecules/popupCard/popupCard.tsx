import { useState, useEffect } from 'react';
import styles from './popupcard.module.scss';

type Props = {
    message: string;
    color: string;
    uptime: number;
};

export default function PopupCard({ message, color, uptime }: Props) {
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        if (uptime > 0) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, uptime);
            return () => clearTimeout(timer);
        }
    }, [uptime]);

    return (
        <div
            className={`${styles.card} ${visible ? '' : styles.hidden}`}
            style={{ backgroundColor: color }}
        >
            <div className={styles.closebtn} onClick={() => setVisible(false)}>x</div>
            <div className={styles.message}>{message}</div>
        </div>
    );
}
