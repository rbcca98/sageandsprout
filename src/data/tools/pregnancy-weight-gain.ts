import type { ToolCopy } from './_types';

const copy: ToolCopy = {
  title: 'Pregnancy Weight Gain Calculator: IOM Guidelines by BMI | Sage & Sprout',
  description:
    'See your healthy pregnancy weight gain range by pre-pregnancy BMI and week, per IOM/NASEM guidelines. Singleton or twins. Free, no sign-up.',
  path: '/tools/pregnancy-weight-gain/',
  breadcrumb: 'Pregnancy Weight Gain Calculator',
  headline: 'Pregnancy Weight Gain Calculator',
  hook:
    'Enter your pre-pregnancy height and weight to get your personalized IOM-recommended weight gain range, broken down by trimester and adjusted for twins. The calculations follow the 2009 Institute of Medicine guidelines adopted by ACOG.',
  reviewedDate: '2025-01-15',

  faqs: [
    {
      question: 'How much weight should I gain during pregnancy?',
      answer:
        'The IOM recommends 25–35 lb for women with a normal BMI (18.5–24.9), 28–40 lb for underweight, 15–25 lb for overweight, and 11–20 lb for obese. These are total pregnancy guidelines, and your provider may adjust them based on individual factors.',
    },
    {
      question: 'Does the recommendation change for twins?',
      answer:
        'Yes. Twin pregnancies have higher recommended gains: 37–54 lb for normal BMI, 31–50 lb for overweight, and 25–42 lb for obese. Underweight women carrying twins may be advised to gain 50–62 lb.',
    },
    {
      question: 'What is BMI and how is it calculated?',
      answer:
        'BMI (Body Mass Index) is weight in kilograms divided by height in meters squared. It is used to estimate whether pre-pregnancy weight is in a healthy range. BMI is a screening tool, not a diagnostic one, and your provider looks at your full health picture.',
    },
    {
      question: 'How quickly should I gain weight in each trimester?',
      answer:
        'In the first trimester, most women gain only 1–4 lb total. In the second and third trimesters, the IOM recommends approximately 0.8–1.0 lb/week for normal-weight women, 0.5–0.7 lb/week for overweight, and 0.4–0.6 lb/week for obese. Weight gain is often uneven week to week.',
    },
    {
      question: 'What happens if I gain too much or too little?',
      answer:
        'Gaining more than recommended is associated with gestational diabetes, large-for-gestational-age babies, and difficulty losing weight postpartum. Gaining too little is linked to preterm birth and low birth weight. Both ends of the spectrum call for a conversation with your provider, since individual circumstances vary.',
    },
    {
      question: 'Does the calculator use pre-pregnancy weight or current weight?',
      answer:
        'Enter your pre-pregnancy weight and height. BMI is calculated from these values, not your current pregnancy weight, in line with IOM/NASEM 2009 guidelines.',
    },
  ],

  related: [
    { href: '/tools/due-date-calculator/', label: 'Due Date Calculator', description: 'Find your EDD from LMP, conception, or IVF transfer' },
    { href: '/tools/how-many-weeks-pregnant/', label: 'How Many Weeks Pregnant', description: 'See your exact gestational age and trimester' },
  ],

  sources: [
    { label: 'IOM/NASEM (2009). Weight Gain During Pregnancy: Reexamining the Guidelines. National Academies Press.', url: 'https://www.ncbi.nlm.nih.gov/books/NBK32813/' },
    { label: 'ACOG Practice Bulletin #156 (2015). Obesity in Pregnancy.', url: 'https://www.acog.org/clinical/clinical-guidance/practice-bulletin/articles/2015/12/obesity-in-pregnancy' },
    { label: 'CDC. Gestational Weight Gain.', url: 'https://www.cdc.gov/reproductivehealth/maternalinfanthealth/pregnancy-weight-gain.htm' },
  ],

  contentHtml: `
    <h2>What the IOM pregnancy weight gain guidelines mean for you</h2>
    <p>
      In 2009, the Institute of Medicine (now the National Academy of Medicine) published updated guidelines for weight gain during pregnancy. They are the standard used by ACOG and virtually every US obstetric provider. The guidelines divide women into four categories based on pre-pregnancy BMI and give a recommended total gain range plus a weekly rate for the second and third trimesters.
    </p>
    <p>
      These recommendations exist because both too much and too little weight gain carry real risks. Gaining too little is associated with preterm birth, low birth weight, and impaired fetal growth. Gaining too much increases the risk of gestational diabetes, preeclampsia, cesarean delivery, and postpartum weight retention. Staying within the recommended range is one of the most modifiable factors for a healthy pregnancy outcome.
    </p>

    <h2>How BMI determines your target</h2>
    <p>
      BMI is calculated from your <em>pre-pregnancy</em> weight and height, not your weight at any point during pregnancy. The four categories and their recommended total gains for singleton pregnancies are:
    </p>
    <ul>
      <li><strong>Underweight (BMI &lt; 18.5):</strong> 28–40 lb, ~0.8–1.3 lb/week in T2/T3</li>
      <li><strong>Normal weight (BMI 18.5–24.9):</strong> 25–35 lb, ~0.8–1.0 lb/week</li>
      <li><strong>Overweight (BMI 25–29.9):</strong> 15–25 lb, ~0.5–0.7 lb/week</li>
      <li><strong>Obese (BMI ≥ 30):</strong> 11–20 lb, ~0.4–0.6 lb/week</li>
    </ul>
    <p>
      BMI is a screening metric, not a perfect measure of health. Your provider considers your full medical history, nutritional status, activity level, and individual risk factors when counseling you on weight gain. These numbers are a starting point for that conversation, not a strict prescription.
    </p>

    <h2>First trimester: why weight gain is minimal</h2>
    <p>
      In the first trimester, average total weight gain is only 1–4 lb for most women. This is normal. The embryo and early placenta are tiny, and your blood volume has not yet expanded substantially. Some women lose weight in the first trimester due to nausea. What matters most in the first trimester is adequate nutrition (folate, iron, and protein) rather than a specific number on the scale.
    </p>

    <h2>Second and third trimesters: when gain accelerates</h2>
    <p>
      From about week 14 onward, the fetus grows rapidly and weight gain accelerates. The weekly rate recommendations from the IOM apply to these later trimesters. Week-to-week variation is completely normal: some weeks you gain more, some less. What matters is the overall trajectory over several weeks, which is why your provider weighs you at each visit rather than tracking daily.
    </p>
    <p>
      Around 60% of the total recommended weight gain goes to maternal body changes (blood volume expansion, breast tissue, amniotic fluid, placenta, fat stores for breastfeeding) and about 40% to the baby and placenta directly.
    </p>

    <h2>Where the weight goes</h2>
    <p>For a typical pregnancy with 30 lb total gain, the approximate distribution is:</p>
    <ul>
      <li>Baby: 7–8 lb</li>
      <li>Placenta: 1.5 lb</li>
      <li>Amniotic fluid: 2 lb</li>
      <li>Uterine growth: 2 lb</li>
      <li>Breast tissue: 2 lb</li>
      <li>Blood volume increase: 4 lb</li>
      <li>Fluid retention: 4 lb</li>
      <li>Maternal fat stores: 7 lb</li>
    </ul>
    <p>
      Those fat stores are not "excess" weight. They are physiologically normal and support breastfeeding. Most women lose a significant portion of pregnancy weight in the first 6–8 weeks postpartum as fluids normalize, with the rest following over months.
    </p>

    <h2>Twin pregnancies: higher targets</h2>
    <p>
      Carrying twins requires more weight gain to support two babies, a larger placenta, and more amniotic fluid. The IOM 2009 report provides separate recommendations for twin gestations, which the calculator uses automatically when you select "Twins." Triplet and higher-order multiple pregnancies fall outside the IOM framework, so discuss specific targets with your maternal-fetal medicine specialist.
    </p>

    <h2>When to talk to your provider</h2>
    <p>
      If you are consistently gaining above or below the weekly rate, or if you have a sudden sharp increase (which can signal fluid retention or preeclampsia), contact your provider. Pregnancy nutrition is nuanced. An obese woman with gestational diabetes may have a different target than the IOM charts suggest, and an underweight woman with hyperemesis may be counseled differently as well. Use this calculator to prepare informed questions for your prenatal visits, not as a substitute for them.
    </p>
  `,
};

export default copy;
