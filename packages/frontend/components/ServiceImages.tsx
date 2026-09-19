// SVG Illustrations for each service type
export const AmbulatoryImage = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect width="200" height="200" fill="#F0F8FF" rx="12" />
    {/* Person walking */}
    <circle cx="100" cy="50" r="12" fill="#003366" />
    <rect x="94" y="65" width="12" height="35" fill="#003366" />
    <rect x="76" y="70" width="48" height="8" fill="#003366" />
    {/* Legs */}
    <line x1="94" y1="100" x2="80" y2="140" stroke="#003366" strokeWidth="6" />
    <line x1="106" y1="100" x2="120" y2="140" stroke="#003366" strokeWidth="6" />
  </svg>
);

export const WheelchairImage = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect width="200" height="200" fill="#F0F8FF" rx="12" />
    {/* Wheelchair */}
    <circle cx="70" cy="130" r="25" fill="none" stroke="#003366" strokeWidth="4" />
    <circle cx="130" cy="130" r="25" fill="none" stroke="#003366" strokeWidth="4" />
    {/* Seat */}
    <rect x="70" y="90" width="60" height="30" fill="#003366" />
    {/* Back support */}
    <rect x="75" y="50" width="8" height="45" fill="#003366" />
    <rect x="117" y="50" width="8" height="45" fill="#003366" />
    {/* Armrests */}
    <line x1="65" y1="95" x2="40" y2="95" stroke="#003366" strokeWidth="4" />
    <line x1="135" y1="95" x2="160" y2="95" stroke="#003366" strokeWidth="4" />
  </svg>
);

export const StretcherImage = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect width="200" height="200" fill="#F0F8FF" rx="12" />
    {/* Stretcher/Gurney */}
    {/* Legs */}
    <line x1="50" y1="130" x2="60" y2="160" stroke="#003366" strokeWidth="4" />
    <line x1="150" y1="130" x2="140" y2="160" stroke="#003366" strokeWidth="4" />
    {/* Base */}
    <rect x="50" y="120" width="100" height="15" fill="#003366" rx="2" />
    {/* Person on stretcher */}
    <rect x="55" y="85" width="90" height="35" fill="#D4A574" opacity="0.7" rx="4" />
    {/* Head */}
    <circle cx="100" cy="75" r="10" fill="#003366" />
  </svg>
);

export const CompanionImage = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect width="200" height="200" fill="#F0F8FF" rx="12" />
    {/* Two people */}
    {/* Person 1 */}
    <circle cx="75" cy="50" r="12" fill="#003366" />
    <rect x="69" y="65" width="12" height="30" fill="#003366" />
    <rect x="55" y="70" width="40" height="8" fill="#003366" />
    <line x1="69" y1="95" x2="60" y2="130" stroke="#003366" strokeWidth="5" />
    <line x1="81" y1="95" x2="90" y2="130" stroke="#003366" strokeWidth="5" />
    {/* Person 2 */}
    <circle cx="125" cy="55" r="12" fill="#D4A574" />
    <rect x="119" y="70" width="12" height="28" fill="#D4A574" />
    <rect x="105" y="75" width="40" height="8" fill="#D4A574" />
    <line x1="119" y1="98" x2="110" y2="130" stroke="#D4A574" strokeWidth="5" />
    <line x1="131" y1="98" x2="140" y2="130" stroke="#D4A574" strokeWidth="5" />
  </svg>
);

export const AppointmentImage = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect width="200" height="200" fill="#F0F8FF" rx="12" />
    {/* Calendar */}
    <rect x="45" y="50" width="110" height="100" fill="none" stroke="#003366" strokeWidth="4" rx="4" />
    {/* Calendar header */}
    <rect x="45" y="50" width="110" height="20" fill="#003366" rx="4" />
    {/* Grid lines */}
    <line x1="45" y1="75" x2="155" y2="75" stroke="#003366" strokeWidth="2" />
    <line x1="45" y1="100" x2="155" y2="100" stroke="#003366" strokeWidth="2" />
    {/* Days marker */}
    <circle cx="75" cy="115" r="8" fill="#D4A574" />
    <circle cx="105" cy="130" r="8" fill="#D4A574" />
  </svg>
);

export const GPSTrackingImage = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect width="200" height="200" fill="#F0F8FF" rx="12" />
    {/* Map background */}
    <rect x="30" y="40" width="140" height="120" fill="#E8F5E9" stroke="#003366" strokeWidth="2" rx="4" />
    {/* Roads/paths */}
    <line x1="50" y1="60" x2="150" y2="60" stroke="#D4A574" strokeWidth="2" />
    <line x1="100" y1="40" x2="100" y2="160" stroke="#D4A574" strokeWidth="2" />
    {/* Location pin */}
    <path d="M 100 80 C 90 80 82 88 82 98 C 82 115 100 135 100 135 C 100 135 118 115 118 98 C 118 88 110 80 100 80 Z" fill="#FF5252" />
    <circle cx="100" cy="98" r="6" fill="white" />
    {/* Tracking circles */}
    <circle cx="100" cy="98" r="20" fill="none" stroke="#FF5252" strokeWidth="1" opacity="0.5" />
    <circle cx="100" cy="98" r="30" fill="none" stroke="#FF5252" strokeWidth="1" opacity="0.3" />
  </svg>
);
