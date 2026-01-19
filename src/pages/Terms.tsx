import React from 'react';
import { Section } from '../components/Section';
export function Terms() {
  return <div className="pt-20 min-h-screen bg-inkblack">
      <Section>
        <div className="max-w-3xl mx-auto prose prose-invert">
          <h1 className="text-4xl font-bold text-white mb-8">
            Terms of Service
          </h1>
          <p className="text-gray-400 mb-6">Last updated: October 2023</p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            1. Agreement to Terms
          </h2>
          <p className="text-gray-400 mb-4">
            These Terms of Service constitute a legally binding agreement made
            between you, whether personally or on behalf of an entity ("you")
            and Oraixen ("we," "us" or "our"), concerning your access to and use
            of the website as well as any other media form, media channel,
            mobile website or mobile application related, linked, or otherwise
            connected thereto.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            2. Intellectual Property Rights
          </h2>
          <p className="text-gray-400 mb-4">
            Unless otherwise indicated, the Site is our proprietary property and
            all source code, databases, functionality, software, website
            designs, audio, video, text, photographs, and graphics on the Site
            (collectively, the "Content") and the trademarks, service marks, and
            logos contained therein (the "Marks") are owned or controlled by us
            or licensed to us.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            3. User Representations
          </h2>
          <p className="text-gray-400 mb-4">
            By using the Site, you represent and warrant that: (1) all
            registration information you submit will be true, accurate, current,
            and complete; (2) you will maintain the accuracy of such information
            and promptly update such registration information as necessary.
          </p>
        </div>
      </Section>
    </div>;
}