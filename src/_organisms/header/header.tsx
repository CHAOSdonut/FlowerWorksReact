'use client'

import Link from "next/link";
import styles from "./header.module.scss";
import { useBoekettenlijstStore } from "../../providers/boekettenlijst-store-provider";

export default function HeaderComp() {
    const { setMasonrySortOrder } = useBoekettenlijstStore(
        (state) => state,
    )

    return (
        <header className={styles.header}>
            <div className={styles.menu}>
                <Link href="/"><img src="/img/logo.png" /></Link>
                <div className={styles.link}>Mijn profiel</div>
                <div className={`${styles.link} ${styles.clickAble}`} onClick={() => setMasonrySortOrder("default")}>Alle Boeketten</div>
                <div className={`${styles.link} ${styles.clickAble}`} onClick={() => setMasonrySortOrder("mostLikes")}>Hoogstgewaardeerde</div>
                <div className={styles.link}>Meest bekeken</div>
                <div className={`${styles.link} ${styles.clickAble}`} onClick={() => setMasonrySortOrder("mostLikes")}>Meeste likes</div>
                <div className={styles.link}>Mijn reacties</div>
                <Link href="/upload"><div className={styles.uploadbutton}>Boeket uploaden</div></Link>
            </div>
        </header>  
    )
}