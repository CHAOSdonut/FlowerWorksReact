'use client'

import { Boeket } from "../../models/boeketmodel"
import styles from "./boeketmasonry.module.scss";
import BoeketCard from "../../_molecules/boeketCard/boeketCard";
import { useBoekettenlijstStore } from "../../providers/boekettenlijst-store-provider";
import { useEffect } from "react";

export default function BoeketMasonry() {
    const { boekettenlijst, fetchBoekettenlijst, masonrySortOrder } = useBoekettenlijstStore(
        (state) => state,
    )

    useEffect(() => {
        fetchBoekettenlijst(masonrySortOrder);
    }, [fetchBoekettenlijst, masonrySortOrder]);

    const columns: number = 3;
    let masonrycounter: number = 0;
    let cardnumber: number = 0;

    function renderMasonry(): React.ReactNode {
        let masonry: React.ReactElement[] = [];
        for (let i = 0; i < columns; i++) {
            masonrycounter = 0;
            masonry.push(<div className={styles.masonryColumn} key={i + ""} >
                {boekettenlijst.map((boeket: Boeket) => {
                    let boeketCard = null;
                    if (i == masonrycounter) {
                        boeketCard = <BoeketCard boeket={boeket} key={i + "-" + cardnumber} />
                        cardnumber++;
                    }
                    masonrycounter++
                    if (masonrycounter >= columns) {
                        masonrycounter = 0;
                    }

                    return boeketCard;
                }
                )
                }
            </div>
            )
        }
        return masonry;
    }

    return (
        <div className={styles.masonryWrapper}>
            {renderMasonry()}
        </div >
    );
}
