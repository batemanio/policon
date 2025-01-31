import { AddComment } from "./AddComment";
import styles from "./FullArticle.module.scss";
import { ListComments } from "./ListComments";

export default function Comments(article: any) {
    article = article.article;
    const comments: string[] = article.comments;

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
            <AddComment />
            <hr style={{ width: "90%" }} />
        </div>
    );
}
