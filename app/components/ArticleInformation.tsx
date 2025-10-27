"use client";

import styles from "./ArticleInformation.module.scss";
import { like } from "../actions/like";
import { useState } from "react";
import { formatDate } from "../actions/formatDate";
import Link from "next/link";
import { article } from "../types/dbTables";
import { useRouter } from "next/navigation";
import Image from "next/image";
import * as motion from "motion/react-client";

export default function ArticleInformation({
    article,
    fullVersion,
    liked,
    numberOfLikesAndComments,
    username,
    user_id,
    avatar_url,
}: {
    article: article;
    fullVersion: boolean;
    liked: boolean;
    numberOfLikesAndComments: number[];
    username: string;
    user_id: string | false;
    avatar_url: string | null;
}) {
    const [likes, setLikes] = useState<number>(numberOfLikesAndComments[0]);
    const [likedState, setLikedState] = useState<boolean>(liked);

    const comments = numberOfLikesAndComments[1];

    // useEffect(() => {
    //     async function getUserId() {
    //         const supabase = createClient();

    //         const { data: user, error } = await supabase.auth.getUser();
    //         if (error) {
    //             console.log(error);
    //         }
    //         if (user.user && article.id) {
    //             const liked = !(await isLiked(article.id, user.user.id));
    //             if (liked) {
    //                 setLikedState(true);
    //             } else {
    //                 setLikedState(false);
    //             }
    //         }
    //     }
    //     getUserId();
    //     if (article.id) {
    //         getNumberOfLikesAndComments(article.id).then((res: any) => {
    //             setLikes(res.content[0]);
    //             setComments(res.content[1]);
    //         });

    //         getUsername(article.user_id).then((res: any) => {
    //             if (res.type === "success") {
    //                 setUsernameState(res.content[0].username);
    //             }
    //         });
    //     }
    // }, []);

    const router = useRouter();

    const authorLink = `/profile/${article.user_id}`;

    function clientLike() {
        if (user_id) {
            if (!likedState) {
                setLikes(likes + 1);
                setLikedState(true);
            } else {
                if (likes > 0) {
                    setLikes(likes - 1);
                    setLikedState(false);
                }
            }
            if (article.id) {
                like(article.id, 1).then((res: any) => {
                    if (res.type === "error") {
                        if (!likedState) {
                            setLikes(likes + 1);
                            setLikedState(true);
                        } else {
                            if (likes > 0) {
                                setLikes(likes - 1);
                                setLikedState(false);
                            }
                        }
                    }
                });
            }
        } else {
            router.push("/login");
        }
    }

    return (
        <div className={styles.container}>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
            ></link>
            <hr style={{ width: "90%" }} />
            {fullVersion && avatar_url && (
                <Image
                    className={styles.avatar}
                    width={40}
                    height={40}
                    src={avatar_url}
                    alt="Avatar image"
                ></Image>
            )}
            <Link
                href={authorLink}
                className={fullVersion ? styles.authorLink : ""}
                style={{ color: "#1BB1E4" }}
            >
                <span>{username}</span>
            </Link>
            <br />
            <span>Published {formatDate(article.created_at)}</span>
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
                <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.1,
                        scale: {
                            type: "spring",
                            visualDuration: 0.4,
                            bounce: 0.5,
                        },
                    }}
                    whileHover={{ scale: 1.25 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={clientLike}
                    className={`${
                        !likedState ? "far fa-thumbs-up" : "fas fa-thumbs-up"
                    } ${styles.thumbsUp}`}
                ></motion.span>
                <span className={styles.likes}>{likes}</span>

                <span
                    className={`far fa-comment ${styles.commentsIcon}`}
                ></span>
                <span className={styles.comments}>{comments}</span>
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
