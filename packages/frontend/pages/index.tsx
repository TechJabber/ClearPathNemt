import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Users, Clock, Heart } from 'lucide-react';
import Navigation from '../components/Navigation';
import ImmediateHelp from '../components/ImmediateHelp';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

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

      {/* Real-Time Tracking Section - MOVED TO TOP */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6" style={{ color: '#003366' }}>
                Peace of Mind for Caregivers
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Know exactly where your loved one is at every moment. ClearPath's live GPS tracking keeps caregivers and family members informed throughout the entire ride.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <h4 className="font-bold mb-1" style={{ color: '#003366' }}>Real-Time Location Tracking</h4>
                    <p className="text-gray-600">See your patient's location updated every 15 seconds during their ride</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">⏱️</span>
                  <div>
                    <h4 className="font-bold mb-1" style={{ color: '#003366' }}>Live ETA Updates</h4>
                    <p className="text-gray-600">Get accurate estimated arrival times with countdown timer</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <h4 className="font-bold mb-1" style={{ color: '#003366' }}>Instant Arrival Alerts</h4>
                    <p className="text-gray-600">Get notified when the driver is 5 minutes away</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🔒</span>
                  <div>
                    <h4 className="font-bold mb-1" style={{ color: '#003366' }}>Privacy Protected</h4>
                    <p className="text-gray-600">Location is only shared during the ride, never stored or shared beyond authorized caregivers</p>
                  </div>
                </li>
              </ul>

              <Link
                href="/patient/book-ride"
                className="inline-flex items-center gap-2 px-8 py-3 rounded text-white font-semibold group"
                style={{ backgroundColor: '#D4A574' }}
              >
                Experience Live Tracking
                <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-xl">
              <div className="bg-gradient-to-b from-blue-50 to-gray-50 rounded-lg p-6 text-center">
                <div className="text-6xl mb-4">📱</div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#003366' }}>
                  Patient Dashboard
                </h3>
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <span className="text-2xl">🚐</span>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: '#003366' }}>Driver Info</p>
                      <p className="text-xs text-gray-600">John Smith • 8 min away</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: '#003366' }}>Live Location</p>
                      <p className="text-xs text-gray-600">42.3601° N, 71.0589° W</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <span className="text-2xl">⏰</span>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: '#003366' }}>ETA</p>
                      <p className="text-xs text-gray-600">2:45 PM • 7 minutes</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center mt-4">
                Caregivers can view live tracking after booking
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ color: '#003366' }}>
            Why Choose ClearPath?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: 'Compassionate Care', desc: 'Trained drivers experienced with special medical needs' },
              { icon: Clock, title: 'On-Time Service', desc: 'Reliable scheduling and expert drivers' },
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

      {/* Immediate Help Section */}
      <ImmediateHelp />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">ClearPath NEMT</h3>
            <p className="text-gray-400">Reliable, compassionate medical transportation</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="text-gray-400 space-y-2">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/join-us">Join Us</Link></li>
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
          <p>&copy; 2026 ClearPath NEMT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
