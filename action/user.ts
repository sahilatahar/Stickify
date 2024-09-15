'use server';
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
  phoneNumber: Yup.string()
    .matches(
      /^[789]\d{9}$/,
      'Invalid phone number. Must be a 10-digit number starting with 7, 8, or 9.',
    )
    .required('Phone number is required'),
});

const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://stickifystore.vercel.app';

  return base_url;
};

export const register = async (formData: FormData) => {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phoneNumber = formData.get('phoneNumber') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword');

  try {
    await registrationValidationSchema.validate(
      { name, email, password, confirmPassword, phoneNumber },
      { abortEarly: false },
    );
    const res = await fetch(checkEnvironment().concat('/api/user'), {
      method: 'POST',
      body: JSON.stringify({ name, email, phoneNumber, password }),
    });

    if (!res.ok) {
      return { error: 'Registration Failed!' };
    }
  } catch (err: any) {
    if (err?.inner) {
      const validationError = err.inner[0].message;
      return { error: validationError };
    }
    return { error: err.message };
  }
};
