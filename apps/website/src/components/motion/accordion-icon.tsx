// Plus that turns into a minus (the vertical bar rotates flat). Transform only.
export function AccordionIcon({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-sx transition-[background-color,box-shadow] duration-500 ${
        open
          ? 'bg-sx-ink-06 shadow-[inset_0_0_0_1.5px_var(--sx-ink)]'
          : 'shadow-[inset_0_0_0_1.5px_var(--sx-ink-20)] group-hover:shadow-[inset_0_0_0_1.5px_var(--sx-ink)]'
      }`}
    >
      <span className="absolute h-[1.5px] w-3 bg-sx-ink" />
      <span
        className={`absolute h-3 w-[1.5px] bg-sx-ink transition-[rotate] duration-500 ease-sx-out ${
          open ? 'rotate-90' : ''
        }`}
      />
    </span>
  );
}
