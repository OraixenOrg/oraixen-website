import React from 'react';
import { Section } from '../components/Section';
export function Privacy() {
  return <div className="pt-20 min-h-screen bg-inkblack">
      <Section>
        <div className="max-w-3xl mx-auto prose prose-invert">
          <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
          <p className="text-gray-400 mb-6">Last updated: October 2023</p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            1. Introduction
          </h2>
          <p className="text-gray-400 mb-4">
            Oraixen ("we", "our", or "us") is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you visit our website.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            2. Information We Collect
          </h2>
          <p className="text-gray-400 mb-4">
            We may collect personal information that you voluntarily provide to
            us when you express an interest in obtaining information about us or
            our products and services, when you participate in activities on the
            website, or otherwise when you contact us.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            3. How We Use Your Information
          </h2>
          <p className="text-gray-400 mb-4">
            We use personal information collected via our website for a variety
            of business purposes described below:
          </p>
          <ul className="list-disc pl-6 text-gray-400 mb-4 space-y-2">
            <li>To send you administrative information.</li>
            <li>
              To respond to your inquiries and solve any potential issues you
              might have with the use of our services.
            </li>
            <li>To send you marketing and promotional communications.</li>
          </ul>
        </div>
      </Section>
    </div>;
}