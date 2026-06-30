import type { ToolCopy } from './_types';

const copy: ToolCopy = {
  title: 'Maternity Leave Planner: FMLA + State Paid Leave Calculator | Sage & Sprout',
  description:
    'Plan US maternity leave with FMLA and state paid-leave rules. See protected weeks, paid weeks, and your return-to-work date. Free planner.',
  path: '/tools/maternity-leave-planner/',
  breadcrumb: 'Maternity Leave Planner',
  headline: 'Maternity Leave Planner',
  hook:
    "Plan your maternity or parental leave by entering your due date, last workday, FMLA eligibility, and state. Get a personalized timeline showing paid weeks, FMLA-protected weeks, and your estimated return-to-work date, including your state's paid family leave program details.",
  reviewedDate: '2025-01-15',
  medical: false,

  faqs: [
    {
      question: 'Who is eligible for FMLA?',
      answer:
        'You are covered by the Family and Medical Leave Act (FMLA) if you have worked for your employer for at least 12 months, worked at least 1,250 hours in the past 12 months, and your employer has at least 50 employees within 75 miles of your worksite. FMLA provides 12 weeks of job-protected, unpaid leave for childbirth, adoption, or serious health conditions.',
    },
    {
      question: 'What is the difference between FMLA and paid family leave?',
      answer:
        'FMLA (federal law) provides job protection for up to 12 weeks but does not require pay. Paid family leave (PFL) programs, either from your employer or your state, provide partial income replacement during leave. Thirteen states plus DC currently have state-mandated paid family leave programs. FMLA and state PFL typically run concurrently.',
    },
    {
      question: 'Can my employer require me to use PTO during FMLA?',
      answer:
        'Yes. Under FMLA, your employer may require you to use available paid leave (vacation, sick, PTO) concurrently with FMLA leave. This does not extend the total protected leave period. It just means you receive pay during weeks that are already covered by FMLA.',
    },
    {
      question: 'Does my partner also get leave?',
      answer:
        'Under FMLA, both parents are eligible (separately) for 12 weeks of leave after birth or adoption, as long as both meet eligibility requirements. However, if both parents work for the same employer, that employer may limit combined FMLA leave to 12 weeks total. State paid leave programs vary. Some cover both parents equally, others have specific rules.',
    },
    {
      question: 'What if I have a C-section or pregnancy complications?',
      answer:
        'If your pregnancy is deemed a serious health condition, FMLA may begin before your due date. Many women with C-sections need 6–8 weeks of physical recovery (vs. 4–6 weeks for vaginal delivery). Short-term disability insurance, if available, often covers the physical recovery period. Check with your HR department.',
    },
    {
      question: 'When should I notify my employer about leave?',
      answer:
        "FMLA requires 30 days' advance notice when leave is foreseeable (planned C-section, induction). For unexpected leave (early delivery), notify as soon as practical. Many employers ask for a formal leave request 60–90 days before your due date. Early communication also allows time to arrange coverage and avoid a difficult departure.",
    },
  ],

  related: [
    { href: '/tools/due-date-calculator/', label: 'Due Date Calculator', description: 'Find your EDD from LMP, conception, or IVF transfer' },
    { href: '/tools/pregnancy-weight-gain/', label: 'Pregnancy Weight Gain', description: 'IOM-based weight gain target by BMI' },
  ],

  sources: [
    { label: 'US DOL. Family and Medical Leave Act (FMLA). 29 CFR Part 825.', url: 'https://www.dol.gov/agencies/whd/fmla' },
    { label: 'National Conference of State Legislatures. State Family and Medical Leave Laws.', url: 'https://www.ncsl.org/labor-and-employment/state-family-and-medical-leave-laws' },
    { label: 'US DOL. Fact Sheet #28: The Family and Medical Leave Act.', url: 'https://www.dol.gov/agencies/whd/fact-sheets/28-fmla' },
  ],

  contentHtml: `
    <h2>Understanding your US maternity leave rights</h2>
    <p>
      The United States does not have a federal paid family leave program. What you receive depends on three things: federal law (FMLA), your state's paid family leave program (if any), and your employer's own leave policy. Planning maternity leave requires understanding all three.
    </p>

    <h2>FMLA: the federal baseline</h2>
    <p>
      The Family and Medical Leave Act (FMLA), administered by the US Department of Labor, entitles eligible employees to 12 weeks of unpaid, job-protected leave per year for childbirth, adoption, or a serious health condition (including pregnancy-related conditions). "Job-protected" means your employer must return you to the same or an equivalent position when you return.
    </p>
    <p>
      FMLA eligibility requires: (1) at least 12 months of employment with the same employer, (2) at least 1,250 hours worked in the previous 12 months, and (3) your worksite must have at least 50 employees within a 75-mile radius. If you do not meet these criteria, you have no federal FMLA protection, though your employer may have its own leave policy.
    </p>

    <h2>State paid family leave programs</h2>
    <p>
      Thirteen states and Washington DC have enacted paid family leave programs that provide partial wage replacement during leave: California, Colorado, Connecticut, Delaware, Maryland, Massachusetts, Minnesota, New Jersey, New York, Oregon, Rhode Island, and Washington. These programs are typically funded through small payroll deductions and replace 60–100% of wages for 8–12 weeks. Most state PFL programs run concurrently with FMLA rather than extending total leave.
    </p>

    <h2>Short-term disability and employer benefits</h2>
    <p>
      Short-term disability (STD) insurance, if offered by your employer or purchased individually, can cover the physical recovery period from childbirth, typically 6 weeks for vaginal delivery and 8 weeks for cesarean section. STD runs concurrently with FMLA. Beyond the physical recovery, parental leave (bonding time with the new baby) may be covered separately by employer parental leave policy.
    </p>
    <p>
      Review your employer's specific policies well before your due date. Many companies offer paid parental leave that exceeds FMLA, and some allow combining STD, parental leave, and PTO to extend paid time.
    </p>

    <h2>How to plan your leave</h2>
    <p>
      Best practices for leave planning:
    </p>
    <ul>
      <li><strong>6+ months before due date:</strong> Review your employer's leave handbook; identify HR contact; check state PFL eligibility; confirm FMLA eligibility with HR</li>
      <li><strong>3 months before:</strong> Submit formal leave request; document what paid sources you can stack (STD + state PFL + PTO + parental leave); plan transition of your work</li>
      <li><strong>30 days before:</strong> Submit FMLA paperwork (typically requires your OB/midwife to complete a certification form)</li>
      <li><strong>First week of leave:</strong> File state PFL claim if applicable (many states require you to file within days of leave start)</li>
      <li><strong>6 weeks before return:</strong> Confirm return date in writing; discuss any flexible return options</li>
    </ul>

    <h2>What "concurrently" means</h2>
    <p>
      FMLA and paid leave (state PFL or employer-paid leave) typically run at the same time, not sequentially. For example, if you have 6 weeks of paid parental leave from your employer and are FMLA-eligible, your 6 weeks of paid leave are also counted as FMLA leave, so after 6 paid weeks, you have 6 more weeks of FMLA protection (unpaid). You do not get 6 paid weeks plus 12 FMLA weeks for 18 weeks total. Understanding this concurrent structure is key to planning.
    </p>
  `,
};

export default copy;
