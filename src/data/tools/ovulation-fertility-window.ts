import type { ToolCopy } from './_types';

const copy: ToolCopy = {
  title: 'Ovulation Calculator: Find Your Fertile Window | Sage & Sprout',
  description:
    'Free ovulation calculator. Find your fertile window, ovulation day, and the best days to conceive based on your last period and cycle length.',
  path: '/tools/ovulation-fertility-window/',
  breadcrumb: 'Ovulation Calculator',
  headline: 'Ovulation & Fertility Window Calculator',
  hook:
    'Enter the first day of your last period and your average cycle length to calculate your estimated ovulation date, six-day fertile window, and when to start using an ovulation predictor kit (OPK). All based on the 14-day luteal phase used in clinical reproductive medicine.',
  reviewedDate: '2026-06-27',

  faqs: [
    {
      question: 'How accurate is this ovulation calculator?',
      answer:
        "This calculator provides an estimate based on the average 14-day luteal phase, the time between ovulation and the next period. For people with regular cycles, it's a reliable starting point. However, ovulation can vary cycle to cycle, especially with stress, illness, travel, or hormonal changes. For the most accurate tracking, combine this calculator with ovulation predictor kits (OPKs) or basal body temperature charting.",
    },
    {
      question: 'What is the fertile window?',
      answer:
        'The fertile window is the span of days in each cycle when pregnancy is possible. It spans roughly 6 days: the 5 days before ovulation and the day of ovulation itself. Sperm can survive in the female reproductive tract for up to 5 days, while a released egg survives only 12–24 hours. The highest probability of conception comes from intercourse 1–2 days before ovulation or on the day of ovulation.',
    },
    {
      question: 'When is the best time to try to get pregnant?',
      answer:
        "The highest pregnancy rates per cycle come from intercourse on the day before ovulation and the day of ovulation. Having intercourse every 1–2 days throughout the fertile window maximizes the chance of sperm being present when the egg is released. ASRM guidelines suggest couples trying to conceive don't need to restrict intercourse to specific days; regular intercourse (2–3 times per week) throughout the cycle is also effective.",
    },
    {
      question: 'What are signs that I am ovulating?',
      answer:
        'Physical signs of ovulation include a change in cervical mucus (becoming clear, slippery, and stretchy), mild one-sided pelvic pain (Mittelschmerz), a slight rise in basal body temperature (0.2–0.5°F) after ovulation, and a positive result on an ovulation predictor kit (OPK), which detects the LH surge that occurs 24–36 hours before ovulation.',
    },
    {
      question: 'My cycle is irregular. Can I still use this calculator?',
      answer:
        "If your cycles vary significantly from month to month, the calculator's prediction will be less precise. In that case, tracking basal body temperature, cervical mucus changes, or using OPKs throughout the cycle will give you more accurate real-time information. If you have very irregular cycles (periods more than 35 days apart or fewer than 21 days), it may be worth talking to your provider, as this can indicate hormonal imbalances like PCOS that affect fertility.",
    },
    {
      question: 'When should I see a fertility specialist?',
      answer:
        "ASRM recommends evaluation by a reproductive specialist if you've been trying to conceive for 12 months with regular unprotected intercourse (or 6 months if you're over 35). Seek evaluation sooner if you have a history of irregular periods, previous pelvic surgeries, known reproductive conditions, or have had multiple miscarriages. A specialist can assess both partners and discuss options such as fertility monitoring, medications to induce ovulation, IUI, or IVF.",
    },
  ],

  related: [
    { href: '/tools/due-date-calculator/', label: 'Due Date Calculator', description: 'Got a positive test? Calculate your due date.' },
    { href: '/tools/how-many-weeks-pregnant/', label: 'How Many Weeks Pregnant', description: 'See your current week and trimester.' },
  ],

  sources: [
    { label: 'ASRM: Optimizing Natural Fertility (2017)', url: 'https://www.asrm.org/news-and-publications/practice-guidelines/practice-guidelines-and-technical-bulletins/optimizing-natural-fertility/' },
    { label: 'ACOG FAQ: Fertility Awareness–Based Methods of Family Planning', url: 'https://www.acog.org/womens-health/faqs/fertility-awareness-based-methods-of-family-planning' },
    { label: 'Wilcox AJ et al. Timing of Sexual Intercourse in Relation to Ovulation (NEJM, 1995)', url: 'https://www.nejm.org/doi/full/10.1056/nejm199512073332301' },
    { label: 'MedlinePlus: Fertility', url: 'https://medlineplus.gov/fertility.html' },
  ],

  contentHtml: `
    <h2>Understanding your menstrual cycle</h2>
    <p>
      A typical menstrual cycle lasts between 21 and 35 days, with 28 days being the average. Each cycle
      begins on the first day of your period and ends the day before your next period starts.
      The cycle has two main phases:
    </p>
    <ul>
      <li>
        <strong>Follicular phase (days 1–13 in a 28-day cycle):</strong> Begins with menstruation.
        Follicle-stimulating hormone (FSH) prompts multiple follicles in the ovaries to develop,
        though usually only one becomes dominant. Rising estrogen causes the uterine lining to thicken.
        This phase varies in length, which is the main reason cycle length differs between people.
      </li>
      <li>
        <strong>Luteal phase (days 15–28):</strong> Begins after ovulation. The ruptured follicle becomes
        the corpus luteum, which produces progesterone to maintain the uterine lining. This phase is
        remarkably consistent at approximately 14 days in most people. If fertilization does not occur,
        the corpus luteum regresses, progesterone drops, and menstruation begins.
      </li>
    </ul>

    <h2>When does ovulation occur?</h2>
    <p>
      Ovulation, the release of a mature egg from the dominant follicle, is triggered by a surge
      in luteinizing hormone (LH). This LH surge typically occurs 24–36 hours before ovulation.
      Because the luteal phase is consistently ~14 days, ovulation occurs approximately
      <strong>14 days before the start of your next period</strong>, not necessarily on day 14
      of your cycle.
    </p>
    <p>
      For a 28-day cycle: ovulation ≈ day 14. For a 32-day cycle: ovulation ≈ day 18.
      For a 24-day cycle: ovulation ≈ day 10. This calculator uses your cycle length to
      estimate your individual ovulation day.
    </p>

    <h2>The fertile window: what it is and how to use it</h2>
    <p>
      The fertile window is approximately <strong>six days long</strong>: the five days leading
      up to ovulation and the day of ovulation itself. This window exists because sperm can survive
      in the female reproductive tract for up to five days under favorable conditions, while the
      egg remains viable for only 12–24 hours after release.
    </p>
    <p>
      Research published in the <em>New England Journal of Medicine</em> (Wilcox et al., 1995)
      found that the highest probability of conception came from intercourse <strong>one or two days
      before ovulation</strong>. Intercourse on the day of ovulation also carries a high probability.
      The probability of conception drops sharply after ovulation day.
    </p>

    <h2>How to detect ovulation at home</h2>
    <p>
      <strong>Ovulation predictor kits (OPKs)</strong> detect the LH surge in urine 24–36 hours before
      ovulation. Start testing a few days before your estimated ovulation date (we show this as your
      "test start" date). A positive OPK means ovulation is likely within the next 24–36 hours.
    </p>
    <p>
      <strong>Basal body temperature (BBT)</strong> tracking involves taking your temperature each morning
      before getting out of bed. After ovulation, progesterone causes a sustained temperature rise of
      0.2–0.5°F (0.1–0.3°C). This confirms ovulation has already occurred and, over several cycles,
      can help predict your pattern.
    </p>
    <p>
      <strong>Cervical mucus monitoring:</strong> In the days approaching ovulation, cervical mucus
      becomes increasingly clear, slippery, and stretchy, resembling raw egg whites. This is called
      "spinnbarkeit." Its presence is a sign of peak fertility. After ovulation, mucus typically
      becomes thicker and less abundant.
    </p>

    <h2>When to seek help</h2>
    <p>
      ASRM recommends evaluation if you've been trying to conceive for <strong>12 months</strong>
      (or <strong>6 months</strong> if you are 35 or older) with regular, unprotected intercourse.
      Seek evaluation sooner if you have irregular cycles, a history of pelvic inflammatory disease,
      prior surgeries, or other risk factors. Both partners should be evaluated, since male factor
      contributes to infertility in about 40–50% of cases.
    </p>
  `,
};

export default copy;
