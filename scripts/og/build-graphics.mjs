/**
 * Share graphics for every tool page (and the site default).
 *
 *   npm run graphics
 *
 * Each card is drawn as SVG with the site's tokens, fonts, line icons and
 * fruit art, then rasterized to PNG at 1200x630 and 2400x1260 into
 * public/images/tools/<slug>-chart[@2x].png. The default share image is
 * rewritten to public/og-default.png. Every number on a card comes from
 * running the same calculator the tool page runs, so the cards cannot drift
 * from the tools. Re-run after changing a calculator or its copy.
 *
 * Fonts in ./fonts are the static Fraunces 72pt and Mulish cuts (SIL OFL).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

import { calculateOvulation } from '../../src/islands/ovulation.ts';
import { calculateWeightGain } from '../../src/islands/weight-gain.ts';
import { calculateMaternityLeave, US_STATES } from '../../src/islands/maternity-leave.ts';
import { calculateFeeding } from '../../src/islands/feeding.ts';
import { calculateSleepSchedule } from '../../src/islands/sleep-schedule.ts';
import { calculateDiaperCost } from '../../src/islands/diaper-cost.ts';
import { WEIGHT_GIRLS } from '../../src/data/who-lms.ts';
import { BABY_NAMES } from '../../src/data/baby-names.ts';
import { fruitInner } from '../../src/data/week-fruits.ts';
import { ICON_ART } from '../../src/data/icon-art.ts';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');
const OUT = join(root, 'public', 'images', 'tools');
mkdirSync(OUT, { recursive: true });

/* ── Tokens (src/styles/global.css) ─────────────────────────────── */
const C = {
  sage: '#3E5A49', sageDark: '#2C4234', cream: '#F4ECDC',
  terra: '#CD6A4C', terraDark: '#A8512F', light: '#E7C3B2', ink: '#26352B',
};
const W = 1200, H = 630, M = 72;
const FONT = {
  fontFiles: ['Fraunces72pt-Regular.ttf', 'Fraunces72pt-SemiBold.ttf', 'Fraunces72pt-Bold.ttf',
    'Mulish-Regular.ttf', 'Mulish-SemiBold.ttf', 'Mulish-Bold.ttf'].map((f) => join(here, 'fonts', f)),
  loadSystemFonts: false,
  defaultFontFamily: 'Mulish',
};
const DISPLAY = 'Fraunces 72pt', BODY = 'Mulish';

/* ── Text helpers ───────────────────────────────────────────────── */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const fmt = (n) => Number.isInteger(n) ? String(n) : String(Math.round(n * 10) / 10);

function text(x, y, str, o = {}) {
  const { size = 26, family = BODY, weight = 400, fill = C.cream, anchor = 'start', opacity = 1, spacing = 0 } = o;
  return `<text x="${x}" y="${y}" font-family="${family}" font-weight="${weight}" font-size="${size}" fill="${fill}" fill-opacity="${opacity}" text-anchor="${anchor}" letter-spacing="${spacing}">${esc(str)}</text>`;
}

