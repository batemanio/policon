"use client";

import { MdOutlineClear } from "react-icons/md";
import styles from "./Alert.module.scss";

export function Alert({
    message,
    good,
    hideHook,
}: {
    message: string;
    good: boolean;
    hideHook: any;
}) {
    return (
        <div className={styles.containersContainer}>
            <div
                className={styles.container}
                style={{ color: good ? "green" : "red" }}
            >
                <MdOutlineClear
                    className={styles.closeButton}
                    onClick={() => {
                        hideHook(false);
                    }}
                />

                <p className={styles.message}>{message}</p>
            </div>
        </div>
    );
}
