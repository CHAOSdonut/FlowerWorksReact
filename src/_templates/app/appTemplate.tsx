import styles from "./app.module.scss";
import BoeketMasonry from "../../_organisms/boeketmasonry/boeketmasonry"
import BoeketMasonryHeader from "../../_molecules/boeketMasonryHeader/boeketMasonryHeader";
import UploadBoeketBanner from "../../_molecules/uploadBoeketBanner/uploadBoeketBanner";

export default function AppTemplate() {
    return (
        <div className={styles.contentWrapper}>
            <img src="/img/headimage.png" className={styles.headImage} />

            <UploadBoeketBanner />

            <BoeketMasonryHeader />

            <BoeketMasonry />

        </div >
    );
}
