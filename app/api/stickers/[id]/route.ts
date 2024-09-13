import { NextRequest, NextResponse } from 'next/server';
import Sticker from '@/models/Sticker';
import connectDB from '@/config/db';
import mongoose from 'mongoose';
import * as Yup from 'yup';

// Sticker validation schema using Yup
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

// PUT route with validation
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const stickerId = params.id;
    if (!mongoose.Types.ObjectId.isValid(stickerId)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    const body = await req.json();

    // Validate the request body with Yup
    await stickerSchema.validate(body, { abortEarly: false });

    const { name, description, price, imageUrl, available, tags } = body;

    await connectDB();
    const updatedSticker = await Sticker.findByIdAndUpdate(
      stickerId,
      { name, description, price, imageUrl, available, tags },
      { new: true },
    );

    if (!updatedSticker) {
      return NextResponse.json(
        { message: 'Sticker not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedSticker, { status: 200 });
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      // Collect validation error messages
      const validationErrors = error.inner.map((err) => err.message);
      return NextResponse.json(
        { message: 'Validation failed', errors: validationErrors },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: 'Error updating sticker' },
      { status: 500 },
    );
  }
}

// DELETE route with validation
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const stickerId = params.id;
    if (!mongoose.Types.ObjectId.isValid(stickerId)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    await connectDB();
    const deletedSticker = await Sticker.findByIdAndDelete(stickerId);

    if (!deletedSticker) {
      return NextResponse.json(
        { message: 'Sticker not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: 'Sticker deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting sticker' },
      { status: 500 },
    );
  }
}
