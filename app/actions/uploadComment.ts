"use server";

import { ArticlesModel } from "../models/articles";

export async function uploadComment(newComment: string, id: any) {
    const comment: any = {
        author: "id_placeholder",
        content: newComment,
        likes: 0,
    };

    if (newComment.length > 0) {
        if (newComment.length <= 500) {
            try {
                console.log(await ArticlesModel.findOne({ _id: id }));
                const updatedArticle = await ArticlesModel.findOneAndUpdate(
                    { _id: id },
                    { $push: { comments: comment } },
                    { new: true }
                );

                return {
                    type: "success",
                    content: JSON.stringify(updatedArticle.comments),
                };
            } catch (error) {
                console.log(error);
            }
        } else {
            return {
                type: "error",
                error: "The field has to many characters.",
            };
        }
    } else {
        return { type: "error", error: "Please complete the field." };
    }
}
