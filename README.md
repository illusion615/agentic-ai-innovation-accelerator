# Agentic AI Innovation Accelerator

The program site — **all eleven narrative sections**, built on the final stack. A
Microsoft presale or CSA opens this in a customer room: the first half replaces the
deck, the second half drives hands-on work.

```bash
npm install
npm run dev      # http://localhost:4321/  → redirects to /en/ or /zh/
npm run build    # static output in dist/ — no network access required
npm run preview
```

## Sections

| # | id | What it does |
|---|---|---|
| 01 | `hero` | Title card over the alchemy-workshop illustration |
| 02 | `challenge` | The Alchemist's Paradox — 85 / 91 / 6 with count-up |
| 03 | `solution` | Platform plus method — four capabilities |
| 04 | `certainty` | Dark band: the three constants |
| 05 | `journey` | Five stages × three swimlanes, filterable by role |
| 06 | `positioning` | What it isn't → what it is, three matched pairs |
| 07 | `risks` | Four failure modes, each with a named mitigation |
| 08 | `rhythm` | Eight weeks, five gates, plus the recurring cadences |
| 09 | `tiers` | Nine scenarios in three tiers, filterable |
| 10 | `assets` | Three solution assets, tabbed, Before / Solution / After |
| 11 | `start` | What you invest and the first artifact to sign |

## Structure

```
src/
  styles/global.css      design tokens (colour, type scale, rhythm, motion) + primitives
  styles/fonts.css       generated — self-hosted webfaces (scripts/fetch-fonts.mjs)
  i18n/types.ts          the Dictionary contract
  i18n/en.ts, zh.ts      ALL copy. Components never hardcode strings.
  i18n/content.ts        barrel: dictionaries + useTranslations
  i18n/config.ts         locales, path helpers
  scripts/transmutation.ts   the scroll-bound particle field
  scripts/scene.ts           scene clocks + backdrop cross-fade
  lib/assessment.ts          the entry-gate diagnosis (pure functions)
  lib/session.ts             ProgramSession + SessionStore
  content.config.ts          schema for portal content collections
  content/questions.json     the twelve entry-gate questions, EN + ZH
  components/            TopBar · ProgressAxis · Transmutation · SectionHead
                         · SectionArt
                         + one component per section
  layouts/Base.astro
  pages/index.astro      language redirect
  pages/[lang]/index.astro            THE STORY (11 sections)
  pages/[lang]/program/index.astro       GET STARTED — the three steps
  pages/[lang]/program/readiness.astro   Step 1 — the entry gate
  pages/[lang]/program/path/[tier].astro Delivery path, one per tier
  assets/images/         36 illustrations extracted from the source deck
```

## Conventions

- **Copy** lives only in `src/i18n/{en,zh}.ts`, typed by `Dictionary` in `types.ts`.
  Adding a section means extending that interface — a missing translation becomes a
  build error rather than a blank on the page.
- **Design tokens** live only in the `@theme` block of `global.css`. No component
  hardcodes a hex value, font stack, or animation duration.
- **Type is one notch larger than a normal marketing site** — the acceptance test is
  the back row of a meeting room, not a laptop.
- **Fonts and images are local.** Nothing is fetched at build or run time, so the site
  works in a customer room with no network.
- **Every animation respects `prefers-reduced-motion`** and degrades to a readable
  static page.

### Section artwork

The deck's illustrations are 2.33:1 narrative scenes — a whole guild hall, a whole
workshop, the five bays of a procession. They were first placed inline and capped to
a band, which kept layouts tight but reduced a painting that was carrying an argument
to a decorative stripe.

`SectionArt.astro` instead makes the illustration the section's **backdrop** — a room
the reader walks into, not a picture that scrolls past them:

- Full-bleed and **`position: fixed` at `z-index: -1`**, so the layer covers the
  viewport and never moves. Negative rather than 0 because it spans the whole screen:
  a section further down the document would otherwise paint its room over the navy
  band the reader is still looking at. It is page furniture, and any section wanting
  an opaque ground of its own (the dark bands, the closing panel) simply covers it.
  This requires `body` to carry **no background** — the parchment lives on `html`,
  where it becomes the canvas and stays below everything.