const measured = new Map();
/** Ink width of a string, measured by rendering it once with resvg. */
function measure(str, o = {}) {
  const key = JSON.stringify([str, o]);
  if (measured.has(key)) return measured.get(key);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="6000" height="300">${text(0, 200, str, o)}</svg>`;
  const bb = new Resvg(svg, { font: FONT }).innerBBox();
  const w = bb ? bb.x + bb.width : 0;
  measured.set(key, w);
  return w;
}

/** Greedy word wrap to a pixel width. */
function wrap(str, maxW, o) {
  if (str.includes('\n')) return str.split('\n').flatMap((part) => wrap(part, maxW, o));
  const words = str.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const t = line ? `${line} ${w}` : w;
    if (measure(t, o) <= maxW || !line) line = t;
    else { lines.push(line); line = w; }
  }
  if (line) lines.push(line);
  return lines;
}

/* ── Drawing helpers ────────────────────────────────────────────── */
const rad = (deg) => (deg * Math.PI) / 180;
const polar = (cx, cy, r, deg) => [cx + r * Math.sin(rad(deg)), cy - r * Math.cos(rad(deg))];
/** Arc path from angle a0 to a1 (degrees clockwise from 12 o'clock). */
function arc(cx, cy, r, a0, a1) {
  const [x0, y0] = polar(cx, cy, r, a0);
  const [x1, y1] = polar(cx, cy, r, a1);
  return `M${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}
/** One of the site's 24x24 line icons, scaled. */
function icon(name, x, y, size, color = C.cream, strokeW = 1.6) {
  const inner = ICON_ART[name].replace(/var\(--color-accent\)/g, C.terra);
  return `<g transform="translate(${x} ${y}) scale(${size / 24})" fill="none" stroke="${color}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">${inner}</g>`;
}
/** A week's fruit drawing (100x100 viewBox), scaled. */
function fruit(week, x, y, size, color = C.cream, strokeW = 2.6) {
  const inner = fruitInner(week).replace(/ pathLength="1"/g, '');
  return `<g transform="translate(${x} ${y}) scale(${size / 100})" fill="none" stroke="${color}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">${inner}</g>`;
}
/** The sprig that heads every tool page (32x38 viewBox). */
function sprig(x, y, size, color = C.cream, strokeW = 1.7) {
  return `<g transform="translate(${x} ${y}) scale(${size / 38})" fill="none" stroke="${color}" stroke-width="${strokeW}" stroke-linecap="round" stroke-linejoin="round">
    <path d="M16 36 C15.4 28 15.4 20 17.4 7"/>
    <path d="M15.6 27 C20 27 24 25 26.6 20.6 C22 20 18 22 15.6 27 Z"/>
    <path d="M16 22.5 C11.6 22.5 7.6 20.6 5 16.4 C9.6 15.8 13.8 17.8 16 22.5 Z"/>
    <path d="M16.5 17 C20.4 16.4 23.8 14.4 25.8 10.6 C21.6 10 18.2 12 16.5 17 Z"/>
    <path d="M16.8 12 C13.2 11.4 10 9.4 8 6.2 C11.6 5.8 15 7.8 16.8 12 Z"/>
    <circle cx="17.6" cy="6.4" r="2.5" fill="${C.terra}" stroke="none"/>
  </g>`;
}

/* ── Card frame ─────────────────────────────────────────────────── */
const SIDE = { textW: 540, chartX: 650, chartY: 84, chartW: W - M - 650, chartH: 440 };
const WIDE = { chartX: M, chartY: 236, chartW: W - 2 * M, chartH: 300 };

/**
 * layout 'side': text column left, chart right. 'wide': title on top, chart
 * across the full width. chart(w, h) returns SVG drawn in a w x h box.
 */
function card({ layout = 'side', eyebrow, title, subtitle, stat, chart, footer }) {
  const parts = [];
  parts.push(`<rect width="${W}" height="${H}" fill="${C.sage}"/>`);
  parts.push(text(M, 94, eyebrow, { size: 17, weight: 700, opacity: .68, spacing: 2.6 }));

  if (layout === 'side') {
    const tOpts = { size: 58, family: DISPLAY, weight: 600 };
    const tLines = wrap(title, SIDE.textW, tOpts);
    let y = 172;
    for (const l of tLines) { parts.push(text(M, y, l, tOpts)); y += 64; }
    const sOpts = { size: 24, opacity: .86 };
    y += 18;
    for (const l of wrap(subtitle, SIDE.textW, sOpts)) { parts.push(text(M, y, l, sOpts)); y += 35; }
    if (stat) {
      y += 24;
      parts.push(`<rect x="${M}" y="${y - 30}" width="4" height="40" fill="${C.terra}"/>`);
      for (const l of wrap(stat, SIDE.textW - 20, { size: 22, weight: 600 })) { parts.push(text(M + 18, y, l, { size: 22, weight: 600, fill: C.light })); y += 30; }
    }
    parts.push(`<g transform="translate(${SIDE.chartX} ${SIDE.chartY})">${chart(SIDE.chartW, SIDE.chartH)}</g>`);
  } else {
    parts.push(text(M, 156, title, { size: 54, family: DISPLAY, weight: 600 }));
    const sLines = wrap(subtitle, W - 2 * M, { size: 23, opacity: .86 });
    sLines.forEach((l, i) => parts.push(text(M, 200 + i * 32, l, { size: 23, opacity: .86 })));
    const shift = (sLines.length - 1) * 32;
    parts.push(`<g transform="translate(${WIDE.chartX} ${WIDE.chartY + shift})">${chart(WIDE.chartW, WIDE.chartH - shift)}</g>`);
  }

  // Footer: hairline, brand, trust line
  parts.push(`<path d="M${M} 557 H${W - M}" stroke="${C.cream}" stroke-opacity=".22" stroke-width="1.5"/>`);
  parts.push(sprig(M - 4, 574, 36));
  parts.push(text(M + 38, 601, 'Sage & Sprout', { size: 25, family: DISPLAY, weight: 600 }));
  parts.push(text(W - M, 601, footer, { size: 18, opacity: .7, anchor: 'end' }));

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${parts.join('\n')}</svg>`;
}

const TRUST = 'Reviewed by a senior medical student   ·   sage-and-sprout.com';
const eyebrowFor = (stage) => `FREE CALCULATOR   ·   ${stage}`;

/* ── Charts ─────────────────────────────────────────────────────── */

// Due date: a calendar with the estimate circled, and Naegele's rule beneath.
function calendarChart(w, h) {
  const cell = 56, cols = 7, rows = 5, gx = (w - cell * cols) / 2, gy = 18, head = 36;
  const out = [];
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  days.forEach((d, i) => out.push(text(gx + i * cell + cell / 2, gy + 24, d, { size: 17, weight: 700, opacity: .6, anchor: 'middle' })));
  const top = gy + head;
  for (let r = 0; r <= rows; r++) out.push(`<path d="M${gx} ${top + r * cell} H${gx + cols * cell}" stroke="${C.cream}" stroke-opacity=".28" stroke-width="1.5"/>`);
  for (let c = 0; c <= cols; c++) out.push(`<path d="M${gx + c * cell} ${top} V${top + rows * cell}" stroke="${C.cream}" stroke-opacity=".28" stroke-width="1.5"/>`);
  const start = 2, DUE = 23;  // the month starts on a Tuesday; the estimate falls on the 23rd
  for (let d = 1; d <= 31; d++) {
    const i = start + d - 1, r = Math.floor(i / cols), c = i % cols;
    if (r >= rows) break;
    const cx = gx + c * cell + cell / 2, cy = top + r * cell + cell / 2;
    if (d === DUE) {
      out.push(`<circle cx="${cx}" cy="${cy}" r="22" fill="${C.terra}"/>`);
      out.push(text(cx, cy + 7, d, { size: 21, weight: 700, anchor: 'middle' }));
      out.push(`<path transform="translate(${cx + 14} ${cy - 30}) scale(1.15)" d="M6 2.6c.9-1.5 3.1-1 3.1.5 0 1.3-1.9 2.2-3.1 3.1C4.8 5.3 2.9 4.4 2.9 3.1c0-1.5 2.2-2 3.1-.5Z" fill="${C.light}"/>`);
    } else {
      out.push(text(gx + c * cell + 9, top + r * cell + 22, d, { size: 17, opacity: .72 }));
    }
  }
  const y = top + rows * cell + 46;
  out.push(text(w / 2, y, 'Last period + 280 days', { size: 24, weight: 700, fill: C.light, anchor: 'middle' }));
  return out.join('');
}

// Weeks pregnant: a 40-week ring, filled to a sample week, with that week's fruit.
function weeksChart(w, h) {
  const WEEK = 24;  // sample; trimester cut-offs (<14, <28) are the ones in islands/weeks-pregnant.ts
  const tri = WEEK < 14 ? 'First trimester' : WEEK < 28 ? 'Second trimester' : 'Third trimester';
  const cx = w / 2, cy = h / 2 - 4, R = 168, SW = 30;
  const a = (wk) => (wk / 40) * 360;
  const out = [];
  out.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${C.cream}" stroke-opacity=".16" stroke-width="${SW}"/>`);
  out.push(`<path d="${arc(cx, cy, R, 0, a(WEEK))}" fill="none" stroke="${C.terra}" stroke-width="${SW}"/>`);
  for (const wk of [14, 28]) {
    const [x0, y0] = polar(cx, cy, R - SW / 2 - 4, a(wk)), [x1, y1] = polar(cx, cy, R + SW / 2 + 4, a(wk));
    out.push(`<path d="M${x0} ${y0} L${x1} ${y1}" stroke="${C.cream}" stroke-width="2.5"/>`);
    const [lx, ly] = polar(cx, cy, R + 40, a(wk));
    out.push(text(lx, ly + 6, `wk ${wk}`, { size: 17, weight: 700, opacity: .75, anchor: 'middle' }));
  }
  const [ex, ey] = polar(cx, cy, R, a(WEEK));
  out.push(`<circle cx="${ex}" cy="${ey}" r="11" fill="${C.cream}"/>`);
  out.push(text(cx, cy - R - 24, '40 weeks', { size: 17, weight: 700, opacity: .75, anchor: 'middle' }));
  out.push(fruit(WEEK, cx - 42, cy - 124, 84));
  out.push(text(cx, cy + 36, WEEK, { size: 92, family: DISPLAY, weight: 600, anchor: 'middle' }));
  out.push(text(cx, cy + 66, 'weeks', { size: 21, opacity: .8, anchor: 'middle' }));
  out.push(text(cx, cy + 98, tri, { size: 19, weight: 600, fill: C.light, anchor: 'middle' }));
  return out.join('');
}

