'use client';
import Link from 'next/link';
import { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple validation
    if (!formData.email || !formData.password) {
      setError('Both fields are required');
      return;
    }

    // Call your backend API for login
    console.log('Login data submitted', formData);

    // Clear form and error after submission
    setFormData({
      email: '',
      password: '',
    });
    setError(null);
  };

  return (
    <section className="section pb-20">
      <h1 className="section-title pb-4 text-center">Login to Your Account</h1>
      <div className="mx-auto md:max-w-xl">
        <p className="pb-8 text-center text-lg text-text-secondary">
          Log in to your account to access personalized stickers, order history,
          and more.
        </p>
        <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className="btn-full mt-4" type="submit">
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