- **Scroll changes opacity and nothing else.** Arriving at a section cross-fades one
  room into the next over ~0.55 viewports; between the two ramps the value pins at 1,
  so the backdrop stands still for the whole reading length while the content walks
  across it. The earlier version was sticky inside its section and drifted, scaled and
  released at the section edge, which is what made the page read as sliding rather
  than as changing scene — the picture was always moving, so it never held long enough
  to be a place.
- **One flat veil, sized to what the type needs** (58% parchment / 62% ink). Uniform
  is the point: it cannot be read as a shape on the painting, only as the room
  standing further back.
- **Structured content gets a ground; a title does not.** `.plate` is a *surface* —
  93% parchment, `backdrop-filter: blur(7px)`, gold top rule — and it is right for a
  board of five stages, three statistics, a list of gates. Those are read as tables
  and want a table's edge. A **title is not a table**, and two attempts to give it one
  failed the same way: a solid plate laid a flat rectangle across the most composed
  part of every painting, and replacing it with a feathered wash of light removed the
  corners but not the shape — a bright patch fading out under the last line still
  reads as a gradient panel, and it travelled with the type. Titles now sit directly
  in the picture as type, with contrast paid for by the backdrop veil plus a tight
  parchment halo on the glyphs. Nothing is drawn behind the words at all.
- **One ground per group of copy, never per item.** A page of small boxes over a
  painting reads as a broken grid rather than as a layout. `.lead` caps at 56ch (40em
  for Chinese) so the painting keeps the rest of the line.
- `--color-muted` is darkened inside art-backed sections. On plain parchment the
  deck's grey is a deliberate 3:1 whisper; over a shadowed figure in a painting it
  drops to 1.7:1.
- Opacity is a continuous function of scroll (`scene.ts`), not an IntersectionObserver
  toggle — see below.

Used on Challenge, Solution, Journey and Tiers. Positioning, Risks, Rhythm and Assets
keep inline images because theirs are per-item content, not atmosphere; Hero and Start
already carry their own full-bleed art. The result alternates atmospheric and plain
sections, which paces the scroll.

### Picture, then caption

An art section opens with roughly a quarter-screen of nothing (`26vh` desktop, `14vh`
mobile, on `#main > section:has(> .section-art)`), and the copy inside it is held back
by a second, more patient reading line. The painting therefore **arrives, settles and
is read alone** before a word is written over it; the type then arrives as a caption
that explains what you have already been looking at. Previously the two landed
together and the picture never got its own moment — you saw a headline that happened
to have a workshop behind it.

Mechanically this is two IntersectionObservers rather than one: `-14%` for ordinary
content and `-34%` for anything inside an art section. Note the selector is anchored to
`#main`; a bare `section:has(...)` loses to Astro's scoped `.challenge[data-astro-cid-…]`
on specificity.

**Grounds follow their copy; they never lead it.** Any ground that materialises before
its text — a plate or a lead wash — is a bright empty smear across a painting, and it
was the single most slide-like moment left on the page. The reveal callback walks up
from each revealed line and opens every ground it belongs to (`data-copy-in`); an init
pass opens grounds that contain no `[data-reveal]` at all, so they do not wait forever.

Plate opacity is the product of two independent things, which is why `--ground-in` is
registered with `@property`:

```
opacity: calc(var(--scene-in) * var(--ground-in))
         │                      └── one-way fade, timed to the copy — animates
         └── welded to the scrollbar — must stay instantaneous
```

A plain `transition: opacity` on the plate would have smoothed the scrub too, and the
whole point of the scrub is that it does not lag the scrollbar.

### Legibility over paint

