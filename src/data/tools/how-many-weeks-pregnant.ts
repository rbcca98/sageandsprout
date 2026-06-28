import type { ToolCopy } from './_types';

const copy: ToolCopy = {
  title: 'How Many Weeks Pregnant Am I? | Sage & Sprout',
  description:
    "Find out exactly how many weeks and days pregnant you are, which trimester you're in, and what to expect this week. Free calculator based on your LMP or due date.",
  path: '/tools/how-many-weeks-pregnant/',
  breadcrumb: 'How Many Weeks Pregnant',
  headline: 'How Many Weeks Pregnant Am I?',
  hook:
    "Enter the first day of your last menstrual period (LMP) or your estimated due date to instantly see how far along you are, which trimester you're in, your pregnancy progress, and what's happening at this stage — all calculated by the same gestational-age method your provider uses.",
  reviewedDate: '2026-06-27',

  faqs: [
    {
      question: 'When does each trimester start and end?',
      answer:
        'The first trimester runs from week 1 through week 13 (days 1–91 from LMP). The second trimester spans weeks 14–27 (days 92–189). The third trimester begins at week 28 and ends at birth, typically around weeks 39–40. These boundaries reflect standard clinical definitions used in the United States.',
    },
    {
      question: 'How do doctors count pregnancy weeks?',
      answer:
        'Doctors count from the first day of your last menstrual period (LMP), even though conception occurs about 2 weeks later. This is called gestational age. It may seem counterintuitive — at 4 weeks pregnant by this count, the embryo is actually only about 2 weeks old. But counting from LMP provides a consistent reference point your provider uses across your care.',
    },
    {
      question: "What's the difference between gestational age and fetal age?",
      answer:
        "Gestational age counts from the LMP and is the standard used in prenatal care. At 10 weeks gestational age, your baby is approximately 8 weeks old (fetal age). For clinical purposes — scheduling tests, interpreting ultrasound measurements, understanding guidelines — always use gestational age, since that's what your provider and medical references use.",
    },
    {
      question: "I don't know my LMP — can I still use this tool?",
      answer:
        "Yes! Enter your estimated due date (EDD) instead, and the tool will calculate backwards to find your gestational age. If you're unsure of your EDD, your provider can give you one after an ultrasound. A first-trimester ultrasound measurement is more accurate than LMP for dating if you have irregular cycles.",
    },
    {
      question: 'What is "quickening," and when will I feel it?',
      answer:
        'Quickening is the first time you feel your baby move. For first-time parents, it typically occurs between weeks 18–22. For those who have been pregnant before, it can be felt as early as weeks 16–18. Early movements are often described as flutters, bubbles, or gentle taps. Movement generally becomes more consistent and obvious as the second trimester progresses.',
    },
    {
      question: 'When should I schedule my first prenatal appointment?',
      answer:
        'Most providers recommend your first prenatal visit at 8–10 weeks. This allows time for initial blood work, urine testing, and a dating ultrasound if needed. Some practices do an earlier "viability scan" around 6–8 weeks. If you have a history of pregnancy complications or fertility treatment, your provider may see you earlier.',
    },
  ],

  related: [
    { href: '/tools/due-date-calculator/', label: 'Due Date Calculator', description: 'Calculate your estimated due date from LMP or IVF.' },
    { href: '/tools/ovulation-fertility-window/', label: 'Ovulation Calculator', description: "Find your fertile window if you're trying to conceive." },
  ],

  sources: [
    { label: 'ACOG Committee Opinion 700 — Methods for Estimating the Due Date', url: 'https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date' },
    { label: 'ACOG FAQ — How Your Baby Grows During Pregnancy', url: 'https://www.acog.org/womens-health/faqs/how-your-baby-grows-during-pregnancy' },
    { label: 'MedlinePlus — Fetal Development', url: 'https://medlineplus.gov/ency/article/002398.htm' },
    { label: 'ACOG FAQ — Prenatal Genetic Screening Tests', url: 'https://www.acog.org/womens-health/faqs/prenatal-genetic-screening-tests' },
  ],

  contentHtml: `
    <h2>How pregnancy weeks are counted</h2>
    <p>
      In prenatal medicine, pregnancy is measured in <strong>gestational age</strong>, counted from the
      first day of your last menstrual period (LMP) — even though conception happens about two weeks later.
      This convention exists because the LMP is a concrete, observable date, while the exact day of ovulation
      and fertilization is rarely known precisely. Your provider, ultrasound technician, and all prenatal
      screening guidelines use gestational age by default.
    </p>
    <p>
      For example, at "4 weeks pregnant" (gestational age), the embryo itself is approximately 2 weeks old
      — but your provider will always refer to you as 4 weeks along. This is consistent with how prenatal
      care guidelines, screening windows, and fetal development charts are written.
    </p>

    <h2>Gestational age vs. fetal age</h2>
    <p>
      <strong>Gestational age</strong> counts from the LMP and is the universal clinical standard.
      <strong>Fetal age</strong> (or embryonic age) counts from fertilization and is approximately
      two weeks less. When you see development descriptions in books or online — "at 8 weeks, the
      heart has four chambers" — these may use fetal age; always clarify which reference is being used
      to avoid confusion.
    </p>
    <p>
      For all discussions with your healthcare provider, use gestational age. When reading fetal
      development content, check whether weeks are counted from LMP or from conception.
    </p>

    <h2>First trimester: weeks 1–13</h2>
    <p>
      The first trimester is a period of rapid, foundational development. By the end of the first
      trimester, the embryo has become a fetus with all major organ systems established, a beating heart,
      and the beginnings of all limbs and facial features. The placenta has fully formed and taken over
      hormone production from the corpus luteum.
    </p>
    <p>
      Common first-trimester experiences include nausea and vomiting (affecting 70–80% of pregnancies),
      fatigue, breast tenderness, frequent urination, and heightened sensitivity to smells. Most of these
      symptoms begin to improve by weeks 12–14.
    </p>
    <p>
      <strong>Key first-trimester appointments:</strong> First prenatal visit (weeks 8–10); first-trimester
      screening including nuchal translucency ultrasound and blood draw (weeks 11–13); possible cell-free
      DNA (cfDNA) testing starting at week 10.
    </p>

    <h2>Second trimester: weeks 14–27</h2>
    <p>
      The second trimester is often the most comfortable phase. As the placenta fully takes over and
      hormones stabilize, nausea typically fades, energy returns, and the visible pregnancy bump appears.
      The fetus grows from about 3 inches and 1 ounce at week 14 to roughly 14 inches and 2 pounds by
      week 27.
    </p>
    <p>
      Around weeks 18–22, most parents feel fetal movement for the first time. The anatomy scan —
      a detailed ultrasound checking fetal growth, organ development, and placental position —
      is scheduled in this window. If you're having genetic testing, second-trimester quad screen
      results are typically reported in this period.
    </p>
    <p>
      <strong>Key second-trimester appointments:</strong> Anatomy scan (weeks 18–22); quad screen
      if elected (weeks 15–20); glucose challenge test (weeks 24–28).
    </p>

    <h2>Third trimester: weeks 28–40+</h2>
    <p>
      In the third trimester, your baby gains most of their body weight and the lungs begin producing
      surfactant — the substance essential for breathing after birth. By week 37, a baby is considered
      "early term." By week 39, the brain, lungs, and liver are more fully mature — this is "full term."
    </p>
    <p>
      Prenatal visits become more frequent (every two weeks from weeks 28–36, then weekly from week 36).
      Your provider will discuss your birth preferences, check for signs of preeclampsia, and monitor
      the baby's position.
    </p>
    <p>
      <strong>Key third-trimester appointments:</strong> Biweekly visits (weeks 28–36);
      Group B Strep test (weeks 35–37); weekly visits (week 36 onward); non-stress tests
      if indicated; discussion of induction if approaching 41–42 weeks.
    </p>
  `,
};

export default copy;
