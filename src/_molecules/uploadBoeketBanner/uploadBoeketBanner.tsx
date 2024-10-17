import Link from "next/link";
import styles from "./uploadBoeketBanner.module.scss";

export default function UploadBoeketBanner() {
    return (
        <div id={styles.boeketUploadBanner}>
            <div id={styles.bannerText}>Deel je boeket, ontvang flowerpoints en inspireer andere bloemprofessionals met jouw meesterwerk!</div>
            <div><Link href="/upload"><div id={styles.uploadBoeketBannerButton}>Boeket uploaden</div></Link></div>
        </div> 
    );
}
