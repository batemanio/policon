"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

type data = {
    email: string;
    password: string;
};

function varifyData(data: data) {
    if (data.email.length > 0 && data.email.length < 100) {
        if (data.password.length > 0 && data.email.length < 100) {
            return true;
        }
    }
    return false;
}

export async function login(formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data: data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    if (!varifyData(data)) {
        redirect(`/login?error=invalid_inputs`);
    }

    const { error }: any = await supabase.auth.signInWithPassword(data);

    if (error) {
        console.log(error);
        redirect(`/login?error=${error.code}`);
    }

    revalidatePath("/", "layout");
    redirect("/account");
}

export async function signup(formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data: data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    if (!varifyData(data)) {
        return;
    }

    const { error } = await supabase.auth.signUp(data);

    if (error) {
        console.log(error);
        redirect(`/login?error=${error.code}`);
    }

    revalidatePath("/", "layout");
    redirect("/account");
}

export async function oauth(provider: any) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const { data, error }: any = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
            redirectTo: "http://localhost:3000/auth/confirm",
        },
    });

    if (error) {
        console.log(error);
        redirect(`/login?error=${error.code}`);
    }

    redirect(data?.url);
}
