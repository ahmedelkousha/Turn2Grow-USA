import {
  Stethoscope, Video, Receipt, Users, Smartphone, Boxes,
  BrainCircuit, Cog, BarChart3, ShieldCheck, Cloud, Compass,
  type LucideIcon,
} from "lucide-react";

export type ServiceDomain = "Healthcare" | "AI & Data" | "Cloud & DevOps" | "Custom Software";

export type Service = {
  slug: string;
  icon: LucideIcon;
  title: string;
  short: string;
  hero: string;
  overview: string;
  imageUrl?: string;
  outcomes: string[];
  features: { title: string; description: string }[];
  process: { step: string; title: string; description: string }[];
  faq: { q: string; a: string }[];
};

// Curated, high-quality Unsplash imagery per service.
export const serviceImages: Record<string, string> = {
  "ehr-healthcare-software": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=80",
  "telemedicine-platforms": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
  "medical-billing-systems": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80",
  "ai-machine-learning-integration": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80",
  "data-analytics-dashboards": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
  "business-process-automation": "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1600&q=80",
  "cloud-infrastructure": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
  "cybersecurity-compliance": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80",
  "digital-transformation-consulting": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
  "custom-web-mobile-applications": "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1600&q=80",
  "saas-product-development": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80",
  "crm-development-automation": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
};

export const serviceDomainMap: Record<string, ServiceDomain> = {
  "ehr-healthcare-software": "Healthcare",
  "telemedicine-platforms": "Healthcare",
  "medical-billing-systems": "Healthcare",
  "ai-machine-learning-integration": "AI & Data",
  "data-analytics-dashboards": "AI & Data",
  "business-process-automation": "AI & Data",
  "cloud-infrastructure": "Cloud & DevOps",
  "cybersecurity-compliance": "Cloud & DevOps",
  "digital-transformation-consulting": "Cloud & DevOps",
  "custom-web-mobile-applications": "Custom Software",
  "saas-product-development": "Custom Software",
  "crm-development-automation": "Custom Software",
};

export const serviceDomains: { domain: ServiceDomain; tagline: string }[] = [
  { domain: "Healthcare", tagline: "Specialty-tuned platforms for clinical operations, virtual care, and revenue cycle." },
  { domain: "AI & Data", tagline: "Intelligence and analytics layered on top of your existing systems." },
  { domain: "Cloud & DevOps", tagline: "Resilient infrastructure, security, and the roadmap to get you there." },
  { domain: "Custom Software", tagline: "Bespoke SaaS, CRM, web, and mobile products built around your business." },
];

export function servicesGroupedByDomain(): { domain: ServiceDomain; tagline: string; services: Service[] }[] {
  return serviceDomains.map((d) => ({
    ...d,
    services: services.filter((s) => serviceDomainMap[s.slug] === d.domain),
  }));
}


