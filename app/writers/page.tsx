// import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
// import { redirect } from "next/navigation";

export default async function Writers() {
    // const supabase = await createClient();
    // const { data: user, error: firstError } = await supabase.auth.getUser();

    // const { data: user_role, error: secondError } = await supabase
    //     .from("user_roles")
    //     .select()
    //     .eq("user_id", user.user?.id);

    // console.log(user_role, secondError);

    // if (user.user && user_role) {
    //     const { data: user_permissions, error: thirdError } = await supabase
    //         .from("role_permissions")
    //         .select()
    //         .eq("role", user_role);

    //     if (user_permissions) {
    //         return (
    //             <>
    //                 <h1>Your role is {user_role}</h1>
    //                 <p>
    //                     Here at Policon we have a fabulous dedicated team of
    //                     volunteer writers.
    //                 </p>
    //                 {user_permissions.includes("draft_articles.insert") && (
    //                     <Link href="/tools/post-creator">
    //                         <button>Create a post</button>
    //                     </Link>
    //                 )}
    //                 {user_permissions.includes("articles.insert") && (
    //                     <Link href="/tools/post-approver">
    //                         <button>Approve posts</button>
    //                     </Link>
    //                 )}
    //                 <Link href="/tools/approved-posts">
    //                     <button>Approved posts</button>
    //                 </Link>
    //             </>
    //         );
    //     } else {
    //         redirect("/");
    //     }
    // } else {
    //     redirect("/");
    // }
    return (
        <>
            <p>
                Here at Policon we have a fabulous dedicated team of volunteer
                writers.
            </p>
            <Link href="/tools/post-creator">
                <button>Create a post</button>
            </Link>
            <Link href="/tools/post-approver">
                <button>Approve posts</button>
            </Link>
            <Link href="/tools/approved-posts">
                <button>Approved posts</button>
            </Link>
        </>
    );
}
