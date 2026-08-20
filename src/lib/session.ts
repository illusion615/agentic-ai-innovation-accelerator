/**
 * One run of the programme with one customer, as a serialisable object.
 *
 * The design brief fixes this shape from day one for a reason: every
 * instrument in the tool writes into the same session, and the session is the
 * thing the room leaves with. A stage's inputs are another stage's evidence —
 * the readiness diagnosis decides where you enter, the charter closes Stage 01,
 * the scenario backlog feeds prioritisation, and the Top 3 is what the gates
 * are then measured against.
 *
 * All reads and writes go through `SessionStore`. The default implementation is
 * local storage, so the tool works in a customer meeting room with no network
 * and nothing leaves the machine. Swapping in a backend later means replacing
 * the implementation, not touching anything above it.
 */

import type { Answers } from './assessment';

export const STAGES = ['discover', 'inspire', 'prioritize', 'build', 'adopt'] as const;
export type Stage = (typeof STAGES)[number];

/**
 * The five gates from section 08, keyed exactly as the story data keys them so
 * the console joins against the same records rather than maintaining a second,
 * silently diverging list of the programme's own structure.
 */
export const GATES = ['w0', 'w2', 'w4', 'w6', 'w8'] as const;
export type Gate = (typeof GATES)[number];

/**
 * Which gates close which stage. Stage 02 has no gate of its own — collecting
 * scenarios is not a checkpoint, the prioritisation that follows is — and
 * Stage 04 carries two, because a demo that works and a build that is safe to
 * operate are separate claims.
 */
export const STAGE_GATES: Record<Stage, Gate[]> = {
  discover: ['w0'],
  inspire: [],
  prioritize: ['w2'],
  build: ['w4', 'w6'],
  adopt: ['w8'],
};

export interface GateStatus {
  gate: Gate;
  state: 'open' | 'cleared' | 'blocked';
  clearedAt?: string;
  note?: string;
}

export interface Scenario {
  id: string;
  title: string;
  tier: 1 | 2 | 3;
  department?: string;
  pain?: string;
  submittedBy?: string;
  /**
   * What a build of this would exercise. This is the join to the lab shelf: a
   * customer's lab path is the union of these across everything they collected,
   * which is how the programme generalises from particular scenarios to the
   * tools their people actually need to learn.
   */
  capabilities?: string[];
  /**
   * Set when the entry was taken from an example rather than written. The
   * example's own text is then rendered in whichever language the reader is
   * in, so a list collected in one edition still reads correctly in the other.
   * Absent on entries the customer typed — those are their words and are shown
   * exactly as written.
   */
  sourceId?: string;
}

export interface ScoreCard {
  scenarioId: string;
  value: number;
  complexity: number;
  effort: number;
  dataReadiness: number;
}

/**
 * What the reader found when they went and checked. `unknown` is never stored
 * — an unanswered item is simply absent, so a half-finished checklist and a
 * checklist nobody has opened are the same record.
 */
export type CheckState = 'ok' | 'blocked' | 'na';

export interface ProgramSession {
  id: string;
  /** Bumped when the shape changes so `migrate` can upgrade older records. */
  version: number;
  customer: string;
  facilitator: string;
  createdAt: string;
  updatedAt: string;

  /** Stage 00 — the entry gate. */
  readiness: { answers: Answers } | null;

  /** Can this tenant actually run a lab? Keyed by checklist item id. */
  checklist: Record<string, CheckState>;

  /** Stage 01 — DISCOVER & ALIGN. */
  charter: {
    goals: string;
    board: string;
    exitCriteria: string;
    roiHorizon: string;
    signedBy: string;
  } | null;

  /** Stage 02 — INSPIRE & COLLECT. */
  scenarios: Scenario[];

  /** Stage 03 — PRIORITIZE TOP 3. */
  scoring: ScoreCard[];
  top3: string[];

  /** Stages 04–05 — BUILD & LEARN, ADOPT & SCALE. */
  gates: GateStatus[];
}

export const SESSION_VERSION = 1;

