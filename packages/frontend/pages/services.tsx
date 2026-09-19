import Link from 'next/link';
import Navigation from '../components/Navigation';

export default function Services() {
  const services = [
    { title: 'Ambulatory Rides', desc: 'For mobile patients who can walk with or without assistance' },
    { title: 'Wheelchair Accessible', desc: 'Equipped vehicles for wheelchair users' },
    { title: 'Stretcher Rides', desc: 'For patients requiring medical stretchers' },
    { title: 'Companion Care', desc: 'Rides for patients needing a caregiver companion' },
    { title: 'Appointment Scheduling', desc: 'Plan your medical appointments with advance booking' },
    { title: 'Real-Time Tracking', desc: 'Monitor your ride with GPS tracking' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-center" style={{ color: '#003366' }}>Our Services</h1>
          <p className="text-center text-gray-600 mb-16 text-lg">Comprehensive medical transportation options for all patient needs</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-lg border-t-4" style={{ borderColor: '#D4A574' }}>
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#003366' }}>{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-blue-50 p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#003366' }}>Accepted Insurance</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>MassHealth</div>
              <div>Medicare</div>
              <div>Medicaid</div>
              <div>Private Insurance</div>
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
