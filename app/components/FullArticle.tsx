"use client";

import { ArticleBody } from "./ArticleBody";
import ArticleInformation from "./ArticleInformation";
import Comments from "./Comments";
import styles from "./FullArticle.module.scss";

export function FullArticle({ article }: any) {
    article = JSON.parse(article);
    const smallArticle = [{ ...article }, article.comments.length];
    smallArticle[0].content = undefined;
    smallArticle[0].comments = undefined;

    return (
        <>
            <div className={styles.article}>
                <img
                    alt="primary image"
                    className={styles.primaryImage}
                    src={article.image}
                ></img>
                <h1 className={styles.title}>{article.title}</h1>
                <p className={styles.subTitle}>{article.subTitle}</p>
                <ArticleInformation
                    smallArticle={smallArticle}
                    fullVersion={true}
                />
                {article.content.map((section: any, index: number) => (
                    <ArticleBody body={section} key={index} />
                ))}
                <Comments article={article} />
            </div>
        </>
    );
}
