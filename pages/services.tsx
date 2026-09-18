import Head from 'next/head';
import { MapPin, Users, Clock, Shield, Zap, Heart } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: MapPin,
      title: 'Medical Appointment Transport',
      description: 'Reliable rides to your doctor visits, specialist appointments, and routine check-ups.',
      details: ['Same-day booking', 'Wheelchair accessible', 'Friendly drivers'],
    },
    {
      icon: Zap,
      title: 'Dialysis & Treatment Transportation',
      description: 'Regular, predictable transportation for ongoing medical treatments.',
      details: ['Flexible scheduling', 'Regular ride discounts', 'Insurance coverage'],
    },
    {
      icon: Users,
      title: 'Group Medical Transport',
      description: 'Efficient transportation for multiple patients heading to the same facility.',
      details: ['Coordinated scheduling', 'Cost-effective', 'On-time guarantee'],
    },
    {
      icon: Heart,
      title: 'Specialized Care Transport',
      description: 'Compassionate transport for elderly, disabled, and immunocompromised passengers.',
      details: ['Trained drivers', 'Accessible vehicles', 'Extra assistance available'],
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Round-the-clock transportation for emergency and urgent care visits.',
      details: ['Always available', 'Fast response time', 'Emergency protocols'],
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Complete safety standards, background checks, and insured transportation.',
      details: ['Background checked drivers', 'Full insurance', 'Safety protocols'],
    },
  ];

  const states = [
    { name: 'Massachusetts', abbr: 'MA', coverage: 'Full Service' },
    { name: 'Connecticut', abbr: 'CT', coverage: 'Full Service' },
    { name: 'Rhode Island', abbr: 'RI', coverage: 'Full Service' },
    { name: 'Vermont', abbr: 'VT', coverage: 'Limited Service' },
    { name: 'New Hampshire', abbr: 'NH', coverage: 'Limited Service' },
  ];

  return (
    <>
      <Head>
        <title>Services - Clear Path NEMT</title>
        <meta name="description" content="Comprehensive medical transportation services across New England." />
      </Head>

      {/* Hero */}
      <section className="bg-clear-navy text-white py-12">
        <div className="container-max">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-gray-200 text-lg">Comprehensive medical transportation tailored to your needs</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container-max">
          <h2 className="text-3xl md:text-4xl font-bold text-center clear-heading mb-12">
            Transportation Solutions for Every Need
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="p-6 border-2 border-gray-200 rounded-xl hover:border-clear-gold hover:shadow-lg transition">
                <service.icon size={40} className="text-clear-gold mb-4" />
                <h3 className="text-xl font-bold clear-heading mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.details.map((detail, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-clear-gold font-bold mt-1">✓</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="py-20 bg-clear-light">
        <div className="container-max">
          <h2 className="text-3xl md:text-4xl font-bold text-center clear-heading mb-12">
            Service Coverage Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {states.map((state, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl text-center border-2 border-clear-navy/10 hover:border-clear-gold transition">
                <div className="text-3xl font-bold text-clear-navy mb-2">{state.abbr}</div>
                <p className="font-semibold text-gray-700 mb-2">{state.name}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  state.coverage === 'Full Service'
                    ? 'bg-clear-gold text-clear-navy'
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {state.coverage}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Guarantees */}
      <section className="py-20 bg-white">
        <div className="container-max max-w-3xl">
          <h2 className="text-3xl font-bold text-center clear-heading mb-12">
            Clear Path Guarantees
          </h2>
          <div className="space-y-6">
            {[
              {
                title: 'On-Time Service',
                description: 'We guarantee pickup within 15 minutes of your scheduled time or your next ride is free.',
              },
              {
                title: 'Professional Drivers',
                description: 'All drivers are background-checked, trained in patient care, and familiar with medical facilities.',
              },
              {
                title: 'Accessible Vehicles',
                description: 'Wheelchair accessible, equipped with lifts and securing systems for safe transport.',
              },
              {
                title: 'Insurance Coverage',
                description: 'We work with MassHealth, Medicare, Medicaid, and private insurance for seamless billing.',
              },
              {
                title: 'Customer Support',
                description: 'Available 24/7 by phone or app for booking, changes, or support.',
              },
              {
                title: 'Safety First',
                description: 'Fully insured vehicles, regular maintenance, and strict safety protocols.',
              },
            ].map((guarantee, idx) => (
              <div key={idx} className="flex gap-4 p-4 border-l-4 border-clear-gold">
                <div className="text-clear-gold font-bold text-xl">✓</div>
                <div>
                  <h3 className="font-bold clear-heading mb-1">{guarantee.title}</h3>
                  <p className="text-gray-600">{guarantee.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-clear-navy text-white py-16">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to experience Clear Path?</h2>
          <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
            Book your first ride today and discover why thousands of patients trust Clear Path NEMT for their medical transportation.
          </p>
          <a
            href="/patient/register"
            className="inline-block bg-clear-gold text-clear-navy px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            Book a Ride Now
          </a>
        </div>
      </section>
    </>
  );
}
