/**
 * The entry gate of the programme.
 *
 * This is a methodology, not a course: it runs in stages, each stage needs
 * inputs, and those inputs decide what the next step is. Section 08 of the
 * story states the rule the whole tool exists to enforce — *nothing advances
 * because time passed, it advances because a gate was cleared.* This module is
 * the first of those gates.
 *
 * The site's argument is that activity is not value: 85% invested more, 91%
 * will invest more still, 6% saw a measurable payback. This answers the
 * follow-up — *why not, and where do you enter?*
 *
 * Three dimensions, and they are not the same kind of thing:
 *
 *   maturity   scored   how far along the organisation actually is with AI
 *   resources  scored   what of the Microsoft stack is already in place
 *   goal       chosen   who they want to enable, and to what end
 *
 * Goal is not a score. Wanting every employee to build small things is not
 * *worse* than wanting a centre of excellence — it is a different destination.
 * So goal names the **ambition tier**, while maturity × resources decide the
 * **supported tier**, and the interesting number is the distance between them.
 *
 * Note what is absent: sponsorship, exit criteria, DLP policy. Those are real
 * and they still gate the programme — but they belong to the Sponsor Charter
 * instrument in Stage 01, asked of a sponsor. Asking them at first contact
 * produced a questionnaire in IT-governance language that the business people
 * actually in the room could not answer.
 *
 * The important design decision here is that the result is **two-dimensional**.
 * Returning a single "you are Tier 2" score would waste the diagnosis, because
 * the most common real situation is an organisation whose capability is well
 * ahead of its readiness. That gap is the mechanism behind the 6%: they can
 * build things, they just cannot ship or sustain them. Telling such a customer
 * "you are Tier 2" is useless; telling them "you have Tier 3 ambition and
 * Tier 1 readiness, and that gap is why your last three pilots died" is the
 * whole value of the exercise.
 *
 *   CAPABILITY  = makers × systems         → what you can build
 *   READINESS   = governance × sponsorship → whether it survives contact
 *
 * Pure functions, no DOM, no storage. The instrument is normally driven by a
 * facilitator with the customer in the room, but it is deliberately neutral
 * about who is holding it — Microsoft, a partner, or the customer themselves.
 * The stages and the gates are the same either way, so nothing in this engine
 * is allowed to assume a driver.
 */

export const DIMENSIONS = ['maturity', 'resources', 'goal'] as const;
export type Dimension = (typeof DIMENSIONS)[number];

/** The dimensions that roll up into a score. `goal` names a target instead. */
export const SCORED_DIMENSIONS = ['maturity', 'resources'] as const;
export type ScoredDimension = (typeof SCORED_DIMENSIONS)[number];

export type Answers = Record<string, number>;

export type Tier = 1 | 2 | 3;
export type Band = 'low' | 'mid' | 'high';

export interface DimensionScore {
  dimension: Dimension;
  /** Raw total across that dimension's questions. */
  raw: number;
  max: number;
  /** 0–1. */
  score: number;
  band: Band;
}

export interface Diagnosis {
  dimensions: Record<ScoredDimension, DimensionScore>;
  /** Combined maturity × resources, 0–1. What they can currently support. */
  support: number;
  supportedTier: Tier;
  /** Where the goal answers point. What they are reaching for. */
  ambitionTier: Tier;
  /** What we actually recommend — never above what is supported. */
  startTier: Tier;
  /** ambitionTier − supportedTier. Positive means reach exceeds grasp. */
  gap: number;
  verdict: Verdict;
  /** Questions answered at 0 or 1, weakest first — the resources to line up. */
  shortfalls: string[];
  /** Where this lands on the site's chaos → certainty axis, 0–1. */
  axisPosition: number;
  complete: boolean;
  answered: number;
  total: number;
}

