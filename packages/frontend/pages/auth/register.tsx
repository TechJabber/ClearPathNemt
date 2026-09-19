import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Logo from '../../components/Logo';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'patient',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call backend registration API
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Registration failed. Please try again.');
        setLoading(false);
        return;
      }

      // Store auth token
      localStorage.setItem('authToken', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));

      setSuccess(true);

      // Redirect to dashboard after 1 second
      setTimeout(() => {
        if (formData.role === 'patient') {
          router.push('/patient/dashboard');
        } else if (formData.role === 'provider') {
          router.push('/providers/apply');
        } else {
          router.push('/driver/dashboard');
        }
      }, 1500);
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f9fafb' }}>
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-lg shadow">
          <Link href="/" className="flex items-center justify-center gap-2 mb-8 hover:opacity-80 transition">
            <Logo size="md" />
            <span className="text-2xl font-bold" style={{ color: '#003366' }}>ClearPath NEMT</span>
          </Link>

          <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: '#003366' }}>Create Account</h1>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              ❌ {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
              ✅ Account created successfully! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  style={{ borderColor: '#D4A574' }}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  style={{ borderColor: '#D4A574' }}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                style={{ borderColor: '#D4A574' }}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                style={{ borderColor: '#D4A574' }}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Account Type</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                style={{ borderColor: '#D4A574' }}
              >
                <option value="patient">Patient</option>
                <option value="provider">Provider</option>
                <option value="driver">Driver</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full px-6 py-2 rounded text-white font-semibold transition"
              style={{
                backgroundColor: '#D4A574',
                opacity: loading || success ? 0.7 : 1,
                cursor: loading || success ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Creating Account...' : success ? 'Success! Redirecting...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-blue-600 hover:underline font-semibold">
              Login
            </Link>
          </p>

          <p className="text-center mt-4 text-gray-600">
            <Link href="/" className="text-blue-600 hover:underline">
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
