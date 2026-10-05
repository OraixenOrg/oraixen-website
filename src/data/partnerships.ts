import type { MarketLocale } from '../lib/marketLocale';

/**
 * Oraixen's public partnerships, as shown in the home-page Partnerships
 * section.
 *
 * PARTNERSHIPS ARE NOT PROJECTS. A partnership is a commercial relationship;
 * a project is delivered work with a case study. They are listed, ordered and
 * rendered independently, so nothing here touches `src/data/projects.json`,
 * `PROJECT_DISPLAY_ORDER`, the project grid or the case-study routes. A company
 * may hold both roles at once: Maat is a published project AND a partner, and
 * removing either role would misstate the relationship.
 *
 * TypeScript rather than JSON, unlike the project data, for one reason: almost
 * every field here is OPTIONAL, because the relationship facts the owner has
 * confirmed differ per partner. A typed module states that directly and makes
 * the compiler enforce it; JSON cannot express "this key may be absent" at all.
 *
 * ## The only rule for editing this file
 *
 * Every value below is an owner-confirmed public fact. Nothing in it may be
 * inferred, guessed, researched or filled in from a partner's website. An
 * absent field means "not confirmed yet", and the card is designed to look
 * complete without it, so leaving it out is always the correct answer. Do not
 * add a start year, a category, a website, a scope of services, a country, an
 * exclusivity claim, or any equity, joint-venture or subsidiary wording unless
 * the owner has supplied it.
 */

/**
 * One value per market id. The market is the i18next language id, resolved with
 * `marketFromLanguage(i18n.language)` - the same shape `src/data/stats.json`
 * uses for its captions.
 *
 * Used only for partner-specific COPY. Generic section vocabulary (the heading,
 * the subtitle, the call to action) lives in the `home` i18n namespace instead,
 * so it is translated once rather than once per partner.
 */
export type LocalizedPartnershipText = Record<MarketLocale, string>;

export interface Partnership {
  /** Stable key. Also the logo filename stem in `public/assets/partners/`. */
  id: string;
  /**
   * The partner's own public name, spelled the way the partner spells it.
   * Never normalized against a similar-looking name elsewhere in the repo.
   */
  name: string;
  /** Absolute public path under `/assets/partners/`. */
  logo: string;
  /**
   * How this specific relationship is described, in the pill above the name.
   *
   * Per-partner copy rather than a shared kind: the owner names each
   * relationship for what it actually is ("Strategic Sourcing & Logistics
   * Partner", "Premium Design & Branding Partner"), so no two partners share a
   * label and there is nothing to translate once centrally.
   */
  relationship: LocalizedPartnershipText;
  /** What the partnership actually covers. Omitted unless owner-confirmed. */
  description?: LocalizedPartnershipText;
  /** The partner's own site. Omitted unless owner-confirmed; renders the CTA. */
  website?: string;
  /** The partner's field, e.g. a sector. Omitted unless owner-confirmed. */
  category?: LocalizedPartnershipText;
  /** Where the partner operates from. Omitted unless owner-confirmed. */
  country?: LocalizedPartnershipText;
  /**
   * Four-digit year the partnership began, e.g. '2024'. Supported for later
   * use and currently set by no partner: no start date has been confirmed for
   * any of them, and a badge reading a guessed year is worse than no badge.
   */
  since?: string;
}

/**
 * Neutral stand-in for a partner whose PNG is not in
 * `public/assets/partners/` yet.
 *
 * Shared with the project grid on purpose rather than duplicated: that asset is
 * already stroke-only, transparent and deliberately unbranded, which is exactly
 * what is needed here. Anything resembling a mark would be read as the
 * partner's own logo on the card it stands in for.
 */
export const PARTNER_FALLBACK_LOGO = '/assets/project-placeholder.svg';

/**
 * Display order, as approved. Not alphabetical and not re-sorted at render
 * time, so this array is the single place the order is decided.
 */
