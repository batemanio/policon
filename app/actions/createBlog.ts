"use server";

import { createClient } from "@/utils/supabase/server";
import { article } from "../types/dbTables";
import { apiError } from "../types/errors";
import {
    bodyMaxLength,
    subTitleMaxLength,
    tagMaxLength,
    tagsMaxLength,
    titleMaxLength,
} from "../config/dbMaxLengths";

function checkArrayLegths(tags: string[], toShort: boolean) {
    let error = false;

    for (let i = 0; i < tags.length; i++) {
        const tagSection = tags[i];
        if (tagSection.length > tagMaxLength && !toShort) {
            error = true;
        }
        if (tagSection.length <= 0 && toShort) {
            error = true;
        }
    }

    return !error;
}

export async function createBlog(
    title: string,
    subTitle: string,
    primaryImageUrl: string,
    tags: string[],
    body: string
) {
    const supabase = await createClient();

    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (user) {
            const user_id: string = user.id;

            const article: article = {
                title: title,
                sub_title: subTitle,
                image: primaryImageUrl,
                tags: tags,
                user_id: user_id,
                content: body,
            };

            if (
                title.length > 0 &&
                subTitle.length > 0 &&
                primaryImageUrl.length > 0 &&
                checkArrayLegths(tags, true)
            ) {
                if (
                    title.length <= titleMaxLength &&
                    subTitle.length <= subTitleMaxLength &&
                    body.length <= bodyMaxLength &&
                    tags.length <= tagsMaxLength &&
                    checkArrayLegths(tags, false)
                ) {
                    const supabase = await createClient();

                    const { error } = await supabase
                        .from("articles")
                        .insert(article)
                        .select();

                    if (!error?.message) {
                        return {
                            type: "success",
                        };
                    } else {
                        throw error;
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
