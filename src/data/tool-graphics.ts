import type { ToolCopy } from './tools/_types';

/**
 * The static chart each tool page shows, shares, and lists for image search.
 * Files are drawn by scripts/og/build-graphics.mjs (`npm run graphics`) into
 * public/images/tools/<slug>-chart.png (1200x630) and <slug>-chart@2x.png.
 */
export interface ToolGraphic {
  src: string;
  src2x: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export function graphicFor(copy: ToolCopy): ToolGraphic | null {
  if (!copy.graphic) return null;
  const slug = copy.path.replace(/^\/tools\//, '').replace(/\/$/, '');
  return {
    src: `/images/tools/${slug}-chart.png`,
    src2x: `/images/tools/${slug}-chart@2x.png`,
    width: 1200,
    height: 630,
    ...copy.graphic,
  };
}
