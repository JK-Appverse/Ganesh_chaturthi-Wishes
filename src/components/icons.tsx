import type { SVGProps } from "react";

// The GaneshaIcon is no longer used, but kept here for potential future use.
export function GaneshaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 10.89A5.4 5.4 0 0 1 12 6a5.4 5.4 0 0 1 4 9.8" />
      <path d="M12 2v4" />
      <path d="M18.26 18.26A5.4 5.4 0 0 1 12 22a5.4 5.4 0 0 1-6.26-3.74" />
      <path d="M4 16.29A5.4 5.4 0 0 1 4 12a5.4 5.4 0 0 1 1.76-4" />
      <path d="M20 12a5.4 5.4 0 0 1-1.76 4" />
      <path d="m14 13-1-3a.5.5 0 0 0-1 0l-1 3" />
      <path d="m18 13-1-3a.5.5 0 0 0-1 0l-1 3" />
      <path d="M12 18.2a4 4 0 0 0 4-4" />
    </svg>
  );
}
