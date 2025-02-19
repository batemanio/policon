import { AccountFormServer } from "./accountFormServer";
import { Suspense } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";

export default async function Account() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <AccountFormServer />
        </Suspense>
    );
}
