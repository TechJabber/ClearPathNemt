import Head from 'next/head';
import Link from 'next/link';
import { Heart, MapPin, Users, Clock, Shield, Smartphone } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Head>
        <title>Clear Path NEMT - Non-Emergency Medical Transportation</title>
        <meta
          name="description"
          content="Reliable non-emergency medical transportation (NEMT) for MassHealth and Medicare members in Massachusetts and surrounding states."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Hero Section */}
      <section className="bg-clear-navy text-white py-20">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Reliable Medical Transportation,
                <span className="text-clear-gold"> Every Time</span>
              </h1>
              <p className="text-gray-200 text-lg mb-8">
                Clear Path NEMT provides accessible, dependable transportation for your medical appointments.
                Serving MassHealth and Medicare members across Massachusetts and surrounding states.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/patient/book-ride"
                  className="clear-btn-secondary px-8 py-3 rounded-lg font-semibold text-center hover:shadow-lg transition"
                >
                  Book a Ride
                </Link>
                <Link
                  href="/about"
                  className="clear-btn-outline px-8 py-3 rounded-lg font-semibold text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="slide-in">
              <div className="bg-clear-gold/10 rounded-xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={64} className="mx-auto mb-4 text-clear-gold" />
                  <p className="text-gray-300">Medical Transportation Made Easy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container-max">
          <h2 className="text-3xl md:text-4xl font-bold text-center clear-heading mb-12">
            Why Choose Clear Path?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Patient-First Approach',
                description: 'Your health and comfort are our top priority in every ride.',
              },
              {
                icon: Clock,
                title: 'On-Time Guarantee',
                description: 'Reliable scheduling and real-time tracking so you never miss an appointment.',
              },
              {
                icon: Shield,
                title: 'Safe & Verified',
                description: 'All drivers are background-checked and professionally trained.',
              },
              {
                icon: Smartphone,
                title: 'Easy to Use',
                description: 'Book rides online, by phone, or through our mobile app.',
              },
              {
                icon: Users,
                title: 'Expert Drivers',
                description: 'Experienced drivers familiar with medical facilities and patient needs.',
              },
              {
                icon: MapPin,
                title: '5-State Coverage',
                description: 'Serving MA, CT, RI, VT, and NH for your convenience.',
              },
            ].map((feature, idx) => (
              <div key={idx} className="p-6 border-2 border-gray-200 rounded-xl hover:border-clear-gold hover:shadow-lg transition">
                <feature.icon size={32} className="text-clear-gold mb-4" />
                <h3 className="text-xl font-bold clear-heading mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Coverage Section */}
      <section className="py-20 bg-clear-light">
        <div className="container-max">
          <h2 className="text-3xl md:text-4xl font-bold text-center clear-heading mb-12">
            Insurance Coverage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { name: 'MassHealth', logo: '🏥' },
              { name: 'Medicare', logo: '⚕️' },
              { name: 'Medicaid', logo: '✓' },
            ].map((insurance, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-xl border-2 border-clear-navy/10 text-center hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{insurance.logo}</div>
                <h3 className="text-2xl font-bold clear-heading">{insurance.name}</h3>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/benefits"
              className="inline-block clear-btn-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              Check Your Coverage
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-clear-navy text-white py-16">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Book Your Ride?</h2>
          <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
            Download our app or call us 24/7 to schedule your medical transportation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/patient/register"
              className="bg-clear-gold text-clear-navy px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              Get Started
            </Link>
            <a
              href="tel:1-844-836-8123"
              className="border-2 border-clear-gold text-clear-gold px-8 py-3 rounded-lg font-semibold hover:bg-clear-gold hover:text-clear-navy transition"
            >
              Call Us: 1-844-NEMT-123
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
