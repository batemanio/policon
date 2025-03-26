"use client";

import { draft_article } from "@/app/types/dbTables";
import Image from "next/image";
import { useState } from "react";
import styles from "@/app/components/FullArticle.module.scss";
import parse from "html-react-parser";
import { approveArticle } from "@/app/actions/approveArticle";
import { apiError } from "@/app/types/errors";

export function PostApproverClient({
    pendingArticles,
}: {
    pendingArticles: Array<draft_article>;
}) {
    const [viewedArticle, setViewedArticle] = useState<draft_article>();
    const [error, setError] = useState<apiError>();

    function setCurrentArticle(event: any) {
        const currentArticle = pendingArticles.filter((pendingArticle) => {
            return String(pendingArticle.id) === event.target.value;
        });

        setViewedArticle(currentArticle[0]);
    }

    function approveArticleClient() {
        if (viewedArticle?.id) {
            approveArticle(viewedArticle.id).then((res) => {
                setError(res);
            });
        }
    }

    return (
        <>
            <div>
                <h2>Pending articles title:</h2>
                <select
                    onChange={(e) => {
                        setCurrentArticle(e);
                    }}
                >
                    <option>Select a title</option>
                    {pendingArticles.map(
                        (draftArticle: draft_article, index: number) => (
                            <option value={draftArticle.id} key={index}>
                                {draftArticle.title}
                            </option>
                        )
                    )}
                </select>
                <button onClick={approveArticleClient}>Approve!</button>
            </div>
            <div>
                {viewedArticle ? (
                    <div className={styles.article}>
                        <Image
                            width={500}
                            height={500}
                            alt="primary image"
                            className={styles.primaryImage}
                            src={viewedArticle.image}
                        />
                        <h1 className={styles.title}>{viewedArticle.title}</h1>
                        <p className={styles.subTitle}>
                            {viewedArticle.sub_title}
                        </p>
                        <div>{parse(viewedArticle.content)}</div>
                    </div>
                ) : (
                    <h1></h1>
                )}
            </div>
            {error?.type === "success" && (
                <p style={{ color: "green" }}>Success!</p>
            )}{" "}
            {error?.type === "error" && (
                <p style={{ color: "red" }}>
                    Error: {JSON.stringify(error.error)}
                </p>
            )}
        </>
    );
}
