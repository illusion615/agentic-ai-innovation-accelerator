/**
 * Shared shape of every locale dictionary. Extending this interface is the
 * only way to add a section: TypeScript then forces both `en.ts` and `zh.ts`
 * to supply the copy, which keeps the two editions in sync by construction.
 */

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  tone?: 'ink' | 'gold' | 'ember';
}

/** Mirrors DIMENSIONS in src/lib/assessment.ts. */
export type AssessmentDimension = 'maturity' | 'resources' | 'goal';

export interface Stage {
  id: string;
  index: string;
  name: string;
  artifact: string;
  lanes: Record<'microsoft' | 'it' | 'business', string>;
}

export interface Pillar {
  key: string;
  title: string;
  body: string;
}

/** A platform capability: the outcome, the surface that delivers it, the why. */
export interface Capability extends Pillar {
  via: string;
}

/** A numbered constant in the certainty mechanism. */
export interface Constant extends Pillar {
  index: string;
}

/** One "what it isn't → what it is" reframing pair. */
export interface Reframe {
  key: string;
  isntTitle: string;
  isntBody: string;
  bridge: string;
  isTitle: string;
  isBody: string;
  imageAlt: string;
  isImageAlt: string;
}

export interface Risk {
  key: string;
  title: string;
  mitigation: string;
  mitigatedBy: string;
  imageAlt: string;
}

/** A dated gate in the 8-week rhythm. */
export interface Gate {
  key: string;
  when: string;
  name: string;
  body: string;
  imageAlt: string;
}

/** A recurring beat that runs alongside the gates. */
export interface Cadence {
  key: string;
  when: string;
  name: string;
  body: string;
  imageAlt: string;
}

/**
 * The capabilities a Copilot Studio build can call on. Scenarios are tagged
 * with them and lab modules teach them, so this is the join that turns "what
 * the customer wants" into "what they need to be able to do".
 * Kept in step with `CAPABILITIES` in src/content.config.ts.
 */
export type CapabilityId =
  | 'agent-basics'
  | 'knowledge-grounding'
  | 'topics-flow'
  | 'orchestration'
  | 'actions-connectors'
  | 'power-automate'
  | 'doc-extraction'
  | 'human-approval'
  | 'dataverse'
  | 'channels-publish'
  | 'governance'
  | 'measurement';

export interface Scenario {
  name: string;
  domain: string;
}

export interface Tier {
  key: string;
  index: string;
  name: string;
  tagline: string;
  traits: string[];
  scenarios: Scenario[];
  businessValue: string;
  complexity: string;
  investment: string;
  returns: string;
  imageAlt: string;
}

/** One column of a Before → Solution → After asset comparison. */
export interface AssetColumn {
  caption: string;
  points: string[];
  imageAlt: string;
}

