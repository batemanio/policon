"use server";

import { ArticlesModel } from "../models/articles";

export async function createBlog(
    title: string,
    subTitle: string,
    primaryImage: string,
    body: object,
    tags: string[],
    authorId: string
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

    try {
        const blogData = new ArticlesModel(blog);
        await blogData.save();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
