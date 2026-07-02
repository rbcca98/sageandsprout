/**
 * Week-by-week pregnancy notes shown in the due-date and weeks-pregnant results.
 * Size comparisons follow the conventional US "fruit chart"; milestones reflect
 * standard ACOG/AAP patient-education timing. Keep each note short, warm, and
 * free of precise clinical claims (those live in the tool articles with citations).
 */

export interface WeekNote {
  size: string;   // "about the size of a ..."
  note: string;   // one short sentence about this week
}

export const WEEK_NOTES: Record<number, WeekNote> = {
  4:  { size: 'poppy seed', note: 'The embryo has just implanted, and the placenta is starting to form.' },
  5:  { size: 'sesame seed', note: 'The neural tube, the start of the brain and spinal cord, is forming.' },
  6:  { size: 'lentil', note: 'A heartbeat is often visible on ultrasound around now.' },
  7:  { size: 'blueberry', note: 'Small buds that will become arms and legs are appearing.' },
  8:  { size: 'kidney bean', note: 'Fingers and toes are starting to form.' },
  9:  { size: 'grape', note: 'All essential organs have begun to develop.' },
  10: { size: 'kumquat', note: 'The embryonic period ends; your baby is now officially a fetus.' },
  11: { size: 'fig', note: 'Tooth buds and nail beds are forming.' },
  12: { size: 'lime', note: 'Reflexes are developing; many parents share their news after this week.' },
  13: { size: 'pea pod', note: 'The last week of the first trimester. Nausea often starts to ease soon.' },
  14: { size: 'lemon', note: 'Welcome to the second trimester, often the most comfortable stretch.' },
  15: { size: 'apple', note: 'Your baby can sense light and is practicing swallowing.' },
  16: { size: 'avocado', note: 'Some parents feel the first flutters in the next few weeks.' },
  17: { size: 'pear', note: 'The skeleton is changing from soft cartilage to bone.' },
  18: { size: 'sweet potato', note: 'First movements are commonly felt around now, especially if this is not your first pregnancy.' },
  19: { size: 'heirloom tomato', note: 'A protective coating called vernix is forming on the skin.' },
  20: { size: 'banana', note: 'Halfway there. The anatomy scan usually happens around this week.' },
  21: { size: 'carrot', note: 'Movements are getting stronger and more predictable.' },
  22: { size: 'papaya', note: 'Your baby can hear sounds from outside now, including your voice.' },
  23: { size: 'grapefruit', note: 'Hearing is improving; loud sounds may cause a startle.' },
  24: { size: 'ear of corn', note: 'A big developmental milestone week for lung development.' },
  25: { size: 'rutabaga', note: 'Baby is settling into regular sleep and wake cycles.' },
  26: { size: 'head of lettuce', note: 'Eyes are beginning to open around this time.' },
  27: { size: 'cauliflower', note: 'The last week of the second trimester. Hiccups may feel like rhythmic taps.' },
  28: { size: 'eggplant', note: 'Third trimester begins. Prenatal visits usually move to every two weeks.' },
  29: { size: 'butternut squash', note: 'Baby is gaining weight quickly from here on.' },
  30: { size: 'cabbage', note: 'Your baby is practicing breathing movements.' },
  31: { size: 'coconut', note: 'Kicks may feel more like rolls and stretches as space gets tighter.' },
  32: { size: 'jicama', note: 'Many babies settle head-down around now.' },
  33: { size: 'pineapple', note: 'Bones are hardening, though the skull stays soft for birth.' },
  34: { size: 'cantaloupe', note: 'The lungs are maturing fast now.' },
  35: { size: 'honeydew melon', note: 'Weekly visits usually start at 36 weeks; the bag is worth packing soon.' },
  36: { size: 'romaine lettuce', note: 'Your provider will check position; weekly visits typically begin now.' },
  37: { size: 'bunch of Swiss chard', note: 'Early term. Every extra day helps the lungs and brain mature.' },
  38: { size: 'leek', note: 'Baby is shedding vernix and building fat for temperature control.' },
  39: { size: 'mini watermelon', note: 'Full term. Labor could start any day now.' },
  40: { size: 'small pumpkin', note: 'Your due date week. Only about 1 in 20 babies arrives exactly on the date.' },
  41: { size: 'small pumpkin', note: 'Late term. Your provider will discuss monitoring and possibly induction.' },
  42: { size: 'small pumpkin', note: 'Post-term. Most providers recommend delivery by the end of this week.' },
};

/** Note for the current gestational week, or null outside 4-42. */
export function weekNote(week: number): (WeekNote & { week: number }) | null {
  const w = Math.min(42, Math.max(0, Math.floor(week)));
  const n = WEEK_NOTES[w];
  return n ? { week: w, ...n } : null;
}
