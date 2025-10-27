import styles from "./page.module.scss";
import { Fredoka, Lexend_Deca, Caveat } from "next/font/google";
// import { jwtDecode } from "jwt-decode";
// import { createClient } from "@/utils/supabase/server";
import * as motion from "motion/react-client";
import Link from "next/link";


const fredoka = Fredoka({
    subsets: ["latin"],
    display: "swap",
    weight: "300",
});
const fredokaStrong = Fredoka({
    subsets: ["latin"],
    display: "swap",
    weight: "600",
});

const caveat = Caveat({
    subsets: ["latin"],
    display: "swap",
    weight: "400",
});

const lexend_Deca = Lexend_Deca({
    subsets: ["latin"],
    display: "swap",
    weight: "700",
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
    //         requested_permission: "draft_articles.all",
    //         user_id: user.user.id,
    //     });
    //     console.log(user, data);
    // }

    return (
        <div className={styles.home}>
            <div className={styles.firstBackground}>
                <div className={`${styles.firstSection} ${fredoka.className}`}>
                    <h1>
                        <span>News</span> By{" "}
                        <strong className={fredokaStrong.className}>
                            Teens
                        </strong>{" "}
                        for{" "}
                        <strong className={fredokaStrong.className}>
                            Teens
                        </strong>
                    </h1>
                    <p className={caveat.className}>
                        Clean Articles that look as great as they read.
                    </p>
                    <Link href="/articles">
                        <motion.button
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.1,
                                scale: {
                                    type: "spring",
                                    visualDuration: 0.4,
                                    bounce: 0.5,
                                },
                            }}
                            className={lexend_Deca.className}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Browse Articles
                        </motion.button>
                    </Link>
                </div>
                <svg
                    className={styles.openingSvg}
                    viewBox="0 0 960 540"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                >
                    <path
                        d="M0 378L22.8 371.7C45.7 365.3 91.3 352.7 137 353.2C182.7 353.7 228.3 367.3 274 376.2C319.7 385 365.3 389 411.2 387.5C457 386 503 379 548.8 369C594.7 359 640.3 346 686 342.7C731.7 339.3 777.3 345.7 823 344.5C868.7 343.3 914.3 334.7 937.2 330.3L960 326L960 541L937.2 541C914.3 541 868.7 541 823 541C777.3 541 731.7 541 686 541C640.3 541 594.7 541 548.8 541C503 541 457 541 411.2 541C365.3 541 319.7 541 274 541C228.3 541 182.7 541 137 541C91.3 541 45.7 541 22.8 541L0 541Z"
                        fill="#ffffff"
                    ></path>
                    <path
                        d="M0 401L22.8 398.5C45.7 396 91.3 391 137 388.8C182.7 386.7 228.3 387.3 274 382.3C319.7 377.3 365.3 366.7 411.2 363.2C457 359.7 503 363.3 548.8 369C594.7 374.7 640.3 382.3 686 384.7C731.7 387 777.3 384 823 378.8C868.7 373.7 914.3 366.3 937.2 362.7L960 359L960 541L937.2 541C914.3 541 868.7 541 823 541C777.3 541 731.7 541 686 541C640.3 541 594.7 541 548.8 541C503 541 457 541 411.2 541C365.3 541 319.7 541 274 541C228.3 541 182.7 541 137 541C91.3 541 45.7 541 22.8 541L0 541Z"
                        fill="#dbe9fe"
                    ></path>
                    <path
                        d="M0 395L22.8 404.3C45.7 413.7 91.3 432.3 137 433.5C182.7 434.7 228.3 418.3 274 419.7C319.7 421 365.3 440 411.2 440C457 440 503 421 548.8 418.5C594.7 416 640.3 430 686 432.2C731.7 434.3 777.3 424.7 823 422C868.7 419.3 914.3 423.7 937.2 425.8L960 428L960 541L937.2 541C914.3 541 868.7 541 823 541C777.3 541 731.7 541 686 541C640.3 541 594.7 541 548.8 541C503 541 457 541 411.2 541C365.3 541 319.7 541 274 541C228.3 541 182.7 541 137 541C91.3 541 45.7 541 22.8 541L0 541Z"
                        fill="#b4d4fc"
                    ></path>
                    <motion.path
                        d="M0 472L22.8 470.2C45.7 468.3 91.3 464.7 137 458.8C182.7 453 228.3 445 274 444.8C319.7 444.7 365.3 452.3 411.2 453.3C457 454.3 503 448.7 548.8 446.3C594.7 444 640.3 445 686 445.5C731.7 446 777.3 446 823 451.7C868.7 457.3 914.3 468.7 937.2 474.3L960 480L960 541L937.2 541C914.3 541 868.7 541 823 541C777.3 541 731.7 541 686 541C640.3 541 594.7 541 548.8 541C503 541 457 541 411.2 541C365.3 541 319.7 541 274 541C228.3 541 182.7 541 137 541C91.3 541 45.7 541 22.8 541L0 541Z"
                        fill="#89c0fa"
                    ></motion.path>
                    <path
                        d="M0 509L22.8 504.7C45.7 500.3 91.3 491.7 137 491C182.7 490.3 228.3 497.7 274 501.2C319.7 504.7 365.3 504.3 411.2 504.5C457 504.7 503 505.3 548.8 502.8C594.7 500.3 640.3 494.7 686 491.7C731.7 488.7 777.3 488.3 823 489.7C868.7 491 914.3 494 937.2 495.5L960 497L960 541L937.2 541C914.3 541 868.7 541 823 541C777.3 541 731.7 541 686 541C640.3 541 594.7 541 548.8 541C503 541 457 541 411.2 541C365.3 541 319.7 541 274 541C228.3 541 182.7 541 137 541C91.3 541 45.7 541 22.8 541L0 541Z"
                        fill="#4facf7"
                    ></path>
                </svg>
            </div>
            {/* <div className={styles.secondSection}>
                <div className={styles.browser}>
                    <div
                        className={`${styles.tabs} ${thin_lexend_Deca.className}`}
                    >
                        <div className={styles.tab}>
                            <p>
                                Notes
                                <span>
                                    <IoCloseOutline />
                                </span>
                            </p>
                        </div>
                        <div className={styles.tab}>
                            <p>
                                Flashcards
                                <span>
                                    <IoCloseOutline />
                                </span>
                            </p>
                        </div>
                        <div className={styles.tab}>
                            <p>
                                Quizzes
                                <span>
                                    <IoCloseOutline />
                                </span>
                            </p>
                        </div>
                        <div className={styles.tab}>
                            <p>
                                Exam Questions
                                <span>
                                    <IoCloseOutline />
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className={`${styles.window} ${zian.className}`}>
                        <p>Hello!</p>
                    </div>
                </div>
            </div> */}
        </div>
    );
}
