import React from 'react';
import { Section } from '../components/Section';
import { FadeIn } from '../components/FadeIn';
import { Stagger } from '../components/Stagger';
import { Card } from '../components/Card';
import { CheckCircle, MessageSquare, ShieldCheck, LifeBuoy } from 'lucide-react';
import { m } from 'framer-motion';
export function Process() {
  const steps = [{
    number: '01',
    title: 'Discovery & Strategy',
    description: 'We begin by understanding your business goals, target audience, and technical requirements. We define the scope, timeline, and success metrics.',
    items: ['Requirements Gathering', 'Market Research', 'Technical Feasibility', 'Project Roadmap']
  }, {
    number: '02',
    title: 'Design & Prototyping',
    description: 'Our designers create intuitive, high-fidelity prototypes. We focus on user experience (UX) and user interface (UI) to ensure the product is both functional and beautiful.',
    items: ['Wireframing', 'UI/UX Design', 'Interactive Prototypes', 'Design System']
  }, {
    number: '03',
    title: 'Development',
    description: 'We build your product using modern, scalable technologies. Our agile process ensures regular updates and flexibility to adapt to changes.',
    items: ['Frontend & Backend', 'API Integration', 'Database Design', 'Code Reviews']
  }, {
    number: '04',
    title: 'Quality Assurance',
    description: 'Rigorous testing guarantees a bug-free, reliable product. We test for performance, security, and compatibility across all devices.',
    items: ['Automated Testing', 'Manual Testing', 'Security Audits', 'Performance Tuning']
  }, {
    number: '05',
    title: 'Launch & Support',
    description: 'We handle the deployment and provide ongoing support to ensure your product continues to perform at its best.',
    items: ['Deployment', 'Monitoring', 'Maintenance', 'Feature Updates']
  }];
  return <div className="pt-20 min-h-screen bg-inkblack">
      <Section className="bg-gradient-to-b from-inkblack to-inkblack-light">
        <div className="text-center max-w-3xl mx-auto">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-skyblue/10 border border-skyblue/20 mb-8 backdrop-blur-sm">
              <span className="text-sm font-medium text-skyblue">
                How We Work
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Our Process
            </h1>
            <p className="text-xl md:text-2xl text-gray-400">
              A proven methodology for delivering excellence, every time.
            </p>
          </FadeIn>
        </div>
      </Section>

      <Section>
        <div className="space-y-20 relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-skyblue/50 via-skyblue/20 to-transparent -translate-x-1/2" />

          {steps.map((step, index) => <div key={index} className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="flex-1 w-full lg:text-right">
                {index % 2 === 0 && <FadeIn>
                    <div className="lg:pr-12">
                      <span className="text-skyblue font-bold text-lg mb-3 block tracking-wider">
                        {step.number}
                      </span>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
                        {step.title}
                      </h2>
                      <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                        {step.description}
                      </p>
                      <ul className="space-y-3 inline-block text-left">
                        {step.items.map((item, i) => <li key={i} className="flex items-center text-gray-300">
                            <div className="w-6 h-6 rounded-full bg-skyblue/10 border border-skyblue/30 flex items-center justify-center mr-3 shrink-0">
                              <CheckCircle size={14} className="text-skyblue" />
                            </div>
                            {item}
                          </li>)}
                      </ul>
                    </div>
                  </FadeIn>}
              </div>

              <m.div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-skyblue to-azure shadow-lg shadow-skyblue/30 shrink-0" initial={{
            scale: 0.8,
            opacity: 0
          }} whileInView={{
            scale: 1,
            opacity: 1
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.2
          }}>
                <div className="w-4 h-4 bg-white rounded-full" />
              </m.div>

              <div className="flex-1 w-full">
                {index % 2 !== 0 && <FadeIn>
                    <div className="lg:pl-12">
                      <span className="text-skyblue font-bold text-lg mb-3 block tracking-wider">
                        {step.number}
                      </span>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
                        {step.title}
                      </h2>
                      <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                        {step.description}
                      </p>
                      <ul className="space-y-3">
                        {step.items.map((item, i) => <li key={i} className="flex items-center text-gray-300">
                            <div className="w-6 h-6 rounded-full bg-skyblue/10 border border-skyblue/30 flex items-center justify-center mr-3 shrink-0">
                              <CheckCircle size={14} className="text-skyblue" />
                            </div>
                            {item}
                          </li>)}
                      </ul>
                    </div>
                  </FadeIn>}
              </div>
            </div>)}
        </div>
      </Section>

      <Section className="bg-gradient-to-b from-inkblack via-inkblack-light to-inkblack">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose Oraixen
          </h2>
          <p className="text-gray-400 text-lg">
            Our commitment to your success goes beyond delivery.
          </p>
        </div>

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{
          icon: <MessageSquare size={36} />,
          title: 'Transparent Communication',
          desc: 'Weekly sprints, regular demos, and a dedicated Slack channel for your team.'
        }, {
          icon: <ShieldCheck size={36} />,
          title: 'Reliability Guaranteed',
          desc: 'We stand by our code with a 6-month bug-free warranty on all deliverables.'
        }, {
          icon: <LifeBuoy size={36} />,
          title: 'Long-term Support',
          desc: 'Flexible maintenance packages to keep your software secure and up-to-date.'
        }].map((item, i) => <m.div key={i} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true,
          amount: 0.3
        }} transition={{
          delay: i * 0.1
        }}>
              <Card className="p-10 text-center h-full bg-gradient-to-br from-white/5 to-white/[0.02]">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-skyblue/10 to-azure/10 border border-skyblue/20 flex items-center justify-center text-skyblue mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </Card>
            </m.div>)}
        </Stagger>
      </Section>
    </div>;
}