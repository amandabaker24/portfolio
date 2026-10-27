/** Stroke-based arrows keep the same appearance across desktop and mobile. */
export function ArrowIcon({ direction = "up-right", className = "" }: { direction?: "up-right" | "down" | "left" | "right"; className?: string }) {
  const rotation = { "up-right": 0, down: 135, left: 225, right: 45 }[direction];
  return (
    <svg className={`arrow-icon ${className}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M5 19 19 5M5 5h14v14" transform={`rotate(${rotation} 12 12)`} />
    </svg>
  );
}
