import { FullArticleServer } from "@/app/components/FullArticleServer";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { Suspense } from "react";

export default async function Page({ params }: { params: { id: string } }) {
    const { id: article_id } = params;

    return (
        <>
            <Suspense fallback={<LoadingSpinner />}>
                <FullArticleServer article_id={article_id} />
            </Suspense>
        </>
    );
}
