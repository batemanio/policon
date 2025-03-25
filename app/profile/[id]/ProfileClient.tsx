"use client";

import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { profile } from "@/app/types/dbTables";
import Image from "next/image";
import { useState } from "react";
import { follow } from "@/app/actions/follow";
import { apiError } from "@/app/types/errors";
import styles from "./page.module.scss";
import { BsPersonFillDash, BsPersonFillAdd } from "react-icons/bs";
import { BiLogIn } from "react-icons/bi";
import { FaShareAlt } from "react-icons/fa";
import { Alert } from "@/app/components/Alert";

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
                    <div className={styles.container}>
                        <Image
                            className={styles.avatar}
                            width={300}
                            height={300}
                            src={avatar_url}
                            alt="Avatar image"
                        ></Image>
                        <p className={styles.username}>
                            Welcome to
                            <span>{profile.username}</span>'s profile
                        </p>
                        <div className={styles.buttons}>
                            <button
                                className={styles.button}
                                onClick={followClient}
                            >
                                {following === true && <BsPersonFillDash />}
                                {following === false && <BsPersonFillAdd />}
                                {following === null && <BiLogIn />}
                            </button>
                            <button className={styles.button} onClick={share}>
                                <FaShareAlt />
                            </button>
                        </div>

                        {error && <p style={{ color: "red" }}>{error.error}</p>}

                        {profile.bio && (
                            <>
                                <h1 className={styles.bioTitle}>Bio:</h1>
                                <p className={styles.bio}>{profile.bio}</p>
                            </>
                        )}
                    </div>
                    {copied && (
                        <Alert
                            message="copied!"
                            good={true}
                            hideHook={setCopied}
                        />
                    )}
                </>
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
}
