import type { ToolCopy } from './_types';

const copy: ToolCopy = {
  title: "Due Date Calculator: Estimate Your Baby's Arrival | Sage & Sprout",
  description:
    'Free due date calculator using your last menstrual period, conception date, or IVF transfer. Instantly see your estimated due date, trimester, and key pregnancy milestones.',
  path: '/tools/due-date-calculator/',
  breadcrumb: 'Due Date Calculator',
  headline: 'Due Date Calculator',
  hook:
    "Enter the first day of your last menstrual period (LMP) to calculate your estimated due date (EDD), current week, trimester, and key milestones. It's based on Naegele's rule and ACOG guidelines. You can also calculate from a conception date or IVF transfer.",
  reviewedDate: '2026-06-27',

  faqs: [
    {
      question: 'How is my due date calculated?',
      answer:
        "We use Naegele's rule: your estimated due date (EDD) is 280 days from the first day of your last menstrual period (LMP). This assumes a 28-day cycle. If your cycle is longer or shorter, we adjust proportionally. The formula is based on an average 14-day follicular phase plus 266 days of fetal development. Source: ACOG Committee Opinion 700.",
    },
    {
      question: 'How accurate is an estimated due date?',
      answer:
        'Only about 4–5% of babies are born exactly on their EDD. Research shows approximately 80% of births occur within 10 days of the calculated date. First-trimester ultrasound (before 14 weeks) is the most accurate method for confirming gestational age, typically within 5–7 days.',
    },
    {
      question: 'My period is irregular. Can I still use the LMP method?',
      answer:
        'The LMP method assumes you know your last period and have a regular cycle. If your cycles are irregular, the LMP-based date may be less accurate. Your provider will typically rely on a first-trimester ultrasound to establish gestational age, since crown-rump length measurements are more reliable than menstrual history when cycles vary.',
    },
    {
      question: 'My ultrasound date is different from my LMP date. Which one is correct?',
      answer:
        'If the discrepancy is greater than 5–7 days in the first trimester (or 10–14 days in the second trimester), your provider will usually update your due date based on the ultrasound measurement. Ultrasound dating is considered more accurate than LMP dating, especially if your cycle length is uncertain.',
    },
    {
      question: 'How do I calculate my due date after IVF?',
      answer:
        "For IVF, the embryo's developmental age is known precisely. For a Day-5 (blastocyst) transfer, add 261 days to the transfer date. For a Day-3 transfer, add 263 days. This accounts for the fact that the embryo was already 5 or 3 days old at the time of transfer. Our calculator handles both.",
    },
    {
      question: 'What if I go past my due date?',
      answer:
        "Going 1–2 weeks past your EDD is common, and spontaneous labor can occur naturally up to 42 weeks. Most providers discuss induction at 41–42 weeks, since the risk of placental insufficiency and other complications increases after 42 weeks. Always follow your provider's guidance.",
    },
  ],

  related: [
    { href: '/tools/how-many-weeks-pregnant/', label: 'How Many Weeks Pregnant', description: 'See your current week, trimester, and progress.' },
    { href: '/tools/ovulation-fertility-window/', label: 'Ovulation Calculator', description: 'Find your fertile window and ovulation day.' },
  ],

  sources: [
    { label: 'ACOG Committee Opinion 700: Methods for Estimating the Due Date (2017)', url: 'https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date' },
    { label: "Naegele's Rule: Wikipedia (historical context)", url: 'https://en.wikipedia.org/wiki/Naegele%27s_rule' },
    { label: 'ACOG FAQ: Preterm (Early) Labor and Birth', url: 'https://www.acog.org/womens-health/faqs/preterm-labor-and-birth' },
    { label: 'American Pregnancy Association: Calculating Due Date', url: 'https://americanpregnancy.org/healthy-pregnancy/due-date-calculator/' },
  ],

  contentHtml: `
    <h2>How this calculator works</h2>
    <p>
      Your <strong>estimated due date (EDD)</strong> is calculated using <strong>Naegele's rule</strong>,
      the method endorsed by the American College of Obstetricians and Gynecologists (ACOG).<sup>1</sup>
      The formula adds 280 days (exactly 40 weeks) to the first day of your last menstrual period (LMP).
      This assumes a 28-day cycle with ovulation on day 14.
    </p>
    <p>
      If your average cycle is longer or shorter than 28 days, our calculator adjusts proportionally.
      For example, a 32-day cycle shifts the EDD four days later; a 24-day cycle shifts it four days earlier.
    </p>
    <p>
      You can also calculate from a <strong>known conception or ovulation date</strong> (we add 266 days)
      or an <strong>IVF embryo transfer date</strong> (Day-5 adds 261 days; Day-3 adds 263 days),
      since the embryo's developmental age is precisely known in these cases.
    </p>

    <h2>How accurate is a due date?</h2>
    <p>
      Only about <strong>4–5% of babies are born on their exact EDD</strong>. Research shows
      that roughly 80% of births occur within 10 days of the calculated date, and about 95% within
      20 days. Think of the EDD as the midpoint of a range, not a precise prediction.
    </p>
    <p>
      <strong>First-trimester ultrasound</strong> (performed before 14 weeks) is the most accurate method
      for confirming gestational age. Measurement of the crown-rump length (CRL) can date a pregnancy
      within ±5–7 days. If your ultrasound-derived date differs from your LMP-based date by more than
      7 days in the first trimester, your provider will typically update your EDD to match the ultrasound.
    </p>

    <h2>After you get your due date: what to do next</h2>
    <p>
      Once you know your EDD, your next step is scheduling <strong>first prenatal care</strong>, ideally by
      8–10 weeks of pregnancy. Early care establishes a baseline, screens for risk factors, and gives you
      access to first-trimester genetic screening (available weeks 10–13).
    </p>
    <p>
      Key prenatal appointments to anticipate:
    </p>
    <ul>
      <li><strong>First visit:</strong> ideally by weeks 8–10</li>
      <li><strong>First-trimester screening:</strong> weeks 11–13 (nuchal translucency ultrasound + blood draw)</li>
      <li><strong>Anatomy scan:</strong> weeks 18–22 (detailed fetal survey ultrasound)</li>
      <li><strong>Glucose challenge test:</strong> weeks 24–28</li>
      <li><strong>Group B Strep test:</strong> weeks 35–37</li>
      <li><strong>Weekly visits:</strong> beginning at 36 weeks</li>
    </ul>

    <h2>Understanding pregnancy trimesters</h2>
    <p>
      Pregnancy is divided into three trimesters, each roughly 13 weeks long:
    </p>
    <ul>
      <li>
        <strong>First trimester (weeks 1–13):</strong> The embryo's major organ systems, neural tube,
        heart, and facial features form. Most miscarriages occur during this period.
        Nausea, fatigue, and breast tenderness are common early symptoms.
      </li>
      <li>
        <strong>Second trimester (weeks 14–27):</strong> Often called the "honeymoon trimester," since
        energy typically returns, morning sickness eases, and the baby grows rapidly.
        Fetal movement (quickening) is usually first felt around weeks 18–22.
      </li>
      <li>
        <strong>Third trimester (weeks 28–40+):</strong> Your baby gains most of their birth weight and
        the lungs mature in preparation for breathing. Prenatal visits become more frequent, and you'll
        discuss your birth plan with your provider.
      </li>
    </ul>

    <h2>A note about "full term"</h2>
    <p>
      The term "full term" specifically refers to <strong>weeks 39–40</strong>. ACOG defines:
    </p>
    <ul>
      <li><strong>Early term:</strong> 37 weeks 0 days – 38 weeks 6 days</li>
      <li><strong>Full term:</strong> 39 weeks 0 days – 40 weeks 6 days</li>
      <li><strong>Late term:</strong> 41 weeks 0 days – 41 weeks 6 days</li>
      <li><strong>Post-term:</strong> 42 weeks 0 days and beyond</li>
    </ul>
    <p>
      Babies born at 39–40 weeks tend to have the best outcomes for lung maturity, feeding, and
      neurodevelopment. If your provider recommends a delivery date before 39 weeks without a medical
      indication, it is appropriate to ask why.
    </p>
  `,
};

export default copy;
