import React from 'react';
import { Section } from '../components/Section';
import { FadeIn } from '../components/FadeIn';
import { Stagger } from '../components/Stagger';
import { Card } from '../components/Card';
import { m } from 'framer-motion';
export function About() {
  return <div className="pt-20 min-h-screen bg-inkblack">
      {/* Hero */}
      <Section className="pb-0">
        <div className="max-w-4xl">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-skyblue/10 border border-skyblue/20 mb-8 backdrop-blur-sm">
              <span className="text-sm font-medium text-skyblue">
                About Oraixen
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Crafting the technology of tomorrow.
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
              Oraixen is a premium technology solutions company. We don't just
              write code; we engineer digital excellence for brands that demand
              perfection.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* Brand Story */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-white mb-8">Our Story</h2>
            <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
              <p>
                When creating a brand built on innovation and the technology of
                tomorrow, choosing the perfect name became a defining moment.
                Oraixen was shaped to reflect a company that delivers premium,
                flawless, and high-impact digital solutions.
              </p>
              <p>
                <span className="text-skyblue font-semibold">"Ora,"</span> from
                the Latin word for "a new beginning," represents a renewed
                direction toward building a more advanced, modern, and elevated
                technological future.
              </p>
              <p>
                <span className="text-skyblue font-semibold">"IXEN"</span>{' '}
                blends the essence of "Next" and "Innovation," capturing the
                pulse of the new generation of technology—premium at its core,
                immaculate in execution, and crafted for those who seek
                distinction.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative h-full min-h-[500px] rounded-2xl overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600" alt="Team collaboration" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-br from-azure/30 to-skyblue/20 mix-blend-multiply" />
              <div className="absolute inset-0 border border-white/10 rounded-2xl" />
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Mission / Vision / Purpose */}
      <Section className="bg-gradient-to-b from-inkblack via-inkblack-light to-inkblack">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Foundation
          </h2>
          <p className="text-gray-400 text-lg">
            The principles that drive everything we do.
          </p>
        </div>

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{
          title: 'Mission',
          text: "Deliver innovative, high-quality software solutions crafted with precision, tailored to every client's vision, delivered on time with transparency."
        }, {
          title: 'Vision',
          text: "To become one of the region's leading technology companies, renowned for futuristic, reliable, and high-impact software, hardware, and AI solutions."
        }, {
          title: 'Purpose',
          text: 'Empower businesses with scalable, premium digital products that deliver real impact and drive long-term success.'
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
              <Card className="p-8 h-full bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10">
                <div className="w-12 h-1 bg-gradient-to-r from-skyblue to-azure rounded-full mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{item.text}</p>
              </Card>
            </m.div>)}
        </Stagger>
      </Section>

      {/* Values */}
      <Section>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Core Values
          </h2>
          <p className="text-gray-400 text-lg">
            The principles that guide every line of code we write.
          </p>
        </div>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {['Innovation', 'Integrity', 'Collaboration', 'Reliability', 'Excellence', 'Continuous Improvement'].map((value, i) => <m.div key={i} initial={{
          opacity: 0,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true,
          amount: 0.3
        }} transition={{
          delay: i * 0.05
        }} className="group">
              <div className="p-8 border border-white/10 rounded-xl bg-gradient-to-br from-white/5 to-transparent text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-skyblue/0 to-skyblue/0 group-hover:from-skyblue/5 group-hover:to-azure/5 transition-all duration-300" />
                <span className="text-lg font-semibold text-white relative z-10">
                  {value}
                </span>
              </div>
            </m.div>)}
        </Stagger>
      </Section>
    </div>;
}