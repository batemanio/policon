import { Articles } from "../components/Articles";
import { Suspense } from "react";
import { ArticlesSkeletons } from "../components/ArticleSkeletons";

export default async function ArticlesPage() {
    return (
        <>
            <Suspense fallback={<ArticlesSkeletons />}>
                <Articles />
                {/* <ArticlesSkeletons /> */}
            </Suspense>
        </>
    );
}
