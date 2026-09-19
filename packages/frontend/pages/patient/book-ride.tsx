import Link from 'next/link';
import { useState } from 'react';

export default function BookRide() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pickupAddress: '',
    pickupCity: '',
    pickupZip: '',
    dropoffAddress: '',
    dropoffCity: '',
    dropoffZip: '',
    scheduledTime: '',
    rideType: 'ambulatory',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log('Booking:', formData);
      alert('Ride booked successfully!');
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold" style={{ color: '#003366' }}>
            ClearPath NEMT
          </Link>
          <div className="flex gap-6">
            <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
            <Link href="/patient/dashboard" className="text-gray-700 hover:text-gray-900">Dashboard</Link>
          </div>
        </div>
      </nav>

      <section className="py-20 px-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: '#003366' }}>Book a Ride</h1>

        {/* Progress */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex-1 text-center">
              <div
                className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: i <= step ? '#D4A574' : '#ccc' }}
              >
                {i}
              </div>
              <p className="text-sm" style={{ color: i <= step ? '#003366' : '#999' }}>
                {i === 1 ? 'Pickup' : i === 2 ? 'Dropoff' : 'Confirm'}
              </p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow space-y-6">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#003366' }}>Pickup Location</h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold mb-2">Address</label>
                  <input
                    type="text"
                    name="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    style={{ borderColor: '#D4A574' }}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2">City</label>
                    <input
                      type="text"
                      name="pickupCity"
                      value={formData.pickupCity}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg"
                      style={{ borderColor: '#D4A574' }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">ZIP</label>
                    <input
                      type="text"
                      name="pickupZip"
                      value={formData.pickupZip}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg"
                      style={{ borderColor: '#D4A574' }}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#003366' }}>Dropoff Location</h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold mb-2">Address</label>
                  <input
                    type="text"
                    name="dropoffAddress"
                    value={formData.dropoffAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    style={{ borderColor: '#D4A574' }}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2">City</label>
                    <input
                      type="text"
                      name="dropoffCity"
                      value={formData.dropoffCity}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg"
                      style={{ borderColor: '#D4A574' }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">ZIP</label>
                    <input
                      type="text"
                      name="dropoffZip"
                      value={formData.dropoffZip}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg"
                      style={{ borderColor: '#D4A574' }}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#003366' }}>Ride Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold mb-2">Scheduled Time</label>
                  <input
                    type="datetime-local"
                    name="scheduledTime"
                    value={formData.scheduledTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    style={{ borderColor: '#D4A574' }}
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Ride Type</label>
                  <select
                    name="rideType"
                    value={formData.rideType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    style={{ borderColor: '#D4A574' }}
                  >
                    <option value="ambulatory">Ambulatory</option>
                    <option value="wheelchair">Wheelchair Accessible</option>
                    <option value="stretcher">Stretcher</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 px-6 py-2 rounded border-2 font-semibold"
                style={{ borderColor: '#D4A574', color: '#D4A574' }}
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="flex-1 px-6 py-2 rounded text-white font-semibold"
              style={{ backgroundColor: '#D4A574' }}
            >
              {step < 3 ? 'Next' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
