import styles from "./page.module.scss";
import { Header } from "./components/Header";
import { Fredoka } from "next/font/google";
import { Caveat } from "next/font/google";
import Image from "next/image";

const fredoka = Fredoka({
    subsets: ["latin"],
    display: "swap",
    weight: "600",
});
const caveat = Caveat({
    subsets: ["latin"],
    display: "swap",
});

export default function Home() {
    return (
        <>
            <Header />
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
                    <button className={styles.startButton}>
                        Join the empowerment
                    </button>
                </a>
            </div>
            <img
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
