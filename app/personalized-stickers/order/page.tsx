'use client';
import { X } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

function PersonalizedOrder() {
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 5) {
      alert('You can upload a maximum of 5 images.');
      return;
    }
    setImages([...images, ...acceptedFiles]);
  };

  const removeImage = (
    e: React.MouseEvent<HTMLButtonElement>,
    indexToRemove: number,
  ) => {
    e.stopPropagation();

    setImages((prev: File[]) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg'],
      'image/jpg': ['.jpg'],
      'image/png': ['.png'],
    },
    maxFiles: 5,
    maxSize: 5242880, // 5MB in bytes
  });

  return (
    <section className="section pb-20">
      <h1 className="section-title text-center">Order Personalized Sticker</h1>
      <div className="mx-auto flex w-full flex-col md:flex-row lg:max-w-2xl">
        <form className="flex w-full flex-col gap-4">
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>
          <div className="input-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="tel" name="phoneNumber" id="phoneNumber" />
          </div>
          <div className="input-group">
            <label htmlFor="address">Address</label>
            <input type="text" name="address" id="address" />
          </div>

          <div
            {...getRootProps()}
            className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center gap-2 overflow-y-auto rounded-md border-2 border-dotted border-text-muted py-4"
          >
            {isDragActive ? (
              <h3 className="text-2xl font-medium text-text-secondary">
                Drop Your Images here
              </h3>
            ) : images.length > 0 ? (
              <div className="flex w-full items-center justify-start gap-4 px-4">
                {images.map((img, i) => (
                  <div className="relative z-0 cursor-auto" key={i}>
                    <button
                      className="absolute -right-2 -top-2 z-20 grid size-6 place-items-center rounded-full bg-primary text-white"
                      type="button"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        removeImage(e, i)
                      }
                    >
                      <X className="h-5 w-5" />
                    </button>
                    <Image
                      src={URL.createObjectURL(img)}
                      alt="Image"
                      width={120}
                      height={120}
                      className="rounded-lg"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <h3 className="text-lg font-medium text-text-secondary">
                  Upload or Drop Your Images
                </h3>
                <p className="text-sm text-text-secondary">
                  Supported formats: PNG, JPEG, JPG Max file size: 5MB.
                </p>
                <input {...getInputProps()} />
              </>
            )}
          </div>

          <button
            className="btn-full mt-4 disabled:cursor-no-drop disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            Confirm and Order
          </button>
        </form>
      </div>
    </section>
  );
}
export default PersonalizedOrder;
