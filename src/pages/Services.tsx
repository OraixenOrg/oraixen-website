import React from 'react';
import { Section } from '../components/Section';
import { FadeIn } from '../components/FadeIn';
import { Button } from '../components/Button';
import { CheckCircle, Smartphone, Code, Server, Cpu } from 'lucide-react';
import { m } from 'framer-motion';
export function Services() {
  const services = [{
    id: 'mobile',
    icon: <Smartphone size={32} />,
    title: 'Mobile App Development',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200',
    description: 'We build native and cross-platform mobile applications that provide seamless user experiences. From iOS to Android, our apps are designed to be intuitive, fast, and scalable.',
    deliverables: ['iOS & Android Apps', 'React Native / Flutter', 'UI/UX Design', 'App Store Optimization'],
    timeline: '3-6 months',
    bestFor: 'Startups, Consumer Brands, Enterprise Tools'
  }, {
    id: 'web',
    icon: <Code size={32} />,
    title: 'Web Development',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1200',
    description: 'Modern, responsive, and high-performance web applications. We use the latest frameworks to build websites that are not only visually stunning but also technically robust.',
    deliverables: ['SaaS Platforms', 'E-commerce Sites', 'Progressive Web Apps', 'CMS Solutions'],
    timeline: '2-5 months',
    bestFor: 'SaaS Companies, E-commerce, Corporate Portals'
  }, {
    id: 'platform',
    icon: <Server size={32} />,
    title: 'Corporate Software Platforms',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    description: 'Custom software solutions designed to streamline complex business processes. We build secure, scalable internal tools that increase operational efficiency.',
    deliverables: ['ERP Systems', 'CRM Solutions', 'HR Management Tools', 'Data Dashboards'],
    timeline: '6-12 months',
    bestFor: 'Enterprises, Logistics, Finance, Healthcare'
  }, {
    id: 'hardware',
    icon: <Cpu size={32} />,
    title: 'Hardware + Software + AI',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200',
    description: 'Integrated solutions bridging the physical and digital worlds. We design custom hardware and embed AI models for smart, connected ecosystems.',
    deliverables: ['IoT Devices', 'Embedded Systems', 'Computer Vision', 'Predictive Analytics'],
    timeline: '6-18 months',
    bestFor: 'Manufacturing, Smart Cities, MedTech, AgTech'
  }];
  return <div className="pt-20 min-h-screen bg-inkblack">
      <Section className="bg-gradient-to-b from-inkblack to-inkblack-light">
        <div className="text-center max-w-3xl mx-auto">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-skyblue/10 border border-skyblue/20 mb-8 backdrop-blur-sm">
              <span className="text-sm font-medium text-skyblue">
                What We Do
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-400">
              Comprehensive technology solutions tailored to elevate your
              business.
            </p>
          </FadeIn>
        </div>
      </Section>

      <div className="space-y-0">
        {services.map((service, index) => <Section key={service.id} className={index % 2 === 0 ? 'bg-inkblack' : 'bg-inkblack-light'}>
            <div className={`flex flex-col lg:flex-row gap-20 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="flex-1">
                <FadeIn>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-skyblue/10 to-azure/10 border border-skyblue/20 text-skyblue mb-8">
                    {service.icon}
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                    {service.title}
                  </h2>

                  <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-10">
                    <div>
                      <h4 className="text-xs font-bold text-skyblue uppercase tracking-wider mb-4">
                        Deliverables
                      </h4>
                      <ul className="space-y-3">
                        {service.deliverables.map((item, i) => <li key={i} className="flex items-center text-gray-300">
                            <div className="w-6 h-6 rounded-full bg-skyblue/10 border border-skyblue/30 flex items-center justify-center mr-3 shrink-0">
                              <CheckCircle size={14} className="text-skyblue" />
                            </div>
                            {item}
                          </li>)}
                      </ul>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-bold text-skyblue uppercase tracking-wider mb-2">
                          Timeline
                        </h4>
                        <p className="text-white text-lg font-semibold">
                          {service.timeline}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-skyblue uppercase tracking-wider mb-2">
                          Best For
                        </h4>
                        <p className="text-white font-medium">
                          {service.bestFor}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button href="/contact" variant="primary" size="lg" icon>
                    Discuss Your Project
                  </Button>
                </FadeIn>
              </div>

              <div className="flex-1 w-full">
                <FadeIn delay={0.2}>
                  <m.div 
                    className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 group" 
                    whileHover={{
                      scale: 1.02
                    }} 
                    transition={{
                      duration: 0.3
                    }}
                  >
                    {/* Service Image */}
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-inkblack/60 via-inkblack/40 to-inkblack/60" />
                    
                    {/* Subtle animated overlay */}
                    <m.div 
                      className="absolute inset-0 bg-gradient-to-br from-skyblue/0 via-skyblue/10 to-azure/0" 
                      animate={{
                        opacity: [0.2, 0.4, 0.2]
                      }} 
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }} 
                    />
                    
                    {/* Service Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-skyblue/20 to-azure/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                        {service.icon}
                      </div>
                    </div>
                  </m.div>
                </FadeIn>
              </div>
            </div>
          </Section>)}
      </div>
    </div>;
}