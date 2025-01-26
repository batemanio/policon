"use client";

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
                <img className={styles.primaryImage} src={article.image}></img>
                <p className={styles.content}>{article.content}</p>
                <Comments article={article} />
            </div>
        </>
    );
}
