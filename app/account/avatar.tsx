"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { downloadImage } from "../actions/downloadImage";
import styles from "./accountForm.module.scss";

export default function Avatar({
    uid,
    url,
    size,
    loading,
    onUpload,
    setError,
}: {
    uid: string | null;
    url: string | null;
    size: number;
    onUpload: (url: string) => void;
    loading: boolean;
    setError: any;
}) {
    const supabase = createClient();
    const [avatarUrl, setAvatarUrl] = useState<string | null>(url);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (url) {
            downloadImage(url, supabase).then((res: any) => {
                setAvatarUrl(res);
            });
        }
    }, [url, supabase]);

    let uploadAvatar;
    if (onUpload) {
        uploadAvatar = async (event: any) => {
            try {
                setUploading(true);

                if (!event.target.files || event.target.files.length === 0) {
                    throw new Error("You must select an image to upload.");
                }

                const file = event.target.files[0];
                const fileExt = file.name.split(".").pop();
                const filePath = `${uid}-${Math.random()}.${fileExt}`;

                const { error: uploadError } = await supabase.storage
                    .from("avatars")
                    .upload(filePath, file);

                if (uploadError) {
                    throw uploadError;
                }

                onUpload(filePath);
            } catch (error) {
                setError(error);
            } finally {
                setUploading(false);
            }
        };
    }
    return (
        <div style={{ marginBottom: "10px" }}>
            {!loading ? (
                avatarUrl ? (
                    <Image
                        width={size}
                        height={size}
                        src={avatarUrl}
                        alt="Avatar"
                        className={styles.avatar}
                    />
                ) : (
                    <div style={{ height: size, width: size }}>
                        <p>No avatar</p>
                    </div>
                )
            ) : (
                <p>loading</p>
            )}
            <div>
                <label
                    style={{ margin: "100px" }}
                    className={styles.button}
                    htmlFor="single"
                >
                    {uploading ? "Uploading ..." : "Upload Avatar"}
                </label>
                <input
                    style={{
                        visibility: "hidden",
                        position: "absolute",
                    }}
                    type="file"
                    id="single"
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading}
                />
            </div>
        </div>
    );
}
