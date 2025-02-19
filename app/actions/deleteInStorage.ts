"use server";

import { createClient } from "@/utils/supabase/server";
import { apiError } from "../types/errors";
import { buckets } from "../types/dbTables";

export async function deleteInStorage(avatar_id: string, bucket: buckets) {
    // console.log("deleting...");
    try {
        const supabase = await createClient();

        const { data, error } = await supabase.storage
            .from(bucket)
            .remove([avatar_id]);

        if (error?.message) {
            throw error;
        } else {
            const returnData: apiError = {
                type: "success",
                content: data,
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
