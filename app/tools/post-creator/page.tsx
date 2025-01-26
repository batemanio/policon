"use client";

import { createBlog } from "@/app/api/createBlog";
import { useState } from "react";

export default function postCreator() {
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [primaryImage, setPrimaryImage] = useState("");
    const [body, setBody] = useState({});
    const [bodySection, setBodySection] = useState("");
    const [bodyType, setBodyType] = useState("text");
    const [tags, setTags] = useState([]);
    const [tagsSection, setTagsSection] = useState("");

    const authorId = "id_placehold";

    function addBodySection() {
        console.log("creating body section...");
    }
    function addTagsection() {
        console.log("creating tags section...");
    }

    function create() {
        console.log("uploading...");
        createBlog(title, subTitle, primaryImage, body, tags, authorId);
    }

    return (
        <>
            <div>
                <h2>Title:</h2>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                ></input>

                <h2>Sub Title:</h2>
                <input
                    type="text"
                    value={subTitle}
                    onChange={(e) => setSubTitle(e.target.value)}
                ></input>

                <h2>Primary image:</h2>
                <input
                    type="text"
                    value={primaryImage}
                    onChange={(e) => setPrimaryImage(e.target.value)}
                ></input>

                <h2>Body:</h2>
                <select
                    name="body"
                    value={bodyType}
                    onChange={(e) => setBodyType(e.target.value)}
                >
                    <option value="text">text</option>
                    <option value="image">image</option>
                </select>
                <input
                    type="text"
                    value={bodySection}
                    onChange={(e) => setBodySection(e.target.value)}
                ></input>
                <button onClick={addBodySection}>add body section</button>
                <h2>Tags:</h2>
                <input
                    type="text"
                    value={tagsSection}
                    onChange={(e) => setTagsSection(e.target.value)}
                ></input>
                <button onClick={addTagsection}>add tag</button>

                <h1>Submit:</h1>
                <button onClick={create}>Create Blog!</button>
            </div>
        </>
    );
}
