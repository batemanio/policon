import { comment } from "../types/dbTables";
import { Comment } from "./Comment";

export function ListComments({ comments }: { comments: Array<comment> }) {
    return (
        <div>
            {comments.map((comment: comment, index: number) => (
                <Comment key={index} comment={comment} />
            ))}
        </div>
    );
}
