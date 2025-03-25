import { createClient } from "@/utils/supabase/server";
import { PostCreatorClient } from "./PostCreaterClient";

export async function PostCreaterServer() {
    const supabase = await createClient();

    const { data: user, error: firstError } = await supabase.auth.getUser();

    if (firstError) {
        console.log(firstError);
    }

    if (user.user) {
        const { data, error: secondError } = await supabase
            .from("draft_articles")
            .select()
            .eq("user_id", user.user.id)
            .eq("status", "draft");

        if (secondError) {
            console.log(secondError);
        }

        return <PostCreatorClient draftArticles={data || []} />;
    }
}