**Nothing is drawn behind a title.** Two versions of a title ground were tried and both
failed the same way. A solid plate laid a flat rectangle across the most composed part
of every painting. A wide, heavily feathered parchment wash removed the corners but not
the shape — a bright patch that fades out under the last line still reads as a gradient
panel on the picture, and because it was sized to the text box it travelled with the
type. Contrast is now bought once and evenly by the backdrop's own veil (58% parchment
/ 62% ink), plus a tight parchment halo on the glyphs.

**Gold's ceiling is 2.13:1 and that is not a bug.** Gold `#C9A227` on parchment
`#F5F0E6` is 2.13:1 by construction — it is the deck's palette, used for eyebrows,
rules and accents, never for body copy. Do not "fix" gold by darkening it; the fix
would be a different colour scheme. Ink navy carries every load-bearing word and is
held to 4.5:1. The standing rule when checking this: measure gold against 1.85, ink
against 4.5.

Contrast has to be sampled with `Range.getClientRects()`, not element boxes. An
element's box includes the empty width to the right of a short line, so an eyebrow gets
scored against bare painting and reports a failure that is not there.

### Scene choreography

`scene.ts` treats each top-level `<section>` as a scene with its own clock, and the
clock is the scrollbar. It publishes four normalised custom properties; all the
movement itself is expressed in CSS from those, so one rule changes the rhythm
everywhere.

```
--scene-in    0 → 1   arriving and committing to the viewport
--scene-out   0 → 1   surrendering the viewport to the next scene
--scene-p     0 → 1   the whole traverse, drives parallax
--lead-out    0 → 1   the scene's title card receding once it has been read past
--art-opacity 0 → 1   the section's backdrop, cross-fading at the scene boundary
```

The backdrop is the one thing here deliberately **not** animated in space — it is
pinned to the viewport and only ever changes opacity. Drifting or scaling it as well
made every section feel like it was sliding past rather than being somewhere.

**Entrances are triggered, exits are scrubbed.** An entrance wants to be crisp and
deterministic — it plays once, at a fixed speed, in a fixed order — so it stays on the
IntersectionObserver cascade in `Base.astro`. Scrubbing a headline against a trackpad
makes it twitch, which is worse than a late one on a projector. What is welded to the
scrollbar is the *exit*, because nothing ever leaving is what made the page read as a
stack of slides: every section looked identical whether you were arriving at it,
reading it, or half a screen past it.

Consequences worth knowing:

- **Exactly one title card per scene, chosen in script.** `scene.ts` tags it
  `data-lead` and the CSS keys off that. Doing it with a class selector dimmed three
  cards per section, because `.lead` is a *measure* class that is reused (the Challenge
  also caps its source footnote with it) and Solution and Tiers nest a `.sechead`
  inside their lead block.
- **`start` has no title card, deliberately.** It is where the site stops being read
  and starts being used; its CTA must never dim.
- The title card's recede is measured from the **section's** rect, never its own — the
  section is never transformed, so the measurement cannot be fed by its own output.
  Anchoring to the card's own box creates exactly that feedback loop.
- Opacity floor on a receded card is 0.48. A facilitator can stop anywhere and talk, so
  a card that has been scrolled past must read as *past*, never as broken.
- **A ground is tied to `--scene-in` *and* to its own copy.** Tied to neither, the box
  slid in at full strength while its copy was still waiting on the reveal cascade, and
  every section announced itself with an empty parchment rectangle. See "Picture, then
  caption" above.

**One beat, everywhere.** Staged entrances are `--beat: N`, landing N steps after the
first element of their group:

```
--beat-step: 88ms      --beat-dur: 980ms      --beat-rise: 2.6rem
```

Before this the stagger was hand-written per component at 90 / 100 / 110 / 120 / 130ms,
so no two sections shared a tempo and the page read as eleven separate animations. The
hero overrides the step to 145ms — it is the one scene nobody has scrolled to, so it
can afford the extra half second.

Measured at **111–120fps** over a full-page scroll. `prefers-reduced-motion` neutralises
every transform and holds every clock at its resting value (verified: worst effective
opacity 1.000, transforms `none`).

### Layering