// Ovulation: a 28-day cycle ring with the six-day window and ovulation marked.
function cycleChart(w, h) {
  const CYCLE = 28;
  const r = calculateOvulation({ lmp: '2026-01-05', cycleLength: CYCLE });
  const lmp = new Date('2026-01-05'); lmp.setHours(0, 0, 0, 0);
  const dayOf = (d) => Math.round((d.getTime() - lmp.getTime()) / 86_400_000);  // 0 = first day of the period
  const fs = dayOf(r.fertileStart), ov = dayOf(r.ovulationDate), fe = dayOf(r.fertileEnd);
  const cx = w / 2, cy = h / 2 - 4, R = 168, SW = 30;
  const a = (day) => (day / CYCLE) * 360;
  const out = [];
  out.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${C.cream}" stroke-opacity=".16" stroke-width="${SW}"/>`);
  for (let d = 0; d < CYCLE; d++) {
    const [x0, y0] = polar(cx, cy, R + SW / 2 + 3, a(d)), [x1, y1] = polar(cx, cy, R + SW / 2 + 11, a(d));
    out.push(`<path d="M${x0} ${y0} L${x1} ${y1}" stroke="${C.cream}" stroke-opacity=".5" stroke-width="2"/>`);
  }
  out.push(`<path d="${arc(cx, cy, R, a(0), a(5))}" fill="none" stroke="${C.cream}" stroke-opacity=".45" stroke-width="${SW}"/>`);
  out.push(`<path d="${arc(cx, cy, R, a(fs), a(fe + 1))}" fill="none" stroke="${C.terra}" stroke-width="${SW}"/>`);
  const [ox, oy] = polar(cx, cy, R, a(ov + .5));
  out.push(`<circle cx="${ox}" cy="${oy}" r="13" fill="${C.cream}"/><circle cx="${ox}" cy="${oy}" r="5" fill="${C.terra}"/>`);
  const [px, py] = polar(cx, cy, R + 50, a(2.5));
  out.push(text(px, py + 6, 'Period', { size: 17, weight: 700, opacity: .8, anchor: 'start' }));
  const [fx, fy] = polar(cx, cy, R + 48, a((fs + fe + 1) / 2));
  out.push(text(fx, fy + 6, 'Fertile window', { size: 18, weight: 700, fill: C.light, anchor: 'middle' }));
  out.push(text(fx, fy + 28, `${fe - fs + 1} days`, { size: 17, opacity: .8, anchor: 'middle' }));
  out.push(text(cx, cy - 14, `${CYCLE}-day`, { size: 44, family: DISPLAY, weight: 600, anchor: 'middle' }));
  out.push(text(cx, cy + 22, 'cycle', { size: 22, opacity: .8, anchor: 'middle' }));
  out.push(`<circle cx="${cx + 2}" cy="${cy + 58}" r="6" fill="${C.cream}"/><circle cx="${cx + 2}" cy="${cy + 58}" r="2.4" fill="${C.terra}"/>`);
  out.push(text(cx + 16, cy + 64, 'Ovulation', { size: 17, weight: 600, opacity: .85 }));
  return out.join('');
}