const servicesData: Service[] = [
  {
    slug: "ehr-healthcare-software",
    icon: Stethoscope,
    title: "EHR & Healthcare Software",
    short: "Streamlined electronic health records built around clinical workflows.",
    hero: "Electronic health records that clinicians actually want to use.",
    overview:
      "We design and build HIPAA-ready EHR platforms tailored to the specialties you serve — from primary care to behavioral health to multi-site specialty groups. Our systems reduce chart time, surface the right data at the right moment, and integrate cleanly with the labs, devices, and payers you already work with.",
    outcomes: [
      "30–50% reduction in average charting time",
      "Single longitudinal patient record across departments",
      "Faster onboarding for new clinicians and staff",
      "Audit-ready compliance documentation",
    ],
    features: [
      { title: "Specialty-aware templates", description: "SOAP, H&P and visit templates engineered for your specialty, with smart phrases and structured data capture." },
      { title: "HL7 / FHIR interoperability", description: "Plug into labs, imaging, pharmacy, HIE networks and downstream analytics without brittle custom feeds." },
      { title: "ePrescribing & decision support", description: "EPCS-ready prescribing with drug-drug, drug-allergy and dose-range checks built in." },
      { title: "Patient portal & mobile", description: "Self-service scheduling, intake, messaging and document upload — branded for your practice." },
    ],
    process: [
      { step: "01", title: "Clinical discovery", description: "Shadow real workflows; map pain points, regulatory needs and integration surface." },
      { step: "02", title: "Design & validate", description: "Prototype core flows with the clinicians who'll actually use them." },
      { step: "03", title: "Build & integrate", description: "Iterative delivery against your specialty's must-haves and your payer mix." },
      { step: "04", title: "Train & optimize", description: "Go-live support, KPI tracking, and ongoing refinement post-launch." },
    ],
    faq: [
      { q: "Are your EHR builds HIPAA compliant?", a: "Yes — encryption in transit and at rest, role-based access, full audit logging, and documented BAAs with infrastructure providers." },
      { q: "Can you migrate us off an existing EHR?", a: "We've executed migrations from Epic, Athena, eClinicalWorks, Practice Fusion and many in-house systems with verified data fidelity." },
    ],
  },
  {
    slug: "telemedicine-platforms",
    icon: Video,
    title: "Telemedicine Platforms",
    short: "Secure, scalable virtual care for modern healthcare providers.",
    hero: "Virtual care that feels as good as the in-person visit.",
    overview:
      "We build telemedicine platforms that handle real clinical volume — low-latency video, smart waiting rooms, e-consents, integrated documentation, and payer-ready encounter capture. Whether you need a white-labeled patient app or a full multi-tenant virtual care network, we ship reliably.",
    outcomes: [
      "Sub-1s connect times on consumer broadband",
      "Drop-off rates below 3% per encounter",
      "Native EHR write-back of encounter notes",
      "End-to-end encrypted media streams",
    ],
    features: [
      { title: "HIPAA-grade WebRTC", description: "Encrypted media with adaptive bitrate, network resilience and one-tap rejoin." },
      { title: "Integrated clinical workflow", description: "Pre-visit intake, vitals capture, e-prescribing and post-visit summaries — all in one flow." },
      { title: "Group, async and on-demand", description: "1:1 scheduled visits, group therapy, store-and-forward consults, and on-demand triage from the same platform." },
      { title: "Insurance & self-pay ready", description: "Eligibility checks, copay capture and claim-ready encounter exports." },
    ],
    process: [
      { step: "01", title: "Care model design", description: "Define the patient journey, payer requirements and clinician staffing model." },
      { step: "02", title: "Platform architecture", description: "Pick the right stack for your scale — from boutique clinic to nationwide network." },
      { step: "03", title: "Pilot & harden", description: "Launch with a controlled cohort, instrument heavily, then scale." },
      { step: "04", title: "Operate & evolve", description: "24/7 monitoring and a quarterly roadmap that follows your patient outcomes." },
    ],
    faq: [
      { q: "Do you support state-by-state licensure rules?", a: "Yes. We model provider licensure, supervision and prescribing rules per state and enforce them in routing logic." },
      { q: "Can we white-label the patient app?", a: "Absolutely — your brand, your domain, iOS and Android stores under your developer accounts." },
    ],
  },
  {
    slug: "medical-billing-systems",
    icon: Receipt,
    title: "Medical Billing Systems",
    short: "Automated billing that reduces errors and accelerates reimbursements.",
    hero: "Get paid faster — with fewer denials and less manual work.",
    overview:
      "Our medical billing systems turn clinical encounters into clean claims automatically. We combine rules engines, clearinghouse integrations and denial-prediction models to compress your revenue cycle and recover dollars you're currently leaving on the table.",
    outcomes: [
      "First-pass claim acceptance above 95%",
      "Days-in-A/R cut by 25–40%",
      "Real-time denial root-cause analytics",
      "Automated patient statements and payment plans",
    ],
    features: [
      { title: "Charge capture automation", description: "Map encounter data directly to CPT, ICD-10 and HCPCS with built-in coder review." },
      { title: "Clearinghouse + payer integrations", description: "Direct connections to Availity, Change Healthcare and major payers for eligibility, claims and ERA." },
      { title: "Denial intelligence", description: "ML-driven flagging of likely-deniable claims before submission, with fix suggestions." },
      { title: "Patient financial experience", description: "Modern statements, text-to-pay, payment plans and financial counseling tools." },
    ],
    process: [
      { step: "01", title: "RCM audit", description: "Map every step of your current revenue cycle and quantify leakage." },
      { step: "02", title: "Rules & integrations", description: "Configure payer rules, clearinghouse connections and EHR data feeds." },
      { step: "03", title: "Parallel run", description: "Run alongside your existing system to prove uplift before cutover." },
      { step: "04", title: "Optimize continuously", description: "Monthly performance reviews against industry benchmarks." },
    ],
    faq: [
      { q: "Do you work with our existing EHR?", a: "Yes — we integrate with most modern and legacy EHRs via HL7, FHIR or direct database feeds." },
      { q: "Can you handle multi-state, multi-specialty practices?", a: "Yes. We model payer mix, fee schedules and credentialing per location and per provider." },
    ],
  },
  {
    slug: "crm-development-automation",
    icon: Users,
    title: "CRM Development & Automation",
    short: "Custom CRMs that nurture leads, retain clients, and grow revenue.",
    hero: "A CRM that fits the way you actually sell.",
    overview:
      "Off-the-shelf CRMs force you into someone else's process. We build custom CRMs and automation layers that mirror how your team actually wins — capturing the signals that matter, automating the busywork, and giving leadership the pipeline truth they need.",
    outcomes: [
      "Sales cycle reduced by 20–35%",
      "Lead-to-customer conversion lifted significantly",
      "Single source of truth across sales, success and support",
      "Automated handoffs between teams",
    ],
    features: [
      { title: "Pipeline that mirrors your sale", description: "Custom stages, qualification criteria and forecasting tuned to your motion." },
      { title: "Smart automations", description: "Lead routing, nurture sequences, task creation and follow-up reminders triggered by real behavior." },
      { title: "Unified customer record", description: "Pull together marketing, product, billing and support data per account." },
      { title: "Forecasting & analytics", description: "Boardroom-ready dashboards on pipeline health, rep performance and revenue projections." },
    ],
    process: [
      { step: "01", title: "Process mapping", description: "Document your real sales motion, not the idealized one." },
      { step: "02", title: "Data model & integrations", description: "Design the schema, then wire in your stack — email, calendar, marketing, billing." },
      { step: "03", title: "Build & roll out", description: "Iterative releases with rep-level training and feedback loops." },
      { step: "04", title: "Automate & expand", description: "Layer in automations as adoption matures." },
    ],
    faq: [
      { q: "Why custom vs. Salesforce or HubSpot?", a: "When your process is genuinely differentiated — or when license costs at scale outweigh build costs — custom wins on fit and ROI." },
      { q: "Can you integrate with our existing tools?", a: "Yes — Slack, Gmail, Outlook, Stripe, QuickBooks, Marketo, Segment and just about anything with an API." },
    ],
  },
  {
    slug: "custom-web-mobile-applications",
    icon: Smartphone,
    title: "Custom Web & Mobile Applications",
    short: "Pixel-perfect, high-performance apps for any platform.",
    hero: "Software that's a pleasure to use and a pleasure to operate.",
    overview:
      "From customer-facing mobile apps to internal operations platforms, we build software that's fast, accessible, and built for the long term. Modern stacks, sensible architecture, and design that respects the people who use it.",
    outcomes: [
      "Lighthouse scores in the 90s out of the box",
      "Native-feeling experiences on iOS, Android and web",
      "Production-grade observability from day one",
      "Codebases your in-house team can actually own",
    ],
    features: [
      { title: "Modern web stacks", description: "React, Next.js, TanStack Start, Node, Python — chosen for fit, not fashion." },
      { title: "Native & cross-platform mobile", description: "Swift, Kotlin and React Native — we pick what's right for your roadmap and team." },
      { title: "Design systems", description: "Component libraries and tokens that scale across products and survive team changes." },
      { title: "Performance & accessibility", description: "WCAG AA, sub-second TTI, and observability baked in." },
    ],
    process: [
      { step: "01", title: "Discovery", description: "Define the job-to-be-done, the success metrics, and the constraints." },
      { step: "02", title: "Design", description: "Prototype the critical paths and test with real users." },
      { step: "03", title: "Build", description: "Two-week sprints, demo every Friday, course-correct continuously." },
      { step: "04", title: "Launch & support", description: "Phased rollout, runbooks, and ongoing partnership." },
    ],
    faq: [
      { q: "Do you do design too?", a: "Yes — product strategy, UX research, visual design and engineering are on one team." },
      { q: "Can we own the code?", a: "Always. You own the repo, the infrastructure and the IP from day one." },
    ],
  },
  {
    slug: "saas-product-development",
    icon: Boxes,
    title: "SaaS Product Development",
    short: "End-to-end SaaS builds from MVP to market-ready product.",
    hero: "From whiteboard idea to revenue-generating SaaS.",
    overview:
      "We're a true product partner for founders and product teams — handling everything from market validation and MVP design through scale-up engineering, billing, and growth instrumentation. We've shipped SaaS products in healthcare, fintech, logistics and B2B ops.",
    outcomes: [
      "MVP in market in 8–12 weeks",
      "Subscription billing, trials and dunning ready on day one",
      "Multi-tenant, role-based architecture",
      "Growth analytics and experimentation built in",
    ],
    features: [
      { title: "Multi-tenant architecture", description: "Per-tenant isolation, fair-share resource allocation, and tenant-level customization." },
      { title: "Billing & monetization", description: "Stripe, Paddle and custom billing — trials, seats, usage, and revenue recovery." },
      { title: "Auth, roles & SSO", description: "From email-and-password to SAML, SCIM and enterprise-grade access controls." },
      { title: "Growth instrumentation", description: "Event pipelines, funnels, cohort analysis, and A/B testing wired in from the start." },
    ],
    process: [
      { step: "01", title: "Validate", description: "Pressure-test the wedge and the willingness to pay." },
      { step: "02", title: "MVP", description: "Ship the minimum lovable product to your first ten customers." },
      { step: "03", title: "Scale", description: "Harden, instrument and grow — from PMF to repeatable revenue." },
      { step: "04", title: "Enterprise-ready", description: "SSO, audit logs, SOC 2 readiness, and the deals that come with them." },
    ],
    faq: [
      { q: "Can you act as our fractional engineering team?", a: "Yes — many of our SaaS partnerships start as the entire engineering org until you hire in-house." },
      { q: "How do you handle compliance?", a: "Architecture, controls and documentation for HIPAA, SOC 2 and GDPR as required." },
    ],
  },
  {
    slug: "ai-machine-learning-integration",
    icon: BrainCircuit,
    title: "AI & Machine Learning Integration",
    short: "Intelligent automation and predictive tools built into your stack.",
    hero: "AI that earns its keep — measured by outcomes, not buzzwords.",
    overview:
      "We integrate large language models, classical ML and computer vision into the products and workflows where they create real economic value: clinical documentation, claim adjudication, lead scoring, demand forecasting, customer support, and more. Always with humans in the loop where it matters.",
    outcomes: [
      "Documented ROI per AI workflow",
      "Production guardrails, evals and observability",
      "Privacy-preserving by design",
      "Models you can swap as the landscape evolves",
    ],
    features: [
      { title: "LLM applications", description: "RAG, agents, structured extraction, and conversation systems on the model of your choice." },
      { title: "Predictive ML", description: "Forecasting, classification, ranking and anomaly detection on your own data." },
      { title: "MLOps", description: "Versioned datasets, reproducible pipelines, model evaluation and drift monitoring." },
      { title: "Responsible AI", description: "PII redaction, prompt injection defenses, audit logs and policy controls." },
    ],
    process: [
      { step: "01", title: "Identify high-ROI use case", description: "We won't deploy AI for AI's sake — we hunt the workflows where it actually pays back." },
      { step: "02", title: "Prototype & evaluate", description: "Ship a measurable prototype against held-out evals." },
      { step: "03", title: "Productionize", description: "Guardrails, monitoring, fallback behavior and cost controls." },
      { step: "04", title: "Compound", description: "Layer additional intelligent workflows on the same data foundation." },
    ],
    faq: [
      { q: "Do you train custom models?", a: "When the data and the use case justify it — yes. Often, fine-tuning or RAG on a frontier model is the better answer." },
      { q: "How do you handle PHI in AI workflows?", a: "On-prem or VPC-isolated inference, BAA-covered providers, and strict redaction pipelines." },
    ],
  },
  {
    slug: "business-process-automation",
    icon: Cog,
    title: "Business Process Automation",
    short: "Eliminate repetitive tasks and unlock operational efficiency.",
    hero: "Give your team back the hours they're losing to busywork.",
    overview:
      "We audit, redesign and automate the back-office workflows that quietly eat your operating budget — onboarding, billing, reconciliation, reporting, compliance. The result: faster cycle times, fewer errors, and people freed up to do the work only humans can do.",
    outcomes: [
      "60–80% reduction in manual task time",
      "Error rates measured in basis points",
      "Real-time SLA tracking on every workflow",
      "Auditable trail for every automated action",
    ],
    features: [
      { title: "Workflow modeling", description: "Visual orchestration of multi-step, multi-system processes with retry and escalation logic." },
      { title: "Document intelligence", description: "Extract structured data from PDFs, scans, faxes and email with AI-assisted review." },
      { title: "System-to-system integration", description: "Connect ERPs, CRMs, accounting, EHRs, payroll and bespoke databases." },
      { title: "Human-in-the-loop", description: "Approval queues, exception handling and audit-friendly overrides where they belong." },
    ],
    process: [
      { step: "01", title: "Process discovery", description: "Map current state with time-and-motion data, not assumptions." },
      { step: "02", title: "Redesign", description: "Eliminate, simplify, then automate — in that order." },
      { step: "03", title: "Build & deploy", description: "Phased rollout with parallel running and rollback paths." },
      { step: "04", title: "Measure & expand", description: "Quantify savings, then move to the next workflow." },
    ],
    faq: [
      { q: "Is this RPA?", a: "Sometimes. We use the right tool — code, RPA, AI agents or API integrations — depending on the workflow." },
      { q: "How do you measure ROI?", a: "Baseline hours and error rates before, instrument after, and report monthly." },
    ],
  },
  {
    slug: "data-analytics-dashboards",
    icon: BarChart3,
    title: "Data Analytics & Dashboards",
    short: "Real-time insights that drive smarter decisions.",
    hero: "Stop arguing about the numbers. Start acting on them.",
    overview:
      "We build the data foundation — warehouse, models, governance — and the analytics surface — dashboards, alerts, embedded analytics — that turn raw operational data into a daily decision-making tool for every level of your business.",
    outcomes: [
      "Single source of truth across the business",
      "Real-time operational dashboards",
      "Self-service analytics for non-technical teams",
      "Embedded analytics inside your own products",
    ],
    features: [
      { title: "Modern data stack", description: "Snowflake, BigQuery, Postgres, dbt and the right orchestration for your scale." },
      { title: "Semantic layer", description: "Metrics defined once, used everywhere — so revenue means the same thing in every dashboard." },
      { title: "Executive & operational dashboards", description: "From boardroom KPIs to real-time ops command centers." },
      { title: "Embedded analytics", description: "Ship analytics inside your own SaaS product to your customers." },
    ],
    process: [
      { step: "01", title: "Question map", description: "What decisions are you trying to make? Work backwards from there." },
      { step: "02", title: "Pipeline & model", description: "Ingest, model, and govern the data that powers those decisions." },
      { step: "03", title: "Surface", description: "Dashboards, alerts and embedded views tuned to each audience." },
      { step: "04", title: "Activate", description: "Reverse-ETL and triggered workflows so insights drive action automatically." },
    ],
    faq: [
      { q: "We have data scattered everywhere — where do we start?", a: "An inventory and a question-led roadmap. We don't move data we don't need." },
      { q: "Do you use Power BI, Tableau, Looker, or build custom?", a: "All of the above — chosen by your team, audience and licensing economics." },
    ],
  },
  {
    slug: "cybersecurity-compliance",
    icon: ShieldCheck,
    title: "Cybersecurity & Compliance",
    short: "HIPAA-ready, secure-by-design solutions you can trust.",
    hero: "Security and compliance designed in, not bolted on.",
    overview:
      "We bake HIPAA, SOC 2, PCI and GDPR controls into our architecture by default — and we help existing platforms remediate where they fall short. Pen testing, threat modeling, IAM, encryption, audit logging and policy: handled.",
    outcomes: [
      "Audit-ready evidence collection on autopilot",
      "Reduced attack surface and blast radius",
      "Documented incident response runbooks",
      "Sleep-at-night posture for executives and boards",
    ],
    features: [
      { title: "Threat modeling", description: "STRIDE-based assessments tied to your actual architecture and data flows." },
      { title: "IAM & zero trust", description: "Granular roles, least-privilege defaults, MFA everywhere, and continuous verification." },
      { title: "Encryption everywhere", description: "TLS in transit, KMS-managed encryption at rest, field-level encryption for sensitive data." },
      { title: "Compliance enablement", description: "HIPAA, SOC 2, PCI DSS, GDPR — controls, documentation and audit support." },
    ],
    process: [
      { step: "01", title: "Assess", description: "Baseline current posture with code review, pen testing and policy audit." },
      { step: "02", title: "Remediate", description: "Prioritized fix list with engineering effort attached to each item." },
      { step: "03", title: "Certify", description: "Evidence, documentation and auditor liaison for your target framework." },
      { step: "04", title: "Maintain", description: "Continuous monitoring, quarterly reviews and incident drills." },
    ],
    faq: [
      { q: "Can you get us SOC 2 ready?", a: "Yes — we'll prepare you for Type I and Type II, working with the auditor of your choice." },
      { q: "Do you do penetration testing?", a: "Yes — and we'll fix what we find." },
    ],
  },
  {
    slug: "cloud-infrastructure",
    icon: Cloud,
    title: "Cloud Infrastructure",
    short: "Scalable, reliable cloud architecture built for growth.",
    hero: "Cloud that scales when you scale — and costs less when you don't.",
    overview:
      "AWS, Azure, GCP — we design, deploy and operate cloud infrastructure that's resilient under load, sane on cost, and a joy for your engineers to work with. Infrastructure as code, CI/CD, observability and incident response baked in.",
    outcomes: [
      "99.95%+ uptime SLAs in production",
      "20–50% cloud spend reduction on audits",
      "Push-button environments per branch",
      "Mean time to recovery measured in minutes",
    ],
    features: [
      { title: "Infrastructure as code", description: "Terraform, Pulumi or CDK — every environment reproducible and reviewable." },
      { title: "CI/CD", description: "Fast, safe deploys with progressive rollout, canaries and instant rollback." },
      { title: "Observability", description: "Logs, metrics, traces and SLOs unified into actionable signal." },
      { title: "FinOps", description: "Visibility, anomaly detection and structural cost optimization across your cloud bill." },
    ],
    process: [
      { step: "01", title: "Assess", description: "Architecture review, cost audit and reliability baseline." },
      { step: "02", title: "Design", description: "Target architecture aligned to load, compliance and budget." },
      { step: "03", title: "Migrate / build", description: "Incremental migration or greenfield build with zero-downtime cutovers." },
      { step: "04", title: "Operate", description: "On-call rotations, runbooks and a quarterly reliability review." },
    ],
    faq: [
      { q: "Which cloud do you recommend?", a: "The one your team can operate well. We're cloud-agnostic and pragmatic." },
      { q: "Can you help us cut our AWS bill?", a: "Almost always — savings of 20–50% are common once we audit." },
    ],
  },
  {
    slug: "digital-transformation-consulting",
    icon: Compass,
    title: "Digital Transformation Consulting",
    short: "Roadmap, strategy, and execution from a team that delivers.",
    hero: "Strategy that ships — not slideware that sits.",
    overview:
      "Most transformation programs fail because the strategy team doesn't own delivery. We're different — we set the strategy, then we build it with you. Roadmap, vendor decisions, capability building and the actual product work, under one accountable team.",
    outcomes: [
      "Clear, sequenced roadmap tied to business outcomes",
      "Build-vs-buy decisions grounded in real economics",
      "Capability uplift in your in-house team",
      "Quarterly outcomes, not annual promises",
    ],
    features: [
      { title: "Strategy & roadmap", description: "Outcome-led roadmap with sequencing, dependencies and investment cases." },
      { title: "Architecture & vendor strategy", description: "Reference architectures and unbiased vendor evaluation." },
      { title: "Org & operating model", description: "Team topology, governance and ways of working that actually work." },
      { title: "Hands-on execution", description: "We build alongside your team, not in a parallel universe." },
    ],
    process: [
      { step: "01", title: "Diagnose", description: "Understand the business strategy, the constraints and the real pain points." },
      { step: "02", title: "Design the roadmap", description: "Sequence initiatives by value, dependency and feasibility." },
      { step: "03", title: "Execute", description: "Deliver the first wave alongside your team and prove the model." },
      { step: "04", title: "Sustain", description: "Transfer capability so you can keep going without us." },
    ],
    faq: [
      { q: "Do you only do strategy or also build?", a: "Both. The strategy team and the delivery team are one team here." },
      { q: "How long is a typical engagement?", a: "Three to twelve months for the first wave, often longer as a retained partner." },
    ],
  },
];

