import styles from "./page.module.scss";
import { Fredoka } from "next/font/google";
import { Caveat } from "next/font/google";
import Image from "next/image";
// import { jwtDecode } from "jwt-decode";
// import { createClient } from "@/utils/supabase/server";

const fredoka = Fredoka({
    subsets: ["latin"],
    display: "swap",
    weight: "600",
});
const caveat = Caveat({
    subsets: ["latin"],
    display: "swap",
});

export default async function Home() {
    // const supabase = await createClient();

    // const { subscription: authListener } = supabase.auth.onAuthStateChange(
    //     async (event: any, session: any) => {
    //         if (session) {
    //             const jwt: any = jwtDecode(session.access_token);
    //             const userRole = jwt.user_role;
    //             console.log("userrole", userRole);
    //         }
    //     }
    // );

    // const { data: user, error: firstError } = await supabase.auth.getUser();
    // if (user.user) {
    //     const { data, error } = await supabase.rpc("authorize", {
    //         requested_permission: "article_images.delete",
    //         user_id: user.user.id,
    //     });
    //     console.log(user, data);
    // }

    return (
        <>
            <div className={styles.mainBody}>
                <h1 className={[fredoka.className, styles.title].join(" ")}>
                    Policon
                </h1>
                <i>
                    <p
                        className={[caveat.className, styles.subTitle].join(
                            " "
                        )}
                    >
                        Empowering the youth through transparent political
                        journalism.
                    </p>
                </i>
                <a href="/articles">
                    <button
                        className={[caveat.className, styles.startButton].join(
                            " "
                        )}
                    >
                        Join the empowerment
                    </button>
                </a>
            </div>
            <Image
                height={1080}
                width={1920}
                src="/old-paper.jpg"
                alt="Background image"
                className={styles.backgroundImage}
            />
            <p className={styles.reference}>
                Designed by{" "}
                <a target="_blank" href="http://www.freepik.com/">
                    Freepik
                </a>
            </p>
        </>
    );
}
