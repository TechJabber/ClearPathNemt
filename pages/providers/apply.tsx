import Head from 'next/head';
import Link from 'next/link';

export default function ProviderApply() {
  return (
    <>
      <Head>
        <title>Provider Application - Clear Path NEMT</title>
      </Head>

      <section className="bg-clear-navy text-white py-12">
        <div className="container-max">
          <h1 className="text-4xl font-bold">Provider Application</h1>
          <p className="text-gray-200 mt-2">Join Clear Path NEMT's network of transportation providers</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-max max-w-2xl">
          <h2 className="text-2xl font-bold clear-heading mb-6">Apply as a Provider</h2>
          <p className="text-gray-700 mb-8">
            Clear Path NEMT is looking for experienced transportation providers to join our network. If you meet our requirements and
            share our commitment to patient care, we'd love to work with you.
          </p>

          <h3 className="text-xl font-bold clear-heading mb-4">Requirements</h3>
          <ul className="space-y-2 mb-8 text-gray-700">
            <li className="flex gap-2">
              <span className="text-clear-gold font-bold">✓</span>
              <span>Valid business license in MA, CT, RI, VT, or NH</span>
            </li>
            <li className="flex gap-2">
              <span className="text-clear-gold font-bold">✓</span>
              <span>General liability insurance minimum $1M</span>
            </li>
            <li className="flex gap-2">
              <span className="text-clear-gold font-bold">✓</span>
              <span>Commercial auto insurance coverage</span>
            </li>
            <li className="flex gap-2">
              <span className="text-clear-gold font-bold">✓</span>
              <span>Workers' compensation insurance</span>
            </li>
            <li className="flex gap-2">
              <span className="text-clear-gold font-bold">✓</span>
              <span>Minimum 2 active drivers</span>
            </li>
          </ul>

          <div className="bg-clear-light p-6 rounded-xl mb-8">
            <h3 className="font-bold clear-heading mb-2">Ready to Apply?</h3>
            <p className="text-gray-700 mb-4">
              Create an account and complete our provider application. Our team will review your submission and get back to you within 5 business days.
            </p>
            <Link
              href="/auth/register?role=provider"
              className="inline-block clear-btn-primary px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition"
            >
              Start Application
            </Link>
          </div>

          <div className="border-t-2 border-gray-200 pt-8">
            <h3 className="font-bold clear-heading mb-4">Questions?</h3>
            <p className="text-gray-700 mb-4">
              Contact our provider relations team for more information about joining Clear Path NEMT.
            </p>
            <a
              href="mailto:providers@goclearpathemt.com"
              className="text-clear-navy font-semibold hover:text-clear-gold"
            >
              providers@goclearpathemt.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
