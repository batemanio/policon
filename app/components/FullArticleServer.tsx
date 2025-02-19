import { createClient } from "@/utils/supabase/server";
import { FullArticleClient } from "./FullArticleClient";
import { getNumberOfLikesAndComments } from "../actions/getNumberOfLikesAndComments";
import { getUsername } from "../actions/getUsername";
import { isLiked } from "../actions/isLiked";
import { getComments } from "../actions/getComments";

export async function FullArticleServer({
    article_id,
}: {
    article_id: string;
}) {
    const supabase = await createClient();

    const { data: article, error: firstError } = await supabase
        .from("articles")
        .select()
        .eq("id", article_id);
    if (firstError?.message) {
        console.log(firstError);
    }

    const { data: user, error: secondError } = await supabase.auth.getUser();
    if (secondError?.message) {
        console.log(secondError);
    }

    if (user.user && article_id && article) {
        const user_id = user.user.id;

        const liked = await isLiked(article_id, user_id);

        const numberOfLikesAndComments = await getNumberOfLikesAndComments(
            article_id
        );

        const username = await getUsername(user_id);

        const comments = await getComments(article_id);

        return (
            <FullArticleClient
                article={article[0]}
                liked={liked}
                numberOfLikesAndComments={numberOfLikesAndComments}
                username={username}
                serverComments={comments}
            />
        );
    }
}
