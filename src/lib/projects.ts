import {
  Project,
  ProjectPlatforms,
  ProjectHeadings,
  ProjectPlannedExpansion,
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
 *
 * Served from `public/`, so the portfolio no longer depends on a third-party
 * host to render a project that is simply waiting for its artwork. Resolve it
 * through `useProjectImage` rather than reading it directly, so every surface
 * degrades the same way.
 */
export const PROJECT_FALLBACK_IMAGE = '/assets/project-placeholder.svg';

/** Fields of a Project that carry human-readable copy and therefore need Arabic translations. */
interface LocalizedProjectFields {
  /**
   * Only for a product that genuinely ships under a different name in Arabic
   * (e.g. "Ghiras Al Usrah" / "غراس الأسرة"). Omit it and the Latin brand name
   * is kept, which is what every product with a single global name wants.
   */
  title: string;
  /**
   * Only for a period whose wording is not language-neutral: "2024-2026" reads
   * the same everywhere, "Late 2025 - Early 2026" does not. The period itself is
   * still the single fact stated in projects.json; this restates it in-market.
   */
  year: string;
  industry: string;
  country: string;
  description: string;
  cardDescription: string;
  overview: string;
  statusNote: string;
  plannedExpansion: ProjectPlannedExpansion;
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
 * The approved public portfolio, in the exact order it is presented on the site.
 *
 * This list - NOT the order of the records in `src/data/projects.json` - is the
 * single source of the public project order, and a project absent from it is
 * absent from every public surface: the grid, pagination, industry filters, the
 * featured row, the home-page name strip, related projects and the case-study
 * route. Add a slug here to publish a project; remove it to unpublish one,
 * without touching its data.
 */
const PROJECT_DISPLAY_ORDER = [
  "du-v-du",
  "nice-one",
  "sanar",
  "ghiras-al-usrah",
  "maqdia",
  "delora",
  "ibdl",
  "waffar-cash",
  "dar-alkahraba",
  "discount-emy",
  "order-fs",
  "maat",
  "gefires",
  "rosto",
  "govet",
] as const;

/*
 * Retained in src/data/projects.json, and in both Arabic prose files, but
 * intentionally hidden from the public portfolio. Their records are complete and
 * untouched; move a slug into PROJECT_DISPLAY_ORDER above - and only once it is
 * approved for publication - to bring that project back onto the site:
 *
 * "m6lob",
 * "teens-hangouts",
 * "inovara",
 * "uzex",
 * "vooo-menu",
 * "vending",
 * "shopisonic",
 * "m3lesh",
 * "hafawa",
 * "saharad",
 */

/**
 * Every project record in the repository, published or not. Deliberately not
 * exported: public surfaces read `projects` below so that the approved list
 * stays the one gate on visibility.
 *
 * Edit the data in `src/data/projects.json` (English, and the single source of
 * every FACT) plus one prose file per Arabic market, keyed by the project
 * `slug`: `src/data/projects.ar-eg.json` and `src/data/projects.ar-sa.json`.
 */
const allProjects = projectsData as unknown as Project[];

const projectsBySlug = new Map(allProjects.map((project) => [project.slug, project]));

/**
 * The public projects, resolved in approved order.
 *
 * A slug that matches no record throws instead of being skipped: filtering the
 * gap away would silently shrink the portfolio on a typo ("wafer-cash" for
 * "waffar-cash") and leave nothing to notice. The list is static, so the error
 * names the offending slug on the first load in dev, preview or production.
 */
export const projects: Project[] = PROJECT_DISPLAY_ORDER.map((slug) => {
  const project = projectsBySlug.get(slug);
  if (!project) {
    throw new Error(
      `PROJECT_DISPLAY_ORDER lists "${slug}", which has no record in src/data/projects.json.`
    );
  }
  return project;
});

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
 * Client, tech stack and links are language-neutral and kept as-is; so are the
 * brand name and period, unless the market file carries its own `title`/`year`.
 */
export function localizeProject(p: Project, lang: string): Project {
  const copy = MARKET_COPY[marketFromLanguage(lang)];
  if (!copy) return p;
  const ar = copy[p.slug];
  if (!ar) return p;
  return {
    ...p,
    title: ar.title ?? p.title,
    year: ar.year ?? p.year,
    industry: ar.industry ?? p.industry,
    country: ar.country ?? p.country,
    description: ar.description ?? p.description,
    cardDescription: ar.cardDescription ?? p.cardDescription,
    overview: ar.overview ?? p.overview,
    statusNote: ar.statusNote ?? p.statusNote,
    plannedExpansion: ar.plannedExpansion ?? p.plannedExpansion,
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
  // "EdTech" is the industry a learning product is usually labelled with and does
  // not contain the substring "education", so it needs its own needle here.
  education: ["education", "edtech"],
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
