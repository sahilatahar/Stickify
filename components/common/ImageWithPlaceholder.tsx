'use client';
import Image from 'next/image';
import { useState } from 'react';

const ImageWithPlaceholder = ({ src }: { src: string }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <div className="relative h-full w-full">
      {/* Actual Image */}
      <div className="flex w-full flex-col gap-4">
        <Image
          src={src}
          alt="Sticker Image"
          onLoad={() => setIsLoaded(true)}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            opacity: isLoaded ? 1 : 0,
          }}
          className="block h-[70%] w-auto"
        />
      </div>
      {/* Placeholder */}
      {!isLoaded && (
        <Image
          src="/loader.png"
          alt="Loading..."
          width={0}
          height={0}
          sizes="100vw"
          className="absolute left-0 top-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
};

export default ImageWithPlaceholder;
