import Link from 'next/link';
import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

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

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-center" style={{ color: '#003366' }}>Contact Us</h1>
          <p className="text-center text-gray-600 mb-16">Get in touch with ClearPath NEMT</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#003366' }}>Get in Touch</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-2">Phone</h3>
                  <a href="tel:1-800-NEMT-NOW" className="text-blue-600 hover:underline">1-800-NEMT-NOW (1-800-636-8669)</a>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Email</h3>
                  <a href="mailto:info@clearpathnemt.com" className="text-blue-600 hover:underline">info@clearpathnemt.com</a>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Hours</h3>
                  <p className="text-gray-600">24/7 Medical Transportation</p>
                  <p className="text-gray-600">Office: Monday - Friday, 8AM - 6PM EST</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Service Area</h3>
                  <p className="text-gray-600">MA • CT • RI • VT • NH</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#003366' }}>Send Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  style={{ borderColor: '#D4A574' }}
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  style={{ borderColor: '#D4A574' }}
                  required
                />
                <textarea
                  placeholder="Message"
                  rows={5}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  style={{ borderColor: '#D4A574' }}
                  required
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded text-white font-semibold"
                  style={{ backgroundColor: '#D4A574' }}
                >
                  Send Message
                </button>
                {submitted && (
                  <p className="text-green-600 text-center">Message sent! We'll respond shortly.</p>
                )}
              </form>
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
