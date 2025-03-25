import { FullArticleServer } from "@/app/components/FullArticleServer";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { Suspense } from "react";

export default async function Page({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { id: article_id } = params;

    return (
        <>
            <Suspense fallback={<LoadingSpinner />}>
                <FullArticleServer
                    searchParams={searchParams}
                    article_id={article_id}
                />
            </Suspense>
        </>
    );
}
