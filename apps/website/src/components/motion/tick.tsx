// W7 — a value that settles in whenever it changes (Cost Calculator and
// Location Finder results). Re-keying remounts the span, which replays the
// short transform/opacity `sx-tick` keyframe; reduced motion collapses it.
export function Tick({ value, className }: { value: string; className?: string }) {
  return (
    <span key={value} className={`sx-tick ${className ?? ''}`}>
      {value}
    </span>
  );
}
