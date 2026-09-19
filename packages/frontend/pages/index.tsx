import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Users, Clock, Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold" style={{ color: '#003366' }}>
            Clear Path NEMT
          </div>
          <div className="hidden md:flex gap-6">
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

      {/* Hero Section */}
      <section className="py-24 px-4" style={{ backgroundColor: '#003366' }}>
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-6xl font-bold mb-6">
            Reliable Medical Transportation
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Safe, compassionate non-emergency medical transportation for MassHealth, Medicare, and Medicaid members across Massachusetts
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/patient/book-ride" className="px-8 py-3 rounded text-white font-semibold" style={{ backgroundColor: '#D4A574' }}>
              Book a Ride
            </Link>
            <Link href="/services" className="px-8 py-3 rounded border-2 border-white text-white font-semibold hover:bg-white hover:text-blue-900 transition">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ color: '#003366' }}>
            Why Choose Clear Path?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: 'Compassionate Care', desc: 'Trained drivers experienced with special medical needs' },
              { icon: Clock, title: 'On-Time Service', desc: 'Reliable scheduling and real-time tracking' },
              { icon: MapPin, title: 'Wide Coverage', desc: 'Serving MA, CT, RI, VT, NH' },
              { icon: Users, title: 'Insurance Verified', desc: 'Direct billing with MassHealth & Medicare' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow text-center">
                <feature.icon className="w-12 h-12 mx-auto mb-4" style={{ color: '#D4A574' }} />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Coverage Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ color: '#003366' }}>
            Accepted Insurance Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {['MassHealth', 'Medicare', 'Medicaid', 'Private Insurance'].map((plan, i) => (
              <div key={i} className="bg-blue-50 p-8 rounded-lg text-center border-l-4" style={{ borderColor: '#D4A574' }}>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#003366' }}>{plan}</h3>
                <p className="text-gray-600">No copay for eligible members</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4" style={{ backgroundColor: '#003366' }}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Book Your Ride?</h2>
          <p className="text-xl mb-8 opacity-90">
            Call us or book online for fast, reliable medical transportation
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="tel:1-800-NEMT-NOW" className="px-8 py-3 rounded text-white font-semibold" style={{ backgroundColor: '#D4A574' }}>
              Call: 1-800-NEMT-NOW
            </a>
            <Link href="/contact" className="px-8 py-3 rounded border-2 border-white text-white font-semibold hover:bg-white hover:text-blue-900 transition">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Clear Path NEMT</h3>
            <p className="text-gray-400">Reliable, compassionate medical transportation</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="text-gray-400 space-y-2">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Patient Portal</h4>
            <ul className="text-gray-400 space-y-2">
              <li><Link href="/patient/book-ride">Book Ride</Link></li>
              <li><Link href="/auth/login">Login</Link></li>
              <li><Link href="/auth/register">Register</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-gray-400">📞 1-800-NEMT-NOW</p>
            <p className="text-gray-400">📧 info@clearpathemt.com</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Clear Path NEMT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
