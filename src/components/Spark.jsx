// Spark.jsx
// This component creates the small four-point star
// used throughout the NOVUS Market website.

export default function Spark({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`inline-block ${className}`}
      aria-hidden="true">
      <path
        d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
        fill="var(--spark)"
      />
    </svg>
  );
}
