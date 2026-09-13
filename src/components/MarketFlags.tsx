/**
 * Flag marks for the market selector.
 *
 * The real assets live in public/flags/ and are served as static files, so no
 * bundler import, no icon dependency and no remote request is involved.
 *
 * They are purely decorative: each menu row and the trigger already carry the
 * market name as visible text, so the images are hidden from assistive tech
 * rather than repeating that name.
 *
 * Sized to 18x12 (3:2) with object-cover. The sources are 36x36 with the flag
 * occupying the middle band, so covering trims the transparent padding and
 * about one unit of flag at the top and bottom — the flag reads correctly at
 * navbar size without letterboxing.
 */

interface FlagProps {
  className?: string;
}

const FLAG_CLASS =
  'h-3 w-[18px] shrink-0 rounded-[2px] object-cover ring-1 ring-black/10 dark:ring-white/15';

export function EgyptFlag({ className = '' }: FlagProps) {
  return (
    <img
      src="/flags/egypt.svg"
      alt=""
      aria-hidden="true"
      width={18}
      height={12}
      decoding="async"
      className={`${FLAG_CLASS} ${className}`}
    />
  );
}

export function SaudiFlag({ className = '' }: FlagProps) {
  return (
    <img
      src="/flags/saudi-arabia.svg"
      alt=""
      aria-hidden="true"
      width={18}
      height={12}
      decoding="async"
      className={`${FLAG_CLASS} ${className}`}
    />
  );
}
