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

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  year: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  metrics: ProjectMetric[];
  techStack: string[];
  highlights: string[];
  imageUrl: string;
  /** Use 'contain' for logos/SVGs so they display with correct aspect ratio and dimensions */
  imageFit?: 'cover' | 'contain';
  confidential: boolean;
  featured: boolean;
  category: 'Mobile' | 'Web' | 'Platform' | 'Hardware' | 'AI';
  platforms?: ProjectPlatforms;
}