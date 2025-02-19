"use client";

import { useState } from "react";
import styles from "./FullArticle.module.scss";
import { uploadComment } from "../actions/uploadComment";
import { useParams } from "next/navigation";
import { apiError } from "../types/errors";

export function AddComment({ setComments }: { setComments: any }) {
    const params = useParams<{ id: string }>();

    const [comment, setComment] = useState<[string, number]>(["", 0]);
    const [error, setError] = useState<apiError>();

    function addComment() {
        if (comment[0].length > 0) {
            if (comment[0].length > 0) {
                uploadComment(comment[0], params?.id).then((res: any) => {
                    setComments(res.content);
                    setError(res);
                    setComment(["", 0]);
                });
            } else {
                const returnData: apiError = {
                    type: "error",
                    error: "The field has to many characters.",
                };
                setError(returnData);
            }
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
                    onChange={(e: any) => {
                        setComment([e.target.value, e.target.value.length]);
                    }}
                    value={comment[0]}
                    maxLength={500}
                ></textarea>
                <p className={styles.characterCounter}>{comment[1]} / 500</p>
                <button onClick={addComment}>Add comment</button>
            </div>
            {error?.type === "success" && (
                <p className={styles.error} style={{ color: "green" }}>
                    Success!
                </p>
            )}
            {error?.type === "error" && (
                <p className={styles.error} style={{ color: "red" }}>
                    Error: {error.error?.toString()}
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
