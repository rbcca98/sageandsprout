/**
 * Maternity / parental leave planner.
 * Basis: US DOL FMLA (29 CFR Part 825) + key state paid leave programs (2026).
 * https://www.dol.gov/agencies/whd/fmla
 */

export interface MaternityLeaveInputs {
  dueDate: string;         // ISO date
  lastWorkDay: string;     // ISO date (intended last day before leave)
  fmlaEligible: boolean;
  employerPaidWeeks: number;       // weeks of employer-paid leave
  statePFL: string;                // state code or 'none'
  ptoPaidWeeks: number;            // weeks of PTO/sick the employee plans to use
}

export interface StatePFLInfo {
  name: string;
  weeks: number;
  payPercent: number;    // % of wages replaced
  waitingDays: number;   // waiting period in days
}

export interface MaternityLeaveResult {
  leaveStartDate: Date;
  babyBirthEstimate: Date;
  fmlaEndDate: Date | null;      // null if not eligible
  paidLeaveEndDate: Date | null;
  totalPaidWeeks: number;
  totalUnpaidWeeks: number;
  returnToWorkDate: Date;
  statePFLInfo: StatePFLInfo | null;
  timeline: { label: string; date: Date; type: 'start' | 'milestone' | 'end' }[];
  notes: string[];
}

// 2026 state PFL programs (approximate — rates update annually)
const STATE_PFL: Record<string, StatePFLInfo> = {
  CA: { name: 'California PFL', weeks: 8, payPercent: 70, waitingDays: 7 },
  NY: { name: 'New York PFL', weeks: 12, payPercent: 67, waitingDays: 0 },
  NJ: { name: 'New Jersey FLI', weeks: 12, payPercent: 85, waitingDays: 7 },
  WA: { name: 'Washington PFML', weeks: 12, payPercent: 90, waitingDays: 7 },
  MA: { name: 'Massachusetts PFML', weeks: 12, payPercent: 80, waitingDays: 7 },
  CT: { name: 'Connecticut PFML', weeks: 12, payPercent: 95, waitingDays: 0 },
  OR: { name: 'Oregon PFML', weeks: 12, payPercent: 100, waitingDays: 7 },
  CO: { name: 'Colorado FAMLI', weeks: 12, payPercent: 90, waitingDays: 7 },
  RI: { name: 'Rhode Island TDI/TCI', weeks: 8, payPercent: 60, waitingDays: 7 },
  DE: { name: 'Delaware PFML', weeks: 12, payPercent: 80, waitingDays: 0 },
  MD: { name: 'Maryland FAMLI', weeks: 12, payPercent: 90, waitingDays: 7 },
  MN: { name: 'Minnesota PFML', weeks: 12, payPercent: 90, waitingDays: 7 },
};

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 86_400_000);
}

function addWeeks(date: Date, weeks: number): Date {
  return addDays(date, weeks * 7);
}

export function calculateMaternityLeave(inputs: MaternityLeaveInputs): MaternityLeaveResult | null {
  const { dueDate, lastWorkDay, fmlaEligible, employerPaidWeeks, statePFL, ptoPaidWeeks } = inputs;
  if (!dueDate || !lastWorkDay) return null;

  const leaveStart   = new Date(lastWorkDay);  leaveStart.setHours(0,0,0,0);
  const birthEstimate = new Date(dueDate);      birthEstimate.setHours(0,0,0,0);

  if (isNaN(leaveStart.getTime()) || isNaN(birthEstimate.getTime())) return null;

  const statePFLInfo = STATE_PFL[statePFL] ?? null;
  const statePFLWeeks = statePFLInfo?.weeks ?? 0;

  // Total paid weeks = max of: employer paid, state PFL, PTO (these may overlap in complex ways)
  // Simplified: we stack them as sequential, employer first, then state if state extends beyond employer
  const totalPaidWeeks = Math.max(employerPaidWeeks + ptoPaidWeeks, statePFLWeeks);
  const paidLeaveEndDate = addWeeks(leaveStart, totalPaidWeeks);

  // FMLA: up to 12 weeks from the start of leave (or birth), runs concurrently with paid leave
  const fmlaEndDate = fmlaEligible ? addWeeks(leaveStart, 12) : null;

  // Total protected leave = max of FMLA + state PFL (whichever is longer, often runs concurrent)
  const totalProtectedWeeks = fmlaEligible
    ? Math.max(12, statePFLWeeks)
    : statePFLWeeks;

  const returnToWorkDate = addWeeks(leaveStart, totalProtectedWeeks || totalPaidWeeks || 6);
  const totalUnpaidWeeks = Math.max(0, totalProtectedWeeks - totalPaidWeeks);

  // Build timeline
  const timeline: MaternityLeaveResult['timeline'] = [
    { label: 'Leave begins', date: leaveStart, type: 'start' },
    { label: 'Estimated due date', date: birthEstimate, type: 'milestone' },
  ];
  if (paidLeaveEndDate > leaveStart) {
    timeline.push({ label: 'Paid leave ends', date: paidLeaveEndDate, type: 'milestone' });
  }
  if (fmlaEndDate) {
    timeline.push({ label: 'FMLA protection ends (12 wks)', date: fmlaEndDate, type: 'milestone' });
  }
  timeline.push({ label: 'Return to work (estimated)', date: returnToWorkDate, type: 'end' });
  timeline.sort((a, b) => a.date.getTime() - b.date.getTime());

  // Notes
  const notes: string[] = [];
  if (!fmlaEligible) {
    notes.push('FMLA does not apply — you may not have job protection. Check with your employer and HR about company policy.');
  }
  if (statePFLInfo) {
    notes.push(`${statePFLInfo.name} replaces ~${statePFLInfo.payPercent}% of wages for up to ${statePFLInfo.weeks} weeks. There may be a ${statePFLInfo.waitingDays}-day waiting period.`);
  }
  if (!statePFLInfo && statePFL !== 'none') {
    notes.push('Your state does not currently have a paid family leave program. Check your employer\'s leave policy.');
  }
  notes.push('Leave plans are subject to your specific employer policies, eligibility dates, and state law. Consult your HR department and your state labor office for personalized guidance.');

  return {
    leaveStartDate: leaveStart,
    babyBirthEstimate: birthEstimate,
    fmlaEndDate,
    paidLeaveEndDate: totalPaidWeeks > 0 ? paidLeaveEndDate : null,
    totalPaidWeeks,
    totalUnpaidWeeks,
    returnToWorkDate,
    statePFLInfo,
    timeline,
    notes,
  };
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export const US_STATES: [string, string][] = [
  ['none', 'No state PFL'],
  ['CA', 'California'], ['CO', 'Colorado'], ['CT', 'Connecticut'],
  ['DE', 'Delaware'], ['MD', 'Maryland'], ['MA', 'Massachusetts'],
  ['MN', 'Minnesota'], ['NJ', 'New Jersey'], ['NY', 'New York'],
  ['OR', 'Oregon'], ['RI', 'Rhode Island'], ['WA', 'Washington'],
];
