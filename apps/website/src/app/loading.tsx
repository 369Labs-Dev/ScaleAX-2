// Route-level loading state: a skeleton in the shape of an inner page (dark
// hero, then a heading column beside a ruled list), shown while a page that
// has to be rendered on demand is on its way. The blocks pulse gently; under
// reduced motion they hold still.
export default function Loading() {
  return (
    <div role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Loading page</span>
      <div aria-hidden="true">
        <div className="bg-sx-ink-raised">
          <div className="sx-container flex min-h-[56svh] flex-col justify-end pb-14 pt-32">
            <div className="sx-skeleton h-3 w-40 [--sx-skeleton:rgb(255_255_255/0.16)]" />
            <div className="sx-skeleton mt-7 h-12 w-[min(34rem,86%)] [--sx-skeleton:rgb(255_255_255/0.16)] md:h-16" />
            <div className="sx-skeleton mt-4 h-12 w-[min(24rem,62%)] [--sx-skeleton:rgb(255_255_255/0.16)] md:h-16" />
            <div className="sx-skeleton mt-8 h-4 w-[min(30rem,78%)] [--sx-skeleton:rgb(255_255_255/0.1)]" />
            <div className="mt-9 flex gap-3">
              <div className="sx-skeleton h-[52px] w-48 [--sx-skeleton:rgb(255_255_255/0.16)]" />
              <div className="sx-skeleton h-[52px] w-40 [--sx-skeleton:rgb(255_255_255/0.1)]" />
            </div>
          </div>
        </div>
        <div className="sx-container grid gap-x-14 gap-y-10 py-16 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="sx-skeleton h-3 w-28" />
            <div className="sx-skeleton mt-6 h-9 w-[80%]" />
            <div className="sx-skeleton mt-3 h-9 w-[55%]" />
          </div>
          <div className="grid gap-x-10 border-t border-sx-ink-12 sm:grid-cols-2 lg:col-span-8">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="border-b border-sx-border py-7">
                <div className="sx-skeleton h-3 w-6" />
                <div className="sx-skeleton mt-4 h-5 w-[60%]" />
                <div className="sx-skeleton mt-4 h-3 w-full" />
                <div className="sx-skeleton mt-2 h-3 w-[70%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
