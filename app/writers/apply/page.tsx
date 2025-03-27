"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    const supabase = createClient();
    supabase.auth.getUser().then((res) => {
        if (res.error) {
            setLoggedIn(false);
        }
    });

    const [loggedIn, setLoggedIn] = useState(true);
    const [reason, setReason] = useState("");

    if (loggedIn) {
        return (
            <div>
                <h1>Apply:</h1>
                <p>Why do you want to be a writer?</p>
                <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                ></textarea>
                <br />
                <button>Apply!</button>
            </div>
        );
    } else {
        router.push("/login");
    }
}
