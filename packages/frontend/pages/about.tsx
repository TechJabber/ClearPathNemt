import Link from 'next/link';
import Navigation from '../components/Navigation';
import ImmediateHelp from '../components/ImmediateHelp';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

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

      <ImmediateHelp />

      <footer className="bg-gray-900 text-white py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2026 ClearPath NEMT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
