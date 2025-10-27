import { useState } from "react";
import { comment } from "../types/dbTables";
import { AddComment } from "./AddComment";
import styles from "./FullArticle.module.scss";
import { ListComments } from "./ListComments";
import { PageSelectors } from "./PageSelectors";

export default function Comments({
    commentsWithUsernames,
    numberOfComments,
    currentPage,
}: {
    commentsWithUsernames: Array<{ comment: comment; username: string }>;
    numberOfComments: number;
    currentPage: number;
}) {
    const [comments, setComments] = useState(commentsWithUsernames);

    return (
        <div className={styles.comments}>
            <br />
            <br />
            <br />
            <br />
            <hr style={{ width: "100%" }} />
            <h1>Comments:</h1>
            {comments.length > 0 ? (
                <ListComments comments={comments} />
            ) : (
                <p style={{ fontSize: "20px" }}>
                    No comments yet - Leave a comment
                </p>
            )}
            <PageSelectors
                numberOfItems={numberOfComments}
                currentPage={currentPage}
            />
            <AddComment setComments={setComments} comments={comments} />
            <hr style={{ width: "100%" }} />
        </div>
    );
}
