import { Link } from 'react-router-dom';
import { Linkedin, Github, Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Logo } from './Logo';
import company from '../data/company.json';
import { getContentScript, marketFromLanguage } from '../lib/marketLocale';

// Contact details and social links come from src/data/company.json (easy to edit).
const socials = [
  { key: 'LinkedIn', href: company.social.linkedin, Icon: Linkedin },
  { key: 'GitHub', href: company.social.github, Icon: Github },
  { key: 'Facebook', href: company.social.facebook, Icon: Facebook },
  { key: 'Instagram', href: company.social.instagram, Icon: Instagram },
];

export function Footer() {
  const { t, i18n } = useTranslation('common');
  // The Cairo street address is a FACT with one form per writing system, not
  // market copy: it reads identically in /ar-eg and /ar-sa.
  const script = getContentScript(marketFromLanguage(i18n.language));
  const currentYear = new Date().getFullYear();
  const phones = (company.phones ?? [company.phone]).filter(Boolean) as string[];

  return (
    <footer className="bg-surface-subtle border-t border-line pt-20 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-6 hover:opacity-80 transition-opacity" aria-label="Oraixen">
              <Logo className="h-10 w-auto text-teal" />
            </Link>
            <p className="text-body mb-8 max-w-xs leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="flex flex-wrap gap-3">
              {socials.map(({ key, href, Icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-card border border-line flex items-center justify-center text-muted hover:text-teal hover:border-teal/40 hover:bg-teal/5 transition-all"
                  aria-label={t('footer.socialAria', { platform: key })}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-ink font-bold mb-6 text-sm uppercase tracking-wider">
              {t('footer.companyTitle')}
            </h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-body hover:text-ink transition-colors text-sm">{t('footer.links.about')}</Link></li>
              <li><Link to="/services" className="text-body hover:text-ink transition-colors text-sm">{t('footer.links.services')}</Link></li>
              <li><Link to="/projects" className="text-body hover:text-ink transition-colors text-sm">{t('footer.links.projects')}</Link></li>
              <li><Link to="/process" className="text-body hover:text-ink transition-colors text-sm">{t('footer.links.process')}</Link></li>
              <li><Link to="/contact" className="text-body hover:text-ink transition-colors text-sm">{t('footer.links.contact')}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-ink font-bold mb-6 text-sm uppercase tracking-wider">
              {t('footer.servicesTitle')}
            </h3>
            <ul className="space-y-4">
              <li><Link to="/services" className="text-body hover:text-ink transition-colors text-sm">{t('footer.services.systems')}</Link></li>
              <li><Link to="/services" className="text-body hover:text-ink transition-colors text-sm">{t('footer.services.web')}</Link></li>
              <li><Link to="/services" className="text-body hover:text-ink transition-colors text-sm">{t('footer.services.mobile')}</Link></li>
              <li><Link to="/services" className="text-body hover:text-ink transition-colors text-sm">{t('footer.services.ai')}</Link></li>
              <li><Link to="/services" className="text-body hover:text-ink transition-colors text-sm">{t('footer.services.hardware')}</Link></li>
              <li><Link to="/services" className="text-body hover:text-ink transition-colors text-sm">{t('footer.services.modernization')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-ink font-bold mb-6 text-sm uppercase tracking-wider">
              {t('footer.contactTitle')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center text-body text-sm">
                <Mail size={18} className="me-3 text-teal shrink-0" />
                <a href={`mailto:${company.email}`} className="hover:text-ink transition-colors" dir="ltr">
                  {company.email}
                </a>
              </li>
              {phones.map((phone) => (
                <li key={phone} className="flex items-center text-body text-sm">
                  <Phone size={18} className="me-3 text-teal shrink-0" />
                  <a href={`tel:${phone}`} className="hover:text-ink transition-colors" dir="ltr">
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-start text-body text-sm">
                <MapPin size={18} className="me-3 mt-0.5 text-teal shrink-0" />
                <span>{company.location[script]}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-line pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted">
          <p>{t('footer.copyright', { year: currentYear })}</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-ink transition-colors">{t('footer.privacy')}</Link>
            <Link to="/terms" className="hover:text-ink transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
