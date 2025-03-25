"use client";

import { createBlog } from "@/app/actions/createBlog";
import { useEffect, useState } from "react";
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
import { draft_article } from "@/app/types/dbTables";

export function PostCreatorClient({
    draftArticles,
}: {
    draftArticles: Array<draft_article>;
}) {
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
    const [savingError, setSavingError] = useState<apiError | null>();
    const [bodyValue, setBodyValue] = useState("");
    const [bodyLength, setBodyLength] = useState(0);
    const [currentDraft, setCurrentDraft] = useState("new");
    const [draftArticlesHook, setDraftArticlesHook] =
        useState<Array<draft_article>>(draftArticles);
    const [isSaved, setIsSaved] = useState<boolean>(true);

    useEffect(() => {
        addEventListener("beforeunload", (event) => {
            if (!isSaved) {
                // console.log("e canceled:", isSaved);
                event.preventDefault();
            }
        });
        onbeforeunload = (event) => {
            if (!isSaved) {
                // console.log("e canceled:", isSaved);
                event.preventDefault();
            }
        };
    }, [isSaved]);

    // useEffect(() => {
    //     console.log("saved:", isSaved);
    // }, [isSaved]);

    function addTagsection() {
        if (tags.length <= tagsMaxLength) {
            const newTags = tags;
            tags.push(tagsSection[0]);
            setTags(newTags);
            setTagsSection(["", 0]);
        }
    }

    function create(status: "draft" | "pending") {
        setSavingError(null);
        if (title[0] && subTitle[0] && primaryImage && bodyValue) {
            if (currentDraft !== "new") {
                createBlog(
                    title[0],
                    subTitle[0],
                    primaryImage,
                    tags,
                    bodyValue,
                    {
                        table: "draft_articles",
                        update: { update: true, id: currentDraft },
                        status: status,
                    }
                ).then((res: any) => {
                    setSavingError(res);
                });
            } else {
                createBlog(
                    title[0],
                    subTitle[0],
                    primaryImage,
                    tags,
                    bodyValue,
                    {
                        table: "draft_articles",
                        update: { update: false },
                        status: status,
                    }
                ).then((res: any) => {
                    setSavingError(res);
                });
            }

            setIsSaved(true);
        } else {
            setSavingError({
                type: "error",
                error: "Please complete all the fields",
            });
        }
    }

    function updateTitle(e: any) {
        if (e.nativeEvent.inputType === "insertLineBreak") return;

        setTitle([e.target.value, e.target.value.length]);
        setIsSaved(false);
    }
    function updateSubTitle(e: any) {
        if (e.nativeEvent.inputType === "insertLineBreak") return;

        setSubTitle([e.target.value, e.target.value.length]);
        setIsSaved(false);
    }
    function updateTagSection(e: any) {
        if (e.nativeEvent.inputType === "insertLineBreak") return;

        setTagsSection([e.target.value, e.target.value.length]);
        setIsSaved(false);
    }

    async function uploadImageClient(file: any, primary: boolean) {
        setLoading(true);

        // const file = event.target.files[0];
        const inputedFilename = file.name;
        const filename = prompt("Please input a filename:");
        if (file) {
            if (filename) {
                const fileExt = inputedFilename.split(".").pop();
                // const filePath = `-${Math.random()}.${fileExt}`;
                const filePath = `-${filename}.${fileExt}-${Math.random()}`;
                const res = await uploadToStorage(
                    filePath,
                    file,
                    "article_images"
                );
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
                        setIsSaved(false);
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
                    error: "No filename",
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
            // setIsSaved(false);
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

    function setCurrentDraftArticle(draftArticle: draft_article | null) {
        if (!draftArticle) {
            setTitle(["", 0]);
            setSubTitle(["", 0]);
            setPrimaryImage("");
            setBodyValue("");
            setBodyLength(0);
            setTags([]);
            setTagsSection(["", 0]);
        } else {
            setTitle([draftArticle.title, draftArticle.title.length]);
            setSubTitle([
                draftArticle.sub_title,
                draftArticle.sub_title.length,
            ]);
            setPrimaryImage(draftArticle.image);
            setBodyValue(draftArticle.content);
            setBodyLength(draftArticle.content.length);
            setTags([...draftArticle.tags]);
            setTagsSection(["", 0]);
        }
    }

    function updateCurrentDraft(id: string) {
        if (confirm("By loading a draft you will lose any unsaved date")) {
            if (id === "new") {
                setCurrentDraftArticle(null);
                setCurrentDraft("new");
                setIsSaved(true);
            } else {
                const currentDraftArticle = draftArticlesHook.filter(
                    (draftArticle: draft_article) => {
                        return String(draftArticle.id) === id;
                    }
                );
                if (currentDraftArticle.length) {
                    setCurrentDraftArticle(currentDraftArticle[0]);
                    setCurrentDraft(id);
                    setIsSaved(true);
                }
            }
        }
    }

    return (
        <>
            <div style={{ display: loading ? "none" : "block" }}>
                <div>
                    <h2>Drafts:</h2>
                    <select
                        value={currentDraft}
                        onChange={(e: any) => {
                            updateCurrentDraft(e.target.value);
                        }}
                    >
                        <option value="new">Create New</option>
                        {draftArticlesHook.map(
                            (draftArticle: draft_article, index: number) => (
                                <option
                                    key={draftArticle.id}
                                    value={draftArticle.id}
                                >
                                    {draftArticle.title}
                                </option>
                            )
                        )}
                    </select>
                </div>
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
                        <label
                            className={styles.addSectionButton}
                            htmlFor="primaryImageUploader"
                        >
                            {primaryImage
                                ? `Image: ${primaryImage.split("-")[1]}`
                                : "Upload image"}
                        </label>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            accept="image/*"
                            onChange={(e: any) => {
                                uploadImageClient(e.target.files[0], true);
                            }}
                            id="primaryImageUploader"
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
                                tinymceScriptSrc="/tinymce/tinymce.min.js"
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
                        <button
                            className={styles.publish}
                            onClick={() => {
                                create("draft");
                            }}
                        >
                            {currentDraft !== "new"
                                ? "Update Draft"
                                : "Save Draft"}
                        </button>
                        <button
                            className={styles.publish}
                            onClick={() => {
                                create("pending");
                            }}
                        >
                            Submit Blog for Admin Approval!
                        </button>
                    </div>
                </div>
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