// Weight gain: the IOM/NASEM total range for each BMI group, from the calculator.
function weightChart(w, h) {
  const LABEL = { Underweight: 'Underweight, BMI under 18.5', 'Normal weight': 'Normal weight, BMI 18.5 to 24.9', Overweight: 'Overweight, BMI 25 to 29.9', Obese: 'Obese, BMI 30 or more' };
  const rows = [102, 132, 162, 192].map((lb) => {   // 5 ft 5 in: BMI 17, 22, 27, 32
    const r = calculateWeightGain({ heightFt: 5, heightIn: 5, weightLbs: lb, twins: false, gestWeeks: 20 });
    const name = r.bmiCategory.split(' (')[0];
    return { label: LABEL[name] ?? name, low: r.totalRangeLow, high: r.totalRangeHigh };
  });
  const MAX = Math.ceil(Math.max(...rows.map((r) => r.high)) / 10) * 10;
  const x = (lb) => (lb / MAX) * w;
  const out = [];
  rows.forEach((r, i) => {
    const y = 14 + i * 98;
    out.push(text(0, y + 18, r.label, { size: 20, weight: 600 }));
    out.push(text(w, y + 18, `${r.low} to ${r.high} lb`, { size: 20, weight: 700, fill: C.light, anchor: 'end' }));
    out.push(`<rect x="0" y="${y + 32}" width="${w}" height="30" fill="${C.cream}" fill-opacity=".12"/>`);
    out.push(`<rect x="${x(r.low)}" y="${y + 32}" width="${x(r.high) - x(r.low)}" height="30" fill="${C.light}"/>`);
    out.push(`<rect x="${x(r.low)}" y="${y + 32}" width="4" height="30" fill="${C.terra}"/><rect x="${x(r.high) - 4}" y="${y + 32}" width="4" height="30" fill="${C.terra}"/>`);
  });
  const ay = 14 + rows.length * 98 + 4;
  for (let t = 0; t <= MAX; t += 10) out.push(text(x(t), ay + 14, t === MAX ? `${t} lb` : t, { size: 15, opacity: .6, anchor: t === 0 ? 'start' : t === MAX ? 'end' : 'middle' }));
  return out.join('');
}

