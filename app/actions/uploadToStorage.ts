import { createClient } from "@/utils/supabase/client";
import { apiError } from "../types/errors";
import { buckets } from "../types/dbTables";

export async function uploadToStorage(
    filePath: string,
    file: any,
    bucket: buckets
) {
    // console.log("uploading...");
    try {
        const supabase = createClient();

        const { data, error: secondError } = await supabase.storage
            .from(bucket)
            .upload(filePath, file, { upsert: true });

        if (secondError) {
            throw secondError;
        }

        const returnData: apiError = {
            type: "success",
            content: data,
        };

        return returnData;
    } catch (error) {
        console.log(error);

        const returnData: apiError = {
            type: "error",
            error: error,
        };
        return returnData;
    }
}
