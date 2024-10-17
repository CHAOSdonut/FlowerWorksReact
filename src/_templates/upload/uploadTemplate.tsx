import styles from "./app.module.scss";
import BoeketMasonry from "../../_organisms/boeketmasonry/boeketmasonry"
import BoeketMasonryHeader from "../../_molecules/boeketMasonryHeader/boeketMasonryHeader";
import UploadBoeketBanner from "../../_molecules/uploadBoeketBanner/uploadBoeketBanner";
import UploadBoeketForm from "../../_organisms/uploadBoeketForm/uploadBoeketForm";

export default function UploadTemplate() {
    return (
        <div>
            <main>
                <UploadBoeketForm />
            </main>
        </div>
    );
}
