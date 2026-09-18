import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setIsLoading(true);
    // TODO: Call API
    console.log('Register attempt:', formData);
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>Register - Clear Path NEMT</title>
      </Head>

      <section className="min-h-screen flex items-center justify-center bg-clear-light py-12 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h2 className="text-3xl font-bold clear-heading mb-2 text-center">Create Account</h2>
          <p className="text-gray-600 text-center mb-8">Join Clear Path NEMT today</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold clear-heading mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-clear-navy/20 rounded-lg focus:outline-none focus:border-clear-navy"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold clear-heading mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-clear-navy/20 rounded-lg focus:outline-none focus:border-clear-navy"
                  placeholder="Doe"
                />
              </div>
            </div>

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
              <label className="block text-sm font-semibold clear-heading mb-2">Account Type</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-clear-navy/20 rounded-lg focus:outline-none focus:border-clear-navy"
              >
                <option value="patient">Patient</option>
                <option value="provider">Provider</option>
                <option value="driver">Driver</option>
              </select>
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

            <div>
              <label className="block text-sm font-semibold clear-heading mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
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
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-clear-navy font-semibold hover:text-clear-gold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
