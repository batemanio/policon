import { useEffect, useState } from "react";
import { getUsername } from "../actions/getUsername";
import { formatDate } from "../actions/formatDate";
import { comment } from "../types/dbTables";

export function Comment({ comment }: { comment: comment }) {
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        getUsername(comment.user_id).then((res) => {
            if (res.type === "success") {
                setUsername(res.content);
            } else if (res.type === "error") {
                console.log(res.error);
            }
        });
    });

    return (
        <div>
            <p>{username}</p>
            <p>{formatDate(comment.created_at)}</p>
            {comment.content}
        </div>
    );
}
