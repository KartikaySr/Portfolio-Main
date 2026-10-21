export type Palette = { from: string; via: string; to: string; accent: string };

export const profile = {
  fullName: 'Kartikay Srivastava',
  displayName: 'Kartikay Srivastava',
  firstName: 'KARTIKAY',
  seriesTag: 'THE ENGINEERING CUT',
  originalLabel: 'A KARTIKAY ORIGINAL',
  role: 'Software Engineer · AI & ML',
  tagline: ['Full-stack engineering', 'Backend systems', 'Applied AI'],
  intro:
    'Computer Science undergraduate specializing in AI & ML, building full-stack products, backend services, and data-driven systems. I work across Python, TypeScript, React, Node.js, PostgreSQL, and LLM-powered applications.',
  location: 'Jaipur, India',
  email: 'kartikaymg57@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/kartikaysr/',
    github: 'https://github.com/KartikaySr',
    leetcode: 'https://leetcode.com/u/calipercarousel/',
    x: 'https://x.com/kartikay_sriv',
    youtube: 'https://www.youtube.com/@Kartikay-n2w',
    instagram: 'https://www.instagram.com/mindineers/',
    website: 'https://kartikaysrivastava.in/',
    credentials: 'https://drive.google.com/drive/u/0/folders/18k427YHsckEsDds7TT8ODEnrrtk_cVJX',
  },
  resumePdf: '/assets/Kartikay_Srivastava_SDE_Resume.pdf',
  resumeName: 'Kartikay_Srivastava_SDE_Resume.pdf',
  portrait: {
    src: '/assets/portrait-720.webp',
    srcSet: '/assets/portrait-420.webp 420w, /assets/portrait-720.webp 720w, /assets/portrait-1100.webp 1100w',
    alt: 'Portrait of Kartikay Srivastava',
  },
  interests: ['Backend engineering', 'Applied AI', 'Data systems', 'Product architecture'],
};

export const education = [
  {
    school: 'JECRC University',
    place: 'Jaipur, India',
    degree: 'B.Tech — Computer Science & Engineering (AI & ML)',
    period: '2023 – 2027',
    score: 'CGPA 8.72 / 10',
  },
  {
    school: 'Delhi Public School',
    place: 'Jaipur, India',
    degree: 'CBSE — Classes X and XII',
    period: '2019 – 2022',
    score: 'Class XII 77.4% · Class X 89.8%',
  },
];

export const experience = [
  {
    company: 'Grids Apps LLC',
    role: 'Software Engineer Intern',
    place: 'Remote · Palestine',
    period: 'Jul 2026 – Present',
    points: [
      'Shipped full-stack features and REST APIs using React and Node.js, collaborating with a distributed engineering team.',
      'Worked across design, implementation, testing, debugging, and deployment of web and Android applications.',
    ],
  },
  {
    company: 'Fracht Kenya Ltd',
    role: 'Commercial Apprentice · Operations & Data',
    place: 'Nairobi, Kenya',
    period: 'Jul – Aug 2025',
    points: [
      'Reviewed logistics data-capture and reporting workflows across international operations, identifying information gaps and improvement opportunities.',
      'Worked across commercial and operations teams and communicated process observations to stakeholders.',
    ],
  },
  {
    company: 'Samatrix Consulting Pvt. Ltd.',
    role: 'Data Analytics Intern',
    place: 'Remote · India',
    period: 'Jun – Jul 2025',
    points: [
      'Built Python and Pandas workflows to clean, transform, and validate 10,000+ operational records for downstream reporting.',
      'Investigated data inconsistencies and applied validation logic to improve dataset reliability.',
    ],
  },
];

export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  year: string;
  genre: string;
  status: string;
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  architecture?: { label: string; detail: string }[];
  github?: string;
  liveDemo?: string;
  palette: Palette;
  motif: 'shield' | 'flow' | 'tenants';
};

const lime: Palette = { from: '#101b08', via: '#355a12', to: '#080a08', accent: '#b9ff4a' };
const teal: Palette = { from: '#061619', via: '#0b5960', to: '#070a0c', accent: '#53e1d1' };
const blue: Palette = { from: '#08122a', via: '#1e4b91', to: '#070910', accent: '#71a7ff' };
const amber: Palette = { from: '#201305', via: '#75500b', to: '#0b0907', accent: '#ffc45d' };
const violet: Palette = { from: '#160a24', via: '#543382', to: '#09070c', accent: '#c49cff' };

