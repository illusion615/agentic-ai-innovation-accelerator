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
 *
 * Every entry names a knowledge point — something a builder learns to do — at
 * one level of granularity. Deliberately never a product name: a tag called
 * `dataverse` is wrong the moment the store changes, and mixing products with
 * patterns makes the vocabulary useless for composing a curriculum.
 * Kept in step with `CAPABILITIES` in src/content.config.ts.
 */
export type CapabilityId =
  | 'agent-anatomy'
  | 'agent-instructions'
  | 'knowledge-grounding'
  | 'deterministic-dialogue'
  | 'tool-orchestration'
  | 'system-actions'
  | 'structured-data-query'
  | 'deterministic-automation'
  | 'event-driven-workflows'
  | 'document-extraction'
  | 'human-approval'
  | 'structured-persistence'
  | 'custom-tool-extension'
  | 'multi-agent-routing'
  | 'test-evaluation'
  | 'deployment-channels'
  | 'governance-guardrails'
  | 'operational-measurement'
  | 'handover-demo';

/** The functional groupings examples are shelved under. */
export type DepartmentId = 'general' | 'crm' | 'finance' | 'hr' | 'it' | 'supply-chain';

/**
 * Every task in an engagement, in the order the journey runs them. Tasks with
 * no tool yet are still listed — a roadmap that hides the parts nobody has
 * built is not a roadmap.
 */
