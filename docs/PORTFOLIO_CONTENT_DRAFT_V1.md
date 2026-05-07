# Portfolio Content — First Draft

> Written from Tayler's source material: OnboardIQ brief (580 lines, 15+ stakeholder interviews),
> Rayni design case study (12 user interviews, 4 design iterations), MindPattern architecture docs
> (20K+ LOC, 17 runs, 13 agents). This is a first draft for review and revision.

---

## Homepage

### Headline

```
Hey, I'm Tayler.

I design and build AI systems humans can trust.

Senior Product Designer · AI + Workflow Systems
8 years in fintech · 3 AI products shipped 0→1
```

### Subline (below fold)

```
I've spent the last 8 years designing complex enterprise workflows
in fintech — then shipped 3 AI products from zero to production
as a solo designer/engineer. My work lives at the intersection of
product strategy, interaction design, and real code.
```

### Featured Case Studies (in order)

1. **OnboardIQ** — "Cut merchant onboarding from 6 months to 2 months for a $16B fintech platform"
2. **Rayni AI** — "Built a RAG platform where scientists can verify every AI answer against the source"
3. **MindPattern** — "13 AI agents research, write, and publish daily — with human approval gates"

---

## Case Study #1: OnboardIQ

### Act 1: The Hook

**Headline:** Turning a 6-Month Black Hole into a 2-Month Workflow

**One-liner:** I designed and built a workflow orchestration platform that transformed how a $16B fintech company onboards merchants — cutting timelines by 65% and unlocking $2.1M in annual revenue.

**Role:** Lead Product Designer & Full-Stack Engineer
**Timeline:** 18 months (2022-2024)
**Team:** Solo designer, 2 backend engineers, product manager
**Status:** Live — processing across 13,000+ retail locations

**Key Metrics:**
- **$2.1M** annual revenue impact
- **65%** reduction in onboarding time
- **90%** fewer manual errors
- **300%** increase in onboarding capacity

---

### Act 2: The Problem

Versatile Credit processes $16 billion in annual financing through 35+ lending partners — Wells Fargo, Synchrony, GreenSky, Snap Finance — across 13,000 retail locations. When a new merchant group wants to join the platform, the onboarding process touches every part of the company. And it was completely manual.

**What onboarding actually looked like:**

An operations specialist named Amanda would get a new merchant request. She'd open a spreadsheet to track it. Then she'd spend 8 hours entering promotional plan data by hand — 130+ foundation plans per lender. She'd email lender contacts for API credentials and wait days for responses. She'd coordinate with three departments over Slack, email, and Salesforce, none of which talked to each other.

When I asked Amanda how she knew what to do for each lender, she said: *"I ask Lisa. She's been here 12 years and everything's in her head."*

That was the system. Lisa's memory.

**The real cost:**

A company called Heartland Dental committed to onboarding 800 locations. The sales team promised a timeline without checking with operations. Nobody could say how long it would actually take because nobody could see where anything stood. Projects fell into what the team called "black holes" — work disappeared between departments with no tracking, no status, no accountability.

The CFO, Maxwell, told me: the unpredictable timelines were directly affecting revenue forecasting. At $70 per location in SaaS fees, across merchant groups with 600+ locations, every month of delay was measurable lost revenue.

**What I heard in 15+ stakeholder interviews:**

- Amanda (Operations): *"I spend my mornings in spreadsheets trying to figure out which workflows are stuck. By the time I find problems, we've already missed SLAs."*
- Chris (Sales): *"I can't tell customers when they'll go live. I just say 'a few months' and hope."*
- Lisa (Domain Expert): *"If I got hit by a bus tomorrow, half the lender configurations would be lost."*
- Maxwell (CFO): *"We need predictable timelines. I can't forecast revenue when I don't know when merchants will be active."*

**The before state:**
- 6-month average onboarding (ranging 2-8 months)
- 8 hours of manual data entry per lender
- Zero real-time visibility across departments
- All institutional knowledge in 3 people's heads
- No audit trail for compliance

---

### Act 3: The Process

**The research:**

I ran 15+ stakeholder interviews across operations, sales, lender management, and the C-suite. I shadowed Amanda for two full days to see the actual work — not the process she described, but the one she lived. I ran card sorting exercises to understand how the team mentally organized workflow states. I mapped the end-to-end journey from merchant application to go-live.

