import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navigation from '../../components/Navigation';
import { MapPin, Navigation as NavigationIcon, Phone, LogOut, Clock } from 'lucide-react';

interface Ride {
  id: string;
  patientName: string;
  pickupAddress: string;
  dropoffAddress: string;
  scheduledTime: string;
  status: 'assigned' | 'in_progress' | 'completed';
  phoneNumber?: string;
}

interface DriverLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export default function DriverDashboard() {
  const router = useRouter();
  const [driver, setDriver] = useState<any>(null);
  const [currentRide, setCurrentRide] = useState<Ride | null>(null);
  const [location, setLocation] = useState<DriverLocation | null>(null);
  const [trackingActive, setTrackingActive] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);

  // Mock rides data
  const mockRides: Ride[] = [
    {
      id: 'ride_001',
      patientName: 'Maria Johnson',
      pickupAddress: '123 Main St, Boston, MA',
      dropoffAddress: 'Massachusetts General Hospital, Boston, MA',
      scheduledTime: new Date(Date.now() + 30 * 60000).toISOString(),
      status: 'assigned',
      phoneNumber: '(617) 555-0123',
    },
    {
      id: 'ride_002',
      patientName: 'Robert Chen',
      pickupAddress: '456 Oak Ave, Cambridge, MA',
      dropoffAddress: 'Brigham and Women\'s Hospital, Boston, MA',
      scheduledTime: new Date(Date.now() + 90 * 60000).toISOString(),
      status: 'assigned',
      phoneNumber: '(617) 555-0456',
    },
  ];

  // Check auth on mount
  useEffect(() => {
    const driverAuth = localStorage.getItem('driverAuth');
    if (!driverAuth) {
      router.push('/driver/login');
      return;
    }
    const auth = JSON.parse(driverAuth);
    setDriver(auth);
    setCurrentRide(mockRides[0]); // Set first ride as current
  }, [router]);

  // Get driver's location and send to backend
  const startTracking = async () => {
    setLoadingLocation(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Geolocation not supported by your browser');
      setLoadingLocation(false);
      return;
    }

    try {
      navigator.geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          const newLocation: DriverLocation = {
            latitude,
            longitude,
            accuracy,
            timestamp: Date.now(),
          };
          setLocation(newLocation);
          setTrackingActive(true);
          setLoadingLocation(false);

          // Send location to backend every 60 seconds
          try {
            await fetch('/api/driver/location', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                driverId: driver?.driverId,
                rideId: currentRide?.id,
                latitude,
                longitude,
                accuracy,
              }),
            });
          } catch (err) {
            console.error('Failed to send location:', err);
          }
        },
        (error) => {
          setLocationError(`Location error: ${error.message}`);
          setLoadingLocation(false);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );
    } catch (err) {
      setLocationError('Failed to start tracking');
      setLoadingLocation(false);
    }
  };

  const stopTracking = () => {
    setTrackingActive(false);
    setLocation(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('driverAuth');
    router.push('/driver/login');
  };

  const updateRideStatus = async (status: 'in_progress' | 'completed') => {
    if (currentRide) {
      setCurrentRide({ ...currentRide, status });
      // TODO: Send to backend API
      console.log(`Ride ${currentRide.id} status updated to ${status}`);
    }
  };

  if (!driver) {
    return null; // Loading
  }

  const timeUntilPickup = currentRide
    ? Math.ceil((new Date(currentRide.scheduledTime).getTime() - Date.now()) / 60000)
    : 0;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      <Navigation showLoginButton={false} />

      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: '#003366' }}>
                Driver Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Welcome, {driver?.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded text-white font-semibold"
              style={{ backgroundColor: '#D4A574' }}
            >
              <LogOut size={18} /> Logout
            </button>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Current Ride Info */}
            <div className="lg:col-span-2">
              {currentRide && (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold" style={{ color: '#003366' }}>
                      Current Ride
                    </h2>
                    <span
                      className="px-3 py-1 rounded-full text-white text-sm font-semibold"
                      style={{
                        backgroundColor:
                          currentRide.status === 'assigned'
                            ? '#D4A574'
                            : currentRide.status === 'in_progress'
                            ? '#003366'
                            : '#10b981',
                      }}
                    >
                      {currentRide.status === 'assigned'
                        ? 'Assigned'
                        : currentRide.status === 'in_progress'
                        ? 'In Progress'
                        : 'Completed'}
                    </span>
                  </div>

                  {/* Patient Info */}
                  <div className="space-y-4 mb-8 pb-8 border-b">
                    <div>
                      <p className="text-gray-600 text-sm">Patient Name</p>
                      <p className="text-xl font-bold" style={{ color: '#003366' }}>
                        {currentRide.patientName}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Contact</p>
                      <a
                        href={`tel:${currentRide.phoneNumber}`}
                        className="text-lg font-semibold flex items-center gap-2 hover:underline"
                        style={{ color: '#D4A574' }}
                      >
                        <Phone size={18} /> {currentRide.phoneNumber}
                      </a>
                    </div>
                  </div>

                  {/* Route Info */}
                  <div className="space-y-4 mb-8">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Pickup Location</p>
                      <p className="flex items-start gap-2 font-semibold">
                        <MapPin size={20} className="mt-0.5 flex-shrink-0" style={{ color: '#D4A574' }} />
                        <span>{currentRide.pickupAddress}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Dropoff Location</p>
                      <p className="flex items-start gap-2 font-semibold">
                        <MapPin size={20} className="mt-0.5 flex-shrink-0" style={{ color: '#D4A574' }} />
                        <span>{currentRide.dropoffAddress}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-lg font-semibold mt-4">
                      <Clock size={20} style={{ color: '#D4A574' }} />
                      <span>
                        {timeUntilPickup > 0
                          ? `Pickup in ${timeUntilPickup} minutes`
                          : 'Ready for pickup'}
                      </span>
                    </div>
                  </div>

                  {/* Tracking Section */}
                  <div className="bg-blue-50 p-4 rounded-lg mb-6 border-l-4 border-blue-500">
                    <p className="text-sm text-blue-800 font-semibold mb-3">
                      🛰️ Location Tracking
                    </p>
                    {locationError && (
                      <p className="text-sm text-red-600 mb-3">{locationError}</p>
                    )}
                    {location && (
                      <div className="text-sm text-blue-700 mb-3 space-y-1">
                        <p>📍 Lat: {location.latitude.toFixed(6)}</p>
                        <p>📍 Lon: {location.longitude.toFixed(6)}</p>
                        <p>Accuracy: ±{Math.round(location.accuracy)}m</p>
                      </div>
                    )}
                    <div className="flex gap-2">
                      {!trackingActive ? (
                        <button
                          onClick={startTracking}
                          disabled={loadingLocation}
                          className="flex-1 px-4 py-2 rounded text-white font-semibold flex items-center justify-center gap-2"
                          style={{ backgroundColor: '#D4A574', opacity: loadingLocation ? 0.7 : 1 }}
                        >
                          <NavigationIcon size={18} />
                          {loadingLocation ? 'Starting...' : 'Start Tracking'}
                        </button>
                      ) : (
                        <button
                          onClick={stopTracking}
                          className="flex-1 px-4 py-2 rounded text-white font-semibold bg-red-600 flex items-center justify-center gap-2"
                        >
                          Stop Tracking
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {trackingActive && (
                    <div className="flex gap-3">
                      {currentRide.status === 'assigned' && (
                        <button
                          onClick={() => updateRideStatus('in_progress')}
                          className="flex-1 px-4 py-3 rounded text-white font-semibold"
                          style={{ backgroundColor: '#003366' }}
                        >
                          ✓ Started Ride
                        </button>
                      )}
                      {currentRide.status === 'in_progress' && (
                        <button
                          onClick={() => updateRideStatus('completed')}
                          className="flex-1 px-4 py-3 rounded text-white font-semibold bg-green-600"
                        >
                          ✓ Ride Complete
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right: Upcoming Rides */}
            <div className="bg-white p-6 rounded-lg shadow-lg h-fit">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#003366' }}>
                Upcoming Rides
              </h3>
              <div className="space-y-3">
                {mockRides.map((ride, idx) => (
                  <button
                    key={ride.id}
                    onClick={() => setCurrentRide(ride)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition ${
                      currentRide?.id === ride.id ? 'border-0' : 'border-gray-200'
                    }`}
                    style={{
                      backgroundColor:
                        currentRide?.id === ride.id ? '#D4A574' : '#f9fafb',
                      color: currentRide?.id === ride.id ? 'white' : 'inherit',
                    }}
                  >
                    <p className="font-semibold">{ride.patientName}</p>
                    <p className="text-sm opacity-75 mt-1">{ride.pickupAddress}</p>
                    <p className="text-xs mt-2 opacity-75">
                      {new Date(ride.scheduledTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="mt-8 bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
            <p className="text-green-800 font-semibold mb-2">💡 Real-Time Tracking Active</p>
            <p className="text-green-700 text-sm">
              Your location is being shared with the patient in real-time. Patients can track your
              progress and see your exact arrival time. Your location is never shared publicly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
