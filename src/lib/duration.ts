/**
 * Durations are written to the largest unit that applies: a workshop billed as
 * "410 minutes" is arithmetic the room has to do while you are still talking.
 *
 * Unit words are passed in rather than imported so this stays usable from the
 * client-side deck script, which receives its strings through a JSON bootstrap.
 */
export interface DurationUnits {
  hour: string;
  hours: string;
  minute: string;
  minutes: string;
  /** Between the number and its unit — a space in English, nothing in Chinese. */
  sep: string;
  /** Between the hour part and the minute part. */
  join: string;
}

export function formatDuration(totalMinutes: number, u: DurationUnits): string {
  const total = Math.max(0, Math.round(totalMinutes));
  const h = Math.floor(total / 60);
  const m = total % 60;
  const parts: string[] = [];
  if (h) parts.push(`${h}${u.sep}${h === 1 ? u.hour : u.hours}`);
  if (m || !h) parts.push(`${m}${u.sep}${m === 1 ? u.minute : u.minutes}`);
  return parts.join(u.join);
}

/**
 * Packs labs into sittings of at most `max` minutes, preserving the order the
 * dependency sort produced and never splitting a lab across a break.
 *
 * Attention runs out long before a day does, so the deck is organised around
 * sittings of roughly 90 to 120 minutes rather than one unbroken run.
 */
export function packSessions<T extends { minutes: number }>(items: T[], max = 120): T[][] {
  const sessions: T[][] = [];
  let current: T[] = [];
  let running = 0;

  for (const item of items) {
    if (current.length && running + item.minutes > max) {
      sessions.push(current);
      current = [];
      running = 0;
    }
    current.push(item);
    running += item.minutes;
  }
  if (current.length) sessions.push(current);
  return sessions;
}
