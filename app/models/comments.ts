import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema(
    {
        postId: {
            type: String,
            require: true,
        },
        content: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

export const CommentsModel =
    mongoose.models.comments ?? mongoose.model("comments", commentsSchema);
