'use client';
import { register } from '@/action/user';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function Register() {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const result = await register(formData);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Account created successfully!');
      router.replace('/login');
    }
  };

  return (
    <section className="section pb-20">
      <h1 className="section-title pb-4 text-center">Create Your Account</h1>
      <div className="mx-auto md:max-w-xl">
        <p className="pb-8 text-center text-lg text-text-secondary">
          Create an account to easily manage your orders, customize your
          stickers, and enjoy personalized features.
        </p>
        <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
            />
          </div>
          <button className="btn-full mt-4" type="submit">
            Create Account
          </button>
        </form>
        <p className="pt-8 text-center text-base font-medium text-text-secondary">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
export default Register;
