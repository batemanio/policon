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
            type: "UUID",
            require: true,
        },
        content: { type: Map, require: true },
        likes: { type: Number, require: true },
        dislikes: { type: Number, require: true },
        comments: [
            {
                author: "UUID",
                date: { type: Date, default: Date.now },
                body: Map,
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
