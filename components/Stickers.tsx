import { getStickers } from "@/data/stickers";
import Link from "next/link";
import StickerCard from "./common/StickerCard";

function Stickers() {
    return (
        <section className="section">
            <h1 className="section-title flex items-center md:gap-4">
                <hr className="w-2/3" />
                <span className="min-w-fit">
                    Choose from Our Sticker Gallery
                </span>
                <hr className="w-2/3" />
            </h1>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {getStickers(1, 10).data.map(({ imgUrl, id }) => (
                    <StickerCard key={id} id={id} imgUrl={imgUrl} />
                ))}
            </div>
            <div className="pt-16 text-center text-xl underline">
                <Link href="/stickers">View all</Link>
            </div>
        </section>
    );
}
export default Stickers;
