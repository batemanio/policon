import Image from "next/image";
import styles from "./page.module.css";
import { Header } from "../components/Header";
import { Articles } from "../components/Articles";
import { Suspense } from "react";

export default function ArticlesPage() {
    return (
        <>
            <Header />
            <Suspense fallback={<h1>Loading...</h1>}>
                <Articles />
            </Suspense>
        </>
    );
}
