"use client";

import { ArticleBody } from "./ArticleBody";
import ArticleInformation from "./ArticleInformation";
import Comments from "./Comments";
import styles from "./FullArticle.module.scss";

export function FullArticle({ article }: any) {
    return (
        <>
            <div className={styles.article}>
                <h1 className={styles.title}>{article.title}</h1>
                <p className={styles.subTitle}>{article.subTitle}</p>
                <ArticleInformation article={article} fullVersion={"true"} />
                <img
                    alt="primary image"
                    className={styles.primaryImage}
                    src={article.image}
                ></img>
                <ArticleBody body={article.body} />
                <Comments article={article} />
            </div>
        </>
    );
}
