'use client';
import { Loading } from '@/components/common/Loading';
import ScrollTopButton from '@/components/common/ScrollTopButton';
import StickerCard from '@/components/common/StickerCard';
import { useStickers } from '@/context/StickerContext';
import { useUserContext } from '@/context/UserContext';
import { StickerInterface as Sticker } from '@/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import NotFound from '../not-found';

function Cart() {
  const router = useRouter();
  const { status } = useSession();
  const { user, isLoading } = useUserContext();
  const { stickers } = useStickers();

  if (isLoading || status === 'loading') {
    return <Loading />;
  } else if (status === 'unauthenticated') {
    router.push('/login');
    return;
  } else if (user?.role === 'admin') {
    return <NotFound />;
  }

  return (
    <section className="section pt-8">
      <h1 className="section-title flex items-center gap-4 text-center text-3xl">
        <hr className="w-2/3" />
        <span className="min-w-fit">Your Cart</span>
        <hr className="w-2/3" />
      </h1>
      <p className="mx-auto max-w-screen-lg text-center text-lg text-text-secondary">
        Your cart items are listed below. Browse and review your selected
        stickers. When you&apos;re ready, you can place your order using the
        stickers in your cart or upload custom designs. Getting your stickers
        has never been easier!
      </p>

      <div className="flex flex-wrap justify-center gap-4 pt-8 md:gap-8">
        {stickers
          .filter((s) => user?.cartItems.some((i) => i.stickerId === s._id))
          .map(({ imageUrl, _id, name }: Sticker) => (
            <StickerCard
              key={_id}
              imageUrl={imageUrl}
              name={name}
              id={_id}
              isInCart={true}
            />
          ))}
        {user && user?.cartItems.length === 0 && (
          <p className="pb-20 text-center text-lg text-text-secondary">
            Your cart is empty. Start adding some awesome stickers from our
            collection to get started!
          </p>
        )}
      </div>
      <ScrollTopButton />
    </section>
  );
}
export default Cart;
