import Link from "next/link";

export default function Writers() {
    return (
        <>
            <p>
                Here at Policon we have a fabulous dedicated team of volunteer
                writers.
            </p>
            <Link href="/tools/post-creator">
                <button>Create a post</button>
            </Link>
        </>
    );
}
