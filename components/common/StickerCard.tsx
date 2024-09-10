'use client';
import { Sticker } from '@/types';
import ImageWithPlaceholder from './ImageWithPlaceholder';

function StickerCard({ imgUrl }: Sticker) {
  return (
    <div className="flex w-[150px] select-none flex-col items-center justify-evenly gap-2 rounded-xl p-4 shadow-box transition-all duration-500 hover:scale-95 sm:w-[200px]">
      <ImageWithPlaceholder src={imgUrl} />
      {/* <p className="text-md w-full truncate text-center md:text-lg">
                {name}
            </p> */}
    </div>
  );
}
export default StickerCard;
