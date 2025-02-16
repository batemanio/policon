import { redirect } from "next/navigation";
import AccountForm from "./accountForm";
import { createClient } from "@/utils/supabase/server";
import { type User } from "@supabase/supabase-js";

export default async function Account() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        let { data, error } = await supabase.rpc("authorize", {
            requested_permission: "articles.insert",
            user_id: user.id,
        });
        console.log(data);
        if (error) console.error(error);
        else console.log(data);

        return <AccountForm user={user} />;
    } else {
        redirect("/login");
    }
}
