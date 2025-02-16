import { article } from "../types/dbTables";
import { Article } from "./Article";
import styles from "./Articles.module.scss";
import { createClient } from "@/utils/supabase/server";

type articles = { data: [article] };

export async function Articles() {
    const supabase: any = await createClient();

    const { data: articles }: articles = await supabase
        .from("articles")
        .select("*")
        .range(0, 9);

    return (
        <>
            <h1 className={styles.articlesHeader}>Articles:</h1>
            <div className={styles.articles}>
                {articles.map((article: article, index: number) => (
                    <Article key={index} article={article}></Article>
                ))}
                {/* <Article article={JSON.stringify(articles[0])}></Article> */}
            </div>
        </>
    );
}
