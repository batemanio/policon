"use client";

import { useState } from "react";
import styles from "./FullArticle.module.scss";
import { uploadComment } from "../actions/uploadComment";
import { useParams } from "next/navigation";

export function AddComment() {
    const params = useParams<{ id: string }>();

    const [comment, setComment]: any = useState(["", 0]);
    const [error, setError]: any = useState({});

    function addComment() {
        if (comment[0].length > 0) {
            if (comment[0].length > 0) {
                uploadComment(comment[0], params?.id).then((res: any) => {
                    console.log(res);
                    setError(res);
                });
            } else {
                setError({
                    type: "error",
                    error: "The field has to many characters.",
                });
            }
        } else {
            setError({ type: "error", error: "Please complete the field." });
        }
    }

    return !error.type ? (
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
    ) : error.type === "success" ? (
        <p className={styles.error} style={{ color: "green" }}>
            Success!
        </p>
    ) : (
        <p className={styles.error} style={{ color: "red" }}>
            Error: {error.error}
        </p>
    );
}