export const projects: Project[] = [
  {
    id: 'gridforge',
    title: 'GridForge-AI',
    year: '2026',
    genre: 'EDGE SYSTEMS · ENERGY · TAURI',
    status: 'Simulation prototype',
    logline:
      'An edge-first energy-intelligence simulation that makes operational recommendations traceable, bounded, human-authorized, and verifiable.',
    stack: ['React', 'TypeScript', 'Tauri', 'Rust', 'Python', 'FastAPI', 'SQLite', 'PostgreSQL'],
    build: [
      'Directed a desktop prototype with a React/Tauri client, Rust supervisor, and Python/FastAPI runtime.',
      'Designed a 14-stage decision and evidence flow from telemetry validation through human authorization, simulated dispatch, verification, and audit.',
      'Added an offline-capable event outbox and idempotent receiver so queued simulation events can reconcile after reconnection.',
      'A recorded local simulation processed 3,995 synthetic telemetry records; the project documentation records 236 passing local tests across Python, TypeScript, and Rust.',
    ],
    features: [
      'Telemetry quality gates and explicit unknown/degraded states',
      'Human authorization separated from system recommendations',
      'SQLite WAL storage and transactional event outbox',
      'Offline sync with idempotent event reconciliation',
      'Simulation-only factory inputs and responses',
    ],
    metrics: [
      { value: '3,995', label: 'synthetic telemetry records in a saved simulation' },
      { value: '236', label: 'recorded local tests across three languages' },
      { value: '14', label: 'stages in the evidence chain' },
    ],
    architecture: [
      { label: 'Telemetry', detail: 'Synthetic inputs with quality checks' },
      { label: 'React · Tauri', detail: 'Operator interface and desktop shell' },
      { label: 'Rust supervisor', detail: 'Lifecycle and bounded IPC' },
      { label: 'FastAPI runtime', detail: 'Recommendation and evidence flow' },
      { label: 'SQLite · PostgreSQL', detail: 'Outbox, sync, and audit records' },
    ],
    github: 'https://github.com/KartikaySr/GridForge-AI',
    liveDemo: 'https://gridforgeai.kartikaysrivastava.in',
    palette: lime,
    motif: 'flow',
  },
  {
    id: 'aetherq',
    title: 'AetherQ',
    year: '2026',
    genre: 'RAG · DATA GOVERNANCE · FULL STACK',
    status: 'Live prototype',
    logline:
      'A document and analytics workspace combining retrieval-augmented generation, governed natural-language SQL, and conversational AI.',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'pgvector', 'LLMs'],
    build: [
      'Built a full-stack document-intelligence prototype using semantic retrieval and source-linked responses.',
      'Added a natural-language-to-SQL path against a predefined analytics schema, with validation before query execution.',
      'Documented a defense-in-depth data boundary: parsed and allow-listed SELECT statements, a read-only warehouse role, row and time limits, private storage, and fail-closed quotas.',
    ],
    features: [
      'Document retrieval with pgvector-backed semantic search',
      'Source-linked LLM responses',
      'Analytics questions routed to a governed SQL path',
      'Read-only SQL policy and bounded query execution',
      'Supabase Auth, row-level security, and private document storage',
    ],
    metrics: [],
    architecture: [
      { label: 'Next.js workspace', detail: 'Documents, chat, and analytics UI' },
      { label: 'Intent routing', detail: 'Select retrieval, analytics, or fused path' },
      { label: 'RAG · pgvector', detail: 'Retrieve source-linked document context' },
      { label: 'SQL policy', detail: 'Validate read-only bounded analytics queries' },
      { label: 'Supabase', detail: 'Auth, private storage, and Postgres data' },
    ],
    github: 'https://github.com/KartikaySr/AetherQ--RAG-based-Document-Text---to---SQL-analyzer',
    liveDemo: 'https://aetherq.kartikaysrivastava.in',
    palette: teal,
    motif: 'shield',
  },
  {
    id: 'nexus',
    title: 'Nexus Fraud Intelligence',
    year: '2025–2026',
    genre: 'MACHINE LEARNING · EXPLAINABLE AI',
    status: 'Research prototype',
    logline:
      'A transaction-risk prototype exploring fraud scoring, model comparison, explanations, and analyst-facing streaming surfaces.',
    stack: ['Python', 'scikit-learn', 'XGBoost', 'LightGBM', 'CatBoost', 'FastAPI', 'SHAP'],
    build: [
      'Built a Python transaction-risk prototype with feature-engineering and model-training workflows across classical machine-learning classifiers.',
      'The latest SDE resume reports a Random Forest evaluation of 0.88 F1, 90% precision, and 86% recall on 85,443 test transactions, including 148 fraud cases.',
      'Kept quantum and federated-learning experiments separate from the classical scoring path; aspirational throughput targets are not presented as measured results.',
    ],
    features: [
      'Model comparison for imbalanced transaction data',
      'Per-transaction explanation work documented with SHAP',
      'FastAPI backend and analyst-facing Streamlit demo',
      'WebSocket and SSE interaction surfaces in the architecture',
      'Quantum and federated-learning modules treated as research tracks',
    ],
    metrics: [
      { value: '0.88', label: 'Random Forest F1 score reported in the latest SDE resume' },
      { value: '90%', label: 'precision on the reported test set' },
      { value: '86%', label: 'recall on the reported test set' },
      { value: '85,443', label: 'test transactions · 148 fraud cases' },
    ],
    architecture: [
      { label: 'Transactions', detail: 'Prepare and engineer evaluation features' },
      { label: 'Model evaluation', detail: 'Compare classical classifiers' },
      { label: 'Fraud scoring', detail: 'Random Forest reported evaluation' },
      { label: 'SHAP explanations', detail: 'Explore per-transaction factors' },
      { label: 'FastAPI · Streamlit', detail: 'Prototype API and analyst demo' },
    ],
    github: 'https://github.com/KartikaySr/Credit-Card-Fraud-Detection-System',
    liveDemo: 'https://credit.kartikaysrivastava.in',
    palette: blue,
    motif: 'shield',
  },
  {
    id: 'mindineers',
    title: 'MindineersOS',
    year: '2026',
    genre: 'AGENT PLATFORMS · PLUGINS · MONOREPO',
    status: 'Open-source platform',
    logline:
      'A plugin-oriented agent operating system exploring a shared runtime across local tools, dashboards, model providers, and cloud surfaces.',
    stack: ['TypeScript', 'Bun', 'Turbo', 'React', 'Hono', 'Drizzle', 'PostgreSQL'],
    build: [
      'Designed around a framework core, agent runtime, plugin loader, CLI, dashboards, cloud API, and native bridges.',
      'The supplied architecture survey describes 150+ plugins and provider integrations across a broad monorepo.',
      'Governance tooling, scenario evaluation, and benchmark suites address the coordination and quality challenges of a large plugin surface.',
    ],
    features: [
      'Plugin registrations for actions, providers, services, routes, and events',
      'Model-provider-neutral architecture',
      'Local and cloud execution surfaces',
      'PostgreSQL and pgvector persistence options',
      'Scenario-runner and benchmark-oriented evaluation',
    ],
    metrics: [{ value: '150+', label: 'plugins described in the supplied architecture notes' }],
    architecture: [
      { label: 'CLI · dashboards', detail: 'Developer and operator surfaces' },
      { label: 'Framework core', detail: 'Shared extension contracts' },
      { label: 'Plugin loader', detail: 'Actions, providers, routes, and events' },
      { label: 'Agent runtime', detail: 'Coordinate tools and model providers' },
      { label: 'Local · cloud bridges', detail: 'Execution and persistence options' },
    ],
    github: 'https://github.com/KartikaySr/MindineersOS',
    palette: violet,
    motif: 'tenants',
  },
  {
    id: 'codeambers',
    title: 'CodeAmbers',
    year: '2026',
    genre: 'DEVELOPER TOOLS · COLLABORATIVE AI',
    status: 'Product prototype',
    logline:
      'A browser-based development workspace bringing a developer and AI-assisted coding tools together across chat, editor, terminal, and preview.',
    stack: ['Next.js', 'TypeScript', 'React', 'Express', 'Supabase', 'WebSockets'],
    build: [
      'Structured the product as a Next.js frontend and an Express API service in a workspace-based TypeScript monorepo.',
      'Designed server-authoritative workspace and file operations backed by Supabase Postgres with row-level security.',
      'Connected streaming agent output to an IDE-style interaction model, with REST endpoints for workspace, file, chat, upload, and execution workflows.',
    ],
    features: [
      'Browser workspace with chat, code editor, terminal, and preview',
      'REST routes for workspaces and files',
      'WebSocket-based streaming interaction',
      'Supabase persistence and row-level security',
      'Deployment split documented for frontend and backend services',
    ],
    metrics: [],
    architecture: [
      { label: 'Next.js IDE', detail: 'Editor, chat, terminal, and preview' },
      { label: 'Express API', detail: 'Workspace, file, and execution routes' },
      { label: 'WebSockets', detail: 'Stream agent output to the browser' },
      { label: 'Supabase Postgres', detail: 'Workspace persistence with RLS' },
    ],
    github: 'https://github.com/KartikaySr/CodeAmbers',
    liveDemo: 'https://codeambers.kartikaysrivastava.in',
    palette: amber,
    motif: 'flow',
  },
];

