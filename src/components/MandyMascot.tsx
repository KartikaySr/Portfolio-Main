export default function MandyMascot({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22 17 18 9M42 17l5-9" stroke="#23520B" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="17.5" cy="8" r="3.5" fill="#F4F1EC" />
      <circle cx="47.5" cy="7" r="3.5" fill="#F4F1EC" />
      <path d="M18 47c1.6-7.2 7-10.8 14-10.8S44.4 39.8 46 47l5.7 6.2H12.3L18 47Z" fill="#397E12" stroke="#23520B" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="m26 39 6 6 6-6" stroke="#D2FF79" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 27.5c0-9.1 8.1-15.2 19.5-15.2s19.5 6.1 19.5 15.2v5.2c0 9.5-8.8 16.1-19.5 16.1S12.5 42.2 12.5 32.7v-5.2Z" fill="#B9FF4A" stroke="#23520B" strokeWidth="2.5" />
      <path d="M13.3 28.4 7.8 25.7v9.6l6.2-1.9M50.7 28.4l5.5-2.7v9.6L50 33.4" fill="#95DF36" stroke="#23520B" strokeWidth="2.2" strokeLinejoin="round" />
      <ellipse cx="24.2" cy="30.1" rx="4.1" ry="6" fill="#10200C" />
      <ellipse cx="39.8" cy="30.1" rx="4.1" ry="6" fill="#10200C" />
      <circle cx="25.3" cy="28.1" r="1.25" fill="white" />
      <circle cx="40.9" cy="28.1" r="1.25" fill="white" />
      <ellipse cx="18.5" cy="36.3" rx="2.7" ry="1.5" fill="#E7A69B" opacity=".7" />
      <ellipse cx="45.5" cy="36.3" rx="2.7" ry="1.5" fill="#E7A69B" opacity=".7" />
      <path d="M29 38.1c1.5 1.8 4.5 1.8 6 0" stroke="#23520B" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 44.5c3.5 0 5.5 2.2 5.5 5.4" stroke="#23520B" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="55.5" cy="51" r="2.2" fill="#F4F1EC" />
    </svg>
  );
}
