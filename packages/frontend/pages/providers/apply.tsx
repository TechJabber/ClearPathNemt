import Link from 'next/link';
import Navigation from '../../components/Navigation';

export default function ProvidersApply() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8" style={{ color: '#003366' }}>Provider Application</h1>

        <div className="space-y-8 text-gray-700 text-lg">
          <p className="text-xl">
            Interested in partnering with ClearPath NEMT? We're looking for reliable transportation providers to serve our patients across Massachusetts and surrounding states.
          </p>

          <div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#003366' }}>Requirements</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Valid business license and EIN</li>
              <li>General liability insurance ($1M minimum)</li>
              <li>Commercial auto insurance</li>
              <li>Workers compensation insurance (if applicable)</li>
              <li>Wheelchair accessible vehicles (preferred)</li>
              <li>Trained and background-checked drivers</li>
              <li>Professional customer service standards</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#003366' }}>Benefits</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Steady stream of scheduled rides</li>
              <li>Competitive compensation</li>
              <li>Direct billing with insurance providers</li>
              <li>Professional support and training</li>
              <li>Growth opportunities in expanding markets</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-8 rounded-lg border-l-4" style={{ borderColor: '#D4A574' }}>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#003366' }}>Ready to Apply?</h3>
            <p className="mb-4">Contact us today to learn more about our partnership opportunities.</p>
            <div className="flex gap-4">
              <a href="tel:1-800-NEMT-NOW" className="px-6 py-2 rounded text-white font-semibold" style={{ backgroundColor: '#D4A574' }}>
                Call: 1-800-NEMT-NOW
              </a>
              <Link href="/contact" className="px-6 py-2 rounded border-2 font-semibold" style={{ borderColor: '#D4A574', color: '#D4A574' }}>
                Send Message
              </Link>
            </div>
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
