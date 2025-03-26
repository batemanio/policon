"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./accountForm.module.scss";
import { uploadToStorage } from "../actions/uploadToStorage";
import { deleteInStorage } from "../actions/deleteInStorage";
import { useRouter } from "next/navigation";

export default function Avatar({
    user_id,
    avatar_url,
    onUpload,
    setLoading,
    setError,
    image,
    loading,
}: {
    user_id: string | null;
    avatar_url: string | null;
    onUpload: (url: string) => void;
    setLoading: any;
    setError: any;
    image: any;
    loading: boolean;
}) {
    const router = useRouter();

    let tempAvatarUrl: null | string;
    if (image) {
        tempAvatarUrl = image.content;
    } else {
        tempAvatarUrl = null;
    }
    // const supabase = createClient();

    const [avatarUrl, setAvatarUrl] = useState<string | null>(tempAvatarUrl);
    // const [uploading, setUploading] = useState(false);

    // useEffect(() => {
    //     if (avatar_url) {
    //         downloadImage(avatar_url, supabase).then((res: any) => {
    //             setAvatarUrl(res);
    //         });
    //     }
    // }, [avatar_url, supabase]);

    // useEffect(() => {
    //     console.log("url", avatarUrl);
    // }, [avatarUrl]);

    function uploadAvatarClient(event: any) {
        setLoading(true);

        if (user_id) {
            const file = event.target.files[0];
            const fileExt = file.name.split(".").pop();
            const filePath = `_${user_id}-${Math.random()}.${fileExt}`;
            if (filePath) {
                uploadToStorage(filePath, file, "avatars").then((res: any) => {
                    if (res.type === "success") {
                        if (avatar_url) {
                            deleteInStorage(avatar_url, "avatars").then(
                                (res: any) => {
                                    const fullUrl =
                                        process.env.NEXT_PUBLIC_SUPABASE_URL +
                                        "/storage/v1/object/public/" +
                                        res.content.fullPath;
                                    setAvatarUrl(fullUrl);
                                    onUpload(filePath);

                                    location.reload();
                                    router.refresh();
                                    setLoading(false);
                                }
                            );
                        } else {
                            const fullUrl =
                                process.env.NEXT_PUBLIC_SUPABASE_URL +
                                "/storage/v1/object/public/" +
                                res.content.fullPath;
                            setAvatarUrl(fullUrl);
                            onUpload(filePath);

                            location.reload();
                            router.refresh();
                            setLoading(false);
                        }
                    } else {
                        console.log(res.error);
                        setError(res);
                    }
                });
            }
        }
    }

    // let uploadAvatar;
    // if (onUpload) {
    //     uploadAvatar = async (event: any) => {
    //         try {
    //             setUploading(true);

    //             if (
    //                 !event.target.files ||
    //                 event.target.files.length === 0
    //             ) {
    //                 throw new Error("You must select an image to upload.");
    //             }

    //             const file = event.target.files[0];
    //             const fileExt = file.name.split(".").pop();
    //             const filePath = `${user_id}-${Math.random()}.${fileExt}`;

    //             const { error: uploadError } = await supabase.storage
    //                 .from("avatars")
    //                 .upload(filePath, file);

    //             if (uploadError) {
    //                 throw uploadError;
    //             }

    //             onUpload(filePath);
    //         } catch (error) {
    //             setError(error);
    //         } finally {
    //             setUploading(false);
    //         }
    //     };
    // }

    // console.log(avatarUrl);

    return (
        <div style={{ marginBottom: "10px" }}>
            {avatarUrl ? (
                <Image
                    width={200}
                    height={200}
                    src={avatarUrl}
                    alt="Avatar"
                    className={styles.avatar}
                />
            ) : (
                <div>
                    <p>No avatar</p>
                </div>
            )}
            <div>
                <label
                    style={{ margin: "100px" }}
                    className={styles.button}
                    htmlFor="single"
                >
                    {avatarUrl ? "Update Avatar" : "Upload Avatar"}
                </label>
                <input
                    style={{
                        visibility: "hidden",
                        position: "absolute",
                    }}
                    type="file"
                    id="single"
                    accept="image/*"
                    onChange={(e: any) => {
                        uploadAvatarClient(e);
                    }}
                    disabled={loading}
                />
            </div>
        </div>
    );
}
