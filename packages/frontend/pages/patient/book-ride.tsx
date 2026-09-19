import Link from 'next/link';
import { useState } from 'react';
import Navigation from '../../components/Navigation';
import { Users, Wheelchair, Heart, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function BookRide() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pickupAddress: '',
    pickupCity: '',
    pickupState: 'MA',
    pickupZip: '',
    dropoffAddress: '',
    dropoffCity: '',
    dropoffState: 'MA',
    dropoffZip: '',
    scheduledTime: '',
    rideType: 'ambulatory',
    specialRequests: '',
  });

  const serviceTypes = [
    {
      id: 'ambulatory',
      title: 'Ambulatory',
      description: 'For mobile patients who can walk',
      iconType: 'users',
    },
    {
      id: 'wheelchair',
      title: 'Wheelchair Accessible',
      description: 'Full wheelchair accessibility',
      iconType: 'wheelchair',
    },
    {
      id: 'stretcher',
      title: 'Stretcher',
      description: 'For patients requiring a stretcher',
      iconType: 'heart',
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (serviceId: string) => {
    setFormData(prev => ({ ...prev, rideType: serviceId }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      console.log('Booking:', formData);
      alert('🎉 Ride booked successfully! You will receive a confirmation email shortly.');
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      <Navigation showLoginButton={false} />

      <section className="py-20 px-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: '#003366' }}>Book a Ride</h1>

        {/* Progress */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex-1 text-center">
              <div
                className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: i <= step ? '#D4A574' : '#ccc' }}
              >
                {i}
              </div>
              <p className="text-xs sm:text-sm" style={{ color: i <= step ? '#003366' : '#999' }}>
                {i === 1 ? 'Service' : i === 2 ? 'Pickup' : i === 3 ? 'Dropoff' : 'Review'}
              </p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow space-y-6">
          {/* Step 1: Service Type Selection */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#003366' }}>Select Service Type</h2>
              <p className="text-gray-600 mb-6">Choose the service that best fits your needs</p>

              <div className="grid grid-cols-1 gap-4 mb-6">
                {serviceTypes.map(service => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleServiceSelect(service.id)}
                    className={`p-6 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                      formData.rideType === service.id
                        ? 'border-0 text-white'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{
                      backgroundColor: formData.rideType === service.id ? '#D4A574' : '#f9fafb',
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {service.iconType === 'users' && (
                          <Users
                            size={32}
                            style={{
                              color: formData.rideType === service.id ? '#003366' : '#D4A574',
                            }}
                          />
                        )}
                        {service.iconType === 'wheelchair' && (
                          <Wheelchair
                            size={32}
                            style={{
                              color: formData.rideType === service.id ? '#003366' : '#D4A574',
                            }}
                          />
                        )}
                        {service.iconType === 'heart' && (
                          <Heart
                            size={32}
                            style={{
                              color: formData.rideType === service.id ? '#003366' : '#D4A574',
                            }}
                          />
                        )}
                      </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold">{service.title}</h3>
                          <p className={formData.rideType === service.id ? 'opacity-90' : 'text-gray-600'}>
                            {service.description}
                          </p>
                        </div>
                        {formData.rideType === service.id && (
                          <CheckCircle2 size={24} style={{ color: '#003366' }} />
                        )}
                      </div>
                    </button>
                ))}
              </div>

              {/* Special Requests */}
              <div className="bg-blue-50 p-4 rounded-lg border-l-4" style={{ borderColor: '#D4A574' }}>
                <label className="block font-semibold mb-2" style={{ color: '#003366' }}>
                  Special Requests (Optional)
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Let us know about any special needs... (e.g., mobility aids, language preferences, mobility assistant needed, etc.)"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none resize-none"
                  style={{ borderColor: '#D4A574' }}
                  rows={4}
                />
                <p className="text-sm text-gray-600 mt-2">This helps us prepare the right vehicle and support for you</p>
              </div>
            </div>
          )}

          {/* Step 2: Pickup Location */}
          {step === 2 && (
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
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    style={{ borderColor: '#D4A574' }}
                    placeholder="e.g., 123 Main Street"
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold mb-2">City</label>
                    <input
                      type="text"
                      name="pickupCity"
                      value={formData.pickupCity}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                      style={{ borderColor: '#D4A574' }}
                      placeholder="e.g., Boston"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">State</label>
                    <select
                      name="pickupState"
                      value={formData.pickupState}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                      style={{ borderColor: '#D4A574' }}
                    >
                      <option value="MA">MA</option>
                      <option value="CT">CT</option>
                      <option value="RI">RI</option>
                      <option value="VT">VT</option>
                      <option value="NH">NH</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">ZIP</label>
                    <input
                      type="text"
                      name="pickupZip"
                      value={formData.pickupZip}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                      style={{ borderColor: '#D4A574' }}
                      placeholder="02101"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Dropoff Location */}
          {step === 3 && (
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
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    style={{ borderColor: '#D4A574' }}
                    placeholder="e.g., Hospital Building 5, Room 201"
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold mb-2">City</label>
                    <input
                      type="text"
                      name="dropoffCity"
                      value={formData.dropoffCity}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                      style={{ borderColor: '#D4A574' }}
                      placeholder="e.g., Boston"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">State</label>
                    <select
                      name="dropoffState"
                      value={formData.dropoffState}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                      style={{ borderColor: '#D4A574' }}
                    >
                      <option value="MA">MA</option>
                      <option value="CT">CT</option>
                      <option value="RI">RI</option>
                      <option value="VT">VT</option>
                      <option value="NH">NH</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">ZIP</label>
                    <input
                      type="text"
                      name="dropoffZip"
                      value={formData.dropoffZip}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                      style={{ borderColor: '#D4A574' }}
                      placeholder="02101"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Schedule */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#003366' }}>Review & Schedule</h2>

              <div className="space-y-4">
                <div>
                  <label className="block font-semibold mb-2">Scheduled Date & Time</label>
                  <input
                    type="datetime-local"
                    name="scheduledTime"
                    value={formData.scheduledTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    style={{ borderColor: '#D4A574' }}
                    required
                  />
                  <p className="text-sm text-gray-600 mt-1">We recommend booking at least 24 hours in advance</p>
                </div>
              </div>

              {/* Review Summary */}
              <div className="mt-8 bg-gray-50 p-6 rounded-lg border-l-4" style={{ borderColor: '#D4A574' }}>
                <h3 className="font-bold mb-4" style={{ color: '#003366' }}>Booking Summary</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Type:</span>
                    <span className="font-semibold" style={{ color: '#003366' }}>
                      {serviceTypes.find(s => s.id === formData.rideType)?.title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pickup:</span>
                    <span className="font-semibold" style={{ color: '#003366' }}>
                      {formData.pickupAddress}, {formData.pickupCity}, {formData.pickupState} {formData.pickupZip}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dropoff:</span>
                    <span className="font-semibold" style={{ color: '#003366' }}>
                      {formData.dropoffAddress}, {formData.dropoffCity}, {formData.dropoffState} {formData.dropoffZip}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date & Time:</span>
                    <span className="font-semibold" style={{ color: '#003366' }}>
                      {formData.scheduledTime ? new Date(formData.scheduledTime).toLocaleString() : 'Not set'}
                    </span>
                  </div>
                  {formData.specialRequests && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Special Requests:</span>
                      <span className="font-semibold text-right" style={{ color: '#003366' }}>
                        {formData.specialRequests}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 p-4 bg-blue-100 rounded border-l-4 border-blue-500 flex gap-3">
                  <AlertCircle size={20} className="text-blue-600 flex-shrink-0" />
                  <p className="text-sm text-blue-800">
                    We'll confirm your ride and send you a confirmation email with driver details and tracking information.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
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
              {step < 4 ? 'Next' : '✓ Confirm Booking'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
