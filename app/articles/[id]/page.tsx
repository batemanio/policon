import { ArticlesModel } from "../../models/articles";
import { FullArticle } from "@/app/components/FullArticle";
import { Suspense } from "react";
import { Header } from "../../components/Header";
import { LoadingPage } from "@/app/components/LoadingPage";

export default async function Page({ params }: any) {
    console.log(params?.id);

    const articleData: any = await ArticlesModel.findOne({ _id: params?.id });

    return (
        <>
            <Suspense fallback={<LoadingPage />}>
                <Header />
                <FullArticle articleData={articleData} />
            </Suspense>
        </>
    );
}
