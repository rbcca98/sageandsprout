import type { ToolCopy } from './_types';

const copy: ToolCopy = {
  title: 'Baby Sleep Schedule Calculator: Wake Windows & Nap Times by Age | Sage & Sprout',
  description:
    'Build a baby sleep and nap schedule by age. Get wake windows, nap times, bedtime, and total sleep targets from AAP and AASM guidance. Free.',
  path: '/tools/baby-sleep-schedule/',
  breadcrumb: 'Baby Sleep Schedule Calculator',
  headline: 'Baby Sleep Schedule Calculator',
  hook:
    "Enter your baby's age and morning wake time to get a suggested nap schedule, estimated bedtime, and total sleep targets. It draws on AAP safe sleep guidelines and AASM pediatric sleep duration recommendations.",
  reviewedDate: '2025-01-15',

  faqs: [
    {
      question: 'What is a wake window?',
      answer:
        'A wake window is the amount of time a baby can comfortably stay awake between sleep periods before becoming overtired. Wake windows lengthen as babies get older. A newborn may only tolerate 45–60 minutes of wakefulness, while a 12-month-old can handle 3–4 hours. Respecting wake windows helps prevent overtiredness, which paradoxically makes it harder for babies to fall and stay asleep.',
    },
    {
      question: 'How many naps does my baby need?',
      answer:
        'Newborns take 4–5 short naps. This consolidates to 3 naps around 3–4 months, drops to 2 naps between 6–8 months, and transitions to 1 nap between 12–18 months. Most toddlers keep one midday nap until age 3–4. Each transition can cause temporary sleep disruption as the schedule adjusts.',
    },
    {
      question: 'What is a safe sleep environment for my baby?',
      answer:
        'The AAP recommends placing babies on their back on a firm, flat surface (crib, bassinet, or play yard) with a fitted sheet. No loose bedding, pillows, bumpers, or soft objects in the sleep space. Room-sharing (but not bed-sharing) for the first 6 months significantly reduces SIDS risk. A sleep sack or swaddle can replace blankets.',
    },
    {
      question: "My baby won't sleep according to the schedule. What should I do?",
      answer:
        'Schedules are guidelines, not rules. Babies cannot read clocks and have variable days. If your baby seems tired before the suggested time, put them down. Watch for tired cues like eye rubbing, yawning, pulling ears, or staring blankly, rather than watching the clock. Consistency in routine (diaper change, feeding, lullaby) matters more than hitting exact times.',
    },
    {
      question: 'When do babies start sleeping through the night?',
      answer:
        '"Sleeping through the night" typically means 5–6 continuous hours, not 8–10. Many babies reach this milestone around 3–4 months, though there is wide variation. Some babies sleep long stretches early; others continue waking until 12–18 months. Night waking is developmentally normal well into toddlerhood, particularly during growth spurts, illness, or developmental leaps.',
    },
    {
      question: 'What is the 4-month sleep regression?',
      answer:
        'Around 3–4 months, babies undergo a permanent change in their sleep architecture: they shift from two sleep stages (light and deep) to four, similar to adult sleep cycles. This transition often causes increased night waking after a period of longer stretches. It is not a regression to earlier behavior. It is a permanent neurological maturation. Most families see improvement within 2–6 weeks.',
    },
  ],

  related: [
    { href: '/tools/feeding-formula-amount/', label: 'Feeding & Formula Amount', description: 'How much formula or breast milk by age and weight' },
    { href: '/tools/baby-growth-percentile/', label: 'Baby Growth Percentile', description: 'WHO growth percentile for weight, length, head circumference' },
  ],

  sources: [
    { label: 'AAP (2022). Safe Sleep. HealthyChildren.org.', url: 'https://www.healthychildren.org/english/ages-stages/baby/sleep/pages/safe-sleep.aspx' },
    { label: 'AASM (2016). Recommended Amount of Sleep for Pediatric Populations. Journal of Clinical Sleep Medicine.', url: 'https://aasm.org/resources/pdf/pediatricsleepdurationconsensus.pdf' },
    { label: 'Moon RY, Task Force on SIDS (2022). Sleep-Related Infant Deaths. Pediatrics.', url: 'https://publications.aap.org/pediatrics/article/150/1/e2022057990/188304' },
  ],

  contentHtml: `
    <h2>Why wake windows matter</h2>
    <p>
      A wake window is the span of time a baby can comfortably remain awake before sleep pressure builds to the point of overtiredness. Overtired babies often <em>fight</em> sleep. The stress hormones (cortisol, adrenaline) released by prolonged wakefulness make it harder, not easier, to fall asleep. This is the counterintuitive loop parents encounter when they think "if I keep baby awake longer, they'll sleep better."
    </p>
    <p>
      Wake windows lengthen significantly with age. A 6-week-old may only manage 45–60 minutes before needing to sleep again, while a 10-month-old can comfortably stay awake for 3–4 hours. Tracking wake windows, rather than trying to impose a fixed clock-based schedule, is the core skill of newborn and infant sleep.
    </p>

    <h2>How much sleep does my baby need?</h2>
    <p>
      The American Academy of Sleep Medicine (AASM), in collaboration with the AAP, publishes pediatric sleep duration recommendations. These are total sleep in 24 hours (daytime naps + nighttime):
    </p>
    <ul>
      <li><strong>Newborns (0–3 months):</strong> 14–17 hours</li>
      <li><strong>Infants (4–12 months):</strong> 12–16 hours</li>
      <li><strong>Toddlers (1–2 years):</strong> 11–14 hours</li>
    </ul>
    <p>
      These ranges account for individual variation. A baby consistently sleeping at the lower end of the normal range who is happy, alert, and growing well is not sleep-deprived. They may simply need less sleep than average.
    </p>

    <h2>Nap transitions and what to expect</h2>
    <p>
      <strong>4 to 3 naps</strong> (around 3–4 months): As wake windows lengthen, the late-afternoon cat nap becomes harder to achieve. Look for signs: baby fighting the fourth nap, or taking it too late and then resisting bedtime.
    </p>
    <p>
      <strong>3 to 2 naps</strong> (around 6–8 months): One of the most significant transitions. Often triggered by longer wake windows and the 4-month sleep maturation. Baby may start resisting the third nap or skipping it, causing early bedtime.
    </p>
    <p>
      <strong>2 to 1 nap</strong> (around 12–18 months): Signs include taking a long time to fall asleep for the first nap, skipping it entirely some days, or one nap running so long it disrupts bedtime. The transition usually takes 4–8 weeks and can be bumpy.
    </p>

    <h2>Safe sleep: the AAP guidelines</h2>
    <p>
      Where and how your baby sleeps is as important as how much they sleep. The AAP 2022 safe sleep guidelines recommend:
    </p>
    <ul>
      <li><strong>Back to sleep</strong> for every nap and night sleep, every time, until age 1</li>
      <li><strong>Firm, flat surface:</strong> a crib, bassinet, or play yard with a fitted sheet designed for that product</li>
      <li><strong>No loose bedding:</strong> no pillows, bumper pads, positioners, or soft toys in the sleep space</li>
      <li><strong>Room-sharing without bed-sharing</strong> for at least the first 6 months, ideally 1 year</li>
      <li><strong>Avoid overheating:</strong> dress baby in one more layer than you find comfortable; use a sleep sack instead of blankets</li>
    </ul>
    <p>
      Swaddling is safe and beneficial in the first 2–3 months for calming and sleep. Stop swaddling when the baby shows signs of rolling over (typically around 3–4 months), as a swaddled rolling baby cannot push up from a face-down position.
    </p>

    <h2>Creating a consistent sleep routine</h2>
    <p>
      A bedtime routine trains the brain to associate specific actions with sleep onset. Even a short, consistent sequence (diaper, pajamas, feeding, song, dark room) can significantly shorten the time it takes for babies to fall asleep. The routine does not need to be long (10–20 minutes is fine) but should be predictable. The same steps in the same order, every time.
    </p>
    <p>
      White noise can help mask household sounds that cause brief arousals. Research supports volumes around 65 dB (roughly the sound of a shower), positioned at least 6 feet from the baby's sleep space.
    </p>
  `,
};

export default copy;
