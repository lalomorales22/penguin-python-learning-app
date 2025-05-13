// src/components/icons/penguin-icon.tsx
import type { SVGProps } from 'react';

export const PenguinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    fill="currentColor"
    {...props}
  >
    <path d="M50 10C30 10 15 30 15 50C15 75 30 90 50 90C70 90 85 75 85 50C85 30 70 10 50 10Z" fill="hsl(var(--foreground))" />
    <path d="M50 20C35 20 25 35 25 50C25 70 35 80 50 80C65 80 75 70 75 50C75 35 65 20 50 20Z" fill="white" />
    <circle cx="40" cy="45" r="5" fill="hsl(var(--foreground))" />
    <circle cx="60" cy="45" r="5" fill="hsl(var(--foreground))" />
    <polygon points="45,60 55,60 50,70" fill="hsl(var(--secondary))" /> {/* Beak */}
    {/* Simple Flippers */}
    <ellipse cx="20" cy="60" rx="10" ry="20" transform="rotate(-30 20 60)" fill="hsl(var(--foreground))" />
    <ellipse cx="80" cy="60" rx="10" ry="20" transform="rotate(30 80 60)" fill="hsl(var(--foreground))" />
  </svg>
);