// Maternity leave: FMLA against the state paid-leave programs the planner models.
function leaveChart(w, h) {
  const programs = US_STATES.flatMap(([code]) => {
    if (code === 'none') return [];
    const r = calculateMaternityLeave({ dueDate: '2026-01-01', lastWorkDay: '2026-01-01', fmlaEligible: false, employerPaidWeeks: 0, statePFL: code, ptoPaidWeeks: 0 });
    return r?.statePFLInfo ? [{ code, ...r.statePFLInfo }] : [];
  });
  const weeks = programs.map((p) => p.weeks);
  const minW = Math.min(...weeks), maxW = Math.max(...weeks);
  const states = programs.filter((p) => p.code !== 'DC').length, dc = programs.some((p) => p.code === 'DC');
  const fmla = calculateMaternityLeave({ dueDate: '2026-03-01', lastWorkDay: '2026-03-01', fmlaEligible: true, employerPaidWeeks: 0, statePFL: 'none', ptoPaidWeeks: 0 });
  const fmlaWeeks = Math.round((fmla.fmlaEndDate.getTime() - new Date('2026-03-01').setHours(0, 0, 0, 0)) / (7 * 86_400_000));
  const LBL = 300, AXIS = 16, x = (wk) => LBL + (wk / AXIS) * (w - LBL);
  const ROW = Math.floor((h - 60) / 3);
  const out = [];
  const row = (i, label, bars, note) => {
    const y = 8 + i * ROW;
    out.push(text(0, y + 32, label, { size: 21, weight: 600 }));
    for (const b of bars) out.push(b(y));
    out.push(text(x(0) + 14, y + 32, note, { size: 18, fill: C.ink, weight: 600 }));
  };
  row(0, 'FMLA job protection', [
    (y) => `<rect x="${x(0)}" y="${y + 6}" width="${x(fmlaWeeks) - x(0)}" height="44" fill="${C.cream}"/>`,
  ], `${fmlaWeeks} weeks, unpaid`);
  row(1, 'State paid leave', [
    (y) => `<rect x="${x(0)}" y="${y + 6}" width="${x(maxW) - x(0)}" height="44" fill="${C.light}" fill-opacity=".45"/>`,
    (y) => `<rect x="${x(0)}" y="${y + 6}" width="${x(minW) - x(0)}" height="44" fill="${C.light}"/>`,
  ], `${minW} to ${maxW} weeks in ${states} states${dc ? ' and DC' : ''}`);
  row(2, 'Employer leave or PTO', [
    (y) => `<rect x="${x(0)}" y="${y + 6}" width="${x(6) - x(0)}" height="44" fill="none" stroke="${C.cream}" stroke-width="2" stroke-dasharray="8 7"/>`,
  ], '');
  out.push(text(x(6) + 14, 8 + 2 * ROW + 32, 'Varies by employer', { size: 18, opacity: .8 }));
  const ay = 8 + 3 * ROW + 4;
  out.push(text(0, ay + 28, 'Weeks after leave starts', { size: 15, opacity: .6 }));
  for (let t = 0; t <= AXIS; t += 4) {
    out.push(`<path d="M${x(t)} ${ay} V${ay + 8}" stroke="${C.cream}" stroke-opacity=".5" stroke-width="2"/>`);
    out.push(text(x(t), ay + 28, t, { size: 15, opacity: .6, anchor: t === AXIS ? 'end' : 'middle' }));
  }
  return out.join('');
}

// Growth: WHO weight-for-age, girls, 3rd / 50th / 97th, from the LMS table.
function growthChart(w, h) {
  const fromLMS = (L, M_, S, z) => (L !== 0 ? M_ * Math.pow(1 + L * S * z, 1 / L) : M_ * Math.exp(S * z));
  const series = (z) => WEIGHT_GIRLS.map(([age, L, M_, S]) => [age, fromLMS(L, M_, S, z)]);
  const p97 = series(1.881), p50 = series(0), p3 = series(-1.881);
  const MAX_AGE = p50[p50.length - 1][0];
  const KG0 = 2, KG1 = Math.ceil(p97[p97.length - 1][1] / 2) * 2;
  const L = 58, B = 46, pw = w - L - 56, ph = h - B - 16;
  const x = (age) => L + (age / MAX_AGE) * pw, y = (kg) => 16 + ph - ((kg - KG0) / (KG1 - KG0)) * ph;
  const pts = (s) => s.map(([a, kg]) => `${x(a).toFixed(1)},${y(kg).toFixed(1)}`).join(' ');
  const out = [];
  for (let kg = KG0; kg <= KG1; kg += 2) {
    out.push(`<path d="M${L} ${y(kg)} H${L + pw}" stroke="${C.cream}" stroke-opacity=".14" stroke-width="1.5"/>`);
    out.push(text(L - 10, y(kg) + 5, kg === KG1 ? `${kg} kg` : kg, { size: 15, opacity: .6, anchor: 'end' }));
  }
  for (const age of [0, 6, 12, 18, 24]) out.push(text(x(age), 16 + ph + 30, age === 0 ? 'Birth' : age === 24 ? '24 mo' : age, { size: 15, opacity: .6, anchor: age === 0 ? 'start' : age === 24 ? 'end' : 'middle' }));
  out.push(`<polygon points="${pts(p97)} ${pts([...p3].reverse())}" fill="${C.cream}" fill-opacity=".12"/>`);
  out.push(`<polyline points="${pts(p97)}" fill="none" stroke="${C.cream}" stroke-opacity=".8" stroke-width="2.5" stroke-linejoin="round"/>`);
  out.push(`<polyline points="${pts(p3)}" fill="none" stroke="${C.cream}" stroke-opacity=".8" stroke-width="2.5" stroke-linejoin="round"/>`);
  out.push(`<polyline points="${pts(p50)}" fill="none" stroke="${C.terra}" stroke-width="4" stroke-linejoin="round"/>`);
  const lab = (s, name, dy, fill = C.cream) => { const [a, kg] = s[s.length - 1]; out.push(text(x(a) + 8, y(kg) + dy, name, { size: 16, weight: 700, fill })); };
  lab(p97, '97th', 5); lab(p50, '50th', 5, C.light); lab(p3, '3rd', 5);
  const [da, dkg] = p50[6];
  out.push(`<circle cx="${x(da)}" cy="${y(dkg)}" r="9" fill="${C.cream}" stroke="${C.terra}" stroke-width="3"/>`);
  out.push(text(x(da) + 16, y(dkg) + 26, `${dkg.toFixed(1)} kg at 6 months`, { size: 15, weight: 600, opacity: .85 }));
  return out.join('');
}

