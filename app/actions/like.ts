"use server";

import { interaction } from "../types/dbTables";
import { apiError } from "../types/errors";
import { createClient } from "@/utils/supabase/server";
import { isLiked } from "./isLiked";

export async function like(article_id: string, increment: number) {
    try {
        if (increment === 1 || increment === -1) {
            const supabase = await createClient();

            const { data: user, error } = await supabase.auth.getUser();
            if (error?.message) {
                throw error;
            }

            if (user.user) {
                const user_id = user.user.id;

                const liked = await isLiked(article_id, user_id);

                if (liked.content) {
                    const interaction: interaction = {
                        user_id: user_id,
                        article_id: article_id,
                        type: "like",
                    };

                    const { error: thirdError } = await supabase
                        .from("interactions")
                        .insert(interaction);

                    if (thirdError?.message) {
                        console.log(thirdError);
                        throw thirdError;
                    }
                } else {
                    const { error: thirdError } = await supabase
                        .from("interactions")
                        .delete()
                        .eq("user_id", user_id)
                        .eq("article_id", article_id);

                    if (thirdError?.message) {
                        throw thirdError;
                    }
                }

                const returnData: apiError = {
                    type: "success",
                    content: liked.content,
                };
                return returnData;
            }
        } else {
            throw "invalid input for like update.";
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
