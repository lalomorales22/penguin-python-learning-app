import type { SVGProps } from 'react';

export function TurtleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m14 12-4-4" />
      <path d="M14 12h4.5" />
      <path d="M3.52 7.89A9.94 9.94 0 0 1 12 5c2.5 0 4.8.93 6.59 2.41" />
      <path d="m12 19-1.4-2.8" />
      <path d="M3.59 16.41A9.94 9.94 0 0 1 5 12a9.97 9.97 0 0 1 4.3-1.43" />
      <path d="M20.48 7.89A9.94 9.94 0 0 1 19 12c-1.2 0-2.32-.22-3.38-.62" />
      <path d="M19.41 16.41A9.94 9.94 0 0 1 12 19a9.97 9.97 0 0 1-7.7-4.3" />
    </svg>
  );
}
