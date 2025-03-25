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
            <Link
                href={`/profile/${comment.comment.user_id}`}
                className={styles.username}
            >
                {comment.username}
            </Link>
            <p className={styles.date}>
                {formatDate(comment.comment.created_at)}
            </p>
            <p className={styles.content}>-{comment.comment.content}</p>
        </div>
    );
}
