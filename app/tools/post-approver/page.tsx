import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { Suspense } from "react";
import { PostApproverServer } from "./PostApproverServer";

export default async function Page() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <PostApproverServer />
        </Suspense>
    );
}
