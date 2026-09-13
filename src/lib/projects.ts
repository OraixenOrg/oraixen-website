import { Project, ProjectMetric } from "../types/project";
import projectsData from "../data/projects.json";
import projectsArData from "../data/projects.ar.json";

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
 * ▶ Edit the data in `src/data/projects.json` (English) and `src/data/projects.ar.json`
 *   (Arabic overrides, keyed by the project `slug`). No code changes needed to add or
 *   edit a project — just keep the JSON valid.
 */
export const projects = projectsData as unknown as Project[];

/** Arabic translations keyed by project slug. Any missing field falls back to English. */
const projectsAr = projectsArData as unknown as Record<
  string,
  Partial<LocalizedProjectFields>
>;

/**
 * Returns a copy of the project with Arabic copy applied when lang is 'ar'.
 * Brand name, client, year, tech stack and links are language-neutral and kept as-is.
 */
export function localizeProject(p: Project, lang: string): Project {
  if (!lang || !lang.startsWith("ar")) return p;
  const ar = projectsAr[p.slug];
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
