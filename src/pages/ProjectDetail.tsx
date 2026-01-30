import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Lock, ExternalLink, Globe, Smartphone, Monitor } from 'lucide-react';
import { projects } from '../lib/projects';
import { Section } from '../components/Section';
import { FadeIn } from '../components/FadeIn';
import { Card } from '../components/Card';
import { RelatedProjects } from '../components/projects/RelatedProjects';
import { m } from 'framer-motion';
export function ProjectDetail() {
  const {
    slug
  } = useParams<{
    slug: string;
  }>();
  const project = projects.find(p => p.slug === slug);
  if (!project) {
    return <Navigate to="/projects" replace />;
  }
  return <div className="pt-20 min-h-screen bg-inkblack">
      {/* Hero */}
      <div className={`relative h-[70vh] w-full overflow-hidden ${
        project.imageFit === 'contain' ? 'bg-white' : 'bg-inkblack'
      }`}>
        <div className={`absolute inset-0 ${project.imageFit === 'contain' ? 'flex items-center justify-center bg-white p-12' : ''}`}>
          <img
            src={project.imageUrl}
            alt={project.title}
            className={
              project.imageFit === 'contain'
                ? 'object-contain w-auto h-auto max-h-[50vh] max-w-[85vw] sm:max-w-[500px]'
                : 'w-full h-full object-cover'
            }
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-inkblack/60 via-inkblack/80 to-inkblack pointer-events-none" />

        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-20 relative z-10">
          <FadeIn>
            <Link to="/projects" className="inline-flex items-center text-skyblue hover:text-white mb-8 transition-colors font-medium group">
              <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Link>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-2 text-sm font-semibold bg-white/10 text-white rounded-full border border-white/20 backdrop-blur-md">
                {project.industry}
              </span>
              {project.confidential && <span className="px-4 py-2 text-sm font-semibold bg-azure/90 text-white rounded-full flex items-center gap-2 border border-skyblue/30 backdrop-blur-md">
                  <Lock size={14} /> Confidential
                </span>}
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {project.title}
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Overview Grid */}
      <Section className="border-b border-white/5 bg-inkblack-light">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[{
          icon: <User size={20} />,
          label: 'Client',
          value: project.confidential ? 'Confidential Client' : project.client
        }, {
          icon: <Calendar size={20} />,
          label: 'Year',
          value: project.year
        }, {
          icon: <Tag size={20} />,
          label: 'Category',
          value: project.category
        }].map((item, i) => <m.div key={i} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: i * 0.1
        }}>
              <div className="flex items-center text-skyblue mb-3">
                {item.icon}
                <span className="text-xs font-bold uppercase tracking-wider ml-2">
                  {item.label}
                </span>
              </div>
              <div className="text-white font-semibold text-lg">
                {item.value}
              </div>
            </m.div>)}

          <m.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.3
        }}>
            <div className="text-skyblue mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">
                Tech Stack
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map(tech => <span key={tech} className="text-xs bg-white/5 px-3 py-1.5 rounded-lg text-gray-300 font-medium border border-white/10">
                  {tech}
                </span>)}
            </div>
          </m.div>
        </div>
      </Section>

      {/* Deep Dive */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 space-y-16">
            <FadeIn>
              <div className="w-12 h-1 bg-gradient-to-r from-skyblue to-azure rounded-full mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                The Challenge
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg md:text-xl">
                {project.problem}
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="w-12 h-1 bg-gradient-to-r from-skyblue to-azure rounded-full mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                The Solution
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg md:text-xl">
                {project.solution}
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="w-12 h-1 bg-gradient-to-r from-skyblue to-azure rounded-full mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                The Impact
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg md:text-xl">
                {project.impact}
              </p>
            </FadeIn>
          </div>

          <div className="lg:col-span-1 space-y-8">
            <FadeIn delay={0.3}>
              <Card className="p-8 bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10">
                <h3 className="text-xl font-bold text-white mb-8">
                  Key Metrics
                </h3>
                <div className="space-y-8">
                  {project.metrics.map((metric, i) => <div key={i}>
                      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-skyblue to-azure mb-2">
                        {metric.value}
                      </div>
                      <div className="text-sm text-gray-500 uppercase tracking-wider font-medium">
                        {metric.label}
                      </div>
                    </div>)}
                </div>
              </Card>
            </FadeIn>

            <FadeIn delay={0.4}>
              <Card className="p-8 bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10">
                <h3 className="text-xl font-bold text-white mb-8">
                  Highlights
                </h3>
                <ul className="space-y-4">
                  {project.highlights.map((highlight, i) => <li key={i} className="flex items-start text-gray-300 leading-relaxed">
                      <div className="w-2 h-2 bg-gradient-to-br from-skyblue to-azure rounded-full mt-2 mr-4 shrink-0" />
                      {highlight}
                    </li>)}
                </ul>
              </Card>
            </FadeIn>

            {project.platforms && (project.platforms.website || project.platforms.playStore || project.platforms.appStore || project.platforms.dashboard) && (
              <FadeIn delay={0.5}>
                <Card className="p-8 bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10">
                  <h3 className="text-xl font-bold text-white mb-8">
                    Available Platforms
                  </h3>
                  <div className="space-y-3">
                    {project.platforms.website && (
                      <a
                        href={project.platforms.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-skyblue/30 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <Globe size={20} className="text-skyblue" />
                          <span className="text-white font-medium">Website</span>
                        </div>
                        <ExternalLink size={16} className="text-gray-400 group-hover:text-skyblue transition-colors" />
                      </a>
                    )}
                    {project.platforms.playStore && (
                      <a
                        href={project.platforms.playStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-green-500/30 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <Smartphone size={20} className="text-green-400" />
                          <span className="text-white font-medium">Play Store</span>
                        </div>
                        <ExternalLink size={16} className="text-gray-400 group-hover:text-green-400 transition-colors" />
                      </a>
                    )}
                    {project.platforms.appStore && (
                      <a
                        href={project.platforms.appStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <Smartphone size={20} className="text-blue-400" />
                          <span className="text-white font-medium">App Store</span>
                        </div>
                        <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </a>
                    )}
                    {project.platforms.dashboard && (
                      <a
                        href={project.platforms.dashboard}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <Monitor size={20} className="text-purple-400" />
                          <span className="text-white font-medium">Dashboard</span>
                        </div>
                        <ExternalLink size={16} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
                      </a>
                    )}
                  </div>
                </Card>
              </FadeIn>
            )}
          </div>
        </div>
      </Section>

      <RelatedProjects currentSlug={project.slug} category={project.category} />
    </div>;
}