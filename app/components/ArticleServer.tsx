import { getNumberOfLikesAndComments } from "../actions/getNumberOfLikesAndComments";
import { getUsername } from "../actions/getUsername";
import { isLiked } from "../actions/isLiked";
import { article } from "../types/dbTables";
import { ArticleClient } from "./ArticleClient";

export async function ArticleServer({
    article,
    user_id,
}: {
    article: article;
    user_id: string;
}) {
    if (article.id) {
        const liked = await isLiked(article.id, user_id);

        const numberOfLikesAndComments = await getNumberOfLikesAndComments(
            article.id
        );

        const username = await getUsername(user_id);

        if (numberOfLikesAndComments) {
            return (
                <ArticleClient
                    article={article}
                    liked={liked}
                    numberOfLikesAndComments={numberOfLikesAndComments}
                    username={username}
                />
            );
        }
    }
}