```
skip link            100
top bar               50
#main .shell, figure   4    everything readable
transmutation canvas   3    fixed
section grounds        0    navy bands, the closing panel
SectionArt backdrops  -1    fixed, behind every section ground
```

Copy is lifted above the particle canvas because over a glyph the gold squares are
noise; section backgrounds deliberately stay below it so the field drifts across them
and reads as continuous through the whole page. This only works because `#main` has no
`z-index` — giving it one creates a stacking context that traps its children under the
canvas. See the comment in `Base.astro`.

The backdrops sit at **-1**, below every section's own ground, because each one spans
the whole viewport: at `0` a section further down the document paints its room over the
navy band still on screen. The consequence is that **`body` must carry no background**
— the parchment lives on `html`, where it becomes the canvas and stays below everything
— and that a section which wants to sit on parchment rather than on the painting simply
must not paint its own (`.journey` used to, and hid the room behind it).

`#main` also carries `overflow-x: clip` as a horizontal overflow guard: wide boards
occasionally reach past the gutter, and on the right that counts toward `scrollWidth`
and can push the mobile menu button off the screen. It must be `clip` and not `hidden`,
which would make the element a scroll container, and it must be on `#main` and not
`body`, where overflow propagates to the viewport instead of clipping.

### Background reading lives in the Knowledge Hub

`/program/basics/` is a **curated shelf of links, not an encyclopedia**. Everything
the programme needs a reader to *understand* — what Copilot Studio is, what it
costs, where its limits are, how Power Platform licensing and Dataverse roles
work — is already written and published in the Knowledge Hub
(`illusion615/KnowledgeHub`), which already carries a topic named *Agentic AI
Innovation Accelerator*. Restating any of it here would fork the same material
into two repos and guarantee the copies drift.

So this repo stores the **curation**, not the content: `src/content/knowledge.json`
records which hub article, which point in the flow it becomes useful, and why.
`src/lib/knowledge.ts` holds the only copy of the hub's origin.

- Records carry both `id` and `slug` because the hub's article id and its folder
  name are not always the same (`agentic-ai-adoption` lives at
  `posts/agentic-ai-adoption-practice/`).
- `title` is duplicated from the hub, unavoidably — separate repo, no build-time
  import, and a link needs text. `why` is written here instead of copying the
  hub's summary, because summaries change often and a reason-to-read is this
  programme's own editorial anyway.
- **Check what an article is actually about before shelving it.** `copilot-deep-dive`
  sits under the hub's *Vibe Coding* topic and is about **GitHub** Copilot, not
  Microsoft 365 Copilot — the wrong article to hand a business reader looking for
  "what is Copilot".

The shelf is grouped by *when it becomes useful* (before step 1 / before you
build / hand to IT), not by topic. A topic-ordered reading list is a syllabus,
and nobody reads a syllabus.

### Three observers, not one

The reveal cascade needs three, and the third is not an optimisation:

```
prompt   rootMargin -14%    ordinary content
patient  rootMargin -34%    copy inside an art section (see "Picture, then caption")
safety   threshold  0.9     anything plainly on screen
```

A negative bottom `rootMargin` draws a reading line partway up the viewport, and **the
last 14% of a document can never cross it** — at the bottom of the page there is no more
scroll to give. The closing footnote sat at `opacity: 0` permanently. The safety
observer asks the simpler question and gets the final word.

There is also a `<noscript>` fallback, because `[data-reveal] { opacity: 0 }` otherwise
hides the entire site from a browser with JavaScript off.

### Language handoff

`/en/` and `/zh/` are two separate static documents, so the toggle is a real
navigation and would land the reader at the top. In a meeting room that is the worst
possible moment to lose your place: the toggle gets pressed exactly when someone asks
to see *the current point* in the other language, and the current point is what
disappears. `lang-handoff.ts` carries the position across.

