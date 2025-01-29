"use client";

import styles from "./ArticleInformation.module.scss";
import { updateLikesDislikes } from "../api/updateLikesDislikes";
import { useState } from "react";
import { formatDate } from "../functions/formatDate";
import Link from "next/link";

export default function ArticleInformation({ article, fullVersion }: any) {
    article = article;

    const [likes, setLikes]: any = useState([article.likes, false]);
    const [dislikes, setDislikes]: any = useState([article.dislikes, false]);

    const id = article._id;
    const authorLink = `/writers/${article.author}`;

    function toggleLike() {
        if (dislikes[1]) {
            toggleDislike();
        }

        if (!likes[1]) {
            updateLikesDislikes("likes", 1, id).then((value) => {
                setLikes([value, true]);
            });
        } else {
            updateLikesDislikes("likes", -1, id).then((value) => {
                setLikes([value, false]);
            });
        }
    }
    function toggleDislike() {
        if (likes[1]) {
            toggleLike();
        }

        if (!dislikes[1]) {
            updateLikesDislikes("dislikes", 1, id).then((value) => {
                setDislikes([value, true]);
            });
        } else {
            updateLikesDislikes("dislikes", -1, id).then((value) => {
                setDislikes([value, false]);
            });
        }
    }

    return (
        <div className={styles.container}>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
            ></link>
            <hr style={{ width: "90%" }} />
            <Link href={authorLink}>
                <span>{article.author}</span>
            </Link>
            <br />
            <span>Published {formatDate(article.createdAt)}</span>
            {/* {fullVersion && (
                <>
                    <br />
                    <span>Edited {formatDate(article.updatedAt)}</span>
                </>
            )} */}
            <br />
            <br />
            {article.tags.map((tag: any, index: number) => (
                <span className={styles.tags} key={index}>
                    {tag}
                </span>
            ))}
            <br />
            <br />
            <div className={styles.preventSelect}>
                <span
                    onClick={toggleLike}
                    className={`${
                        !likes[1] ? "far fa-thumbs-up" : "fas fa-thumbs-up"
                    } ${styles.thumbsUp}`}
                ></span>
                <span className={styles.likes}>{likes[0]}</span>
                <span
                    onClick={toggleDislike}
                    className={`${
                        !dislikes[1]
                            ? "far fa-thumbs-down"
                            : "fas fa-thumbs-down"
                    } ${styles.thumbsDown}`}
                ></span>
                <span className={styles.dislikes}>{dislikes[0]}</span>
                <span
                    className={`fas fa-comment ${styles.commentsIcon}`}
                ></span>
                <span className={styles.comments}>
                    {article.comments.length}
                </span>
            </div>

            {fullVersion && (
                <>
                    <hr style={{ width: "90%" }} />
                    <br />
                </>
            )}
        </div>
    );
}
