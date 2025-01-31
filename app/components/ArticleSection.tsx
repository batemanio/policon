"use client";

import styles from "./FullArticle.module.scss";

export function ArticleSection({ body }: any) {
    if (body.text) {
        return <p className={styles.textContent}>{body.text}</p>;
    } else if (body.image) {
        return (
            <img
                alt="body image"
                className={styles.imageContent}
                src={body.image}
            ></img>
        );
    }
}
