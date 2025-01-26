"use client";

import styles from "./Articles.module.scss";
import Link from "next/link";
import Image from "next/image";
import ArticleInformation from "./ArticleInformation";

export function Article({ article, index }: any) {
    article = JSON.parse(article);

    const id = article._id;
    const articleLink = `/articles/${id}`;

    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
            ></link>
            <div className={styles.articleContainer} key={id}>
                <div className={styles.article}>
                    <Link href={articleLink}>
                        <img
                            src={article.image}
                            className={styles.image}
                            alt="Cannot load article image :("
                        ></img>
                    </Link>
                    <Link href={articleLink}>
                        <p className={styles.title}>
                            <span style={{ fontSize: "40px" }}>
                                <b>{article.title}</b>
                            </span>
                            <br />
                            <span
                                style={{ fontSize: "20px", marginTop: "-15px" }}
                            >
                                {article.subTitle}
                            </span>
                        </p>
                    </Link>
                    <div
                        className={styles.information}
                        style={{ marginTop: "auto" }}
                    >
                        <ArticleInformation
                            article={article}
                            fullVersion={false}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
