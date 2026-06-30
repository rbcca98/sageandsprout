import type { ToolCopy } from './_types';

const copy: ToolCopy = {
  title: 'Baby Feeding & Formula Amount Calculator: AAP Guidelines | Sage & Sprout',
  description:
    'See how much formula or breast milk your baby needs by age and weight, per AAP guidelines. Shows oz and mL per feeding, feeds per day, and daily total.',
  path: '/tools/feeding-formula-amount/',
  breadcrumb: 'Feeding & Formula Amount Calculator',
  headline: 'Baby Feeding & Formula Amount Calculator',
  hook:
    "Enter your baby's age, weight, and feeding type to get AAP-based guidelines on how much formula or breast milk they need each day, broken down by oz per feeding, number of feedings, and total daily amount in both oz and mL.",
  reviewedDate: '2025-01-15',

  faqs: [
    {
      question: 'How much formula does a newborn need?',
      answer:
        'In the first days of life, newborns need only about 1–2 oz (30–60 mL) per feeding every 2–3 hours, totaling around 8–12 feedings per day. Their stomachs are tiny, roughly the size of a marble at birth. By 2 weeks, most newborns take 2–3 oz per feeding.',
    },
    {
      question: 'What is the 2.5 oz per pound per day rule?',
      answer:
        'A widely used guideline is that formula-fed babies need approximately 2.5 oz of formula per pound of body weight per day. So a 10 lb baby would need about 25 oz of formula spread across their daily feedings. This is a guideline only, and the cap is generally 32 oz/day regardless of weight.',
    },
    {
      question: 'Can I overfeed my baby with formula?',
      answer:
        'Yes, it is possible to overfeed a formula-fed baby, especially if feeds are offered every time the baby cries (not all crying is hunger). Signs of overfeeding include frequent spit-up, gassiness, and excessive weight gain. Paced bottle feeding, holding the bottle horizontal so milk flows slowly, helps babies self-regulate.',
    },
    {
      question: 'How do I know if my breastfed baby is getting enough?',
      answer:
        'Since you cannot measure the amount a breastfed baby drinks, watch for: 6+ wet diapers per day after day 4, steady weight gain after the first week, a satisfied, relaxed baby after feeds, and audible swallowing during feedings. Weight checks at the pediatrician are the most reliable measure.',
    },
    {
      question: 'When should I start solid foods?',
      answer:
        'The AAP recommends introducing solid foods around 6 months, when babies show signs of readiness: sitting with minimal support, showing interest in food, and loss of the tongue-thrust reflex. Starting before 4 months is not recommended. Breast milk or formula remains the primary nutrition through 12 months even after solids are introduced.',
    },
    {
      question: 'Do breastfed and formula-fed babies need the same amounts?',
      answer:
        'Not exactly. Breastfed babies tend to eat slightly less total volume because breast milk is more easily digestible and caloric density can vary. The amounts in this calculator apply most directly to formula feeding; breastfed babies should be fed on demand rather than by a fixed schedule or amount.',
    },
  ],

  related: [
    { href: '/tools/baby-growth-percentile/', label: 'Baby Growth Percentile', description: 'WHO growth percentile for weight, length, head circumference' },
    { href: '/tools/baby-sleep-schedule/', label: 'Baby Sleep Schedule', description: 'Wake windows and nap times by age' },
  ],

  sources: [
    { label: 'AAP (2022). Amount and Schedule of Formula Feedings. HealthyChildren.org.', url: 'https://www.healthychildren.org/English/ages-stages/baby/formula-feeding/Pages/Amount-and-Schedule-of-Formula-Feedings.aspx' },
    { label: 'AAP (2022). Benefits of Breastfeeding. Pediatrics.', url: 'https://publications.aap.org/pediatrics/article/150/1/e2022057988/188347/Breastfeeding-and-the-Use-of-Human-Milk' },
    { label: 'AAP (2020). Starting Solid Foods. HealthyChildren.org.', url: 'https://www.healthychildren.org/English/ages-stages/baby/feeding-nutrition/Pages/Starting-Solid-Foods.aspx' },
  ],

  contentHtml: `
    <h2>How much should a baby eat? The AAP framework</h2>
    <p>
      New parents are often surprised by how frequently babies need to eat, especially in the newborn phase. The American Academy of Pediatrics (AAP) provides age-based and weight-based feeding guidance to help parents understand what is normal and notice when something may be off.
    </p>
    <p>
      For formula-fed babies, a common clinical guideline is approximately <strong>2.5 oz of formula per pound of body weight per day</strong>, with a cap of 32 oz regardless of weight. This "2.5 oz per pound" rule applies most directly to babies 1–6 months old. Before 1 month and after 6 months, age-based amounts become more relevant as stomach capacity and feeding frequency change.
    </p>

    <h2>Newborns (0–1 month)</h2>
    <p>
      A newborn's stomach is the size of a marble at birth, only about 5–7 mL. By day 3 it expands to roughly 22–27 mL, and by 1 week, around 45–60 mL. This is why newborns eat small amounts very frequently: 8–12 times per day is completely normal in the first weeks. Small, frequent feeds match the stomach's capacity and support milk supply for breastfeeding mothers.
    </p>
    <p>
      It is normal for newborns to lose up to 7–10% of birth weight in the first 3–5 days, then regain it by 10–14 days. If your newborn has not regained birth weight by 2 weeks, contact your provider, as supplementation may be needed.
    </p>

    <h2>1–4 months: growth spurts and schedule emergence</h2>
    <p>
      Babies in this age range grow rapidly and appetite increases accordingly. Many parents notice sudden increases in hunger around 3 and 6 weeks, and again around 3 months. These are growth spurts, not signs that formula is insufficient. The 2.5 oz/lb guideline applies well here. Feeding frequency typically drops from 8–12 times per day to 6–8 times, and some babies begin sleeping longer stretches at night.
    </p>
    <p>
      Keep total daily formula intake under 32 oz (950 mL). Consistently offering more than this may suppress solid food intake when introduced and can strain immature kidneys.
    </p>

    <h2>4–6 months: preparation for solids</h2>
    <p>
      Appetite may temporarily plateau or even dip around 4 months as growth rate slows. Feeds become fewer (4–6 per day) but larger. The AAP advises against introducing solid foods before 4 months, and recommends waiting until 6 months for most babies. Starting too early is associated with increased allergy risk and choking hazard.
    </p>

    <h2>6–12 months: adding solid foods</h2>
    <p>
      Once solid foods are introduced, breast milk and formula remain the <em>primary</em> nutrition source through 12 months, with solids as a complement. Aim to offer solids 1–3 times per day by 8–9 months, starting with single-ingredient purées and progressing to mashed and soft finger foods. Offer breast milk or formula before or after solids, not instead of them.
    </p>
    <p>
      Common first foods include pureed vegetables, fruits, single-grain iron-fortified cereals, and pureed meats. Introduce one new food every 3–5 days to watch for allergic reactions. Honey should not be given before 12 months due to risk of infant botulism.
    </p>

    <h2>Signs your baby is getting enough</h2>
    <p>For formula-fed babies:</p>
    <ul>
      <li>6+ wet diapers per day after day 4</li>
      <li>Soft yellow-seeded (breastfed) or tan (formula) stools</li>
      <li>Steady weight gain at well visits</li>
      <li>Baby seems satisfied after feeds and is alert when awake</li>
    </ul>
    <p>For breastfed babies, add: you can hear your baby swallowing during feeds, and your breasts feel softer after nursing.</p>

    <h2>Paced bottle feeding</h2>
    <p>
      Whether feeding formula or pumped breast milk, paced bottle feeding helps babies self-regulate intake. Hold the bottle nearly horizontal so milk flows slowly. Allow the baby to draw the nipple into their mouth rather than pushing it in. Pause for burping every ½–1 oz. This mimics the effort of breastfeeding and reduces overfeeding, gas, and spit-up.
    </p>
  `,
};

export default copy;
