import type { Dictionary } from './types';

export const en: Dictionary = {
  meta: {
    title: 'Agentic AI Innovation Accelerator',
    description:
      'Turn scattered AI experiments into governed, production-grade intelligent business solutions.',
    langToggleLabel: 'Switch to Chinese',
  },
  nav: {
    brand: 'Agentic AI Innovation Accelerator',
    menuLabel: 'Sections',
    items: [
      { id: 'challenge', label: 'Challenge' },
      { id: 'solution', label: 'Solution' },
      { id: 'journey', label: 'The Model' },
      { id: 'rhythm', label: 'Rhythm' },
      { id: 'tiers', label: 'Scenarios' },
      { id: 'start', label: 'Get Started' },
    ],
    skipToContent: 'Skip to content',
    backToStory: 'The Story',
  },
  axis: {
    label: 'Transmutation',
    chaos: 'Chaos',
    certainty: 'Certainty',
  },
  hero: {
    eyebrow: 'Microsoft Agentic Business Process',
    eyebrowSub: 'Agents · Workflows · Apps',
    titleTop: 'Agentic AI',
    titleBottom: 'Innovation Accelerator',
    lede: 'Turn scattered AI experiments into governed, production-grade intelligent business solutions.',
    scrollHint: 'Scroll to begin the transmutation',
    imageAlt:
      'An alchemist’s workshop at dawn: gothic windows, warm golden light, flasks and an open manuscript on a carved lectern.',
  },
  challenge: {
    eyebrow: 'The Challenge',
    titleLead: 'The Alchemist’s',
    titleAccent: 'Paradox Of AI',
    subtitle: 'More investment. More experiments. Yet the promised gold remains elusive.',
    imageAlt:
      'A guild hall of alchemists labouring over crucibles beneath banners reading Productivity, Efficiency, Innovation and Growth — beside a cabinet where the “Invested” shelf overflows with gold and the “Returned” shelf holds two coins.',
    stats: [
      { value: 85, suffix: '%', label: 'increased AI investment', tone: 'ink' },
      { value: 91, suffix: '%', label: 'plan to increase further', tone: 'ink' },
      { value: 6, suffix: '%', label: 'reported measurable AI payback', tone: 'gold' },
    ],
    pullQuote: 'Activity is not value.',
    body: 'Organizations are pouring record investment into AI — yet returns are slow to materialize and hard to measure.',
    turningPoint: 'Six in a hundred',
    source:
      'Deloitte Global, “AI ROI: The paradox of rising investment and elusive returns,” October 2025 — survey of 1,854 executives',
  },
  solution: {
    eyebrow: 'Solution',
    titleLead: 'Platform Plus Method,',
    titleAccent: 'Certain Returns',
    lede: 'Agents, workflows and apps — the platform plus a business-led method turns uncertain investment into certain returns.',
    imageAlt:
      'A vaulted guild workshop where apprentices, scribes and masters work in concert, golden light threading between their benches.',
    capabilities: [
      {
        key: 'productivity',
        title: 'Productivity',
        via: 'via Apps',
        body: 'Embedded where people already work — adoption is immediate, not another tool to learn.',
      },
      {
        key: 'efficiency',
        title: 'Efficiency',
        via: 'via Workflows',
        body: 'Deterministic, auditable steps — effort and rework are removed, outcomes become repeatable.',
      },
      {
        key: 'innovation',
        title: 'Innovation',
        via: 'via Agents',
        body: 'Autonomous reasoning — new capability that was once out of reach is now ship-ready.',
      },
      {
        key: 'governance',
        title: 'Governance',
        via: 'via the platform',
        body: 'A business-led operating model that tracks investment to certain returns.',
      },
    ],
  },
  certainty: {
    eyebrow: 'The Certainty Mechanism',
    title: 'Three Constants Hold Every Engagement Together',
    lede: 'Certainty is not a promise. It is what remains when the same platform, the same gates and the same feedback loop apply to every use case.',
    constants: [
      {
        key: 'platform',
        index: '01',
        title: 'One Platform',
        body: 'Agents, workflows and apps share one governed surface — no fragmented tools, no untracked spend.',
      },
      {
        key: 'model',
        index: '02',
        title: 'One Model',
        body: 'Every use case runs through the same business-led gates — value is proven before it scales.',
      },
      {
        key: 'loop',
        index: '03',
        title: 'One Loop',
        body: 'What works becomes reusable templates — each success lowers the cost of the next.',
      },
    ],
  },
  journey: {
    eyebrow: 'Agentic AI Innovation Accelerator',
    titleLead: 'From Chaos',
    titleAccent: 'To Certainty',
    lede: 'A governed, business-led operating model that turns scattered AI experiments into predictable, scalable agentic innovation.',
    imageAlt:
      'A long guild hall: stakeholders aligning at a map, scenarios collected into a chest, three gilded scrolls raised on a plinth, hands-on building at workbenches, and a community applauding at the far end.',
    roleFilterLabel: 'Highlight a lane',
    roleAll: 'All lanes',
    roles: [
      { key: 'microsoft', label: 'Microsoft' },
      { key: 'it', label: 'Customer IT' },
      { key: 'business', label: 'Business Users' },
    ],
    artifactLabel: 'Artifact',
    stages: [
      {
        id: 'discover',
        index: '01',
        name: 'Discover & Align',
        artifact: 'Shared Vision',
        lanes: {
          microsoft: 'Interview stakeholders',
          it: 'Map systems & data',
          business: 'Share pain points',
        },
      },
      {
        id: 'inspire',
        index: '02',
        name: 'Inspire & Collect',
        artifact: 'Scenario Backlog',
        lanes: {
          microsoft: 'Spark scenario ideas',
          it: 'Open intake, flag constraints',
          business: 'Submit scenarios',
        },
      },
      {
        id: 'prioritize',
        index: '03',
        name: 'Prioritize Top 3',
        artifact: 'Use Case Canvas',
        lanes: {
          microsoft: 'Facilitate assessment',
          it: 'Review security & DLP',
          business: 'Commit & set measures',
        },
      },
      {
        id: 'build',
        index: '04',
        name: 'Build & Learn',
        artifact: 'Working Prototypes',
        lanes: {
          microsoft: 'Coach hands-on builds',
          it: 'Prepare environments',
          business: 'Build & validate',
        },
      },
      {
        id: 'adopt',
        index: '05',
        name: 'Adopt & Scale',
        artifact: 'Champion Community',
        lanes: {
          microsoft: 'Run office hours',
          it: 'Establish CoE',
          business: 'Pilot & champion',
        },
      },
    ],
    engineEyebrow: 'The Convergence Engine',
    engine: [
      {
        key: 'converge',
        title: 'Converge',
        body: 'Discover, collect and prioritize narrow the field from scattered ideas to a focused top 3 — uncertainty shrinks at every gate.',
      },
      {
        key: 'govern',
        title: 'Govern',
        body: 'Microsoft, Customer IT and Business Users hold every gate together — decisions are owned and traceable, never ad hoc.',
      },
      {
        key: 'validate',
        title: 'Validate',
        body: 'Build and adopt prove value on prototypes before scaling — risk is retired early, not after investment.',
      },
    ],
  },
  positioning: {
    eyebrow: 'Program Positioning',
    titleLead: 'Not Product Demo, Training, Or Project Delivery',
    titleAccent: 'But Inspire, Empower, And Accelerate',
    isntLabel: "What It Isn't",
    isLabel: 'What It Is',
    reframes: [
      {
        key: 'demo',
        isntTitle: 'A Product Demo',
        isntBody: 'Showcasing Copilot Studio features.',
        bridge: 'Not showing features — sparking ideas.',
        isTitle: 'Inspire',
        isBody: 'Introduce AI application patterns that spark ideas.',
        imageAlt:
          'A master holds a glowing flask above a hall of onlookers — a spectacle watched, not joined.',
        isImageAlt:
          'A circle of makers around a workbench, each holding a lit flask of their own — the spark passed on, not performed.',
      },
      {
        key: 'training',
        isntTitle: 'A Training Class',
        isntBody: 'Teaching theory in a classroom.',
        bridge: 'Not teaching theory — enabling building.',
        isTitle: 'Empower',
        isBody: 'Enable customers to build real solutions themselves.',
        imageAlt:
          'Rows of students copy from a lecturer at a blackboard in a cold, grey hall.',
        isImageAlt:
          'Hands on the bench, not on a notepad — an instructor beside a builder rather than in front of a class.',
      },
      {
        key: 'delivery',
        isntTitle: 'A Project Delivery',
        isntBody: 'Us building the solution for you.',
        bridge: 'Not doing it for you — speeding you up.',
        isTitle: 'Accelerate',
        isBody: 'Speed up adoption across the organisation.',
        imageAlt:
          'One craftsman hands a finished golden vessel across the anvil to another who did not make it.',
        isImageAlt:
          'A workshop running at full pace with the visiting master stepping back, tools already in the customer’s hands.',
      },
    ],
    closing: 'One programme, one purpose: turn AI ambition into enterprise adoption.',
  },
  risks: {
    eyebrow: 'Risks & Mitigations',
    title: 'What Could Go Wrong — And How We Prevent It',
    lede: 'Every failure mode of an AI programme is known in advance. Each one is answered by a named artifact, produced at a named moment.',
    mitigatedByLabel: 'Mitigated by',
    mitigationLabel: 'Mitigation',
    items: [
      {
        key: 'sponsor',
        title: 'No executive sponsorship',
        mitigation:
          'The Sponsor Charter is signed by named executives before Stage 01 begins.',
        mitigatedBy: 'Sponsor Charter',
        imageAlt:
          'An empty throne draped in red above a waiting crowd — authority present in name only.',
      },
      {
        key: 'bottleneck',
        title: 'IT bottleneck',
        mitigation:
          'The Customer IT lane plus a parallel IT Readiness Check clears blockers before the workshop.',
        mitigatedBy: 'IT Readiness Check',
        imageAlt:
          'Laden carts back up in a narrow gatehouse, the queue stretching down the hall.',
      },
      {
        key: 'champions',
        title: 'No internal champions',
        mitigation:
          'The Champion Community stage certifies builders and keeps momentum alive.',
        mitigatedBy: 'Champion Certification',
        imageAlt:
          'A lone master works at a bench while two apprentices stand idle behind him.',
      },
      {
        key: 'value',
        title: 'Unclear value',
        mitigation:
          'The success-metrics framework and Quarterly Review tie every build to measurable ROI.',
        mitigatedBy: 'Success Metrics',
        imageAlt:
          'A steward weighs gold on a balance in a vaulted hall, ledger open beside him.',
      },
    ],
  },
  rhythm: {
    eyebrow: 'The Operating Rhythm',
    title: 'Governed, Supported, Scaled',
    lede: 'Eight weeks, five gates. Nothing advances because time passed — it advances because a gate was cleared.',
    gatesLabel: 'The gates',
    gates: [
      {
        key: 'w0',
        when: 'Week 0',
        name: 'Sponsor Charter',
        body: 'Business goals, decision board, exit criteria and 12-week ROI — signed before Stage 01.',
        imageAlt: 'A sovereign sets seal to a charter at a great table.',
      },
      {
        key: 'w2',
        when: 'Week 2',
        name: 'Use Case Lock',
        body: 'Top 3 use cases ranked, success metrics and RACI agreed.',
        imageAlt: 'A council deliberates over scrolls by candlelight.',
      },
      {
        key: 'w4',
        when: 'Week 4',
        name: 'MVP Demo',
        body: 'First working agent live, validated against success criteria.',
        imageAlt: 'A young builder presents a working golden mechanism to the elders.',
      },
      {
        key: 'w6',
        when: 'Week 6',
        name: 'Hardening Gate',
        body: 'Observability, eval suite, rollback and security review passed.',
        imageAlt: 'A smith tempers a blade while inspectors check it against their marks.',
      },
      {
        key: 'w8',
        when: 'Week 8',
        name: 'CoE Handoff',
        body: 'Customer IT takes over operations at week 8.',
        imageAlt: 'One keeper passes a great golden key into another’s hands.',
      },
    ],
    cadenceLabel: 'And it keeps running',
    cadence: [
      {
        key: 'weekly',
        when: 'Weekly',
        name: 'Office Hours',
        body: 'Facilitators stay available every week to unblock builds.',
        imageAlt: 'A master reviews an apprentice’s scroll at an open desk.',
      },
      {
        key: 'badge',
        when: 'After build',
        name: 'Champion Badge',
        body: 'Two production-grade agents shipped earns certification.',
        imageAlt: 'A robe of office is laid on a builder’s shoulders as the hall applauds.',
      },
      {
        key: 'quarterly',
        when: 'Quarterly',
        name: 'Quarterly Review',
        body: 'Assess ROI and surface the next wave of opportunities.',
        imageAlt: 'Two stewards reconcile gold against a ledger.',
      },
    ],
  },
  tiers: {
    eyebrow: 'One Guild, Three Tiers',
    title: 'Inspiration Through Layered AI Innovation Scenarios',
    lede: 'Nine scenarios, layered by who builds them and what they change. Start where the wins are frequent; climb as the guild matures.',
    imageAlt:
      'A three-storey guild hall: makers on the floor, specialists on the gallery, masters at the high table.',
    filterLabel: 'Filter by tier',
    allLabel: 'All tiers',
    scenarioCountLabel: 'scenarios',
    labels: {
      businessValue: 'Business value',
      complexity: 'Complexity',
      investment: 'Investment',
      returns: 'Return',
    },
    items: [
      {
        key: 'tier-1',
        index: 'Tier 1',
        name: 'Everyday Productivity',
        tagline: 'Agents automate repetitive data work — quick wins, no code required.',
        traits: ['Many makers', 'Low complexity', 'Frequent small wins'],
        scenarios: [
          { name: 'Email Routing & Auto Reply', domain: 'Customer Service' },
          { name: 'Invoice / Order Recognition', domain: 'Finance / Supply Chain' },
          { name: 'External Data Collection', domain: 'Marketing / R&D' },
        ],
        businessValue: 'Hours saved on repetitive daily tasks.',
        complexity: 'Low — business users self-serve.',
        investment: 'Low — live in days, not months.',
        returns: 'Frequent small wins that compound.',
        imageAlt: 'Apprentices at open benches, each finishing small pieces quickly.',
      },
      {
        key: 'tier-2',
        index: 'Tier 2',
        name: 'Process Innovation',
        tagline:
          'Agents work alongside specialists to optimise processes and build reusable patterns.',
        traits: ['Fewer specialists', 'Medium complexity', 'Reusable process value'],
        scenarios: [
          { name: 'Document Review', domain: 'Legal / Finance' },
          { name: 'Complex Document Generation', domain: 'R&D / Quality' },
          { name: 'AI Translation', domain: 'R&D / Quality' },
        ],
        businessValue: 'Department processes optimised and reusable.',
        complexity: 'Medium — needs integration.',
        investment: 'Medium — weeks, with IT support.',
        returns: 'Reusable process value.',
        imageAlt: 'Specialists in a gallery workshop refining a shared pattern book.',
      },
      {
        key: 'tier-3',
        index: 'Tier 3',
        name: 'Agentic Processes',
        tagline:
          'Agents amplify people — orchestrating across systems for enterprise-wide transformation.',
        traits: ['Few experts', 'High complexity', 'Enterprise-wide impact'],
        scenarios: [
          { name: 'Operation Agent', domain: 'Operation (HR / Finance / IT)' },
          { name: 'Business System Agent', domain: 'IT' },
          { name: 'Sales / Field Service Ops Agent', domain: 'Sales / Field Service Engineers' },
        ],
        businessValue: 'Enterprise-wide, end-to-end transformation.',
        complexity: 'High — governance and security.',
        investment: 'High — months, cross-functional.',
        returns: 'Strategic enterprise impact.',
        imageAlt: 'Masters at a high table orchestrating work across the whole hall.',
      },
    ],
  },
  enablement: {
    eyebrow: 'Enablement',
    title: 'The Hands-On Labs Your Scenarios Ask For',
    lede: 'A scenario names the work; a lab teaches the one capability that work needs. So a department does not sit through a course — it walks the modules its own scenarios call for, in the order they have to be taken.',
    totalLabel: '{n} modules in the library',
    labsLabel: 'Labs',
    scenariosLabel: 'Scenarios',
    timeLabel: 'Hands-on time',
    note: 'Counts are derived, not decided: each department’s figure is the set of modules its scenarios require once prerequisites are closed over.',
    cta: 'Open the Lab Library',
  },
  assets: {
    eyebrow: 'Solution Asset Overview',
    titleLead: 'Three Assets,',
    titleAccent: 'Ready To Adapt',
    lede: 'Patterns that have already been through the gates. Each one states the before, the governed solution, and what changes after.',
    columnLabels: { before: 'Before', solution: 'Solution', after: 'After' },
    selectLabel: 'Choose an asset',
    items: [
      {
        key: 'bpp',
        name: 'Agentic Business Process Platform',
        lede: 'Agents, workflows and apps run the business process end to end on one governed surface — people set the goals and hold the gates.',
        before: {
          caption: 'Fragmented, manual, opaque',
          points: [
            'Process logic scattered across tools, inboxes and spreadsheets',
            'Work stalls at manual handoffs and waits on someone to notice',
            'No single view of cost, cycle time or where work is stuck',
            'Brittle automation — every change means a rebuild',
          ],
          imageAlt:
            'An office buried in paper, every desk an island, documents flying between them.',
        },
        solution: {
          caption: 'Agent-run, human-governed',
          points: [
            'One platform: agents, workflows and apps on a governed surface',
            'Agents sense, decide and act; workflows keep every step deterministic',
            'Apps embed the process where people already work',
            'Humans set goals, boundaries and approvals at every gate',
          ],
          imageAlt:
            'A luminous orb at the centre of the room, golden threads reaching every desk.',
        },
        after: {
          caption: 'Adaptive & measurable',
          points: [
            'Exceptions are handled in flow instead of stalling the process',
            'Cycle time, cost and quality visible on one governed surface',
            'Each solved case becomes a reusable pattern for the next',
            'Gains are directional — measured against each customer’s own baseline',
          ],
          imageAlt: 'The same room, calm and ordered, a measurement board on the wall.',
        },
        closing:
          'From scattered process automation to one governed, agent-run business process platform.',
      },
      {
        key: 'doc',
        name: 'Evidence-Grounded Document Review',
        lede: 'Every document judgment traces back to the source passage, goes to an accountable reviewer, and leaves an audit record — AI widens first-pass coverage, people keep the final call.',
        before: {
          caption: 'Long documents, scattered rules',
          points: [
            'Long documents span eligibility, obligations, exceptions and contract risk',
            'Review checklists and risk standards live in personal files and past projects',
            'Findings lack section and page references, so reviewers re-search the file',
            'Indexing status, stuck categories and edits are invisible',
          ],
          imageAlt: 'Reviewers hemmed in by towers of unsorted files.',
        },
        solution: {
          caption: 'Evidence-centered AI review',
          points: [
            'Upload once — full-text extraction and indexing run automatically',
            'Review modules and categories run in parallel into one shared catalog',
            'Every finding carries section, page, source excerpt and scoring rationale',
            'Risk and confidence are modeled apart; low-confidence items route to experts',
          ],
          imageAlt:
            'An open book radiating light onto an indexed wall of findings, a reviewer reading one card.',
        },
        after: {
          caption: 'Covered, traceable, governed',
          points: [
            'Consistent first-pass coverage regardless of who reviews',
            'Reviewers jump from a finding straight to the source passage',
            'High-risk and conflicting requirements surface earlier',
            'Rules, runs, corrections and recovery become a managed, versioned review asset',
          ],
          imageAlt: 'A tidy reading room, findings catalogued on a board, files shelved.',
        },
        closing:
          'AI prepares a structured review package; legal, business and document owners still sign — benefits validated against the customer’s own pilot baseline.',
      },
      {
        key: 'crm',
        name: 'Agentic CRM — Reinventing Customer Operations',
        lede: 'Agentic CRM turns customer lifecycle management into a shared, cross-functional responsibility — humans lead, agents advance every stage.',
        before: {
          caption: 'Broken handoffs, lost context',
          points: [
            'Customer goals, risks and promises reset at every departmental handoff',
            'Four breakpoints: data · decision · process · learning',
            'Rework, waiting and repeated entry — value leaks silently',
            'Same failures repeat; nothing feeds the next cycle',
          ],
          imageAlt: 'Desks separated by filing cabinets, pages drifting between them unread.',
        },
        solution: {
          caption: 'Human-led, agent-run',
          points: [
            'Six capabilities: Sense → Understand → Decide → Coordinate → Execute → Learn',
            'Carries the customer goal across the six lifecycle stages',
            'CRM backbone plus an agentic coordination layer',
            'Humans set goals and boundaries; agents advance within guardrails',
          ],
          imageAlt:
            'A luminous figure linking a wall of drawers, colleagues conferring beside it.',
        },
        after: {
          caption: 'Continuous & measurable',
          points: [
            'Reference cases show gains in revenue per seller, win rate and conversion',
            'Illustrative ROI and payback — actual results vary by customer',
            'No more resets — context flows across stages',
            'Outcomes steer the next cycle of decisions',
          ],
          imageAlt: 'A long gallery of connected records, people moving freely between them.',
        },
        closing:
          'From broken handoffs to a single, governed customer journey — returns measured against each customer’s own baseline.',
      },
    ],
  },
  start: {
    eyebrow: 'Get Started',
    titleLead: 'The Program',
    titleAccent: 'Is The Bridge',
    lede: 'It turns scattered experimentation into a repeatable operating model for secure, business-led AI innovation.',
    investLabel: 'What you invest',
    invest: ['Time', 'People', 'Licences'],
    cta: 'Find where you start',
    ctaNote: 'Twelve questions, about five minutes. It decides the rest.',
    footnote: 'Copilot Studio · Agents · Workflows · Apps',
    imageAlt:
      'A stone bridge of gold-lit arches crossing from a dim workshop toward a bright hall.',
  },
  program: {
    navLabel: 'Get Started',
    eyebrow: 'Get started',
    title: 'Three Steps To Your First Build',
    lede: 'Start at step one. It takes about five minutes and decides everything after it — which path you run, and which stage you can honestly begin at.',

    roadmap: {
      title: 'The Road From Here',
      lede: 'Every task this engagement runs, mapped onto the five stages. It fills itself in as the project moves, so the question “what now” always has an answer on this page.',
      producesLabel: 'Produces',
      gateLabel: 'Gate',
      noGate: 'No gate of its own',
      summary: '{done} of {total} done',
      nextLabel: 'Next',
      allDone: 'Everything the tool covers today is done.',
      resultPrefix: 'You start at',
      pathLink: 'See how this path runs',
      retakeCta: 'Answer them again',
      states: {
        done: 'Done',
        now: 'Do this next',
        open: 'Open',
        locked: 'Waiting',
        planned: 'Coming next',
      },
      tasks: {
        readiness: {
          name: 'Answer the twelve questions',
          body: 'Maturity, resources, support and goal. The answers decide which path you run and which stage you can honestly begin at.',
          cta: 'Start',
        },
        checklist: {
          name: 'Check your environment',
          body: 'Find out whether your tenant will let you build, before a room is sitting there expecting a demo.',
          cta: 'Check',
          locked: 'Answer the twelve questions first.',
        },
        scenarios: {
          name: 'Collect your scenarios',
          body: 'Where the first build comes from. Everything downstream is designed against this list, so an empty list means nothing to design against.',
          cta: 'Collect',
        },
        prioritize: {
          name: 'Score and cut to three',
          body: 'Four axes turn a backlog into an order the room can defend when someone asks why their scenario is not first.',
          cta: 'Score',
          locked: 'Collect some scenarios first.',
        },
        metrics: {
          name: 'Set the success measures',
          body: 'The before-number, agreed while it can still be taken. After the build it is an opinion.',
        },
        labs: {
          name: 'Open your lab path',
          body: 'The modules your own scenarios ask for, closed over prerequisites and ordered so it can actually be walked.',
          cta: 'Open',
          locked: 'Collect some scenarios first.',
        },
        present: {
          name: 'Run the room deck',
          body: 'Title, agenda and every lab, composed for this customer and played rather than exported.',
          cta: 'Present',
          locked: 'Collect some scenarios first.',
        },
        gates: {
          name: 'Track the build gates',
          body: 'Nothing advances because time passed. It advances because a gate was cleared.',
        },
        champions: {
          name: 'Track your champions',
          body: 'Who carries this after the room empties and you are not there.',
        },
      },
    },

    toolsLabel: 'Running this in a room?',
    portal: {
      eyebrow: 'Get started',
      title: 'Your Accelerator Projects',
      lede: 'One project per customer. Open one to pick up where it stopped, or start a new one — everything each project collects stays with it.',
      newCta: 'New project',
      openCta: 'Open',
      deleteLabel: 'Delete',
      deleteConfirm: 'Delete “{name}”? Everything collected against it is removed from this browser.',
      untitled: 'Untitled project',
      chipLabel: 'Project',
      backToPortal: 'All projects',
      stageLabel: 'Stage',
      startedLabel: 'Started',
      progressLabel: 'Progress',
      stageNotStarted: 'Not started',
      emptyTitle: 'No projects yet',
      emptyBody: 'Start one and name it after the customer you are going in to see.',
      dialogTitle: 'New project',
      dialogLede: 'Name it after the customer. You can change this later.',
      nameLabel: 'Project name',
      namePlaceholder: 'e.g. Northwind Logistics',
      facilitatorLabel: 'Facilitator',
      facilitatorPlaceholder: 'Who is running it — optional',
      createCta: 'Start',
      cancelCta: 'Cancel',
      note: 'Projects are stored in this browser only. Nothing is sent anywhere.',
    },
    exportLabel: 'Export session',
    savedNote: 'Saved in this browser only. Nothing is sent anywhere.',
  },

  capabilities: {
    'agent-anatomy': 'Agent anatomy',
    'agent-instructions': 'Agent instructions',
    'knowledge-grounding': 'Knowledge grounding',
    'deterministic-dialogue': 'Deterministic dialogue',
    'tool-orchestration': 'Tool orchestration',
    'system-actions': 'System actions',
    'structured-data-query': 'Structured data query',
    'deterministic-automation': 'Deterministic automation',
    'event-driven-workflows': 'Event-driven workflows',
    'document-extraction': 'Document extraction',
    'human-approval': 'Human approval',
    'structured-persistence': 'Structured persistence',
    'custom-tool-extension': 'Custom tool extension',
    'multi-agent-routing': 'Multi-agent routing',
    'test-evaluation': 'Test & evaluation',
    'deployment-channels': 'Deployment & channels',
    'governance-guardrails': 'Governance & guardrails',
    'operational-measurement': 'Operational measurement',
    'handover-demo': 'Demo & handover',
  },

  present: {
    navLabel: 'Present',
    openCta: 'Open the room deck',
    openNote:
      'Full screen, arrow keys, no export. The deck is your customer name, the agenda, and one section per lab in the order stage 04 put them.',
    kicker: 'Agentic AI Innovation Accelerator',
    forLabel: 'Prepared for',
    untitledCustomer: 'Your organisation',
    agendaTitle: 'Agenda',
    duration: {
      hour: 'hour',
      hours: 'hours',
      minute: 'minute',
      minutes: 'minutes',
      sep: ' ',
      join: ' ',
    },
    sessionTitle: 'Session {n} of {total}',
    sessionShort: 'Session {n}',
    nowLabel: 'Now',
    doneLabel: 'Done',
    howTitle: 'How each lab runs',
    howBody:
      'Every lab is demonstrated on one worked example, so the screen on the wall matches the screen in front of you step for step. You then build the same shape against your own scenario. The mechanics are identical — only the subject changes.',
    objectiveLabel: 'Objective',
    needsLabel: 'Before we start',
    skillsLabel: 'Skills assumed',
    toolsLabel: 'Tools open',
    materialsLabel: 'Material on hand',
    stepsLabel: 'What we do',
    summaryLabel: 'What you leave with',
    whereLabel: 'Where',
    typeLabel: 'Type this',
    seeLabel: 'You should see',
    labLabel: 'Lab',
    closeTitle: 'Where this goes next',
    closeBody:
      'What was built today is a working answer to a question the room can now state precisely. The gate after this one asks for a measurement, not another demo.',
    emptyTitle: 'Nothing to present yet',
    emptyBody:
      'The deck is composed from the labs stage 04 selected. Work through discovery and prioritisation first, and this fills itself in.',
    exitLabel: 'Close',
    hint: '← → or space to move · Esc to close',
    counter: '{n} / {total}',
  },

  prioritize: {
    navLabel: 'Prioritise',
    eyebrow: 'Stage 03 · Prioritise Top 3',
    title: 'Which Three, And Why Those',
    lede: 'A backlog is not a plan. Score what you collected on four axes, and the order stops being a matter of who argued hardest. The top three are what stage 04 builds.',
    emptyTitle: 'Collect some scenarios first',
    emptyBody: 'There is nothing to rank yet. Stage 02 is where the list comes from.',
    emptyCta: 'Go to stage 02',
    axes: {
      value: {
        label: 'Worth if it works',
        help: 'What measurably changes when this is live — hours returned, errors avoided, cycle time cut. Score against a baseline you could actually produce.',
        up: true,
      },
      dataReadiness: {
        label: 'Material within reach',
        help: 'The documents and systems this needs: can it get to them today, with the permissions you already have?',
        up: true,
      },
      complexity: {
        label: 'Technical difficulty',
        help: 'How many systems it has to touch, and how much of it has to behave the same way every time.',
        up: false,
      },
      effort: {
        label: 'People-time to build',
        help: 'Time from whoever builds it, plus the business time to specify it and judge whether the output is right.',
        up: false,
      },
    },
    betterHigh: 'higher is better',
    betterLow: 'lower is better',
    scoreLabel: 'Score',
    topLabel: 'Top 3',
    canvasTitle: 'Your Use Case Canvas',
    canvasNote:
      'Score = worth + reach − difficulty − effort. It is deliberately crude: the number is there to make disagreement specific, not to decide for the room. If the ranking looks wrong, the argument you are about to have is the useful part.',
    tiedNote: 'Tied on score — collection order decides.',
    resetLabel: 'Clear all scores',
    nextCta: 'See what building these takes',
    backLabel: 'Back to the roadmap',
  },

  labs: {
    navLabel: 'Lab path',
    eyebrow: 'Stage 04 · Build & learn',
    title: 'The Lab Path Your Scenarios Ask For',
    lede: 'The accelerator works out, from the scenarios you brought, which tools your people need to be able to reach for — then teaches exactly those. Every module below is here because something on your list needs it.',
    tally: {
      modules: 'Modules',
      time: 'Total time',
      sittings: 'Sittings',
    },
    composedTitle: 'The path your list implies',
    composedNote: 'Everything your collected scenarios call for, in an order that can be walked. Rank them in stage 03 and this narrows to what to build first.',
    fromLabel: 'Needed by',
    prereqNote: 'Added as a prerequisite',
    emptyTitle: 'Collect some scenarios first',
    emptyBody:
      'The full shelf is below. Collect a few scenarios and it becomes a path built for them — only the modules they call for, in the order they have to be taken.',
    emptyCta: 'Go to stage 02',
    shelfSummary: 'The whole shelf · {n} modules',
    shelfNote:
      'One module per capability, and every module works on the same agent — the one process you named in the first hour. Each picks up what the one before it left, so a path is a selection from these in dependency order, not a set of unrelated exercises. Any module can also be run on its own from the reference material.',
    libraryTitle: 'The Lab Library',
    libraryLede:
      'Browse every capability module, open its guide, and add anything useful to the current project. Your scenario requirements stay protected; your own additions join the same dependency-aware agenda.',
    libraryEyebrow: 'Stage 04 · Browse & curate',
    libraryOpen: 'Open the Lab Library',
    libraryBack: 'Back to the Lab agenda',
    libraryCount: '{selected} manually added · {total} in the library',
    librarySelected: 'Added to this project',
    libraryAdd: 'Add to current Labs',
    libraryRemove: 'Remove from current Labs',
    libraryRequired: 'Required by your scenarios',
    libraryPrerequisite: 'Included as a prerequisite',
    libraryInAgenda: 'Already in the agenda',
    libraryManualReason: 'Added from the Lab Library',
    libraryBrowse: 'Browse the collection',
    libraryBrowseNote:
      'Open any title for the complete guide. Adding a module also brings its prerequisites into the agenda automatically.',
    librarySearchLabel: 'Search',
    librarySearchPlaceholder: 'Title, product or feature',
    librarySortLabel: 'Order',
    librarySortSequence: 'Teaching sequence',
    librarySortShortest: 'Shortest first',
    librarySortLongest: 'Longest first',
    librarySortAdded: 'Added to this project first',
    libraryResults: '{n} of {total} shown',
    libraryNoResults: 'Nothing here matches that. Clear the search to see the whole collection.',
    libraryClear: 'Clear',
    libraryProductsLabel: 'Products',
    libraryFeaturesLabel: 'Features',
    buildOrderTitle: 'What the Top 3 scenarios require',
    buildOrderNote:
      'The three that scored highest, each with the modules its build needs. Shared modules appear more than once here to make each scenario complete; the agenda below merges and schedules them once.',
    buildStepLabel: 'Build',
    agendaTitle: 'Your dynamically composed Lab agenda',
    agendaNote:
      'The Top 3 requirements are merged, deduplicated, expanded with prerequisites, and placed in dependency order. Each sitting stays within two hours, and every module is delivered once.',
    sessionTitle: 'Sitting {n} of {total}',
    buildNoScoreNote:
      'Score the list in stage 03 and this becomes a build order — three scenarios, each with the modules its own build calls for.',
    buildNoScoreCta: 'Go to stage 03',
    restNote: 'The rest of your backlog additionally needs: {modules}',
    restNone: 'Your top three already cover every module the rest of the list needs.',
    teachesLabel: 'Teaches',
    buildLabel: 'You leave with',
    afterLabel: 'After',
    minutesLabel: 'min',
    guideLabel: 'Step by step',
    notYetNote:
      'Open any agenda module for its step-by-step guide, written to be followed in your own environment as well as demonstrated in the room.',
    backLabel: 'Back to the roadmap',
  },

  intake: {
    navLabel: 'Collect scenarios',
    eyebrow: 'Stage 02 · Inspire & collect',
    title: 'What Would You Point It At?',
    lede: 'What gets built is determined by your own business needs, which makes the list below the input to everything after it: what gets prioritised, and what the first hands-on build is about.',
    yoursLabel: 'Your scenarios',
    yoursNote:
      'Aim for breadth over polish. A dozen rough entries from four departments is worth more here than three carefully written ones from your own.',
    emptyTitle: 'Nothing collected yet',
    emptyBody:
      'Take one from the examples below, or write your own. Either way the answer to “which lab should we run?” comes out of this list, so an empty list means there is nothing to design against.',
    countLabel: 'collected',
    addOwnLabel: 'Add your own',
    titleField: 'What happens today',
    titlePlaceholder: 'e.g. Someone re-keys supplier invoices into SAP',
    deptField: 'Department',
    tierField: 'Tier',
    painField: 'Why it hurts (optional)',
    painPlaceholder: 'Who does it, how often, and what it costs when it goes wrong',
    capsField: 'What a build of this would need',
    capsNote:
      'This is the judgement the whole exercise turns on — it decides which lab modules your people end up doing. Guess if you have to; it can be corrected later.',
    addCta: 'Add to the list',
    removeLabel: 'Remove',
    examplesLabel: 'Examples, by department',
    examplesNote:
      'Use these to jog your own. If one is close, take it and edit the wording to match what actually happens at your place.',
    casesLabel: 'Or start from something real',
    casesNote:
      'The examples below are generic shapes. If nothing here fits, these are what other organisations actually shipped.',
    casesCta: 'Browse the cases',
    allDepts: 'All',
    addedLabel: 'Added',
    takeLabel: 'We have this too',
    painLabel: 'Today',
    changesLabel: 'After',
    tierLabel: 'Usually',
    nextTitle: 'What happens to this list',
    nextBody:
      'The tags are what matter. Take the union of them across everything above and you have the set of tools your people need to be able to reach for — which is what the lab path is composed from. Stage 03 then scores the list and cuts it to a Top 3; rank it with the room before you build.',
    nextCta: 'Score the list and cut it to three',
    backLabel: 'Back to the roadmap',
    departments: {
      general: 'Cross-functional',
      crm: 'Sales, Marketing & Service',
      finance: 'Finance',
      hr: 'HR',
      it: 'IT',
      'supply-chain': 'Supply Chain & Operations',
    },
  },

  checklist: {
    navLabel: 'Environment check',
    eyebrow: 'Before your first build',
    title: 'Can You Actually Run A Lab?',
    lede: 'The twelve questions worked out where you enter. They cannot tell you whether you can sign in, build, publish and keep it running — only someone inside your tenant can. Go and find out; it takes about twenty minutes.',
    tierNote: 'Scoped to your tier. Higher tiers add items; nothing here is busywork for where you are.',
    noTierTitle: 'Answer the twelve questions first',
    noTierBody:
      'This list is scoped to your tier and pre-flagged from your answers, so it needs them first.',
    noTierCta: 'Go to step 1',
    flaggedLabel: 'Your answers point here',
    gatesLabel: 'Gates',
    howLabel: 'How to check',
    states: { ok: 'Yes', blocked: 'Blocked', na: 'Not applicable' },
    clearLabel: 'Clear',
    summary: '{done} of {total} checked · {blocked} blocked',
    allClear: 'Nothing is blocking you. Start the first lab.',
    blockedNote:
      'A blocked item is not a failure — it is the thing to take to whoever can unblock it. Copy the list below and send it to them.',
    copyLabel: 'Copy the blocked items',
    copiedLabel: 'Copied',
    backLabel: 'Back to the roadmap',
    groups: {
      access: {
        label: 'Can you get in?',
        note: 'Two minutes. If either of these is no, everything below is theoretical.',
      },
      build: {
        label: 'Can you build?',
        note: 'Viewing and creating are different permissions, and plenty of accounts have one without the other.',
      },
      publish: {
        label: 'Can you publish?',
        note: 'Where most first attempts actually stop. Worth finding out now rather than on demo day.',
      },
      sustain: {
        label: 'Can you keep it running?',
        note: 'Everything after the first month. A trial will carry you through the labs and then expire mid-rollout.',
      },
    },
  },

  basics: {
    navLabel: 'Background reading',
    eyebrow: 'Before you start',
    title: 'What You Need To Know First',
    lede: 'You cannot answer the twelve questions honestly about a tool you have not met. This is the short reading list, grouped by when in the programme it becomes useful.',
    hubLabel: 'Knowledge Hub',
    hubNote:
      'These articles live in the Knowledge Hub, where they are kept current. They open in a new tab.',
    hubCta: 'Browse the whole hub',
    openLabel: 'Read',
    backLabel: 'Back to the roadmap',
    groups: {
      start: {
        label: 'Read before step 1',
        note: 'Enough to answer the twelve questions about your own organisation without guessing.',
      },
      build: {
        label: 'Read before you build',
        note: 'The limits and the mechanics. None of this is needed to take step 1 — all of it is needed before your first agent goes anywhere near a real user.',
      },
      it: {
        label: 'Hand these to IT',
        note: 'Licences, capacity, environments and identity. This is the background to your IT checklist, and it is the reading whoever owns provisioning will ask for.',
      },
    },
  },

  paths: {
    eyebrow: 'Delivery',
    motionLabel: 'Motion',
    openLabel: 'Open this path',
    howLabel: 'How it runs',
    whoLabel: 'Who is involved',
    traitsLabel: 'What defines this tier',
    scenariosLabel: 'Scenarios at this tier',
    items: {
      'tier-1': {
        motion: 'Self-serve',
        title: 'Build Your Own Capacity',
        lede: 'Everyday productivity is, by definition, work business users do themselves. So the accelerator does not deliver the agent — it delivers the capacity to build it, and enough worked examples that the first build is not a blank page.',
        how: [
          'Pick a scenario from this tier that matches a task your team repeats.',
          'Work through the product training for the components it uses.',
          'Ship it, measure it against the baseline, and bring the result to the next gate.',
        ],
        who: 'Business users build. IT sets the guardrails and stays out of the way.',
      },
      'tier-2': {
        motion: 'Case-led',
        title: 'Adapt A Proven Pattern',
        lede: 'Process innovation is specialist work, and the fastest route is rarely a method taught in the abstract. It is a reference case close enough to your process that adapting it is quicker than designing from nothing.',
        how: [
          'Find the reference asset closest to the process you want to change.',
          'Walk its before → solution → after with your own data and constraints.',
          'Build the pattern once, then reuse it across the processes that rhyme with it.',
        ],
        who: 'Specialists build alongside the business. Microsoft or a partner coaches.',
      },
      'tier-3': {
        motion: 'Partner-led',
        title: 'Scope It With A Partner',
        lede: 'Enterprise-wide agentic transformation is not something a customer self-serves or a workshop finishes. It is scoped and delivered with a partner who has done it before, against gates your own IT holds.',
        how: [
          'Scope the transformation with a delivery partner who has shipped this pattern.',
          'The partner runs the build; your IT runs governance, security and the handover.',
          'The CoE takes operations at the handoff gate — the partner leaves, the capability stays.',
        ],
        who: 'A delivery partner, your IT, and an executive sponsor who owns the outcome.',
      },
    },
    tier1: {
      trainingLabel: 'Product training',
      trainingNote:
        'Tracks follow the four capabilities the platform is organised around.',
      inspirationLabel: 'Inspiration',
      inspirationNote:
        'The scenarios at this tier exist to answer "what would I even build first?" — each is a task most organisations already repeat by hand.',
    },
    tier2: {
      referenceLabel: 'Reference assets',
      referenceNote:
        'Three worked solutions, each shown as the state you are leaving, the thing you build, and what changes. Reference material for people about to build something like them.',
    },
    tier3: {
      partnerLabel: 'Working with a partner',
      partnerNote:
        'A partner is not a substitute for the method — they run inside the same five stages and clear the same gates.',
      bringsLabel: 'What a partner brings',
      brings: [
        'Delivery experience with this pattern, not just the platform',
        'Build capacity that does not compete with your run-the-business work',
        'Reference architecture, evaluation and rollback practice',
      ],
      prepareLabel: 'What you prepare',
      prepare: [
        'A signed charter with a named sponsor and exit criteria',
        'Environments, DLP and identity decided before build starts',
        'A CoE that can take operations at the handoff gate',
      ],
    },
  },

  readiness: {
    eyebrow: 'Step 1 of 3',
    title: 'Where Should You Start?',
    lede: 'Answer against how things are rather than how you would like them to be. An over-stated answer only moves the gap out of sight, and a hidden gap is what stalls a rollout at week six.',
    timeNote: '12 questions · about 5 minutes · answers stay in this browser',
    startCta: 'Begin',
    backLabel: 'Back',
    nextLabel: 'Next',
    seeResultLabel: 'See the diagnosis',
    progressLabel: 'Question {n} of {total}',
    dimensions: {
      maturity: {
        name: 'AI maturity',
        blurb: 'How your organisation understands AI today, and how much it already uses.',
      },
      resources: {
        name: 'Resource readiness',
        blurb: 'What is already in place — Copilot, Copilot Studio, low-code experience, and where your data lives.',
      },
      goal: {
        name: 'Enablement goal',
        blurb: 'Who you want to enable, and what a good outcome looks like to you.',
      },
    },
    result: {
      eyebrow: 'Step 1 of 3 · Result',
      title: 'Your Position',
      maturityLabel: 'AI maturity',
      resourcesLabel: 'Resources',
      supportLabel: 'What you can support today',
      goalLabel: 'What you asked for',
      startTierLabel: 'Start at',
      tierNames: ['Tier 1 · Everyday Productivity', 'Tier 2 · Process Innovation', 'Tier 3 · Agentic Processes'],
      axisLabel: 'Chaos → Certainty',
      verdicts: {
        nascent: {
          title: 'You are starting at the beginning',
          body: 'Neither the familiarity nor the tooling is in place yet. That is a legitimate starting position and the programme is built for it — but it means the first weeks go on groundwork rather than agents, and planning otherwise is how eight weeks pass with nothing to show.',
        },
        aligned: {
          title: 'Your goal and your footing agree',
          body: 'What you are reaching for is what you can currently carry. Start where they meet and let the gates set the pace rather than the calendar.',
        },
        gap: {
          title: 'Your goal is ahead of your footing',
          body: 'What you want is further than what you can carry today. This is the mechanism behind the 6% — not a shortage of ambition, a shortage of the conditions that let an ambition survive contact with production. The distance is closeable, and the list below is the distance.',
        },
        headroom: {
          title: 'You could be aiming higher',
          body: 'Your maturity and your resources support more than the goal you described. The constraint here is not capability — it is scope. Worth asking in the room whether the goal was set before you knew what was already in place.',
        },
      },
      entries: {
        prerequisites: {
          title: 'Line up the groundwork before Stage 01',
          body: 'Stage 01 produces a shared vision and a signed charter. Neither is worth much without somewhere to build and a shared idea of what an agent is — Stage 01 cannot manufacture those, and running it without them produces a document nobody acts on. Start the list below in parallel; licences in particular take longer than anyone expects.',
        },
        'stage-01': {
          title: 'Enter at Stage 01 — Discover & Align',
          body: 'Run the programme as designed. Interview the stakeholders, map the systems, collect the pain, and close the stage with a charter someone signs.',
        },
        accelerated: {
          title: 'Stage 01 is a confirmation — go to intake',
          body: 'The familiarity and the tooling are already there. Confirm the charter quickly and spend the time you save on scenario intake, which is where the return actually comes from.',
        },
      },
      motionLabel: 'Delivered as',
      openPathLabel: 'Open your delivery path',
      gapsLabel: 'What to line up',
      noGapsLabel: 'Nothing is currently missing. Keep the gates honest as you go.',
      dimensionsLabel: 'By dimension',
      briefLabel: 'Readiness brief',
      copyLinkLabel: 'Copy shareable link',
      copiedLabel: 'Link copied',
      retakeLabel: 'Change an answer',
      consoleLabel: 'Back to the roadmap',
      printLabel: 'Print / save as PDF',
    },
  },

};
