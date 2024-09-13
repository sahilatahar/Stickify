'use client';
import NotFound from '@/app/not-found';
import { useStickers } from '@/context/StickerContext';
import { useUserContext } from '@/context/UserContext';
import { useState } from 'react';

function AddSticker() {
  const { addSticker } = useStickers();
  const { user } = useUserContext();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    available: 'true', // Default value for select
    tags: '',
  });

  // Handling input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handling form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newSticker = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      imageUrl: formData.imageUrl,
      available: formData.available === 'true',
      tags: formData.tags ? formData.tags.split(',') : [],
    };

    addSticker(newSticker);
    setFormData({
      name: '',
      description: '',
      price: '',
      imageUrl: '',
      available: 'true',
      tags: '',
    });
  };

  if (user?.role !== 'admin') return <NotFound />;

  return (
    <section className="section pb-20">
      <h1 className="section-title pb-8 text-center md:pt-0">
        Add New Sticker
      </h1>
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
                value={formData.name}
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
                value={formData.description}
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
                value={formData.price}
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
                value={formData.imageUrl}
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
                value={formData.available}
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
                value={formData.tags}
                onChange={handleChange}
                placeholder="Comma-separated"
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn-full mx-auto mt-6 md:w-fit md:px-8"
          >
            Add Sticker
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddSticker;
