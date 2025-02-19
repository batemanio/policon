"use client";

import { Suspense, useEffect, useState } from "react";
import { login, signup, oauth } from "../actions/login";
import styles from "./page.module.scss";
import { useSearchParams } from "next/navigation";
import { LoadingSpinner } from "../components/LoadingSpinner";

function LoginPage() {
    const searchParams = useSearchParams();
    const errorParam = searchParams.get("error");

    const [error, setError] = useState("");

    useEffect(() => {
        if (errorParam) {
            let errorString = "Error: ";
            if (errorParam === "invalid_credentials") {
                errorString += "incorrect username or password";
            } else if (errorParam === "invalid_inputs") {
                errorString += "invalid inputs";
            } else {
                errorString += errorParam;
            }
            setError(errorString);
        }
    }, [errorParam]);

    return (
        <div className={styles.page}>
            <form>
                <p className={styles.label}>Email:</p>
                <input
                    className={styles.input}
                    name="email"
                    type="email"
                    maxLength={100}
                    required
                />
                <br />
                <p className={styles.label}>Password:</p>
                <input
                    className={styles.input}
                    name="password"
                    type="password"
                    maxLength={100}
                    required
                />
                <br />
                <button className={styles.button} formAction={login}>
                    Log in
                </button>
                <button className={styles.button} formAction={signup}>
                    Sign up
                </button>
            </form>
            <div className={styles.oauth}>
                <i
                    onClick={() => {
                        oauth("google");
                    }}
                    className={`fa-brands fa-google ${styles.oauthProvider}`}
                ></i>
                <i
                    onClick={() => {
                        oauth("github");
                    }}
                    className={`fa-brands fa-github ${styles.oauthProvider}`}
                ></i>
            </div>
            <p className={styles.error}>{error}</p>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <LoginPage />
        </Suspense>
    );
}
