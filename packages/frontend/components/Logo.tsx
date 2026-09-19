export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeMap = {
    sm: 40,
    md: 60,
    lg: 80,
  };

  const dimension = sizeMap[size];

  return (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
    >
      {/* Background circle */}
      <circle cx="40" cy="40" r="38" fill="none" stroke="#003366" strokeWidth="2" />

      {/* Ambulance body */}
      <rect x="12" y="35" width="56" height="24" rx="4" fill="#003366" stroke="#003366" strokeWidth="1.5" />

      {/* Ambulance back section (darker) */}
      <rect x="40" y="35" width="28" height="24" rx="4" fill="#D4A574" opacity="0.8" stroke="#D4A574" strokeWidth="1.5" />

      {/* Ambulance cabin */}
      <rect x="12" y="28" width="20" height="12" rx="2" fill="#003366" stroke="#003366" strokeWidth="1.5" />

      {/* Front window */}
      <rect x="14" y="30" width="8" height="8" rx="1" fill="#87CEEB" stroke="#87CEEB" strokeWidth="0.5" />

      {/* Medical cross on back */}
      <g transform="translate(54, 47)">
        {/* Vertical line of cross */}
        <line x1="0" y1="-3" x2="0" y2="3" stroke="#003366" strokeWidth="1.5" strokeLinecap="round" />
        {/* Horizontal line of cross */}
        <line x1="-3" y1="0" x2="3" y2="0" stroke="#003366" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Front wheels */}
      <circle cx="22" cy="60" r="5" fill="none" stroke="#003366" strokeWidth="1.5" />
      <circle cx="22" cy="60" r="3.5" fill="none" stroke="#D4A574" strokeWidth="1" />

      {/* Back wheels */}
      <circle cx="56" cy="60" r="5" fill="none" stroke="#003366" strokeWidth="1.5" />
      <circle cx="56" cy="60" r="3.5" fill="none" stroke="#D4A574" strokeWidth="1" />
      <circle cx="64" cy="60" r="5" fill="none" stroke="#003366" strokeWidth="1.5" />
      <circle cx="64" cy="60" r="3.5" fill="none" stroke="#D4A574" strokeWidth="1" />

      {/* Light on top */}
      <circle cx="32" cy="30" r="2.5" fill="#D4A574" stroke="#D4A574" strokeWidth="0.5" />

      {/* Heartbeat line under vehicle */}
      <path
        d="M 15 68 L 20 68 L 22 65 L 24 68 L 28 68"
        stroke="#D4A574"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
