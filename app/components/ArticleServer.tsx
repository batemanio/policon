import { getNumberOfLikesAndComments } from "../actions/getNumberOfLikesAndComments";
import { getUsername } from "../actions/getUsername";
import { isLiked } from "../actions/isLiked";
import { article } from "../types/dbTables";
import { apiError } from "../types/errors";
import { ArticleClient } from "./ArticleClient";

export async function ArticleServer({
    article,
    user_id,
}: {
    article: article;
    user_id: string | false;
}) {
    if (article.id) {
        const notLiked: apiError = { type: "success", content: true };

        const liked = user_id ? await isLiked(article.id, user_id) : notLiked;
        const numberOfLikesAndComments = await getNumberOfLikesAndComments(
            article.id
        );

        const username = await getUsername(article.user_id);

        if (numberOfLikesAndComments) {
            return (
                <ArticleClient
                    article={article}
                    liked={liked}
                    numberOfLikesAndComments={numberOfLikesAndComments}
                    username={username}
                    user_id={user_id}
                />
            );
        }
    }
}
