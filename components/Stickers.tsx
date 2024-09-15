'use client';
import { useStickers } from '@/context/StickerContext';
import { useUserContext } from '@/context/UserContext';
import Link from 'next/link';
import { Loading } from './common/Loading';
import StickerCard from './common/StickerCard';

function Stickers() {
  const { user } = useUserContext();
  const { stickers, isLoading } = useStickers();

  return (
    <section className="section">
      <h1 className="section-title flex items-center md:gap-4">
        <hr className="w-2/3" />
        <span className="min-w-fit">Choose from Our Sticker Gallery</span>
        <hr className="w-2/3" />
      </h1>
      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        {stickers.slice(0, 10).map(({ imageUrl, _id, name }) => {
          let isInCart = false;
          if (user) {
            isInCart = user?.cartItems.some((item) => item.stickerId === _id);
          }
          return (
            <StickerCard
              key={_id}
              id={_id}
              imageUrl={imageUrl}
              name={name}
              isInCart={isInCart}
            />
          );
        })}
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        stickers.length === 0 && (
          <p className="pb-20 text-center text-lg text-text-secondary">
            No sticker available right now. Please check back later for awesome
            stickers!
          </p>
        )
      )}
      <div className="pt-16 text-center text-xl underline">
        <Link href="/stickers">View all</Link>
      </div>
    </section>
  );
}
export default Stickers;
