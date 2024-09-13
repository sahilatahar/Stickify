'use client';
import NotFound from '@/app/not-found';
import { useStickers } from '@/context/StickerContext';
import { useUserContext } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function UpdateSticker({ params }: { params: { stickerId: string } }) {
  const { updateSticker, getStickerById } = useStickers();
  const stickerId = params.stickerId;
  const { user } = useUserContext();

  // Initialize state with default values
  const [sticker, setSticker] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    available: 'true',
    tags: '',
  });

  useEffect(() => {
    if (!(user?.role === 'admin')) return;

    // Fetch sticker data by ID
    const fetchedSticker = getStickerById(stickerId);
    if (fetchedSticker) {
      setSticker({
        ...fetchedSticker,
        price: fetchedSticker.price.toString(),
        available: fetchedSticker.available ? 'true' : 'false',
        tags: fetchedSticker.tags.join(','),
      });
    } else {
      toast.error('Unable to load sticker details');
    }
  }, [getStickerById, stickerId, user?.role]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setSticker((prev) =>
      prev
        ? {
            ...prev,
            [name]: value,
          }
        : prev,
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Convert values for update
    const updatedSticker = {
      ...sticker,
      price: parseFloat(sticker.price),
      available: sticker.available === 'true',
      tags: sticker.tags ? sticker.tags.split(',') : [],
    };

    updateSticker(stickerId, updatedSticker);
  };

  if (user?.role !== 'admin') return <NotFound />;

  return (
    <section className="section pb-20">
      <h1 className="section-title pb-8 text-center md:pt-0">Update Sticker</h1>
      <div className="mx-auto flex w-full flex-col md:flex-row">
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col gap-4 md:flex-row">
            <div className="input-group">
              <label htmlFor="name">
                Name
                <span className="text-danger text-lg">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={sticker.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="description">
                Description<span className="text-danger text-lg">*</span>
              </label>
              <textarea
                name="description"
                id="description"
                rows={1}
                value={sticker.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 md:flex-row">
            <div className="input-group">
              <label htmlFor="price">
                Price<span className="text-danger text-lg">*</span>
              </label>
              <input
                type="tel"
                name="price"
                id="price"
                value={sticker.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="imageUrl">
                Image URL<span className="text-danger text-lg">*</span>
              </label>
              <input
                type="text"
                name="imageUrl"
                id="imageUrl"
                value={sticker.imageUrl}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 md:flex-row">
            <div className="input-group">
              <label htmlFor="available">Available</label>
              <select
                name="available"
                id="available"
                value={sticker.available}
                onChange={handleChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                name="tags"
                id="tags"
                value={sticker.tags}
                onChange={handleChange}
                placeholder="Comma-separated"
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn-full mx-auto mt-6 md:w-fit md:px-8"
          >
            Update Sticker
          </button>
        </form>
      </div>
    </section>
  );
}

export default UpdateSticker;
