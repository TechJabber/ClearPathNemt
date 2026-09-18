import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About Clear Path NEMT</title>
        <meta name="description" content="Learn about Clear Path NEMT's mission and values." />
      </Head>

      <section className="bg-clear-navy text-white py-12">
        <div className="container-max">
          <h1 className="text-4xl font-bold">About Clear Path NEMT</h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-max max-w-3xl">
          <h2 className="text-3xl font-bold clear-heading mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            At Clear Path NEMT, we believe that reliable transportation should never be a barrier to accessing quality healthcare.
            Our mission is to provide safe, dependable, and compassionate non-emergency medical transportation for MassHealth and
            Medicare members throughout New England.
          </p>

          <h2 className="text-3xl font-bold clear-heading mb-6 mt-12">Our Values</h2>
          <ul className="space-y-4 mb-8">
            <li className="flex gap-4">
              <span className="text-clear-gold font-bold text-xl flex-shrink-0">✓</span>
              <span className="text-gray-700">
                <strong>Reliability:</strong> On-time, every time. Your appointment time is sacred to us.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-clear-gold font-bold text-xl flex-shrink-0">✓</span>
              <span className="text-gray-700">
                <strong>Compassion:</strong> We understand healthcare can be stressful. Our team is trained to listen and help.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-clear-gold font-bold text-xl flex-shrink-0">✓</span>
              <span className="text-gray-700">
                <strong>Integrity:</strong> We operate with transparency and honesty in all our dealings.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-clear-gold font-bold text-xl flex-shrink-0">✓</span>
              <span className="text-gray-700">
                <strong>Excellence:</strong> We continuously improve our service to exceed expectations.
              </span>
            </li>
          </ul>

          <h2 className="text-3xl font-bold clear-heading mb-6 mt-12">Our Team</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Clear Path NEMT is led by healthcare and transportation professionals dedicated to improving access to medical care.
            Every member of our team, from drivers to support staff, is trained and committed to making your journey smooth and comfortable.
          </p>
        </div>
      </section>
    </>
  );
}
