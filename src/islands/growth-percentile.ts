/**
 * Baby growth percentile calculator using WHO LMS method.
 * Z = ((X/M)^L - 1) / (L * S) when L ≠ 0
 * Z = ln(X/M) / S when L = 0
 * Source: WHO Child Growth Standards (2006)
 * https://www.who.int/tools/child-growth-standards/standards
 */

import type { LMSRow } from '../data/who-lms.js';
import {
  WEIGHT_BOYS, WEIGHT_GIRLS,
  LENGTH_BOYS, LENGTH_GIRLS,
  HEAD_CIRC_BOYS, HEAD_CIRC_GIRLS,
} from '../data/who-lms.js';

export type Sex = 'M' | 'F';
export type Measure = 'weight' | 'length' | 'headcirc';

export interface GrowthInput {
  ageMonths: number;   // 0–24
  sex: Sex;
  measure: Measure;
  value: number;       // kg for weight, cm for length/head circ
}

export interface GrowthResult {
  zScore: number;
  percentile: number;
  interpretation: string;
  interpretationClass: 'low' | 'normal' | 'high';
  medianForAge: number;
  unit: string;
  measureLabel: string;
}

function getLMSTable(measure: Measure, sex: Sex): LMSRow[] {
  if (measure === 'weight')   return sex === 'M' ? WEIGHT_BOYS   : WEIGHT_GIRLS;
  if (measure === 'length')   return sex === 'M' ? LENGTH_BOYS   : LENGTH_GIRLS;
  return sex === 'M' ? HEAD_CIRC_BOYS : HEAD_CIRC_GIRLS;
}

function getLMSForAge(table: LMSRow[], ageMonths: number): [number, number, number] | null {
  const row = table.find(r => r[0] === Math.round(ageMonths));
  if (!row) return null;
  return [row[1], row[2], row[3]];
}

function calcZScore(X: number, L: number, M: number, S: number): number {
  if (Math.abs(L) < 1e-6) return Math.log(X / M) / S;
  return (Math.pow(X / M, L) - 1) / (L * S);
}

// Abramowitz & Stegun approximation for standard normal CDF (accurate to 7 decimal places)
function normalCDF(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989422820 * Math.exp(-z * z / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.7814779 + t * (-1.8212560 + t * 1.3302744))));
  return z >= 0 ? 1 - p : p;
}

function interpretPercentile(p: number): { text: string; cls: 'low' | 'normal' | 'high' } {
  if (p < 3)  return { text: 'Below 3rd percentile: discuss with your pediatrician', cls: 'low' };
  if (p < 15) return { text: 'Below average: monitor at next well visit', cls: 'low' };
  if (p < 85) return { text: 'Normal range', cls: 'normal' };
  if (p < 97) return { text: 'Above average: monitor at next well visit', cls: 'high' };
  return { text: 'Above 97th percentile: discuss with your pediatrician', cls: 'high' };
}

const MEASURE_META: Record<Measure, { label: string; unit: string }> = {
  weight:   { label: 'Weight', unit: 'kg' },
  length:   { label: 'Length / Height', unit: 'cm' },
  headcirc: { label: 'Head circumference', unit: 'cm' },
};

export function calculateGrowthPercentile(input: GrowthInput): GrowthResult | null {
  const { ageMonths, sex, measure, value } = input;
  if (value <= 0 || ageMonths < 0 || ageMonths > 24) return null;

  const table = getLMSTable(measure, sex);
  const lms   = getLMSForAge(table, ageMonths);
  if (!lms) return null;

  const [L, M, S] = lms;
  const z = calcZScore(value, L, M, S);
  const p = Math.round(normalCDF(z) * 100);
  const interp = interpretPercentile(p);

  return {
    zScore: Math.round(z * 100) / 100,
    percentile: p,
    interpretation: interp.text,
    interpretationClass: interp.cls,
    medianForAge: Math.round(M * 100) / 100,
    unit: MEASURE_META[measure].unit,
    measureLabel: MEASURE_META[measure].label,
  };
}

export function lbsToKg(lbs: number): number {
  return Math.round(lbs * 0.453592 * 1000) / 1000;
}

export function inchesToCm(inches: number): number {
  return Math.round(inches * 2.54 * 10) / 10;
}
