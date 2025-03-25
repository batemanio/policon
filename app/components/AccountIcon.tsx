"use client";

import styles from "./Header.module.scss";
import { type User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { getAvatarUrl } from "../actions/getAvatarUrl";
import Image from "next/image";

export function AccountIcon({ user }: { user: User | null }) {
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [avatarUrl, setAvatarUrl]: any = useState<string | null>(null);
    const [imageAvatarUrl, setImageAvatarUrl]: any = useState<string | null>(
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
                console.log(error);
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
            getAvatarUrl(avatarUrl).then((res: any) => {
                setImageAvatarUrl(res.content);
            });
        }
    }, [avatarUrl]);

    if (!loading) {
        if (imageAvatarUrl) {
            return (
                <Image
                    width={45}
                    height={45}
                    src={imageAvatarUrl}
                    alt="Avatar"
                    className={styles.profilePicture}
                />
            );
        } else {
            return <span className={`fas fa-user ${styles.user}`}></span>;
        }
    } else {
        return <span className={`fas fa-user ${styles.user}`}></span>;
    }
}
