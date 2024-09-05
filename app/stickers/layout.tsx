import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sticker Gallery | Stickify",
    description: "Choose stickers from sticker gallery and order them",
};

function StickersLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
export default StickersLayout;