**The key insight:**

The problem wasn't that onboarding was complex — it was that the complexity was invisible. Nobody could see the full picture. Operations didn't know what sales had promised. Sales didn't know what was blocked. Lenders didn't know what they needed to provide. Every stakeholder was operating on partial information.

The solution wasn't to simplify the process — it was to make the complexity visible and manageable.

**The strategic decisions:**

1. **Configuration inheritance, not configuration repetition.** Lender settings cascade from workflow → version → step → instance. Set it once at the top, override only where needed. This eliminated the 8-hour data entry problem — not by automating data entry, but by making most of it unnecessary.

2. **Role-based views, not one dashboard.** Amanda needs to see task assignments and SLA timers. Maxwell needs to see pipeline velocity and revenue impact. Lenders need to see their merchants' progress. Same data, different lenses.

3. **Proactive alerting, not reactive firefighting.** Red/yellow/green states at every level. SLA countdowns visible everywhere. The system surfaces problems before they become violations — before Amanda has to go hunting in spreadsheets.

4. **Audit everything.** In fintech, compliance isn't a feature — it's the foundation. Every configuration change logged, every assignment tracked, every state transition recorded.

**Design principles:**
- Progressive complexity: show the overview first, details on demand
- Configuration inheritance: make the invisible cascade visible
- Time is money: SLA countdowns everywhere — make urgency tangible without creating panic
- Role-aware views: each user sees exactly what they need

---

### Act 4: The Design

**The evolution:**

**V1: Linear Step View** — My first pass treated workflows as simple sequences. Vertical step list, status indicators, collapsible activity per step. It worked for single workflows but fell apart at scale — Amanda managed 50+ simultaneously, and a list doesn't scan.

**V2: Card Grid + Timeline** — User feedback drove a fundamental shift. Card-based dashboard for scanning many workflows at once. Horizontal timeline for individual execution. Real-time status updates. This was the "oh, I can actually see what's happening" moment in testing.

**V3: Configuration Inheritance** — Added the cascading configuration UI. Inheritance indicators on every field showing where values come from (workflow, version, step, or override). Side-by-side diff views for changes. This was the hardest design challenge — making 4 levels of configuration inheritance visually clear without overwhelming.

**V4: Role-Based Views** — Personalized dashboards based on user role. Managers see capacity and bottlenecks. Specialists see their task queue. Built the drag-drop workflow designer. Full RBAC with Google SSO.

