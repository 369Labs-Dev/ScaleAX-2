# Website images

Every photograph on the site is an image slot. Drop a file with the exact name below into
`apps/website/public/images/` and the slot shows it on the next build (or the next request in
`pnpm dev`). Until a file exists, the slot shows a labelled placeholder with the file name and size.
No code changes are needed.

- Format: `.jpg` preferred. `.webp`, `.avif` and `.png` also work.
- Sizes are the suggested export size. Images are cropped to fill their frame (`object-fit: cover`),
  so keep the subject away from the edges.
- White headlines sit on the hero, claim, model, page-hero and closing images. A dark scrim is
  applied automatically, but keep the lower left of those photographs calm and uncluttered.

## Homepage

| File                                                                                                                                            | Size        | Where                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------- |
| `hero-overview.jpg`                                                                                                                             | 2400 x 1500 | Hero slide 1, "Build your Global Capability Centre in India."                                       |
| `hero-plan.jpg`                                                                                                                                 | 2400 x 1500 | Hero slide 2, Plan                                                                                  |
| `hero-build.jpg`                                                                                                                                | 2400 x 1500 | Hero slide 3, Build                                                                                 |
| `hero-run.jpg`                                                                                                                                  | 2400 x 1500 | Hero slide 4, Run                                                                                   |
| `hero-grow.jpg`                                                                                                                                 | 2400 x 1500 | Hero slide 5, Grow                                                                                  |
| `claim-01.jpg`                                                                                                                                  | 2400 x 1350 | Full-bleed band, "1,500 centres already run from India."                                            |
| `pillar-advisory.jpg`, `pillar-enablement.jpg`, `pillar-talent.jpg`, `pillar-workspace.jpg`, `pillar-delivery.jpg`, `pillar-transformation.jpg` | 1200 x 1500 | Portrait image beside the six pillars; changes with the row under the pointer                       |
| `model-assisted.jpg`, `model-bot.jpg`, `model-managed-seats.jpg`, `model-eor.jpg`                                                               | 1600 x 1200 | The four engagement-model panels in the sideways-scrolling row                                      |
| `india-01.jpg`                                                                                                                                  | 1200 x 1500 | Portrait image beside "Why India is the default answer."                                            |
| `insight-<article-slug>.jpg`                                                                                                                    | 1600 x 1000 | Article covers (home, /insights and the article page). `insight-default.jpg` fills any missing one. |
| `cta-01.jpg`                                                                                                                                    | 2400 x 1350 | Closing band, "Don't just compete. Excel globally."                                                 |

Article slugs are listed in `src/lib/insights-data.ts`.

## Inner pages

Each page with a photographic hero looks for `page-<name>.jpg` (2400 x 1350), where `<name>` is the
last breadcrumb label in lower case with dashes. If that file is missing it uses `page-default.jpg`,
so a single photograph can cover every inner page until each has its own.

The placeholder on each page prints the exact file name it is waiting for, for example
`page-plan.jpg` on /how-we-work/plan.

## Cutouts on inner pages

Cutouts are people or objects with the background removed, saved as `cutout-<name>.webp` (or .png)
with a transparent background, 2000 px tall, cropped tight to the subject. They are served exactly
as saved, so export them sharp. A subject cropped at the waist or knees should be cut flat along
the bottom, because that edge sits on the seam between two sections.

They are used in two places, both as one large figure on a tinted band:

- In the numbers band, mid-page: `<InNumbers figure="towers" ...>` stands the figure on the left of
  the band, rising above it into the section before, with the four numbers beside it.
- In the closing band: `<ClosingCta figure="man-blazer" ...>` stands the figure on the right of the
  band, rising above it into the section before.

Current set: `woman-seated`, `woman-tablet`, `woman-walking`, `woman-laptop`, `man-blazer`,
`man-suit`, `man-profile`, `man-phone`, `man-laptop`, `chair`, `plant`, `towers`, `tower`. If a file
is missing nothing is shown.
