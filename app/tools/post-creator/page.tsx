"use client";

import { createBlog } from "@/app/api/createBlog";
import { ArticleBody } from "@/app/components/ArticleBody";
import { useState } from "react";
import styles from "./page.module.scss";

export default function PostCreator() {
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [primaryImage, setPrimaryImage] = useState("");
    const [body, setBody]: any = useState([]);
    const [bodySection, setBodySection] = useState("");
    const [bodyType, setBodyType] = useState("text");
    const [tags, setTags]: any = useState([]);
    const [tagsSection, setTagsSection] = useState("");
    const [allFieldsComplete, setAllFieldsComplete]: any = useState(true);
    const [saved, setSaved]: any = useState(null);

    const authorId = "id_placehold";

    function addBodySection() {
        const newBody = body;
        if (bodyType === "image") {
            newBody.push({ image: bodySection });
        } else if (bodyType === "text") {
            newBody.push({ text: bodySection });
        }
        setBody(newBody);
        setBodySection("");
    }
    function addTagsection() {
        const newTags = tags;
        tags.push(tagsSection);
        setTags(newTags);
        setTagsSection("");
    }

    function create() {
        if (title && subTitle && primaryImage && body && tags) {
            createBlog(
                title,
                subTitle,
                primaryImage,
                body,
                tags,
                authorId
            ).then((res: boolean) => {
                setSaved(res);
            });
        } else {
            setAllFieldsComplete(false);
        }
    }

    return (
        <>
            {saved === null ? (
                <>
                    <div className={styles.creator}>
                        <div className={styles.titleContainer}>
                            <h2>Title:</h2>
                            <textarea
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></textarea>
                            <p>Character counter</p>
                        </div>
                        <div className={styles.subTitleContainer}>
                            <h2>Sub Title:</h2>
                            <textarea
                                className={styles.subTitleInput}
                                value={subTitle}
                                onChange={(e) => setSubTitle(e.target.value)}
                            ></textarea>
                        </div>

                        <div className={styles.primaryImageContainer}>
                            <h2>Cover image URL:</h2>
                            <textarea
                                value={primaryImage}
                                onChange={(e) =>
                                    setPrimaryImage(e.target.value)
                                }
                            ></textarea>
                        </div>

                        <div className={styles.bodyContainer}>
                            <div>
                                <h2>Paragraph:</h2>
                                <label className={styles.sectionSelectionLabel}>
                                    Paragraph type (image or text):
                                </label>
                                <select
                                    className={styles.addSectionSelection}
                                    name="body"
                                    value={bodyType}
                                    onChange={(e: any) =>
                                        setBodyType(e.target.value)
                                    }
                                >
                                    <option
                                        className={styles.options}
                                        value="text"
                                    >
                                        text
                                    </option>
                                    <option
                                        className={styles.options}
                                        value="image"
                                    >
                                        image
                                    </option>
                                </select>
                            </div>
                            <textarea
                                value={bodySection}
                                onChange={(e) => setBodySection(e.target.value)}
                            ></textarea>
                            <br />
                            <button
                                className={`${styles.addSectionButton} ${styles.paragraphAddButton}`}
                                onClick={addBodySection}
                            >
                                Add Paragraph
                            </button>
                            {body.map((section: any, index: number) => (
                                <ArticleBody body={section} key={index} />
                            ))}
                        </div>
                        <div className={styles.tagsContainer}>
                            <h2>Tags:</h2>
                            <input
                                type="text"
                                value={tagsSection}
                                onChange={(e) => setTagsSection(e.target.value)}
                            ></input>
                            <button
                                className={styles.addSectionButton}
                                onClick={addTagsection}
                            >
                                Add tag
                            </button>
                            <p>{tags.toString()}</p>
                        </div>
                        <div>
                            <button className={styles.publish} onClick={create}>
                                Publish Blog!
                            </button>
                        </div>
                    </div>
                    {!allFieldsComplete && (
                        <p className={styles.error} style={{ color: "red" }}>
                            Please complete all the fields!
                        </p>
                    )}
                </>
            ) : saved ? (
                <p className={styles.error} style={{ color: "green" }}>
                    Complete!
                </p>
            ) : (
                <p className={styles.error} style={{ color: "red" }}>
                    Error!
                </p>
            )}
        </>
    );
}
