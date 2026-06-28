import type { ToolCopy } from './_types';

const copy: ToolCopy = {
  title: 'Diaper & Wipe Cost Calculator: Monthly & Yearly Estimate | Sage & Sprout',
  description:
    'Calculate monthly and yearly diaper and wipe costs by baby age. See the right diaper size, daily usage, and total spending at your price per unit.',
  path: '/tools/diaper-cost-calculator/',
  breadcrumb: 'Diaper & Wipe Cost Calculator',
  headline: 'Diaper & Wipe Cost Calculator',
  hook:
    "Enter your baby's age and the price you pay per diaper and wipe to see exactly how many you need and how much you'll spend per month and per year. Includes the right diaper size to buy at every stage.",
  reviewedDate: '2025-01-15',
  medical: false,

  faqs: [
    {
      question: 'How many diapers does a newborn use per day?',
      answer:
        'Newborns typically use 10–12 diapers per day in the first month. This is because newborns eat every 2–3 hours and often stool immediately after feeding. Usage decreases as babies grow, and by 6 months, most babies use 6–7 diapers per day.',
    },
    {
      question: 'What is the cheapest way to buy diapers?',
      answer:
        "Buying in bulk from warehouse clubs (Costco, Sam's Club) or subscribing to auto-delivery (Amazon Subscribe & Save) typically saves 15–30% over per-pack retail. Store-brand diapers from Target (Up & Up) and Costco (Kirkland) are consistently rated near equivalently to name brands at 30–50% lower cost. Stock up during sales but avoid buying more than a 3-week supply in one size, since babies can outgrow a size quickly.",
    },
    {
      question: 'How long does each diaper size last?',
      answer:
        "Duration varies by baby's growth rate. Newborn size typically lasts 1–3 weeks (or not at all if baby is large). Size 1 (8–14 lb) usually lasts 1–2 months. Size 2 (12–18 lb) lasts 2–3 months. Sizes 3 and above can last several months each. Weight ranges from different brands overlap, so sizing up when the diaper leaks at the sides or back is the best guide.",
    },
    {
      question: 'Are expensive diapers worth it?',
      answer:
        'Not necessarily. Studies and parent communities consistently report that mid-range diapers (Costco Kirkland, Target Up & Up, Huggies) perform comparably to premium brands for most babies. Some babies with sensitive skin may do better with fragrance-free or natural-fiber options. The best approach is to try a small package before buying in bulk.',
    },
    {
      question: 'How many wipes do I need per diaper change?',
      answer:
        'The average is 2 wipes per diaper change, though wet diapers may only need 1 and blowouts may need 5+. Wipes are also used for hand cleaning, face, and spills, so real-world consumption is often higher than diaper-change count alone suggests.',
    },
    {
      question: 'When do babies typically potty train?',
      answer:
        'Most children are ready for potty training between 18 and 36 months, with the average around 27 months. Signs of readiness include staying dry for 2+ hours, showing interest in the toilet, being able to follow simple instructions, and having words for bodily functions. Early training before readiness often backfires and prolongs the total process.',
    },
  ],

  related: [
    { href: '/tools/baby-sleep-schedule/', label: 'Baby Sleep Schedule', description: 'Wake windows and nap times by age' },
    { href: '/tools/feeding-formula-amount/', label: 'Feeding & Formula Amount', description: 'How much formula or breast milk by age and weight' },
  ],

  sources: [
    { label: 'Procter & Gamble / Pampers diaper sizing guides.', url: 'https://www.pampers.com/en-us/diapers-and-wipes/article/all-about-diaper-sizes' },
    { label: 'AAP (2022). Potty Training. HealthyChildren.org.', url: 'https://www.healthychildren.org/English/ages-stages/toddler/toilet-training/Pages/default.aspx' },
  ],

  contentHtml: `
    <h2>How many diapers will your baby use?</h2>
    <p>
      Diapers are one of the biggest recurring expenses for new parents, and also one of the easiest to plan for with a little arithmetic. Total diaper usage over the first 2.5 years (before most children potty train) runs between 5,000 and 8,000 diapers, depending on the age at toilet training and how frequently you change. At $0.25 per diaper, that's $1,250–$2,000 on diapers alone, before wipes.
    </p>

    <h2>Diaper usage by age</h2>
    <p>
      Usage is highest in the newborn phase (when babies eat and stool frequently) and gradually decreases:
    </p>
    <ul>
      <li><strong>Newborn (0–1 month):</strong> 10–12 changes per day</li>
      <li><strong>1–3 months:</strong> 8 changes per day</li>
      <li><strong>3–6 months:</strong> 7 changes per day</li>
      <li><strong>6–12 months:</strong> 6 changes per day</li>
      <li><strong>12–24 months:</strong> 5 changes per day</li>
      <li><strong>24+ months:</strong> 4 changes per day as potty training approaches</li>
    </ul>

    <h2>Choosing the right diaper size</h2>
    <p>
      Diaper sizes are primarily weight-based, not age-based. When diapers consistently leak at the legs or waist, or when the tabs struggle to close, it is time to size up, regardless of the age on the package. Going up a size early is almost always better than waiting until leaks are happening at night.
    </p>
    <p>
      Avoid stockpiling more than 3 weeks of supply in a single size, especially in Newborn and Size 1. Babies can outgrow a size in as little as 2–3 weeks. Many parents skip newborn size entirely if the baby is born over 8 lb.
    </p>

    <h2>How to reduce diaper costs</h2>
    <p><strong>Buy in bulk:</strong> Warehouse clubs (Costco, Sam's Club) and subscription delivery (Amazon Subscribe & Save with coupons) consistently offer the lowest per-unit cost, often under $0.20/diaper for premium brands and under $0.14 for store brands.</p>
    <p><strong>Try store brands:</strong> Target Up & Up, Costco Kirkland Signature, and Aldi Mamia are consistently rated near equivalently to Pampers and Huggies in parent comparisons and consumer reports, at 30–50% lower cost.</p>
    <p><strong>Use wipes strategically:</strong> A wet diaper only needs 1 wipe. Save 2–3 for messy changes. Baby washcloths with warm water work fine for newborn wet diapers and cost almost nothing per use.</p>
    <p><strong>Stock sale price, not convenience store price:</strong> The difference between $0.17/diaper (bulk sale) and $0.42/diaper (convenience drugstore) on a 250 diaper/month baby is $62/month, or $744/year. Always buy ahead when you find a sale price below your normal cost.</p>

    <h2>Cloth diapers: the tradeoff</h2>
    <p>
      Modern cloth diapers (pocket diapers, all-in-ones) have a high upfront cost ($200–$500 for a full stash) but effectively eliminate ongoing diaper costs. Over 2.5 years, cloth diapering typically saves $800–$1,500 compared to disposables, and more if reused for a second child. The tradeoffs are laundry frequency (every 2–3 days), absorbency challenges at night, and steeper learning curve. Many families use hybrid approaches: cloth at home, disposables for travel and childcare.
    </p>
  `,
};

export default copy;
