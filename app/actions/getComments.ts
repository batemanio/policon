"use server";

import { createClient } from "@/utils/supabase/server";
import { apiError } from "../types/errors";

export async function getComments(article_id: string) {
    try {
        const supabase = await createClient();

        const { data: comments, error } = await supabase
            .from("comments")
            .select()
            .eq("article_id", article_id);

        if (error) {
            throw error;
        }

        const returnData: apiError = {
            type: "success",
            content: comments,
        };
        return returnData;
    } catch (error) {
        console.log(error);

        const returnData: apiError = {
            type: "error",
            error: "Error",
        };
        return returnData;
    }
}
