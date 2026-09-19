import Link from 'next/link';
import Navigation from '../components/Navigation';
import ImmediateHelp from '../components/ImmediateHelp';
import {
  AmbulatoryImage,
  WheelchairImage,
  StretcherImage,
  CompanionImage,
  AppointmentImage,
  GPSTrackingImage,
} from '../components/ServiceImages';

export default function Services() {
  const services = [
    {
      title: 'Ambulatory Rides',
      desc: 'For mobile patients who can walk with or without assistance',
      Image: AmbulatoryImage,
    },
    {
      title: 'Wheelchair Accessible',
      desc: 'Equipped vehicles for wheelchair users',
      Image: WheelchairImage,
    },
    {
      title: 'Stretcher Rides',
      desc: 'For patients requiring medical stretchers',
      Image: StretcherImage,
    },
    {
      title: 'Companion Care',
      desc: 'Rides for patients needing a caregiver companion',
      Image: CompanionImage,
    },
    {
      title: 'Appointment Scheduling',
      desc: 'Plan your medical appointments with advance booking',
      Image: AppointmentImage,
    },
    {
      title: 'Live GPS Tracking',
      desc: 'Real-time location sharing for caregivers - see exactly where your loved one is',
      Image: GPSTrackingImage,
    },
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
              <div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
              >
                {/* Image Header */}
                <div className="w-full h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
                  <div className="w-full h-full">
                    <service.Image />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#003366' }}>
                    {service.title}
                  </h3>
                  <p className="text-gray-600 flex-1 leading-relaxed">{service.desc}</p>

                  {/* Bottom accent line */}
                  <div className="mt-4 pt-4 border-t-2" style={{ borderColor: '#D4A574' }}></div>
                </div>
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

      <ImmediateHelp />

      <footer className="bg-gray-900 text-white py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2026 ClearPath NEMT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
