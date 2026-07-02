/**
 * Minimal .ics (iCalendar) builder for all-day events.
 * Runs entirely in the browser; nothing is uploaded.
 */

export interface IcsEvent {
  title: string;
  date: Date;          // all-day event date
  description?: string;
}

function icsDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}${m}${day}`;
}

function escapeText(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

export function buildIcs(events: IcsEvent[], calendarName = 'Sage & Sprout'): string {
  const now = new Date();
  const stamp = `${icsDate(now)}T000000Z`;
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sage & Sprout//sage-and-sprout.com//EN',
    `X-WR-CALNAME:${escapeText(calendarName)}`,
  ];
  events.forEach((ev, i) => {
    const end = new Date(ev.date.getTime() + 86_400_000); // all-day events end the next day
    lines.push(
      'BEGIN:VEVENT',
      `UID:${icsDate(ev.date)}-${i}@sage-and-sprout.com`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${icsDate(ev.date)}`,
      `DTEND;VALUE=DATE:${icsDate(end)}`,
      `SUMMARY:${escapeText(ev.title)}`,
      ...(ev.description ? [`DESCRIPTION:${escapeText(ev.description)}`] : []),
      'END:VEVENT',
    );
  });
  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

/** Trigger a client-side download of the events as an .ics file. */
export function downloadIcs(events: IcsEvent[], filename: string, calendarName?: string): void {
  const blob = new Blob([buildIcs(events, calendarName)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.ics') ? filename : `${filename}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