export type Achievement = {
  id: string;
  title: string;
  org: string;
  detail: string;
  laurel: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    id: 'nec',
    title: 'National Winner',
    org: 'National Entrepreneurship Challenge · IIT Bombay',
    detail: 'Contingent member of the National Entrepreneurship Challenge 2024 winning team.',
    laurel: 'National Recognition',
  },
  {
    id: 'bit-by-bit',
    title: 'Top 4 Team',
    org: 'BitByBit · Cognizance · IIT Roorkee',
    detail: 'Placed among the top four teams in the 48-hour hackathon at Cognizance 2025.',
    laurel: '48-Hour Hackathon',
  },
  {
    id: 'incubation-centre',
    title: 'Operations Lead',
    org: 'JECRC Incubation Centre',
    detail: 'Coordinated entrepreneurship programming and operations engaging 1,500+ students.',
    laurel: 'Leadership',
  },
  {
    id: 'ecell',
    title: 'Campus Executive',
    org: 'E-Cell · IIT Bombay',
    detail: 'Represented JECRC University and supported campus outreach and partnerships.',
    laurel: 'Campus Leadership',
  },
];

export type Certification = { issuer: string; name: string; link?: string; image?: string; date?: string };

export const certifications: Certification[] = [
  {
    issuer: 'Google Cloud',
    name: 'Google Cloud Computing Foundations',
    link: 'https://www.credly.com/badges/206b9d37-2efa-4140-8012-cd9d5553f2ab/linked_in_profile',
  },
  {
    issuer: 'Google',
    name: 'Data Structures in Python',
    link: 'https://www.coursera.org/account/accomplishments/verify/INYN8QKVMN7U',
  },
  {
    issuer: 'DeepLearning.AI',
    name: 'AI-Powered Software and System Design',
    link: 'https://www.coursera.org/account/accomplishments/verify/BYOTILBGK66J',
  },
  {
    issuer: 'Amazon',
    name: 'Full Stack Web Development',
    link: profile.links.credentials,
  },
  {
    issuer: 'NPTEL · IIT Roorkee',
    name: 'Leadership and Team Effectiveness',
    image: '/assets/credentials/leadership-team-effectiveness.webp',
    date: 'Jan–Apr 2026 · 78%',
  },
  {
    issuer: 'NPTEL · IIT Roorkee',
    name: 'Soft Skills',
    image: '/assets/credentials/soft-skills.webp',
    date: 'Jul–Oct 2025 · 87% · Top 2%',
  },
  {
    issuer: 'E-Cell · IIT Bombay',
    name: 'Campus Ambassador · CA 2024',
    image: '/assets/credentials/ecell-campus-ambassador-2024.webp',
    date: 'Campus Ambassador Internship Program 2024',
  },
  {
    issuer: 'Cognizance · IIT Roorkee',
    name: 'BitByBit 48-hour Hackathon',
    image: '/assets/credentials/bitbybit-hackathon.webp',
  },
  {
    issuer: 'Udemy',
    name: 'Natural Language Preprocessing using spaCy',
    link: 'https://www.udemy.com/certificate/UC-cde8b85b-0289-44f4-8a14-c74b90829fa8/',
  },
  {
    issuer: 'Udemy',
    name: 'Generative AI Governance',
    link: 'https://www.udemy.com/certificate/UC-2513247b-982c-4e01-aef0-17163fc722d7/',
  },
  {
    issuer: 'Samatrix Consulting',
    name: 'Deep Learning Practical with Python',
    link: 'https://verify.netcredential.com/roy8augy5D',
  },
  {
    issuer: 'Samatrix Consulting',
    name: 'Neural Networks & Deep Learning',
    link: 'https://verify.netcredential.com/roy8B3pzRI',
  },
  {
    issuer: 'Samatrix Consulting',
    name: 'Data Analysis Using Python',
    link: 'https://verify.netcredential.com/roy81ZS9as',
  },
  {
    issuer: 'Samatrix Consulting',
    name: 'Probabilistic Modelling Using Python',
    link: 'https://verify.netcredential.com/roy8EVB0a4',
  },
  {
    issuer: 'Samatrix Consulting',
    name: 'Certificate in Fundamentals of Artificial Intelligence and Data Analytics',
    link: 'https://verify.netcredential.com/roy8T5TMsc',
  },
  {
    issuer: 'Apna College · Alpha',
    name: 'DSA with Java',
    image: '/assets/credentials/dsa-with-java.pdf',
  },
];