// Feeding: per feed and feeds a day for each age band the calculator uses.
function feedingChart(w, h) {
  const EDGES = [0, 1, 2, 4, 6, 9, 12];  // AGE_BANDS boundaries in islands/feeding.ts
  const rows = EDGES.slice(1).map((end, i) => {
    const start = EDGES[i];
    const r = calculateFeeding({ ageMonths: (start + end) / 2, weightLbs: 10, feedingType: 'formula' });
    return { age: `${start} to ${end} month${end === 1 ? '' : 's'}`, feed: `${fmt(r.ozPerFeedLow)} to ${fmt(r.ozPerFeedHigh)} oz`, feeds: `${r.feedsPerDayLow} to ${r.feedsPerDayHigh}` };
  });
  const cap = calculateFeeding({ ageMonths: 3, weightLbs: 40, feedingType: 'formula' });  // heavy enough to hit the ceiling
  const rate = calculateFeeding({ ageMonths: 3, weightLbs: 10, feedingType: 'formula' }).weightOzPerLbPerDay;
  const out = [];
  const hdr = { size: 15, weight: 700, opacity: .6, spacing: 1.4 };
  out.push(text(0, 22, 'AGE', hdr), text(212, 22, 'PER FEED', hdr), text(w, 22, 'FEEDS A DAY', { ...hdr, anchor: 'end' }));
  rows.forEach((r, i) => {
    const y = 62 + i * 54;
    out.push(`<path d="M0 ${y - 36} H${w}" stroke="${C.cream}" stroke-opacity=".18" stroke-width="1.5"/>`);
    out.push(text(0, y, r.age, { size: 20, weight: 600 }));
    out.push(text(212, y + 1, r.feed, { size: 24, family: DISPLAY, weight: 600, fill: C.light }));
    out.push(text(w, y, r.feeds, { size: 20, opacity: .85, anchor: 'end' }));
  });
  const y = 62 + rows.length * 54 - 36;
  out.push(`<path d="M0 ${y} H${w}" stroke="${C.cream}" stroke-opacity=".18" stroke-width="1.5"/>`);
  out.push(icon('bottle', 0, y + 14, 30, C.light, 1.5));
  out.push(text(42, y + 36, `About ${fmt(rate)} oz per pound a day, up to ${fmt(cap.dailyOzHigh)} oz`, { size: 19, weight: 600, fill: C.light }));
  return out.join('');
}

// Sleep: naps, wake window and total sleep for every age band the tool knows.
function sleepChart(w, h) {
  const rows = [];
  for (let age = 0; age <= 24; age += 0.5) {
    const r = calculateSleepSchedule({ ageMonths: age, wakeTimeMins: 7 * 60 });
    if (r && !rows.some((x) => x.ageGroup === r.ageGroup)) rows.push(r);
  }
  const mins = (m) => (m < 60 ? `${m} min` : m % 60 ? `${Math.floor(m / 60)} h ${m % 60} min` : `${m / 60} h`);
  const hdrY = 18, rowH = Math.floor((h - 36) / rows.length), BAR_X = 560, BAR_W = w - BAR_X - 110, MAXH = 18;
  const x = (hrs) => BAR_X + (hrs / MAXH) * BAR_W;
  const out = [];
  const hdr = { size: 14, weight: 700, opacity: .6, spacing: 1.4 };
  out.push(text(0, hdrY, 'AGE', hdr), text(196, hdrY, 'NAPS', hdr), text(330, hdrY, 'WAKE WINDOW', hdr), text(BAR_X, hdrY, 'TOTAL SLEEP A DAY', hdr));
  rows.forEach((r, i) => {
    const y = 36 + i * rowH, mid = y + rowH / 2;
    out.push(`<path d="M0 ${y} H${w}" stroke="${C.cream}" stroke-opacity=".14" stroke-width="1"/>`);
    out.push(text(0, mid + 6, r.ageGroup.replace(/\s*\(.*\)/, '').replace('–', ' to '), { size: 18, weight: 600 }));
    for (let n = 0; n < r.napsPerDay; n++) out.push(`<circle cx="${204 + n * 18}" cy="${mid}" r="5.5" fill="${C.light}"/>`);
    if (r.napsPerDay === 0) out.push(text(198, mid + 6, 'none', { size: 16, opacity: .7 }));
    out.push(text(330, mid + 6, `${mins(r.wakeWindowMinsLow)} to ${mins(r.wakeWindowMinsHigh)}`, { size: 17, opacity: .85 }));
    out.push(`<rect x="${x(0)}" y="${mid - 8}" width="${BAR_W}" height="16" fill="${C.cream}" fill-opacity=".1"/>`);
    out.push(`<rect x="${x(r.totalSleepLow)}" y="${mid - 8}" width="${x(r.totalSleepHigh) - x(r.totalSleepLow)}" height="16" fill="${C.light}"/>`);
    out.push(text(w, mid + 6, `${r.totalSleepLow} to ${r.totalSleepHigh} h`, { size: 17, weight: 700, fill: C.light, anchor: 'end' }));
  });
  return out.join('');
}

