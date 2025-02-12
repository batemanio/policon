"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        console.log(error);
        redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/account");
}

export async function signup(formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signUp(data);

    if (error) {
        console.log(error);
        redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/account");
}

export async function oauth(provider: any) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    let { data, error }: any = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
            redirectTo: "http://localhost:3000/auth/confirm",
        },
    });

    if (error) {
        console.log(error);
        redirect("/error");
    }

    redirect(data?.url);
}
