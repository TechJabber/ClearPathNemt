import Head from 'next/head';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { apiClient } from '@/lib/api';
import { CreateBookingRequest } from '@clear-path/shared';
import Link from 'next/link';

export default function BookRide() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    pickupAddress: '',
    pickupCity: '',
    pickupState: 'MA',
    pickupZipCode: '',
    dropoffAddress: '',
    dropoffCity: '',
    dropoffState: 'MA',
    dropoffZipCode: '',
    scheduledTime: '',
    rideType: 'medical_appointment',
    notes: '',
    membershipId: '',
    insuranceType: 'masshealth',
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-clear-light">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please log in to book a ride</p>
          <Link href="/auth/login">
            <a className="inline-block clear-btn-primary px-6 py-2 rounded-lg">
              Sign In
            </a>
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const booking = await apiClient.createBooking(formData as CreateBookingRequest);
      router.push(`/patient/confirmation?id=${booking.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to book ride');
    } finally {
      setIsLoading(false);
    }
  };

  const states = ['MA', 'CT', 'RI', 'VT', 'NH'];
  const rideTypes = [
    { value: 'medical_appointment', label: 'Medical Appointment' },
    { value: 'dialysis', label: 'Dialysis Treatment' },
    { value: 'physical_therapy', label: 'Physical Therapy' },
    { value: 'specialist_visit', label: 'Specialist Visit' },
    { value: 'other', label: 'Other' },
  ];
  const insuranceTypes = [
    { value: 'masshealth', label: 'MassHealth' },
    { value: 'medicare', label: 'Medicare' },
    { value: 'medicaid', label: 'Medicaid' },
    { value: 'private', label: 'Private Insurance' },
  ];

  return (
    <>
      <Head>
        <title>Book a Ride - Clear Path NEMT</title>
      </Head>

      <div className="min-h-screen bg-clear-light py-12">
        <div className="container-max max-w-2xl">
          <h1 className="text-4xl font-bold clear-heading mb-2">Book Your Ride</h1>
          <p className="text-gray-600 mb-8">Schedule your medical transportation in a few simple steps</p>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border-2 border-red-500 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
            {/* Pickup Location */}
            <div>
              <h3 className="text-lg font-bold clear-heading mb-4">Pickup Location</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="pickupAddress"
                  placeholder="Street address"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-clear-navy/20 rounded-lg focus:outline-none focus:border-clear-navy"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="pickupCity"
                    placeholder="City"
                    value={formData.pickupCity}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border-2 border-clear-navy/20 rounded-lg focus:outline-none focus:border-clear-navy"
                  />
                  <select
                    name="pickupState"
                    value={formData.pickupState}
                    onChange={handleChange}
                    className="px-4 py-2 border-2 border-clear-navy/20 rounded-lg focus:outline-none focus:border-clear-navy"
                  >
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  name="pickupZipCode"
                  placeholder="ZIP code"
                  value={formData.pickupZipCode}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-clear-navy/20 rounded-lg focus:outline-none focus:border-clear-navy"
                />
              </div>
            </div>

            {/* Dropoff Location */}
            <div>
              <h3 className="text-lg font-bold clear-heading mb-4">Dropoff Location</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="dropoffAddress"
                  placeholder="Street address"
                  value={formData.dropoffAddress}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-clear-navy/20 rounded-lg focus:outline-none focus:border-clear-navy"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="dropoffCity"
                    placeholder="City"
                    value={formData.dropoffCity}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border-2 border-clear-navy/20 rounded-lg focus:outline-none focus:border-clear-navy"
                  />
                  <select
                    name="dropoffState"
                    value={formData.dropoffState}
                    onChange={handleChange}
                    className="px-4 py-2 border-2 border-clear-navy/20 rounded-lg focus:outline-none focus:border-clear-navy"
                  >
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  name="dropoffZipCode"
                  placeholder="ZIP code"
                  value={formData.dropoffZipCode}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-clear-navy/20 rounded-lg focus:outline-none focus:border-clear-navy"
                />
              </div>
            </div>

            {/* Appointment Time */}
            <div>
              <h3 className="text-lg font-bold clear-heading mb-4">Appointment Details</h3>
              <input
                type="datetime-local"
                name="scheduledTime"
                value={formData.scheduledTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 border-clear-navy/20 rounded-lg focus:outline-none focus:border-clear-navy"
              />
            </div>

            {/* Ride Type */}
            <div>
              <label className="block text-sm font-semibold clear-heading mb-2">Type of Ride</label>
              <select
                name="rideType"
                value={formData.rideType}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-clear-navy/20 rounded-lg focus:outline-none focus:border-clear-navy"
              >
                {rideTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Insurance Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold clear-heading mb-2">Insurance Type</label>
                <select
                  name="insuranceType"
                  value={formData.insuranceType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-clear-navy/20 rounded-lg focus:outline-none focus:border-clear-navy"
                >
                  {insuranceTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold clear-heading mb-2">Membership ID (Optional)</label>
                <input
                  type="text"
                  name="membershipId"
                  value={formData.membershipId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-clear-navy/20 rounded-lg focus:outline-none focus:border-clear-navy"
                  placeholder="Your member ID"
                />
              </div>
            </div>

            {/* Special Notes */}
            <div>
              <label className="block text-sm font-semibold clear-heading mb-2">Special Requests (Optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border-2 border-clear-navy/20 rounded-lg focus:outline-none focus:border-clear-navy"
                placeholder="Any special needs or requests?"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full clear-btn-primary px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {isLoading ? 'Booking your ride...' : 'Book Your Ride'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
