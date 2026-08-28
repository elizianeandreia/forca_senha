const paths = {
  shield: (
    <>
      <path d="M12 3 5 6.2v5.2c0 4.5 2.8 7.7 7 9.6 4.2-1.9 7-5.1 7-9.6V6.2L12 3Z" />
      <path d="m9.4 12 1.7 1.7 3.7-4" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <path d="M12 14v2" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  eyeOff: (
    <>
      <path d="m3 3 18 18" />
      <path d="M10.6 6.2A9.7 9.7 0 0 1 12 6c6 0 9.5 6 9.5 6a16 16 0 0 1-2.2 2.9" />
      <path d="M6.2 6.2C3.8 8 2.5 12 2.5 12s3.5 6 9.5 6c1.8 0 3.3-.5 4.6-1.2" />
      <path d="M9.9 9.9A3 3 0 0 0 14.1 14.1" />
    </>
  ),
  x: <path d="m6 6 12 12M18 6 6 18" />,
  check: <path d="m5 12 4 4L19 6" />,
  arrow: <path d="m9 18 6-6-6-6" />,
  fingerprint: (
    <>
      <path d="M7.3 8.4A6 6 0 0 1 18 12c0 2.4-.5 4.6-1.5 6.5" />
      <path d="M5.2 12a6.8 6.8 0 0 1 .6-2.8" />
      <path d="M8 12a4 4 0 0 1 8 0c0 3.2-.7 6-2.1 8.3" />
      <path d="M10.5 12a1.5 1.5 0 0 1 3 0c0 3.3-.7 6-2.2 8" />
      <path d="M7.5 15.5c.2 1.7.7 3.2 1.4 4.5" />
    </>
  ),
  activity: (
    <>
      <path d="M3 12h4l2-5 4 10 2-5h6" />
    </>
  ),
  terminal: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="m7 9 3 3-3 3M13 15h4" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
}

export default function Icon({ name, size = 20, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
