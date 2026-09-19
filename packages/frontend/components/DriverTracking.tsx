import { useEffect, useState } from 'react';
import { MapPin, Clock, AlertCircle } from 'lucide-react';

interface DriverLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface DriverTrackingProps {
  rideId: string;
  driverId?: string;
  pickupAddress: string;
  estimatedArrival?: string;
}

export default function DriverTracking({
  rideId,
  driverId,
  pickupAddress,
  estimatedArrival,
}: DriverTrackingProps) {
  const [driverLocation, setDriverLocation] = useState<DriverLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isApproaching, setIsApproaching] = useState(false);

  // Poll for driver location updates
  useEffect(() => {
    let pollInterval: NodeJS.Timeout;

    const pollLocation = async () => {
      try {
        const res = await fetch(`/api/rides/${rideId}/driver-location`);
        if (res.ok) {
          const data = await res.json();
          setDriverLocation(data.location);
          setLastUpdate(new Date());
          setLoading(false);

          // Check if driver is approaching (within 5 min)
          if (data.location?.eta && data.location.eta < 5) {
            setIsApproaching(true);
          }
        }
      } catch (err) {
        console.error('Failed to fetch driver location:', err);
        setError('Could not load driver location');
        setLoading(false);
      }
    };

    // Initial fetch
    pollLocation();

    // Poll every 15 seconds for updates
    pollInterval = setInterval(pollLocation, 15000);

    return () => clearInterval(pollInterval);
  }, [rideId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4" style={{ color: '#003366' }}>
        🚐 Driver Tracking
      </h3>

      {isApproaching && (
        <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 rounded">
          <p className="text-green-800 font-semibold flex items-center gap-2">
            ✓ Driver arriving soon! Estimated 4-5 minutes away
          </p>
        </div>
      )}

      {loading && !driverLocation && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#D4A574' }}></div>
          <p className="text-gray-600 mt-3">Locating your driver...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded mb-4">
          <p className="text-red-800 flex items-center gap-2">
            <AlertCircle size={18} /> {error}
          </p>
        </div>
      )}

      {driverLocation && (
        <div className="space-y-4">
          {/* Location Display */}
          <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-3 mb-3">
              <MapPin size={20} style={{ color: '#D4A574' }} className="mt-1" />
              <div>
                <p className="text-sm text-gray-600">Current Location</p>
                <p className="font-mono text-sm font-semibold" style={{ color: '#003366' }}>
                  {driverLocation.latitude.toFixed(6)}, {driverLocation.longitude.toFixed(6)}
                </p>
                <p className="text-xs text-gray-500 mt-1">Accuracy: ±{Math.round(driverLocation.accuracy)}m</p>
              </div>
            </div>
          </div>

          {/* ETA */}
          {estimatedArrival && (
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border-l-4" style={{ borderColor: '#D4A574' }}>
              <Clock size={20} style={{ color: '#D4A574' }} />
              <div>
                <p className="text-sm text-gray-600">Estimated Arrival</p>
                <p className="font-semibold" style={{ color: '#003366' }}>
                  {new Date(estimatedArrival).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          )}

          {/* Last Update */}
          {lastUpdate && (
            <p className="text-xs text-gray-500 text-center">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </p>
          )}

          {/* Map Embed (Static Map) */}
          <div className="mt-4 bg-gray-200 rounded-lg overflow-hidden" style={{ height: '300px' }}>
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <MapPin size={40} className="mx-auto mb-2 text-gray-400" />
                <p className="text-gray-600 text-sm">Map view coming soon</p>
                <p className="text-gray-500 text-xs mt-1">
                  View on{' '}
                  <a
                    href={`https://www.google.com/maps/search/${driverLocation.latitude},${driverLocation.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Google Maps
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
