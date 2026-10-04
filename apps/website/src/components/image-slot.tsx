import Image from 'next/image';

export interface ImageSlotProps {
  /** File name (without extension) expected in public/images. */
  id: string;
  /** Resolved URL from lib/images `findImage`, or null while the file is missing. */
  src: string | null;
  alt: string;
  /** Suggested export size, shown on the placeholder. */
  width: number;
  height: number;
  /** Dark slots sit under white copy; light slots sit on the white page. */
  tone?: 'dark' | 'light';
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Oversize the media so components/motion/scroll-fx can drift it on scroll. */
  parallax?: boolean;
  /** Sets data-placeholder-art while the slot is empty. */
  kind?: string;
  labelPosition?: 'top' | 'bottom';
  background?: string;
}

// A media frame. Presentational, so it works in server and client components;
// server callers usually go through <Media>, which resolves `src` itself.
export function ImageSlot({
  id,
  src,
  alt,
  width,
  height,
  tone = 'dark',
  className = '',
  sizes = '100vw',
  priority = false,
  parallax = false,
  kind = 'image',
  labelPosition = 'bottom',
  background,
}: ImageSlotProps) {
  const empty = src === null;
  return (
    <div
      className={`sx-slot ${className}`}
      data-tone={tone}
      data-image-slot={id}
      data-placeholder-art={empty ? kind : undefined}
      style={empty && background ? { background } : undefined}
    >
      <div
        className={parallax ? 'absolute inset-x-0 -inset-y-[12%]' : 'absolute inset-0'}
        data-parallax={parallax ? '' : undefined}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        ) : (
          <svg
            className="sx-slot-cross"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              x1="0"
              y1="0"
              x2="100"
              y2="100"
              stroke="currentColor"
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1="100"
              y1="0"
              x2="0"
              y2="100"
              stroke="currentColor"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        )}
      </div>
      {empty && (
        <span className="sx-slot-label" data-pos={labelPosition} aria-hidden="true">
          Image: {id}.jpg
          <br />
          {width} &times; {height}
        </span>
      )}
    </div>
  );
}
