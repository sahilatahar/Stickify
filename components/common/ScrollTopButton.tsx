'use client';
import { useWindowScroll } from '@uidotdev/usehooks';
import { ChevronUp } from 'lucide-react';

function ScrollTopButton() {
  const [{ y }, scrollTo] = useWindowScroll();
  return (
    <button
      className="fixed bottom-6 right-4 rounded-lg bg-primary p-2 text-white transition-all duration-300 md:right-8"
      onClick={() =>
        scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
      style={{
        transform: y && y > 800 ? 'translateX(0px)' : 'translateX(200%)',
      }}
    >
      <ChevronUp className="h-8 w-8" />
    </button>
  );
}
export default ScrollTopButton;
