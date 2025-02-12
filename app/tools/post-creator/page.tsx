"use client";

import { createBlog } from "@/app/actions/createBlog";
import { ArticleBody } from "@/app/components/ArticleBody";
import { useState } from "react";
import styles from "./page.module.scss";

export default function PostCreator() {
    const [title, setTitle]: any = useState(["", 0]);
    const [subTitle, setSubTitle]: any = useState(["", 0]);
    const [primaryImage, setPrimaryImage]: any = useState(["", 0]);
    const [body, setBody]: any = useState([]);
    const [bodySection, setBodySection]: any = useState(["", 0]);
    const [bodyType, setBodyType]: any = useState("text");
    const [tags, setTags]: any = useState([]);
    const [tagsSection, setTagsSection]: any = useState(["", 0]);
    const [allFieldsComplete, setAllFieldsComplete]: any = useState(true);
    const [savingError, setSavingError]: any = useState({});

    const authorId = "author_id_placeholder";

    function addBodySection() {
        const newBody = body;
        if (bodyType === "image") {
            newBody.push({ image: bodySection[0] });
        } else if (bodyType === "text") {
            newBody.push({ text: bodySection[0] });
        }
        setBody(newBody);
        setBodySection(["", 0]);
    }
    function addTagsection() {
        const newTags = tags;
        tags.push(tagsSection[0]);
        setTags(newTags);
        setTagsSection(["", 0]);
    }

    function create() {
        if (title[0] && subTitle[0] && primaryImage[0]) {
            createBlog(
                title[0],
                subTitle[0],
                primaryImage[0],
                body,
                tags,
                authorId
            ).then((res: any) => {
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
    function updatePrimaryImage(e: any) {
        if (e.nativeEvent.inputType === "insertLineBreak") return;

        setPrimaryImage([e.target.value, e.target.value.length]);
    }
    function updateBodySection(e: any) {
        if (e.nativeEvent.inputType === "insertLineBreak") return;

        setBodySection([e.target.value, e.target.value.length]);
    }
    function updateTagSection(e: any) {
        if (e.nativeEvent.inputType === "insertLineBreak") return;

        setTagsSection([e.target.value, e.target.value.length]);
    }

    return (
        <>
            {savingError ? (
                <>
                    <div className={styles.creator}>
                        <div className={styles.titleContainer}>
                            <h2>Title:</h2>
                            <textarea
                                value={title[0]}
                                onChange={(e) => updateTitle(e)}
                                maxLength={75}
                            ></textarea>
                            <p className={styles.characterCounter}>
                                {title[1]} / 75
                            </p>
                        </div>
                        <div className={styles.subTitleContainer}>
                            <h2>Sub Title:</h2>
                            <textarea
                                className={styles.subTitleInput}
                                value={subTitle[0]}
                                onChange={(e) => updateSubTitle(e)}
                                maxLength={125}
                            ></textarea>
                            <p className={styles.characterCounter}>
                                {subTitle[1]} / 125
                            </p>
                        </div>
                        <div className={styles.primaryImageContainer}>
                            <h2>Cover image URL:</h2>
                            <textarea
                                value={primaryImage[0]}
                                onChange={(e) => updatePrimaryImage(e)}
                                maxLength={400}
                            ></textarea>
                            <p className={styles.characterCounter}>
                                {primaryImage[1]} / 400
                            </p>
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
                                value={bodySection[0]}
                                onChange={(e) => updateBodySection(e)}
                                maxLength={5000}
                            ></textarea>
                            <p className={styles.characterCounter}>
                                {bodySection[1]} / 5000
                            </p>
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
                            <textarea
                                value={tagsSection[0]}
                                onChange={(e) => updateTagSection(e)}
                                maxLength={15}
                            ></textarea>
                            <p className={styles.characterCounter}>
                                {tagsSection[1]} / 15
                            </p>
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
                            Error: 'Please complete all the fields'
                        </p>
                    )}
                    {savingError.type === "success" && (
                        <p className={styles.error} style={{ color: "green" }}>
                            Complete!
                        </p>
                    )}
                </>
            ) : (
                <p className={styles.error} style={{ color: "red" }}>
                    Server error: '{savingError.error}'
                </p>
            )}
        </>
    );
}
