import type { SVGProps } from 'react';

export function PythonLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <rect width="256" height="256" rx="60" fill="currentColor" />
      <g fill="#FFD43B">
        <path d="M123 32H81C77 32 74 35 74 39V80C74 100 90 111 102 112V39C102 35 119 32 123 32Z" />
        <circle cx="112" cy="166" r="20" />
      </g>
      <g fill="#306998">
        <path d="M133 224H175C179 224 182 221 182 217V176C182 156 166 145 154 144V217C154 221 137 224 133 224Z" />
        <circle cx="144" cy="90" r="20" />
      </g>
    </svg>
  );
}
