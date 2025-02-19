"use server";

import { createClient } from "@/utils/supabase/server";
import { apiError } from "../types/errors";

export async function getUsername(user_id: string) {
    try {
        const supabase = await createClient();

        const { data: username, error } = await supabase
            .from("profiles")
            .select("username")
            .eq("id", user_id);

        if (error?.message) {
            throw error;
        }

        if (username) {
            const returnData: apiError = {
                type: "success",
                content: username[0].username,
            };
            return returnData;
        } else {
            throw "Invalid user";
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