export const partnerships: Partnership[] = [
  {
    id: 'maat-vip',
    name: 'Maat VIP',
    logo: '/assets/partners/maat-vip.png',
    website: 'https://maat.vip/',
    relationship: {
      en: 'Strategic Sourcing & Logistics Partner',
      'ar-eg': 'شريك استراتيجي للتوريد واللوجستيات',
      'ar-sa': 'شريك استراتيجي للتوريد والخدمات اللوجستية',
    },
    country: {
      en: 'China',
      'ar-eg': 'الصين',
      'ar-sa': 'الصين',
    },
    category: {
      en: 'Supply Chain & Sourcing',
      'ar-eg': 'التوريد وسلاسل الإمداد',
      'ar-sa': 'سلاسل الإمداد والتوريد',
    },
    description: {
      en: "A strategic sourcing and logistics partnership connecting Oraixen's technology delivery with direct factory sourcing, manufacturing coordination, quality-control workflows, and international logistics in China.",
      'ar-eg':
        'شراكة استراتيجية في التوريد واللوجستيات بتربط قدرات أوريكسن التقنية بالتوريد المباشر من المصانع وتنسيق التصنيع وإجراءات مراجعة الجودة والشحن الدولي في الصين.',
      'ar-sa':
        'شراكة استراتيجية في التوريد والخدمات اللوجستية تربط قدرات أوريكسن التقنية بالتوريد المباشر من المصانع وتنسيق التصنيع وإجراءات مراقبة الجودة والشحن الدولي في الصين.',
    },
  },
  {
    id: 'unamed-solutions',
    name: 'Unamed Solutions',
    logo: '/assets/partners/unamed-solutions.png',
    // The owner supplied this row headed "[Partner Name]" and, in the same
    // message, the Facebook page below for Unamed Solutions. It is the only one
    // of the three partners the row can describe. Worth a second look if the
    // design partner ever turns out to be a fourth company.
    website: 'https://www.facebook.com/UnamedSolutions',
    relationship: {
      en: 'Premium Design & Branding Partner',
      'ar-eg': 'شريك متميز للتصميم والهوية التجارية',
      'ar-sa': 'شريك متميز للتصميم والهوية التجارية',
    },
    country: {
      en: 'Canada',
      'ar-eg': 'كندا',
      'ar-sa': 'كندا',
    },
    category: {
      en: 'Design & Branding',
      'ar-eg': 'التصميم والهوية التجارية',
      'ar-sa': 'التصميم والهوية التجارية',
    },
    description: {
      en: "A premium design and branding partnership combining senior Canadian design leadership with Oraixen's end-to-end technology development capability.",
      'ar-eg':
        'شراكة في التصميم والهوية التجارية بتجمع خبرة تصميم كندية متقدمة مع قدرة أوريكسن على التطوير التقني من الأول للإطلاق.',
      'ar-sa':
        'شراكة في التصميم والهوية التجارية تجمع خبرة تصميم كندية متقدمة مع قدرة أوريكسن على التطوير التقني من البداية حتى الإطلاق.',
    },
  },
  {
    id: 'inovara',
    name: 'Inovara',
    logo: '/assets/partners/inovara.png',
    // Owner-confirmed as the company behind the supplied inovara.net wordmark.
    // The owner has referred to it as Invora and Envora as well; Inovara is the
    // spelling confirmed against the logo and against the existing `inovara`
    // and `vending` projects in src/data/projects.json. Like Maat, it holds
    // both roles - a published project and a partner - and neither replaces
    // the other.
    website: 'https://inovara.net',
    relationship: {
      en: 'Smart Technology & Hardware Partner',
      'ar-eg': 'شريك التقنيات الذكية والأجهزة',
      'ar-sa': 'شريك التقنيات الذكية والأجهزة',
    },
    country: {
      en: 'Egypt',
      'ar-eg': 'مصر',
      'ar-sa': 'مصر',
    },
    category: {
      en: 'Smart Hardware & IoT',
      'ar-eg': 'الأجهزة الذكية وإنترنت الأشياء',
      'ar-sa': 'الأجهزة الذكية وإنترنت الأشياء',
    },
    description: {
      en: "A smart technology partnership combining Oraixen's system-development capability with specialized hardware, IoT, vending-machine, and physical-device integration expertise.",
      'ar-eg':
        'شراكة في التقنيات الذكية بتجمع قدرة أوريكسن على تطوير الأنظمة مع خبرة متخصصة في الأجهزة وإنترنت الأشياء وماكينات البيع الذاتي وتكامل الأجهزة.',
      'ar-sa':
        'شراكة في التقنيات الذكية تجمع قدرة أوريكسن على تطوير الأنظمة مع خبرة متخصصة في الأجهزة وإنترنت الأشياء وماكينات البيع الذاتي وتكامل الأجهزة المادية.',
    },
  },
];