**Key screens:**
- **Workflow Dashboard** — Card grid showing 50+ workflows at a glance with status badges and SLA countdowns
- **Workflow Designer** — Drag-drop step sequencing with cascading defaults and template library
- **Instance Detail** — Real-time timeline with step progress, activity log, and assignment history
- **Platform Features Matrix** — 22 features × 45 providers compatibility grid (the team's rosetta stone)
- **Analytics Dashboard** — Lender performance comparison with volume trends and bottleneck analysis

**The key design decisions and why:**
- Card grid over table: operations managers think in batches, not rows. Cards let you scan status across 50 workflows without reading.
- Timeline visualization: workflow execution is sequential. Horizontal timeline makes progress and blockers immediately visible.
- Inheritance indicators: small icons show where each config value originates. Eliminated "why is it set this way?" confusion — the #1 support question.
- SLA countdown everywhere: time remaining on cards, timelines, detail views. Consistent placement builds muscle memory.

---

### Act 5: The Build

**What I personally built:**

I was the sole designer and primary frontend engineer. Two backend engineers handled core Spring Boot services; I owned everything from user-facing design through frontend implementation to REST API design.

**Architecture:**
- **Frontend:** 35+ Pebble macro components with Tailwind CSS. Custom animation framework with hardware-accelerated transitions. Built on Versatile Credit's ServiceKit — a brownfield constraint that meant working within enterprise framework limitations, not around them.
- **Backend:** Kotlin/Spring Boot 3.x. 25+ controllers (web + REST dual API), 12 services, 20+ DAOs with JDBC Template. Role-based access control with Google SSO.
- **Database:** PostgreSQL with UUID keys, 49 Flyway migrations (zero downtime, every one), soft-delete support for audit trails.
- **Deployment:** GitLab CI/CD to 5 environments: Test, UAT, Pentest, Demo, Production.

**The technical decisions with product rationale:**

1. **Cascading configuration in the database** — Built a 4-level configuration hierarchy (workflow → version → step → instance) so that setting 130+ promotional plans for a lender is a one-time operation at the workflow level. Steps and instances inherit automatically. This turned Amanda's 8-hour data entry into a 10-minute template selection.

2. **Dual API pattern (web + REST)** — The enterprise required Pebble template rendering for internal users AND a REST API for future lender portal integration. Building both from the start avoided a rewrite later.

3. **Business-day SLA engine** — SLA calculations that respect holidays and business hours. This sounds simple, but getting it wrong means false alerts or missed deadlines — both of which erode trust in the system.

---

### Act 6: The Impact

**The numbers:**
- **$2.1M** annual revenue impact from faster merchant activation
- **65%** reduction in operations tracking time — Amanda went from spreadsheet hunting to dashboard scanning
- **90%** fewer configuration errors through validated automated workflows
- **300%** increase in onboarding capacity without adding staff
- **49** production database migrations with zero downtime
- **35+** lending partners served, including Wells Fargo and Synchrony

**The quote that mattered:**
*"For the first time, I can see everything that's happening across all our partner workflows. No more spreadsheet hunting."* — Operations Manager

**What I learned:**
- Enterprise software doesn't have to feel enterprise. Clarity beats density.
- Configuration inheritance is a UX problem, not just a technical one. Making the cascade visible changed how the team understood their own system.
- SLA visualization changes behavior more than SLA alerts. Showing the countdown created a shared urgency that notifications never could.
- Role-based views aren't just about permissions — they're about focus. Each user seeing only what matters to them made the system feel simpler than it was.

**What I'd do differently:**
- I'd push harder for a merchant-facing portal in V1. We deferred it, and the operations team still manually communicates status to merchants via email.
- The inheritance UI works, but I'd explore progressive disclosure more — showing the full cascade upfront is powerful but occasionally overwhelming for new users.

---
---

## Case Study #2: Rayni AI

### Act 1: The Hook

**Headline:** Designing Trust in AI-Powered Scientific Research

**One-liner:** I designed and built a document intelligence platform where scientists verify every AI answer against the source — because in a lab, wrong information doesn't just waste time, it ruins experiments.

**Role:** Lead Product Designer & Engineer (sole)
**Timeline:** 6 months (2024)
**Team:** Solo designer/developer
**Status:** Live at rayni.ai

**Key Metrics:**
- **87.5%** usability score in first moderated testing
- **<30s** time to verified answer (down from 45-minute manual search)
- **100%** citation rate — every answer linked to source
- **50+** reusable components in the design system

---

### Act 2: The Problem

Scientific research labs run on institutional knowledge. A senior lab manager named Dr. Sarah Chen has spent 15 years learning where everything is — which page of which manual covers which error code for which instrument. When a mass spectrometer throws error E-503 at 2 AM, she knows exactly where to look.

But she can't be everywhere. And she can't transfer 15 years of mental filing to the new hires.

**What the workflow looked like:**

A junior technician named Marcus encounters an instrument error. He opens the manufacturer's manual — 500 pages. He searches for the error code. The manual assumes he already understands the system architecture, so the relevant section makes no sense without context from three other sections. He tries Ctrl+F across multiple PDFs. After 45 minutes, he either finds an answer he's not sure about or gives up and messages Dr. Chen — who's already been interrupted three times today.

**What I learned from 12 user interviews:**
- 73% of technicians search documentation before asking colleagues, but only 12% find what they need
- Average time spent searching per equipment issue: 45 minutes before escalating
- The minimum confidence level users need before acting on information: 8.2 out of 10

**The critical insight:**

*"Users don't need AI to be right 100% of the time — they need to know exactly when to trust it and when not to."*

This changed everything about how I designed the product. The goal wasn't perfect AI answers. The goal was trustworthy AI answers — where "trustworthy" means you can verify the source yourself, in seconds.

---

### Act 3: The Process

**The research:**

12 contextual inquiry sessions with lab technicians — junior and senior. I watched them troubleshoot real equipment issues, noting where they went, what they searched, and where they gave up. I mapped the journey from "something broke" to "I'm confident in the fix." I ran card sorting to understand how they mentally organized documentation.

**The key strategic decisions:**

1. **Verifiable by default.** Every AI response links directly to the source document, at the exact page and paragraph. No trust-me answers. Users should never wonder "where did this come from?"

2. **Confidence is information.** Show users when the AI is certain vs. uncertain. A traffic-light system (green/amber/red) maps to universal mental models — you don't need to read a label to understand what green means. Users said they needed 8.2/10 confidence before acting. So we show them the number.

3. **Fail gracefully.** When the AI can't answer confidently, don't guess. Instead, prompt: "I don't have enough information to answer this confidently. Would you like to upload the missing manual?" Admitting limitations builds more trust than faking certainty.

4. **Progressive disclosure.** Surface the answer first (BLUF — Bottom Line Up Front: verdict, evidence, fix, safety warnings). Let users drill into supporting evidence at their own pace. Respect busy researchers' time.

5. **Split-screen verification.** 80% of users in testing wanted to see the source document immediately after reading the AI answer. Side-by-side view: AI answer on the left, highlighted source PDF on the right. Click a citation, see exactly where it came from. No context switching.

6. **Speed builds trust.** In high-stakes environments, perceived performance directly affects confidence in accuracy. If the AI answer takes 30 seconds, users start doubting it. Streaming responses with citations appearing inline — building trust incrementally as the answer forms.

---

### Act 4: The Design

**The evolution:**

**V1: Standard Chatbot** — Basic chat with citations as numbered footnotes at the bottom. Confidence shown as a percentage. Document library on a separate page. Testing showed users ignored the footnotes entirely — they'd read the answer and either trust it or not, but they wouldn't scroll down to check sources.

**V2: Inline Citations** — Moved citations into the response text as clickable links. Added confidence pills (green/amber/red) to each response. Introduced gap detection prompts. Unified navigation with the document browser. Better — users clicked citations — but they still had to leave the conversation to view the source.

**V3: Split-Screen Verification** — The breakthrough. Click a citation, and the source PDF opens in a side panel with the relevant passage highlighted. Users said this was "exactly what I needed" — direct quote from 5 of 8 testers. Added deep-linking to exact page coordinates. Introduced BLUF response format.

**V4: Trust-First Design** — Final iteration. SSE streaming with live citation injection — citations appear inline as the response generates, not all at once at the end. Proactive gap detection ("I don't have enough information — would you like to upload the manual?"). Knowledge graph visualization for connecting related instruments. Human-in-the-loop escalation flows.

**The design system:**

I created a "no borders needed" design language — using color layering and elevation hierarchy instead of hard borders. Dense technical interfaces need breathing room, and borders add visual noise to already information-heavy screens. 50+ reusable components, 24 design tokens, 100% dark mode support, zero hard borders.

**Key screens:**
- **Chat with Reasoning** — Streaming response with step-by-step reasoning indicators and inline citations
- **Citation Verification** — Split-screen: AI answer on left, highlighted source PDF on right
- **Knowledge Store** — 5-layer hierarchical filtering with document grid and processing status
- **Instruments Dashboard** — Card-based overview of all instruments with quick chat access
- **Knowledge Graph** — Visual canvas connecting instruments, manuals, and documentation relationships

---

### Act 5: The Build

**What I built (solo):**

360K+ lines of code. Frontend and backend. AI pipeline and user interface.

**Architecture:**
- **Frontend:** Next.js 14, React 18, TypeScript. SWR for data fetching, pdfjs-dist for PDF rendering, ReactFlow for knowledge graphs. Framer Motion for interactions.
- **Backend:** Django 5.2, DRF 3.15.2, Celery + Redis for async processing, PostgreSQL with pgvector.
- **AI Pipeline:** LangChain + LangGraph for agent orchestration. Hybrid RAG architecture combining tree-based navigation with semantic vector search (1536-dim embeddings) and MMR reranking. Docling for layout-aware PDF parsing.
- **Infrastructure:** Docker, Supabase for auth, tus-js-client for resumable uploads (scientific PDFs are large).

**The technical decisions with product rationale:**

1. **Hybrid RAG** — Tree-based navigation handles "what's in Chapter 3?" queries. Semantic vector search handles "how do I fix error E-503?" queries. Combined, they cover the two ways scientists actually search: browsing and asking.

2. **Streaming citations via SSE** — Citations inject inline as the response streams. This wasn't just a performance choice — it builds trust incrementally. Users see sources being referenced in real-time, not dumped at the end. Psychologically, watching the AI "show its work" feels fundamentally different from getting a pre-packaged answer.

3. **Split-screen PDF with coordinate deep-linking** — When a user clicks a citation, the PDF viewer scrolls to the exact paragraph and highlights it. This required parsing PDF coordinate metadata from the ingestion pipeline and storing it alongside the vector embeddings. Extra engineering work, but it's the difference between "the answer is somewhere in this 500-page PDF" and "the answer is right here."

---

### Act 6: The Impact

**The numbers:**
- **87.5%** usability score across 4 task scenarios in moderated testing
- **<30s** to a verified answer — down from 45 minutes of manual searching
- **100%** citation rate — every response sourced to exact document location
- **50+** components in the design system
- **360K+** lines of code, shipped solo

**Usability results by task:**
- Find troubleshooting steps for Error E-503: 100% success
- Assess confidence level of AI response: 87.5% success (added numeric confidence alongside color)
- Upload new document to knowledge base: 75% success (added explicit upload button alongside drag-drop)
- Navigate from answer to source document: 100% success (split-screen was universally praised)

**The quote that mattered:**
*"For the first time, I can actually verify where the AI got its information. That changes everything about how much I trust it."* — Lab Manager

**What I learned:**
- Trust in AI isn't binary — it's built through consistent, verifiable interactions. Every citation is a trust deposit.
- Admitting limitations ("I don't have enough information") builds more trust than guessing. Gap detection turned AI weakness into a feature.
- Streaming interfaces feel faster AND more trustworthy than batch responses. Users trust the answer more when they watch it being constructed.
- Power users don't need hand-holding, but they appreciate transparency. Show the reasoning, let them decide whether to verify.

**What I'd do differently:**
- I'd invest in a guided onboarding flow for first-time users. The interface is intuitive for power users but assumes domain familiarity.
- The knowledge graph visualization is powerful but underutilized — I'd integrate it more deeply into the chat experience rather than treating it as a separate feature.

---
---

## Case Study #3: MindPattern

### Act 1: The Hook

**Headline:** Designing Autonomous AI Systems with Human Editorial Control

**One-liner:** I built a system where 13 AI research agents scan 8 data sources every morning, synthesize a 4,500-word newsletter, draft social posts, and improve themselves daily — all with human approval gates that keep editorial judgment where it belongs.

**Role:** Solo designer/engineer
**Timeline:** Ongoing (2024-present, 60+ days active, 116 commits)
**Team:** Solo
**Status:** Production — runs daily at 7 AM, deployed on Fly.io

**Key Metrics:**
- **13** specialized research agents
- **8** data sources scanned daily
- **291** findings per run (after deduplication)
- **0.923** newsletter quality score

---

### Act 2: The Problem

I ship code with AI tools every day. I need to know what's happening in the AI/developer ecosystem — new models, new frameworks, security vulnerabilities, architectural patterns, industry shifts. But the information landscape is impossible for one person to cover manually.

67 RSS feeds. arXiv papers. GitHub trending repos. Hacker News front page. Reddit threads. Twitter/X conversations. YouTube talks. Research papers. Every day, hundreds of potentially relevant items across 8 different platforms.

**The real problem isn't access to information — it's synthesis.** Reading everything would take 4+ hours daily. But skimming means missing the connections between things: a supply chain attack on npm that relates to a new security framework that connects to a compliance change affecting your production stack. Those cross-domain connections are where the real value is, and they're exactly what gets lost when you skim.

**The design challenge:**

How do you build an autonomous system that:
- Gathers intelligence at superhuman scale (8 sources, hundreds of items daily)
- Synthesizes connections a human would miss (cross-domain pattern matching)
- Writes in your voice, not in AI slop
- But keeps the human in editorial control of what gets published?

Fully automated = you publish garbage. Fully manual = you can't keep up. The system needs to be autonomous in research but human-controlled in editorial judgment.

---

### Act 3: The Process

**The key architectural insight:**

**Python controls. LLMs judge.**

The state machine is deterministic — Python decides what phase runs next, what data gets gathered, and what happens on failure. The LLMs do what they're good at: evaluate information, synthesize connections, write prose, critique writing. No LLM ever decides what phase comes next. No agent discovers what tools it needs at runtime.

This sounds obvious, but most agent systems get it backwards. They let the LLM plan its own execution, which leads to wandering, hallucination, and unpredictable costs. MindPattern's execution path is fixed. Only the content is emergent.

**The design decisions:**

1. **Preflight + Agent pattern.** Before any AI agent runs, Python gathers a guaranteed floor of data: 67 RSS feeds parsed, APIs queried, items deduplicated using vector embeddings (BAAI/bge-small-en-v1.5 at 0.85 threshold). Agents evaluate this floor first (Phase 1), then explore further with their own tool calls (Phase 2). The floor ensures nothing obvious gets missed. The ceiling ensures agents can find things Python can't.

2. **Identity-driven prompting.** Four markdown files define how the system thinks and writes:
   - **soul.md** — who the agent is: mission, values, what it cares about
   - **user.md** — who it serves: my background, interests, editorial patterns
   - **voice.md** — how to write: 24 banned AI-writing patterns, sentence structure targets, transformation rules
   - **decisions.md** — append-only editorial log

   Every agent references these. After every run, the EVOLVE phase updates them based on outcomes. The system learns what topics resonate, which sources deliver value, and how to write in a human voice over time.

3. **Two approval gates.** Gate 1: before topic selection — I approve the story or inject custom context. Gate 2: before social posting — I approve the final drafts. The system never publishes without my sign-off. This isn't a safety net — it's the design. The system's job is to do research and drafting at superhuman scale. My job is editorial judgment.

4. **Self-optimization loop.** After every run, the ANALYZE phase reads execution traces from all 13 agents (~500 lines per agent), compares behavior against skill file instructions, identifies deviations, detects cross-agent patterns, and applies atomic fixes to agent skill files. A PromptTracker prevents circular regressions — if a fix makes things worse, it gets reverted.

5. **Multi-model routing.** Not all tasks need the same model. Trend scanning: Haiku (fast, cheap). Research agents: Sonnet (good balance). Synthesis and self-optimization: Opus with 1M context window (needs to hold all 13 agent outputs simultaneously). Routing is deterministic by phase, not decided by an LLM.

---

### Act 4: The Design

**The 12-phase pipeline:**

```
INIT → TREND_SCAN → RESEARCH → SYNTHESIS → DELIVER → LEARN
  → SOCIAL → ENGAGEMENT → EVOLVE → ANALYZE → MIRROR → SYNC
```

Critical phases (RESEARCH, SYNTHESIS) fail the pipeline. Everything else logs warnings and continues. This is deliberate — a failed social post shouldn't prevent newsletter delivery.

**The 13 research agents:**

Each agent has a specialty: arxiv-researcher, news-researcher, agents-researcher, security-researcher, etc. Each gets a skill file defining its domain expertise, preferred sources, evaluation criteria, and tool preferences. Agents run in parallel with Sonnet, 25 turns each.

**The social pipeline:**

```
EIC (Opus) scores topic by novelty × appeal × threads
  ↓ Gate 1: Approve topic or inject context
Creative Director (Sonnet) writes brief + framing
  ↓ Parallel: Bluesky Writer (300 chars) + LinkedIn Writer (1350 chars)
  ↓ Parallel: Bluesky Critic (blind) + LinkedIn Critic (blind)
  ↓ Policy Engine (deterministic rules)
  ↓ Humanizer (strips 24 AI writing patterns, applies voice.md)
  ↓ Expeditor (final quality gate)
  ↓ Gate 2: Approve posts or reject
  ↓ Post to Bluesky + LinkedIn
```

The humanizer is its own design artifact. voice.md maintains a library of 24 AI writing anti-patterns and their human transformations:
- "In today's ever-evolving landscape" → deleted
- "This represents a significant shift" → "This matters because [specific reason]"
- "Multifaceted," "testament," "robust," "seamless" → banned

**The self-optimization cycle:**

After every run, ANALYZE reads all agent traces, identifies where agents deviated from their skill file instructions, and makes atomic edits. Each edit is git-committed. If the next run shows regression, the commit gets reverted. The system tracks its own improvement trajectory.

---

### Act 5: The Build

**What I built:**

20,000+ lines of Python. 116 commits over 60 days. The full stack:

- **Orchestrator:** 12-phase deterministic state machine with checkpoint/resume, concurrency guards (lock file prevents parallel runs), and caffeinate integration (keeps Mac awake during pipeline).
- **Preflight:** 8 data source adapters — feedparser for 67 RSS feeds, arXiv Export API, GitHub Search API, Hacker News Algolia API, Reddit JSON API, xreach CLI for Twitter/X, Exa via MCP, yt-dlp for YouTube transcripts.
- **Memory:** Dual SQLite databases — memory.db (17+ tables: findings, social posts, entity graph, feedback, patterns) and traces.db (execution observability). Vector embeddings via fastembed (BAAI/bge-small-en-v1.5, 384-dim) for semantic deduplication.
- **Social:** Complete multi-platform publishing pipeline — EIC, creative director, parallel writers, blind critics, policy engine, humanizer, expeditor, Slack approval gates, AT Protocol (Bluesky) and LinkedIn API v202504.
- **Identity:** soul.md / user.md / voice.md / decisions.md — evolving files that shape every agent's behavior. Updated after every run.
- **Deployment:** Docker on Fly.io (mindpattern.fly.dev). macOS launchd for daily scheduling. macOS Keychain for credential storage (no .env files). FastAPI dashboard with SSE for real-time monitoring.
- **Testing:** 58 test files, 600+ test cases across memory, orchestrator, social, and policy modules.

---

### Act 6: The Impact

**The output quality:**

The March 25, 2026 newsletter demonstrates the caliber:

- **Story 1:** Connected a TeamPCP supply chain attack across npm, PyPI, and GitHub — synthesizing four independent vendor security responses (Wiz, Microsoft, Datadog, Snyk) into a unified narrative with actionable defenses
- **Story 2:** Analyzed Stripe's Minions architecture — 1,300 weekly PRs from coding agents, how they curate 400 available tools down to 15 per run
- **Story 3:** Assessed Figma's MCP server launch and its implications for design-to-code pipelines
- **Story 4:** Flagged n8n CVE cluster with 71K exposed instances and a CISA deadline
- **Story 5:** Synthesized Claude Code security research from three independent teams (Lasso, Trail of Bits, Anthropic) converging on the same attack surface

Each story includes specific numbers, named researchers, version numbers, and builder-actionable recommendations. Not summaries. Not lists. Narratives with analysis.

**The metrics:**
- **17** successful daily runs
- **291** findings per run after deduplication
- **0.923** newsletter quality score (rated on coverage, dedup, novelty, source diversity, topic balance)
- **13** agents running in parallel daily
- **67** RSS feeds + 7 API sources parsed
- **600+** test cases

**What I learned:**
- Deterministic orchestration with agentic phases beats fully agentic systems. Let Python handle the boring control flow. Let LLMs handle the interesting judgment calls.
- Identity files (soul, user, voice) as first-class system artifacts create coherent behavior across 13+ agents without prompt duplication.
- Self-optimization works — but only with regression tracking. Without it, the system optimizes in circles.
- Two approval gates are the right number. One is too loose (you publish things you'd rather not). Three is too tight (you become the bottleneck the system was supposed to eliminate).
- The humanizer is essential. AI writing patterns are subtle and persistent. Without active removal, even good content sounds like AI wrote it.

**What I'd do differently:**
- I'd add engagement analytics from day one. The system publishes, but can't yet measure which topics generate the most response — so the optimization loop is blind to audience feedback.
- I'd build the web dashboard earlier. The system generates rich data (entity graphs, quality scores, agent traces) but the current Fly.io dashboard is minimal.

---
---

## Supporting Projects (Brief Cards)

### Doc Domain Agents
**GraphRAG with knowledge graphs and zero-hallucination AI**
Neo4j GraphRAG with 85% confidence threshold. When the AI isn't sure, it asks for the missing document instead of guessing. BLUF response format: Verdict → Evidence → Fix → Safety Warnings.

### Goldlink / Blue Moon Senior Counseling
**HIPAA-compliant telehealth with comprehensive accessibility**
WebRTC video therapy platform for Medicare-covered geriatric counseling. 6-axis accessibility controls (font size, contrast, motion, captions, blur, focus). Automatic CPT billing code detection saves 15 minutes per session. Three.js particle animation system reduces pre-session anxiety.

### Versatile Credit Platform (8 Years)
**The fintech platform behind everything**
$16B in annual financing. 6M applications. 13,000 retail locations. 35+ lending partners. 120+ API endpoints. 49+ database migrations. This is where I learned enterprise workflow complexity — and why I built OnboardIQ to fix it.
