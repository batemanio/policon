"use client";

import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Header() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    function openMobileMenu() {
        setShowMobileMenu(true);
    }
    function closeMobileMenu() {
        setShowMobileMenu(false);
    }

    return (
        <>
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
                        <h2>Home</h2>
                    </Link>
                    <Link href="/articles">
                        <h2>Articles</h2>
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
                    </ul>
                </div>
            )}
            <br />
            <br />
            <br />
        </>
    );
}
