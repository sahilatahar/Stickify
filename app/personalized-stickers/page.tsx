import OrderStickers from '@/components/PersonalizedStickers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Stickers | Stickify',
  description: 'Order stickers now',
};

function page() {
  return <OrderStickers />;
}
export default page;
