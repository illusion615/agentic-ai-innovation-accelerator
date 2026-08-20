import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

/**
 * Portal content lives in collections, not in the i18n dictionaries.
 *
 * The story page's copy is a fixed set of fields, so a typed Dictionary works
 * for it. The portal's content is a *list* that will keep growing — twelve
 * assessment questions today, nine scenario playbooks and a training path next.
 * Putting that in `en.ts` / `zh.ts` (already ~570 lines each for a single page)
 * would make both unreviewable and unmaintainable.
 *
 * Both languages sit side by side in each record on purpose: a translator
 * reviewing the Chinese needs the English in front of them, and a schema over
 * both makes a missing translation a build failure rather than a blank on a
 * screen in front of a customer.
 */

const localisedText = z.object({
  prompt: z.string(),
  help: z.string(),
  /**
   * A short noun phrase naming what is missing — "Copilot Studio licences",
   * not the question that found it. The result page lists these, and a
   * facilitator scanning the list needs labels, not a column of questions.
   */
  gapTitle: z.string().optional(),
  /**
   * What to do about it when this question scores low. Written per question,
   * not per dimension, because "you have no Copilot Studio licence" and "nobody
   * here has built a flow" need completely different next steps — and matching
   * the right resource to a customer is half the point of asking.
   *
   * Required on scored questions; meaningless on goal questions, which express
   * an intent rather than a shortfall.
   */
  gap: z.string().optional(),
});

/**
 * Two kinds of question, deliberately.
 *
 * `maturity` and `resources` are *scored*: their options run 0–3 from least to
 * most ready, and they roll up into how much this organisation can currently
 * support.
 *
 * `goal` is not a score. Wanting to enable every employee is not "worse" than
 * wanting a centre of excellence — it is a different destination. So its
 * options carry a `tier` instead, and they name the ambition the diagnosis is
 * then measured against.
 */
