import { useState } from 'react';
import { PROJECT_FALLBACK_IMAGE } from '../../lib/projects';

/**
 * Resolves the `<img>` source for a project and degrades to the neutral local
 * placeholder, covering all three ways a project can end up without artwork:
 * it ships no `imageUrl` at all, the file named by `imageUrl` is not in
 * `public/assets/projects/` yet, or the asset fails to load in the browser.
 *
 * Shared by the grid card and the case-study hero so both degrade identically,
 * and keyed on nothing but the URL - there is deliberately no per-slug branch
 * here, so adding a project never means touching this file.
 *
 * The failure is recorded as the URL that failed rather than a boolean, because
 * ProjectDetail keeps ONE mounted component across /projects/:slug navigations:
 * a boolean set on a broken image would follow the reader to the next project
 * and hide an asset that loads perfectly well.
 *
 * `onError` cannot loop. When it fires for the placeholder itself the recorded
 * URL is already `imageUrl`, so the state does not change and React re-renders
 * nothing; when there is no `imageUrl` it records nothing at all.
 */
export function useProjectImage(imageUrl?: string): {
  src: string;
  onError: () => void;
} {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const failed = !imageUrl || failedUrl === imageUrl;

  return {
    src: failed ? PROJECT_FALLBACK_IMAGE : imageUrl,
    onError: () => {
      if (imageUrl) setFailedUrl(imageUrl);
    },
  };
}
