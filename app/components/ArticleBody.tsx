"use client";

import { ArticleSection } from "./ArticleSection";
import styles from "./FullArticle.module.scss";

export function ArticleBody({ body }: any) {
    return (
        <div className={styles.article}>
            <ArticleSection body={body} />
        </div>
    );
}
