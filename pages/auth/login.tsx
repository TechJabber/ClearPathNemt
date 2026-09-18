import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Call API
    console.log('Login attempt:', formData);
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>Login - Clear Path NEMT</title>
      </Head>

      <section className="min-h-screen flex items-center justify-center bg-clear-light py-12 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-3xl font-bold clear-heading mb-2 text-center">Welcome Back</h2>
          <p className="text-gray-600 text-center mb-8">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold clear-heading mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 border-clear-navy/20 rounded-lg focus:outline-none focus:border-clear-navy"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold clear-heading mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 border-clear-navy/20 rounded-lg focus:outline-none focus:border-clear-navy"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full clear-btn-primary px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Don't have an account?{' '}
              <Link href="/auth/register" className="text-clear-navy font-semibold hover:text-clear-gold">
                Create one
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link href="/contact" className="text-sm text-clear-navy hover:text-clear-gold">
              Need help? Contact support
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
