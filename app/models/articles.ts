import mongoose from "mongoose";

const articlesSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        subTitle: {
            type: String,
            require: true,
        },
        image: {
            type: String,
            require: true,
        },
        tags: {
            type: Array,
            require: true,
        },
        author: {
            type: String,
            // type: "UUID",
            require: true,
        },
        content: {
            type: Array,
            require: true,
        },
        likes: { type: Number, require: true },
        dislikes: { type: Number, require: true },
        comments: [
            {
                author: String,
                date: { type: Date, default: Date.now },
                content: String,
                likes: Number,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const ArticlesModel =
    mongoose.models?.articles || mongoose.model("articles", articlesSchema);

// mongoose.models.articles ?? mongoose.model("articles", articlesSchema);
