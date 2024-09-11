import Pricing from '@/components/Pricing';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | Stickify',
  description: 'Get uniques at low price',
};

function page() {
  return (
    <main className="pb-10">
      <Pricing />
    </main>
  );
}
export default page;
