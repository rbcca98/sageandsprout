/**
 * Baby feeding / formula amount estimator.
 * Source: AAP / HealthyChildren.org
 * https://www.healthychildren.org/English/ages-stages/baby/formula-feeding/Pages/Amount-and-Schedule-of-Formula-Feedings.aspx
 */

export type FeedingType = 'formula' | 'breast' | 'mixed';

export interface FeedingInputs {
  ageMonths: number;   // 0–12
  weightLbs: number;
  feedingType: FeedingType;
}

export interface FeedingResult {
  ageGroup: string;
  dailyOzLow: number;
  dailyOzHigh: number;
  ozPerFeedLow: number;
  ozPerFeedHigh: number;
  feedsPerDayLow: number;
  feedsPerDayHigh: number;
  mlPerFeedLow: number;
  mlPerFeedHigh: number;
  dailyMlLow: number;
  dailyMlHigh: number;
  notes: string;
  solidsNote: string | null;
  weightBased: boolean;
  weightOzPerLbPerDay: number | null;
}

const OZ_TO_ML = 29.5735;

// Age-based feeding guidelines from AAP
const AGE_BANDS = [
  {
    maxMonths: 1,
    label: 'Newborn (0–1 month)',
    ozPerFeedLow: 1.5, ozPerFeedHigh: 3,
    feedsLow: 8, feedsHigh: 12,
    weightBased: false,
    notes: 'Feed every 2–3 hours. Newborns have tiny stomachs, so small, frequent feeds are normal.',
    solids: null,
  },
  {
    maxMonths: 2,
    label: '1–2 months',
    ozPerFeedLow: 2, ozPerFeedHigh: 4,
    feedsLow: 7, feedsHigh: 8,
    weightBased: true,
    notes: 'Feed every 3–4 hours. Watch for hunger cues rather than strictly watching the clock.',
    solids: null,
  },
  {
    maxMonths: 4,
    label: '2–4 months',
    ozPerFeedLow: 4, ozPerFeedHigh: 6,
    feedsLow: 5, feedsHigh: 6,
    weightBased: true,
    notes: 'Feeding frequency decreases as stomach capacity grows. Total daily intake ~ 2.5 oz per lb of body weight.',
    solids: null,
  },
  {
    maxMonths: 6,
    label: '4–6 months',
    ozPerFeedLow: 5, ozPerFeedHigh: 8,
    feedsLow: 4, feedsHigh: 6,
    weightBased: true,
    notes: 'Total daily formula should not exceed 32 oz. Watch for cues of fullness.',
    solids: null,
  },
  {
    maxMonths: 9,
    label: '6–9 months',
    ozPerFeedLow: 6, ozPerFeedHigh: 8,
    feedsLow: 3, feedsHigh: 5,
    weightBased: false,
    notes: 'Solid foods begin around 6 months. Breast milk or formula remains the primary nutrition through 12 months.',
    solids: 'Introduce pureed single-ingredient foods. Start with 1–2 teaspoons, once daily, gradually increasing.',
  },
  {
    maxMonths: 12,
    label: '9–12 months',
    ozPerFeedLow: 6, ozPerFeedHigh: 8,
    feedsLow: 3, feedsHigh: 4,
    weightBased: false,
    notes: 'Formula or breast milk remains primary. Solid foods expand in variety and texture.',
    solids: 'Offer soft finger foods and mashed/pureed foods 2–3 times daily. Aim for a variety of flavors and textures.',
  },
] as const;

export function calculateFeeding(inputs: FeedingInputs): FeedingResult | null {
  const { ageMonths, weightLbs, feedingType } = inputs;
  if (ageMonths < 0 || ageMonths > 12) return null;
  if (weightLbs <= 0) return null;

  const band = AGE_BANDS.find(b => ageMonths < b.maxMonths) ?? AGE_BANDS[AGE_BANDS.length - 1];

  let dailyOzLow: number;
  let dailyOzHigh: number;
  let weightOzPerLbPerDay: number | null = null;

  if (band.weightBased && feedingType !== 'breast') {
    // 2.5 oz/lb/day formula, cap at 32 oz (AAP)
    const weightCalc = weightLbs * 2.5;
    dailyOzLow  = Math.min(weightCalc * 0.9, 32);
    dailyOzHigh = Math.min(weightCalc, 32);
    weightOzPerLbPerDay = 2.5;
  } else {
    dailyOzLow  = band.ozPerFeedLow  * band.feedsLow;
    dailyOzHigh = band.ozPerFeedHigh * band.feedsHigh;
  }

  const breastNote = feedingType === 'breast'
    ? 'Breastfed babies feed on demand. Amounts are harder to measure: watch for 6+ wet diapers/day and steady weight gain as signs of adequate intake.'
    : band.notes;

  return {
    ageGroup: band.label,
    dailyOzLow:  Math.round(dailyOzLow * 10) / 10,
    dailyOzHigh: Math.round(dailyOzHigh * 10) / 10,
    ozPerFeedLow:  band.ozPerFeedLow,
    ozPerFeedHigh: band.ozPerFeedHigh,
    feedsPerDayLow:  band.feedsLow,
    feedsPerDayHigh: band.feedsHigh,
    mlPerFeedLow:  Math.round(band.ozPerFeedLow  * OZ_TO_ML),
    mlPerFeedHigh: Math.round(band.ozPerFeedHigh * OZ_TO_ML),
    dailyMlLow:  Math.round(dailyOzLow  * OZ_TO_ML),
    dailyMlHigh: Math.round(dailyOzHigh * OZ_TO_ML),
    notes: breastNote,
    solidsNote: band.solids as string | null,
    weightBased: band.weightBased && feedingType !== 'breast',
    weightOzPerLbPerDay,
  };
}
