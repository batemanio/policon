import { Suspense } from "react";
import { ProfileServer } from "./ProfileServer";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";

export default async function Page({ params }: { params: { id: string } }) {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <ProfileServer user_id={params.id} />
        </Suspense>
    );
}
