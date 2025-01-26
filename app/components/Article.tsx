"use client";

import styles from "./Articles.module.scss";
import Link from "next/link";
import { formatDate } from "../functions/formatDate";
import Image from "next/image";
import { useState } from "react";
import { updateLikesDislikes } from "../api/updateLikesDislikes";

export function Article({ article, index }: any) {
    article = JSON.parse(article);

    const id = article._id;
    const articleLink = `/articles/${id}`;
    const authorLink = `/writers/${article.author}`;

    const [likes, setLikes]: any = useState([article.likes, false]);
    const [dislikes, setDislikes]: any = useState([article.dislikes, false]);

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
                        <hr style={{ width: "90%" }} />
                        <Link href={authorLink}>
                            <span>{article.author}</span>
                        </Link>
                        <br />
                        <span>Published {formatDate(article.createdAt)}</span>
                        {/* <br />
                        <span>Edited {formatDate(article.updatedAt)}</span> */}
                        <br />
                        <br />
                        {article.tags.map((tag: any, index: number) => (
                            <span className={styles.tags} key={index}>
                                {tag}
                            </span>
                        ))}
                        <br />
                        <br />
                        <div>
                            <span
                                onClick={toggleLike}
                                className={`${
                                    !likes[1]
                                        ? "far fa-thumbs-up"
                                        : "fas fa-thumbs-up"
                                } ${styles.thumbsUp}`}
                            ></span>
                            <span
                                onClick={toggleDislike}
                                className={`${
                                    !dislikes[1]
                                        ? "far fa-thumbs-down"
                                        : "fas fa-thumbs-down"
                                } ${styles.thumbsDown}`}
                            ></span>
                            <span
                                className={`fas fa-comment ${styles.commentsIcon}`}
                            ></span>
                        </div>
                        <div>
                            <span className={styles.likes}>{likes[0]}</span>
                            <span className={styles.dislikes}>
                                {dislikes[0]}
                            </span>
                            <span className={styles.comments}>
                                {article.comments.length}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
