import Head from 'next/head';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I book a ride?',
      answer: 'You can book a ride through our website, mobile app, or by calling 1-844-NEMT-123. You'll need to provide your pickup and dropoff locations and appointment time.',
    },
    {
      question: 'Is there a cost for rides?',
      answer: 'For MassHealth and Medicare members, rides may be covered. Copays vary by plan. Call us to verify your coverage before booking.',
    },
    {
      question: 'Can I cancel a scheduled ride?',
      answer: 'Yes, you can cancel up to 2 hours before your appointment. Contact us through the app or by phone.',
    },
    {
      question: 'Are your drivers trained?',
      answer: 'Yes, all Clear Path NEMT drivers are background-checked, professionally trained, and experienced with medical transportation.',
    },
    {
      question: 'What states do you serve?',
      answer: 'We currently serve Massachusetts, Connecticut, Rhode Island, Vermont, and New Hampshire.',
    },
  ];

  return (
    <>
      <Head>
        <title>FAQ - Clear Path NEMT</title>
        <meta name="description" content="Frequently asked questions about Clear Path NEMT services." />
      </Head>

      <section className="bg-clear-navy text-white py-12">
        <div className="container-max">
          <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-max max-w-2xl">
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-clear-light transition"
                >
                  <span className="font-semibold text-lg clear-heading">{faq.question}</span>
                  <ChevronDown
                    size={24}
                    className={`text-clear-gold transition ${openIndex === idx ? 'rotate-180' : ''}`}
                  />
                </button>
                {openIndex === idx && (
                  <div className="px-6 py-4 bg-clear-light border-t-2 border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
