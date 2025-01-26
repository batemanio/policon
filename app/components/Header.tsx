"use client";

import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function Header() {
    const pathname = usePathname();

    const [showMobileMenu, setShowMobileMenu] = useState(false);

    function openMobileMenu() {
        setShowMobileMenu(true);
    }
    function closeMobileMenu() {
        setShowMobileMenu(false);
    }

    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
            ></link>
            <div className={styles.header}>
                <Link href="/">
                    <div>
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/2/24/LEGO_logo.svg"
                            width={60}
                            height={60}
                            alt="Logo"
                        />
                    </div>
                </Link>

                <h1>Policon</h1>
                <div className={styles.items}>
                    <Link href="/">
                        <h2
                            className={
                                pathname == "/" ? styles.currentLink : ""
                            }
                        >
                            Home
                        </h2>
                    </Link>
                    <Link href="/articles">
                        <h2
                            className={
                                pathname == "/articles"
                                    ? styles.currentLink
                                    : ""
                            }
                        >
                            Articles
                        </h2>
                    </Link>
                    <Link href="/writers">
                        <h2
                            className={
                                pathname == "/writers" ? styles.currentLink : ""
                            }
                        >
                            Writers
                        </h2>
                    </Link>
                </div>
                <h2
                    className={[
                        "material-symbols-outlined",
                        styles.mobileItems,
                    ].join(" ")}
                    onClick={openMobileMenu}
                >
                    menu
                </h2>
                <section className={styles.socialMediaIcons}>
                    <Link
                        target="_blank"
                        href="https://www.tiktok.com/@politix01"
                    >
                        <span
                            className={`fab fa-tiktok ${styles.tiktok}`}
                        ></span>
                    </Link>
                    <Link target="_blank" href="">
                        <span
                            className={`fab fa-instagram ${styles.instagram}`}
                        ></span>
                    </Link>
                </section>
            </div>

            {showMobileMenu && (
                <div className={styles.mobileMenu}>
                    <h1
                        onClick={closeMobileMenu}
                        className="material-symbols-outlined"
                    >
                        close
                    </h1>
                    <ul>
                        <Link href="/">
                            <li>Home</li>
                        </Link>
                        <Link href="/articles">
                            <li>Articles</li>
                        </Link>
                        <Link href="/writers">
                            <li>Writers</li>
                        </Link>
                    </ul>
                </div>
            )}
            <br />
            <br />
            <br />
        </>
    );
}
