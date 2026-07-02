/**
 * Baby sleep / wake-window schedule by age.
 * Sources: AAP safe-sleep guidelines; AASM (American Academy of Sleep Medicine) sleep duration recommendations.
 * https://www.aap.org/en/patient-care/safe-sleep/
 * https://aasm.org/resources/pdf/pediatricsleepdurationconsensus.pdf
 */

export interface SleepInputs {
  ageMonths: number;  // 0–24
  wakeTimeMins: number; // minutes from midnight (e.g. 7:00 AM = 420)
}

export interface Nap {
  label: string;
  startMins: number;
  endMins: number;
  durationMins: number;
}

export interface SleepResult {
  ageGroup: string;
  totalSleepLow: number;   // hours/day
  totalSleepHigh: number;
  nightSleepLow: number;
  nightSleepHigh: number;
  napsPerDay: number;
  wakeWindowMinsLow: number;
  wakeWindowMinsHigh: number;
  naps: Nap[];
  bedtimeMins: number;
  bedtimeLabel: string;
  notes: string;
}

const AGE_BANDS = [
  {
    maxMonths: 1,
    label: 'Newborn (0–1 month)',
    totalLow: 15, totalHigh: 18,
    nightLow: 8,  nightHigh: 9,
    napsPerDay: 4,
    napDurationMins: 45,
    wakeWindowLow: 45, wakeWindowHigh: 60,
    notes: 'Newborns have not yet developed a circadian rhythm. Nap and night sleep are fluid. Focus on safe sleep (back to sleep, firm flat surface) over scheduling.',
  },
  {
    maxMonths: 3,
    label: '1–3 months',
    totalLow: 14, totalHigh: 17,
    nightLow: 8,  nightHigh: 10,
    napsPerDay: 4,
    napDurationMins: 60,
    wakeWindowLow: 60, wakeWindowHigh: 90,
    notes: 'Circadian rhythm begins to develop around 6–8 weeks. Some night stretching may start. Still feeding every 2–3 hours.',
  },
  {
    maxMonths: 5,
    label: '3–5 months',
    totalLow: 14, totalHigh: 16,
    nightLow: 9, nightHigh: 11,
    napsPerDay: 3,
    napDurationMins: 75,
    wakeWindowLow: 75, wakeWindowHigh: 105,
    notes: 'Many babies consolidate to 3 naps. Some begin longer night stretches. Sleep pressure builds with wake windows, so watch for tired cues.',
  },
  {
    maxMonths: 7,
    label: '5–7 months',
    totalLow: 12, totalHigh: 15,
    nightLow: 10, nightHigh: 12,
    napsPerDay: 3,
    napDurationMins: 90,
    wakeWindowLow: 90, wakeWindowHigh: 135,
    notes: 'Longer wake windows allow for more predictable nap timing. Many babies drop from 3 naps to 2 between 6–8 months.',
  },
  {
    maxMonths: 9,
    label: '7–9 months',
    totalLow: 12, totalHigh: 15,
    nightLow: 10, nightHigh: 12,
    napsPerDay: 2,
    napDurationMins: 90,
    wakeWindowLow: 135, wakeWindowHigh: 165,
    notes: 'Two naps is typical. Morning and afternoon naps ideally 1.5 hrs each. Watch for the 8-month separation anxiety phase affecting sleep.',
  },
  {
    maxMonths: 12,
    label: '9–12 months',
    totalLow: 12, totalHigh: 15,
    nightLow: 10, nightHigh: 12,
    napsPerDay: 2,
    napDurationMins: 90,
    wakeWindowLow: 165, wakeWindowHigh: 210,
    notes: 'Two naps, though some babies start showing readiness to transition to one nap around 12–18 months.',
  },
  {
    maxMonths: 18,
    label: '12–18 months',
    totalLow: 11, totalHigh: 14,
    nightLow: 10, nightHigh: 12,
    napsPerDay: 1,
    napDurationMins: 120,
    wakeWindowLow: 300, wakeWindowHigh: 360,
    notes: 'Transition from 2 naps to 1 typically happens 12–18 months. Signs: resisting the second nap, or falling asleep late for it.',
  },
  {
    maxMonths: 25,
    label: '18–24 months',
    totalLow: 11, totalHigh: 14,
    nightLow: 10, nightHigh: 12,
    napsPerDay: 1,
    napDurationMins: 120,
    wakeWindowLow: 330, wakeWindowHigh: 390,
    notes: 'One solid nap midday is typical. Most toddlers keep this nap until 3–4 years old, though timing and duration vary.',
  },
] as const;

function formatTime(mins: number): string {
  const h = Math.floor(((mins % 1440) + 1440) % 1440 / 60);
  const m = ((mins % 1440) + 1440) % 1440 % 60;
  const ampm = h < 12 ? 'AM' : 'PM';
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
}

export function calculateSleepSchedule(inputs: SleepInputs): SleepResult | null {
  const { ageMonths, wakeTimeMins } = inputs;
  if (ageMonths < 0 || ageMonths > 24) return null;
  if (wakeTimeMins < 0 || wakeTimeMins > 1440) return null;

  const band = AGE_BANDS.find(b => ageMonths < b.maxMonths) ?? AGE_BANDS[AGE_BANDS.length - 1];
  const wakeWindowAvg = Math.round((band.wakeWindowLow + band.wakeWindowHigh) / 2);

  // Build suggested nap schedule
  const naps: Nap[] = [];
  let cursor = wakeTimeMins + wakeWindowAvg;

  for (let i = 0; i < band.napsPerDay; i++) {
    const start = cursor;
    const end   = start + band.napDurationMins;
    naps.push({
      label: band.napsPerDay === 1 ? 'Nap' : `Nap ${i + 1}`,
      startMins: start,
      endMins: end,
      durationMins: band.napDurationMins,
    });
    // Wake from nap + next wake window = next nap
    cursor = end + wakeWindowAvg;
  }

  // Bedtime = end of last nap + final wake window (slightly longer, capped)
  const lastNapEnd  = naps.length > 0 ? naps[naps.length - 1].endMins : wakeTimeMins + 8 * 60;
  const finalWindow = Math.min(wakeWindowAvg, band.wakeWindowHigh);
  const bedtimeMins = lastNapEnd + finalWindow;

  return {
    ageGroup: band.label,
    totalSleepLow:  band.totalLow,
    totalSleepHigh: band.totalHigh,
    nightSleepLow:  band.nightLow,
    nightSleepHigh: band.nightHigh,
    napsPerDay:     band.napsPerDay,
    wakeWindowMinsLow:  band.wakeWindowLow,
    wakeWindowMinsHigh: band.wakeWindowHigh,
    naps,
    bedtimeMins,
    bedtimeLabel: formatTime(bedtimeMins),
    notes: band.notes,
  };
}

export { formatTime };
