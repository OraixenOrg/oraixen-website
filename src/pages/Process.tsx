import { Section } from '../components/Section';
import { FadeIn } from '../components/FadeIn';
import { Stagger } from '../components/Stagger';
import { Card } from '../components/Card';
import { CheckCircle, MessageSquare, ShieldCheck, LifeBuoy } from 'lucide-react';
import { m } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description:
      'We begin by understanding your business goals, target audience, and technical requirements. We define the scope, timeline, and success metrics.',
    items: ['Requirements Gathering', 'Market Research', 'Technical Feasibility', 'Project Roadmap'],
  },
  {
    number: '02',
    title: 'Design & Prototyping',
    description:
      'Our designers create intuitive, high-fidelity prototypes. We focus on user experience (UX) and user interface (UI) to ensure the product is both functional and beautiful.',
    items: ['Wireframing', 'UI/UX Design', 'Interactive Prototypes', 'Design System'],
  },
  {
    number: '03',
    title: 'Development',
    description:
      'We build your product using modern, scalable technologies. Our agile process ensures regular updates and flexibility to adapt to changes.',
    items: ['Frontend & Backend', 'API Integration', 'Database Design', 'Code Reviews'],
  },
  {
    number: '04',
    title: 'Quality Assurance',
    description:
      'Rigorous testing guarantees a bug-free, reliable product. We test for performance, security, and compatibility across all devices.',
    items: ['Automated Testing', 'Manual Testing', 'Security Audits', 'Performance Tuning'],
  },
  {
    number: '05',
    title: 'Launch & Support',
    description: 'We handle the deployment and provide ongoing support to ensure your product continues to perform at its best.',
    items: ['Deployment', 'Monitoring', 'Maintenance', 'Feature Updates'],
  },
];

function StepContent({
  step,
  align = 'left',
}: {
  step: (typeof steps)[number];
  align?: 'left' | 'right';
}) {
  const isRight = align === 'right';

  return (
    <FadeIn>
      <div
        className={[
          'max-w-xl',
          'mx-auto',
          'text-center',
          'lg:mx-0',
          isRight ? 'lg:text-right lg:ml-auto' : 'lg:text-left',
        ].join(' ')}
      >
        <span className="text-skyblue font-bold text-base sm:text-lg mb-3 block tracking-wider">{step.number}</span>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-5 leading-tight">
          {step.title}
        </h2>

        <p className="text-gray-400 mb-6 md:mb-8 text-base sm:text-lg leading-relaxed">{step.description}</p>

        <ul
          className={[
            'space-y-3',
            'inline-block',
            'text-left',
            isRight ? 'lg:text-right' : 'lg:text-left',
          ].join(' ')}
        >
          {step.items.map((item, i) => (
            <li
              key={i}
              className={[
                'flex items-center text-gray-300 text-sm sm:text-base',
                isRight ? 'lg:justify-end' : 'lg:justify-start',
              ].join(' ')}
            >
              {/* icon */}
              <div
                className={[
                  'w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-skyblue/10 border border-skyblue/30',
                  'flex items-center justify-center shrink-0',
                  isRight ? 'mr-3 lg:mr-0 lg:ml-3 lg:order-2' : 'mr-3',
                ].join(' ')}
              >
                <CheckCircle size={12} className="sm:w-3.5 sm:h-3.5 text-skyblue" />
              </div>

              {/* text */}
              <span className={isRight ? 'lg:order-1' : ''}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </FadeIn>
  );
}

function CenterIndicator() {
  return (
    <div className="relative z-10 flex justify-center">
      <m.div
        className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-skyblue to-azure shadow-lg shadow-skyblue/30 border-2 border-white/10"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ delay: 0.15, duration: 0.45, ease: 'easeOut' }}
      >
        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full shadow-lg" />
      </m.div>
    </div>
  );
}

export function Process() {
  return (
    <div className="pt-20 min-h-screen bg-inkblack">
      {/* Header */}
      <Section className="bg-gradient-to-b from-inkblack to-inkblack-light">
        <div className="text-center max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-skyblue/10 border border-skyblue/20 mb-6 md:mb-8 backdrop-blur-sm">
              <span className="text-sm font-medium text-skyblue">How We Work</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Our Process
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed">
              A proven methodology for delivering excellence, every time.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* Steps */}
      <Section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative py-8 lg:py-12">
            {/* Center line (aligned with center col) */}
            <div className="hidden lg:block absolute left-1/2 top-12 bottom-12 w-px bg-gradient-to-b from-skyblue/50 via-skyblue/30 to-transparent -translate-x-1/2" />

            <div className="space-y-20 md:space-y-24 lg:space-y-28">
              {steps.map((step, index) => {
                const isEven = index % 2 === 0;

                return (
                  <div key={index} className="relative">
                    {/* Mobile layout */}
                    <div className="flex flex-col items-center gap-8 lg:hidden">
                      <CenterIndicator />
                      <StepContent step={step} align="left" />
                    </div>

                    {/* Desktop grid layout (fixed alignment both sides) */}
                    <div className="hidden lg:grid grid-cols-12 items-center gap-6">
                      {/* Left slot */}
                      <div className="col-span-5">
                        {!isEven ? <div className="h-px" /> : <StepContent step={step} align="right" />}
                      </div>

                      {/* Center slot */}
                      <div className="col-span-2 flex justify-center">
                        <CenterIndicator />
                      </div>

                      {/* Right slot */}
                      <div className="col-span-5">
                        {isEven ? <div className="h-px" /> : <StepContent step={step} align="left" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* Why Choose */}
      <Section className="bg-gradient-to-b from-inkblack via-inkblack-light to-inkblack">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
                Why Choose Oraixen
              </h2>
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Our commitment to your success goes beyond delivery.
              </p>
            </FadeIn>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <MessageSquare size={36} />,
                title: 'Transparent Communication',
                desc: 'Weekly sprints, regular demos, and a dedicated Slack channel for your team.',
              },
              {
                icon: <ShieldCheck size={36} />,
                title: 'Reliability Guaranteed',
                desc: 'We stand by our code with a 6-month bug-free warranty on all deliverables.',
              },
              {
                icon: <LifeBuoy size={36} />,
                title: 'Long-term Support',
                desc: 'Flexible maintenance packages to keep your software secure and up-to-date.',
              },
            ].map((item, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.4, ease: 'easeOut' }}
              >
                <Card className="p-8 md:p-10 text-center h-full bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-skyblue/30 transition-colors">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-skyblue/10 to-azure/10 border border-skyblue/20 flex items-center justify-center text-skyblue mx-auto mb-5 md:mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">{item.title}</h3>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed">{item.desc}</p>
                </Card>
              </m.div>
            ))}
          </Stagger>
        </div>
      </Section>
    </div>
  );
}
