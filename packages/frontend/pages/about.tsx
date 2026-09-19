import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold" style={{ color: '#003366' }}>
            ClearPath NEMT
          </Link>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900">About</Link>
            <Link href="/services" className="text-gray-700 hover:text-gray-900">Services</Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
          </div>
          <Link href="/auth/login" className="px-6 py-2 rounded text-white" style={{ backgroundColor: '#D4A574' }}>
            Login
          </Link>
        </div>
      </nav>

      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8" style={{ color: '#003366' }}>About ClearPath NEMT</h1>

        <div className="space-y-8 text-gray-700 text-lg">
          <p>
            ClearPath NEMT is dedicated to providing safe, reliable, and compassionate non-emergency medical transportation services to MassHealth, Medicare, and Medicaid members across Massachusetts and surrounding states.
          </p>

          <div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#003366' }}>Our Mission</h2>
            <p>
              To ensure that every patient has access to safe, timely, and affordable medical transportation, removing barriers to healthcare access for vulnerable populations.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#003366' }}>Our Values</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Compassion:</strong> We treat every patient with dignity and respect</li>
              <li><strong>Reliability:</strong> Punctual, safe transportation you can count on</li>
              <li><strong>Accessibility:</strong> Serving all communities across our coverage area</li>
              <li><strong>Excellence:</strong> Continuous improvement in our service quality</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#003366' }}>Coverage Area</h2>
            <p>
              We proudly serve patients across Massachusetts, Connecticut, Rhode Island, Vermont, and New Hampshire.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2026 ClearPath NEMT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