export function createSession(partial: Partial<ProgramSession> = {}): ProgramSession {
  const now = new Date().toISOString();
  return {
    id: partial.id ?? crypto.randomUUID(),
    version: SESSION_VERSION,
    customer: '',
    facilitator: '',
    createdAt: now,
    updatedAt: now,
    readiness: null,
    checklist: {},
    charter: null,
    scenarios: [],
    scoring: [],
    top3: [],
    gates: GATES.map((gate) => ({ gate, state: 'open' as const })),
    ...partial,
  };
}

export interface SessionMeta {
  id: string;
  customer: string;
  updatedAt: string;
}

export interface SessionStore {
  load(id: string): Promise<ProgramSession | null>;
  save(session: ProgramSession): Promise<void>;
  list(): Promise<SessionMeta[]>;
  remove(id: string): Promise<void>;
}

const KEY_PREFIX = 'aiia:session:';
const ACTIVE_KEY = 'aiia:active-session';

/**
 * Local-storage implementation. Deliberately tolerant: a meeting room is a bad
 * place to discover that a quota error or a half-written record has thrown away
 * an hour of the customer's work, so reads never throw and a failed write is
 * reported rather than propagated.
 */
export class LocalSessionStore implements SessionStore {
  private available: boolean;

  constructor() {
    this.available = (() => {
      try {
        const probe = '__aiia__';
        localStorage.setItem(probe, '1');
        localStorage.removeItem(probe);
        return true;
      } catch {
        return false;
      }
    })();
  }

  async load(id: string): Promise<ProgramSession | null> {
    if (!this.available) return null;
    try {
      const raw = localStorage.getItem(KEY_PREFIX + id);
      return raw ? migrate(JSON.parse(raw)) : null;
    } catch {
      return null;
    }
  }

  async save(session: ProgramSession): Promise<void> {
    if (!this.available) return;
    session.updatedAt = new Date().toISOString();
    try {
      localStorage.setItem(KEY_PREFIX + session.id, JSON.stringify(session));
    } catch (err) {
      console.warn('[aiia] could not persist session', err);
    }
  }

  async list(): Promise<SessionMeta[]> {
    if (!this.available) return [];
    const out: SessionMeta[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key?.startsWith(KEY_PREFIX)) continue;
      try {
        const s = JSON.parse(localStorage.getItem(key)!) as ProgramSession;
        out.push({ id: s.id, customer: s.customer, updatedAt: s.updatedAt });
      } catch {
        /* skip unreadable record */
      }
    }
    return out.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  async remove(id: string): Promise<void> {
    if (!this.available) return;
    localStorage.removeItem(KEY_PREFIX + id);
  }
}

/** Upgrade an older stored record to the current shape. */
function migrate(raw: unknown): ProgramSession {
  const s = raw as Partial<ProgramSession>;
  // Spread-over-defaults would keep an older record's missing keys missing, so
  // anything added since must be defaulted explicitly.
  return createSession({ ...s, checklist: s.checklist ?? {}, version: SESSION_VERSION });
}

/* -------- the active session, so instruments share one record -------- */

export function activeSessionId(): string | null {
  try {
    return localStorage.getItem(ACTIVE_KEY);
  } catch {
    return null;
  }
}

export function setActiveSessionId(id: string): void {
  try {
    localStorage.setItem(ACTIVE_KEY, id);
  } catch {
    /* non-fatal: the tool still works for the length of this page view */
  }
}

/** Load the active session, creating one on first use. */
export async function openActiveSession(store: SessionStore): Promise<ProgramSession> {
  const id = activeSessionId();
  if (id) {
    const existing = await store.load(id);
    if (existing) return existing;
  }
  const fresh = createSession();
  setActiveSessionId(fresh.id);
  await store.save(fresh);
  return fresh;
}

/* -------- export / import: today's cross-device sync -------- */

export function toJSON(session: ProgramSession): string {
  return JSON.stringify(session, null, 2);
}

export function fromJSON(text: string): ProgramSession | null {
  try {
    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== 'object' || !('id' in parsed)) return null;
    return migrate(parsed);
  } catch {
    return null;
  }
}
