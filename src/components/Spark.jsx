// The NOVUS "spark" mark - a small four-point star used as a
// recurring signature element next to eyebrow labels, active nav
// links, and in the hero background.
// I researched online who to do this path and got help from TWE and
// Tailwind as my sources
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
