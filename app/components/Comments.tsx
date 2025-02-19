import { comment } from "../types/dbTables";
import { AddComment } from "./AddComment";
import styles from "./FullArticle.module.scss";
import { ListComments } from "./ListComments";

export default function Comments({
    comments,
    setComments,
}: {
    comments: Array<comment>;
    setComments: any;
}) {
    return (
        <div className={styles.comments}>
            <br />
            <br />
            <br />
            <br />
            <hr style={{ width: "90%" }} />
            <h1>Comments:</h1>
            {comments.length > 0 ? (
                <ListComments comments={comments} />
            ) : (
                <p style={{ fontSize: "20px" }}>
                    No comments yet - Leave a comment
                </p>
            )}
            <AddComment setComments={setComments} />
            <hr style={{ width: "90%" }} />
        </div>
    );
}
