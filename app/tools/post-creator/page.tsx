"use client";

import { createBlog } from "@/app/actions/createBlog";
import { useState } from "react";
import styles from "./page.module.scss";
import { apiError } from "@/app/types/errors";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { uploadToStorage } from "@/app/actions/uploadToStorage";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import {
    bodyMaxLength,
    subTitleMaxLength,
    tagMaxLength,
    tagsMaxLength,
    titleMaxLength,
} from "@/app/config/dbMaxLengths";

export default function PostCreator() {
    const editorRef: any = useRef<HTMLInputElement | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<apiError>();
    const [imagesUrl, setImagesUrl] = useState<
        Array<{ title: string; value: string }>
    >([]);
    const [title, setTitle] = useState<[string, number]>(["", 0]);
    const [subTitle, setSubTitle] = useState<[string, number]>(["", 0]);
    const [primaryImage, setPrimaryImage] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [tagsSection, setTagsSection] = useState<[string, number]>(["", 0]);
    const [allFieldsComplete, setAllFieldsComplete] = useState(true);
    const [savingError, setSavingError] = useState<apiError>();
    const [bodyValue, setBodyValue] = useState("");
    const [bodyLength, setBodyLength] = useState(0);

    function addTagsection() {
        if (tags.length <= tagsMaxLength) {
            const newTags = tags;
            tags.push(tagsSection[0]);
            setTags(newTags);
            setTagsSection(["", 0]);
        }
    }

    function create() {
        if (title[0] && subTitle[0] && primaryImage && bodyValue) {
            createBlog(
                title[0],
                subTitle[0],
                primaryImage,
                tags,
                bodyValue
            ).then((res: any) => {
                console.log(res);
                setSavingError(res);
            });
        } else {
            setAllFieldsComplete(false);
        }
    }

    function updateTitle(e: any) {
        if (e.nativeEvent.inputType === "insertLineBreak") return;

        setTitle([e.target.value, e.target.value.length]);
    }
    function updateSubTitle(e: any) {
        if (e.nativeEvent.inputType === "insertLineBreak") return;

        setSubTitle([e.target.value, e.target.value.length]);
    }
    function updateTagSection(e: any) {
        if (e.nativeEvent.inputType === "insertLineBreak") return;

        setTagsSection([e.target.value, e.target.value.length]);
    }

    async function uploadImageClient(file: any, primary: boolean) {
        setLoading(true);

        // const file = event.target.files[0];
        const filename = file.name;
        const fileExt = filename.split(".").pop();
        const filePath = `-${Math.random()}.${fileExt}`;
        if (filePath) {
            const res = await uploadToStorage(filePath, file, "article_images");
            if (res.type === "success") {
                const fullUrl =
                    process.env.NEXT_PUBLIC_SUPABASE_URL +
                    "/storage/v1/object/public/" +
                    res.content.fullPath;

                if (primary) {
                    setPrimaryImage(fullUrl);
                } else {
                    const newImagesUrl: Array<{
                        title: string;
                        value: string;
                    }> = imagesUrl;
                    newImagesUrl.push({
                        title: filename,
                        value: fullUrl,
                    });

                    setImagesUrl(newImagesUrl);
                }
                setLoading(false);

                const returnData: apiError = {
                    type: "success",
                    content: fullUrl,
                };
                return returnData;
            } else {
                console.log(res.error);
                setError(res);
                setLoading(false);

                const returnData: apiError = {
                    type: "error",
                    error: res,
                };
                return returnData;
            }
        } else {
            setLoading(false);

            const returnData: apiError = {
                type: "error",
                error: "Error",
            };
            return returnData;
        }
    }

    const handleInit = (evt: any, editor: any) => {
        setBodyLength(editor.getContent().length);
        editorRef.current = editor;
        setLoading(false);
    };

    const handleUpdate = (value: any, editor: any) => {
        const length = editor.getContent().length;
        if (length <= bodyMaxLength) {
            setBodyValue(value);
            setBodyLength(length);
        }
    };

    const handleBeforeAddUndo = (evt: any, editor: any) => {
        const length = editor.getContent().length;
        // note that this is the opposite test as in handleUpdate
        // because we are determining when to deny adding an undo level
        if (length > bodyMaxLength) {
            evt.preventDefault();
        }
    };

    return (
        <>
            <div style={{ display: loading ? "none" : "block" }}>
                <div className={styles.creator}>
                    <div className={styles.titleContainer}>
                        <h2>Title:</h2>
                        <textarea
                            value={title[0]}
                            onChange={(e) => updateTitle(e)}
                            maxLength={titleMaxLength}
                        ></textarea>
                        <p className={styles.characterCounter}>
                            {title[1]} / {titleMaxLength}
                        </p>
                    </div>
                    <div className={styles.subTitleContainer}>
                        <h2>Sub Title:</h2>
                        <textarea
                            className={styles.subTitleInput}
                            value={subTitle[0]}
                            onChange={(e) => updateSubTitle(e)}
                            maxLength={subTitleMaxLength}
                        ></textarea>
                        <p className={styles.characterCounter}>
                            {subTitle[1]} / {subTitleMaxLength}
                        </p>
                    </div>
                    <div className={styles.primaryImageContainer}>
                        <h2>Cover image URL:</h2>
                        <input
                            // className={styles.}
                            type="file"
                            accept="image/*"
                            onChange={(e: any) => {
                                uploadImageClient(e.target.files[0], true);
                            }}
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <div className={styles.bodyContainer}>
                            <h2>Article Body:</h2>
                            <Editor
                                value={bodyValue}
                                onInit={handleInit}
                                onEditorChange={handleUpdate}
                                onBeforeAddUndo={handleBeforeAddUndo}
                                // tinymceScriptSrc="/tinymce/tinymce.min.js"
                                // licenseKey="your-license-key"
                                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                                init={{
                                    branding: false,
                                    promotion: false,
                                    plugins:
                                        "searchreplace autolink directionality visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
                                    menubar:
                                        "file edit view insert format tools table help",
                                    toolbar:
                                        "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | fullscreen | pagebreak anchor codesample | ltr rtl",
                                    image_advtab: true,
                                    image_list: imagesUrl,
                                    images_upload_handler: (blobInfo) =>
                                        new Promise((resolve, reject) => {
                                            uploadImageClient(
                                                blobInfo.blob(),
                                                false
                                            ).then((res) => {
                                                if (res.type === "success") {
                                                    resolve(res.content);
                                                } else {
                                                    reject({
                                                        message: "Error",
                                                        remove: true,
                                                    });
                                                }
                                            });
                                        }),
                                    file_picker_callback: (
                                        callback,
                                        value,
                                        meta
                                    ) => {
                                        if (meta.filetype === "image") {
                                            const input =
                                                document.createElement("input");
                                            input.setAttribute("type", "file");
                                            input.setAttribute(
                                                "accept",
                                                "image/*"
                                            );

                                            input.click();

                                            input.addEventListener(
                                                "change",
                                                (e: any) => {
                                                    const file =
                                                        e.target.files[0];

                                                    uploadImageClient(
                                                        file,
                                                        false
                                                    ).then((res) => {
                                                        if (
                                                            res.type ===
                                                            "success"
                                                        ) {
                                                            callback(
                                                                res.content
                                                            );
                                                        } else {
                                                        }
                                                    });
                                                }
                                            );
                                        }

                                        // if (meta.filetype === "file") {}
                                        // if (meta.filetype === "media") {}
                                    },
                                    height: 600,
                                    image_caption: true,
                                    quickbars_selection_toolbar:
                                        "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                                    noneditable_class: "mceNonEditable",
                                    toolbar_mode: "sliding",
                                    contextmenu: "link image table",
                                    skin: "oxide",
                                    content_style: `
                                    body {
                                        font-family: Times New Roman;
                                        font-size: 22px;
                                        text-align: center;
                                    }
                                    `,
                                    file_picker_types: "image",
                                    quickbars_insert_toolbar: false,
                                }}
                            />
                            <p
                                className={styles.characterCounter}
                                style={{ marginTop: 0 }}
                            >
                                {bodyLength} / {bodyMaxLength}
                            </p>

                            {/* <button
                                onClick={() => {
                                    console.log(bodyValue);
                                }}
                            >
                                Log editor content
                            </button> */}
                        </div>
                        {error?.type === "error" && (
                            <p style={{ color: "red" }}>Error</p>
                        )}
                    </div>
                    <div className={styles.tagsContainer}>
                        <h2>Tags:</h2>
                        <textarea
                            value={tagsSection[0]}
                            onChange={(e) => updateTagSection(e)}
                            maxLength={tagMaxLength}
                        ></textarea>
                        <p className={styles.characterCounter}>
                            {tagsSection[1]} / {tagMaxLength}
                        </p>
                        <button
                            className={styles.addSectionButton}
                            onClick={addTagsection}
                        >
                            Add tag
                        </button>
                        <p>{tags.toString()}</p>
                        <p className={styles.characterCounter}>
                            {tags.length} / {tagsMaxLength}
                        </p>
                    </div>
                    <div>
                        <button className={styles.publish} onClick={create}>
                            Publish Blog!
                        </button>
                    </div>
                </div>
                {!allFieldsComplete && savingError?.type !== "success" && (
                    <p className={styles.error} style={{ color: "red" }}>
                        Error: Please complete all the fields
                    </p>
                )}
                {savingError?.type === "success" && (
                    <p className={styles.error} style={{ color: "green" }}>
                        Complete!
                    </p>
                )}
                {savingError?.type === "error" && (
                    <p className={styles.error} style={{ color: "red" }}>
                        Error: {savingError.error?.toString()}
                    </p>
                )}
            </div>
            {loading && <LoadingSpinner />}
        </>
    );
}