export type RoadmapTaskId =
  | 'readiness'
  | 'checklist'
  | 'scenarios'
  | 'prioritize'
  | 'metrics'
  | 'labs'
  | 'present'
  | 'gates'
  | 'champions';

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

    /**
     * THE ROADMAP — the open project's whole journey on one page: every task,
     * what is already done, and the one to pick up next.
     *
     * Framed on the five stages rather than an invented set of steps. A second
     * numbering scheme sitting beside the method's own is how a reader ends up
     * unable to say which stage they are in.
     */
    roadmap: {
      title: string;
      lede: string;
      producesLabel: string;
      gateLabel: string;
      noGate: string;
      /** "{done} of {total} done" */
      summary: string;
      nextLabel: string;
      allDone: string;
      /** Prefixes the tier the diagnosis settled on. */
      resultPrefix: string;
      /** Reading the diagnosis leads to, rather than a step of its own. */
      pathLink: string;
      retakeCta: string;
      states: {
        done: string;
        now: string;
        open: string;
        locked: string;
        planned: string;
      };
      tasks: Record<
        RoadmapTaskId,
        { name: string; body: string; cta?: string; locked?: string }
      >;
    };

    /**
     * Facilitator plumbing. Deliberately at the foot of the page: it is for
     * whoever is running the room, not for the reader who just arrived from
     * the story, and it used to be the first thing on the screen.
     */
    toolsLabel: string;
    /**
     * PORTAL — the entry page. One card per engagement, because the first
     * question on opening the tool is "which customer am I here for", not
     * "what is step one".
     */
    portal: {
      eyebrow: string;
      title: string;
      lede: string;
      newCta: string;
      openCta: string;
      deleteLabel: string;
      deleteConfirm: string;
      untitled: string;
      /** Label on the corner chip that names the open project. */
      chipLabel: string;
      backToPortal: string;
      stageLabel: string;
      startedLabel: string;
      progressLabel: string;
      /** Before the twelve questions have been answered. */
      stageNotStarted: string;
      emptyTitle: string;
      emptyBody: string;
      dialogTitle: string;
      dialogLede: string;
      nameLabel: string;
      namePlaceholder: string;
      facilitatorLabel: string;
      facilitatorPlaceholder: string;
      createCta: string;
      cancelCta: string;
      note: string;
    };
    exportLabel: string;
    savedNote: string;
  };

  /**
   * The twelve capabilities. Short labels only — they appear as tags on
   * scenarios and as module names on the lab shelf, and both need to scan.
   */
  capabilities: Record<CapabilityId, string>;

  /**
   * PRESENT MODE — the deck a facilitator runs in the room, composed from the
   * session rather than exported. Slide bodies come from src/content/labs.json.
   */
  present: {
    navLabel: string;
    openCta: string;
    openNote: string;
    /** Title slide. */
    kicker: string;
    forLabel: string;
    untitledCustomer: string;
    agendaTitle: string;
    /** Unit words for formatDuration — totals are written in hours, not minutes. */
    duration: {
      hour: string;
      hours: string;
      minute: string;
      minutes: string;
      sep: string;
      join: string;
    };
    /** A sitting of roughly 90–120 minutes. "{n}" and "{total}" are substituted. */
    sessionTitle: string;
    sessionShort: string;
    nowLabel: string;
    doneLabel: string;
    /** Shown only when the selected labs actually carry a captured demo. */
    howTitle: string;
    howBody: string;
    objectiveLabel: string;
    needsLabel: string;
    skillsLabel: string;
    toolsLabel: string;
    materialsLabel: string;
    stepsLabel: string;
    summaryLabel: string;
    /** Walkthrough slides — the click-by-click a facilitator demonstrates. */
    whereLabel: string;
    typeLabel: string;
    seeLabel: string;
    labLabel: string;
    closeTitle: string;
    closeBody: string;
    emptyTitle: string;
    emptyBody: string;
    exitLabel: string;
    hint: string;
    /** "{n} / {total}" */
    counter: string;
  };

  /**
   * PRIORITISE — stage 03. Scores the collected scenarios and cuts to a Top 3;
   * the artifact is the Use Case Canvas.
   */
  prioritize: {
    navLabel: string;
    eyebrow: string;
    title: string;
    lede: string;
    emptyTitle: string;
    emptyBody: string;
    emptyCta: string;
    /** The four axes. `up` marks the ones where higher is better. */
    axes: Record<
      'value' | 'dataReadiness' | 'complexity' | 'effort',
      { label: string; help: string; up: boolean }
    >;
    betterHigh: string;
    betterLow: string;
    scoreLabel: string;
    topLabel: string;
    canvasTitle: string;
    canvasNote: string;
    tiedNote: string;
    resetLabel: string;
    nextCta: string;
    backLabel: string;
  };

  /**
   * THE LAB SHELF — composed, not authored. Modules live in
   * src/content/labs.json; the path is derived from the collected scenarios.
   */
  labs: {
    navLabel: string;
    eyebrow: string;
    title: string;
    lede: string;

    /** Size of the engagement, answered before any list. */
    tally: {
      modules: string;
      time: string;
      sittings: string;
    };

    /** Shown before stage 03 has ranked anything. */
    composedTitle: string;
    composedNote: string;
    fromLabel: string;
    prereqNote: string;
    emptyTitle: string;
    emptyBody: string;
    emptyCta: string;
    /** "The whole shelf · {n} modules" */
    shelfSummary: string;
    shelfNote: string;
    libraryTitle: string;
    libraryLede: string;
    libraryEyebrow: string;
    libraryOpen: string;
    libraryBack: string;
    libraryCount: string;
    librarySelected: string;
    libraryAdd: string;
    libraryRemove: string;
    libraryRequired: string;
    libraryPrerequisite: string;
    libraryInAgenda: string;
    libraryManualReason: string;
    libraryBrowse: string;
    libraryBrowseNote: string;
    librarySearchLabel: string;
    librarySearchPlaceholder: string;
    librarySortLabel: string;
    librarySortSequence: string;
    librarySortShortest: string;
    librarySortLongest: string;
    librarySortAdded: string;
    /** "{n} of {total} shown" */
    libraryResults: string;
    libraryNoResults: string;
    libraryClear: string;
    libraryProductsLabel: string;
    libraryFeaturesLabel: string;
    buildOrderTitle: string;
    buildOrderNote: string;
    buildStepLabel: string;
    agendaTitle: string;
    agendaNote: string;
    /** "Session {n} of {total}" */
    sessionTitle: string;
    buildNoScoreNote: string;
    buildNoScoreCta: string;
    /**
     * What the rest of the backlog will need beyond the Top 3 — stated rather
     * than shown as a second full list.
     */
    restNote: string;
    restNone: string;
    teachesLabel: string;
    buildLabel: string;
    afterLabel: string;
    minutesLabel: string;
    /** The click-by-click page for one module, followed at your own desk. */
    guideLabel: string;
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
    casesLabel: string;
    casesNote: string;
    casesCta: string;
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
    departments: Record<DepartmentId, string>;
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