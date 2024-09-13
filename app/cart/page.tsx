'use client';
import ScrollTopButton from '@/components/common/ScrollTopButton';
import { useUserContext } from '@/context/UserContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Cart() {
  const router = useRouter();
  const { status } = useSession();
  const { user, fetchUserData } = useUserContext();

  // if (status === 'loading') {
  //   return <LoadingPage />;
  // } else if (status === 'unauthenticated') {
  //   router.push('/login');
  //   return;
  // }

  return (
    <section className="section pt-8">
      <h1 className="section-title flex items-center md:gap-4">
        <hr className="w-2/3" />
        <span className="min-w-fit">Your Cart</span>
        <hr className="w-2/3" />
      </h1>
      <p className="mx-auto max-w-screen-lg px-4 text-center text-lg text-text-secondary">
        Explore our gallery of ready-made stickers. Just click on a sticker to
        download it, and when you&apos;re placing your order, you can upload the
        sticker you chose or your own custom image. It&apos;s that easy!
      </p>
      {/* <div className="flex flex-wrap justify-center gap-4 pt-8 md:gap-8">
        {user?.cartItems.map(({ imageUrl, _id }: StickerInterface) => (
          <StickerCard key={_id} imageUrl={imageUrl} />
        ))}
      </div> */}
      <ScrollTopButton />
    </section>
  );
}
export default Cart;
