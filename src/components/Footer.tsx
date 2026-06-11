import { Link } from 'react-router-dom';
import { Linkedin, Github, Facebook, Instagram, Mail, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const socials = [
  { key: 'LinkedIn', href: 'https://linkedin.com/company/oraixen', Icon: Linkedin },
  { key: 'GitHub', href: 'https://github.com/oraixen', Icon: Github },
  { key: 'Facebook', href: 'https://facebook.com/oraixen', Icon: Facebook },
  { key: 'Instagram', href: 'https://instagram.com/oraixen', Icon: Instagram },
];

export function Footer() {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-subtle border-t border-line pt-20 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div>
            <Link to="/" className="text-2xl font-bold tracking-tighter text-ink mb-6 block hover:text-teal transition-colors">
              ORAIXEN
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
              <li><Link to="/services" className="text-body hover:text-ink transition-colors text-sm">{t('footer.services.mobile')}</Link></li>
              <li><Link to="/services" className="text-body hover:text-ink transition-colors text-sm">{t('footer.services.web')}</Link></li>
              <li><Link to="/services" className="text-body hover:text-ink transition-colors text-sm">{t('footer.services.corporate')}</Link></li>
              <li><Link to="/services" className="text-body hover:text-ink transition-colors text-sm">{t('footer.services.hardware')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-ink font-bold mb-6 text-sm uppercase tracking-wider">
              {t('footer.contactTitle')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start text-body text-sm">
                <MapPin size={18} className="me-3 mt-0.5 text-teal shrink-0" />
                <span>{t('footer.location')}</span>
              </li>
              <li className="flex items-center text-body text-sm">
                <Mail size={18} className="me-3 text-teal shrink-0" />
                <a href="mailto:support@oraixen.com" className="hover:text-ink transition-colors">
                  {t('footer.email')}
                </a>
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
