import Link from 'next/link';

export default function PatientDashboard() {
  const rides = [
    {
      id: 1,
      date: '2026-09-20',
      from: '123 Main St, Boston, MA',
      to: 'Boston Medical Center, Boston, MA',
      status: 'completed',
      time: '2:00 PM',
    },
    {
      id: 2,
      date: '2026-09-22',
      from: '456 Oak Ave, Cambridge, MA',
      to: 'Mass General Hospital, Boston, MA',
      status: 'scheduled',
      time: '10:30 AM',
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold" style={{ color: '#003366' }}>
            ClearPath NEMT
          </Link>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
            <Link href="/patient/book-ride" className="text-gray-700 hover:text-gray-900">Book Ride</Link>
            <button className="text-gray-700 hover:text-gray-900">Logout</button>
          </div>
        </div>
      </nav>

      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#003366' }}>Patient Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome! Manage your rides and account here.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 mb-2">Total Rides</h3>
            <p className="text-4xl font-bold" style={{ color: '#D4A574' }}>12</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 mb-2">Upcoming Rides</h3>
            <p className="text-4xl font-bold" style={{ color: '#D4A574' }}>1</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 mb-2">Insurance</h3>
            <p className="font-semibold" style={{ color: '#003366' }}>MassHealth</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold" style={{ color: '#003366' }}>Your Rides</h2>
            <Link href="/patient/book-ride" className="px-6 py-2 rounded text-white" style={{ backgroundColor: '#D4A574' }}>
              Book New Ride
            </Link>
          </div>

          <div className="space-y-4">
            {rides.map(ride => (
              <div key={ride.id} className="border rounded-lg p-4" style={{ borderColor: '#D4A574' }}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold" style={{ color: '#003366' }}>{ride.date} at {ride.time}</p>
                    <p className="text-gray-600 text-sm mb-2">From: {ride.from}</p>
                    <p className="text-gray-600 text-sm">To: {ride.to}</p>
                  </div>
                  <span
                    className="px-4 py-1 rounded text-white text-sm font-semibold"
                    style={{
                      backgroundColor: ride.status === 'completed' ? '#10b981' : '#3b82f6',
                    }}
                  >
                    {ride.status === 'completed' ? 'Completed' : 'Scheduled'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
