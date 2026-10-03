export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectPlatforms {
  website?: string;
  playStore?: string;
  appStore?: string;
  dashboard?: string;
}

/**
 * One numbered stage of the product's end-to-end flow, rendered as an ordered
 * list under "How the system works".
 */
export interface ProjectWorkflowStep {
  title: string;
  description: string;
}

/** One scope of work Oraixen owned on the engagement. */
export interface ProjectResponsibility {
  title: string;
  description?: string;
}

/**
 * A fact about how the PRODUCT works that the client has confirmed, and NOT a usage,
 * adoption or growth figure. Rendered under "Verified product proof", deliberately
 * separate from `metrics` so a workflow fact is never presented as a business result.
 */
export interface ProjectProofPoint {
  value: string;
  label: string;
  description?: string;
}

/**
 * The narrative sentence that opens each story section. The section LABEL
 * ("The challenge") comes from i18n; this is the project-specific claim under it.
 */
export interface ProjectHeadings {
  challenge?: string;
  build?: string;
  outcome?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  /**
   * Optional: a verified project may have no publicly confirmed year or period.
   * Never substitute a placeholder here - the overview omits the row instead.
   */
  year?: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  /** Optional: a project may have no verified usage metrics at all. */
  metrics?: ProjectMetric[];
  techStack: string[];
  /** Optional: verified case studies use `systemComponents` instead. */
  highlights?: string[];
  /**
   * Optional: a project with no owner-supplied brand asset falls back to the
   * neutral placeholder in `PROJECT_FALLBACK_IMAGE` rather than a broken image.
   */
  imageUrl?: string;
  /** Use 'contain' for logos/SVGs so they display with correct aspect ratio and dimensions */
  imageFit?: 'cover' | 'contain';
  confidential: boolean;
  featured: boolean;
  category: 'Mobile' | 'Web' | 'Platform' | 'Hardware' | 'AI';
  platforms?: ProjectPlatforms;

  // ---------------------------------------------------------------------------
  // Verified case study (all optional, all additive).
  //
  // A project carrying any of `workflow`, `responsibilities`, `systemComponents`
  // or `proofPoints` is rendered with the business case-study layout; every other
  // project keeps the original challenge / solution / impact presentation.
  // ---------------------------------------------------------------------------

  /** Market the product ships in, e.g. "Egypt". Shown in the overview band. */
  country?: string;
  /** Shorter line for the project grid card; falls back to `description`. */
  cardDescription?: string;
  /** Supporting paragraph under the hero, in the overview band. */
  overview?: string;
  headings?: ProjectHeadings;
  workflow?: ProjectWorkflowStep[];
  responsibilities?: ProjectResponsibility[];
  /** System-at-a-glance list: the delivered parts of the platform. */
  systemComponents?: string[];
  proofPoints?: ProjectProofPoint[];
}

/** True when a project carries the richer, owner-verified case-study structure. */
export function isCaseStudy(project: Project): boolean {
  return Boolean(
    project.workflow?.length ||
      project.responsibilities?.length ||
      project.systemComponents?.length ||
      project.proofPoints?.length
  );
}
