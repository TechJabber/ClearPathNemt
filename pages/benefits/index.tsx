import Head from 'next/head';
import Link from 'next/link';

export default function Benefits() {
  const insurances = [
    {
      name: 'MassHealth',
      path: '/benefits/masshealth',
      description: 'Coverage for MassHealth members',
    },
    {
      name: 'Medicare',
      path: '/benefits/medicare',
      description: 'Medicare beneficiary information',
    },
    {
      name: 'Medicaid',
      path: '/benefits/medicaid',
      description: 'State Medicaid program details',
    },
  ];

  return (
    <>
      <Head>
        <title>Insurance Benefits - Clear Path NEMT</title>
      </Head>

      <section className="bg-clear-navy text-white py-12">
        <div className="container-max">
          <h1 className="text-4xl font-bold">Insurance Benefits & Eligibility</h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-max max-w-3xl">
          <p className="text-lg text-gray-700 mb-12">
            Clear Path NEMT participates with major insurance programs. Select your insurance type to learn more about your coverage.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {insurances.map((insurance, idx) => (
              <Link
                key={idx}
                href={insurance.path}
                className="p-6 border-2 border-clear-navy/20 rounded-xl hover:border-clear-gold hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold clear-heading mb-2">{insurance.name}</h3>
                <p className="text-gray-600 mb-4">{insurance.description}</p>
                <span className="text-clear-gold font-semibold">Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
