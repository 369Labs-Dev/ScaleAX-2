import fs from 'node:fs';
import path from 'node:path';

// Server-only. Photography is supplied after the build: dropping a file into
// public/images/<id>.jpg (or .webp/.avif/.png) is all it takes for the slot
// with that id to show it. Until then the slot renders a labelled placeholder.
const EXTENSIONS = ['jpg', 'jpeg', 'webp', 'avif', 'png'];

/** First existing image among `ids`, as a public URL, or null. */
export function findImage(...ids: string[]): string | null {
  const dir = path.join(process.cwd(), 'public', 'images');
  for (const id of ids) {
    for (const ext of EXTENSIONS) {
      if (fs.existsSync(path.join(dir, `${id}.${ext}`))) return `/images/${id}.${ext}`;
    }
  }
  return null;
}

/** "Finance and accounting" -> "finance-and-accounting". */
export function slugify(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
