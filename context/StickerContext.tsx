import {
  addSticker,
  deleteSticker,
  fetchStickers,
  updateSticker,
} from '@/lib/sticker';
import { StickerInterface as Sticker } from '@/types';
import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface StickerContextType {
  stickers: Sticker[];
  getStickerById: (stickerId: string) => Sticker;
  addSticker: (sticker: Omit<Sticker, '_id'>) => void;
  updateSticker: (
    stickerId: string,
    updatedSticker: Partial<Omit<Sticker, '_id'>>,
  ) => void;
  deleteSticker: (stickerId: string) => void;
  isLoading: boolean;
}

const StickerContext = createContext<StickerContextType | undefined>(undefined);

export const StickerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllStickers = async () => {
      try {
        setIsLoading(true);
        const fetchedStickers = await fetchStickers();
        setStickers(fetchedStickers);
      } catch (error) {
        console.error('Failed to fetch stickers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllStickers();
  }, []);

  const getStickerById = (stickerId: string) => {
    return stickers.filter((s) => s._id === stickerId)[0];
  };
  const handleAddSticker = async (sticker: Omit<Sticker, '_id'>) => {
    try {
      const newSticker = await addSticker(sticker);
      setStickers((prev) => [...prev, newSticker]);
      toast.success('Sticker added successfully!');
    } catch (error) {
      console.error('Failed to add sticker:', error);
      toast.error('Failed to add sticker. Please try again.');
    }
  };

  const handleUpdateSticker = async (
    stickerId: string,
    updatedSticker: Partial<Omit<Sticker, '_id'>>,
  ) => {
    try {
      const updated = await updateSticker(stickerId, updatedSticker);
      setStickers((prev) =>
        prev.map((sticker) => (sticker._id === stickerId ? updated : sticker)),
      );
      toast.success('Sticker updated successfully!');
    } catch (error) {
      console.error('Failed to update sticker:', error);
      toast.error('Failed to update sticker. Please try again.');
    }
  };

  const handleDeleteSticker = async (stickerId: string) => {
    try {
      await deleteSticker(stickerId);
      setStickers((prev) =>
        prev.filter((sticker) => sticker._id !== stickerId),
      );
      toast.success('Sticker deleted successfully!');
    } catch (error) {
      console.error('Failed to delete sticker:', error);
      toast.error('Failed to delete sticker. Please try again.');
    }
  };

  return (
    <StickerContext.Provider
      value={{
        stickers,
        getStickerById,
        addSticker: handleAddSticker,
        updateSticker: handleUpdateSticker,
        deleteSticker: handleDeleteSticker,
        isLoading,
      }}
    >
      {children}
    </StickerContext.Provider>
  );
};

export const useStickers = (): StickerContextType => {
  const context = useContext(StickerContext);
  if (context === undefined) {
    throw new Error('useStickers must be used within a StickerProvider');
  }
  return context;
};
