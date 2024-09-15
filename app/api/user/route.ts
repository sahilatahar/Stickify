import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/config/db';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import * as Yup from 'yup';

const registrationValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string()
    .matches(
      /^[789]\d{9}$/,
      'Invalid phone number. Must be a 10-digit number starting with 7, 8, or 9.',
    )
    .required('Phone number is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export async function POST(req: NextRequest) {
  try {
    const { email, name, password, phoneNumber } = await req.json();

    // Validate request body
    await registrationValidationSchema.validate(
      { name, email, phoneNumber, password },
      { abortEarly: false },
    );

    // Connect to the database
    await connectDB();

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 },
      );
    }

    // Hash password and create new user
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 },
    );
  } catch (err: any) {
    if (err?.inner) {
      const validationErrors = err.inner.map((e: any) => e.message).join('\n');
      return NextResponse.json({ errors: validationErrors }, { status: 400 });
    }

    return NextResponse.json(
      { message: err.message || 'An error occurred' },
      { status: 500 },
    );
  }
}
