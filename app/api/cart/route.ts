import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/config/db';
import User from '@/models/User';
import Sticker from '@/models/Sticker';
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
  try {
    const { userId, stickerId, quantity = 1 } = await req.json();

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: 'Invalid User ID' }, { status: 400 });
    }
    if (!stickerId || !mongoose.Types.ObjectId.isValid(stickerId)) {
      return NextResponse.json(
        { message: 'Invalid Sticker data' },
        { status: 400 },
      );
    }

    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const sticker = await Sticker.findById(stickerId);
    if (!sticker) {
      return NextResponse.json(
        { message: 'Sticker not found' },
        { status: 404 },
      );
    }

    // Add the sticker to the cart
    user.cartItems.push({
      sticker: new mongoose.Types.ObjectId(stickerId),
      quantity,
    });
    await user.save();

    return NextResponse.json({ message: 'Sticker added to cart successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Something went wrong', error: error.message },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId');

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: 'Invalid User ID' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findById(userId).populate('cartItems.stickerId');

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user.cartItems);
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Something went wrong', error: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId');
    const stickerId = req.nextUrl.searchParams.get('stickerId');

    if (
      !userId ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !stickerId ||
      !mongoose.Types.ObjectId.isValid(stickerId)
    ) {
      return NextResponse.json(
        { message: 'Invalid User or Sticker ID' },
        { status: 400 },
      );
    }

    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Remove sticker from cart
    user.cartItems = user.cartItems.filter(
      (item: any) => item.sticker !== stickerId,
    );
    await user.save();

    return NextResponse.json({
      message: 'Sticker removed from cart successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Something went wrong', error: error.message },
      { status: 500 },
    );
  }
}
