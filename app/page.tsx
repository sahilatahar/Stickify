import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PersonalizedStickers from '@/components/PersonalizedStickers';
import Pricing from '@/components/Pricing';
import Stickers from '@/components/Stickers';
import ScrollTopButton from '@/components/common/ScrollTopButton';

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
