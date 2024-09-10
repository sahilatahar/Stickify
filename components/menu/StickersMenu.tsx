import Link from 'next/link';

interface StickerMenuProps {
  show: boolean;
  toggleSidebar: () => void;
}

function StickersMenu({ show, toggleSidebar }: StickerMenuProps) {
  return (
    <div
      className="absolute -left-full top-full z-50 mt-2 w-60 select-none rounded-md bg-white py-4 text-center text-lg font-medium text-text-secondary shadow-box lg:left-0 lg:w-56 lg:text-base"
      style={{ display: show ? 'block' : 'none' }}
    >
      <div className="space-y-4 py-1 lg:py-0">
        <Link
          href="/personalized-stickers"
          className="block px-4 hover:text-primary"
          onClick={toggleSidebar}
        >
          Personalized Stickers
        </Link>
        <Link
          href="/stickers"
          className="block px-4 hover:text-primary"
          onClick={toggleSidebar}
        >
          Pre-designed Stickers
        </Link>
      </div>
    </div>
  );
}
export default StickersMenu;