export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    subtitle: 'Application and data work',
    skills: [
      { name: 'Python', mono: 'Py' },
      { name: 'TypeScript', mono: 'Ts' },
      { name: 'JavaScript', mono: 'Js' },
      { name: 'Java', mono: 'Jv' },
      { name: 'SQL', mono: 'Sq' },
      { name: 'C++', mono: 'C+' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'Product interfaces',
    skills: [
      { name: 'React', mono: 'Re' },
      { name: 'Next.js', mono: 'Nx' },
      { name: 'HTML5', mono: 'Ht' },
      { name: 'CSS3', mono: 'Cs' },
      { name: 'Tailwind CSS', mono: 'Tw' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    subtitle: 'Services and integration',
    skills: [
      { name: 'Node.js', mono: 'No' },
      { name: 'Express.js', mono: 'Ex' },
      { name: 'FastAPI', mono: 'Fa' },
      { name: 'REST APIs', mono: 'Ap' },
      { name: 'WebSockets', mono: 'Ws' },
    ],
  },
  {
    id: 'data',
    title: 'Data & AI',
    subtitle: 'Retrieval, analytics, and machine learning',
    skills: [
      { name: 'PostgreSQL', mono: 'Pg' },
      { name: 'Supabase', mono: 'Sb' },
      { name: 'pgvector', mono: 'Pv' },
      { name: 'Pandas', mono: 'Pd' },
      { name: 'Machine Learning', mono: 'ML' },
      { name: 'RAG & LLMs', mono: 'AI' },
    ],
  },
  {
    id: 'engineering',
    title: 'Engineering',
    subtitle: 'Build, test, and ship',
    skills: [
      { name: 'Docker', mono: 'Dk' },
      { name: 'Git / GitHub', mono: 'Gt' },
      { name: 'Tauri', mono: 'Ta' },
      { name: 'Rust', mono: 'Rs' },
      { name: 'Debugging', mono: 'Db' },
      { name: 'Postman', mono: 'Pm' },
    ],
  },
  {
    id: 'fundamentals',
    title: 'Computer Science',
    subtitle: 'Engineering foundations',
    skills: [
      { name: 'Data Structures & Algorithms', mono: 'DS' },
      { name: 'Object-Oriented Programming', mono: 'OO' },
      { name: 'DBMS', mono: 'DB' },
      { name: 'Operating Systems', mono: 'OS' },
      { name: 'Computer Networks', mono: 'CN' },
    ],
  },
];

export const skillEvidence: Record<string, string[]> = {
  Python: ['GridForge-AI', 'Nexus Fraud Intelligence', 'Samatrix analytics workflows'],
  TypeScript: ['CodeAmbers', 'MindineersOS', 'GridForge-AI'],
  JavaScript: ['React and Node.js project work'],
  Java: ['B.Tech CSE coursework'],
  SQL: ['AetherQ governed analytics', 'PostgreSQL'],
  'C++': ['B.Tech CSE coursework'],
  React: ['GridForge-AI', 'CodeAmbers', 'MindineersOS'],
  'Next.js': ['AetherQ', 'CodeAmbers'],
  HTML5: ['Web application development'],
  CSS3: ['Web application development'],
  'Tailwind CSS': ['AetherQ', 'MindineersOS'],
  'Node.js': ['Grids Apps internship', 'CodeAmbers'],
  'Express.js': ['CodeAmbers'],
  FastAPI: ['GridForge-AI', 'Nexus Fraud Intelligence'],
  'REST APIs': ['Grids Apps internship', 'AetherQ', 'CodeAmbers'],
  WebSockets: ['CodeAmbers', 'MindineersOS architecture'],
  PostgreSQL: ['AetherQ', 'GridForge-AI', 'CodeAmbers'],
  Supabase: ['AetherQ', 'CodeAmbers'],
  pgvector: ['AetherQ semantic retrieval'],
  Pandas: ['Samatrix Consulting internship'],
  'Machine Learning': ['Nexus Fraud Intelligence', 'B.Tech AI & ML'],
  'RAG & LLMs': ['AetherQ'],
  Docker: ['Software development and project environments'],
  'Git / GitHub': ['Distributed engineering workflows', 'Public project repositories'],
  Tauri: ['GridForge-AI'],
  Rust: ['GridForge-AI'],
  Debugging: ['Grids Apps internship', 'GridForge-AI'],
  Postman: ['API development and testing'],
  'Data Structures & Algorithms': ['B.Tech CSE'],
  'Object-Oriented Programming': ['B.Tech CSE'],
  DBMS: ['B.Tech CSE', 'AetherQ'],
  'Operating Systems': ['B.Tech CSE'],
  'Computer Networks': ['B.Tech CSE'],
};

export type Episode = {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
};

export type Season = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  episodes: Episode[];
};

export const seasons: Season[] = [
  {
    number: 1,
    title: 'Foundations',
    period: '2023 – 2027',
    synopsis: 'Computer Science and AI & ML at JECRC University, alongside hands-on engineering and data work.',
    episodes: [
      {
        code: 'S01 E01',
        title: 'Computer Science',
        description: 'B.Tech in Computer Science & Engineering (AI & ML), with a current CGPA of 8.72 / 10.',
        tags: ['JECRC University', 'AI & ML', '2023–2027'],
        runtime: 'Jaipur, India',
        palette: blue,
      },
      {
        code: 'S01 E02',
        title: 'Engineering Core',
        description: 'Building a foundation in data structures, object-oriented programming, databases, operating systems, and networks.',
        tags: ['DSA', 'OOP', 'DBMS', 'OS', 'Networks'],
        runtime: 'Computer Science',
        palette: violet,
      },
    ],
  },
  {
    number: 2,
    title: 'Data in Practice',
    period: '2025',
    synopsis: 'Data analytics and operational workflow experience across remote and international teams.',
    episodes: [
      {
        code: 'S02 E01',
        title: 'Operational Data',
        description: 'Used Python and Pandas to clean, transform, and validate 10,000+ operational records for analytics workflows.',
        tags: ['Python', 'Pandas', 'Data Quality'],
        runtime: 'Samatrix Consulting · Jun–Jul 2025',
        palette: teal,
      },
      {
        code: 'S02 E02',
        title: 'Across Operations',
        description: 'Reviewed logistics data-capture and reporting workflows and shared process observations with cross-functional teams.',
        tags: ['Logistics', 'Workflow Analysis', 'Kenya'],
        runtime: 'Fracht Kenya · Jul–Aug 2025',
        palette: amber,
      },
    ],
  },
  {
    number: 3,
    title: 'Shipping Software',
    period: '2026 – Present',
    synopsis: 'Full-stack internship work and a growing set of systems spanning web products, applied AI, and edge software.',
    episodes: [
      {
        code: 'S03 E01',
        title: 'Distributed Engineering',
        description: 'Contributing full-stack features and REST APIs with React and Node.js across a distributed engineering team.',
        tags: ['React', 'Node.js', 'REST APIs'],
        runtime: 'Grids Apps LLC · Jul 2026–Present',
        palette: lime,
      },
      {
        code: 'S03 E02',
        title: 'Applied AI Products',
        description: 'Building document retrieval and governed analytics in AetherQ, alongside explainable fraud-model experiments in Nexus.',
        tags: ['RAG', 'LLMs', 'Machine Learning'],
        runtime: 'AetherQ · Nexus',
        palette: violet,
      },
      {
        code: 'S03 E03',
        title: 'Systems & Platforms',
        description: 'Exploring offline-capable energy simulations, collaborative developer tools, and plugin-oriented agent systems.',
        tags: ['Edge Systems', 'Developer Tools', 'Agent Platforms'],
        runtime: 'GridForge · CodeAmbers · MindineersOS',
        palette: blue,
      },
    ],
  },
];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };

