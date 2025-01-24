import { Header } from "../components/Header";
import { Articles } from "../components/Articles";
import { Suspense } from "react";
import { ArticlesModel } from "../models/articles";

async function loadArticles() {
    const articles = await ArticlesModel.create({
        title: "First Post",
        subTitle: "Welcome to our first post!",
        image: "https://static-cse.canva.com/blob/1625986/ComposeStunningImages7.jpg",
        tags: ["new", "first"],
        author: "<id>",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        likes: 0,
        dislikes: 0,
    });
    console.log(articles);
}
// loadArticles();

export default async function ArticlesPage() {
    return (
        <>
            <Header />
            <Suspense fallback={<h1>Loading...</h1>}>
                <Articles />
            </Suspense>
        </>
    );
}
