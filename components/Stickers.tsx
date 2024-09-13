'use client';
import { useStickers } from '@/context/StickerContext';
import Link from 'next/link';
import StickerCard from './common/StickerCard';

function Stickers() {
  const { stickers } = useStickers();
  return (
    <section className="section">
      <h1 className="section-title flex items-center md:gap-4">
        <hr className="w-2/3" />
        <span className="min-w-fit">Choose from Our Sticker Gallery</span>
        <hr className="w-2/3" />
      </h1>
      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        {stickers.slice(0, 10).map(({ imageUrl, _id, name }) => (
          <StickerCard key={_id} id={_id} imageUrl={imageUrl} name={name} />
        ))}
      </div>
      <div className="pt-16 text-center text-xl underline">
        <Link href="/stickers">View all</Link>
      </div>
    </section>
  );
}
export default Stickers;
