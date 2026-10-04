import { findImage } from '@/lib/images';
import { ImageSlot, type ImageSlotProps } from './image-slot';

// Server component: an ImageSlot that looks its own file up in public/images.
// `fallback` ids are tried in order when the slot's own file does not exist.
export function Media({
  fallback = [],
  ...props
}: Omit<ImageSlotProps, 'src'> & { fallback?: string[] }) {
  return <ImageSlot {...props} src={findImage(props.id, ...fallback)} />;
}
