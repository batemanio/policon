"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import Avatar from "./avatar";
import styles from "./accountForm.module.scss";
import { dbError } from "../types/errors";

export default function AccountForm({ user }: { user: User | null }) {
    const supabase = createClient();
    const [loading, setLoading] = useState<boolean>(true);
    const [fullname, setFullname] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [avatar_url, setAvatarUrl] = useState<string | null>(null);
    const [error, setError] = useState<boolean | dbError>(false);
    const [profileUpdated, setProfileUpdated] = useState(false);

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            const { data, error, status } = await supabase
                .from("profiles")
                .select(`full_name, username, avatar_url`)
                .eq("id", user?.id)
                .single();

            if (error && status !== 406) {
                console.log(error);
                throw error;
            }

            if (data) {
                setFullname(data.full_name);
                setUsername(data.username);
                setAvatarUrl(data.avatar_url);
            }
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => {
        getProfile();
    }, [user, getProfile]);

    async function updateProfile({
        username,
        avatar_url,
    }: {
        username: string | null;
        fullname: string | null;
        avatar_url: string | null;
    }) {
        try {
            setLoading(true);
            setProfileUpdated(false);

            const { error } = await supabase.from("profiles").upsert({
                id: user?.id as string,
                full_name: fullname,
                username,
                avatar_url,
                edited_at: new Date().toISOString(),
            });
            if (error) throw error;
            setProfileUpdated(true);
        } catch (error: any) {
            console.log(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.form}>
            <Avatar
                setError={setError}
                uid={user?.id ?? null}
                url={avatar_url}
                size={250}
                onUpload={(url: string) => {
                    setAvatarUrl(url);
                    updateProfile({
                        fullname,
                        username,
                        avatar_url: url,
                    });
                }}
                loading={loading}
            />

            <div>
                <label className={styles.label} htmlFor="email">
                    Email
                </label>
                <input
                    maxLength={100}
                    className={styles.input}
                    id="email"
                    type="text"
                    value={user?.email}
                    disabled
                />
            </div>
            <div>
                <label className={styles.label} htmlFor="fullName">
                    Full Name
                </label>
                <input
                    maxLength={100}
                    className={styles.input}
                    id="fullName"
                    type="text"
                    value={fullname || ""}
                    onChange={(e) => setFullname(e.target.value)}
                />
            </div>
            <div>
                <label className={styles.label} htmlFor="username">
                    Username
                </label>
                <input
                    maxLength={100}
                    className={styles.input}
                    id="username"
                    type="text"
                    value={username || ""}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div>
                <button
                    className={styles.button}
                    onClick={() =>
                        updateProfile({
                            fullname,
                            username,
                            avatar_url,
                        })
                    }
                    disabled={loading}
                >
                    {loading ? "Loading ..." : "Update"}
                </button>
            </div>

            <div>
                <form action="/auth/signout" method="post">
                    <button className={styles.button} type="submit">
                        Sign out
                    </button>
                </form>
            </div>
            {error && (
                <p style={{ color: "red" }} className={styles.error}>
                    Error
                </p>
            )}
            {profileUpdated && (
                <p style={{ color: "green" }} className={styles.error}>
                    Profile Updated!
                </p>
            )}
        </div>
    );
}
