"use client";

import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { profile } from "@/app/types/dbTables";
import Image from "next/image";
import { useState } from "react";
import { follow } from "@/app/actions/follow";
import { apiError } from "@/app/types/errors";
import profileStyles from "./page.module.scss";
import styles from "../../login/page.module.scss";
import { BsPersonFillDash, BsPersonFillAdd } from "react-icons/bs";
import { BiLogIn } from "react-icons/bi";
import { FaShareAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

export function ProfileClient({
    avatar_url,
    profile,
    initFollowing,
    user_id,
}: {
    avatar_url: string;
    profile: profile;
    initFollowing: boolean | null;
    user_id: string;
}) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [following, setFollowing] = useState(initFollowing);
    const [error, setError] = useState<apiError>();
    const [copied, setCopied] = useState<boolean>();

    function followClient() {
        setLoading(true);
        follow(user_id).then((res) => {
            if (res.type === "success") {
                setFollowing(res.content);
            } else {
                setError(res);
            }
            setLoading(false);
        });
    }
    function share() {
        const copyText = `Come look at ${profile.username}'s profile at ${window.location.href}`;
        navigator.clipboard.writeText(copyText);
        setCopied(true);
    }

    return (
        <>
            {!loading ? (
                <>
                    <div className={profileStyles.container}>
                        <Image
                            className={styles.avatar}
                            width={300}
                            height={300}
                            src={avatar_url}
                            alt="Avatar image"
                        ></Image>
                        <p style={{ fontSize: "20px" }}>
                            Welcome to
                            <span style={{ fontSize: "40px", margin: "3px" }}>
                                {profile.username}
                            </span>
                            {`'s profile`}
                        </p>
                        <div>
                            <button
                                className={styles.oauthButton}
                                onClick={() => {
                                    following === null
                                        ? router.push("/login")
                                        : followClient();
                                }}
                            >
                                <i>
                                    {following === true && <BsPersonFillDash />}
                                    {following === false && <BsPersonFillAdd />}
                                    {following === null && <BiLogIn />}
                                </i>
                            </button>
                            <button
                                className={styles.oauthButton}
                                onClick={share}
                            >
                                <i>
                                    <FaShareAlt />
                                </i>
                            </button>
                        </div>

                        {error?.type === "error" && (
                            <p
                                style={{ color: "red" }}
                                className={styles.error}
                            >
                                {error.error}
                            </p>
                        )}
                        {error?.type === "success" && (
                            <p
                                style={{ color: "green" }}
                                className={styles.error}
                            >
                                Profile Updated!
                            </p>
                        )}
                        {copied && (
                            <p
                                style={{ color: "green" }}
                                className={styles.error}
                            >
                                Copied!
                            </p>
                        )}

                        {profile.bio && (
                            <>
                                <h1 className={profileStyles.bioTitle}>Bio:</h1>
                                <p className={profileStyles.bio}>
                                    {profile.bio}
                                </p>
                            </>
                        )}
                    </div>
                    {/* {copied && (
                        <Alert
                            message="copied!"
                            good={true}
                            hideHook={setCopied}
                        />
                    )} */}
                </>
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
}
