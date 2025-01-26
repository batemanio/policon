import styles from "./FullArticle.module.scss";

export default function Comments(article: any) {
    article = article.article;
    const comments: any = article.comments;
    // console.log(comments[0]);

    return (
        <div className={styles.comments}>
            <hr style={{ width: "90%" }} />
            <h1>Comments:</h1>
            {comments.map((comment: any, index: number) => (
                <p className={styles.comment} key={index}>
                    {comment}
                </p>
            ))}
            <hr style={{ width: "90%" }} />
        </div>
    );
}
