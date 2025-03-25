import AccountFormClient from "./accountFormClient";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getAvatarUrl } from "../actions/getAvatarUrl";
import { apiError } from "../types/errors";

export async function AccountFormServer() {
    const supabase = await createClient();

    const {
        data: { user },
        error: firstError,
    } = await supabase.auth.getUser();
    if (firstError) {
        console.log(firstError);
    }

    if (user) {
        const { data: profile, error: secondError } = await supabase
            .from("profiles")
            .select()
            .eq("id", user.id);

        if (secondError) {
            console.log(secondError);
        }

        if (profile) {
            // let { data, error } = await supabase.rpc("authorize", {
            //     requested_permission: "articles.insert",
            //     user_id: user.id,
            // });
            // console.log(data);
            // if (error) console.error(error);
            // else console.log(data);

            if (profile[0].avatar_url) {
                const image: apiError = await getAvatarUrl(
                    profile[0].avatar_url
                );

                return (
                    <AccountFormClient
                        user={user}
                        profile={profile[0]}
                        image={image}
                    />
                );
            } else {
                return (
                    <AccountFormClient
                        user={user}
                        profile={profile[0]}
                        image={null}
                    />
                );
            }
        }
    } else {
        redirect("/login");
    }
}
