"use server";

import { createClient } from "@/utils/supabase/server";
import { apiError } from "../types/errors";

export async function isLiked(article_id: string, user_id: string) {
    try {
        const supabase = await createClient();

        let { data, error: error } = await supabase
            .from("interactions")
            .select()
            .eq("article_id", article_id)
            .eq("user_id", user_id);

        if (error?.message) {
            throw error;
        }

        let liked = false;

        if (data?.length) {
            liked = true;
        }

        return !liked;
    } catch (error) {
        console.log(error);

        const returnData: apiError = {
            type: "error",
            error: "Error",
        };
        return returnData;
    }
}
