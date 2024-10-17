'use client'

import { ReactNode } from "react"
import { useBoekettenlijstStore } from "../../providers/boekettenlijst-store-provider";
import { sortOrder } from "../../stores/boekettenlijst-store";
import styles from "./boeketMasonryHeader.module.scss";
import Link from "next/link";

export default function BoeketMasonryHeader() {
    const { masonrySortOrder } = useBoekettenlijstStore(
        (state) => state,
    )

    function sortOrderName(): string {
        switch (masonrySortOrder) {
            case 'default':
                return "Datum ⬇"
                
            case 'mostLikes':
                return "Meeste Likes ⬇"
     
            default:
                return 'unknown sortOrder'
        }
    }

    return (
        <div className={styles.textWrapper}>
            <div className={styles.name}>{ sortOrderName() }</div>
            <div className={styles.line}><hr /></div>
            <img src="/img/arrow.png" className={styles.arrow} />
            <div className={styles.seeAll}><Link href="/">Bekijk alle boeketten</Link></div>
        </div>
    );
}
