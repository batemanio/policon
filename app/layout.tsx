import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.scss";
import { HeaderServer } from "./components/HeaderServer";

const raleway = Raleway({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Eco-ders",
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
            <body className={raleway.className}>
                {children}
                <HeaderServer />
            </body>
        </html>
    );
}
