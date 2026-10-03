// W7 — plus that morphs into a minus (the vertical bar rotates flat) with
// the shared ease, instead of swapping two icons. Transform-only.
export function AccordionIcon({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color] duration-300 ${
        open ? 'border-sx-ink bg-sx-ink' : 'border-sx-border bg-white group-hover:border-sx-ink'
      }`}
    >
      <span
        className={`absolute h-[1.5px] w-3 rounded-full transition-colors duration-300 ${
          open ? 'bg-white' : 'bg-sx-ink'
        }`}
      />
      <span
        className={`absolute h-3 w-[1.5px] rounded-full transition-[rotate,background-color] duration-300 ease-sx-out ${
          open ? 'rotate-90 bg-white' : 'bg-sx-ink'
        }`}
      />
    </span>
  );
}
