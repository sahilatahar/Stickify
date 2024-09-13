import { NextRequest, NextResponse } from 'next/server';
import Sticker from '@/models/Sticker';
import connectDB from '@/config/db';
import * as Yup from 'yup';

const stickerSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be positive'),
  imageUrl: Yup.string()
    .url('Image URL must be valid')
    .required('Image URL is required'),
  available: Yup.boolean().default(true),
  tags: Yup.array().of(Yup.string()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await stickerSchema.validate(body, { abortEarly: false });

    const { name, description, price, imageUrl, available, tags } = body;

    await connectDB();
    const newSticker = new Sticker({
      name,
      description,
      price,
      imageUrl,
      available,
      tags,
    });

    const savedSticker = await newSticker.save(); // Save new sticker
    return NextResponse.json(savedSticker, { status: 201 });
  } catch (error: any) {
    if (error instanceof Yup.ValidationError) {
      // Collect validation error messages
      const validationErrors = error.inner.map((err) => err.message);
      return NextResponse.json(
        { message: 'Validation failed', errors: validationErrors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: 'Error creating sticker', error: error.message },
      { status: 400 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const stickers = await Sticker.find(); // Fetch all stickers
    return NextResponse.json(stickers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching stickers' },
      { status: 500 },
    );
  }
}
