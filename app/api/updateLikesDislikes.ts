"use server";

import { ArticlesModel } from "../models/articles";

export async function updateLikesDislikes(
    field: string,
    increment: number,
    id: any
) {
    try {
        if (
            (field === "likes" || field === "dislikes") &&
            (increment === -1 || increment === 1)
        ) {
            if (field === "likes") {
                const updatedArticle = await ArticlesModel.findOneAndUpdate(
                    { _id: id },
                    { $inc: { likes: increment } },
                    { new: true }
                );
                return updatedArticle.likes;
            }
            if (field === "dislikes") {
                const updatedArticle = await ArticlesModel.findOneAndUpdate(
                    { _id: id },
                    { $inc: { dislikes: increment } },
                    { new: true }
                );
                return updatedArticle.dislikes;
            }
        }
    } catch (error) {
        console.log(error);
    }
}
