import { Article } from "./Article";

export function Articles() {
    // let articles: any = {};

    return (
        <div>
            {articles.map(({ article, index }: any) => (
                <Article article={article}></Article>
            ))}
        </div>
    );
}
