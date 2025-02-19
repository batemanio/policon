"use server";

import { createClient } from "@/utils/supabase/server";
import { apiError } from "../types/errors";

export async function getNumberOfLikesAndComments(article_id: string) {
    try {
        const supabase = await createClient();

        const { data: likes, error: firstError } = await supabase
            .from("interactions")
            .select()
            .eq("article_id", article_id)
            .eq("type", "like");

        if (!firstError?.message) {
            const { data: comments, error: secondError } = await supabase
                .from("interactions")
                .select()
                .eq("article_id", article_id)
                .eq("type", "comment");
            if (!secondError?.message) {
                if (likes && comments) {
                    const nOfLikes: number = likes.length;
                    const nOfComments: number = comments.length;

                    const returnData: apiError = {
                        type: "success",
                        content: [nOfLikes, nOfComments],
                    };
                    return returnData;
                } else {
                    throw secondError;
                }
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
