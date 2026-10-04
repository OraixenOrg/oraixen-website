import {
  Project,
  ProjectPlatforms,
  ProjectHeadings,
  ProjectMetric,
  ProjectProofPoint,
  ProjectResponsibility,
  ProjectWorkflowStep,
} from "../types/project";
import { MarketLocale, marketFromLanguage } from "./marketLocale";
import projectsData from "../data/projects.json";
import projectsEgData from "../data/projects.ar-eg.json";
import projectsSaData from "../data/projects.ar-sa.json";

/**
 * Neutral stand-in shown when a project carries no owner-supplied brand asset.
 * Shared by the grid card and the case-study hero so both degrade identically,
 * and never replaced by a guessed logo URL scraped from a client's site.
 */
export const PROJECT_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800';

/** Fields of a Project that carry human-readable copy and therefore need Arabic translations. */
interface LocalizedProjectFields {
  /**
   * Only for a product that genuinely ships under a different name in Arabic
   * (e.g. "Ghiras Al Usrah" / "غراس الأسرة"). Omit it and the Latin brand name
   * is kept, which is what every product with a single global name wants.
   */
  title: string;
  industry: string;
  country: string;
  description: string;
  cardDescription: string;
  overview: string;
  problem: string;
  solution: string;
  impact: string;
  headings: ProjectHeadings;
  metrics: ProjectMetric[];
  highlights: string[];
  workflow: ProjectWorkflowStep[];
  responsibilities: ProjectResponsibility[];
  systemComponents: string[];
  proofPoints: ProjectProofPoint[];
}

/**
 * All projects shown across the site (case studies, featured grid, related, etc.).
 * Edit the data in `src/data/projects.json` (English, and the single source of every
 * FACT) plus one prose file per Arabic market, keyed by the project `slug`:
 * `src/data/projects.ar-eg.json` and `src/data/projects.ar-sa.json`. No code changes
 * are needed to add or edit a project, just keep the JSON valid.
 */
export const projects = projectsData as unknown as Project[];

type ProjectCopy = Record<string, Partial<LocalizedProjectFields>>;

/**
 * Case-study copy per market, keyed by project slug.
 *
 * Each Arabic market has its OWN file so Egyptian and Saudi readers get case
 * studies written in their own business register. Deliberately NOT selected with
 * `lang.startsWith("ar")`: that test cannot tell ar-eg from ar-sa and would
 * silently collapse both markets onto one prose file.
 *
 * English needs no entry because projects.json already carries the English copy.
 * Facts (client, year, category, URLs, tech stack, metric and proof-point VALUES,
 * platforms, confidentiality) live only in projects.json and are never overridden
 * here; an Arabic entry restates the same fact in its own market register.
 */
const MARKET_COPY: Partial<Record<MarketLocale, ProjectCopy>> = {
  "ar-eg": projectsEgData as unknown as ProjectCopy,
  "ar-sa": projectsSaData as unknown as ProjectCopy,
};

/**
 * Returns a copy of the project with the active market's prose applied.
 * Client, year, tech stack and links are language-neutral and kept as-is; the
 * brand name is too, unless the market file carries its own `title`.
 */
export function localizeProject(p: Project, lang: string): Project {
  const copy = MARKET_COPY[marketFromLanguage(lang)];
  if (!copy) return p;
  const ar = copy[p.slug];
  if (!ar) return p;
  return {
    ...p,
    title: ar.title ?? p.title,
    industry: ar.industry ?? p.industry,
    country: ar.country ?? p.country,
    description: ar.description ?? p.description,
    cardDescription: ar.cardDescription ?? p.cardDescription,
    overview: ar.overview ?? p.overview,
    problem: ar.problem ?? p.problem,
    solution: ar.solution ?? p.solution,
    impact: ar.impact ?? p.impact,
    headings: ar.headings ?? p.headings,
    metrics: ar.metrics ?? p.metrics,
    highlights: ar.highlights ?? p.highlights,
    workflow: ar.workflow ?? p.workflow,
    responsibilities: ar.responsibilities ?? p.responsibilities,
    systemComponents: ar.systemComponents ?? p.systemComponents,
    proofPoints: ar.proofPoints ?? p.proofPoints,
  };
}

const INDUSTRY_NEEDLES: Record<string, string[]> = {
  education: ["education"],
  ecommerce: ["e-commerce", "ecommerce", "e commerce"],
  finance: ["finance", "fintech"],
  food: ["food"],
  healthcare: ["health", "medical"],
  jobs: ["job"],
  legal: ["legal"],
  utilities: ["utilit"],
};

/** True when a project's industry belongs to an industry-card key (education, ecommerce, …). */
export function matchesIndustryKey(project: Project, key: string): boolean {
  const industry = project.industry.toLowerCase();
  const needles = INDUSTRY_NEEDLES[key.toLowerCase()] ?? [key.toLowerCase()];
  return needles.some((needle) => industry.includes(needle));
}

/** True when a project has at least one public destination worth linking to. */
export function hasPlatformLinks(platforms?: ProjectPlatforms): platforms is ProjectPlatforms {
  return Boolean(
    platforms &&
      (platforms.website || platforms.playStore || platforms.appStore || platforms.dashboard)
  );
}