export interface SolutionAsset {
  key: string;
  name: string;
  lede: string;
  before: AssetColumn;
  solution: AssetColumn;
  after: AssetColumn;
  closing: string;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    langToggleLabel: string;
  };
  nav: {
    brand: string;
    items: { id: string; label: string }[];
    skipToContent: string;
    backToStory: string;
    menuLabel: string;
  };
  axis: {
    label: string;
    chaos: string;
    certainty: string;
  };
  hero: {
    eyebrow: string;
    eyebrowSub: string;
    titleTop: string;
    titleBottom: string;
    lede: string;
    scrollHint: string;
    imageAlt: string;
  };
  challenge: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    subtitle: string;
    imageAlt: string;
    stats: Stat[];
    pullQuote: string;
    body: string;
    turningPoint: string;
    source: string;
  };
  solution: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    lede: string;
    imageAlt: string;
    capabilities: Capability[];
  };
  certainty: {
    eyebrow: string;
    title: string;
    lede: string;
    constants: Constant[];
  };
  journey: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    lede: string;
    imageAlt: string;
    roleFilterLabel: string;
    roleAll: string;
    roles: { key: 'microsoft' | 'it' | 'business'; label: string }[];
    artifactLabel: string;
    stages: Stage[];
    engineEyebrow: string;
    engine: Pillar[];
  };
  positioning: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    isntLabel: string;
    isLabel: string;
    reframes: Reframe[];
    closing: string;
  };
  risks: {
    eyebrow: string;
    title: string;
    lede: string;
    mitigatedByLabel: string;
    mitigationLabel: string;
    items: Risk[];
  };
  rhythm: {
    eyebrow: string;
    title: string;
    lede: string;
    gatesLabel: string;
    gates: Gate[];
    cadenceLabel: string;
    cadence: Cadence[];
  };
  tiers: {
    eyebrow: string;
    title: string;
    lede: string;
    imageAlt: string;
    filterLabel: string;
    allLabel: string;
    scenarioCountLabel: string;
    labels: {
      businessValue: string;
      complexity: string;
      investment: string;
      returns: string;
    };
    items: Tier[];
  };
  assets: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    lede: string;
    columnLabels: { before: string; solution: string; after: string };
    selectLabel: string;
    items: SolutionAsset[];
  };
  start: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    lede: string;
    investLabel: string;
    invest: string[];
    cta: string;
    ctaNote: string;
    footnote: string;
    imageAlt: string;
  };
  /**
   * GET STARTED — three ordered steps, one live action at a time.
   *
   * The earlier version of this screen was a console: five panels of equal
   * weight (session, entry gate, stage table, three tier cards, a roadmap of
   * unbuilt tools) with five competing calls to action. It was organised by
   * what the programme *is* rather than by what the reader does next, so
   * neither question — what do I do now, what happens after — could be
   * answered by looking at it.
   *
   * It is now a path: step 1 is the only live thing on arrival, step 2 is
   * visibly waiting on it, step 3 is reference you can open whenever. Exactly
   * one gold button exists at any moment, and which one it is is a function of
   * session state.
   *
   * Stage names, artifacts and gates are deliberately absent: they are already
   * authored once in `journey.stages` and `rhythm.gates`, and this page joins
   * against those rather than keeping a second copy of the programme's own
   * structure that could silently diverge from the story that sold it.
   */
  program: {
    navLabel: string;
    eyebrow: string;
    title: string;
    lede: string;

    /** The "you are here" rail above the steps. */
    railLabel: string;
    stateNow: string;
    stateDone: string;
    stateLocked: string;

    /** Step 1 — the entry gate. The only thing that is live on arrival. */
    step1: {
      name: string;
      title: string;
      body: string;
      cta: string;
      retakeCta: string;
      notStarted: string;
      resultPrefix: string;
      /** Way out for a reader who does not yet know the words the questions use. */
      primer: string;
      primerCta: string;
    };

    /** Step 2 — the one delivery path the diagnosis points at. */
    step2: {
      name: string;
      title: string;
      body: string;
      /** Shown in place of the path until step 1 has run. */
      lockedBody: string;
      othersLabel: string;
      checkLead: string;
      checkCta: string;
    };

    /** Step 3 — the method itself, collapsed until wanted. */
    step3: {
      name: string;
      title: string;
      body: string;
      expandLabel: string;
      liveLead: string;
      liveCta: string;
    };

    inputsLabel: string;
    producesLabel: string;
    gateLabel: string;
    noGateLabel: string;
    /** Keyed by the stage ids in `journey.stages`. */
    stageInputs: Record<string, string[]>;

    /**
     * Facilitator plumbing. Deliberately at the foot of the page: it is for
     * whoever is running the room, not for the reader who just arrived from
     * the story, and it used to be the first thing on the screen.
     */
    toolsLabel: string;
    customerLabel: string;
    customerPlaceholder: string;
    exportLabel: string;
    resetLabel: string;
    resetConfirm: string;
    savedNote: string;

    upcomingLabel: string;
    upcomingNote: string;
    upcoming: { name: string; stage: string }[];
  };

  /**
   * The twelve capabilities. Short labels only — they appear as tags on
   * scenarios and as module names on the lab shelf, and both need to scan.
   */
  capabilities: Record<CapabilityId, string>;

  /**
   * THE LAB SHELF — composed, not authored. Modules live in
   * src/content/labs.json; the path is derived from the collected scenarios.
   */
  labs: {
    navLabel: string;
    eyebrow: string;
    title: string;
    lede: string;
    composedTitle: string;
    /** "{modules} modules · about {hours}" */
    composedNote: string;
    fromLabel: string;
    prereqNote: string;
    emptyTitle: string;
    emptyBody: string;
    emptyCta: string;
    shelfTitle: string;
    shelfNote: string;
    teachesLabel: string;
    buildLabel: string;
    afterLabel: string;
    minutesLabel: string;
    notYetNote: string;
    backLabel: string;
  };

  /**
   * SCENARIO INTAKE — stage 02. Framing only; the examples live in
   * src/content/scenarios.json and the customer's own list lives in the session.
   */
  intake: {
    navLabel: string;
    eyebrow: string;
    title: string;
    lede: string;
    yoursLabel: string;
    yoursNote: string;
    emptyTitle: string;
    emptyBody: string;
    countLabel: string;
    addOwnLabel: string;
    titleField: string;
    titlePlaceholder: string;
    deptField: string;
    tierField: string;
    painField: string;
    painPlaceholder: string;
    capsField: string;
    capsNote: string;
    addCta: string;
    removeLabel: string;
    examplesLabel: string;
    examplesNote: string;
    allDepts: string;
    addedLabel: string;
    takeLabel: string;
    painLabel: string;
    changesLabel: string;
    tierLabel: string;
    nextTitle: string;
    nextBody: string;
    nextCta: string;
    backLabel: string;
    departments: Record<'general' | 'crm' | 'finance' | 'hr' | 'it', string>;
  };

  /**
   * THE ENVIRONMENT CHECKLIST — framing only; the items live in
   * src/content/checklist.json.
   */
  checklist: {
    navLabel: string;
    eyebrow: string;
    title: string;
    lede: string;
    tierNote: string;
    noTierTitle: string;
    noTierBody: string;
    noTierCta: string;
    flaggedLabel: string;
    gatesLabel: string;
    howLabel: string;
    states: Record<'ok' | 'blocked' | 'na', string>;
    clearLabel: string;
    /** "{done} of {total} checked · {blocked} blocked" */
    summary: string;
    allClear: string;
    blockedNote: string;
    copyLabel: string;
    copiedLabel: string;
    backLabel: string;
    groups: Record<'access' | 'build' | 'publish' | 'sustain', { label: string; note: string }>;
  };

  /**
   * THE READING SHELF — framing only. The articles themselves live in the
   * Knowledge Hub (see src/lib/knowledge.ts); nothing here restates them.
   */
  basics: {
    navLabel: string;
    eyebrow: string;
    title: string;
    lede: string;
    hubLabel: string;
    hubNote: string;
    hubCta: string;
    openLabel: string;
    backLabel: string;
    groups: Record<'start' | 'build' | 'it', { label: string; note: string }>;
  };

  /**
   * DELIVERY PATHS — the tier decides the motion, not just the scenarios.
   *
   * Keyed by the tier keys in `tiers.items`, so a path page reads the tier's
   * own identity (traits, value, complexity, scenarios) from the story rather
   * than restating it.
   *
   * There is no title, lede or "yours" label any more: Get Started stopped
   * presenting these as a set to choose from. It shows the one the diagnosis
   * points at, introduced by its own step.
   */
  paths: {
    eyebrow: string;
    motionLabel: string;
    openLabel: string;
    howLabel: string;
    whoLabel: string;
    traitsLabel: string;
    scenariosLabel: string;
    items: Record<
      string,
      { motion: string; title: string; lede: string; how: string[]; who: string }
    >;
    tier1: {
      trainingLabel: string;
      trainingNote: string;
      inspirationLabel: string;
      inspirationNote: string;
    };
    tier2: {
      referenceLabel: string;
      referenceNote: string;
    };
    tier3: {
      partnerLabel: string;
      partnerNote: string;
      bringsLabel: string;
      brings: string[];
      prepareLabel: string;
      prepare: string[];
    };
  };

  readiness: {
    eyebrow: string;
    title: string;
    lede: string;
    timeNote: string;
    startCta: string;
    backLabel: string;
    nextLabel: string;
    seeResultLabel: string;
    /** "Question {n} / {total}" — {n} and {total} are substituted. */
    progressLabel: string;
    dimensions: Record<AssessmentDimension, { name: string; blurb: string }>;
    result: {
      eyebrow: string;
      title: string;
      maturityLabel: string;
      resourcesLabel: string;
      supportLabel: string;
      goalLabel: string;
      startTierLabel: string;
      tierNames: [string, string, string];
      axisLabel: string;
      verdicts: Record<'nascent' | 'aligned' | 'gap' | 'headroom', { title: string; body: string }>;
      entries: Record<'prerequisites' | 'stage-01' | 'accelerated', { title: string; body: string }>;
      motionLabel: string;
      openPathLabel: string;
      gapsLabel: string;
      noGapsLabel: string;
      dimensionsLabel: string;
      briefLabel: string;
      copyLinkLabel: string;
      copiedLabel: string;
      retakeLabel: string;
      consoleLabel: string;
      printLabel: string;
    };
  };

}