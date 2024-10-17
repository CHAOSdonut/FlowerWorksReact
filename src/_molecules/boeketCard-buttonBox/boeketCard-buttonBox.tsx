import { Boeket } from "../../models/boeketmodel";
import { useBoekettenlijstStore } from "../../providers/boekettenlijst-store-provider";
import styles from "./boeketcard-buttonbox.module.scss";

type Props = {
    boeket: Boeket
}

export default function ButtonBox({ boeket }: Props) {
    const { likeBoeket } = useBoekettenlijstStore(
        (state) => state,
    )

    return (
        <div className={styles.buttonBox}>
            <div className={styles.likes} id={boeket.id.toString()} onClick={() => likeBoeket(boeket.id)}>{boeket.likes}</div>
            <div className={styles.comments}>{boeket.comments}</div>
        </div>
    );
}
