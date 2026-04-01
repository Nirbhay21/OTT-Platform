import React from "react";

const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={props.className}
    {...props}
  >
    <defs>
      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--color-brand-primary)" />
        <stop offset="100%" stopColor="var(--color-brand-secondary)" />
      </linearGradient>
      {/* Glossy overlay for high-end look */}
      <linearGradient id="logo-gloss" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="0.3" />
        <stop offset="50%" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Outer Rounded Container - Matching logo.png shape */}
    <rect
      x="24"
      y="24"
      width="464"
      height="464"
      rx="80"
      fill="url(#logo-gradient)"
    />

    {/* Film Strip Holes Left */}
    <rect
      x="54"
      y="80"
      width="50"
      height="70"
      rx="10"
      fill="white"
      fillOpacity="0.8"
    />
    <rect
      x="54"
      y="221"
      width="50"
      height="70"
      rx="10"
      fill="white"
      fillOpacity="0.8"
    />
    <rect
      x="54"
      y="362"
      width="50"
      height="70"
      rx="10"
      fill="white"
      fillOpacity="0.8"
    />

    {/* Film Strip Holes Right */}
    <rect
      x="408"
      y="80"
      width="50"
      height="70"
      rx="10"
      fill="white"
      fillOpacity="0.8"
    />
    <rect
      x="408"
      y="221"
      width="50"
      height="70"
      rx="10"
      fill="white"
      fillOpacity="0.8"
    />
    <rect
      x="408"
      y="362"
      width="50"
      height="70"
      rx="10"
      fill="white"
      fillOpacity="0.8"
    />

    {/* Central Play Button Triangle - Perfect equilateral with soft edges */}
    <path
      d="M190 150 L380 256 L190 362 Z"
      fill="white"
      stroke="white"
      strokeWidth="10"
      strokeLinejoin="round"
    />

    {/* Subtle Inner Shadow for Depth */}
    <rect
      x="24"
      y="24"
      width="464"
      height="464"
      rx="80"
      fill="url(#logo-gloss)"
      pointerEvents="none"
    />
  </svg>
);

export default LogoIcon;
