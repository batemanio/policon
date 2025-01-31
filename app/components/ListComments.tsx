import { Comment } from "./Comment";

export function ListComments({ comments }: any) {
    return (
        <div>
            {comments.map((comment: any, index: number) => (
                <Comment key={index} comment={comment} />
            ))}
        </div>
    );
}
