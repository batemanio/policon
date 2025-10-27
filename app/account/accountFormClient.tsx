"use client";

import { useState } from "react";
import { type User } from "@supabase/supabase-js";
import Avatar from "./avatar";
import styles from "../login/page.module.scss";
import { apiError } from "../types/errors";
import { profile } from "../types/dbTables";
import { updateProfile } from "../actions/updateProfile";
import { LoadingSpinner } from "../components/LoadingSpinner";
import Link from "next/link";

export default function AccountFormClient({
    user,
    profile,
    image,
}: {
    user: User;
    profile: profile;
    image: any;
}) {
    const [fullname, setFullname] = useState<string>(profile.full_name);
    const [username, setUsername] = useState<string>(profile.username);
    const [avatar_url, setAvatarUrl] = useState<string>(profile.avatar_url);
    const [bio, setBio] = useState<string>(profile.bio);
    const [error, setError] = useState<apiError>();
    const [loading, setLoading] = useState<boolean>(false);

    const user_id: string = user.id;

    function updateProfileClient(url: string | null) {
        setLoading(true);

        let used_avatar_url = avatar_url;
        if (url) {
            used_avatar_url = url;
        }

        if (username && fullname) {
            updateProfile(
                user_id,
                fullname,
                username,
                used_avatar_url,
                bio
            ).then((res: any) => {
                if (res.type === "error") {
                    setError(res.error);
                } else if (res.type === "success") {
                    const profile = res.content;
                    setFullname(profile.full_name);
                    setUsername(profile.username);
                    setAvatarUrl(used_avatar_url);
                    setBio(profile.bio);
                    setError(res);
                    location.reload();
                }
                setLoading(false);
            });
        }
    }

    if (!loading) {
        return (
            <div className={styles.form}>
                <h1 className={styles.header}>Settings</h1>
                <Link href={`/profile/${user_id}`}>
                    <h2 style={{ marginTop: "-30px" }}>View public profile</h2>
                </Link>
                <Avatar
                    setError={setError}
                    user_id={user_id}
                    avatar_url={avatar_url}
                    onUpload={(url: string) => {
                        setAvatarUrl(url);
                        updateProfileClient(url);
                    }}
                    setLoading={setLoading}
                    image={image}
                    loading={loading}
                />
                <form>
                    <p className={styles.label}>Email:</p>
                    <input
                        placeholder="Email"
                        className={styles.input}
                        type="email"
                        value={user.email}
                        maxLength={100}
                        disabled
                    />
                    <p className={styles.label}>Username:</p>
                    <input
                        placeholder="Username"
                        className={styles.input}
                        type="text"
                        name="username"
                        maxLength={25}
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                    <p className={styles.label}>Full name:</p>
                    <input
                        placeholder="Full name"
                        className={styles.input}
                        type="text"
                        name="full_name"
                        maxLength={50}
                        onChange={(e) => setFullname(e.target.value)}
                        value={fullname}
                    />
                    <p className={styles.label}>Bio:</p>
                    <textarea
                        placeholder="Bio"
                        maxLength={2000}
                        className={`${styles.bio} ${styles.input}`}
                        value={bio || ""}
                        onChange={(e) => setBio(e.target.value)}
                    />

                    <button
                        className={styles.confirm}
                        onClick={() => updateProfileClient(null)}
                    >
                        Save
                    </button>
                </form>
                <div>
                    <form action="/auth/signout" method="post">
                        <button
                            style={{ width: "200px" }}
                            className={styles.confirm}
                            type="submit"
                        >
                            Sign out
                        </button>
                    </form>
                </div>
                <br />
                {error?.type === "error" && (
                    <p style={{ color: "red" }} className={styles.error}>
                        Error
                    </p>
                )}
                {error?.type === "success" && (
                    <p style={{ color: "green" }} className={styles.error}>
                        Profile Updated!
                    </p>
                )}
            </div>
        );
    } else {
        return <LoadingSpinner />;
    }

    // return !loading ? (
    //     <div className={styles.form}>
    //         <Avatar
    //             setError={setError}
    //             user_id={user_id}
    //             avatar_url={avatar_url}
    //             onUpload={(url: string) => {
    //                 setAvatarUrl(url);
    //                 updateProfileClient(url);
    //             }}
    //             setLoading={setLoading}
    //             image={image}
    //             loading={loading}
    //         />

    //         <div>
    //             <label className={styles.label} htmlFor="email">
    //                 Email
    //             </label>
    //             <input
    //                 maxLength={100}
    //                 className={styles.input}
    //                 id="email"
    //                 type="text"
    //                 value={user?.email || ""}
    //                 disabled
    //             />
    //         </div>
    //         <div>
    //             <label className={styles.label} htmlFor="fullName">
    //                 Full Name
    //             </label>
    //             <input
    //                 maxLength={100}
    //                 className={styles.input}
    //                 id="fullName"
    //                 type="text"
    //                 value={fullname || ""}
    //                 onChange={(e) => setFullname(e.target.value)}
    //             />
    //         </div>
    //         <div>
    //             <label className={styles.label} htmlFor="username">
    //                 Username
    //             </label>
    //             <input
    //                 maxLength={100}
    //                 className={styles.input}
    //                 id="username"
    //                 type="text"
    //                 value={username || ""}
    //                 onChange={(e) => setUsername(e.target.value)}
    //             />
    //         </div>
    //         <div>
    //             <label className={styles.label} htmlFor="bio">
    //                 Bio
    //             </label>
    //             <textarea
    //                 maxLength={2000}
    //                 className={styles.bio}
    //                 id="bio"
    //                 value={bio || ""}
    //                 onChange={(e) => setBio(e.target.value)}
    //             />
    //         </div>

    //         <Link href={`/profile/${user_id}`}>
    //             <h2>View public profile</h2>
    //         </Link>

    //         <div>
    //             <button
    //                 className={styles.button}
    //                 onClick={() => updateProfileClient(null)}
    //                 disabled={loading}
    //             >
    //                 Update
    //             </button>
    //         </div>

    //         <div>
    //             <form action="/auth/signout" method="post">
    //                 <button className={styles.button} type="submit">
    //                     Sign out
    //                 </button>
    //             </form>
    //         </div>
    //         {error?.type === "error" && (
    //             <p style={{ color: "red" }} className={styles.error}>
    //                 Error
    //             </p>
    //         )}
    //         {error?.type === "success" && (
    //             <p style={{ color: "green" }} className={styles.error}>
    //                 Profile Updated!
    //             </p>
    //         )}
    //     </div>
    // ) : (
    //     <LoadingSpinner />
    // );
}
