'use client';
import StickerCard from '@/components/common/StickerCard';
import { getStickers } from '@/data/stickers';
import { Sticker } from '@/types';
import { useCallback, useEffect, useRef, useState } from 'react';

function StickerGallery() {
  const [availableStickers, setAvailableSticker] = useState<Sticker[]>([]);
  const [loading, setLoading] = useState(false);
  const loadMoreRef = useRef<HTMLParagraphElement>(null);
  const [stickersLeft, setStickersLeft] = useState<number>(0);

  const loadMore = useCallback(async () => {
    let start = availableStickers.length;
    let end = stickersLeft >= 30 ? start + 30 : start + stickersLeft;
    setLoading(true);
    await new Promise((resolve) => setTimeout(() => resolve(0), 1000));
    setAvailableSticker((pre) => [...pre, ...getStickers(start, end).data]);
    setLoading(false);
  }, [availableStickers.length, stickersLeft]);

  useEffect(() => {
    const loadMoreElem = loadMoreRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading) {
          loadMore();
        }
      },
      { threshold: 0.5 }, // Trigger when 100% of the element is visible
    );

    if (loadMoreElem) {
      observer.observe(loadMoreElem);
    }

    return () => {
      if (loadMoreElem) {
        observer.unobserve(loadMoreElem);
      }
    };
  }, [loadMore, loading]);

  useEffect(() => {
    const response = getStickers(1, 30);
    setAvailableSticker(response.data);
    setStickersLeft(response.left);
  }, []);

  return (
    <section className="section pt-8">
      <h1 className="section-title flex items-center md:gap-4">
        <hr className="w-2/3" />
        <span className="min-w-fit">Sticker Gallery</span>
        <hr className="w-2/3" />
      </h1>
      <p className="mx-auto max-w-screen-lg px-4 text-center text-lg text-text-secondary">
        Explore our gallery of ready-made stickers. Just click on a sticker to
        download it, and when you&apos;re placing your order, you can upload the
        sticker you chose or your own custom image. It&apos;s that easy!
      </p>
      <div className="flex flex-wrap justify-center gap-4 pt-8 md:gap-8">
        {availableStickers.map(({ imgUrl, id }) => (
          <StickerCard key={id} id={id} imgUrl={imgUrl} />
        ))}
      </div>
      <p
        className="w-full pt-8 text-center text-lg font-medium text-text-primary"
        ref={loadMoreRef}
      >
        {loading ? 'Loading more stickers...' : ''}
      </p>
    </section>
  );
}
export default StickerGallery;
