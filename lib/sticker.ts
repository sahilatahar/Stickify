import { StickerInterface as Sticker } from '@/types';

export const fetchStickers = async (): Promise<Sticker[]> => {
  const res = await fetch('/api/stickers');
  if (!res.ok) {
    throw new Error('Failed to fetch stickers');
  }
  return res.json();
};

export const addSticker = async (
  sticker: Omit<Sticker, '_id'>,
): Promise<Sticker> => {
  const res = await fetch('/api/stickers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sticker),
  });
  if (!res.ok) {
    throw new Error('Failed to add sticker');
  }
  return res.json();
};

export const updateSticker = async (
  stickerId: string,
  updatedSticker: Partial<Omit<Sticker, '_id'>>,
): Promise<Sticker> => {
  const res = await fetch(`/api/stickers/${stickerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedSticker),
  });
  if (!res.ok) {
    throw new Error('Failed to update sticker');
  }
  return res.json();
};

export const deleteSticker = async (stickerId: string): Promise<void> => {
  const res = await fetch(`/api/stickers/${stickerId}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete sticker');
  }
};
