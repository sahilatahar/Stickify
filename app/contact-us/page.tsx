import Contact from '@/components/Contact';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Stickify',
  description: 'Contact us form stickers',
};

function page() {
  return <Contact />;
}
export default page;