export const topPicks: TopPick[] = [
  { label: 'Edge systems', title: 'GridForge-AI', detail: '14-stage simulation evidence chain', palette: lime },
  { label: 'Applied AI', title: 'AetherQ', detail: 'Document retrieval + governed analytics', palette: teal },
  { label: 'ML evaluation', title: 'Nexus', detail: 'Fraud scoring with reported test metrics', palette: blue },
  { label: 'Distributed systems', title: 'MindineersOS', detail: 'Plugin-oriented agent platform', palette: violet },
  { label: 'Developer tools', title: 'CodeAmbers', detail: 'Collaborative AI development workspace', palette: amber },
  { label: 'Production work', title: 'Software Engineer Intern', detail: 'Grids Apps LLC', palette: teal },
  { label: 'Data engineering', title: '10,000+ records', detail: 'Python / Pandas validation workflows', palette: blue },
  { label: 'Academic focus', title: 'AI & ML', detail: 'B.Tech · JECRC University · CGPA 8.72', palette: violet },
  { label: 'Team recognition', title: 'National Winner', detail: 'National Entrepreneurship Challenge 2024', palette: amber },
  { label: 'Hackathon', title: 'Top 4 Team', detail: 'BitByBit · Cognizance 2025', palette: lime },
];

export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const introSlides: IntroSlide[] = [
  {
    kicker: 'Engineering focus',
    title: 'Full-stack systems',
    lines: ['React, Next.js, Node.js, FastAPI', 'APIs, data stores, and shipping workflows'],
    chips: ['TypeScript', 'Python', 'PostgreSQL'],
  },
  {
    kicker: 'Applied AI',
    title: 'Useful, bounded AI',
    lines: ['AetherQ combines document retrieval and governed analytics', 'Nexus explores explainable fraud scoring'],
    chips: ['RAG', 'pgvector', 'Machine Learning'],
  },
  {
    kicker: 'Edge & resilience',
    title: 'Built for evidence',
    lines: ['GridForge-AI models an offline-capable energy workflow', 'Its factory data and responses are synthetic simulations'],
    chips: ['Tauri', 'Rust', 'FastAPI'],
  },
  {
    kicker: 'Experience',
    title: 'From data to products',
    lines: ['Software engineering at Grids Apps LLC', 'Python analytics at Samatrix Consulting', 'International operations exposure in Kenya'],
  },
  {
    kicker: 'Teamwork',
    title: 'Build with people',
    lines: ['National Entrepreneurship Challenge 2024 winning team', 'Top 4 at the BitByBit 48-hour hackathon'],
  },
];