- What transfers is **the place in the argument, not a pixel offset** — which section,
  and how far through it. The two editions are not the same height (Chinese runs
  shorter per line and taller per block, and headings wrap differently), so a `scrollY`
  would land somewhere arbitrary. Section ids are identical in both editions, which is
  what makes this possible.
- It goes through **sessionStorage, not the URL**. A language toggle should not leave
  `#journey` in the address bar of a page the reader may then share. A middle-click
  into a new tab therefore gets no restore, which is the right failure — a new tab is
  a new reading.
- An inline `<script>` in `<head>` hides `#main` before the first paint if a handoff is
  pending, so the browser never paints the new edition at the top first. `visibility`,
  not `display`: the restore has to measure section geometry, and a display-hidden page
  has none. A 900ms timeout releases it if the module never runs. Measured cost: the
  page is held for ~50ms and **zero frames are painted at the top**.
- The reveal cascade is suppressed for content already on screen. It is an *arrival*
  animation; replaying it would say "here is something new" about the paragraph the
  reader just asked to have translated.
- The post-`load` re-seat **yields to the reader**: the first wheel, touch, key or
  pointer event cancels it, so a late correction can never grab the wheel back.

> **`behavior: 'instant'`, not `'auto'`.** This cost real time. `auto` does not mean
> "no animation" — it means "use the CSS `scroll-behavior`", and this site sets that to
> `smooth` for its in-page anchors. With `auto` the restore animated a half-second
> glide from the top of the new edition down to the reader's place, in full view: a
> more distracting version of the exact problem the file exists to solve.

### Chinese typography

ZH heading measures are set in `em`, not `ch`. A `ch` is the width of "0" — about
half a CJK glyph — so a ch-based measure wraps a Chinese heading at roughly half the
intended character count and splits words across lines. `text-wrap: balance` is also
disabled for ZH, because it pulls every line toward the midpoint, which is exactly
where a two-character word tends to sit.

Chinese currently falls through to system Songti SC / PingFang SC. A subsetted
Noto Serif SC / Noto Sans SC is needed for Windows parity.

## The signature effect

`src/scripts/transmutation.ts` renders one Canvas 2D particle field, fixed to the
viewport, driven by document scroll progress. Particles begin scattered, leaden and
drifting; each one has its own point on the scroll axis at which it converges on a
lattice slot, regains saturation, sharpens from a soft mote to a faceted fleck, and
finally bonds to its neighbours. The scroll indicator on the right is the same axis,
labelled Chaos → Certainty.

**Certainty is rendered quieter than chaos, not louder.** An earlier tuning scaled
brightness, particle size, bonding lines and glow all upward with order, so the end of
the page became a dense shouting grid that fought the text. Alpha is now nearly flat,
ordered particles are *smaller* than chaotic ones, and the bonds are hairlines at a
third of their old strength. What should read as settled is precision, not volume.

Focus carries the rest of the metaphor and does the real legibility work: the canvas
carries `filter: blur(var(--field-blur))`, set from the scroll handler between 2.4px
and 0.55px. Chaos is literally out of focus; certainty resolves toward sharp but never
becomes razor-sharp, so the lattice stays a texture behind the copy rather than a grid
drawn over it. A full-viewport blur composites every frame — it was measured at 120fps
across a full-page scroll, but re-measure if the field grows.

Sections should be placed with that gradient in mind: whatever sits at 0.85 scroll
progress is read as "resolved". Adding or removing a section changes where every
later section lands on that axis.

## THE PROGRAM

Get Started does not open a signup funnel or a course catalogue. The programme
is a methodology: it runs in stages, each stage consumes inputs and produces an
artifact, and section 08 states the rule the whole thing exists to enforce —
*nothing advances because time passed, it advances because a gate was cleared.*

### One live action at a time

The first version of this screen was a console: a session box, an entry gate, a
five-column stage table, three tier cards and a roadmap of unbuilt tools, all at
the same visual weight, with five competing calls to action. It was arranged by
what the programme *is*, so neither of the reader's two questions — what do I do
now, and what happens after — could be answered by looking at it. The first
interactive element was a text box asking you to name an engagement you did not
yet have.

