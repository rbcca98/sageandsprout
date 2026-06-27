/**
 * Ovulation and fertile window calculation.
 * Basis: ACOG & ASRM guidelines.
 * Ovulation occurs approximately 14 days BEFORE the next expected period.
 * Fertile window: 5 days before ovulation through 1 day after (day of ovulation).
 */

export interface OvulationInputs {
  lmp: string;          // first day of last period (ISO date)
  cycleLength: number;  // 21–35 days
}

export interface OvulationResult {
  ovulationDate: Date;
  fertileStart: Date;
  fertileEnd: Date;
  nextPeriod: Date;
  testDate: Date;       // suggested LH surge test start (2 days before ovulation)
  pregnancyTestDate: Date; // earliest reliable home pregnancy test
  cycleDay: number;     // today's cycle day (1 = first day of LMP)
  isInFertileWindow: boolean;
  isInCycle: boolean;
  daysUntilOvulation: number | null;
  daysUntilFertileWindow: number | null;
  phase: 'follicular' | 'fertile' | 'luteal' | 'next-cycle';
  phaseLabel: string;
}

export function calculateOvulation(inputs: OvulationInputs): OvulationResult | null {
  const { lmp, cycleLength } = inputs;
  if (!lmp || cycleLength < 21 || cycleLength > 35) return null;

  const lmpDate = new Date(lmp);
  if (isNaN(lmpDate.getTime())) return null;
  lmpDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Ovulation = next period - 14 days = LMP + cycleLength - 14
  const ovulationDate = addDays(lmpDate, cycleLength - 14);

  // Fertile window: ovulation - 5 through ovulation + 1
  const fertileStart = addDays(ovulationDate, -5);
  const fertileEnd   = addDays(ovulationDate,  1);

  // Next expected period
  const nextPeriod = addDays(lmpDate, cycleLength);

  // Suggest starting OPK test 2 days before ovulation
  const testDate = addDays(ovulationDate, -2);

  // Earliest home pregnancy test: ovulation + 12 days (implantation + a few days hCG)
  const pregnancyTestDate = addDays(ovulationDate, 12);

  const cycleDay = Math.floor((today.getTime() - lmpDate.getTime()) / 86_400_000) + 1;
  const isInCycle = cycleDay >= 1 && cycleDay <= cycleLength;
  const isInFertileWindow = today >= fertileStart && today <= fertileEnd;

  const daysUntilOvulation =
    today <= ovulationDate
      ? Math.ceil((ovulationDate.getTime() - today.getTime()) / 86_400_000)
      : null;

  const daysUntilFertileWindow =
    today < fertileStart
      ? Math.ceil((fertileStart.getTime() - today.getTime()) / 86_400_000)
      : null;

  // Current phase
  let phase: OvulationResult['phase'];
  if (today < fertileStart) phase = 'follicular';
  else if (today <= fertileEnd) phase = 'fertile';
  else if (today <= nextPeriod) phase = 'luteal';
  else phase = 'next-cycle';

  const phaseLabel: Record<OvulationResult['phase'], string> = {
    follicular: 'Follicular Phase',
    fertile: 'Fertile Window',
    luteal: 'Luteal Phase',
    'next-cycle': 'Next Cycle',
  };

  return {
    ovulationDate,
    fertileStart,
    fertileEnd,
    nextPeriod,
    testDate,
    pregnancyTestDate,
    cycleDay,
    isInFertileWindow,
    isInCycle,
    daysUntilOvulation,
    daysUntilFertileWindow,
    phase,
    phaseLabel: phaseLabel[phase],
  };
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 86_400_000);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric',
  });
}
