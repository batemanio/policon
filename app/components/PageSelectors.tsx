"use client";

import Link from "next/link";
import { itemsPerPage } from "../config/itemsPerPage";
import styles from "./Articles.module.scss";

export function PageSelector({
    pageNumber,
    currentPage,
    numberOfPages,
}: {
    pageNumber: number;
    currentPage: number;
    numberOfPages: number;
}) {
    return (
        <Link href={`?page=${pageNumber}`}>
            <p
                style={{
                    color:
                        currentPage === pageNumber && numberOfPages > 1
                            ? "aqua"
                            : "",
                }}
                className={styles.page}
            >
                {pageNumber}
            </p>
        </Link>
    );
}

export function PageSelectors({
    numberOfItems,
    currentPage,
}: {
    numberOfItems: number;
    currentPage: number;
}) {
    const numberOfPages = Math.ceil(numberOfItems / itemsPerPage);

    if (numberOfPages > 1) {
        return (
            <div className={styles.pagesContainer}>
                {[...Array(numberOfPages)].map((_, i) => (
                    <PageSelector
                        numberOfPages={numberOfPages}
                        currentPage={currentPage}
                        key={i}
                        pageNumber={i + 1}
                    />
                ))}
            </div>
        );
    }
}
