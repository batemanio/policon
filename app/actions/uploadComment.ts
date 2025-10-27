"use server";

import { comment } from "../types/dbTables";
import { createClient } from "@/utils/supabase/server";
import { apiError } from "../types/errors";
import { commentMaxLength } from "../config/dbMaxLengths";

export async function uploadComment(newComment: string, article_id: string) {
    try {
        const supabase = await createClient();

        const { data: user, error } = await supabase.auth.getUser();
        if (error) {
            throw "Please login";
        }
        if (user.user) {
            const user_id = user.user.id;

            const comment: comment = {
                user_id: user_id,
                article_id: article_id,
                content: newComment,
            };

            if (newComment.length > 0) {
                if (newComment.length <= commentMaxLength) {
                    const { data: newComment, error } = await supabase
                        .from("comments")
                        .insert(comment)
                        .select();

                    // const { data: updatedData, error: updatedError } =
                    //     await supabase
                    //         .from("comments")
                    //         .select()
                    //         .eq("article_id", article_id);

                    if (!error?.message && newComment) {
                        const returnData: apiError = {
                            type: "success",
                            content: newComment[0],
                        };
                        return returnData;
                    } else {
                        // if (error?.message) {
                        throw error;
                        // }
                        // if (updatedError?.message) {
                        //     throw updatedError;
                        // } else {
                        //     throw "upload comments ERROR";
                        // }
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
        } else {
            throw "upload comments ERROR";
        }
    } catch (error) {
        console.log(error);

        const returnData: apiError = {
            type: "error",
            error: error,
        };
        return returnData;
    }
}
