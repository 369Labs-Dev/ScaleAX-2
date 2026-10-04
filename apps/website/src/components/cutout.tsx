import type { CSSProperties } from 'react';
import Image from 'next/image';
import { findImage } from '@/lib/images';

// A person or object with its background removed
// (public/images/cutout-<name>.webp). Purely decorative. Served as saved, not
// re-encoded, so the cut edge stays crisp. Renders nothing if the file is
// missing.
export function Cutout({
  name,
  className = '',
  style,
}: {
  name: string;
  className?: string;
  style?: CSSProperties;
}) {
  const src = findImage(`cutout-${name}`);
  if (!src) return null;
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={1100}
      height={2000}
      unoptimized
      loading="lazy"
      className={`w-auto select-none object-contain object-bottom ${className}`}
      style={style}
    />
  );
}
