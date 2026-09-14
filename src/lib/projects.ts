import { Project, ProjectMetric } from "../types/project";
import { MarketLocale, marketFromLanguage } from "./marketLocale";
import projectsData from "../data/projects.json";
import projectsEgData from "../data/projects.ar-eg.json";
import projectsSaData from "../data/projects.ar-sa.json";

/** Fields of a Project that carry human-readable copy and therefore need Arabic translations. */
interface LocalizedProjectFields {
  industry: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  metrics: ProjectMetric[];
  highlights: string[];
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
 * Facts (client, year, category, URLs, tech stack, metric VALUES, platforms,
 * confidentiality) live only in projects.json and are never overridden here.
 */
const MARKET_COPY: Partial<Record<MarketLocale, ProjectCopy>> = {
  "ar-eg": projectsEgData as unknown as ProjectCopy,
  "ar-sa": projectsSaData as unknown as ProjectCopy,
};

/**
 * Returns a copy of the project with the active market's prose applied.
 * Brand name, client, year, tech stack and links are language-neutral and kept as-is.
 */
export function localizeProject(p: Project, lang: string): Project {
  const copy = MARKET_COPY[marketFromLanguage(lang)];
  if (!copy) return p;
  const ar = copy[p.slug];
  if (!ar) return p;
  return {
    ...p,
    industry: ar.industry ?? p.industry,
    description: ar.description ?? p.description,
    problem: ar.problem ?? p.problem,
    solution: ar.solution ?? p.solution,
    impact: ar.impact ?? p.impact,
    metrics: ar.metrics ?? p.metrics,
    highlights: ar.highlights ?? p.highlights,
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
