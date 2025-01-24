import { Header } from "../components/Header";
import { Articles } from "../components/Articles";
import { Suspense } from "react";
import { LoadingPage } from "../components/LoadingPage";

export default async function ArticlesPage() {
    return (
        <>
            <Suspense fallback={<LoadingPage />}>
                <Header />
                <Articles />
            </Suspense>
        </>
    );
}
