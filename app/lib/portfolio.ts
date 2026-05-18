export type ProjectLinks = {
  live?: string;
  github?: string;
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  role: string;
  stack: string[];
  links: ProjectLinks;
  summary: string;
  highlights: string[];
  metrics?: ProjectMetric[];
};

export type Experience = {
  company: string;
  title: string;
  location: string;
  dates: string;
  bullets: string[];
  stack: string[];
};

export type Education = {
  school: string;
  degree: string;
  dates: string;
  gpa: string;
  coursework: string[];
};

export const profile = {
  name: "Sonny Au",
  role: "Software Engineer",
  location: "San Jose, CA",
  email: "au.sonny10@gmail.com",
  phone: "+1 (408) 669-9299",
  tagline:
    "Full-stack products, mobile apps, and ML-leaning side projects.",
  bio: "Software engineering student at San Jose State, graduating May 2026. Cofounder and full-stack engineer at PalAte. I build web and mobile products people actually use, with the occasional ML side project.",
  links: {
    github: "https://github.com/SonnyAu",
    linkedin: "https://linkedin.com/in/sonny-au/",
    site: "https://sonnyau.vercel.app/",
  },
} as const;

export const education: Education = {
  school: "San Jose State University",
  degree: "B.S. Software Engineering",
  dates: "Aug 2021 – May 2026",
  gpa: "3.75",
  coursework: [
    "Data Structures & Algorithms",
    "Discrete Mathematics",
    "ML / AI",
    "Operating Systems",
    "Computer Architecture",
    "Software Engineering Process",
    "Database Management",
    "Information Security",
    "Enterprise Software Platforms",
  ],
};

export const experiences: Experience[] = [
  {
    company: "PalAte",
    title: "Fullstack Software Engineer & Cofounder",
    location: "San Jose, CA",
    dates: "Sep 2024 – Present",
    bullets: [
      "Engineered a React Native app with 20+ screens and 15+ integrated packages, including Google Maps API, helping San Jose State students discover restaurants matching their dietary preferences.",
      "Maintained PostgreSQL databases in Supabase, enforcing row-level security policies.",
      "Optimized restaurant recommendation algorithms, boosting accuracy by 37% and improving scalability.",
      "Led a product launch campaign that reached 1,000+ clients and 10+ restaurant partners.",
    ],
    stack: [
      "React Native",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Google Maps API",
    ],
  },
  {
    company: "SkyIT",
    title: "Frontend React Developer Intern",
    location: "Remote",
    dates: "Jan 2025 – May 2025",
    bullets: [
      "Revamped the HR email system with SendGrid to streamline outreach to prospective interns.",
      "Enhanced an internal dashboard using Next.js, Tailwind, and Prisma to streamline intern workflows and improve UX.",
      "Refactored the codebase to be ~900% more efficient by offloading hard-coded email templates to the cloud.",
    ],
    stack: ["Next.js", "Tailwind", "Prisma", "SendGrid", "PostgreSQL"],
  },
  {
    company: "SJSU College Corps",
    title: "Lead Project Manager & Instructor",
    location: "San Jose, CA",
    dates: "Aug 2021 – May 2025",
    bullets: [
      "Coordinated and executed programming projects for 280+ 3rd–6th grade students across seven schools.",
      "Guided colleagues to build Scratch-based programs for students to debug and extend.",
      "Trained 70+ SJSU colleagues in programming skills for the program.",
    ],
    stack: ["Scratch", "Curriculum design", "Mentorship"],
  },
];

