/**
 * "How many weeks pregnant am I?" calculation logic.
 * Gestational age is counted from LMP per ACOG convention.
 */

export interface WeeksInputs {
  lmp?: string;   // ISO date – the LMP
  edd?: string;   // ISO date – if user knows EDD instead
}

export interface WeeksResult {
  weeksComplete: number;
  daysRemainder: number;
  totalDays: number;
  trimester: 1 | 2 | 3 | 0;  // 0 = not yet pregnant / pre-LMP
  trimesterLabel: string;
  percentComplete: number;
  daysRemaining: number;
  edd: Date;
  gestAgeLabel: string;
  trimesterBlurb: string;
  nextMilestone: { label: string; weeksGA: number; daysLeft: number } | null;
}

const MILESTONES = [
  { label: 'End of first trimester', weeksGA: 13 },
  { label: 'Anatomy scan window', weeksGA: 20 },
  { label: 'Viability threshold', weeksGA: 24 },
  { label: 'Third trimester begins', weeksGA: 28 },
  { label: 'Full term (39 weeks)', weeksGA: 39 },
  { label: 'Estimated due date', weeksGA: 40 },
];

const TRIMESTER_BLURBS: Record<1 | 2 | 3, string> = {
  1: "Major organs, the neural tube, and your baby's facial features are forming. Many parents experience nausea and fatigue. Most miscarriages occur in this period, so many wait until week 12–13 to share news.",
  2: "Often called the 'honeymoon trimester'—energy typically returns and morning sickness eases. You may feel fetal movement (quickening) for the first time around weeks 18–22. Your provider will offer a detailed anatomy ultrasound around week 20.",
  3: "Your baby is gaining weight rapidly and the lungs are maturing. Prenatal visits become more frequent. 'Full term' begins at 39 weeks. Labor may begin anywhere from week 37 onward.",
};

export function calculateWeeksPregnant(inputs: WeeksInputs): WeeksResult | null {
  let lmpDate: Date;

  if (inputs.lmp) {
    lmpDate = new Date(inputs.lmp);
    if (isNaN(lmpDate.getTime())) return null;
  } else if (inputs.edd) {
    const edd = new Date(inputs.edd);
    if (isNaN(edd.getTime())) return null;
    // LMP = EDD - 280 days
    lmpDate = new Date(edd.getTime() - 280 * 86_400_000);
  } else {
    return null;
  }

  lmpDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const totalDays = Math.floor((today.getTime() - lmpDate.getTime()) / 86_400_000);
  const weeksComplete = Math.floor(totalDays / 7);
  const daysRemainder = totalDays % 7;

  const edd = new Date(lmpDate.getTime() + 280 * 86_400_000);
  const daysRemaining = Math.round((edd.getTime() - today.getTime()) / 86_400_000);

  const trimester: 1 | 2 | 3 | 0 =
    totalDays < 0 ? 0
    : weeksComplete < 14 ? 1
    : weeksComplete < 28 ? 2
    : 3;

  const trimesterLabel =
    trimester === 0 ? 'Not yet pregnant'
    : trimester === 1 ? 'First Trimester'
    : trimester === 2 ? 'Second Trimester'
    : 'Third Trimester';

  const percentComplete = Math.max(0, Math.min(100, Math.round((totalDays / 280) * 100)));

  const gestAgeLabel =
    totalDays < 0
      ? 'Your LMP has not occurred yet'
      : `${weeksComplete} weeks and ${daysRemainder} day${daysRemainder !== 1 ? 's' : ''} pregnant`;

  const trimesterBlurb = (trimester === 0 || trimester === undefined)
    ? ''
    : TRIMESTER_BLURBS[trimester as 1 | 2 | 3];

  // Find next upcoming milestone
  const nextMilestone = MILESTONES.find(m => m.weeksGA > weeksComplete) ?? null;
  const nextMilestoneWithDays = nextMilestone
    ? {
        label: nextMilestone.label,
        weeksGA: nextMilestone.weeksGA,
        daysLeft: (nextMilestone.weeksGA * 7) - totalDays,
      }
    : null;

  return {
    weeksComplete,
    daysRemainder,
    totalDays,
    trimester,
    trimesterLabel,
    percentComplete,
    daysRemaining,
    edd,
    gestAgeLabel,
    trimesterBlurb,
    nextMilestone: nextMilestoneWithDays,
  };
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}
