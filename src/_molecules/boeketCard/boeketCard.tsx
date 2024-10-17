import { Boeket } from "../../models/boeketmodel";
import ButtonBox from "../boeketCard-buttonBox/boeketCard-buttonBox";
import styles from "./boeketcard.module.scss";
import Image from "next/image"


type Props = {
    boeket : Boeket
}

export default function BoeketCard({ boeket }: Props ) {
    
    const imageLoader = ({ src }: { src: string }) => {
        return `http://localhost:5032/public/img/${src}`;
    };

    return (
        <div className={styles.card}>
            <Image
                loader={imageLoader}  
                src={boeket.fotoUrl}      
                alt={boeket.name}
                width={1}   // <Image> wants a width and height so it can prerender the image location and prevent laggy layout-shit
                height={1}  // for this application this doesnt work however because of differing aspect ratios, so we just use css again to display the images correctly
            />
            <div className={styles.name}>{boeket.name}</div>
            <ButtonBox boeket={boeket} />
        </div>
    );
}
