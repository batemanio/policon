"use client";

import Image from "next/image";
import styles from "./Articles.module.scss";
import Link from "next/link";

export function Article({ article, index }: any) {
    article = JSON.parse(article);

    let date: any = new Date(article.createdAt);
    date = `${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}`;

    return (
        <div key={article._id} className={styles.article}>
            <Link href={`/articles/${article._id}`}>
                {/* title: {article.title}
            subTitle: {article.subTitle}
            tags: {article.tags}
            author: {article.author}
            created At: {article.createdAt}
            Last Edited At: {article.updatedAt}
            likes: {article.likes}
            dislikes: {article.dislikes} */}
                <img src={article.image} alt="article image"></img>
                <h1>{article.title}</h1>
                <p>{date}</p>
            </Link>
        </div>
    );
}
