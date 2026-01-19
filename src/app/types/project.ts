export interface ProjectPlatforms {
  website?: string;
  playStore?: string;
  appStore?: string;
  dashboard?: string;
}

export interface ProjectType {
  coverImg: string;
  name: string;
  platforms?: ProjectPlatforms;
}
