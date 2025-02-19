"use client";

import { ThreeDots } from "react-loader-spinner";
import styles from "./LoadingSpinner.module.scss";

export function LoadingSpinner() {
    return (
        <ThreeDots
            visible={true}
            height="150"
            width="150"
            color="aqua"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperClass={styles.container}
        />
    );
}
