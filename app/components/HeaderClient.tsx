"use client";

import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AccountIcon } from "./AccountIcon";
import { type User } from "@supabase/supabase-js";

export function HeaderClient({ user }: { user: User | null }) {
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
                            src="/logo.jpg"
                            width={60}
                            height={60}
                            alt="Logo"
                        />
                    </div>
                </Link>

                <h1>Eco-ders</h1>
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
                {user ? (
                    <Link href="/account" className={styles.accountIcon}>
                        <AccountIcon user={user} />
                    </Link>
                ) : (
                    <Link href="/login" className={styles.accountIcon}>
                        <AccountIcon user={user} />
                    </Link>
                )}
            </div>

            <div
                className={styles.mobileMenu}
                style={{
                    opacity: showMobileMenu ? "1" : "0",
                    zIndex: showMobileMenu ? "100" : "-100",
                }}
            >
                <h1
                    onClick={closeMobileMenu}
                    className="material-symbols-outlined"
                >
                    close
                </h1>
                <ul onClick={() => setShowMobileMenu(false)}>
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
        </>
    );
}
