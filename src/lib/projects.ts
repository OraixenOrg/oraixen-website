import { Project } from '../types/project';
export const projects: Project[] = [{
  id: '1',
  slug: 'fintech-core-banking',
  title: 'NextGen Core Banking Platform',
  client: 'Confidential Financial Institution',
  industry: 'Finance',
  year: '2023',
  description: 'A complete modernization of a legacy banking infrastructure into a cloud-native, microservices-based platform serving millions of daily transactions.',
  problem: 'The client was operating on a 20-year-old monolithic mainframe system that was costly to maintain, slow to update, and unable to support modern digital banking features.',
  solution: 'We engineered a scalable, secure, and high-performance core banking platform using a microservices architecture. The solution included real-time transaction processing, an API gateway for third-party integrations, and a modern React-based internal dashboard.',
  impact: 'Reduced transaction processing time by 94%, cut operational costs by 40%, and enabled the launch of new banking products in weeks instead of months.',
  metrics: [{
    label: 'Transaction Speed',
    value: '<50ms'
  }, {
    label: 'Uptime',
    value: '99.999%'
  }, {
    label: 'Cost Reduction',
    value: '40%'
  }, {
    label: 'Daily Transactions',
    value: '5M+'
  }],
  techStack: ['Java', 'Spring Boot', 'React', 'Kafka', 'Kubernetes', 'AWS'],
  highlights: ['Zero-downtime migration strategy', 'Bank-grade security compliance (SOC2, ISO27001)', 'Real-time fraud detection engine'],
  imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1600',
  confidential: true,
  featured: true,
  category: 'Platform'
}, {
  id: '2',
  slug: 'health-ai-diagnostics',
  title: 'MediScan AI Diagnostics',
  client: 'HealthTech Innovations',
  industry: 'Healthcare',
  year: '2023',
  description: 'An AI-powered diagnostic assistant for radiologists that detects anomalies in X-rays and MRI scans with high precision.',
  problem: 'Radiologists face high workloads leading to fatigue and potential diagnostic errors. The client needed a tool to triage scans and highlight potential issues for human review.',
  solution: 'We developed a computer vision model trained on over 1 million anonymized scans. The system integrates directly into existing hospital PACS workflows, providing real-time heatmaps of potential anomalies.',
  impact: 'Improved diagnostic accuracy by 15% and reduced average review time per scan by 30%, allowing doctors to focus on complex cases.',
  metrics: [{
    label: 'Accuracy',
    value: '98.2%'
  }, {
    label: 'Time Saved',
    value: '30%'
  }, {
    label: 'Scans Processed',
    value: '500k+'
  }],
  techStack: ['Python', 'TensorFlow', 'React', 'FastAPI', 'PostgreSQL'],
  highlights: ['HIPAA compliant architecture', 'Sub-second inference time', 'Seamless PACS integration'],
  imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1600',
  confidential: false,
  featured: true,
  category: 'AI'
}, {
  id: '3',
  slug: 'logistics-fleet-iot',
  title: 'Global Fleet IoT Tracker',
  client: 'TransOcean Logistics',
  industry: 'Logistics',
  year: '2022',
  description: 'A comprehensive hardware and software solution for real-time tracking and telemetry of global shipping fleets.',
  problem: "The client lacked visibility into their shipping containers' conditions (temperature, humidity, shock) during transit, leading to spoilage and insurance claims.",
  solution: 'We designed custom IoT sensor modules and a centralized cloud dashboard. The hardware monitors environmental conditions and transmits data via satellite and cellular networks.',
  impact: 'Reduced cargo spoilage by 25% and insurance premiums by 15%. Provided end-to-end supply chain visibility for premium clients.',
  metrics: [{
    label: 'Assets Tracked',
    value: '10k+'
  }, {
    label: 'Spoilage Reduction',
    value: '25%'
  }, {
    label: 'Data Points/Day',
    value: '1M+'
  }],
  techStack: ['C++', 'Embedded Systems', 'React Native', 'Node.js', 'TimescaleDB'],
  highlights: ['Custom PCB design', '6-month battery life optimization', 'Global connectivity fallback'],
  imageUrl: 'https://images.unsplash.com/photo-1494412574643-35d324698420?auto=format&fit=crop&q=80&w=1600',
  confidential: false,
  featured: true,
  category: 'Hardware'
}, {
  id: '4',
  slug: 'ecommerce-mobile-app',
  title: 'LuxeFashion Mobile App',
  client: 'LuxeFashion Retail',
  industry: 'E-commerce',
  year: '2023',
  description: 'A premium mobile shopping experience for a high-end fashion retailer, featuring AR try-on and personalized recommendations.',
  problem: 'The client had a web presence but lacked a dedicated mobile channel. They wanted to replicate the in-store VIP experience digitally.',
  solution: 'We built a native mobile app (iOS/Android) with a focus on fluid animations, high-resolution imagery, and an AR virtual try-on feature for accessories.',
  impact: 'Achieved 4.9/5 app store rating, increased mobile conversion rate by 3x compared to mobile web, and drove 40% of total digital revenue within 6 months.',
  metrics: [{
    label: 'Downloads',
    value: '200k+'
  }, {
    label: 'Conversion Rate',
    value: '4.5%'
  }, {
    label: 'App Store Rating',
    value: '4.9'
  }],
  techStack: ['React Native', 'Redux', 'Node.js', 'ARKit', 'Stripe'],
  highlights: ['Augmented Reality Try-On', 'AI-driven personalization', 'One-tap checkout'],
  imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1600',
  confidential: false,
  featured: false,
  category: 'Mobile'
}, {
  id: '5',
  slug: 'edtech-learning-platform',
  title: 'Adaptive Learning Ecosystem',
  client: 'EduFuture Corp',
  industry: 'Education',
  year: '2022',
  description: 'An intelligent learning management system that adapts curriculum difficulty based on student performance.',
  problem: 'Traditional LMS platforms were static and "one-size-fits-all", leading to student disengagement and poor retention rates.',
  solution: 'We created a dynamic platform that uses machine learning to analyze student interactions and quiz results, automatically adjusting the learning path to optimize retention.',
  impact: 'Increased course completion rates by 45% and improved average test scores by 20% across 50 partner schools.',
  metrics: [{
    label: 'Students',
    value: '500k+'
  }, {
    label: 'Completion Rate',
    value: '+45%'
  }, {
    label: 'Schools',
    value: '50+'
  }],
  techStack: ['Next.js', 'Python', 'Django', 'PostgreSQL', 'Redis'],
  highlights: ['Adaptive learning algorithms', 'Gamification engine', 'Offline-first mobile support'],
  imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1600',
  confidential: false,
  featured: false,
  category: 'Web'
}, {
  id: '6',
  slug: 'real-estate-marketplace',
  title: 'PropTech Investment Portal',
  client: 'Confidential Real Estate Fund',
  industry: 'Real Estate',
  year: '2023',
  description: 'A secure platform for fractional investment in high-value commercial real estate assets.',
  problem: 'The client needed a secure, compliant way to digitize real estate assets and offer them to accredited investors globally.',
  solution: 'We built a secure web platform with KYC/AML integration, digital wallet management, and a real-time investment dashboard showing property performance.',
  impact: 'Facilitated over $100M in property investments in the first year and streamlined the investor onboarding process from weeks to days.',
  metrics: [{
    label: 'Volume Processed',
    value: '$100M+'
  }, {
    label: 'User Growth',
    value: '200% YoY'
  }, {
    label: 'Security Incidents',
    value: '0'
  }],
  techStack: ['React', 'Node.js', 'Blockchain (Private)', 'AWS'],
  highlights: ['Bank-grade encryption', 'Automated dividend distribution', 'Interactive property maps'],
  imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600',
  confidential: true,
  featured: false,
  category: 'Platform'
}, {
  id: '7',
  slug: 'smart-city-infrastructure',
  title: 'Smart City Traffic Control',
  client: 'Metro Municipal',
  industry: 'Government',
  year: '2022',
  description: 'An integrated hardware and software system for optimizing traffic flow in dense urban environments.',
  problem: 'Increasing congestion was causing economic loss and environmental damage. The city needed a smarter way to manage traffic lights.',
  solution: 'We deployed IoT sensors at major intersections and a central AI control system that adjusts signal timing in real-time based on traffic density.',
  impact: 'Reduced average commute time by 18% and lowered vehicle emissions by 12% in the pilot district.',
  metrics: [{
    label: 'Commute Time',
    value: '-18%'
  }, {
    label: 'Emissions',
    value: '-12%'
  }, {
    label: 'Intersections',
    value: '200+'
  }],
  techStack: ['Python', 'IoT', 'React', 'Google Maps API'],
  highlights: ['Real-time traffic analysis', 'Emergency vehicle prioritization', 'Predictive congestion modeling'],
  imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1600',
  confidential: false,
  featured: false,
  category: 'Hardware'
}, {
  id: '8',
  slug: 'fintech-crypto-wallet',
  title: 'Secure DeFi Wallet',
  client: 'Vault Systems',
  industry: 'Finance',
  year: '2023',
  description: 'A non-custodial cryptocurrency wallet with built-in DeFi integrations and multi-chain support.',
  problem: 'Existing wallets were either too complex for beginners or lacked advanced features for power users.',
  solution: 'We designed a user-friendly mobile wallet with biometric security, simplified gas fee estimation, and direct integration with major DeFi protocols.',
  impact: 'Acquired 50,000 active users in the first 3 months and processed over $10M in swap volume.',
  metrics: [{
    label: 'Active Users',
    value: '50k+'
  }, {
    label: 'Swap Volume',
    value: '$10M+'
  }, {
    label: 'Chains Supported',
    value: '12'
  }],
  techStack: ['React Native', 'Web3.js', 'Solidity', 'Rust'],
  highlights: ['Multi-party computation security', 'Cross-chain bridge integration', 'Biometric authentication'],
  imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=1600',
  confidential: false,
  featured: false,
  category: 'Mobile'
}, {
  id: '9',
  slug: 'corporate-hr-platform',
  title: 'Global HR Management Suite',
  client: 'Enterprise Corp',
  industry: 'Services',
  year: '2022',
  description: 'A unified HR platform for managing a global workforce, including payroll, benefits, and performance reviews.',
  problem: 'The client was using disparate systems for different regions, causing data inconsistencies and administrative overhead.',
  solution: 'We built a centralized SaaS platform that unifies all HR functions, supports multi-currency payroll, and provides global compliance reporting.',
  impact: 'Reduced HR administrative time by 50% and improved employee satisfaction scores regarding internal tools by 40%.',
  metrics: [{
    label: 'Employees Managed',
    value: '15k+'
  }, {
    label: 'Countries',
    value: '25'
  }, {
    label: 'Admin Time',
    value: '-50%'
  }],
  techStack: ['Angular', 'Node.js', 'SQL Server', 'Azure'],
  highlights: ['Global payroll compliance', 'Self-service employee portal', 'Advanced people analytics'],
  imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1600',
  confidential: true,
  featured: false,
  category: 'Web'
}];