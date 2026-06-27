/**
 * Due-date calculation logic.
 * Clinical basis: ACOG Committee Opinion 700 (Obstetric Data Definitions).
 * All arithmetic is pure / side-effect-free so it can be unit-tested.
 */

export type DueDateMethod = 'lmp' | 'conception' | 'ivf3' | 'ivf5';

export interface DueDateInputs {
  method: DueDateMethod;
  date: string;           // ISO date string
  cycleLength?: number;   // days; used when method === 'lmp'
}

export interface Milestone {
  label: string;
  date: Date;
  weeksGA: number;
}

export interface DueDateResult {
  edd: Date;
  today: Date;
  daysRemaining: number;
  weeksComplete: number;
  daysRemainder: number;
  trimester: 1 | 2 | 3;
  trimesterLabel: string;
  gestAgeLabel: string;   // "You are X weeks and Y days pregnant"
  percentComplete: number;
  milestones: Milestone[];
  isPreconception: boolean; // date is in the future (ovulation window)
}

export function calculateDueDate(inputs: DueDateInputs): DueDateResult | null {
  const ref = new Date(inputs.date);
  if (isNaN(ref.getTime())) return null;

  // Set to midnight local
  ref.setHours(0, 0, 0, 0);

  let lmp: Date;

  switch (inputs.method) {
    case 'lmp': {
      // Naegele's rule adjusted for non-28-day cycles:
      // Naegele EDD = LMP + 280 days.
      // If cycle ≠ 28, shift by (cycleLength - 28) days.
      const cycle = inputs.cycleLength ?? 28;
      const offset = 280 + (cycle - 28);
      lmp = new Date(ref.getTime());
      const eddMs = ref.getTime() + offset * 86_400_000;
      const edd = new Date(eddMs);
      return buildResult(lmp, edd);
    }
    case 'conception': {
      // Conception ≈ ovulation = LMP + 14 for 28-day cycle.
      // EDD = conception + 266 days.
      const edd = new Date(ref.getTime() + 266 * 86_400_000);
      lmp = new Date(ref.getTime() - 14 * 86_400_000);
      return buildResult(lmp, edd);
    }
    case 'ivf5': {
      // Day-5 blastocyst transfer: EDD = transfer + 261 days (280 - 14 - 5)
      const edd = new Date(ref.getTime() + 261 * 86_400_000);
      lmp = new Date(ref.getTime() - 19 * 86_400_000);
      return buildResult(lmp, edd);
    }
    case 'ivf3': {
      // Day-3 embryo transfer: EDD = transfer + 263 days (280 - 14 - 3)
      const edd = new Date(ref.getTime() + 263 * 86_400_000);
      lmp = new Date(ref.getTime() - 17 * 86_400_000);
      return buildResult(lmp, edd);
    }
  }
}

function buildResult(lmp: Date, edd: Date): DueDateResult {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysSinceLmp = Math.floor((today.getTime() - lmp.getTime()) / 86_400_000);
  const daysRemaining = Math.round((edd.getTime() - today.getTime()) / 86_400_000);

  const weeksComplete = Math.floor(daysSinceLmp / 7);
  const daysRemainder = daysSinceLmp % 7;

  const isPreconception = daysSinceLmp < 0;

  const trimester: 1 | 2 | 3 =
    weeksComplete < 14 ? 1 : weeksComplete < 28 ? 2 : 3;

  const trimesterLabel =
    trimester === 1 ? 'First Trimester'
    : trimester === 2 ? 'Second Trimester'
    : 'Third Trimester';

  const gestAgeLabel = isPreconception
    ? 'Your estimated due date is set'
    : `You are ${weeksComplete} week${weeksComplete !== 1 ? 's' : ''} and ${daysRemainder} day${daysRemainder !== 1 ? 's' : ''} pregnant`;

  const percentComplete = isPreconception ? 0 : Math.min(100, Math.round((daysSinceLmp / 280) * 100));

  const milestones: Milestone[] = [
    { label: 'End of first trimester', weeksGA: 13, date: addDays(lmp, 13 * 7) },
    { label: 'Anatomy scan (typical)', weeksGA: 20, date: addDays(lmp, 20 * 7) },
    { label: 'Viability threshold', weeksGA: 24, date: addDays(lmp, 24 * 7) },
    { label: 'End of second trimester', weeksGA: 27, date: addDays(lmp, 27 * 7) },
    { label: 'Full term begins', weeksGA: 39, date: addDays(lmp, 39 * 7) },
    { label: 'Estimated due date', weeksGA: 40, date: edd },
  ];

  return {
    edd,
    today,
    daysRemaining,
    weeksComplete,
    daysRemainder,
    trimester,
    trimesterLabel,
    gestAgeLabel,
    percentComplete,
    milestones,
    isPreconception,
  };
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 86_400_000);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
