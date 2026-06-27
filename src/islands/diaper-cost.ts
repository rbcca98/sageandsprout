/**
 * Diaper and wipe usage / cost estimator.
 * Age-to-diapers-per-day table based on typical newborn/infant patterns.
 */

export type DiaperStage = 'newborn' | '1month' | '3months' | '6months' | '9months' | '12months';

export interface DiaperInputs {
  babyAgeMonths: number;   // 0–30 (beyond 30 ≈ potty-trained)
  diaperPricePerUnit: number;   // $ per diaper
  wipesPerDiaper: number;       // avg wipes per change (default 2)
  wipesPricePerUnit: number;    // $ per wipe
}

export interface DiaperResult {
  stageLabel: string;
  diaperSize: string;
  diapersPerDay: number;
  wipesPerDay: number;
  diapersPerMonth: number;
  wipesPerMonth: number;
  monthlyCost: number;
  yearlyCost: number;
  diaperMonthlyCost: number;
  wipesMonthlyCost: number;
  stockUpWeeks: number; // how many weeks of diapers to stock up to avoid running out (useful for buying bulk)
}

const AGE_BANDS = [
  { maxMonths: 1,  label: 'Newborn (0–1 month)',  size: 'Newborn (up to ~10 lb)', changesPerDay: 10 },
  { maxMonths: 3,  label: '1–3 months',            size: 'Size 1 (8–14 lb)',        changesPerDay: 8  },
  { maxMonths: 6,  label: '3–6 months',            size: 'Size 2 (12–18 lb)',       changesPerDay: 7  },
  { maxMonths: 9,  label: '6–9 months',            size: 'Size 3 (16–28 lb)',       changesPerDay: 6  },
  { maxMonths: 12, label: '9–12 months',           size: 'Size 3–4 (22–37 lb)',     changesPerDay: 6  },
  { maxMonths: 18, label: '12–18 months',          size: 'Size 4 (22–37 lb)',       changesPerDay: 5  },
  { maxMonths: 24, label: '18–24 months',          size: 'Size 5 (27+ lb)',         changesPerDay: 5  },
  { maxMonths: 36, label: '24–36 months',          size: 'Size 6 (35+ lb)',         changesPerDay: 4  },
] as const;

export function calculateDiaperCost(inputs: DiaperInputs): DiaperResult | null {
  const { babyAgeMonths, diaperPricePerUnit, wipesPerDiaper, wipesPricePerUnit } = inputs;
  if (babyAgeMonths < 0 || diaperPricePerUnit < 0) return null;

  const band = AGE_BANDS.find(b => babyAgeMonths < b.maxMonths) ?? AGE_BANDS[AGE_BANDS.length - 1];

  const diapersPerDay  = band.changesPerDay;
  const wipesPerDay    = diapersPerDay * wipesPerDiaper;
  const diapersPerMonth = Math.round(diapersPerDay * 30.5);
  const wipesPerMonth   = Math.round(wipesPerDay   * 30.5);

  const diaperMonthlyCost = diaperPricePerUnit * diapersPerMonth;
  const wipesMonthlyCost  = wipesPricePerUnit  * wipesPerMonth;
  const monthlyCost  = diaperMonthlyCost + wipesMonthlyCost;
  const yearlyCost   = monthlyCost * 12;

  return {
    stageLabel:     band.label,
    diaperSize:     band.size,
    diapersPerDay,
    wipesPerDay,
    diapersPerMonth,
    wipesPerMonth,
    monthlyCost:       Math.round(monthlyCost * 100)  / 100,
    yearlyCost:        Math.round(yearlyCost * 100)   / 100,
    diaperMonthlyCost: Math.round(diaperMonthlyCost * 100) / 100,
    wipesMonthlyCost:  Math.round(wipesMonthlyCost * 100)  / 100,
    stockUpWeeks: 3,
  };
}
