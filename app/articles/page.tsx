import { Articles } from "../components/Articles";
import { Suspense } from "react";
import { ArticlesSkeletons } from "../components/ArticleSkeletons";

export default async function ArticlesPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    return (
        <>
            <Suspense fallback={<ArticlesSkeletons />}>
                <Articles searchParams={searchParams} />
                {/* <ArticlesSkeletons /> */}
            </Suspense>
        </>
    );
}
