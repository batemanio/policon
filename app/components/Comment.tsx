import { formatDate } from "../actions/formatDate";
import { comment } from "../types/dbTables";
import styles from "./FullArticle.module.scss";
import Link from "next/link";
import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"] });

export function Comment({
    comment,
}: {
    comment: { comment: comment; username: string };
}) {
    return (
        <div className={`${styles.comment} ${raleway.className}`}>
            <hr style={{ width: "100%" }}></hr>
            <Link
                href={`/profile/${comment.comment.user_id}`}
                className={styles.username}
                style={{ color: "#1BB1E4" }}
            >
                <p className={styles.date}>{comment.username}</p>
            </Link>
            <p className={styles.date}>
                {formatDate(comment.comment.created_at)}
            </p>
            <p className={styles.content}>-{comment.comment.content}</p>
        </div>
    );
}