It is now a path of three steps, and the invariant is that **exactly one gold
button exists on the screen at any moment**:

| | Step | Before the gate | After it |
| --- | --- | --- | --- |
| 1 | Find where you start | live, gold CTA | done, result shown, CTA demoted to quiet |
| 2 | Open your path | dimmed, "waiting on step 1" | live, gold CTA, one tier shown |
| 3 | Run the five stages | open, collapsed reference | unchanged |

Step 2 never presents three cards to choose between: the diagnosis chooses, so
it shows the one tier and demotes the other two to a single line of links. A
`data-state` attribute on the step and on its rail chip is the only thing the
client script moves, and `setStepState` writes both together so they can never
disagree.

The facilitator plumbing — naming the engagement, export, reset — is a
disclosure at the foot of the page. It is for whoever is running the room, not
for the reader who just arrived from the story, and it opened the page once.

**Stages, artifacts and gates are never re-authored.** The page reads
`journey.stages` and `rhythm.gates` — the same records the story page renders —
so what the customer was sold and what they are then walked through cannot
drift apart. `STAGE_GATES` in `lib/session.ts` maps one to the other.

### The entry gate

`lib/assessment.ts` is the first gate. It asks twelve questions across three
dimensions — and the three are **not the same kind of thing**:

| Dimension | Kind | What it establishes |
|---|---|---|
| `maturity` | scored | How the organisation understands AI today, and how much it already uses |
| `resources` | scored | What is already in place: M365 Copilot, Copilot Studio, low-code experience, where the data lives, who can grant access |
| `goal` | chosen | Who they want to enable, and what a good outcome looks like |

**Goal is not a score.** Wanting every employee to build small things is not
*worse* than wanting a centre of excellence — it is a different destination. So
its options carry a `tier` rather than a rank, and the schema enforces that.
Goal names the **ambition tier**; maturity × resources produce the **supported
tier**; the interesting number is the distance between them.

Consequences that are easy to get wrong and are deliberate here:

- **Support is a ceiling, not a modifier.** `startTier = min(ambitionTier,
  supportedTier)`. Whatever the ambition, an organisation without the
  understanding or the licences to carry it should not begin where the blast
  radius is largest.
- **Ambition is the rounded mean of the goal answers, not the maximum.** Someone
  who says "centre of excellence" but also "one department, one quarter" is
  describing Tier 2; taking the highest single answer would flatter them into
  Tier 3.
- **Maturity and resources are combined weighted toward the weaker side**
  (`combineAxis`, ~⅔ on the minimum). Licences with nobody who understands
  agents produce shelfware; enthusiasm with no environment produces nothing.
- **Shortfalls are per question, not per dimension.** "No Copilot Studio
  licence" and "nobody has built a flow" are both low resources and need
  entirely different next steps, so each scored question carries its own
  `gapTitle` and `gap` — which is also what makes the result answer *what
  resources to line up*, not just *which tier*.
- **A floor score is `nascent`, not `aligned`.** Telling a room that has neither
  maturity nor resources that they are nicely aligned is true and useless.
- **`headroom` exists** for the opposite case: supported well beyond the stated
  goal, where the constraint is scope rather than capability.
- **An empty question set is not `complete`.** Otherwise a content-loading
  failure silently renders a result for a diagnosis nobody ran.

**What is deliberately absent:** sponsorship, exit criteria, DLP policy. Those
still gate the programme, but they belong to the Sponsor Charter instrument in
Stage 01, asked of a sponsor. Asking them at first contact produced a
questionnaire written in IT-governance language that the business people
actually in the room could not answer — which is the fastest way to get
flattering answers and a useless diagnosis.

### Delivery paths

The tier does not only decide which scenarios to pursue — **it decides the
delivery motion**, because the three differ in what a customer can realistically
carry alone:

