export async function FullArticle({ articleData }: any) {
    function formatDate(date: any) {
        const d = new Date(date);
        const formattedDate = d.toDateString();
        return formattedDate;
    }

    return (
        <>
            <div>
                <p>{articleData._id}</p>
                <h1>{articleData.title}</h1>
                <h2>{articleData.subTitle}</h2>
                <h3>
                    Likes: {articleData.likes} Dislikes: {articleData.dislikes}
                </h3>
                <h3>
                    Created: {formatDate(articleData.likes)} Last edited:{" "}
                    {formatDate(articleData.updatedAt)}
                </h3>
                <p>{articleData.content}</p>
            </div>
        </>
    );
}
