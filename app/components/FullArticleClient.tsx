"use client";

import { article, comment } from "../types/dbTables";
import { apiError } from "../types/errors";
import ArticleInformation from "./ArticleInformation";
import Comments from "./Comments";
import styles from "./FullArticle.module.scss";
import parse from "html-react-parser";
import Image from "next/image";

export function FullArticleClient({
    article,
    liked,
    numberOfLikesAndComments,
    username,
    commentsWithUsernames,
    numberOfComments,
    currentPage,
}: {
    article: article;
    liked: apiError;
    numberOfLikesAndComments: apiError;
    username: apiError;
    commentsWithUsernames: Array<{ comment: comment; username: string }>;
    numberOfComments: number;
    currentPage: number;
}) {
    return (
        <div className={styles.article}>
            <Image
                width={500}
                height={500}
                alt="primary image"
                className={styles.primaryImage}
                src={article.image}
            />
            <h1 className={styles.title}>{article.title}</h1>
            <p className={styles.subTitle}>{article.sub_title}</p>
            <ArticleInformation
                article={article}
                liked={!liked.content}
                numberOfLikesAndComments={numberOfLikesAndComments.content}
                username={username.content}
                fullVersion={true}
            />
            <div>{parse(article.content)}</div>
            <Comments
                commentsWithUsernames={commentsWithUsernames}
                numberOfComments={numberOfComments}
                currentPage={currentPage}
            />
        </div>
    );
}