| Tier | Motion | Why |
|---|---|---|
| 1 | Self-serve | Everyday productivity *is* work business users do themselves. The programme delivers capacity — product training plus worked examples — not the agent. |
| 2 | Case-led | Process innovation is specialist work. A reference case close enough to adapt beats a method taught in the abstract. |
| 3 | Partner-led | Enterprise transformation is not self-served and not finished by a workshop. It is scoped and delivered with a partner, against gates the customer's own IT holds. |

`deliveryMotion(tier)` in `lib/assessment.ts`. It is **orthogonal to
`entryPoint`**, which answers a readiness question — *can Stage 01 produce a
charter anyone will honour?* A customer can be Tier 1 self-serve and still have
prerequisites to fix first, so the result page states both.

Each path page reads its tier's identity — traits, value, complexity,
scenarios — from `tiers.items`, the same records section 09 renders. Only the
motion and the material specific to it are authored on the page.

**The three solution assets moved off the story onto the Tier 2 path.** They are
reference material for people about to build something like them, not an
argument for a room still deciding whether to start. `Assets.astro` takes
`framed={false}` there so the host page owns the heading. The story is ten
sections now, and about a screen shorter.

Tier 1's training tracks follow `solution.capabilities` — the four capabilities
the platform is already organised around — rather than inventing a curriculum.
The curriculum itself is not written yet and the page says so.

### State

`ProgramSession` is serialisable from day one and every instrument writes into
the same record. Reads and writes go through `SessionStore`; the default
implementation is local storage, so the tool works in a meeting room with no
network and nothing leaves the machine. Swapping in a backend means replacing
the implementation, not touching anything above it.

Results are shareable without a server by encoding answers as one base-4 digit
per question in the URL (`/program/?r=…`), which step 1 adopts on open — a
sponsor following a colleague's link lands on the same diagnosis, with step 2
already unlocked, rather than on a blank first step.

Content lives in `src/content/questions.json` with both languages in each
record. The schema in `content.config.ts` enforces the two question kinds:
scored questions need four options ascending 0–3 plus a `gapTitle` and `gap` in
both languages; goal questions need a `tier` on every option. A content edit
therefore cannot silently skew a customer's result or produce a shortfall with
no remedy attached.

### Where copy lives

- **Fixed field set** → the `Dictionary` in `src/i18n/`. A missing translation
  is a build error.
- **A growing list** → a content collection in `src/content/`.

The story dictionaries were already ~570 lines each for a single page; the
portal's content is a list that keeps growing, and putting it there would make
both unreviewable.

## Verifying

Two rules, both learned the hard way:

- **Assert semantics against `dist/`, not against the dev server.** All five program
  pages shipped with no `<h1>` and dev could not see it, because the Astro dev toolbar
  injects h1s of its own. (Playwright's CSS engine pierces open shadow roots, so it
  finds them; `closest('astro-dev-toolbar')` does *not* cross a shadow boundary, so the
  obvious filter silently fails — climb `parentElement ?? getRootNode().host` instead.)
  The root `dist/index.html` is a language-redirect stub and correctly has no `h1`.
- **Compare `scrollWidth` to `clientWidth`, never to `innerWidth`.** Under mobile
  emulation `innerWidth` *grows* to swallow horizontal overflow, which hid the 64px
  spill that had pushed the menu button off the screen.

Other things that corrupt a measurement: `scroll-behavior: smooth` (inject
`html { scroll-behavior: auto !important }`), Playwright scrolling a click target to
the top and parking it under the sticky bar (use `block: 'center'`), and contrast
probes sampling the site's own type through a translucent ground (hide `.lead > *`).

Independent of tooling, the site now sets `scroll-padding-block-start: 6rem` so
keyboard focus never lands underneath the sticky bar.

## Not yet built

The rest of the instruments — Sponsor Charter, Scenario Intake, Use Case Canvas
and scoring, Success Metrics, Gate Tracker, Champion Tracker — plus Present
mode, the facilitator overlay and the nine scenario playbooks. Get Started lists
them under "Coming next" so it is honest about its own state, at the foot of the
page rather than in the path. See the design brief.