/**
 * `nascent`  — barely started, whatever the goal says. Technically the ambition
 *              and the support can still "agree" at the bottom, but telling a
 *              room with neither that they are nicely aligned is true and
 *              useless. Starting from zero is its own situation.
 * `aligned`  — ambition and support meet. Start there and let the gates set pace.
 * `gap`      — reaching further than they can currently carry. The 6% mechanism,
 *              and the most common finding.
 * `headroom` — supported comfortably beyond the stated goal. The constraint is
 *              ambition, not capability — they could aim higher than they are.
 */
export type Verdict = 'nascent' | 'aligned' | 'gap' | 'headroom';

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

function bandOf(score: number): Band {
  if (score < 0.4) return 'low';
  if (score < 0.7) return 'mid';
  return 'high';
}

function tierOf(score: number): Tier {
  if (score < 0.4) return 1;
  if (score < 0.7) return 2;
  return 3;
}

/**
 * Combine maturity and resources, weighted toward the weaker one.
 *
 * These two genuinely trade off badly: licences with nobody who understands
 * agents produces shelfware, and enthusiasm with no Copilot Studio environment
 * produces nothing at all. A plain average would let either hide the other. A
 * strict minimum is too cliff-edged for a nine-question sample. This sits
 * between — the weaker side carries about two thirds — and it is explainable in
 * one sentence, which matters more here than elegance: your weakest side counts
 * most.
 */
export function combineAxis(a: number, b: number): number {
  return clamp01(0.65 * Math.min(a, b) + 0.35 * ((a + b) / 2));
}

export interface QuestionLike {
  id: string;
  data: {
    dimension: Dimension;
    options: { score: number; tier?: Tier }[];
  };
}

export function diagnose(questions: QuestionLike[], answers: Answers): Diagnosis {
  const dimensions = {} as Record<ScoredDimension, DimensionScore>;

  for (const dimension of SCORED_DIMENSIONS) {
    const owned = questions.filter((q) => q.data.dimension === dimension);
    const max = owned.reduce((sum, q) => sum + Math.max(...q.data.options.map((o) => o.score)), 0);
    const raw = owned.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
    const score = max > 0 ? clamp01(raw / max) : 0;
    dimensions[dimension] = { dimension, raw, max, score, band: bandOf(score) };
  }

  const support = combineAxis(dimensions.maturity.score, dimensions.resources.score);
  const supportedTier = tierOf(support);

  // Ambition is the mean of the tiers the goal answers point at, rounded — not
  // the maximum. Someone who wants a centre of excellence but has one
  // department and one quarter is describing Tier 2, and taking the highest
  // single answer would flatter them into Tier 3.
  const goals = questions.filter((q) => q.data.dimension === 'goal');
  const goalTiers = goals
    .map((q) => q.data.options[answers[q.id] ?? -1]?.tier)
    .filter((x): x is Tier => x !== undefined);
  const ambitionTier = (
    goalTiers.length
      ? Math.min(3, Math.max(1, Math.round(goalTiers.reduce((a, b) => a + b, 0) / goalTiers.length)))
      : 1
  ) as Tier;

  // Support is a ceiling, not a modifier. Whatever the ambition, an
  // organisation without the understanding or the licences to carry it should
  // not begin where the blast radius is largest — that is how pilots die.
  const startTier = Math.min(ambitionTier, supportedTier) as Tier;
  const gap = ambitionTier - supportedTier;

  const verdict: Verdict =
    support < 0.4 && ambitionTier === 1
      ? 'nascent'
      : gap > 0
        ? 'gap'
        : gap < 0
          ? 'headroom'
          : 'aligned';

  // Which specific things to line up, weakest first. Per question rather than
  // per dimension: "no Copilot Studio licence" and "nobody has built a flow"
  // are both low resources and need entirely different next steps.
  const shortfalls = questions
    .filter((q) => q.data.dimension !== 'goal' && (answers[q.id] ?? 0) <= 1)
    .sort((a, b) => (answers[a.id] ?? 0) - (answers[b.id] ?? 0))
    .map((q) => q.id);

  const answered = questions.filter((q) => answers[q.id] !== undefined).length;

  return {
    dimensions,
    support,
    supportedTier,
    ambitionTier,
    startTier,
    gap,
    verdict,
    shortfalls,
    // The site's own axis. Support is what actually moves an organisation
    // toward certainty; ambition alone is the thing the story calls activity.
    axisPosition: clamp01(support * 0.75 + (ambitionTier - 1) * 0.125),
    // `answered === questions.length` alone reports an empty question set as
    // complete, which silently renders a result page for a diagnosis that was
    // never run. Guard the degenerate case explicitly.
    complete: questions.length > 0 && answered === questions.length,
    answered,
    total: questions.length,
  };
}

