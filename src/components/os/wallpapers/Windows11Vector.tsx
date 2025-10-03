import React from 'react';

/**
 * Windows11Vector
 *
 * A scalable, sharp Windows 11-inspired wallpaper rendered as SVG.
 * It uses layered gradient "ribbons" with blur to emulate the Windows 11 bloom.
 * This scales cleanly at any resolution and fits the container.
 */
const Windows11Vector: React.FC<{ className?: string; style?: React.CSSProperties }>=({ className = '', style = {} }) => {
  return (
    <div className={className} style={{ width: '100%', height: '100%', ...style }}>
      <svg
        viewBox="0 0 1920 1080"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Windows 11 abstract bloom wallpaper"
      >
        <defs>
          {/* Background gradient (deep blue) */}
          <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0a1647" />
            <stop offset="50%" stopColor="#0b2a78" />
            <stop offset="100%" stopColor="#061438" />
          </linearGradient>

          {/* Ribbon gradients */}
          <linearGradient id="ribbon1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2aa7ff" />
            <stop offset="40%" stopColor="#1389ff" />
            <stop offset="100%" stopColor="#0b62f0" />
          </linearGradient>
          <linearGradient id="ribbon2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6fd7ff" />
            <stop offset="60%" stopColor="#2aa7ff" />
            <stop offset="100%" stopColor="#1465ff" />
          </linearGradient>
          <linearGradient id="ribbon3" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#8fe3ff" />
            <stop offset="55%" stopColor="#43b9ff" />
            <stop offset="100%" stopColor="#1a7cff" />
          </linearGradient>

          {/* Soft bloom glows */}
          <radialGradient id="glow1" cx="35%" cy="40%" r="40%">
            <stop offset="0%" stopColor="#5fb9ff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#2b5bff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glow2" cx="70%" cy="60%" r="45%">
            <stop offset="0%" stopColor="#bfe9ff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#2b5bff" stopOpacity="0" />
          </radialGradient>

          {/* Gaussian blur filters for depth */}
          <filter id="blurStrong" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="32" />
          </filter>
          <filter id="blurSoft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="12" />
          </filter>

          {/* Subtle noise overlay for natural texture */}
          <filter id="noise" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" result="turb" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0 0.025 0" />
            </feComponentTransfer>
          </filter>
        </defs>

        {/* Background */}
        <rect width="100%" height="100%" fill="url(#bgGrad)" />

        {/* Large soft glows behind ribbons */}
        <circle cx="640" cy="420" r="520" fill="url(#glow1)" filter="url(#blurStrong)" />
        <circle cx="1380" cy="760" r="600" fill="url(#glow2)" filter="url(#blurStrong)" />

        {/* Ribbons (layered paths) */}
        <g opacity="0.9">
          <path
            d="M -200,720 C 240,360 520,340 900,520 C 1220,680 1480,660 2100,340 L 2100,1200 L -200,1200 Z"
            fill="url(#ribbon1)"
            filter="url(#blurSoft)"
          />
          <path
            d="M -100,860 C 300,620 760,520 1120,600 C 1480,680 1620,720 2000,540 L 2000,1200 L -100,1200 Z"
            fill="url(#ribbon2)"
            opacity="0.9"
          />
          <path
            d="M -200,1020 C 200,920 700,760 1200,820 C 1500,860 1800,900 2100,800 L 2100,1200 L -200,1200 Z"
            fill="url(#ribbon3)"
            opacity="0.85"
          />
        </g>

        {/* Fine highlight sweep */}
        <path
          d="M -100,700 C 300,420 760,420 1120,540 C 1480,660 1620,700 2000,520"
          stroke="#d6f2ff"
          strokeOpacity="0.14"
          strokeWidth="60"
          fill="none"
          filter="url(#blurSoft)"
        />

        {/* Subtle vignette */}
        <rect width="100%" height="100%" fill="#000" opacity="0.18" />

        {/* Grain overlay */}
        <rect width="100%" height="100%" filter="url(#noise)" opacity="0.18" />
      </svg>
    </div>
  );
};

export default Windows11Vector;