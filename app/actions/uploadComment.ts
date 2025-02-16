"use server";

import { comment, content } from "../types/dbTables";
import { createClient } from "@/utils/supabase/server";
import { apiError } from "../types/errors";

export async function uploadComment(newComment: string, article_id: string) {
    try {
        const supabase = await createClient();

        const { data: user, error } = await supabase.auth.getUser();
        if (error?.message) {
            throw error;
        }
        if (user.user) {
            const user_id = user.user.id;

            const content: content = { type: "text", data: newComment };

            const comment: comment = {
                user_id: user_id,
                article_id: article_id,
                content: [content],
            };

            if (newComment.length > 0) {
                if (newComment.length <= 500) {
                    const { data, error } = await supabase
                        .from("comments")
                        .insert(comment);

                    const { data: updatedData, error: updatedError } =
                        await supabase
                            .from("comments")
                            .select("*")
                            .eq("article_id", article_id);

                    if (!error?.message && !updatedError) {
                        return {
                            type: "success",
                            content: updatedData,
                        };
                    } else {
                        if (error?.message) {
                            throw error;
                        }
                        if (updatedError?.message) {
                            throw updatedError;
                        }
                    }
                } else {
                    const returnData: apiError = {
                        type: "error",
                        error: "The field has to many characters.",
                    };
                    return returnData;
                }
            } else {
                const returnData: apiError = {
                    type: "error",
                    error: "Please complete the field.",
                };
                return returnData;
            }
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
