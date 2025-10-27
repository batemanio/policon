import { createClient } from "@/utils/supabase/server";
import { PostApproverClient } from "./PostApproverClient";

export async function PostApproverServer() {
    const supabase = await createClient();

    const pendingArticles = await supabase
        .from("draft_articles")
        .select()
        .eq("status", "pending");

    return <PostApproverClient pendingArticles={pendingArticles.data || []} />;
}
