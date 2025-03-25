"use server";

import { createClient } from "@/utils/supabase/server";
import { apiError } from "../types/errors";

export async function getNumberOfLikesAndComments(article_id: string) {
    try {
        const supabase = await createClient();

        const { count: likes, error: firstError } = await supabase
            .from("interactions")
            .select("*", { count: "exact", head: true })
            .eq("article_id", article_id)
            .eq("type", "like");

        if (!firstError?.message) {
            const { count: comments, error: secondError } = await supabase
                .from("comments")
                .select("*", { count: "exact", head: true })
                .eq("article_id", article_id);

            if (!secondError?.message) {
                // if (likes && comments) {

                const returnData: apiError = {
                    type: "success",
                    content: [likes, comments],
                };
                return returnData;
                // } else {
                //     throw secondError;
                // }
            } else {
                throw secondError;
            }
        } else {
            throw firstError;
        }
    } catch (error) {
        console.log(error);

        const returnData: apiError = {
            type: "error",
            error: "Error",
        };
        return returnData;
    }
}
