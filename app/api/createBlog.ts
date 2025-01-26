"use server";

import { ArticlesModel } from "../models/articles";

export async function createBlog(
    title: string,
    subTitle: string,
    primaryImage: string,
    body: object,
    tags: any,
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

    const blogData = new ArticlesModel(blog);
    await blogData.save();
}
