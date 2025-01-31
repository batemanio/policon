import { ArticlesModel } from "../../models/articles";
import { FullArticle } from "@/app/components/FullArticle";
import { Suspense } from "react";
import { LoadingPage } from "@/app/components/LoadingPage";

export default async function Page({ params }: any) {
    const article: any = await ArticlesModel.findOne({ _id: params?.id });

    return (
        <>
            <Suspense fallback={<LoadingPage />}>
                <FullArticle article={JSON.stringify(article)} />
            </Suspense>
        </>
    );
}