export type ProfileId = 'portfolio' | 'recruiter' | 'engineer' | 'projects';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  blurb: string;
  color: string;
  order: SectionId[];
}[] = [
  {
    id: 'portfolio',
    name: 'Full Portfolio',
    blurb: 'The complete story, in order',
    color: '#b9ff4a',
    order: ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'],
  },
  {
    id: 'recruiter',
    name: 'Hiring Team',
    blurb: 'Experience, projects, and résumé first',
    color: '#71a7ff',
    order: ['story', 'originals', 'moments', 'skills', 'about', 'journey', 'picks'],
  },
  {
    id: 'engineer',
    name: 'Engineering',
    blurb: 'Systems, architecture, and implementation',
    color: '#53e1d1',
    order: ['originals', 'skills', 'journey', 'about', 'moments', 'story', 'picks'],
  },
  {
    id: 'projects',
    name: 'Project Tour',
    blurb: 'Go straight to the case studies',
    color: '#ffc45d',
    order: ['originals', 'picks', 'about', 'journey', 'skills', 'moments', 'story'],
  },
];

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'Profile', card: 'About Kartikay', meta: 'Focus • Education • Background', palette: violet },
  journey: { nav: 'Experience', card: 'Experience', meta: 'Internships • Engineering journey', palette: amber },
  originals: { nav: 'Projects', card: 'Case Studies', meta: `${projects.length} systems • Selected work`, palette: lime },
  picks: { nav: 'Highlights', card: 'Engineering Highlights', meta: 'Selected work • Recognition', palette: teal },
  skills: { nav: 'Skills', card: 'Technical Skills', meta: `${skillCategories.length} skill groups`, palette: blue },
  moments: { nav: 'Recognition', card: 'Recognition', meta: `${achievements.length} highlights • ${certifications.length} credentials`, palette: amber },
  story: { nav: 'Resume', card: 'Résumé', meta: 'View and download the current résumé', palette: violet },
};
