import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import styles from "./page.module.scss";

async function writerInfo() {
    return (
        <div className={styles.info}>
            <p>
                Here at Eco-ders we have a fabulous dedicated team of volunteer
                writers helping to save the environment!
            </p>
            <b>
                <p>Become a writer today!</p>
                <Link href={"/writers/apply"}>
                    <button className={styles.applyButton}>Apply</button>
                </Link>
            </b>
        </div>
    );
}

export default async function Writers() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data: user_role, error: secondError } = await supabase
        .from("user_roles")
        .select();
    if (secondError) {
        console.log(secondError);
    }
    console.log("user_role", user_role);

    const role = user_role?.length ? user_role[0].role : "reader";

    if (user && user_role) {
        // const { data: user_permissions, error: thirdError } = await supabase
        //     .from("role_permissions")
        //     .select()
        //     .eq("role", role);
        // if (thirdError) {
        //     console.log(thirdError);
        // }

        // if (user_permissions) {
        return (
            <>
                <h1>Your role is {role}</h1>
                {role === "editor" ||
                    (role === "admin" && (
                        <Link href="/tools/post-creator">
                            <button className={styles.applyButton}>
                                Create an article!
                            </button>
                        </Link>
                    ))}
                {role === "editor" ||
                    (role === "admin" && (
                        <Link href="/tools/approved-posts">
                            <button className={styles.applyButton}>
                                My approved articles!
                            </button>
                        </Link>
                    ))}
                <br />
                <br />
                {role === "admin" && (
                    <Link href="/tools/post-approver">
                        <button className={styles.applyButton}>
                            Approve articles!
                        </button>
                    </Link>
                )}
            </>
        );
        // } else {
        //     return writerInfo();
        // }
    } else {
        return writerInfo();
    }
    // return (
    //     <>
    //         <p>
    //             Here at Policon we have a fabulous dedicated team of volunteer
    //             writers.
    //         </p>
    //         <Link href="/tools/post-creator">
    //             <button>Create a post</button>
    //         </Link>
    //         <Link href="/tools/post-approver">
    //             <button>Approve posts</button>
    //         </Link>
    //         <Link href="/tools/approved-posts">
    //             <button>Approved posts</button>
    //         </Link>
    //     </>
    // );
}
