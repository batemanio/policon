import { createClient } from "@/utils/supabase/server";
import { FullArticleClient } from "./FullArticleClient";
import { getNumberOfLikesAndComments } from "../actions/getNumberOfLikesAndComments";
import { getUsername } from "../actions/getUsername";
import { isLiked } from "../actions/isLiked";
import { getComments } from "../actions/getComments";
import { apiError } from "../types/errors";

export async function FullArticleServer({
    searchParams,
    article_id,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
    article_id: string;
}) {
    const currentPage = Number((await searchParams).page) | 1;

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

        const comments = await getComments(article_id, currentPage);

        const commentsWithUsernames = [];
        for (let index = 0; index < comments.content.length; index++) {
            const comment = comments.content[index];
            const username: apiError = await getUsername(comment.user_id);
            commentsWithUsernames.push({
                comment: comment,
                username: username.content,
            });
        }

        const { count, error: thirdError } = await supabase
            .from("comments")
            .select("*", { count: "exact", head: true })
            .eq("article_id", article_id);

        if (thirdError) {
            console.log(thirdError);
        }

        return (
            <FullArticleClient
                currentPage={currentPage}
                numberOfComments={count ?? 0}
                article={article[0]}
                liked={liked}
                numberOfLikesAndComments={numberOfLikesAndComments}
                username={username}
                commentsWithUsernames={commentsWithUsernames}
            />
        );
    }
}
