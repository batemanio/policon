import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.scss";

const raleway = Raleway({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Policon",
    description:
        "Empowering the youth through transparent political journalism",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={raleway.className}>{children}</body>
        </html>
    );
}
