'use server';
import connectDB from '@/config/db';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import * as Yup from 'yup';

const registrationValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Passwords does not match')
    .required('Confirm Password is required'),
});

export const register = async (formData: FormData) => {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword');

  try {
    await registrationValidationSchema.validate(
      { name, email, password, confirmPassword },
      { abortEarly: false },
    );

    await connectDB();

    const user = await User.findOne({ email });
    if (user) {
      return { error: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return { success: true };
  } catch (err: any) {
    if (err?.inner) {
      const validationError = err.inner[0].message;
      return { error: validationError };
    }

    return { error: err.message || 'An error occurred' };
  }
};