export const services: Service[] = servicesData.map((s) => ({
  ...s,
  imageUrl: s.imageUrl ?? serviceImages[s.slug],
}));

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  title: string;
  summary: string;
  challenge: string;
  solution: string;
  results: { metric: string; label: string }[];
  services: string[];
  duration: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "regional-cardiology-ehr-modernization",
    client: "Mid-Atlantic Cardiology Group",
    industry: "Healthcare",
    title: "Modernizing EHR for a 12-clinic cardiology group",
    summary: "Replacing a legacy EHR with a specialty-tuned platform — cutting chart time in half and lifting collections.",
    challenge:
      "A 12-clinic cardiology group was losing two hours of clinician time per day to a generic EHR that didn't understand cardiology workflows. Documentation was inconsistent, billing was leaking revenue, and a planned expansion was on hold because the system couldn't scale.",
    solution:
      "We rebuilt their core clinical platform around cardiology-specific templates, integrated directly with their echo and stress-test devices, and re-engineered the billing path against a Change Healthcare clearinghouse integration. The new platform went live across all 12 clinics in a phased eight-month rollout.",
    results: [
      { metric: "51%", label: "Reduction in average chart time" },
      { metric: "+17%", label: "Increase in first-pass claim acceptance" },
      { metric: "$4.2M", label: "Recovered annual revenue" },
      { metric: "12 → 18", label: "Clinics now supported on the platform" },
    ],
    services: ["EHR & Healthcare Software", "Medical Billing Systems", "Cloud Infrastructure"],
    duration: "11 months",
  },
  {
    slug: "behavioral-health-telemedicine-network",
    client: "National Behavioral Health Network",
    industry: "Healthcare",
    title: "Scaling a behavioral health telemedicine network to 40 states",
    summary: "From a single-state pilot to a nationwide virtual care platform serving 200,000+ patients.",
    challenge:
      "A behavioral health provider had a working single-state telehealth pilot but couldn't scale it. Licensure routing, payer rules, group therapy and crisis escalation all had to work across 40 states with a clinician network that was growing 30% per quarter.",
    solution:
      "We rebuilt the platform on a multi-tenant architecture with state-aware licensure and prescribing rules, native group therapy, a 24/7 crisis escalation queue, and full EHR write-back. Onboarding for new clinicians dropped from days to under an hour.",
    results: [
      { metric: "40", label: "States covered at launch" },
      { metric: "200K+", label: "Patients served annually" },
      { metric: "<1s", label: "Median session connect time" },
      { metric: "2.4%", label: "Encounter drop-off rate" },
    ],
    services: ["Telemedicine Platforms", "Cybersecurity & Compliance", "Cloud Infrastructure"],
    duration: "9 months",
  },
  {
    slug: "logistics-saas-mvp-to-series-a",
    client: "FreightOps (stealth-mode SaaS)",
    industry: "Logistics SaaS",
    title: "From whiteboard to Series A in 14 months",
    summary: "Building a logistics SaaS MVP that closed enterprise pilots and unlocked institutional funding.",
    challenge:
      "Two ex-logistics executives had a sharp thesis but no engineering team and no product. They needed to land design-partner pilots with mid-market carriers within six months to keep their seed round alive.",
    solution:
      "We acted as the full product and engineering team — design, architecture, build and SRE. Shipped the MVP to first design partners in 10 weeks, layered in billing, SSO and analytics, and built the demo environment that closed their Series A.",
    results: [
      { metric: "10 wks", label: "MVP to first paying pilot" },
      { metric: "6", label: "Enterprise design partners signed" },
      { metric: "$11M", label: "Series A raised on the platform we built" },
      { metric: "8 → 24", label: "Engineers transitioned in-house post-raise" },
    ],
    services: ["SaaS Product Development", "Custom Web & Mobile Applications", "Data Analytics & Dashboards"],
    duration: "14 months",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  imageUrl?: string;
  content: { heading?: string; body: string }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "what-modern-ehr-should-actually-feel-like",
    title: "What a modern EHR should actually feel like in 2026",
    excerpt: "The reason clinicians hate their EHR isn't software fatigue — it's that most EHRs were never designed for the work. Here's what changes when you start from the workflow.",
    category: "Healthcare",
    date: "May 12, 2026",
    readTime: "8 min read",
    author: "Turn2Grow Editorial",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
    content: [
      { body: "If you ask a hundred physicians what they think of their EHR, ninety will say some version of \"it's the worst part of my day.\" That isn't a software taste preference. It's a signal that the tools clinicians use to deliver care are not designed for the way care is delivered." },
      { heading: "The original sin: billing-first design", body: "Most legacy EHRs were architected primarily to capture billable encounters, not to support clinical reasoning. Everything else — documentation, orders, results review — got bolted on around the charge capture core. The result is a system that asks clinicians to navigate billing logic to do clinical work." },
      { heading: "What changes when you flip it", body: "When we redesign EHR workflows around the clinician's actual decision sequence, three things happen. First, charting time drops — usually 30–50%. Second, data quality goes up, because clinicians are entering data where it's relevant to them, not where the biller needs it. Third, satisfaction recovers. We've watched physicians genuinely enjoy charting again for the first time in a decade." },
      { heading: "The four moves that matter", body: "Specialty-aware templates with smart defaults. Single-screen visit views that minimize navigation. Voice-assisted and ambient documentation where appropriate. And — critically — automated charge capture that runs invisibly off the clinical note instead of forcing the clinician to think about codes." },
      { heading: "It's not about AI scribes alone", body: "Ambient AI scribes are genuinely useful, but they're a layer on top of a good workflow — not a substitute for one. The teams getting the biggest wins are pairing ambient documentation with workflow redesign, not just dropping a scribe into the same broken process." },
    ],
  },
  {
    slug: "soc-2-without-the-suffering",
    title: "SOC 2 without the suffering: how SMEs get audit-ready in 90 days",
    excerpt: "SOC 2 doesn't have to mean a year of pain and a six-figure consulting bill. Here's the playbook we use to get SaaS teams ready in a quarter.",
    category: "Security",
    date: "April 28, 2026",
    readTime: "6 min read",
    author: "Turn2Grow Editorial",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1600&q=80",
    content: [
      { body: "Every founder we work with hits the same wall around their Series A or first big enterprise deal: \"the prospect is asking for SOC 2.\" Cue panic. It doesn't have to be that way." },
      { heading: "Two truths about SOC 2", body: "First: SOC 2 is mostly about evidence, not engineering. Most teams already do 70% of what SOC 2 asks; they just don't document it. Second: the controls you actually need to add are good engineering hygiene anyway — MFA, least-privilege access, encrypted backups, change management." },
      { heading: "The 90-day plan", body: "Weeks 1–2: scope and gap analysis. Weeks 3–6: implement the missing controls — usually IAM hardening, logging, vulnerability scanning, vendor management. Weeks 7–10: instrument evidence collection so it runs continuously. Weeks 11–12: dry-run with your auditor and lock in the Type I." },
      { heading: "Where teams waste time", body: "Writing policies before you have controls. Picking a GRC tool before you know what you're tracking. And, most expensively, treating SOC 2 as a project to be done once instead of a posture to be maintained. The teams that breeze through Type II are the ones who automated evidence from day one." },
    ],
  },
  {
    slug: "ai-in-revenue-cycle-management",
    title: "AI in revenue cycle: where it actually moves the needle",
    excerpt: "We've shipped AI into half a dozen RCM workflows. Some changed everything; others were theater. Here's what we learned about where ML pays off.",
    category: "AI & Automation",
    date: "April 14, 2026",
    readTime: "7 min read",
    author: "Turn2Grow Editorial",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    content: [
      { body: "Everyone in healthcare RCM is talking about AI. Most of what gets shipped is, frankly, a chatbot bolted to a workflow that needed redesign first. But there are a handful of places where ML genuinely transforms revenue cycle economics — and we've now lived through enough of these projects to be specific." },
      { heading: "Where AI wins", body: "Denial prediction is the standout. A reasonably trained model on your own historical claims data will identify the 5–10% of claims most likely to deny — before they go out. Fix those, and first-pass acceptance jumps measurably. Coding assistance is the second: LLMs that suggest codes based on the clinical note save coders enormous time on routine encounters." },
      { heading: "Where AI underperforms", body: "Patient communication chatbots. Eligibility checks that already have deterministic APIs. \"AI-powered\" analytics dashboards that are really just rules engines. If a problem has a structured-data answer, you don't need an LLM — you need an integration." },
      { heading: "How to evaluate vendors", body: "Ask for held-out test results on data they haven't seen. Ask what happens when the model is wrong. Ask how they handle PHI. Vendors who can't answer those three questions clearly are not ready for your production environment." },
    ],
  },
  {
    slug: "build-vs-buy-the-honest-framework",
    title: "Build vs. buy: the honest framework we use with clients",
    excerpt: "Vendor pitches will tell you to buy. Engineers will tell you to build. Here's a framework that actually leads to the right answer.",
    category: "Strategy",
    date: "March 30, 2026",
    readTime: "5 min read",
    author: "Turn2Grow Editorial",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
    content: [
      { body: "We're a build firm. So when we tell a client to buy instead, they tend to take it seriously. The honest answer is that most workflows are not differentiated enough to justify building, and most platforms are not flexible enough to justify buying. Here's how we sort it out." },
      { heading: "Three questions", body: "First: is this workflow how you make money, or just how you support making money? Build the former, buy the latter. Second: how unusual is your version of this workflow compared to the market? Highly unusual workflows fit poorly in off-the-shelf tools. Third: what is the five-year total cost of ownership in each scenario, including the engineering opportunity cost of building?" },
      { heading: "The hybrid almost always wins", body: "In practice, the right answer is usually \"buy the platform, build the integration and the workflow layer on top.\" Buy the EHR engine; build the specialty workflow. Buy the CRM data layer; build the automations that actually run your sales motion. Buy the cloud primitives; build the product that uses them." },
    ],
  },
];
