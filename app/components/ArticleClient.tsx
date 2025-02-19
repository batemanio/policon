"use client";

import styles from "./Articles.module.scss";
import Link from "next/link";
import Image from "next/image";
import ArticleInformation from "./ArticleInformation";
import { article } from "../types/dbTables";
import { apiError } from "../types/errors";

export function ArticleClient({
    article,
    liked,
    numberOfLikesAndComments,
    username,
}: {
    article: article;
    liked: apiError;
    numberOfLikesAndComments: apiError;
    username: apiError;
}) {
    const id = article.id;
    const articleLink = `/articles/${id}`;

    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
            ></link>
            <div className={styles.articleContainer} key={id}>
                <div className={styles.article}>
                    <Link className={styles.imageContainer} href={articleLink}>
                        <Image
                            height={240}
                            width={500}
                            src={article.image}
                            className={styles.image}
                            alt="Cannot load article image :("
                        ></Image>
                    </Link>
                    <Link className={styles.title} href={articleLink}>
                        <span style={{ fontSize: "40px" }}>
                            <b>{article.title}</b>
                        </span>
                        <br />
                        <span
                            style={{
                                fontSize: "20px",
                                marginTop: "-15px",
                            }}
                        >
                            {article.sub_title}
                        </span>
                    </Link>
                    <div className={styles.information}>
                        <ArticleInformation
                            article={article}
                            liked={!liked.content}
                            numberOfLikesAndComments={
                                numberOfLikesAndComments.content
                            }
                            username={username.content.username}
                            fullVersion={false}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
