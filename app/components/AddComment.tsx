"use client";

import { useState } from "react";
import styles from "./FullArticle.module.scss";
import { uploadComment } from "../actions/uploadComment";
import { useParams } from "next/navigation";
import { apiError } from "../types/errors";
import { commentMaxLength } from "../config/dbMaxLengths";
import { comment } from "../types/dbTables";
import { createClient } from "@/utils/supabase/client";

export function AddComment({
    setComments,
    comments,
}: {
    setComments: any;
    comments: Array<{ comment: comment; username: string }>;
}) {
    const params = useParams<{ id: string }>();

    const [comment, setComment] = useState<[string, number]>(["", 0]);
    const [error, setError] = useState<apiError>();
    const [commentFocused, setCommentFocused] = useState<boolean>(false);

    function addComment() {
        if (comment[0].length > 0) {
            uploadComment(comment[0], params?.id).then((newComment) => {
                if (newComment.type === "success") {
                    const supabase = createClient();
                    supabase.auth.getUser().then((res: any) => {
                        if (res.data) {
                            const user_id = res.data.user?.id;
                            supabase
                                .from("profiles")
                                .select("username")
                                .eq("id", user_id)
                                .then((res: any) => {
                                    if (res.data) {
                                        const username: string =
                                            res.data[0].username;

                                        const newComments = [
                                            ...comments,
                                            {
                                                comment: newComment.content,
                                                username: username,
                                            },
                                        ];
                                        setComments(newComments);
                                        setComment(["", 0]);
                                    } else {
                                        setError(res);
                                    }
                                });
                        } else {
                            setError(res);
                        }
                    });
                } else {
                    setError(newComment);
                }
            });
        } else {
            const returnData: apiError = {
                type: "error",
                error: "Please complete the field.",
            };
            setError(returnData);
        }
    }

    return (
        <>
            <div className={styles.addComment}>
                <textarea
                    placeholder="Comment?"
                    style={{ minHeight: commentFocused ? "" : "170px" }}
                    onClick={() => {
                        setCommentFocused(true);
                    }}
                    onChange={(e: any) => {
                        setComment([e.target.value, e.target.value.length]);
                    }}
                    value={comment[0]}
                    maxLength={commentMaxLength}
                ></textarea>
                {commentFocused && (
                    <>
                        <p className={styles.characterCounter}>
                            {comment[1]} / {commentMaxLength}
                        </p>
                        <button
                            onClick={() => {
                                setCommentFocused(false);
                                setError(undefined);
                            }}
                        >
                            Cancel
                        </button>
                        <button onClick={addComment}>Comment</button>
                    </>
                )}
            </div>
            {/* {error?.type === "success" && (
                <p className={styles.error} style={{ color: "green" }}>
                    Success!
                </p>
            )} */}
            {error?.type === "error" && (
                <p className={styles.error} style={{ color: "red" }}>
                    {error.error}
                </p>
            )}
            {!error && (
                <>
                    <br />
                    <br />
                    <br />
                </>
            )}
        </>
    );
}
