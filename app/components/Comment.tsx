import { useEffect, useState } from "react";
import { getUsername } from "../actions/getUsername";
import { formatDate } from "../functions/formatDate";
import styles from "./FullArticle.module.scss";

export function Comment(comment: any) {
    comment = comment.comment;

    const [username, setUsername] = useState("");

    // useEffect(() => {
    //     getUsername(comment.author).then((res: string) => {
    //         setUsername(res);
    //     });
    // }, []);

    return (
        <div>
            <p>{username}</p>
            <p>{formatDate(comment.date)}</p>
            <p>{comment.content}</p>
        </div>
    );
}
