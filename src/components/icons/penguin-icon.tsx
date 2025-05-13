import type { SVGProps } from 'react';

export function PenguinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/* Body */}
      <path d="M12 2C8.68629 2 6 4.68629 6 8C6 11.8667 9.16667 14.8333 11 16.1667C11.3333 16.5 12.6667 16.5 13 16.1667C14.8333 14.8333 18 11.8667 18 8C18 4.68629 15.3137 2 12 2Z" fill="hsl(var(--primary))" stroke="hsl(var(--primary-foreground))" strokeWidth="0.5" />
      {/* Belly */}
      <path d="M12 15C10.5 15 9 13 9 10C9 7 12 5 12 5C12 5 15 7 15 10C15 13 13.5 15 12 15Z" fill="hsl(var(--primary-foreground))" stroke="none" />
      {/* Eyes */}
      <circle cx="10" cy="7.5" r="1" fill="hsl(var(--foreground))"  stroke="none"/>
      <circle cx="14" cy="7.5" r="1" fill="hsl(var(--foreground))" stroke="none"/>
      {/* Beak */}
      <path d="M11 9.5L12 11L13 9.5Z" fill="hsl(var(--secondary))" stroke="hsl(var(--secondary))" strokeWidth="0.5"/>
       {/* Feet (simple ovals) */}
      <ellipse cx="9.5" cy="17.5" rx="2.5" ry="1.5" fill="hsl(var(--secondary))" stroke="hsl(var(--secondary))" strokeWidth="0.5"/>
      <ellipse cx="14.5" cy="17.5" rx="2.5" ry="1.5" fill="hsl(var(--secondary))" stroke="hsl(var(--secondary))" strokeWidth="0.5"/>
    </svg>
  );
}
