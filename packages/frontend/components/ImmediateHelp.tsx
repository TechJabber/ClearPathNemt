import Link from 'next/link';
import { MessageCircle, Phone, CheckCircle2 } from 'lucide-react';

export default function ImmediateHelp() {
  const steps = [
    {
      number: 1,
      title: 'We review your request',
      description: 'Within 30 minutes',
      icon: '📋',
    },
    {
      number: 2,
      title: 'Confirm availability & details',
      description: 'Our team checks your needs',
      icon: '✓',
    },
    {
      number: 3,
      title: 'Get confirmation',
      description: 'Call or text notification',
      icon: '📱',
    },
    {
      number: 4,
      title: 'Driver arrives on time',
      description: 'Every time, guaranteed',
      icon: '🚐',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#003366' }}>
            Need Immediate Help?
          </h2>
          <p className="text-lg text-gray-600">
            We're here 24/7 to assist you with any transportation needs
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Phone */}
          <a
            href="tel:1-800-NEMT-NOW"
            className="p-8 rounded-lg border-2 text-center hover:shadow-lg transition"
            style={{ borderColor: '#D4A574', backgroundColor: '#f9fafb' }}
          >
            <Phone size={40} className="mx-auto mb-4" style={{ color: '#D4A574' }} />
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#003366' }}>
              Call Now
            </h3>
            <p className="text-lg font-semibold mb-2" style={{ color: '#D4A574' }}>
              1-800-NEMT-NOW
            </p>
            <p className="text-gray-600">(1-800-636-8669)</p>
            <p className="text-sm text-gray-500 mt-4">Available 24/7</p>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/16175551234?text=Hi%20ClearPath%20NEMT,%20I%20need%20immediate%20medical%20transportation"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-lg border-2 text-center hover:shadow-lg transition"
            style={{ borderColor: '#D4A574', backgroundColor: '#f9fafb' }}
          >
            <MessageCircle size={40} className="mx-auto mb-4" style={{ color: '#D4A574' }} />
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#003366' }}>
              Chat on WhatsApp
            </h3>
            <p className="text-lg font-semibold mb-2" style={{ color: '#D4A574' }}>
              Message Us
            </p>
            <p className="text-gray-600">Quick & convenient</p>
            <p className="text-sm text-gray-500 mt-4">Fast response time</p>
          </a>
        </div>

        {/* What Happens Next Timeline */}
        <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-8 rounded-lg">
          <h3 className="text-3xl font-bold text-center mb-12" style={{ color: '#003366' }}>
            What Happens Next?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={step.number} className="relative h-full">
                {/* Step Card */}
                <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col h-full">
                  {/* Number Circle */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4"
                    style={{ backgroundColor: '#D4A574' }}
                  >
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="text-4xl mb-3">{step.icon}</div>

                  {/* Title */}
                  <h4 className="font-bold text-lg mb-2" style={{ color: '#003366' }}>
                    {step.title}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-600 text-sm flex-1">{step.description}</p>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-1/3 -right-3 w-6 h-1"
                    style={{ backgroundColor: '#D4A574' }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-8 bg-white p-5 rounded-lg border-l-4" style={{ borderColor: '#D4A574' }}>
            <div className="flex gap-3">
              <CheckCircle2 size={20} style={{ color: '#D4A574' }} className="flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-bold mb-3 text-lg" style={{ color: '#003366' }}>
                  Why Choose ClearPath?
                </h4>
                <ul className="space-y-2.5 text-gray-600 text-base grid grid-cols-2 gap-x-4">
                  <li>✓ Fast response times</li>
                  <li>✓ Experienced drivers</li>
                  <li>✓ Wheelchair accessible</li>
                  <li>✓ Real-time tracking</li>
                  <li>✓ Insurance verified</li>
                  <li>✓ 24/7 support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Don't wait. Book your ride or get help now.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="tel:1-800-NEMT-NOW"
              className="px-8 py-3 rounded text-white font-semibold"
              style={{ backgroundColor: '#D4A574' }}
            >
              📞 Call 1-800-NEMT-NOW
            </a>
            <Link
              href="/patient/book-ride"
              className="px-8 py-3 rounded border-2 font-semibold"
              style={{ borderColor: '#D4A574', color: '#D4A574' }}
            >
              🚐 Book Online
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
