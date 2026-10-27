export type ProjectData = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  role: string;
  stack: string[];
  summary: string;
  accent: string;
  platform: string;
  description: string;
  stats: { label: string; value: string }[];
};

export const projects: ProjectData[] = [
  {
    slug: "quantummed",
    number: "01",
    title: "QUANTUMMED",
    subtitle: "A patient-first prescription and healthcare management platform.",
    role: "Full Stack Software Engineer",
    stack: [
      "React",
      "TypeScript",
      "NestJS",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "AWS",
      "Docker",
      "REST APIs",
      "Microservices",
    ],
    summary:
      "Built an end-to-end healthcare experience spanning medication workflows, pharmacy operations, family health management, and secure patient accounts.",
    description:
      "I worked across product design, interface systems, core service architecture, and operational integrations to create a platform patients and care teams could trust.",
    accent: "#d7a277",
    platform: "Patient care platform",
    stats: [
      { label: "Platform scope", value: "Patients + pharmacy + care teams" },
      { label: "Core systems", value: "Auth, orders, records, payments" },
      { label: "Architecture", value: "Microservices + event-driven integrations" },
    ],
  },
  {
    slug: "menoviq",
    number: "02",
    title: "MENOVIQ",
    subtitle: "A modern website builder and CMS designed specifically for restaurants.",
    role: "Product Engineer",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Zod",
      "SEO",
      "CMS",
      "Multi-tenancy",
      "Custom Domains",
    ],
    summary:
      "Created a multi-tenant platform that lets restaurants publish branded websites, manage menus, events, reservations, and digital storefronts from one system.",
    description:
      "The product was designed to feel like a polished restaurant experience while also giving operators full content control, versioning, and site management capabilities.",
    accent: "#d9cbb0",
    platform: "Restaurant website builder",
    stats: [
      { label: "Tenancy model", value: "One system, many restaurant brands" },
      { label: "CMS depth", value: "Pages, menus, media, SEO, publishing" },
      { label: "Product focus", value: "Beautiful storefronts + operational control" },
    ],
  },
  {
    slug: "nori",
    number: "03",
    title: "NORI",
    subtitle: "A personal cooking companion for recipes, meal planning, and a more organized kitchen.",
    role: "Software Engineer",
    stack: ["React Native", "Django", "PostgreSQL", "Expo", "Python", "REST APIs"],
    summary: "A mobile cooking experience that brings recipe discovery, digital cookbooks, meal planning, and pantry management together.",
    description: "Nori connects the inspiration to cook with the everyday work of planning meals, tracking ingredients, and building a grocery list.",
    accent: "#e88c42",
    platform: "Cooking & meal planning app",
    stats: [
      { label: "Experience", value: "Mobile-first cooking companion" },
      { label: "Core features", value: "Recipes, cookbooks, pantry, meal plans" },
      { label: "Community", value: "Cook profiles and shared recipes" },
    ],
  },
];

export const stackItems = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "NestJS",
  "PostgreSQL",
  "Redis",
  "Prisma",
  "Docker",
  "AWS",
  "REST APIs",
  "Git",
  "CI/CD",
];
