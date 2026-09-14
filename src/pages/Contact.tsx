import { useEffect, useRef, useState, type FormEvent, type SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { AuroraBackground, FloatingShapes, SpotlightCard, Reveal } from '../components/visual';
import { Eyebrow } from '../components/ui';
import { Seo } from '../components/Seo';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import company from '../data/company.json';
import { getContentScript, marketFromLanguage } from '../lib/marketLocale';
import { trackContactMethodClick, trackEvent } from '../lib/analytics';

/** Stable analytics id for the lead form — never a translated string. */
const FORM_ID = 'contact_lead_form';

type FormStage = 'identity' | 'qualification' | 'message';

/**
 * Maps real form fields to funnel stages. Acts as the analytics allowlist too:
 * anything not listed here — notably the `company_website` honeypot — can never
 * produce an event.
 */
const FIELD_STAGES: Record<string, FormStage> = {
  name: 'identity',
  email: 'identity',
  company: 'qualification',
  budget: 'qualification',
  timeline: 'qualification',
  message: 'message',
};

/** Controlled, low-cardinality failure categories. Never server text. */
type LeadErrorType = 'network_error' | 'http_error' | 'invalid_response' | 'application_error';

export function Contact() {
  const { t, i18n } = useTranslation('contact');
  // Factual address, one form per writing system (see Footer).
  const script = getContentScript(marketFromLanguage(i18n.language));
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Per-form-instance analytics dedupe. Cleared whenever a new blank form is
  // shown so a second enquiry reports its own full funnel.
  const startedRef = useRef(false);
  const stagesRef = useRef<Set<FormStage>>(new Set());
  const invalidFieldsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (submitted) return;
    startedRef.current = false;
    stagesRef.current.clear();
    invalidFieldsRef.current.clear();
  }, [submitted]);

  /**
   * First genuine interaction with a real field opens the funnel and records
   * the deepest stage reached. Only the field's stable name is ever read —
   * never its value.
   */
  const handleFieldInteraction = (e: SyntheticEvent) => {
    const target = e.target;
    if (
      !(target instanceof HTMLInputElement) &&
      !(target instanceof HTMLSelectElement) &&
      !(target instanceof HTMLTextAreaElement)
    ) {
      return;
    }

    const stage = FIELD_STAGES[target.name];
    if (!stage) return; // honeypot, buttons, anything unrecognised

    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent('lead_form_start', { form_id: FORM_ID });
    }
    if (!stagesRef.current.has(stage)) {
      stagesRef.current.add(stage);
      trackEvent('lead_form_progress', { form_id: FORM_ID, form_stage: stage });
    }
  };

  /**
   * Native HTML validation failure. Records which field blocked the visitor,
   * once per field per form instance — never the value or validationMessage.
   */
  const handleInvalid = (e: SyntheticEvent) => {
    const target = e.target;
    if (
      !(target instanceof HTMLInputElement) &&
      !(target instanceof HTMLSelectElement) &&
      !(target instanceof HTMLTextAreaElement)
    ) {
      return;
    }

    const fieldName = target.name;
    if (!FIELD_STAGES[fieldName]) return;
    if (invalidFieldsRef.current.has(fieldName)) return;

    invalidFieldsRef.current.add(fieldName);
    trackEvent('lead_form_validation_error', { form_id: FORM_ID, field_name: fieldName });
  };

  const trackLeadFormError = (errorType: LeadErrorType, httpStatus?: number) => {
    trackEvent('lead_form_error', {
      form_id: FORM_ID,
      error_type: errorType,
      ...(httpStatus === undefined ? {} : { http_status: httpStatus }),
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setError(null);
    setIsSubmitting(true);
    // Native validation has already passed, so this is a real attempt.
    trackEvent('lead_form_submit_attempt', { form_id: FORM_ID });

    // Classify once, so a single failed attempt produces exactly one event.
    let failure: { type: LeadErrorType; status?: number } | null = null;
    try {
      const res = await fetch('/contact.php', {
        method: 'POST',
        body: new FormData(form),
      });
      const data: { ok?: unknown } | null = await res.json().catch(() => null);
      if (!res.ok) {
        failure = { type: 'http_error', status: res.status };
      } else if (data === null || typeof data.ok !== 'boolean') {
        failure = { type: 'invalid_response', status: res.status };
      } else if (!data.ok) {
        failure = { type: 'application_error', status: res.status };
      }
    } catch {
      failure = { type: 'network_error' };
    }

    if (failure) {
      trackLeadFormError(failure.type, failure.status);
      setError(t('form.error'));
    } else {
      // Backend-confirmed lead only.
      trackEvent('generate_lead', { form_id: FORM_ID, lead_source: 'website_contact_form' });
      form.reset();
      setSubmitted(true);
    }
    setIsSubmitting(false);
  };

  const phones = (company.phones ?? [company.phone]).filter(Boolean) as string[];
  const infoCards: Array<{
    icon: typeof Mail;
    title: string;
    value?: string;
    values?: string[];
    hrefPrefix?: 'mailto' | 'tel';
    ltr?: boolean;
  }> = [
    { icon: Mail, title: t('info.email.label'), value: company.email, hrefPrefix: 'mailto', ltr: true },
    { icon: Phone, title: t('info.phone.label'), values: phones, hrefPrefix: 'tel', ltr: true },
    { icon: MapPin, title: t('info.location.label'), value: company.location[script] },
  ];

  /** Records only which channel was used — never the address or number. */
  const trackContactMethod = (hrefPrefix?: 'mailto' | 'tel') => {
    if (!hrefPrefix) return;
    trackContactMethodClick(hrefPrefix === 'mailto' ? 'email' : 'phone', 'contact_page');
  };

  const steps = t('next.steps', { returnObjects: true }) as string[];

  const budgetOptions = t('form.budget.options', { returnObjects: true }) as Array<{ value: string; label: string }>;
  const timelineOptions = t('form.timeline.options', { returnObjects: true }) as Array<{ value: string; label: string }>;

  const inputClasses =
    'w-full bg-card border border-line rounded-xl px-4 py-3 text-ink placeholder:text-faint focus:outline-none focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/20 transition-all';
  const labelClasses = 'block text-sm font-semibold text-ink mb-2';

  return (
    <div className="relative pt-24 sm:pt-28 min-h-screen overflow-hidden bg-surface">
      <Seo title={t('seo.title')} description={t('seo.description')} />
      <AuroraBackground intensity="hero" />
      <FloatingShapes />
      {/* Subtle light background: dotted grid + faint teal radial glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: 'radial-gradient(rgb(var(--line)) 1px, transparent 1px)',
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
              <h1 className="page-hero-title mt-6 mb-4 font-extrabold text-ink sm:mb-6">
                {t('title')}
              </h1>
              <p className="page-hero-sub mb-10 text-body sm:mb-12">
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
                          {card.values ? (
                            <ul className="space-y-1">
                              {card.values.map((v) => (
                                <li key={v}>
                                  <a
                                    href={card.hrefPrefix ? `${card.hrefPrefix}:${v.replace(/\s/g, '')}` : undefined}
                                    onClick={() => trackContactMethod(card.hrefPrefix)}
                                    className="text-body text-sm hover:text-ink transition-colors"
                                    dir={card.ltr ? 'ltr' : undefined}
                                  >
                                    {v}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          ) : card.hrefPrefix && card.value ? (
                            <a
                              href={`${card.hrefPrefix}:${card.value.replace(/\s/g, '')}`}
                              onClick={() => trackContactMethod(card.hrefPrefix)}
                              className="text-body text-sm hover:text-ink transition-colors"
                              dir={card.ltr ? 'ltr' : undefined}
                            >
                              {card.value}
                            </a>
                          ) : (
                            <p
                              className="text-body text-sm"
                              dir={card.ltr ? 'ltr' : undefined}
                            >
                              {card.value}
                            </p>
                          )}
                        </div>
                      </div>
                    </SpotlightCard>
                  );
                })}
              </div>
            </Reveal>

            {/* What happens next */}
            <Reveal className="mt-12">
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
            <Reveal direction="left">
              <Card className="p-8 md:p-10">
                {submitted ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-teal/10 border border-teal/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} className="text-teal" />
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
                  <form
                    id="contact-lead-form"
                    onSubmit={handleSubmit}
                    onFocusCapture={handleFieldInteraction}
                    onChange={handleFieldInteraction}
                    onInvalidCapture={handleInvalid}
                    className="space-y-6"
                  >
                    {/* Honeypot: hidden from real users; bots that fill it are rejected server-side. */}
                    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                      <label htmlFor="company_website">Don't fill this in</label>
                      <input
                        type="text"
                        id="company_website"
                        name="company_website"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className={labelClasses}>
                          {t('form.name.label')} <span className="text-teal">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
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
                          name="email"
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
                        name="company"
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
                          name="budget"
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
                          name="timeline"
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
                        name="message"
                        rows={5}
                        required
                        className={`${inputClasses} resize-none`}
                        placeholder={t('form.message.placeholder')}
                      />
                    </div>

                    {error && (
                      <p
                        role="alert"
                        className="text-sm text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl px-4 py-3 text-center"
                      >
                        {error}
                      </p>
                    )}

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
