"use server";

import { createClient } from "@/utils/supabase/server";
import { apiError } from "../types/errors";

export async function follow(followed_user_id: string) {
    try {
        const supabase = await createClient();

        const { data: user, error } = await supabase.auth.getUser();

        if (error) {
            throw error;
        }

        if (followed_user_id !== user.user.id) {
            if (user.user) {
                const { data: followed, error } = await supabase
                    .from("follows")
                    .select()
                    .eq("following_user_id", user.user.id)
                    .eq("followed_user_id", followed_user_id);

                if (error) {
                    throw error;
                }

                const isFollowed = followed?.length ? true : false;

                if (isFollowed) {
                    const { error } = await supabase
                        .from("follows")
                        .delete()
                        .eq("following_user_id", user.user.id)
                        .eq("followed_user_id", followed_user_id);

                    if (error) {
                        throw error;
                    }

                    const returnData: apiError = {
                        type: "success",
                        content: false,
                    };
                    return returnData;
                } else {
                    const followData = {
                        followed_user_id: followed_user_id,
                    };
                    const { error } = await supabase
                        .from("follows")
                        .insert(followData);

                    if (error) {
                        throw error;
                    }

                    const returnData: apiError = {
                        type: "success",
                        content: true,
                    };
                    return returnData;
                }
            } else {
                const returnData: apiError = {
                    type: "error",
                    error: "Please login to continue",
                };
                return returnData;
            }
        } else {
            const returnData: apiError = {
                type: "error",
                error: "You can't follow yourself",
            };
            return returnData;
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
