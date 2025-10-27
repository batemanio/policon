"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { apiError } from "../types/errors";

type data = {
    email: string;
    password: string;
};
type signupData = {
    email: string;
    password: string;
    options?: { data: extraData; redirectTo: string };
};
type extraData = {
    username: string;
    full_name: string;
};

function varifyData(data: data) {
    if (data.email.length > 0 && data.email.length < 100) {
        if (data.password.length > 0 && data.email.length < 100) {
            return true;
        }
    }
    return false;
}
function varifyExtraData(extraData: extraData) {
    if (extraData.username.length > 0 && extraData.username.length < 25) {
        if (extraData.full_name.length > 0 && extraData.full_name.length < 50) {
            return true;
        }
    }
    return false;
}

export async function login(formData: FormData) {
    const supabase = await createClient();

    const data: data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    if (!varifyData(data)) {
        const returnData: apiError = {
            type: "error",
            error: "Invalid input",
        };
        return returnData;
    }

    const { error }: any = await supabase.auth.signInWithPassword(data);

    if (error) {
        console.log(error);
        const returnData: apiError = {
            type: "error",
            error: error.code,
        };
        return returnData;
    }

    revalidatePath("/", "layout");
    redirect("/account");
}

export async function signup(formData: FormData) {
    const supabase = await createClient();

    const extraData: extraData = {
        username: formData.get("username") as string,
        full_name: formData.get("full_name") as string,
    };

    const data: signupData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        options: {
            data: extraData,
            redirectTo: `${process.env.NEXT_PUBLIC_ORIGIN}/account`,
        },
    };

    if (!varifyData(data) && !varifyExtraData(extraData)) {
        const returnData: apiError = {
            type: "error",
            error: "Invalid input",
        };
        return returnData;
    }

    const { data: uniqueUsername, error: usernameError } = await supabase
        .from("profiles")
        .select()
        .eq("username", extraData.username);

    if (!uniqueUsername || !uniqueUsername.length) {
        const { data: signupData, error } = await supabase.auth.signUp(data);

        if (error) {
            console.log(error);
            const returnData: apiError = {
                type: "error",
                error: error.code,
            };
            return returnData;
        }

        // revalidatePath("/", "layout");
        // redirect("/account");

        const returnData: apiError = {
            type: "confirmEmail",
        };
        return returnData;
    } else {
        const returnData: apiError = {
            type: "error",
            error: "username already taken",
        };
        return returnData;
    }
}

export async function oauth(provider: any) {
    const supabase = await createClient();

    const { data, error }: any = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: { redirectTo: `${process.env.NEXT_PUBLIC_ORIGIN}/account` },
    });

    if (error) {
        console.log(error);
        const returnData: apiError = {
            type: "error",
            error: error.code,
        };
        return returnData;
    }

    redirect(data?.url);
}

export async function otp(formData: FormData) {
    const supabase = await createClient();

    const email = formData.get("email") as string;

    const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            shouldCreateUser: false,
            emailRedirectTo: `${process.env.NEXT_PUBLIC_ORIGIN}/account`,
        },
    });

    if (error) {
        console.log(error);
        const returnData: apiError = {
            type: "error",
            error: error.code,
        };
        return returnData;
    } else {
        const returnData: apiError = {
            type: "success",
        };
        return returnData;
    }
}

export async function resetPassword(formData: FormData) {
    const supabase = await createClient();

    const email = formData.get("email") as string;

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_ORIGIN}/account/update-password`,
    });

    console.log(data, error);

    if (error) {
        console.log(error);
        const returnData: apiError = {
            type: "error",
            error: error.code,
        };
        return returnData;
    } else {
        const returnData: apiError = {
            type: "success",
        };
        return returnData;
    }
}
