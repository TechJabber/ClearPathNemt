import Link from 'next/link';
import { useState } from 'react';
import Navigation from '../components/Navigation';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'What is non-emergency medical transportation (NEMT)?',
      a: 'NEMT is transportation for patients who need medical care but do not require an ambulance. This includes rides to and from medical appointments, dialysis, physical therapy, and other healthcare services.',
    },
    {
      q: 'Do you accept my insurance?',
      a: 'Yes! We accept MassHealth, Medicare, Medicaid, and many private insurance plans. We can verify your coverage at booking or you can call us to check beforehand.',
    },
    {
      q: 'How far in advance do I need to book a ride?',
      a: 'We recommend booking at least 24 hours in advance, but we do our best to accommodate same-day requests. Call us at 1-800-NEMT-NOW for urgent scheduling.',
    },
    {
      q: 'Is there a cost to me as a patient?',
      a: 'Most eligible patients covered by MassHealth, Medicare, or Medicaid pay $0. For private insurance, there may be a copay depending on your plan.',
    },
    {
      q: 'What if I need a wheelchair-accessible vehicle?',
      a: 'All our vehicles can accommodate wheelchairs. Just let us know your needs when booking and we\'ll ensure the right vehicle is assigned.',
    },
    {
      q: 'Can a family member or caregiver ride with me?',
      a: 'Absolutely! We encourage caregivers to accompany patients. There\'s no additional charge for a companion.',
    },
    {
      q: 'What if my appointment runs late?',
      a: 'Call us and we\'ll adjust your return pickup time. Our drivers are flexible and understand that medical appointments don\'t always stay on schedule.',
    },
    {
      q: 'How do I book a ride?',
      a: 'You can book online through our website, call us at 1-800-NEMT-NOW, or ask your healthcare provider to arrange transportation for you.',
    },
    {
      q: 'Do you serve my area?',
      a: 'We serve Massachusetts, Connecticut, Rhode Island, Vermont, and New Hampshire. Enter your location when booking to verify coverage.',
    },
    {
      q: 'What if I need to cancel my ride?',
      a: 'You can cancel up to 2 hours before your scheduled pickup time by calling us. Late cancellations may be subject to fees.',
    },
    {
      q: 'Can I track my ride in real-time?',
      a: 'Yes! ClearPath offers live GPS tracking for caregivers and family members. You can see the driver\'s real-time location, estimated arrival time, and receive notifications when they\'re 5 minutes away. Log in to your patient account after booking to access the tracking feature.',
    },
    {
      q: 'Is my location information private and secure?',
      a: 'Absolutely. Location information is only shared during active rides with authorized caregivers you designate. It\'s never stored as history and is not shared with anyone else. Your privacy and security are our top priorities.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4" style={{ backgroundColor: '#003366' }}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl opacity-90">Find answers to common questions about ClearPath NEMT services</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden transition-all"
                style={{ borderColor: '#D4A574' }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <h3 className="text-left font-semibold" style={{ color: '#003366' }}>
                    {faq.q}
                  </h3>
                  <ChevronDown
                    size={24}
                    style={{ color: '#D4A574' }}
                    className={`transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t" style={{ borderColor: '#D4A574' }}>
                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-blue-50 p-8 rounded-lg text-center border-l-4" style={{ borderColor: '#D4A574' }}>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#003366' }}>
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Our customer service team is ready to help!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="tel:1-800-NEMT-NOW"
                className="px-8 py-3 rounded text-white font-semibold"
                style={{ backgroundColor: '#D4A574' }}
              >
                Call 1-800-NEMT-NOW
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
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2026 ClearPath NEMT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
