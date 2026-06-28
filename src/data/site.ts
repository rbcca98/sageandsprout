/**
 * ─────────────────────────────────────────────────────────────
 *  SITE COPY — edit all homepage + header/footer text here.
 *  Change a string, save, and the page updates. No markup needed.
 *  (Each calculator page's own copy lives at the top of its file
 *   in src/pages/tools/<name>.astro.)
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  brand: 'Sage & Sprout',

  /* Top navigation (header) */
  nav: [
    { href: '/tools/due-date-calculator/', label: 'Due date' },
    { href: '/tools/how-many-weeks-pregnant/', label: 'Weeks pregnant' },
    { href: '/tools/ovulation-fertility-window/', label: 'Ovulation' },
    { href: '/about/', label: 'About' },
  ],
  navCta: { href: '/#all-tools', label: 'All tools' },

  /* Homepage hero */
  hero: {
    eyebrow: 'Pregnancy & baby tools',
    headlineLine1: 'from the first test',
    headlineLine2: 'to the first',
    headlineAccent: 'birthday',
    sub: 'Free, science-backed calculators for planning to conceive, pregnancy, and your baby’s first years. Reviewed and updated by Rebecca, a senior US medical student. No sign-up. No data stored.',
    primaryCta: { href: '/tools/due-date-calculator/', label: 'Find your due date' },
    secondaryCta: { href: '#all-tools', label: 'All tools' },
  },

  /* Trust strip under the hero */
  trust: [
    'Sources from ACOG · AAP · CDC',
    'Reviewed by a senior medical student',
    'Calculated in browser',
    'Free · no sign-up',
  ],

  /* Tools grid */
  toolkit: {
    eyebrow: 'The toolkit',
    heading: 'Ten tools in one place.',
    sub: 'For parents conceiving, expecting, or holding a newborn.',
  },
  /* Order shown in the grid. Set featured:true for the "Most used" flag. */
  tools: [
    { href: '/tools/ovulation-fertility-window/', name: 'Ovulation & fertile window' },
    { href: '/tools/due-date-calculator/', name: 'Due date calculator', featured: true },
    { href: '/tools/how-many-weeks-pregnant/', name: 'How many weeks pregnant' },
    { href: '/tools/pregnancy-weight-gain/', name: 'Pregnancy weight gain' },
    { href: '/tools/maternity-leave-planner/', name: 'Maternity leave planner' },
    { href: '/tools/baby-growth-percentile/', name: 'Baby growth percentile' },
    { href: '/tools/feeding-formula-amount/', name: 'Feeding & formula amount' },
    { href: '/tools/baby-sleep-schedule/', name: 'Baby sleep schedule' },
    { href: '/tools/diaper-cost-calculator/', name: 'Diaper & wipe cost' },
    { href: '/tools/baby-name-explorer/', name: 'Baby name explorer' },
  ],

  /* Homepage guide (the cream "sheet" below the grid). Paragraphs may
     contain links and <strong> — write them as plain HTML. */
  guide: {
    eyebrow: 'A quick guide',
    heading: 'Pregnancy calculators, explained for real people',
    sections: [
      {
        body: 'When you’re pregnant or hoping to be, the numbers matter. When is the baby due? How far along am I? When am I most fertile? These questions have clear, evidence-based answers, and our tools work them out with the same formulas your provider likely uses.',
      },
      {
        heading: 'Start with your due date',
        body: 'The <a href="/tools/due-date-calculator/">due date calculator</a> is almost always the first tool parents reach for. It uses <strong>Naegele’s rule</strong>, endorsed by the American College of Obstetricians and Gynecologists (ACOG), to add 280 days to the first day of your last period. You can also work from a known conception date or an IVF transfer. Only about 1 in 20 babies actually arrives on the estimated date, so it’s the middle of a window and not a deadline.',
      },
      {
        heading: 'Know how far along you are',
        body: 'Once you have a due date, the <a href="/tools/how-many-weeks-pregnant/">how many weeks pregnant calculator</a> shows your gestational age in weeks and days, your trimester, and what’s happening this week. The <a href="/tools/pregnancy-weight-gain/">pregnancy weight gain calculator</a> gives a healthy range based on your pre-pregnancy BMI, per IOM/NASEM guidelines, and the <a href="/tools/maternity-leave-planner/">maternity leave planner</a> turns FMLA and your state’s paid-leave rules into a real timeline.',
      },
      {
        heading: 'Trying to conceive',
        body: 'If you’re trying to get pregnant, the <a href="/tools/ovulation-fertility-window/">ovulation calculator</a> estimates your fertile window from your cycle length and last period. The window spans six days (the five before ovulation plus the day itself) with the best odds one to two days before.',
      },
      {
        heading: 'Once baby arrives',
        body: 'After birth, the <a href="/tools/baby-growth-percentile/">growth percentile calculator</a> plots weight, length, and head size on WHO curves; the <a href="/tools/feeding-formula-amount/">feeding calculator</a> gives AAP-based daily amounts; the <a href="/tools/baby-sleep-schedule/">sleep schedule generator</a> suggests nap times and bedtime; the <a href="/tools/diaper-cost-calculator/">diaper cost calculator</a> sizes up your monthly spend; and the <a href="/tools/baby-name-explorer/">baby name explorer</a> helps you find a name with meaning.',
      },
    ],
    aboutNote: '<strong>About Sage &amp; Sprout.</strong> Our tools are built on primary medical literature (ACOG, AAP, NIH, CDC) and reviewed by a senior US medical student at an Ivy League institution. Every calculation runs in your browser. We never store your dates or personal information. This is general educational information, not a substitute for your own provider. <a href="/about/">Learn more →</a>',
  },

  /* Footer */
  footer: {
    blurb: 'Science-backed tools for pregnancy, fertility, and the first years.',
    popularLabel: 'Popular tools',
    moreLabel: 'More',
    moreLinks: [
      { href: '/about/', label: 'About' },
      { href: '/medical-disclaimer/', label: 'Medical disclaimer' },
      { href: '/privacy/', label: 'Privacy policy' },
      { href: '/terms/', label: 'Terms of use' },
      { href: '/contact/', label: 'Contact' },
    ],
    disclaimer: 'Everything on Sage &amp; Sprout is general educational information, not medical advice, and is no substitute for care from a licensed provider.',
  },

  /* Page <title> + meta description for the homepage */
  meta: {
    title: 'Pregnancy & Baby Calculators. Free, Evidence-based Tools | Sage & Sprout',
    description: 'Free pregnancy and baby calculators: due date, weeks pregnant, ovulation, weight gain, baby growth, feeding, and more. Evidence-based and reviewed by a senior US medical student.',
  },
};
