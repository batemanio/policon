"use client";

import { Suspense, useState } from "react";
import { login, signup, oauth, otp, resetPassword } from "../actions/account";
import styles from "./page.module.scss";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { apiError } from "../types/errors";

function LoginPage() {
    const [error, setError] = useState<apiError>();
    const [currentForm, setCurrentForm] = useState("login");

    function loginClient(formData: FormData) {
        setError(undefined);
        login(formData).then((res: any) => {
            setError(res);
        });
    }
    function signupClient(formData: FormData) {
        setError(undefined);
        signup(formData).then((res: any) => {
            setError(res);
        });
    }
    function otpClient(formData: FormData) {
        setError(undefined);
        otp(formData).then((res: any) => {
            setError(res);
        });
    }
    function resetPasswordClient(formData: FormData) {
        setError(undefined);
        resetPassword(formData).then((res: any) => {
            setError(res);
        });
    }
    return (
        <>
            {currentForm === "login" && (
                <div className={styles.form}>
                    <h1 className={styles.header}>Login</h1>
                    <form>
                        <input
                            placeholder="Email"
                            className={styles.input}
                            type="email"
                            name="email"
                            maxLength={100}
                            required
                        />
                        <input
                            placeholder="Password"
                            className={styles.input}
                            type="password"
                            name="password"
                            maxLength={100}
                            required
                        />
                        <button
                            className={styles.confirm}
                            formAction={loginClient}
                        >
                            Login
                        </button>
                    </form>
                    <p className={styles.switchMenu}>
                        Want to create an account?{" "}
                        <span
                            onClick={() => {
                                setCurrentForm("signup");
                            }}
                        >
                            Create Account
                        </span>
                    </p>
                    <p className={styles.switchMenu}>
                        <span
                            onClick={() => {
                                setCurrentForm("otp");
                            }}
                        >
                            Passwordless Login
                        </span>
                    </p>
                    <p className={styles.switchMenu}>
                        <span
                            onClick={() => {
                                setCurrentForm("resetPassword");
                            }}
                        >
                            Reset Password
                        </span>
                    </p>
                    <OauthIcons />
                    <Error error={error} setCurrentForm={setCurrentForm} />
                </div>
            )}
            {currentForm === "signup" && (
                <div className={styles.form}>
                    <h1 className={styles.header}>Signup</h1>
                    <form>
                        <input
                            placeholder="Email"
                            className={styles.input}
                            type="email"
                            name="email"
                            maxLength={100}
                            required
                        />
                        <input
                            placeholder="Username"
                            className={styles.input}
                            type="text"
                            name="username"
                            maxLength={25}
                            required
                        />
                        <input
                            placeholder="Full name"
                            className={styles.input}
                            type="text"
                            name="full_name"
                            maxLength={50}
                            required
                        />
                        <input
                            placeholder="Password"
                            className={styles.input}
                            type="password"
                            name="password"
                            maxLength={100}
                            required
                        />
                        <button
                            className={styles.confirm}
                            formAction={signupClient}
                        >
                            Signup
                        </button>
                    </form>
                    <p className={styles.switchMenu}>
                        Already have an account?{" "}
                        <span
                            onClick={() => {
                                setCurrentForm("login");
                            }}
                        >
                            Login
                        </span>
                    </p>
                    <OauthIcons />
                    <Error error={error} setCurrentForm={setCurrentForm} />
                </div>
            )}
            {currentForm === "otp" && (
                <div className={styles.form}>
                    <h1 className={styles.header}>Passwordless Login</h1>
                    <form>
                        <input
                            placeholder="Email"
                            className={styles.input}
                            type="email"
                            name="email"
                            maxLength={100}
                            required
                        />
                        <button
                            className={styles.confirm}
                            formAction={otpClient}
                        >
                            Send email
                        </button>
                    </form>
                    <p className={styles.switchMenu}>
                        Want to create an account?{" "}
                        <span
                            onClick={() => {
                                setCurrentForm("signup");
                            }}
                        >
                            Create Account
                        </span>
                    </p>
                    <p className={styles.switchMenu}>
                        Already have an account?{" "}
                        <span
                            onClick={() => {
                                setCurrentForm("login");
                            }}
                        >
                            Login
                        </span>
                    </p>
                    <OauthIcons />
                    <Error error={error} setCurrentForm={setCurrentForm} />
                </div>
            )}
            {currentForm === "resetPassword" && (
                <div className={styles.form}>
                    <h1 className={styles.header}>Reset Password</h1>
                    <form>
                        <input
                            placeholder="Email"
                            className={styles.input}
                            type="email"
                            name="email"
                            maxLength={100}
                            required
                        />
                        <button
                            className={styles.confirm}
                            formAction={resetPasswordClient}
                        >
                            Send email
                        </button>
                    </form>
                    <p className={styles.switchMenu}>
                        Want to create an account?{" "}
                        <span
                            onClick={() => {
                                setCurrentForm("signup");
                            }}
                        >
                            Create Account
                        </span>
                    </p>
                    <p className={styles.switchMenu}>
                        Already have an account?{" "}
                        <span
                            onClick={() => {
                                setCurrentForm("login");
                            }}
                        >
                            Login
                        </span>
                    </p>
                    <OauthIcons />
                    <Error error={error} setCurrentForm={setCurrentForm} />
                </div>
            )}
        </>
    );
}

function OauthIcons() {
    function oauthClient(oauthProvider: string) {
        oauth(oauthProvider);
    }

    return (
        <div>
            <button
                onClick={() => {
                    oauthClient("google");
                }}
                className={styles.oauthButton}
            >
                <i className="fa-brands fa-google"></i>
            </button>
        </div>
    );
}
function Error({
    error,
    setCurrentForm,
}: {
    error: apiError | undefined;
    setCurrentForm: (newValue: string) => void;
}) {
    if (error) {
        if (error.type === "success") {
            return (
                <p className={styles.message} style={{ color: "green" }}>
                    success
                </p>
            );
        } else if (error.type === "error") {
            return (
                <p className={styles.message} style={{ color: "red" }}>
                    {error.error}
                </p>
            );
        } else if (error.type === "confirmEmail") {
            setCurrentForm("login");
            return (
                <p className={styles.message} style={{ color: "green" }}>
                    Please confirm your account by clicking on the link sent to
                    your email then login.
                </p>
            );
        }
    }
}

export default function Page() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <LoginPage />
        </Suspense>
    );
}
