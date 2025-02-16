"use client";

import styles from "./ArticleInformation.module.scss";
import { like } from "../actions/like";
import { useCallback, useEffect, useState } from "react";
import { formatDate } from "../functions/formatDate";
import Link from "next/link";
import { article } from "../types/dbTables";
import { getNumberOfLikesAndComments } from "../actions/getNumberOfLikesAndComments";
import { getUsername } from "../actions/getUsername";
import { isLiked } from "../actions/isLiked";
import { createClient } from "@/utils/supabase/client";

type clientLike = [number, boolean];

export default function ArticleInformation({
    article,
    fullVersion,
}: {
    article: article;
    fullVersion: boolean;
}) {
    const [likes, setLikes] = useState<clientLike>([0, false]);
    const [comments, setComments] = useState<clientLike>([0, false]);
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        async function getUserId() {
            const supabase = createClient();

            const { data: user, error } = await supabase.auth.getUser();
            if (error) {
                console.log(error);
            }
            if (user.user && article.id) {
                const liked = await isLiked(article.id, user.user.id);
            }
        }
        getUserId();
        if (article.id) {
            getNumberOfLikesAndComments(article.id).then((res: any) => {
                setLikes([res.content[0], false]);
                setComments([res.content[1], false]);
            });

            getUsername(article.user_id).then((res: any) => {
                if (res.type === "success") {
                    setUsername(res.content[0].username);
                }
            });
        }
    }, []);

    const authorLink = `/writers/${article.user_id}`;

    function clientLike() {
        if (article.id) {
            like(article.id, 1).then((res: any) => {
                if (res.type === "success") {
                    if (!res.content) {
                        setLikes([(likes[0] += 1), true]);
                    } else {
                        if (likes[0] > 0) {
                            setLikes([(likes[0] -= 1), false]);
                        }
                    }
                }
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
                <span>{username}</span>
            </Link>
            <br />
            <span>Published {formatDate(article.created_at)}</span>
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
                    onClick={clientLike}
                    className={`${
                        !likes[1] ? "far fa-thumbs-up" : "fas fa-thumbs-up"
                    } ${styles.thumbsUp}`}
                ></span>
                <span className={styles.likes}>{likes[0]}</span>

                <span
                    className={`${
                        !comments[1] ? "far fa-comment" : "fas fa-comment"
                    } ${styles.commentsIcon}`}
                ></span>
                <span className={styles.comments}>{comments[0]}</span>
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
