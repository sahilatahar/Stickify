'use client';
import { useStickers } from '@/context/StickerContext';
import { useUserContext } from '@/context/UserContext';
import Link from 'next/link';
import ImageWithPlaceholder from './ImageWithPlaceholder';

function StickerCard({
  id,
  imageUrl,
  name,
  isInCart,
}: {
  imageUrl: string;
  name: string;
  isInCart?: boolean;
  id: string;
}) {
  const { user, removeFromCart, addToCart } = useUserContext();
  const { deleteSticker } = useStickers();

  const handleStickerDelete = () => {
    const isConfirmed = confirm('Are you sure you want to delete?');
    if (isConfirmed) deleteSticker(id);
  };
  return (
    <div className="flex h-auto w-[150px] select-none flex-col items-center gap-2 rounded-xl p-4 shadow-box transition-all duration-500 hover:scale-95 sm:w-[200px]">
      <ImageWithPlaceholder src={imageUrl} />
      <p className="text-md w-full truncate pb-3 text-center md:text-lg">
        {name}
      </p>
      {user?.role === 'admin' ? (
        <div className="w-full space-y-2">
          <Link
            href={'/stickers/update/' + id}
            className="block w-full rounded-md border border-warning p-1 text-center text-sm font-medium text-warning outline-none transition-colors duration-300 hover:bg-warning hover:text-white"
          >
            Update
          </Link>
          <button
            className="w-full rounded-md border border-danger p-1 text-sm font-medium text-danger outline-none transition-colors duration-300 hover:bg-danger hover:text-white"
            onClick={handleStickerDelete}
          >
            Delete
          </button>
        </div>
      ) : isInCart ? (
        <button
          className="w-full rounded-md border border-danger p-1 text-xs font-medium text-danger outline-none transition-colors duration-300 hover:bg-danger hover:text-white sm:text-sm"
          onClick={() => removeFromCart(id)}
        >
          Remove from Cart
        </button>
      ) : (
        <button
          className="w-full rounded-md border border-primary p-1 text-sm font-medium text-primary outline-none transition-colors duration-300 hover:bg-primary hover:text-white"
          onClick={() => addToCart(id, 1)}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
export default StickerCard;
