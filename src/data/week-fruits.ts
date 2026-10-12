/**
 * Hand-drawn line illustrations for each pregnancy week's size comparison,
 * in the same single-stroke style as the sprig. One drawing per fruit in
 * week-notes.ts (weeks 40 to 42 share the pumpkin). Each is a 100x100
 * viewBox of stroke-only paths; color comes from currentColor so the same
 * drawing works on sage or paper. pathLength="1" is added automatically so
 * the CSS draw-in animation can run on any shape.
 */

const ART: Record<number, string> = {
  4:  `<path d="M44 46 C46 40 58 42 58 50 C58 58 46 60 43 54 C42 51 42 48 44 46 Z"/><circle cx="34" cy="62" r="1.6"/><circle cx="64" cy="38" r="1.6"/><circle cx="40" cy="36" r="1.3"/>`,
  5:  `<path d="M50 34 C60 44 62 58 52 66 C42 58 40 44 50 34 Z"/><path d="M50 40 C51 48 51 56 50 62"/><circle cx="36" cy="60" r="1.4"/><circle cx="66" cy="42" r="1.4"/>`,
  6:  `<ellipse cx="50" cy="52" rx="21" ry="12"/><path d="M34 50 C40 44 60 44 66 50"/>`,
  7:  `<circle cx="50" cy="55" r="22"/><path d="M50 33 L50 26 M43 35 L39 29 M57 35 L61 29 M46 31 L45 25 M54 31 L55 25"/><path d="M38 48 C40 42 45 39 50 39"/>`,
  8:  `<path d="M38 40 C28 48 34 68 50 68 C66 68 72 54 66 44 C62 38 54 40 50 46 C46 40 42 38 38 40 Z"/><path d="M44 48 C46 52 50 56 54 58"/>`,
  9:  `<circle cx="50" cy="42" r="7"/><circle cx="41" cy="54" r="7"/><circle cx="59" cy="54" r="7"/><circle cx="50" cy="66" r="7"/><path d="M50 35 C50 30 54 28 58 26"/>`,
  10: `<path d="M38 52 C38 42 46 38 50 38 C56 38 62 44 62 52 C62 62 56 68 50 68 C44 68 38 62 38 52 Z"/><path d="M52 38 C56 30 64 30 68 34 C62 38 58 38 52 38 Z"/><path d="M44 48 C45 45 47 43 50 43"/>`,
  11: `<path d="M50 30 C52 40 66 46 66 58 C66 70 58 76 50 76 C42 76 34 70 34 58 C34 46 48 40 50 30 Z"/><path d="M50 30 L50 23"/><path d="M50 50 C50 58 50 66 50 72"/>`,
  12: `<circle cx="50" cy="53" r="24"/><path d="M48 29 C48 24 52 24 52 29"/><path d="M36 44 C39 37 45 33 52 33"/><circle cx="58" cy="60" r="1.4"/><circle cx="44" cy="64" r="1.4"/><circle cx="62" cy="48" r="1.4"/>`,
  13: `<path d="M22 56 C30 40 60 36 78 46 C66 60 40 66 22 56 Z"/><circle cx="36" cy="52" r="5"/><circle cx="50" cy="50" r="5"/><circle cx="64" cy="49" r="5"/><path d="M78 46 L84 42"/>`,
  14: `<path d="M28 52 C28 38 40 30 52 30 C64 30 74 38 74 50 C74 62 62 72 50 72 C38 72 28 64 28 52 Z"/><path d="M22 49 L28 51 M74 49 L80 47"/><path d="M56 30 C62 20 72 20 76 26 C70 31 62 32 56 30 Z"/>`,
  15: `<path d="M50 34 C40 26 26 34 28 50 C30 64 40 76 50 74 C60 76 70 64 72 50 C74 34 60 26 50 34 Z"/><path d="M50 34 L51 26"/><path d="M51 30 C56 24 62 24 64 28 C60 32 56 32 51 30 Z"/>`,
  16: `<path d="M50 24 C60 24 66 34 66 44 C66 56 60 76 50 76 C40 76 34 56 34 44 C34 34 40 24 50 24 Z"/><circle cx="50" cy="55" r="10"/><path d="M50 24 L50 18"/>`,
  17: `<path d="M50 26 C56 26 56 36 58 42 C62 50 70 56 68 66 C66 76 56 80 50 80 C44 80 34 76 32 66 C30 56 38 50 42 42 C44 36 44 26 50 26 Z"/><path d="M50 26 L52 18"/>`,
  18: `<path d="M26 56 C28 42 40 36 54 38 C68 40 78 48 76 58 C74 68 60 70 46 68 C34 66 24 66 26 56 Z"/><path d="M40 50 L42 52 M60 48 L62 50 M50 60 L52 62"/>`,
  19: `<path d="M50 34 C40 32 30 40 30 52 C30 66 40 74 50 74 C60 74 70 66 70 52 C70 40 60 32 50 34 Z"/><path d="M42 36 C42 48 44 60 44 72 M58 36 C58 48 56 60 56 72"/><path d="M50 34 L50 28 M44 32 L40 28 M56 32 L60 28"/>`,
  20: `<path d="M26 40 C34 30 56 30 72 44 C78 50 78 58 74 62 C66 54 50 44 30 48 C24 46 24 42 26 40 Z"/><path d="M30 44 C46 38 60 42 70 52"/><path d="M72 44 L78 40"/>`,
  21: `<path d="M44 30 C38 30 36 36 38 40 L48 78 L58 40 C60 36 58 30 52 30 Z"/><path d="M48 30 L46 20 M48 30 L52 18 M48 30 L56 22"/><path d="M42 46 L54 44 M44 56 L52 55"/>`,
  22: `<path d="M50 24 C58 24 64 34 64 46 C64 62 58 78 50 78 C42 78 36 62 36 46 C36 34 42 24 50 24 Z"/><circle cx="46" cy="56" r="1.6"/><circle cx="54" cy="56" r="1.6"/><circle cx="50" cy="51" r="1.6"/><circle cx="50" cy="61" r="1.6"/><path d="M50 24 L50 18"/>`,
  23: `<circle cx="50" cy="52" r="26"/><path d="M50 26 L50 78 M24 52 L76 52 M32 34 L68 70 M68 34 L32 70"/>`,
  24: `<path d="M50 22 C58 22 62 40 62 60 C62 72 56 80 50 80 C44 80 38 72 38 60 C38 40 42 22 50 22 Z"/><path d="M44 36 L44 72 M50 30 L50 76 M56 36 L56 72"/><path d="M38 60 C30 66 28 74 32 80 M62 60 C70 66 72 74 68 80"/>`,
  25: `<path d="M50 30 C38 30 30 40 30 52 C30 66 38 76 50 76 C62 76 70 66 70 52 C70 40 62 30 50 30 Z"/><path d="M50 76 L50 86"/><path d="M46 30 L44 20 M50 30 L50 18 M54 30 L56 20"/>`,
  26: `<path d="M50 26 C36 26 28 38 28 52 C28 66 38 76 50 76 C62 76 72 66 72 52 C72 38 64 26 50 26 Z"/><path d="M36 40 C44 36 56 36 64 40"/><path d="M34 54 C42 50 58 50 66 54"/>`,
  27: `<path d="M28 58 C28 42 38 32 50 32 C62 32 72 42 72 58 Z"/><path d="M34 52 C38 44 46 42 50 46 C54 42 62 44 66 52"/><path d="M28 58 L22 68 M72 58 L78 68"/>`,
  28: `<path d="M48 30 C36 30 30 44 32 58 C34 70 44 78 54 78 C66 78 72 66 70 54 C68 42 60 30 48 30 Z"/><path d="M40 32 C44 26 54 26 58 32 M42 32 L38 26 M56 32 L60 26 M49 28 L49 21"/>`,
  29: `<path d="M46 22 C52 22 54 28 54 36 L54 50 C64 52 70 60 68 70 C66 80 56 84 50 84 C44 84 34 80 32 70 C30 60 36 52 46 50 L46 36 C46 28 42 22 46 22 Z"/><path d="M50 22 L50 16"/>`,
  30: `<circle cx="50" cy="52" r="24"/><path d="M50 52 C56 52 58 46 54 44 C48 42 44 48 48 54 C52 60 62 58 62 50"/>`,
  31: `<circle cx="50" cy="54" r="24"/><circle cx="44" cy="46" r="2.5"/><circle cx="56" cy="46" r="2.5"/><circle cx="50" cy="56" r="2.5"/><path d="M30 60 C36 58 44 62 50 60"/>`,
  32: `<path d="M50 30 C38 32 28 42 30 54 C32 68 42 76 52 74 C64 72 72 62 70 50 C68 38 60 30 50 30 Z"/><path d="M50 30 C50 26 54 24 56 22"/><path d="M38 46 C42 50 48 52 54 50"/>`,
  33: `<path d="M38 44 C38 36 44 32 50 32 C56 32 62 36 62 44 L62 70 C62 78 56 82 50 82 C44 82 38 78 38 70 Z"/><path d="M40 50 L60 64 M40 62 L60 76 M60 50 L40 64 M60 62 L40 76"/><path d="M50 32 L50 18 M44 34 L38 22 M56 34 L62 22"/>`,
  34: `<circle cx="50" cy="52" r="24"/><path d="M30 46 C38 40 50 42 56 50 M34 62 C42 56 54 58 62 64 M44 30 C40 38 42 50 50 56"/>`,
  35: `<circle cx="50" cy="54" r="26"/><path d="M34 42 C38 36 44 32 50 32"/><path d="M50 28 C50 24 54 24 54 28"/>`,
  36: `<path d="M50 22 C40 24 36 40 36 58 C36 72 42 80 50 80 C58 80 64 72 64 58 C64 40 60 24 50 22 Z"/><path d="M50 30 L50 76"/><path d="M50 44 C44 42 40 46 38 52 M50 44 C56 42 60 46 62 52"/>`,
  37: `<path d="M44 82 L46 46 M50 82 L50 42 M56 82 L54 46"/><path d="M46 46 C36 42 32 32 36 24 C44 26 48 36 46 46 Z"/><path d="M50 42 C48 30 54 22 62 22 C62 32 56 40 50 42 Z"/><path d="M54 46 C62 42 68 44 68 52 C62 54 56 52 54 46 Z"/>`,
  38: `<path d="M42 84 L42 36 C42 24 58 24 58 36 L58 84 Z"/><path d="M42 36 L34 18 M50 30 L50 14 M58 36 L66 18"/><path d="M50 40 L50 80"/>`,
  39: `<circle cx="50" cy="52" r="26"/><path d="M38 34 C34 44 34 60 38 72 M50 28 C48 42 48 62 50 78 M62 34 C66 44 66 60 62 72"/>`,
  40: `<path d="M50 32 C32 32 24 44 24 54 C24 66 36 76 50 76 C64 76 76 66 76 54 C76 44 68 32 50 32 Z"/><path d="M42 34 C36 44 36 64 42 74 M58 34 C64 44 64 64 58 74"/><path d="M50 32 C50 26 53 24 57 23"/>`,
};

/** Inner SVG markup for a week, with pathLength="1" on every shape. Weeks 41 and 42 use the pumpkin. */
export function fruitInner(week: number): string {
  const w = Math.min(40, Math.max(4, Math.floor(week)));
  const art = ART[w] ?? ART[40];
  return art.replace(/<(path|circle|ellipse)\b/g, '<$1 pathLength="1"');
}

/** A complete <svg> string for a week, sized in px. */
export function fruitSvg(week: number, size = 64, extraClass = ''): string {
  return `<svg class="fruit-svg${extraClass ? ' ' + extraClass : ''}" width="${size}" height="${size}" viewBox="0 0 100 100" aria-hidden="true">${fruitInner(week)}</svg>`;
}
