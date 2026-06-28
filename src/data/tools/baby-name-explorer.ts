import type { ToolCopy } from './_types';

const copy: ToolCopy = {
  title: 'Baby Name Explorer: Top Names with Meaning & Origin (2023 SSA Data) | Sage & Sprout',
  description:
    'Search top baby names with meaning, origin, and 2023 SSA popularity rank. Filter by sex and popularity tier. Browse top 10 to top 100 boy and girl names.',
  path: '/tools/baby-name-explorer/',
  breadcrumb: 'Baby Name Explorer',
  headline: 'Baby Name Explorer',
  hook:
    'Browse and search the top 100 baby names for boys and girls with meaning, origin, and 2023 popularity rank from SSA data. Filter by sex, popularity tier, or search by letter to find the perfect name.',
  reviewedDate: '2025-01-15',
  category: 'LifestyleApplication',
  medical: false,

  faqs: [
    {
      question: 'Where does the popularity data come from?',
      answer:
        'Popularity ranks are based on the Social Security Administration (SSA) national name data for 2023, the most recent year available. The SSA publishes data on every name given to at least 5 babies in the United States each year, making it the most comprehensive source for US baby name popularity.',
    },
    {
      question: 'What does "Top 10" or "Top 50" mean?',
      answer:
        "The popularity tier reflects the name's rank in the SSA 2023 national dataset. \"Top 10\" means the name was among the 10 most popular names for that sex. \"Top 100\" means it ranked within the 100 most popular. Top-100 names are used by a much higher percentage of babies than the raw rank suggests: Liam (#1) was given to roughly 20,000 boys in 2023.",
    },
    {
      question: 'Are these names only for one sex?',
      answer:
        'This explorer shows names by the sex they appear in the SSA data under. Many names (like Riley, Jordan, Avery) appear in top rankings for both boys and girls. The filter lets you view boys, girls, or all names together.',
    },
    {
      question: 'How reliable are name meanings and origins?',
      answer:
        'Name etymology can be complex and sometimes contested. A name may have multiple origin stories depending on the culture and time period. The meanings shown are the most commonly cited derivations. For deep historical research, resources like the Oxford Dictionary of First Names provide more nuanced scholarship.',
    },
    {
      question: 'How do I pick a name that will age well?',
      answer:
        'Names near the top of the popularity charts have a higher chance of sharing with classmates but tend to feel timeless. Names in the 50–200 range offer a balance of recognizability without being overused. Very unique names (outside the top 1,000) may require constant repetition and correction. Also consider initials (avoid embarrassing acronyms), how the name sounds with your last name, and potential nicknames.',
    },
  ],

  related: [
    { href: '/tools/due-date-calculator/', label: 'Due Date Calculator', description: 'Find your EDD from LMP, conception, or IVF transfer' },
    { href: '/tools/maternity-leave-planner/', label: 'Maternity Leave Planner', description: 'FMLA + state paid leave timeline' },
  ],

  sources: [
    { label: 'Social Security Administration. Popular Baby Names. 2023 National Data.', url: 'https://www.ssa.gov/oact/babynames/' },
    { label: 'Behind the Name: Etymology and History of First Names.', url: 'https://www.behindthename.com' },
  ],

  contentHtml: `
    <h2>How baby name trends work in the US</h2>
    <p>
      Every year, the Social Security Administration publishes a count of every name given to at least 5 babies in the United States, drawn from Social Security card applications. This dataset is the most comprehensive view of US baby name trends available. The most popular names in any given year account for a substantial fraction of all births. In 2023, the top 10 names for each sex together accounted for roughly 8% of all births.
    </p>
    <p>
      Name popularity cycles over roughly 20–30 year intervals, so names popular with grandparents often feel fresh for grandchildren (hence the resurgence of Henry, Eleanor, Violet, and Theodore). Names popular in the 1980s and 1990s (Jennifer, Jessica, Jason, Justin) tend to feel dated to current parents and are unlikely to return to the top 20 for another decade or more.
    </p>

    <h2>What makes a name timeless vs. trendy?</h2>
    <p>
      Names tend to fall into a few categories:
    </p>
    <ul>
      <li><strong>Classic names</strong> rarely leave the top 100 over decades: James, William, Elizabeth, Emma. These feel safe and universally recognized.</li>
      <li><strong>Revived classics</strong> had long breaks from popularity: Theodore, Hazel, Eleanor, Ezra. These feel fresh without being invented.</li>
      <li><strong>Trend names</strong> spike quickly and drop: Nevaeh peaked around 2010 and has been declining. Brayden, Jayden, Kayden are on a similar arc.</li>
      <li><strong>Nature/word names</strong> are growing: Ivy, Willow, Juniper, River, Atlas, Sage. These feel modern and meaningful without being made-up.</li>
    </ul>

    <h2>Practical tips for choosing a name</h2>
    <p>
      <strong>Say it out loud.</strong> A name that looks elegant on paper can be awkward to say with your surname, or may sound like something unintended. Say it fast, say it loudly ("Dinner's ready, [name]!"), say it with your last name.
    </p>
    <p>
      <strong>Check the initials.</strong> The full name's initials spelled out together matter, especially on personalized items or monograms.
    </p>
    <p>
      <strong>Consider nicknames.</strong> Even if you never plan to use a nickname, others will: teachers, coaches, friends. What are the natural shortenings of the name? Are you comfortable with those?
    </p>
    <p>
      <strong>Think about the future adult.</strong> The name will belong to a job applicant, a future partner, a professional. Does it work in all those contexts?
    </p>
    <p>
      <strong>Check its spelling burden.</strong> Highly creative spellings of common names (Katelynne, Jaxxen) may feel individualized but saddle the child with a lifetime of corrections. Consider using the standard spelling with a unique middle name instead.
    </p>

    <h2>Middle names and family names</h2>
    <p>
      Middle names give room to honor family members or use a name you love but wouldn't use as a first name. A one-syllable middle name works well after a long first name; a longer middle name flows better after a short first name. Many families use the middle name slot for a family surname or grandparent's name, giving the child a connection to heritage without that name being their everyday name.
    </p>
  `,
};

export default copy;
