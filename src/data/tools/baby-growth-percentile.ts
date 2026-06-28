import type { ToolCopy } from './_types';

const copy: ToolCopy = {
  title: 'Baby Growth Percentile Calculator — WHO LMS Method | Sage & Sprout',
  description:
    'Free baby growth percentile calculator using WHO Child Growth Standards (LMS method). Works for weight, length, and head circumference from 0–24 months.',
  path: '/tools/baby-growth-percentile/',
  breadcrumb: 'Baby Growth Percentile Calculator',
  headline: 'Baby Growth Percentile Calculator',
  hook:
    "Enter your baby's age, sex, and a measurement to get their WHO growth percentile for weight, length, or head circumference. Calculated using the WHO LMS method — the same standard used by US pediatricians for children under 2 years.",
  reviewedDate: '2025-01-15',

  faqs: [
    {
      question: 'What does the 50th percentile mean?',
      answer:
        'A baby at the 50th percentile weighs more than exactly half of babies their age and sex, and less than the other half. The 50th percentile is the statistical median — it does not mean "ideal." Healthy babies span the full range of percentiles.',
    },
    {
      question: 'Should I worry if my baby is below the 25th percentile?',
      answer:
        'Not necessarily. Percentile by itself is less important than the trend over time. A baby consistently at the 10th percentile is growing normally. What warrants attention is a large drop across percentile lines between visits — your pediatrician tracks this at every well-child visit.',
    },
    {
      question: 'Why do US doctors sometimes use CDC charts instead of WHO?',
      answer:
        'The CDC recommends using WHO growth standards for children under 2 years and CDC growth charts for ages 2–20. Before 2006, US doctors used older CDC charts even for infants. Most current US clinical guidelines align with WHO for the 0–2 age range, which is what this calculator uses.',
    },
    {
      question: "How do I convert my baby's weight from pounds to kilograms?",
      answer:
        'Divide pounds by 2.2046. For example, 15 lb = 6.80 kg. The calculator includes a built-in conversion toggle so you can enter measurements in either US customary or metric units.',
    },
    {
      question: 'What is the LMS method?',
      answer:
        'The LMS method (developed by Cole and Green, 1992) fits growth data using three age-specific parameters: L (the power in the Box-Cox transformation), M (the median), and S (the coefficient of variation). Together they allow the distribution at each age to be non-normal and skewed, which reflects real growth patterns better than a simple mean ± standard deviation.',
    },
    {
      question: 'My baby was premature — which age do I use?',
      answer:
        'For premature babies, use their corrected age (chronological age minus weeks born early) rather than their birth age until about 24 months. Your pediatrician may also use specialized preterm growth charts for very early preemies.',
    },
  ],

  related: [
    { href: '/tools/feeding-formula-amount/', label: 'Feeding & Formula Amount', description: 'How much formula or breast milk by age and weight' },
    { href: '/tools/baby-sleep-schedule/', label: 'Baby Sleep Schedule', description: 'Wake windows and nap times by age' },
  ],

  sources: [
    { label: 'WHO Child Growth Standards (2006). Methods and Development. World Health Organization.', url: 'https://www.who.int/tools/child-growth-standards/standards' },
    { label: 'CDC Clinical Growth Charts and WHO Growth Standards.', url: 'https://www.cdc.gov/growthcharts/who_charts.htm' },
    { label: 'Cole TJ, Green PJ (1992). Smoothing reference centile curves: the LMS method and penalized likelihood. Statistics in Medicine.', url: 'https://pubmed.ncbi.nlm.nih.gov/1518992/' },
    { label: 'AAP Bright Futures Periodicity Schedule 2023.', url: 'https://brightfutures.aap.org' },
  ],

  contentHtml: `
    <h2>How pediatricians track baby growth</h2>
    <p>
      At every well-child visit, your pediatrician plots your baby's weight, length/height, and head circumference on a growth chart. The American Academy of Pediatrics (AAP) and CDC recommend using the World Health Organization (WHO) Child Growth Standards for children from birth to 24 months. These charts were developed from a carefully selected international sample of formula-fed and breastfed babies in six countries, raised in ideal conditions, to describe how infants <em>should</em> grow — not just how they do grow on average.
    </p>

    <h2>What percentile really means</h2>
    <p>
      A percentile tells you what percentage of babies the same age and sex weigh less than your baby (or are shorter, or have a smaller head). A baby at the 75th percentile for weight is heavier than 75% of babies the same age. The 50th percentile is the median — average — but percentiles from 3rd to 97th are all considered within the normal range.
    </p>
    <p>
      The most important thing is not the percentile itself but the <strong>trend</strong>. A baby who has been consistently at the 10th percentile is likely just a small baby growing normally. What concerns pediatricians is "dropping percentiles" — a significant downward shift across percentile lines between visits, which can signal inadequate caloric intake, illness, or other issues. Similarly, a rapid upward shift in weight percentile may prompt evaluation.
    </p>

    <h2>Understanding the WHO LMS method</h2>
    <p>
      The WHO uses a statistical technique called the LMS method (Box-Cox normal distribution) to create growth reference curves. For each measurement type, age, and sex, three parameters are calculated:
    </p>
    <ul>
      <li><strong>L</strong> — the power of the Box-Cox transformation (accounts for skewness in the data)</li>
      <li><strong>M</strong> — the median value for that age and sex</li>
      <li><strong>S</strong> — the coefficient of variation (spread)</li>
    </ul>
    <p>
      Given these parameters and your baby's actual measurement (X), the Z-score is calculated as: Z = ((X/M)^L − 1) / (L × S). The Z-score is then converted to a percentile using the standard normal distribution. This calculator uses the official WHO LMS parameter tables published in 2006.
    </p>

    <h2>Weight for age</h2>
    <p>
      Weight is the most frequently tracked measurement. Newborns typically lose up to 7–10% of birth weight in the first week, then regain it by 10–14 days. After that, babies generally gain rapidly through the first 3–4 months — often 5–7 oz per week — then slow to around 3–5 oz per week. By 5–6 months, most babies have doubled their birth weight; by 1 year, most have tripled it.
    </p>

    <h2>Length for age</h2>
    <p>
      Length (measured lying flat before age 2, then standing height) reflects long-term nutritional status and genetic growth potential. Average birth length is about 50 cm (19.7 in). Babies grow roughly 10 inches in the first year and 5 inches in the second. Extreme short stature (below 3rd percentile) or tall stature (above 97th) warrants evaluation, though many children outside these ranges are simply following their genetic growth curves.
    </p>

    <h2>Head circumference for age</h2>
    <p>
      Head circumference reflects brain growth and is measured at every well-child visit in the first two years. The average newborn head circumference is about 34–35 cm. The head grows rapidly in infancy — by 1 year, average head circumference is about 46 cm. Persistent very small (microcephaly) or very large (macrocephaly) head circumference may prompt neurological evaluation, though most large-headed babies simply inherited it from a parent.
    </p>

    <h2>When to discuss growth with your pediatrician</h2>
    <p>
      Bring growth questions to your provider rather than acting on individual data points. Signs that warrant a call between visits include: visible weight loss, failure to regain birth weight by 2 weeks, a consistent downward trend across two or more percentile lines, or any sudden large change in percentile. Your pediatrician has access to the full growth curve history and can put any single measurement in context.
    </p>
  `,
};

export default copy;
