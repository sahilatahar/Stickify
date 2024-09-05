import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";

const satoshi = localFont({
    src: [
        {
            path: "../public/fonts/satoshi/Satoshi-Regular.woff",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/satoshi/Satoshi-Italic.woff",
            weight: "400",
            style: "italic",
        },
        {
            path: "../public/fonts/satoshi/Satoshi-Light.woff",
            weight: "300",
            style: "normal",
        },
        {
            path: "../public/fonts/satoshi/Satoshi-LightItalic.woff",
            weight: "300",
            style: "italic",
        },
        {
            path: "../public/fonts/satoshi/Satoshi-Medium.woff",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/fonts/satoshi/Satoshi-MediumItalic.woff",
            weight: "500",
            style: "italic",
        },
        {
            path: "../public/fonts/satoshi/Satoshi-Bold.woff",
            weight: "700",
            style: "normal",
        },
        {
            path: "../public/fonts/satoshi/Satoshi-BoldItalic.woff",
            weight: "700",
            style: "italic",
        },
        {
            path: "../public/fonts/satoshi/Satoshi-Black.woff",
            weight: "900",
            style: "normal",
        },
        {
            path: "../public/fonts/satoshi/Satoshi-BlackItalic.woff",
            weight: "900",
            style: "italic",
        },
    ],
});

export const metadata: Metadata = {
    title: "Stickify",
    description: "Get unique sticker | Stickify",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/favicon/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon/favicon-16x16.png"
                />
                <link rel="manifest" href="/favicon/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/favicon/safari-pinned-tab.svg"
                    color="#5bbad5"
                />
                <link rel="shortcut icon" href="/favicon/favicon.ico" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta
                    name="msapplication-config"
                    content="/favicon/browserconfig.xml"
                />
                <meta name="theme-color" content="#ffffff" />
                <link rel="preload" href="/loader.png" as="image" />
            </head>
            <body className={satoshi.className}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