// Diapers: changes a day by age band, and the first-year cost at the tool's default price.
function diaperData() {
  const PRICE = 0.25, EDGES = [0, 1, 3, 6, 9, 12, 18, 24, 36];  // AGE_BANDS in islands/diaper-cost.ts
  const bands = EDGES.slice(1).map((end, i) => {
    const start = EDGES[i];
    const r = calculateDiaperCost({ babyAgeMonths: (start + end) / 2, diaperPricePerUnit: PRICE, wipesPerDiaper: 0, wipesPricePerUnit: 0 });
    return { start, end, perDay: r.diapersPerDay, cost: r.diaperMonthlyCost * (end - start) };
  });
  const firstYear = bands.filter((b) => b.end <= 12).reduce((s, b) => s + b.cost, 0);
  return { PRICE, bands, firstYear };
}
function diaperChart(w, h) {
  const { bands } = diaperData();
  const slot = w / bands.length, bw = 40, base = 352, MAX = Math.max(...bands.map((b) => b.perDay)), scale = 280 / MAX;
  const out = [];
  out.push(text(0, 20, 'Diaper changes a day', { size: 16, weight: 700, opacity: .6, spacing: 1.2 }));
  bands.forEach((b, i) => {
    const cx = slot * i + slot / 2, bh = b.perDay * scale;
    out.push(`<rect x="${cx - bw / 2}" y="${base - bh}" width="${bw}" height="${bh}" fill="${b.end <= 12 ? C.terra : C.light}"/>`);
    out.push(text(cx, base - bh - 12, b.perDay, { size: 22, weight: 700, anchor: 'middle' }));
    out.push(text(cx, base + 26, `${b.start}\u2013${b.end}`, { size: 16, opacity: .75, anchor: 'middle' }));
  });
  out.push(`<path d="M0 ${base} H${w}" stroke="${C.cream}" stroke-opacity=".4" stroke-width="1.5"/>`);
  out.push(text(w / 2, base + 52, 'months old', { size: 15, opacity: .6, anchor: 'middle' }));
  out.push(`<rect x="0" y="${h - 22}" width="14" height="14" fill="${C.terra}"/>`, text(22, h - 10, 'First year', { size: 15, opacity: .8 }));
  out.push(`<rect x="118" y="${h - 22}" width="14" height="14" fill="${C.light}"/>`, text(140, h - 10, 'Second and third year', { size: 15, opacity: .8 }));
  return out.join('');
}

// Names: the top ten for each sex from the explorer's SSA list.
function namesChart(w, h) {
  const top = (sex) => BABY_NAMES.filter((n) => n.sex === sex && n.rank <= 10).sort((a, b) => a.rank - b.rank);
  const col = (x, title, list) => {
    const out = [text(x, 34, title, { size: 30, family: DISPLAY, weight: 600 }), text(x, 60, 'Top 10, SSA 2023', { size: 15, opacity: .62 })];
    list.forEach((n, i) => {
      const y = 100 + i * 34;
      out.push(text(x + 26, y, n.rank, { size: 17, weight: 700, fill: C.light, anchor: 'end' }));
      out.push(text(x + 40, y, n.name, { size: 22, weight: 600 }));
    });
    return out.join('');
  };
  return col(0, 'Boys', top('M')) + `<path d="M${w / 2 - 8} 12 V${h - 18}" stroke="${C.cream}" stroke-opacity=".22" stroke-width="1.5"/>` + col(w / 2 + 16, 'Girls', top('F'));
}

// Site default: the sprig, large.
function homeChart(w, h) {
  return sprig((w - 320) / 2, 24, 380, C.cream, 0.95);
}

/* ── The cards ──────────────────────────────────────────────────── */
const PREGNANCY = 'PREGNANCY', CONCEIVE = 'TRYING TO CONCEIVE', BABY = "BABY'S FIRST YEARS";
const { PRICE, firstYear } = diaperData();