export const projects: Project[] = [
  {
    slug: "pickl-ai",
    title: "Pickl.ai",
    tagline:
      "AI-powered group travel — vote on AI-curated places with friends, get picks tailored to your group.",
    year: "2025",
    role: "Full-stack engineer",
    stack: [
      "Next.js",
      "FastAPI",
      "Redis",
      "Mistral AI",
      "Yelp Fusion API",
      "Tailwind",
      "GitHub Actions",
    ],
    links: {
      live: "https://pickl-ai.vercel.app",
      github: "https://github.com/SonnyAu/group-project-team-15",
    },
    summary:
      "Group decision app where friends create a session, vote on AI-curated venues, and iterate on recommendations together. Frontend on Next.js, backend on FastAPI with Redis for session state.",
    highlights: [
      "Built and shipped a full-stack web app where groups create sessions, vote on AI-curated places, and iterate on recommendations.",
      "Integrated Mistral AI for theme- and location-aware suggestions and the Yelp Fusion API to validate businesses with real photos, ratings, and pricing.",
      "Wired server actions and client APIs to a deployed backend; configured CORS, env-based URLs, and GitHub Actions CI for reliable builds.",
      "Handled Next.js image remote patterns so production on Vercel matched local behavior.",
    ],
  },
  {
    slug: "palate-website",
    title: "PalAte Promotional Website",
    tagline:
      "Marketing site for a food-tech startup connecting students with restaurants that match their diets.",
    year: "2024",
    role: "Frontend & design",
    stack: ["Next.js", "Tailwind CSS", "Figma"],
    links: {
      live: "https://pal-ate.com",
      github: "https://github.com/SonnyAu/palate-website",
    },
    summary:
      "Public marketing site for the PalAte startup. Designed in Figma, built in Next.js, with custom Tailwind keyframe animations driving engagement.",
    highlights: [
      "Developed and launched a dynamic promotional site using Next.js with focus on performance and SEO.",
      "Implemented modern UI components and custom Tailwind transitions and keyframes to enhance user engagement.",
      "Designed high-fidelity Figma mockups and translated them into responsive, production-ready components with pixel-perfect accuracy.",
    ],
  },
  {
    slug: "nba-playoffs",
    title: "NBA Playoffs Prediction Model",
    tagline:
      "Machine-learning model that forecasts NBA playoff win percentage from regular-season stats.",
    year: "2023",
    role: "ML engineer (solo)",
    stack: ["Python", "scikit-learn", "pandas", "Google Colab"],
    links: {},
    summary:
      "Solo ML project: trained a scikit-learn model on multi-season NBA data (2000–2021) to predict each team's playoff win percentage with 95% accuracy.",
    highlights: [
      "Developed a model in Python and scikit-learn that predicts NBA team playoff win percentages from regular-season statistics with 95% accuracy.",
      "Cleaned, preprocessed, and engineered features from NBA datasets spanning multiple seasons (2000–2021) to train and evaluate the model.",
      "Used Google Colab for data analysis, model development, and visualization.",
    ],
    metrics: [
      { label: "Accuracy", value: "95%" },
      { label: "Seasons trained", value: "2000–21" },
    ],
  },
  {
    slug: "skyit-dashboard",
    title: "SkyIT HR / Intern Dashboard",
    tagline:
      "Internal dashboard for HR and intern operations — task tracking plus data-driven email personalization.",
    year: "2025",
    role: "Frontend / Fullstack intern",
    stack: [
      "Next.js",
      "Tailwind",
      "Prisma",
      "GraphQL",
      "Docker",
      "PostgreSQL",
      "SendGrid",
    ],
    links: {},
    summary:
      "Internal HR and intern dashboard built during the SkyIT internship. Centralized intern task tracking and supported automated, data-driven email personalization for onboarding, offboarding, and HR communications.",
    highlights: [
      "Built an internal HR/intern dashboard centralizing task tracking and supporting automated, data-driven email personalization.",
      "Completely revamped the HR email system using SendGrid for onboarding, offboarding, and internal HR communications.",
      "Refactored the codebase to be ~900% more efficient by offloading hard-coded email templates to the cloud.",
    ],
    metrics: [{ label: "Efficiency gain", value: "900%" }],
  },
];

export const skillsByGroup: Record<string, string[]> = {
  Languages: [
    "TypeScript",
    "JavaScript",
    "Python",
    "Go",
    "Java",
    "C#",
    "C / C++",
    "Swift",
    "SQL",
  ],
  Frameworks: [
    "React",
    "React Native",
    "Next.js",
    "Node.js",
    "FastAPI",
    "Tailwind",
    "Prisma",
    "GraphQL",
  ],
  Data: ["PostgreSQL", "MySQL", "Supabase", "Redis"],
  "Cloud & DevOps": [
    "AWS",
    "Azure",
    "Docker",
    "GitHub Actions",
    "Vercel",
    "GitLab",
  ],
  Tools: ["Git", "JIRA", "Figma", "Agile", "REST APIs", "OOP"],
};

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
