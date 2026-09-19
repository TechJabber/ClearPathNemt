import Link from 'next/link';
import Navigation from '../components/Navigation';
import { Briefcase, Heart, Users, TrendingUp, Award, Clock } from 'lucide-react';

export default function JoinUs() {
  const positions = [
    {
      title: 'Professional Drivers',
      icon: Briefcase,
      desc: 'Safe, reliable drivers for our medical transportation fleet',
      requirements: ['Valid driver license', 'Clean driving record', 'Compassionate attitude'],
    },
    {
      title: 'Dispatchers',
      icon: Clock,
      desc: 'Coordinate rides and ensure excellent customer service',
      requirements: ['Strong communication skills', 'Multitasking ability', 'Customer service experience'],
    },
    {
      title: 'Healthcare Coordinators',
      icon: Heart,
      desc: 'Support patients and manage medical transportation requests',
      requirements: ['Healthcare knowledge', 'Patient care experience', 'Administrative skills'],
    },
    {
      title: 'Operations Manager',
      icon: TrendingUp,
      desc: 'Oversee fleet operations and team management',
      requirements: ['Management experience', 'Logistics knowledge', 'Leadership skills'],
    },
  ];

  const benefits = [
    { icon: Heart, title: 'Health Insurance', desc: 'Medical, dental, and vision coverage' },
    { icon: Users, title: 'Team Culture', desc: 'Supportive, mission-driven environment' },
    { icon: Award, title: 'Training', desc: 'Continuous professional development' },
    { icon: TrendingUp, title: 'Growth', desc: 'Career advancement opportunities' },
    { icon: Clock, title: 'Flexible Hours', desc: 'Schedules that work for you' },
    { icon: Briefcase, title: '401(k)', desc: 'Retirement planning benefits' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-24 px-4" style={{ backgroundColor: '#003366' }}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-6">Join Our Team</h1>
          <p className="text-xl opacity-90 mb-8">
            Help us provide compassionate, reliable medical transportation to patients who need it most
          </p>
          <a
            href="#positions"
            className="inline-block px-8 py-3 rounded text-blue-900 font-semibold"
            style={{ backgroundColor: '#D4A574' }}
          >
            View Open Positions
          </a>
        </div>
      </section>

      {/* Why Join ClearPath */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ color: '#003366' }}>
            Why Work at ClearPath NEMT?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow text-center">
                <benefit.icon size={40} className="mx-auto mb-4" style={{ color: '#D4A574' }} />
                <h3 className="text-xl font-bold mb-2" style={{ color: '#003366' }}>
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-blue-50 p-8 rounded-lg text-center border-l-4" style={{ borderColor: '#D4A574' }}>
            <p className="text-lg text-gray-700 mb-4">
              We believe our team members are our greatest asset. When you join ClearPath, you're joining a mission-driven organization committed to making a difference in patients' lives.
            </p>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ color: '#003366' }}>
            Open Positions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {positions.map((position, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-lg border-t-4" style={{ borderColor: '#D4A574' }}>
                <div className="flex items-start gap-4 mb-4">
                  <position.icon size={32} style={{ color: '#D4A574' }} className="flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: '#003366' }}>
                      {position.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{position.desc}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2" style={{ color: '#003366' }}>Requirements:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {position.requirements.map((req, j) => (
                      <li key={j}>{req}</li>
                    ))}
                  </ul>
                </div>
                <button
                  className="mt-6 w-full px-6 py-2 rounded text-white font-semibold"
                  style={{ backgroundColor: '#D4A574' }}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4" style={{ backgroundColor: '#003366' }}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Compassion</h3>
              <p>We care deeply about our patients and our team members</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Excellence</h3>
              <p>We strive for excellence in everything we do</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Community</h3>
              <p>We build strong, supportive teams and serve our communities</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#003366' }}>
            Interested in a Position?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Send your resume and cover letter to careers@clearpathnemt.com or apply directly above.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="mailto:careers@clearpathnemt.com"
              className="px-8 py-3 rounded text-white font-semibold"
              style={{ backgroundColor: '#D4A574' }}
            >
              Email Your Resume
            </a>
            <Link
              href="/contact"
              className="px-8 py-3 rounded border-2 font-semibold"
              style={{ borderColor: '#D4A574', color: '#D4A574' }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2026 ClearPath NEMT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
