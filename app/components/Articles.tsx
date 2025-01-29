import { Article } from "./Article";
import { ArticlesModel } from "../models/articles";
import styles from "./Articles.module.scss";

export async function Articles() {
    const articles: any = await ArticlesModel.find();

    return (
        <>
            <h1 className={styles.articlesHeader}>Articles:</h1>
            <div className={styles.articles}>
                {articles.map((article: any, index: number) => (
                    <Article
                        key={index}
                        article={JSON.stringify(article)}
                    ></Article>
                ))}
                {/* <Article article={JSON.stringify(articles[0])}></Article> */}
            </div>
        </>
    );
}
