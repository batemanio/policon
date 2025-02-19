import { article } from "../types/dbTables";
import styles from "./Articles.module.scss";
import { createClient } from "@/utils/supabase/server";
import { ArticleServer } from "./ArticleServer";

export async function Articles() {
    const supabase: any = await createClient();

    const { data: articles, error: error1 } = await supabase
        .from("articles")
        .select("*")
        .range(0, 9);
    if (error1) {
        console.log(error1);
    }

    const { data: user, error: error2 } = await supabase.auth.getUser();

    const user_id = user.user.id;
    if (error2) {
        console.log(error2);
    }

    return (
        <>
            <h1 className={styles.articlesHeader}>Articles:</h1>
            <div className={styles.articles}>
                {articles.map((article: article, index: number) => (
                    <ArticleServer
                        key={index}
                        article={article}
                        user_id={user_id}
                    ></ArticleServer>
                ))}
                {/* <Article article={JSON.stringify(articles[0])}></Article> */}
            </div>
        </>
    );
}
