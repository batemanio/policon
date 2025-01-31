"use server";

import { ArticlesModel } from "../models/articles";

function checkArrayLegths(body: object[], tags: string[], toShort: boolean) {
    let error = false;
    let bodySectionTextLength: number = 0;
    let bodySectionImageLength: number = 0;
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
    body: object[],
    tags: string[],
    authorId: any
) {
    const blog = {
        title: title,
        subTitle: subTitle,
        image: primaryImage,
        tags: tags,
        author: authorId,
        content: body,
        likes: 0,
        dislikes: 0,
        comments: [],
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
            try {
                const blogData = new ArticlesModel(blog);
                await blogData.save();
                return {
                    type: "success",
                };
            } catch (error: any) {
                console.log(error);
                return {
                    type: "error",
                    error: "Error",
                };
            }
        } else {
            return {
                type: "error",
                error: "A field/s has to many characters.",
            };
        }
    } else {
        return { type: "error", error: "Please complete all the fields." };
    }
}
