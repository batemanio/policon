"use server";

import { createClient } from "@/utils/supabase/server";
import { apiError } from "../types/errors";

export async function approveArticle(approved_article_id: string) {
    try {
        const supabase = await createClient();

        let { data: approved_article, error } = await supabase
            .from("draft_articles")
            .select()
            .eq("id", approved_article_id);

        if (error) {
            throw error;
        }

        if (approved_article) {
            delete approved_article[0].status;
            const { error } = await supabase
                .from("articles")
                .insert(approved_article[0]);

            if (error) {
                throw error;
            }

            const returnData: apiError = {
                type: "success",
            };
            return returnData;
        } else {
            throw "Unknow article to approve";
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
