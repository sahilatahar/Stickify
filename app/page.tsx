import Contact from '@/components/Contact';
import Header from '@/components/Header';
import PersonalizedStickers from '@/components/PersonalizedStickers';
import Pricing from '@/components/Pricing';
import Stickers from '@/components/Stickers';
import ScrollTopButton from '@/components/common/ScrollTopButton';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stickify',
  description: 'Get unique sticker | Stickify',
};

function page() {
  return (
    <>
      <Header />
      <Stickers />
      <Pricing />
      <PersonalizedStickers />
      <Contact />

      <ScrollTopButton />
    </>
  );
}
export default page;
