import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Smartphone, Server, Cpu, CheckCircle, Sparkles, Zap } from 'lucide-react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { FeaturedProjects } from '../components/projects/FeaturedProjects';
import { FadeIn } from '../components/FadeIn';
import { Stagger } from '../components/Stagger';
import { m } from 'framer-motion';
export function Home() {
  return <div className="min-h-screen">
      {/* Hero Section - Enhanced */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-inkblack">
        {/* Animated Background Grid */}
        <div className="absolute inset-0">
          {/* Main gradient orbs */}
          <m.div className="absolute top-0 right-1/4 w-[800px] h-[800px] rounded-full opacity-20" style={{
          background: 'radial-gradient(circle, rgba(86,201,227,0.4) 0%, rgba(15,94,112,0.2) 50%, transparent 100%)'
        }} animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }} transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }} />
          <m.div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-15" style={{
          background: 'radial-gradient(circle, rgba(15,94,112,0.4) 0%, rgba(86,201,227,0.2) 50%, transparent 100%)'
        }} animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15]
        }} transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }} />

          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
            backgroundImage: `
                linear-gradient(rgba(86,201,227,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(86,201,227,0.5) 1px, transparent 1px)
              `,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse 100% 60% at 50% 50%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 100% 60% at 50% 50%, black 40%, transparent 100%)'
          }} />
          </div>

          {/* Floating geometric shapes */}
          <m.div className="absolute top-1/4 left-1/3 w-32 h-32 border border-skyblue/10 rounded-2xl rotate-12" animate={{
          y: [0, -30, 0],
          rotate: [12, 24, 12]
        }} transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }} />
          <m.div className="absolute bottom-1/3 right-1/4 w-24 h-24 border border-azure/10 rounded-full" animate={{
          y: [0, 40, 0],
          scale: [1, 1.1, 1]
        }} transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5
        }} />

          {/* Accent lines */}
          <div className="absolute top-1/3 left-0 w-64 h-px bg-gradient-to-r from-transparent via-skyblue/20 to-transparent" />
          <div className="absolute bottom-1/3 right-0 w-96 h-px bg-gradient-to-l from-transparent via-azure/20 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge */}
            <FadeIn>
              <m.div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-skyblue/10 to-azure/10 border border-skyblue/20 mb-10 backdrop-blur-sm" whileHover={{
              scale: 1.05
            }} transition={{
              duration: 0.2
            }}>
                <Zap className="text-skyblue" size={16} />
                <span className="text-sm font-semibold text-skyblue tracking-wide">
                  Premium Technology Solutions
                </span>
              </m.div>
            </FadeIn>

            {/* Main Headline */}
            <FadeIn delay={0.1}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.05]">
                Innovation meets{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-skyblue via-skyblue-light to-azure">
                    Precision
                  </span>
                  {/* Animated glow effect */}
                  <m.div className="absolute -inset-2 bg-gradient-to-r from-skyblue/30 to-azure/30 blur-2xl -z-10" animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [0.95, 1.05, 0.95]
                }} transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }} />
                </span>
              </h1>
            </FadeIn>

            {/* Subheadline */}
            <FadeIn delay={0.2}>
              <p className="text-xl sm:text-2xl md:text-3xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
                Oraixen delivers{' '}
                <span className="text-white font-medium">
                  premium technology solutions
                </span>{' '}
                for forward-thinking businesses. We craft flawless digital
                products, from mobile apps to AI-powered hardware systems.
              </p>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-20">
                <Button href="/projects" variant="primary" size="lg" icon>
                  View Our Work
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  Start a Project
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <div className="relative bg-inkblack-light border-y border-white/10 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-skyblue/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
            {[{
            label: 'Years Experience',
            value: '7+'
          }, {
            label: 'Projects Delivered',
            value: '37+'
          }, {
            label: 'Client Retention',
            value: '98%'
          }, {
            label: 'Countries Served',
            value: '15'
          }].map((stat, i) => <m.div key={i} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: i * 0.1
          }} className="text-center group">
                <m.div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-400" whileHover={{
              scale: 1.05
            }} transition={{
              duration: 0.2
            }}>
                  {stat.value}
                </m.div>
                <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
                  {stat.label}
                </div>
              </m.div>)}
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <Section>
        <div className="text-center mb-20">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our Expertise
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              We provide end-to-end technology solutions tailored to your
              specific needs.
            </p>
          </FadeIn>
        </div>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[{
          icon: <Smartphone className="text-skyblue" size={32} />,
          title: 'Mobile Development',
          desc: 'Native iOS and Android apps with fluid animations and premium UX.'
        }, {
          icon: <Code className="text-skyblue" size={32} />,
          title: 'Web Development',
          desc: 'Scalable, high-performance web applications and platforms.'
        }, {
          icon: <Server className="text-skyblue" size={32} />,
          title: 'Corporate Software',
          desc: 'Enterprise-grade software solutions for complex business processes.'
        }, {
          icon: <Cpu className="text-skyblue" size={32} />,
          title: 'Hardware & AI',
          desc: 'Integrated IoT hardware systems powered by advanced AI models.'
        }].map((service, i) => <m.div key={i} initial={{
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
              <Card className="p-8 h-full group">
                <div className="mb-6 bg-gradient-to-br from-skyblue/10 to-azure/10 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.desc}
                </p>
                <Link to="/services" className="inline-flex items-center text-skyblue text-sm font-semibold hover:text-skyblue-light transition-colors group">
                  Learn more
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Card>
            </m.div>)}
        </Stagger>
      </Section>

      {/* Featured Projects */}
      <FeaturedProjects />

      {/* Process Preview */}
      <Section className="bg-gradient-to-b from-inkblack via-inkblack-light to-inkblack">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How We Work
            </h2>
            <p className="text-gray-400 mb-10 text-lg leading-relaxed">
              Our process is built on transparency, collaboration, and rigorous
              quality assurance. We don't just build software; we build
              partnerships.
            </p>
            <div className="space-y-4 mb-10">
              {['Discovery & Strategy', 'Design & Prototyping', 'Development & Testing', 'Launch & Support'].map((step, i) => <m.div key={i} initial={{
              opacity: 0,
              x: -20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: i * 0.1
            }} className="flex items-center group">
                  <div className="w-8 h-8 rounded-full bg-skyblue/10 border border-skyblue/30 flex items-center justify-center mr-4 group-hover:bg-skyblue/20 transition-colors">
                    <CheckCircle className="text-skyblue" size={18} />
                  </div>
                  <span className="text-white font-medium">{step}</span>
                </m.div>)}
            </div>
            <Button href="/process" variant="secondary" size="lg">
              View Full Process
            </Button>
          </FadeIn>

          <FadeIn delay={0.2} className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-skyblue/20 to-azure/20 blur-3xl rounded-full opacity-30" />
            <Card className="relative p-10 bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10">
              <div className="space-y-10">
                {[{
                num: '1',
                title: 'Discovery',
                desc: 'We dive deep into your business goals and technical requirements.',
                active: true
              }, {
                num: '2',
                title: 'Execution',
                desc: 'Agile development with bi-weekly sprints and regular updates.',
                active: false
              }, {
                num: '3',
                title: 'Delivery',
                desc: 'Flawless launch with comprehensive documentation and training.',
                active: false
              }].map((step, i) => <div key={i}>
                    <div className="flex gap-5">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0 ${step.active ? 'bg-gradient-to-br from-skyblue to-azure shadow-lg shadow-skyblue/30' : 'bg-white/5 border border-white/10'}`}>
                        {step.num}
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg mb-2">
                          {step.title}
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                    {i < 2 && <div className="w-0.5 h-8 bg-gradient-to-b from-white/20 to-transparent ml-7 my-2" />}
                  </div>)}
              </div>
            </Card>
          </FadeIn>
        </div>
      </Section>

      {/* CTA Banner */}
      <section className="relative py-32 bg-gradient-to-br from-azure via-azure-dark to-inkblack overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-t from-inkblack/50 to-transparent" />

        {/* Animated Orbs */}
        <m.div className="absolute top-10 right-10 w-64 h-64 bg-skyblue/20 rounded-full blur-3xl" animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3]
      }} transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }} />

        <div className="container mx-auto px-4 text-center relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to build the future?
            </h2>
            <p className="text-white/90 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
              Let's discuss how Oraixen can help you achieve your digital goals
              with precision and excellence.
            </p>
            <Button href="/contact" variant="primary" size="lg" className="bg-white text-azure hover:bg-gray-100 shadow-2xl shadow-black/20" icon>
              Start Your Project
            </Button>
          </FadeIn>
        </div>
      </section>
    </div>;
}