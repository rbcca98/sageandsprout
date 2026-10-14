import type { APIRoute } from 'astro';
import { graphicFor } from '../data/tool-graphics';
import t0 from '../data/tools/due-date-calculator';
import t1 from '../data/tools/how-many-weeks-pregnant';
import t2 from '../data/tools/ovulation-fertility-window';
import t3 from '../data/tools/pregnancy-weight-gain';
import t4 from '../data/tools/maternity-leave-planner';
import t5 from '../data/tools/baby-growth-percentile';
import t6 from '../data/tools/feeding-formula-amount';
import t7 from '../data/tools/baby-sleep-schedule';
import t8 from '../data/tools/diaper-cost-calculator';
import t9 from '../data/tools/baby-name-explorer';

/**
 * Image sitemap: one entry per tool page naming its chart, so image search
 * finds the charts even before it has crawled every page. Linked from
 * public/robots.txt. The page sitemap itself comes from @astrojs/sitemap.
 */
const SITE = 'https://sage-and-sprout.com';
const TOOLS = [t0, t1, t2, t3, t4, t5, t6, t7, t8, t9];

export const GET: APIRoute = () => {
  const entries = TOOLS.flatMap((copy) => {
    const g = graphicFor(copy);
    if (!g) return [];
    return [
      `  <url>\n    <loc>${SITE}${copy.path}</loc>\n    <image:image>\n      <image:loc>${SITE}${g.src2x}</image:loc>\n    </image:image>\n  </url>`,
    ];
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
