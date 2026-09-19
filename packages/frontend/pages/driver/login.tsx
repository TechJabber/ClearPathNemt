import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Navigation from '../../components/Navigation';

export default function DriverLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Mock authentication for MVP
      if (formData.email === 'driver@clearpath.com' && formData.password === 'driver123') {
        // Store driver session
        localStorage.setItem('driverAuth', JSON.stringify({
          driverId: 'driver_001',
          name: 'John Smith',
          email: formData.email,
          token: 'mock_token_' + Date.now(),
        }));
        router.push('/driver/dashboard');
      } else {
        setError('Invalid email or password. Try: driver@clearpath.com / driver123');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      <Navigation showLoginButton={false} />

      <section className="py-20 px-4 max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: '#003366' }}>
            Driver Login
          </h1>
          <p className="text-center text-gray-600 mb-8">Access your assigned rides</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold mb-2" style={{ color: '#003366' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                style={{ borderColor: '#D4A574' }}
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2" style={{ color: '#003366' }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                style={{ borderColor: '#D4A574' }}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded text-white font-semibold transition"
              style={{ backgroundColor: '#D4A574', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded border-l-4 border-blue-500">
            <p className="text-sm text-blue-800 font-semibold mb-2">Demo Credentials:</p>
            <p className="text-sm text-blue-700">Email: driver@clearpath.com</p>
            <p className="text-sm text-blue-700">Password: driver123</p>
          </div>

          <p className="text-center text-gray-600 mt-6 text-sm">
            Not a driver? <Link href="/" className="text-blue-600 hover:underline">Back to home</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
