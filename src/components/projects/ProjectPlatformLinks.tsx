import { type ReactNode } from 'react';
import { ExternalLink, Globe, Monitor, Smartphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ProjectPlatforms } from '../../types/project';

interface ProjectPlatformLinksProps {
  platforms: ProjectPlatforms;
}

/**
 * The live destinations of a shipped product, as a vertical list of outbound links.
 * Shared by the legacy project layout and the verified case-study layout so both
 * render identical, keyboard-reachable link rows.
 */
export function ProjectPlatformLinks({ platforms }: ProjectPlatformLinksProps) {
  const { t } = useTranslation('projectDetail');

  const entries: Array<{ href: string; label: string; icon: ReactNode }> = [];
  if (platforms.website) {
    entries.push({ href: platforms.website, label: t('platforms.website'), icon: <Globe size={20} className="text-teal" /> });
  }
  if (platforms.playStore) {
    entries.push({ href: platforms.playStore, label: t('platforms.playStore'), icon: <Smartphone size={20} className="text-teal" /> });
  }
  if (platforms.appStore) {
    entries.push({ href: platforms.appStore, label: t('platforms.appStore'), icon: <Smartphone size={20} className="text-teal" /> });
  }
  if (platforms.dashboard) {
    entries.push({ href: platforms.dashboard, label: t('platforms.dashboard'), icon: <Monitor size={20} className="text-teal" /> });
  }

  return (
    <div className="space-y-3">
      {entries.map((entry) => (
        <a
          key={entry.href}
          href={entry.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-4 p-4 bg-surface-subtle rounded-xl border border-line hover:bg-card hover:border-teal/30 focus-visible:outline-none focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/20 transition-all group"
        >
          <span className="flex items-center gap-3 min-w-0">
            {entry.icon}
            <span className="text-ink font-medium truncate">{entry.label}</span>
          </span>
          <ExternalLink size={16} className="text-faint group-hover:text-teal transition-colors rtl-flip shrink-0" />
        </a>
      ))}
    </div>
  );
}
