import PersonalizedStickers from '@/components/PersonalizedStickers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Stickers | Stickify',
  description: 'Order stickers now',
};

function page() {
  return (
    <main className="pb-10">
      <PersonalizedStickers />
    </main>
  );
}
export default page;
