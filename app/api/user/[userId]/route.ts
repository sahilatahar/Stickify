import connectDB from '@/config/db';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import * as yup from 'yup';

// Define Yup validation schema
const userSchema = yup.object().shape({
  name: yup.string().required('Name is required').trim(),
  address: yup.string().optional(),
});

// Fetch user by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  const { userId } = params;

  try {
    await connectDB();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return NextResponse.json(
      { message: 'Failed to fetch user' },
      { status: 500 },
    );
  }
}

// Update user by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  const { userId } = params;
  const { name, address } = await req.json();

  try {
    // Validate input data
    await userSchema.validate({ name, address }, { abortEarly: false });

    await connectDB();
    const updatedUser = await User.findByIdAndUpdate(userId, { name, address });

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json(
        { message: error.errors.join(', ') },
        { status: 400 },
      );
    }

    console.error('Failed to update user:', error);
    return NextResponse.json(
      { message: 'Failed to update user' },
      { status: 500 },
    );
  }
}

// Delete user by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  const { userId } = params;

  try {
    await connectDB();
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Failed to delete user:', error);
    return NextResponse.json(
      { message: 'Failed to delete user' },
      { status: 500 },
    );
  }
}
