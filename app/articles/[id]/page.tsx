"use client";

import { useParams } from "next/navigation";
import { ArticlesModel } from "../../models/articles";

export default async function Page() {
    const { id } = useParams();

    const article: any = await ArticlesModel.findOne({ _id: id });

    return (
        <>
            <p>Post id: {id}</p>
            <p>{article}</p>
        </>
    );
}
