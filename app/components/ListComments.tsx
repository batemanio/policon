import { comment } from "../types/dbTables";
import { Comment } from "./Comment";
import styles from "./FullArticle.module.scss";

export function ListComments({
    comments,
}: {
    comments: Array<{ comment: comment; username: string }>;
}) {
    return (
        <div className={styles.comments}>
            {comments.map(
                (
                    comment: { comment: comment; username: string },
                    index: number
                ) => (
                    <Comment key={index} comment={comment} />
                )
            )}
        </div>
    );
}
