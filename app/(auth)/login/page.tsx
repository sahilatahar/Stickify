'use client';
import { Loading } from '@/components/common/Loading';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { status } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailRef.current || !passwordRef.current) return;

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email) {
      toast.error('Email is required');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error('Invalid email format');
      return;
    }

    if (!password) {
      toast.error('Password is required');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    // Proceed with the sign-in request if validation passes
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      toast.error(res.error);
      setLoading(false);
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
    <section className="card-section">
      <div className="card">
        <h1 className="card-title">Login to Your Account</h1>
        <p className="pb-8 text-center text-lg text-text-secondary">
          Log in to your account to access personalized stickers, order history,
          and more.
        </p>
        <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" ref={emailRef} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
            />
          </div>
          <button
            className="btn-full mt-4 disabled:cursor-no-drop disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            Login
          </button>
        </form>
        <p className="pt-8 text-center text-base font-medium text-text-secondary">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-primary hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </section>
  );
}
export default Login;
