import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { MapPin, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { RideBooking } from '@clear-path/shared';
import { apiClient } from '@/lib/api';

export default function PatientDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [rides, setRides] = useState<RideBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;

    const loadRides = async () => {
      try {
        const data = await apiClient.getMyRides();
        setRides(data);
      } catch (error) {
        console.error('Failed to load rides', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRides();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const upcomingRides = rides.filter((r) => new Date(r.scheduledTime) > new Date());
  const pastRides = rides.filter((r) => new Date(r.scheduledTime) <= new Date());

  return (
    <>
      <Head>
        <title>Patient Dashboard - Clear Path NEMT</title>
      </Head>

      <div className="min-h-screen bg-clear-light py-12">
        <div className="container-max">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold clear-heading mb-2">Welcome, {user?.firstName}!</h1>
            <p className="text-gray-600">Manage your medical transportation rides</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link href="/patient/book-ride">
              <a className="block p-6 bg-white rounded-xl border-2 border-clear-gold hover:shadow-lg transition">
                <div className="text-2xl font-bold text-clear-gold mb-2">+</div>
                <h3 className="font-bold clear-heading">Book a New Ride</h3>
                <p className="text-sm text-gray-600 mt-1">Schedule your next appointment transport</p>
              </a>
            </Link>

            <Link href="/patient/my-rides">
              <a className="block p-6 bg-white rounded-xl border-2 border-gray-200 hover:shadow-lg transition">
                <MapPin size={24} className="text-clear-gold mb-2" />
                <h3 className="font-bold clear-heading">My Rides</h3>
                <p className="text-sm text-gray-600 mt-1">View all your scheduled and past rides</p>
              </a>
            </Link>

            <Link href="/patient/eligibility">
              <a className="block p-6 bg-white rounded-xl border-2 border-gray-200 hover:shadow-lg transition">
                <CheckCircle size={24} className="text-clear-gold mb-2" />
                <h3 className="font-bold clear-heading">Check Eligibility</h3>
                <p className="text-sm text-gray-600 mt-1">Verify your insurance coverage</p>
              </a>
            </Link>
          </div>

          {/* Upcoming Rides */}
          <div className="bg-white rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold clear-heading mb-6">
              Upcoming Rides ({upcomingRides.length})
            </h2>

            {upcomingRides.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">You don't have any upcoming rides scheduled.</p>
                <Link href="/patient/book-ride">
                  <a className="inline-block clear-btn-primary px-6 py-2 rounded-lg font-semibold">
                    Book Your First Ride
                  </a>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingRides.map((ride) => (
                  <div
                    key={ride.id}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-clear-gold transition"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-gray-800">{ride.pickupLocation.address}</p>
                        <p className="text-sm text-gray-600">
                          <Clock size={14} className="inline mr-1" />
                          {new Date(ride.scheduledTime).toLocaleDateString()} at{' '}
                          {new Date(ride.scheduledTime).toLocaleTimeString()}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                        {ride.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">→ {ride.dropoffLocation.address}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Past Rides */}
          {pastRides.length > 0 && (
            <div className="bg-white rounded-xl p-8">
              <h2 className="text-2xl font-bold clear-heading mb-6">
                Past Rides ({pastRides.length})
              </h2>
              <div className="space-y-2">
                {pastRides.slice(0, 5).map((ride) => (
                  <div key={ride.id} className="p-3 border-2 border-gray-100 rounded-lg opacity-75">
                    <p className="font-semibold text-sm text-gray-700">{ride.pickupLocation.address}</p>
                    <p className="text-xs text-gray-600">
                      {new Date(ride.scheduledTime).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
