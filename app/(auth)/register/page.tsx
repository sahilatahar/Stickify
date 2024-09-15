'use client';
import { register } from '@/action/user';
import { Loading } from '@/components/common/Loading';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { status } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await register(formData);
    if (res?.error) {
      toast.error(res?.error);
      setLoading(false);
    } else {
      toast.success('Account created successfully!');
      router.replace('/login');
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [router, status]);

  // Redirect to Home if user is logged in
  if (status === 'loading') return <Loading />;

  return (
    <section className="section pb-20">
      <h1 className="section-title pb-4 text-center">Create Your Account</h1>
      <div className="mx-auto md:max-w-xl">
        <p className="pb-8 text-center text-lg text-text-secondary">
          Create an account to easily manage your orders, customize your
          stickers, and enjoy personalized features.
        </p>
        <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
            </div>
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" />
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
              />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" />
          </div>
          <button
            className="btn-full mt-4 disabled:cursor-no-drop disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
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
