import type { SVGProps } from 'react';

export function PenguinLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {/* Body - Bright Blue */}
      <ellipse cx="50" cy="60" rx="35" ry="38" fill="hsl(var(--primary))" />
      {/* Belly - White */}
      <ellipse cx="50" cy="65" rx="25" ry="30" fill="white" />
      {/* Left Eye */}
      <circle cx="40" cy="45" r="5" fill="hsl(var(--foreground))" />
      <circle cx="41" cy="44" r="1.5" fill="white" /> {/* Eye highlight */}
      {/* Right Eye */}
      <circle cx="60" cy="45" r="5" fill="hsl(var(--foreground))" />
      <circle cx="61" cy="44" r="1.5" fill="white" /> {/* Eye highlight */}
      {/* Beak - Orange */}
      <path d="M45 55 Q50 65 55 55 Q50 60 45 55 Z" fill="hsl(var(--secondary))" />
      {/* Left Foot - Orange */}
      <ellipse cx="35" cy="95" rx="10" ry="5" fill="hsl(var(--secondary))" transform="rotate(-15 35 95)" />
      {/* Right Foot - Orange */}
      <ellipse cx="65" cy="95" rx="10" ry="5" fill="hsl(var(--secondary))" transform="rotate(15 65 95)" />
       {/* Optional: Tuft of hair - can match primary or be darker */}
      <path d="M48 22 Q50 15 52 22 Q50 20 48 22Z" fill="hsl(var(--primary))" />
    </svg>
  );
}
