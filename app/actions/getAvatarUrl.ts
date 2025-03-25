"use server";

import { createClient } from "@/utils/supabase/server";
import { apiError } from "../types/errors";

export async function getAvatarUrl(path: string) {
    try {
        const supabase = await createClient();

        const { data } = supabase.storage.from("avatars").getPublicUrl(path);
        // if (error?.message) {
        //     throw error;
        // }

        if (data) {
            // const url = URL.createObjectURL(data);

            const returnData: apiError = {
                type: "success",
                content: data.publicUrl,
            };
            return returnData;
        } else {
            throw "error downloading image";
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
