"use client";

import styles from "./FullArticle.module.scss";

export function ArticleSection({ body }: any) {
    if (body.text) {
        return <p className={styles.content}>{body.text}</p>;
    } else if (body.image) {
        return (
            <img
                alt="body image"
                className={styles.primaryImage}
                src={body.image}
            ></img>
        );
    }
}
