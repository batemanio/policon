"use server";

import { createClient } from "@/utils/supabase/server";
import { article, content } from "../types/dbTables";
import { apiError } from "../types/errors";

function checkArrayLegths(body: [content], tags: string[], toShort: boolean) {
    let error = false;
    let bodySectionTextLength = 0;
    let bodySectionImageLength = 0;
    if (!toShort) {
        bodySectionTextLength = 5000;
        bodySectionImageLength = 400;
    }

    for (let i = 0; i < body.length; i++) {
        let bodySection: any = body[i];
        if (bodySection.text) {
            bodySection.text[0];
        }
        if (bodySection.image) {
            bodySection.image[0];
        }
        if (
            bodySection.length > bodySectionTextLength ||
            bodySection.length > bodySectionImageLength
        ) {
            error = true;
        }
    }
    for (let i = 0; i < tags.length; i++) {
        const tagSection = tags[i];
        if (tagSection.length > 15) {
            error = true;
        }
    }

    return !error;
}

export async function createBlog(
    title: string,
    subTitle: string,
    primaryImage: string,
    tags: string[],
    body: [content]
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
                image: primaryImage,
                tags: tags,
                user_id: user_id,
                content: body,
            };

            const checkArray: boolean = checkArrayLegths(body, tags, true);
            if (
                title.length > 0 &&
                subTitle.length > 0 &&
                primaryImage.length > 0 &&
                checkArray
            ) {
                if (
                    title.length <= 75 &&
                    subTitle.length <= 125 &&
                    primaryImage.length <= 400 &&
                    checkArrayLegths(body, tags, false)
                ) {
                    const supabase = await createClient();

                    const { data, error } = await supabase
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
