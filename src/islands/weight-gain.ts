/**
 * Pregnancy weight-gain target.
 * Source: IOM/NASEM (2009) "Weight Gain During Pregnancy: Reexamining the Guidelines"
 * https://www.ncbi.nlm.nih.gov/books/NBK32813/
 */

export interface WeightGainInputs {
  heightFt: number;
  heightIn: number;
  weightLbs: number;
  twins: boolean;
  gestWeeks: number; // current gestational week
}

export interface WeightGainResult {
  bmi: number;
  bmiCategory: string;
  totalRangeLow: number;
  totalRangeHigh: number;
  weeklyRateLow: number;  // lb/week in T2/T3
  weeklyRateHigh: number;
  targetAtCurrentWeek: number; // expected gain by now
  targetAtCurrentWeekHigh: number;
  remainingLow: number;
  remainingHigh: number;
  trimester: 1 | 2 | 3;
  t1Gain: number; // expected T1 gain (flat ~1–4.4 lb for most)
}

// IOM 2009 guidelines
const GUIDELINES = {
  singleton: {
    underweight: { low: 28, high: 40, weeklyLow: 0.8, weeklyHigh: 1.3 },
    normal:      { low: 25, high: 35, weeklyLow: 0.8, weeklyHigh: 1.0 },
    overweight:  { low: 15, high: 25, weeklyLow: 0.5, weeklyHigh: 0.7 },
    obese:       { low: 11, high: 20, weeklyLow: 0.4, weeklyHigh: 0.6 },
  },
  twins: {
    underweight: { low: 50, high: 62, weeklyLow: 1.0, weeklyHigh: 1.2 },
    normal:      { low: 37, high: 54, weeklyLow: 1.0, weeklyHigh: 1.2 },
    overweight:  { low: 31, high: 50, weeklyLow: 0.9, weeklyHigh: 1.1 },
    obese:       { low: 25, high: 42, weeklyLow: 0.8, weeklyHigh: 1.0 },
  },
} as const;

type BMICategory = 'underweight' | 'normal' | 'overweight' | 'obese';

function getBMICategory(bmi: number): BMICategory {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25)   return 'normal';
  if (bmi < 30)   return 'overweight';
  return 'obese';
}

const CATEGORY_LABELS: Record<BMICategory, string> = {
  underweight: 'Underweight (BMI < 18.5)',
  normal:      'Normal weight (BMI 18.5–24.9)',
  overweight:  'Overweight (BMI 25–29.9)',
  obese:       'Obese (BMI ≥ 30)',
};

export function calculateWeightGain(inputs: WeightGainInputs): WeightGainResult | null {
  const { heightFt, heightIn, weightLbs, twins, gestWeeks } = inputs;
  if (gestWeeks < 1 || gestWeeks > 45) return null;
  if (weightLbs <= 0 || heightFt < 3) return null;

  const heightInTotal = heightFt * 12 + heightIn;
  const heightM = heightInTotal * 0.0254;
  const weightKg = weightLbs * 0.453592;
  const bmi = weightKg / (heightM * heightM);
  const bmiCat = getBMICategory(bmi);
  const guide = twins ? GUIDELINES.twins[bmiCat] : GUIDELINES.singleton[bmiCat];

  const trimester: 1 | 2 | 3 = gestWeeks <= 13 ? 1 : gestWeeks <= 27 ? 2 : 3;

  // Expected gain at current week:
  // T1: ~2 lb (mid-range flat) by week 13
  // T2/T3: weekly rate × (weeks - 13)
  const t1Gain = twins ? 3 : 2;

  let targetAtCurrentWeek: number;
  let targetAtCurrentWeekHigh: number;

  if (gestWeeks <= 13) {
    // During T1, gain is relatively small and flat
    const t1Fraction = gestWeeks / 13;
    targetAtCurrentWeek     = t1Fraction * t1Gain;
    targetAtCurrentWeekHigh = t1Fraction * (t1Gain + 2);
  } else {
    const weeksIntoT2T3 = gestWeeks - 13;
    targetAtCurrentWeek     = t1Gain + weeksIntoT2T3 * guide.weeklyLow;
    targetAtCurrentWeekHigh = t1Gain + weeksIntoT2T3 * guide.weeklyHigh;
  }

  const remainingLow  = Math.max(0, guide.low  - targetAtCurrentWeekHigh);
  const remainingHigh = Math.max(0, guide.high - targetAtCurrentWeek);

  return {
    bmi: Math.round(bmi * 10) / 10,
    bmiCategory: CATEGORY_LABELS[bmiCat],
    totalRangeLow:  guide.low,
    totalRangeHigh: guide.high,
    weeklyRateLow:  guide.weeklyLow,
    weeklyRateHigh: guide.weeklyHigh,
    targetAtCurrentWeek:     Math.round(targetAtCurrentWeek * 10) / 10,
    targetAtCurrentWeekHigh: Math.round(targetAtCurrentWeekHigh * 10) / 10,
    remainingLow:  Math.round(remainingLow * 10) / 10,
    remainingHigh: Math.round(remainingHigh * 10) / 10,
    trimester,
    t1Gain,
  };
}
