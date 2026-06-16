import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { AuroraBackground, FloatingShapes, SpotlightCard, Reveal } from '../components/visual';
import { Eyebrow } from '../components/ui';
import { Seo } from '../components/Seo';
import { Mail, MapPin, Phone, CheckCircle } from 'lucide-react';

export function Contact() {
  const { t } = useTranslation('contact');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const infoCards = [
    { icon: Mail, title: t('info.email.label'), value: 'support@oraixen.com', ltr: true },
    { icon: Phone, title: t('info.phone.label'), value: '+1-313-482-0813', ltr: true },
    { icon: MapPin, title: t('info.location.label'), value: t('info.location.value'), ltr: false },
  ];

  const steps = t('next.steps', { returnObjects: true }) as string[];

  const budgetOptions = t('form.budget.options', { returnObjects: true }) as Array<{ value: string; label: string }>;
  const timelineOptions = t('form.timeline.options', { returnObjects: true }) as Array<{ value: string; label: string }>;

  const inputClasses =
    'w-full bg-card border border-line rounded-xl px-4 py-3 text-ink placeholder:text-faint focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all';
  const labelClasses = 'block text-sm font-semibold text-ink mb-2';

  return (
    <div className="relative pt-20 min-h-screen overflow-hidden bg-surface">
      <Seo title={t('seo.title')} description={t('seo.description')} />
      <AuroraBackground intensity="hero" />
      <FloatingShapes />
      {/* Subtle light background: dotted grid + faint teal radial glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: 'radial-gradient(#E2E8F0 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />
        <div className="absolute top-0 start-1/4 h-[400px] w-[400px] rounded-full bg-teal/5 blur-3xl" />
      </div>
      <Section className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Contact Info */}
          <div>
            <Reveal>
              <Eyebrow>{t('eyebrow')}</Eyebrow>
              <h1 className="mt-6 text-4xl md:text-6xl font-extrabold text-ink mb-6 leading-tight">
                {t('title')}
              </h1>
              <p className="text-xl text-body mb-12 leading-relaxed">
                {t('subtitle')}
              </p>

              <div className="space-y-5">
                {infoCards.map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <SpotlightCard key={i}>
                      <div className="p-6 flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-skyblue/15 to-teal/10 border border-teal/15 flex items-center justify-center shrink-0">
                          <Icon className="text-teal" size={22} />
                        </div>
                        <div>
                          <h3 className="text-ink font-bold mb-1">{card.title}</h3>
                          <p
                            className="text-body text-sm"
                            dir={card.ltr ? 'ltr' : undefined}
                          >
                            {card.value}
                          </p>
                        </div>
                      </div>
                    </SpotlightCard>
                  );
                })}
              </div>
            </Reveal>

            {/* What happens next */}
            <Reveal delay={0.12} className="mt-12">
              <span className="text-sm font-semibold text-teal uppercase tracking-wide">
                {t('next.eyebrow')}
              </span>
              <ol className="mt-5 space-y-5">
                {steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-full bg-teal/10 text-teal border border-teal/15 flex items-center justify-center text-sm font-bold shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-body leading-relaxed pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          {/* Form */}
          <div>
            <Reveal delay={0.2} direction="left">
              <Card className="p-8 md:p-10">
                {submitted ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-green-50 border border-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-ink mb-4">
                      {t('success.title')}
                    </h3>
                    <p className="text-body mb-8 leading-relaxed">
                      {t('success.body')}
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="outline">
                      {t('success.again')}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className={labelClasses}>
                          {t('form.name.label')} <span className="text-teal">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          className={inputClasses}
                          placeholder={t('form.name.placeholder')}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className={labelClasses}>
                          {t('form.email.label')} <span className="text-teal">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          dir="ltr"
                          className={`${inputClasses} text-start`}
                          placeholder={t('form.email.placeholder')}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className={labelClasses}>
                        {t('form.company.label')}
                      </label>
                      <input
                        type="text"
                        id="company"
                        className={inputClasses}
                        placeholder={t('form.company.placeholder')}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="budget" className={labelClasses}>
                          {t('form.budget.label')}
                        </label>
                        <select
                          id="budget"
                          defaultValue=""
                          className={`${inputClasses} appearance-none cursor-pointer`}
                        >
                          <option value="" disabled>
                            {t('form.budget.placeholder')}
                          </option>
                          {budgetOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="timeline" className={labelClasses}>
                          {t('form.timeline.label')}
                        </label>
                        <select
                          id="timeline"
                          defaultValue=""
                          className={`${inputClasses} appearance-none cursor-pointer`}
                        >
                          <option value="" disabled>
                            {t('form.timeline.placeholder')}
                          </option>
                          {timelineOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className={labelClasses}>
                        {t('form.message.label')} <span className="text-teal">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        required
                        className={`${inputClasses} resize-none`}
                        placeholder={t('form.message.placeholder')}
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? t('form.submitting') : t('form.submit')}
                    </Button>

                    <p className="text-sm text-muted text-center">
                      {t('form.reassurance')}
                    </p>
                    <p className="text-xs text-faint text-center">
                      {t('form.privacy')}
                    </p>
                  </form>
                )}
              </Card>
            </Reveal>
          </div>
        </div>
      </Section>
    </div>
  );
}
