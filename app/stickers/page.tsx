'use client';
import { LoadingPage } from '@/components/common/Loading';
import ScrollTopButton from '@/components/common/ScrollTopButton';
import StickerCard from '@/components/common/StickerCard';
import { useStickers } from '@/context/StickerContext';
import { useUserContext } from '@/context/UserContext';
import { Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

function StickerGallery() {
  const { stickers, isLoading } = useStickers();
  const { user } = useUserContext();
  const { status } = useSession();

  if (isLoading || status !== 'authenticated') return <LoadingPage />;

  return (
    <section className="section pt-8">
      <h1 className="section-title flex items-center md:gap-4">
        <hr className="w-2/3" />
        <span className="min-w-fit">Sticker Gallery</span>
        <hr className="w-2/3" />
      </h1>
      <p className="mx-auto max-w-screen-lg px-4 text-center text-lg text-text-secondary">
        Explore our gallery of ready-made stickers. Just click on a sticker to
        download it, and when you&apos;re placing your order, you can upload the
        sticker you chose or your own custom image. It&apos;s that easy!
      </p>
      {user?.role === 'admin' && (
        <div className="flex justify-end py-4">
          <Link
            href="/stickers/add"
            className="border-success text-success hover:bg-success text-md ml-auto flex items-center gap-2 rounded-md border px-4 py-2 text-center font-medium outline-none transition-colors duration-300 hover:text-white"
          >
            <Plus />
            <span>Add New Sticker</span>
          </Link>
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-4 pt-8 md:gap-8">
        {stickers.map(({ imageUrl, _id, name }) => {
          let isInCart = false;
          if (user) {
            isInCart = user?.cartItems.some((item) => item.stickerId === _id);
          }
          return (
            <StickerCard
              key={_id}
              id={_id}
              imageUrl={imageUrl}
              isInCart={isInCart}
              name={name}
            />
          );
        })}
      </div>
      <ScrollTopButton />
    </section>
  );
}
export default StickerGallery;
