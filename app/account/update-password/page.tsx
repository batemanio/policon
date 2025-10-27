"use client";

import { useState } from "react";
import styles from "../../login/page.module.scss";
import { apiError } from "@/app/types/errors";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    const [error, setError] = useState<apiError | null>();
    const [password, setPassword] = useState("");

    function updatePassword() {
        setError(undefined);

        const supabase = createClient();

        supabase.auth.updateUser({ password: password }).then((res) => {
            console.log(res);
            if (res.error) {
                console.log(error);
                const returnData: apiError = {
                    type: "error",
                    error: res.error,
                };
                setError(returnData);
            } else {
                const returnData: apiError = {
                    type: "success",
                };
                setError(returnData);

                router.push("/account");
            }
        });
    }

    return (
        <div className={styles.form}>
            <h1 className={styles.header}>New Password</h1>
            <input
                placeholder="Password"
                className={styles.input}
                type="password"
                name="password"
                maxLength={100}
                required
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <button className={styles.confirm} onClick={updatePassword}>
                Save
            </button>
            {error?.type === "error" && (
                <p style={{ color: "red" }} className={styles.error}>
                    {error.error}
                </p>
            )}
            {error?.type === "success" && (
                <p style={{ color: "green" }} className={styles.error}>
                    Password Updated!
                </p>
            )}
            <br />
            <br />
        </div>
    );
}