/**
 * Where this organisation enters the programme.
 *
 * Not a call to action — an entry point. Stage 01 produces a shared vision and
 * a signed charter, and neither is worth much to an organisation that does not
 * yet have a licence to build in or a shared idea of what an agent is. A low
 * support score therefore does not mean "talk to us", it means there is
 * groundwork Stage 01 itself cannot manufacture, and running it anyway
 * produces a document nobody acts on.
 *
 * At the other end, an organisation already fluent and already licensed does
 * not need Stage 01 run at full length; for them it is a confirmation, and the
 * real work starts at scenario intake.
 */
export type Entry = 'prerequisites' | 'stage-01' | 'accelerated';

export function entryPoint(d: Diagnosis): Entry {
  if (d.support < 0.4) return 'prerequisites';
  if (d.support >= 0.7) return 'accelerated';
  return 'stage-01';
}

/**
 * How this tier gets delivered.
 *
 * The tier is not only a statement about which scenarios to pursue — it decides
 * the delivery motion, because the three tiers differ in who can realistically
 * carry the work:
 *
 *   Tier 1  self-serve   Everyday productivity is defined as work business
 *                        users do themselves. The programme's job is capacity:
 *                        product training and enough worked examples that the
 *                        first build is not a blank page.
 *   Tier 2  case-led     Process innovation is specialist work, and the fastest
 *                        route is a reference case close enough to adapt rather
 *                        than a method taught in the abstract.
 *   Tier 3  partner-led  Enterprise-wide agentic transformation is not something
 *                        a customer self-serves or a workshop finishes. It gets
 *                        scoped with a delivery partner who has done it.
 *
 * Orthogonal to `entryPoint`, which asks a readiness question — *can Stage 01
 * produce a charter anyone will honour?* A customer can be Tier 1 self-serve and
 * still have prerequisites to fix first. Both belong on the result.
 */
export type Motion = 'self-serve' | 'case-led' | 'partner-led';

export const MOTION_BY_TIER: Record<Tier, Motion> = {
  1: 'self-serve',
  2: 'case-led',
  3: 'partner-led',
};

export function deliveryMotion(tier: Tier): Motion {
  return MOTION_BY_TIER[tier];
}



/* ------------------------------------------------------------------ *
 * Sharing
 *
 * The site is statically hosted, so there is no server to POST answers to.
 * Encoding them in the URL keeps a result shareable — a customer can send it
 * to their sponsor, or paste it to the Microsoft team ahead of a first
 * meeting — with no backend and nothing stored anywhere they did not choose.
 * One base-4 digit per question, in the collection's own order.
 * ------------------------------------------------------------------ */

export function encodeAnswers(questions: QuestionLike[], answers: Answers): string {
  return questions.map((q) => String(answers[q.id] ?? 0)).join('');
}

export function decodeAnswers(questions: QuestionLike[], code: string): Answers | null {
  const trimmed = code.trim();
  if (trimmed.length !== questions.length) return null;
  if (!/^[0-3]+$/.test(trimmed)) return null;
  const answers: Answers = {};
  questions.forEach((q, i) => {
    answers[q.id] = Number(trimmed[i]);
  });
  return answers;
}