const questions = defineCollection({
  loader: file('src/content/questions.json'),
  schema: z
    .object({
      dimension: z.enum(['maturity', 'resources', 'goal']),
      order: z.number().int().positive(),
      en: localisedText,
      zh: localisedText,
      options: z
        .array(
          z.object({
            value: z.string(),
            score: z.number().int().min(0).max(3),
            /** Present on goal options only: which tier this answer points at. */
            tier: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
            en: z.string(),
            zh: z.string(),
          })
        )
        .length(4)
        .refine(
          (opts) => opts.every((o, i) => o.score === i),
          'Options must be listed in ascending score order 0,1,2,3.'
        ),
    })
    .superRefine((q, ctx) => {
      if (q.dimension === 'goal') {
        if (q.options.some((o) => o.tier === undefined)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Every option on a goal question must declare a tier.',
          });
        }
        return;
      }
      // A scored question with no remedy produces a diagnosis that names a
      // shortfall and then says nothing about it.
      for (const lang of ['en', 'zh'] as const) {
        if (!q[lang].gap || !q[lang].gapTitle) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Scored questions need ${lang}.gapTitle and ${lang}.gap so a low answer produces a named, actionable shortfall.`,
          });
        }
      }
    }),
});

/**
 * The reading shelf: pointers into the Knowledge Hub, not copies of it.
 *
 * The background reading this programme needs — what Copilot Studio is, what it
 * costs, where its limits are, how Power Platform licensing and Dataverse roles
 * work — is already written, in the Knowledge Hub repo, and that is where it
 * stays. Restating it here would fork the same material into two places and
 * guarantee they drift.
 *
 * So a record is a *link with a reason*: which hub article, and why it matters
 * at this point in the programme. `id` and `slug` both exist because the hub's
 * article id and its folder name are not always the same
 * (`agentic-ai-adoption` lives at `posts/agentic-ai-adoption-practice/`).
 *
 * `title` is duplicated from the hub, unavoidably — the hub is a separate repo
 * with no build-time import, and a link needs its own text. Titles change
 * rarely; summaries change often, which is why `why` is written here in this
 * programme's own voice rather than copied.
 */
const knowledge = defineCollection({
  loader: file('src/content/knowledge.json'),
  schema: z.object({
    /**
     * Where this sits in the flow:
     *   start — read before the twelve questions
     *   build — read before your hands are on the tool
     *   it    — hand to whoever owns licences, environments and identity
     */
    group: z.enum(['start', 'build', 'it']),
    order: z.number().int().positive(),
    /** Folder under the hub's `posts/`. */
    slug: z.string().min(1),
    en: z.object({ title: z.string(), why: z.string() }),
    zh: z.object({ title: z.string(), why: z.string() }),
  }),
});

/**
 * The environment checklist: what has to be true before a lab is possible.
 *
 * The twelve questions establish *where* you enter. They cannot establish
 * whether you can actually sign in, build, publish and keep the thing running —
 * those are facts about a tenant that only someone inside it can check. So each
 * item is phrased as something the reader goes and *does*, and records the
 * answer against.
 *
 * `derivedFrom` and `flagBelow` are what make this a diagnosis rather than a
 * generic list: when the reader's answer to that question was at or below the
 * threshold, the item is pre-flagged as the likely blocker and sorted to the
 * top. The programme already knows where they are weakest; the checklist should
 * not make them rediscover it.
 *
 * `minTier` scopes the list. A Tier 1 reader doing a first self-serve build
 * should not be handed environment-strategy questions that belong to a
 * transformation three tiers up.
 */
const checklist = defineCollection({
  loader: file('src/content/checklist.json'),
  schema: z.object({
    /** access → build → publish → sustain: the order a lab actually fails in. */
    group: z.enum(['access', 'build', 'publish', 'sustain']),
    order: z.number().int().positive(),
    /** Lowest tier this item applies to. */
    minTier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    /** Question id in questions.json whose answer predicts this item. */
    derivedFrom: z.string().min(1),
    /** Pre-flag the item when that question scored at or below this. */
    flagBelow: z.number().int().min(0).max(3),
    /**
     * Somewhere the reader can go and find out for themselves. Optional: some
     * items are answered by asking a colleague, and inventing a link for those
     * would be worse than admitting there isn't one.
     */
    verifyUrl: z.string().url().optional(),
    en: z.object({
      title: z.string(),
      gates: z.string(),
      how: z.string(),
      verifyLabel: z.string(),
    }),
    zh: z.object({
      title: z.string(),
      gates: z.string(),
      how: z.string(),
      verifyLabel: z.string(),
    }),
  }),
});

/**
 * The twelve capabilities a Copilot Studio build can call on.
 *
 * This list is the join between what a customer wants and what they must be
 * taught: a scenario is tagged with the capabilities its build would exercise,
 * a lab module teaches exactly one of them, and the lab path for a given
 * customer is the union of the tags across the scenarios they collected.
 *
 * Which is the point of the whole exercise. The accelerator is not there to
 * build somebody's expense bot for them — it is there to work out, from the
 * scenarios they brought, which tools they need to be able to reach for, and
 * then teach those. Generalising from the particular is the deliverable.
 */
const CAPABILITIES = [
  'agent-basics',
  'knowledge-grounding',
  'topics-flow',
  'orchestration',
  'actions-connectors',
  'power-automate',
  'doc-extraction',
  'human-approval',
  'dataverse',
  'channels-publish',
  'governance',
  'measurement',
] as const;

/**
 * Example scenarios — prompts for intake, not a gallery.
 *
 * The accelerator does not sell training; it works out what to build from the
 * customer's own business needs, and a lab is then designed for the scenario
 * they chose. Which makes collecting those scenarios (stage 02) the work that
 * has to happen *before* any lab exists, and makes these examples a tool for
 * that collection rather than decoration: a reader recognises one, says "we
 * have that too", and it lands in their own list.
 *
 * Grouped by department rather than industry, because agentic scenarios today
 * rhyme far more strongly across companies in the same function than across
 * companies in the same sector.
 */
const scenarios = defineCollection({
  loader: file('src/content/scenarios.json'),
  schema: z.object({
    department: z.enum(['general', 'crm', 'finance', 'hr', 'it']),
    /** Which tier this shape of work usually belongs to. */
    tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    /** What a build of this would actually exercise — the join to lab modules. */
    capabilities: z.array(z.enum(CAPABILITIES)).min(1),
    en: z.object({ title: z.string(), pain: z.string(), changes: z.string() }),
    zh: z.object({ title: z.string(), pain: z.string(), changes: z.string() }),
  }),
});

/**
 * The lab shelf: one module per capability, composed rather than authored.
 *
 * Writing a bespoke lab per scenario does not scale and mostly rewrites the
 * same six exercises. One module per capability does: a customer's path is the
 * modules their own scenarios call for, in dependency order, and a module
 * written once serves every scenario that needs it.
 *
 * `requires` is a real dependency, not a suggestion — the composed path is a
 * topological sort of it, so a reader is never handed "call a flow from your
 * agent" before they have built an agent.
 */
const labs = defineCollection({
  loader: file('src/content/labs.json'),
  schema: z.object({
    /** Presentation order within a dependency tier; also the tie-break. */
    order: z.number().int().positive(),
    minutes: z.number().int().positive(),
    requires: z.array(z.enum(CAPABILITIES)),
    en: z.object({ name: z.string(), teaches: z.string(), build: z.string() }),
    zh: z.object({ name: z.string(), teaches: z.string(), build: z.string() }),
  }),
});

export const collections = { questions, knowledge, checklist, scenarios, labs };
