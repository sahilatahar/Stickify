'use client';
import { Sticker } from '@/types';
import ImageWithPlaceholder from './ImageWithPlaceholder';

function StickerCard({ imgUrl }: Sticker) {
  const downloadSticker = async (imgUrl: string) => {
    try {
      const response = await fetch(imgUrl, { mode: 'cors' });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'sticker.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading the image:', error);
    }
  };

  return (
    <div
      className="flex w-[150px] cursor-pointer select-none flex-col items-center justify-evenly gap-2 rounded-xl p-4 shadow-box transition-all duration-500 hover:scale-90 sm:w-[200px]"
      onClick={() => downloadSticker(imgUrl)}
    >
      <ImageWithPlaceholder src={imgUrl} />
      {/* <p className="text-md w-full truncate text-center md:text-lg">
                {name}
            </p> */}
    </div>
  );
}
export default StickerCard;
