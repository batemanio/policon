"use server";

import { createClient } from "@/utils/supabase/server";
import { apiError } from "../types/errors";

export async function updateProfile(
    user_id: string,
    full_name: string,
    username: string,
    avatar_url: string,
    bio: string
) {
    try {
        const supabase = await createClient();

        const { data: profile, error } = await supabase
            .from("profiles")
            .upsert({
                id: user_id,
                full_name: full_name,
                username: username,
                avatar_url: avatar_url,
                bio: bio,
                edited_at: new Date().toISOString(),
            })
            .select();
        if (error) {
            throw error;
        } else {
            const returnData: apiError = {
                type: "success",
                content: profile[0],
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
