export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectStoryPhase {
  phase: string;
  description: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string[];
  featured?: boolean;
  status?: "live" | "in-progress" | "archived";
  description: string;
  metrics?: ProjectMetric[];
  story?: ProjectStoryPhase[];
  tags: string[];
  gradient: string;
  image: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    id: "onboard-iq",
    slug: "onboard-iq",
    title: "OnboardIQ Workflow Instance Platform",
    category: ["Full-Stack", "UI/UX"],
    featured: true,
    status: "live",
    description:
      "Enterprise workflow orchestration platform built on Kotlin/Spring Boot with ServiceKit. Launch, configure, monitor, and manage live workflow instances with cascading configuration, SLA tracking, and role-based assignments across 5 deployment environments.",
    metrics: [
      { value: "$2.1M", label: "Revenue Impact" },
      { value: "65%", label: "Process Improvement" },
      { value: "49", label: "Flyway Migrations" },
    ],
    story: [
      {
        phase: "Architecture",
        description:
          "4 core capabilities: Launch Workflow, Instance List with filters, Instance View with progress timeline, Instance Edit. Cascading config from workflow → version → step → instance.",
      },
      {
        phase: "Enterprise UI",
        description:
          "35+ Pebble macro components with Tailwind CSS. Drag-drop workflow builder, card grid lists, animated execution timelines. ServiceKit brownfield compatibility.",
      },
      {
        phase: "Kotlin Backend",
        description:
          "25+ Controllers (Web + REST dual API), 12 Services, 20+ DAOs with JDBC Template. Role-based access, Google SSO + password auth, audit logging.",
      },
      {
        phase: "Database & CI/CD",
        description:
          "PostgreSQL with UUID keys, 49 Flyway migrations, soft-delete support. GitLab Auto-DevOps to 5 environments: Test, UAT, Pentest, Demo, Production.",
      },
    ],
    tags: ["Kotlin/Spring Boot", "Pebble", "PostgreSQL"],
    gradient: "from-blue-500 to-purple-600",
    image: "/assets/images/onboard-iq-hero.png",
  },
  {
    id: "rayni-platform",
    slug: "rayni-platform",
    title: "Rayni AI Document Intelligence Platform",
    category: ["AI/ML", "Full-Stack"],
    status: "live",
    description:
      "Designing trust in AI-powered scientific research. Created a document intelligence platform with split-screen citation verification, streaming responses, and gap detection flows that tell users exactly when to trust the AI.",
    metrics: [
      { value: "87.5%", label: "Usability Score" },
      { value: "<30s", label: "Time to Answer" },
      { value: "50+", label: "Components" },
    ],
    story: [
      {
        phase: "User Research",
        description:
          "12 contextual interviews with lab technicians revealed the core insight: users need to know exactly when to trust AI answers.",
      },
      {
        phase: "Design System",
        description:
          'Created "no borders needed" design language using color layering and elevation hierarchy across 50+ components.',
      },
      {
        phase: "Trust Patterns",
        description:
          "Split-screen citation verification, streaming responses with inline citations, and proactive gap detection.",
      },
      {
        phase: "Implementation",
        description:
          "Full-stack development: Next.js, Django, LangGraph agents with hybrid RAG architecture.",
      },
    ],
    tags: ["AI Product Design", "Design Systems", "Trust UX"],
    gradient: "from-violet-500 to-indigo-600",
    demoUrl: "https://rayni.ai",
    image: "/assets/images/rayni-hero.png",
  },
  {
    id: "doc-domain-agent",
    slug: "doc-domain-agent",
    title: "Doc Domain Agent - Zero-Hallucination AI",
    category: ["AI/ML", "Full-Stack"],
    status: "live",
    description:
      "Designing zero-hallucination AI for high-stakes decisions. Created BLUF response format, bounding-box citations, and gap detection flows that gracefully escalate rather than guess.",
    metrics: [
      { value: "<0.1%", label: "Hallucination Rate" },
      { value: "<30s", label: "Time to Answer" },
      { value: "100%", label: "Citation Accuracy" },
    ],
    story: [
      {
        phase: "Research",
        description:
          "Expert interviews revealed: users don't need perfect AI—they need to know exactly when it's uncertain.",
      },
      {
        phase: "BLUF Format",
        description:
          'Designed "Bottom Line Up Front" response structure: Verdict → Evidence → Fix → Safety Warnings.',
      },
      {
        phase: "Gap Detection",
        description:
          "3-layer confidence system triggers human-in-the-loop prompts before generating uncertain answers.",
      },
      {
        phase: "Verification",
        description:
          "Bounding box citations highlight exact text—not just page numbers—for instant verification.",
      },
    ],
    tags: ["AI Safety UX", "Trust Design", "Information Architecture"],
    gradient: "from-emerald-500 to-teal-600",
    image: "/assets/images/doc-domain-hero.png",
  },
  {
    id: "blue-moon-telehealth",
    slug: "blue-moon-telehealth",
    title: "Blue Moon Senior Counseling - Telehealth Platform",
    category: ["Full-Stack", "UI/UX"],
    status: "live",
    description:
      "Accessible telehealth design for geriatric therapy. Created a WCAG 2.1 AA compliant platform with 6-axis accessibility controls, enabling 100% unassisted session joins by seniors.",
    metrics: [
      { value: "100%", label: "Join Success Rate" },
      { value: "WCAG 2.1", label: "AA Compliant" },
      { value: "15min", label: "Saved/Session" },
    ],
    story: [
      {
        phase: "Research",
        description:
          "User testing with 8 seniors aged 68-84 revealed tech anxiety and specific accessibility barriers.",
      },
      {
        phase: "Visual Design",
        description:
          "Gold-on-dark theme exceeds AAA contrast. Three.js particle animation reduces pre-session anxiety.",
      },
      {
        phase: "Accessibility",
        description:
          "6-axis control: font size, contrast, motion, captions, blur, focus indicators—all user-adjustable.",
      },
      {
        phase: "Automation",
        description:
          "CPT billing code detection (90832/90834/90837) saves 15 minutes per session.",
      },
    ],
    tags: ["Accessibility", "Healthcare UX", "Senior Design"],
    gradient: "from-amber-500 to-orange-600",
    demoUrl: "https://bluemoonseniorcounseling.com",
    image: "/assets/images/blue-moon-hero.png",
  },
  {
    id: "ashley-furniture",
    slug: "ashley-furniture",
    title: "Ashley Furniture Financing Console",
    category: ["UI/UX", "Frontend"],
    description:
      "Redesigned in-store financing experience for sales associates. Led UX research with store managers to identify approval bottlenecks, then designed and built a streamlined console that increased approval rates.",
    metrics: [
      { value: "+12%", label: "Approval Rate" },
      { value: "18", label: "Store Pilot" },
      { value: "-40%", label: "App Time" },
    ],
    story: [
      {
        phase: "Research",
        description:
          "Conducted contextual inquiry at 5 retail locations, shadowing sales associates through financing workflows.",
      },
      {
        phase: "Design",
        description:
          "Created progressive disclosure UI reducing cognitive load - associates see only relevant fields per customer segment.",
      },
      {
        phase: "Development",
        description:
          "Vue.js components with real-time Synchrony Bank API integration and instant credit decisioning.",
      },
    ],
    tags: ["Retail", "Fintech", "Vue.js"],
    image: "/assets/images/ashley-hero.png",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: "aspen-dental",
    slug: "aspen-dental",
    title: "Aspen Dental Patient Financing Portal",
    category: ["UI/UX", "Frontend"],
    description:
      "Patient-facing financing portal deployed across 1,100+ dental clinics. Designed for anxious patients needing treatment financing - focused on clarity, trust signals, and instant decisioning.",
    metrics: [
      { value: "1,100+", label: "Clinics" },
      { value: "<30s", label: "Decision Time" },
      { value: "+15%", label: "Conversion" },
    ],
    story: [
      {
        phase: "UX Research",
        description:
          "Interviewed dental office managers to understand patient anxiety points around unexpected treatment costs.",
      },
      {
        phase: "UI Design",
        description:
          "Calming color palette, clear cost breakdowns, and trust badges. Mobile-first for tablet use at chairside.",
      },
      {
        phase: "Frontend",
        description:
          "React application with HIPAA-compliant form handling and multi-lender waterfall integration.",
      },
    ],
    tags: ["Healthcare", "Fintech", "React"],
    image: "/assets/images/aspen-hero.png",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: "dell-technologies",
    slug: "dell-technologies",
    title: "Dell Technologies Dell Pay Waterfall",
    category: ["Frontend", "Full-Stack"],
    description:
      "Integrated Bread Pay into Dell's existing checkout as a waterfall financing option. Built the frontend integration layer connecting Dell's e-commerce platform to multiple lender APIs.",
    metrics: [
      { value: "4", label: "Lender APIs" },
      { value: "99.9%", label: "Uptime" },
      { value: "+$2M", label: "Monthly Volume" },
    ],
    story: [
      {
        phase: "Architecture",
        description:
          "Designed waterfall logic: primary lender → secondary → tertiary, with graceful degradation and retry handling.",
      },
      {
        phase: "Integration",
        description:
          "Built adapter layer translating Dell checkout data to each lender's unique API schema requirements.",
      },
      {
        phase: "Performance",
        description:
          "Implemented response caching and parallel API calls to maintain sub-2-second checkout experience.",
      },
    ],
    tags: ["E-commerce", "API", "TypeScript"],
    image: "/assets/images/dell-hero.png",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: "helzberg-diamonds",
    slug: "helzberg-diamonds",
    title: "Helzberg Diamonds Digital Flex-Pay Kiosk",
    category: ["UI/UX", "Frontend"],
    description:
      "In-store kiosk enabling customers to self-serve financing applications. Reduced associate involvement while dramatically improving approval rates through optimized form flow.",
    metrics: [
      { value: "+28%", label: "Lease Approvals" },
      { value: "-57%", label: "App Time" },
      { value: "200+", label: "Stores" },
    ],
    story: [
      {
        phase: "Problem",
        description:
          "Associates struggled explaining lease-to-own options. Customers abandoned due to complexity and stigma.",
      },
      {
        phase: "Solution",
        description:
          "Self-service kiosk with jewelry-appropriate luxury aesthetic. Private, judgment-free financing exploration.",
      },
      {
        phase: "Implementation",
        description:
          "Touch-optimized Vue.js app with large tap targets, progress indicators, and instant pre-qualification.",
      },
    ],
    tags: ["Retail", "Fintech", "Kiosk"],
    image: "/assets/images/helzberg-hero.png",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: "ifit-health",
    slug: "ifit-health",
    title: "iFit Health Spend Checkout",
    category: ["UI/UX", "Frontend"],
    description:
      "Added HSA/FSA payment option to iFit's direct-to-consumer checkout. Positioned fitness equipment as health expense, opening new customer segment.",
    metrics: [
      { value: "8%", label: "DTC Revenue" },
      { value: "New", label: "Customer Segment" },
      { value: "Instant", label: "Card Validation" },
    ],
    story: [
      {
        phase: "Opportunity",
        description:
          "Identified that fitness equipment qualifies for HSA/FSA spending - untapped market for iFit's premium products.",
      },
      {
        phase: "UX Design",
        description:
          "Clear eligibility messaging, HSA/FSA card detection, and itemized receipts for reimbursement claims.",
      },
      {
        phase: "Integration",
        description:
          "Health Spend API integration with real-time card BIN validation and automatic receipt generation.",
      },
    ],
    tags: ["Health & Wellness", "Fintech", "E-commerce"],
    image: "/assets/images/ifit-hero.png",
    gradient: "from-orange-500 to-red-600",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProject(): Project | undefined {
  return projects.find((p) => p.featured);
}

export function getRegularProjects(): Project[] {
  return projects.filter((p) => !p.featured);
}
