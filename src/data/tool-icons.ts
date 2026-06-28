/** Maps a tool URL to its line-icon name (see components/Icon.astro). */
export const ICON_BY_HREF: Record<string, string> = {
  '/tools/due-date-calculator/':      'calendar',
  '/tools/how-many-weeks-pregnant/':  'weeks',
  '/tools/ovulation-fertility-window/': 'bloom',
  '/tools/pregnancy-weight-gain/':    'scale',
  '/tools/maternity-leave-planner/':  'briefcase',
  '/tools/baby-growth-percentile/':   'chart',
  '/tools/feeding-formula-amount/':   'bottle',
  '/tools/baby-sleep-schedule/':      'moon',
  '/tools/diaper-cost-calculator/':   'coin',
  '/tools/baby-name-explorer/':       'tag',
};

export function iconForHref(href: string): string {
  return ICON_BY_HREF[href] ?? 'calendar';
}
