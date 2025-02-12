"use client";

import Avatar from "../account/avatar";
import styles from "./Header.module.scss";
import { type User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { downloadImage } from "../actions/downloadImage";

export function AccountIcon({ user }: { user: User | null }) {
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [avatarUrl, setAvatarUrl]: any = useState<string | null>(null);
    const [imageAvatarRrl, setImageAvatarUrl]: any = useState<string | null>(
        null
    );

    const getProfile = useCallback(async () => {
        if (user) {
            try {
                setLoading(true);

                const { data, error, status } = await supabase
                    .from("profiles")
                    .select(`avatar_url`)
                    .eq("id", user?.id)
                    .single();

                if (error && status !== 406) {
                    console.log(error);
                    throw error;
                }

                if (data) {
                    setAvatarUrl(data.avatar_url);
                }
            } catch (error) {
                alert("Error loading user data!");
            } finally {
                setLoading(false);
            }
        }
    }, [user, supabase]);

    useEffect(() => {
        getProfile();
    }, [user, getProfile]);

    useEffect(() => {
        if (avatarUrl) {
            downloadImage(avatarUrl, supabase).then((res: any) => {
                setImageAvatarUrl(res);
            });
        }
    }, [avatarUrl]);

    if (imageAvatarRrl) {
        return (
            <img
                src={imageAvatarRrl}
                alt="Avatar"
                className={styles.profilePicture}
            />
        );
    } else {
        return <span className={`fas fa-user ${styles.user}`}></span>;
    }
}
