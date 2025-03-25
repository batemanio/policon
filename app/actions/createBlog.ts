"use server";

import { createClient } from "@/utils/supabase/server";
import { article, draft_article } from "../types/dbTables";
import { apiError } from "../types/errors";
import {
    bodyMaxLength,
    subTitleMaxLength,
    tagMaxLength,
    tagsMaxLength,
    titleMaxLength,
} from "../config/dbMaxLengths";
import { checkArrayLengths } from "./checkArrayLengths";

export async function createBlog(
    title: string,
    subTitle: string,
    primaryImageUrl: string,
    tags: string[],
    body: string,
    table: {
        table: "draft_articles" | "articles";
        update: { update: boolean; id?: string };
        status: "draft" | "pending";
    }
) {
    const supabase = await createClient();

    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (user) {
            const user_id: string = user.id;

            let article: article = {
                title: title,
                sub_title: subTitle,
                image: primaryImageUrl,
                tags: tags,
                user_id: user_id,
                content: body,
            };

            let draft_article: draft_article = {
                title: title,
                sub_title: subTitle,
                image: primaryImageUrl,
                tags: tags,
                user_id: user_id,
                content: body,
                status: table.status,
            };

            let insertData;
            table.table === "articles" && (insertData = article);
            table.table === "draft_articles" && (insertData = draft_article);

            if (
                title.length > 0 &&
                subTitle.length > 0 &&
                primaryImageUrl.length > 0 &&
                checkArrayLengths(tags, true)
            ) {
                if (
                    title.length <= titleMaxLength &&
                    subTitle.length <= subTitleMaxLength &&
                    body.length <= bodyMaxLength &&
                    tags.length <= tagsMaxLength &&
                    checkArrayLengths(tags, false)
                ) {
                    const supabase = await createClient();

                    if (!table.update.update) {
                        const { error } = await supabase
                            .from(table.table)
                            .insert(insertData)
                            .select();

                        if (!error?.message) {
                            return {
                                type: "success",
                            };
                        } else {
                            throw error;
                        }
                    } else if (
                        table.table == "draft_articles" &&
                        table.update
                    ) {
                        const { error } = await supabase
                            .from(table.table)
                            .update(insertData)
                            .eq("id", table.update.id)
                            .select();

                        if (!error?.message) {
                            return {
                                type: "success",
                            };
                        } else {
                            throw error;
                        }
                    }
                } else {
                    const returnData: apiError = {
                        type: "error",
                        error: "A field/s has to many characters.",
                    };
                    return returnData;
                }
            } else {
                const returnData: apiError = {
                    type: "error",
                    error: "Please complete all the fields.",
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