const CARDS = [
  {
    slug: 'due-date-calculator', eyebrow: eyebrowFor(PREGNANCY), chart: calendarChart,
    title: 'Due date calculator',
    subtitle: 'Your last period plus 280 days, the rule ACOG endorses. Only about 1 in 20 babies arrives on the day, so you also get the window around it.',
  },
  {
    slug: 'how-many-weeks-pregnant', eyebrow: eyebrowFor(PREGNANCY), chart: weeksChart,
    title: 'How many weeks pregnant am I?',
    subtitle: 'Counted from the first day of your last period, not from conception. See your week and day, your trimester, and what is happening now.',
  },
  {
    slug: 'ovulation-fertility-window', eyebrow: eyebrowFor(CONCEIVE), chart: cycleChart,
    title: 'Ovulation and\nfertile window',
    subtitle: 'Ovulation comes about 14 days before your next period. The fertile window is six days, with the best odds one to two days before ovulation.',
  },
  {
    slug: 'pregnancy-weight-gain', eyebrow: eyebrowFor(PREGNANCY), chart: weightChart,
    title: 'Pregnancy\nweight gain',
    subtitle: 'Healthy gain depends on where you started. The IOM and NASEM total range for your pre-pregnancy BMI, for one baby or twins.',
  },
  {
    slug: 'maternity-leave-planner', eyebrow: eyebrowFor(PREGNANCY), chart: leaveChart, layout: 'wide',
    title: 'Maternity leave planner',
    subtitle: 'FMLA protects your job but does not pay you. See protected weeks, paid weeks, and your return date for your state and employer.',
  },
  {
    slug: 'baby-growth-percentile', eyebrow: eyebrowFor(BABY), chart: growthChart,
    title: 'Baby growth percentile',
    subtitle: 'Plot weight, length, or head size on the WHO charts US pediatricians use, birth to 24 months. A percentile is a snapshot, not a grade.',
  },
  {
    slug: 'feeding-formula-amount', eyebrow: eyebrowFor(BABY), chart: feedingChart,
    title: 'Baby feeding and formula amount',
    subtitle: 'How much formula or breast milk by age and weight, per AAP guidance: ounces and millilitres per feeding, feeds a day, and the daily total.',
  },
  {
    slug: 'baby-sleep-schedule', eyebrow: eyebrowFor(BABY), chart: sleepChart, layout: 'wide',
    title: 'Baby sleep schedule by age',
    subtitle: 'Wake windows, naps, bedtime, and total sleep for your baby’s age, from AAP and AASM guidance.',
  },
  {
    slug: 'diaper-cost-calculator', eyebrow: eyebrowFor(BABY), chart: diaperChart,
    title: 'Diaper and wipe cost',
    subtitle: 'Changes a day fall from about ten to four as your baby grows. See the monthly and first-year cost at the price you actually pay.',
    stat: `First year: about $${Math.round(firstYear)} in diapers at $${PRICE.toFixed(2)} each`,
  },
  {
    slug: 'baby-name-explorer', eyebrow: eyebrowFor(CONCEIVE), chart: namesChart,
    title: 'Baby name explorer',
    subtitle: 'The top 100 boy and girl names from the SSA, with meaning, origin, and rank. Filter by sex, popularity, or first letter.',
  },
];

const HOME = {
  eyebrow: 'FREE PREGNANCY & BABY TOOLS', chart: homeChart,
  title: 'From the first test to the first birthday',
  subtitle: 'Ten free, evidence-based calculators for trying to conceive, pregnancy, and the first years. No sign-up, no data stored.',
  footer: 'ACOG · AAP · CDC   ·   Reviewed by a senior medical student',
};

/* ── Render ─────────────────────────────────────────────────────── */
async function rasterize(svg) {
  const png2x = new Resvg(svg, { fitTo: { mode: 'width', value: W * 2 }, font: FONT }).render().asPng();
  const opts = { palette: true, colors: 256, quality: 92, effort: 9, dither: 0.2 };
  const big = await sharp(png2x).png(opts).toBuffer();
  const small = await sharp(png2x).resize(W).png(opts).toBuffer();
  return { big, small };
}

for (const c of CARDS) {
  const svg = card({ ...c, footer: TRUST });
  const { big, small } = await rasterize(svg);
  writeFileSync(join(OUT, `${c.slug}-chart.png`), small);
  writeFileSync(join(OUT, `${c.slug}-chart@2x.png`), big);
  if (process.env.KEEP_SVG) writeFileSync(join(OUT, `${c.slug}-chart.svg`), svg);
  console.log(`${c.slug}-chart.png  ${(small.length / 1024).toFixed(0)} KB  (@2x ${(big.length / 1024).toFixed(0)} KB)`);
}
{
  const { small } = await rasterize(card({ ...HOME }));
  writeFileSync(join(root, 'public', 'og-default.png'), small);
  console.log(`og-default.png  ${(small.length / 1024).toFixed(0)} KB`);
}
