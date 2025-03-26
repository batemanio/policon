import { article } from "../types/dbTables";
import styles from "./Articles.module.scss";
import { createClient } from "@/utils/supabase/server";
import { ArticleServer } from "./ArticleServer";
import { itemsPerPage } from "../config/itemsPerPage";
import { PageSelectors } from "./PageSelectors";

export async function Articles({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const currentPage = Number((await searchParams).page) | 1;

    const supabase: any = await createClient();

    const { data: articles, error: firstError } = await supabase
        .from("articles")
        .select()
        .range(
            0 + (currentPage - 1) * 9,
            itemsPerPage - 1 + (currentPage - 1) * 9
        )
        .order("created_at", { ascending: false });

    if (firstError) {
        console.log(firstError);
    }

    const { count, error: secondError } = await supabase
        .from("articles")
        .select("*", { count: "exact", head: true });

    if (secondError) {
        console.log(secondError);
    }

    const { data: user } = await supabase.auth.getUser();

    return (
        <>
            <h1 className={styles.articlesHeader}>Articles:</h1>
            <div className={styles.articles}>
                {articles.map((article: article, index: number) => (
                    <ArticleServer
                        key={index}
                        article={article}
                        user_id={user?.user?.id || false}
                    ></ArticleServer>
                ))}
                <PageSelectors
                    currentPage={currentPage ? currentPage : 1}
                    numberOfItems={count}
                />
            </div>
        </>
    );
}
