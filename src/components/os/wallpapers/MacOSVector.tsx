import React from 'react';

/**
 * MacOSVector
 *
 * A scalable, sharp macOS Big Sur/Monterey-inspired abstract wallpaper rendered as SVG.
 * Soft colorful gradients with layered glass-like curves and subtle grain for a natural look.
 */
const MacOSVector: React.FC<{ className?: string; style?: React.CSSProperties }>=({ className = '', style = {} }) => {
  return (
    <div className={className} style={{ width: '100%', height: '100%', ...style }}>
      <svg
        viewBox="0 0 1920 1080"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="macOS abstract gradient wallpaper"
      >
        <defs>
          {/* Background sky gradient */}
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#041d16" />
            <stop offset="40%" stopColor="#0a2f24" />
            <stop offset="75%" stopColor="#0e4030" />
            <stop offset="100%" stopColor="#09271d" />
          </linearGradient>

          {/* Ocean gradient */}
          <linearGradient id="ocean" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00b37a" />
            <stop offset="60%" stopColor="#009e73" />
            <stop offset="100%" stopColor="#0047d6" />
          </linearGradient>

          {/* Magenta/ruby gradient */}
          <linearGradient id="ruby" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff4bb1" />
            <stop offset="60%" stopColor="#ff2a7a" />
            <stop offset="100%" stopColor="#d21d6d" />
          </linearGradient>

          {/* Lime/teal gradient */}
          <linearGradient id="mint" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#49ffda" />
            <stop offset="60%" stopColor="#33e1ff" />
            <stop offset="100%" stopColor="#00b9ff" />
          </linearGradient>

          {/* Subtle white highlight */}
          <linearGradient id="highlight" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Blurs */}
          <filter id="blurStrong" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="24" />
          </filter>
          <filter id="blurSoft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="12" />
          </filter>

          {/* Grain */}
          <filter id="grain" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0 0.02 0" />
            </feComponentTransfer>
          </filter>
        </defs>

        {/* Background */}
        <rect width="100%" height="100%" fill="url(#sky)" />

        {/* Soft color glows */}
        <circle cx="400" cy="200" r="380" fill="#ff8cc4" opacity="0.5" filter="url(#blurStrong)" />
        <circle cx="1580" cy="260" r="420" fill="#55d8ff" opacity="0.45" filter="url(#blurStrong)" />
        <circle cx="1280" cy="820" r="560" fill="#3e7dff" opacity="0.35" filter="url(#blurStrong)" />

        {/* Oceanic curve */}
        <path
          d="M -200,760 C 220,600 460,560 860,660 C 1240,760 1460,740 2100,580 L 2100,1200 L -200,1200 Z"
          fill="url(#ocean)"
          opacity="0.95"
          filter="url(#blurSoft)"
        />

        {/* Ruby curve */}
        <path
          d="M -180,880 C 280,720 780,660 1180,720 C 1500,770 1760,800 2100,720 L 2100,1200 L -180,1200 Z"
          fill="url(#ruby)"
          opacity="0.85"
        />

        {/* Mint curve */}
        <path
          d="M -160,980 C 200,900 720,820 1200,860 C 1540,890 1880,940 2100,900 L 2100,1200 L -160,1200 Z"
          fill="url(#mint)"
          opacity="0.75"
        />

        {/* White highlight sweep */}
        <path
          d="M -120,790 C 240,600 680,600 1080,700 C 1460,790 1700,820 2000,760"
          stroke="url(#highlight)"
          strokeWidth="60"
          strokeOpacity="0.25"
          fill="none"
          filter="url(#blurSoft)"
        />

        {/* Vignette */}
        <rect width="100%" height="100%" fill="#000" opacity="0.12" />

        {/* Grain */}
        <rect width="100%" height="100%" filter="url(#grain)" opacity="0.15" />
      </svg>
    </div>
  );
};

export default MacOSVector;