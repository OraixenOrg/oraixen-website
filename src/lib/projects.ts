import { Project } from "../types/project";
import { projectsAr } from "./projects.ar";

/**
 * Returns a copy of the project with Arabic copy applied when lang is 'ar'.
 * Brand name, client, year, tech stack and links are language-neutral and kept as-is.
 */
export function localizeProject(p: Project, lang: string): Project {
  if (!lang || !lang.startsWith("ar")) return p;
  const ar = projectsAr[p.slug];
  if (!ar) return p;
  return {
    ...p,
    industry: ar.industry ?? p.industry,
    description: ar.description ?? p.description,
    problem: ar.problem ?? p.problem,
    solution: ar.solution ?? p.solution,
    impact: ar.impact ?? p.impact,
    metrics: ar.metrics ?? p.metrics,
    highlights: ar.highlights ?? p.highlights,
  };
}

function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const projects: Project[] = [
  {
    id: "1",
    slug: createSlug("Zewail City"),
    title: "Zewail City",
    client: "Zewail City of Science and Technology",
    industry: "Education",
    year: "2020",
    description:
      "A comprehensive educational platform for one of Egypt's premier science and technology institutions, providing students and faculty with seamless access to academic resources and services.",
    problem:
      "The institution needed a modern, scalable web platform to manage academic operations, student services, and institutional information efficiently.",
    solution:
      "We developed a robust web platform with intuitive navigation, responsive design, and integrated systems for academic management and information dissemination.",
    impact:
      "Improved accessibility to institutional resources and streamlined communication between students, faculty, and administration.",
    metrics: [
      { label: "Users", value: "10k+" },
      { label: "Uptime", value: "99.9%" },
      { label: "Page Load", value: "<2s" },
    ],
    techStack: ["Next.js", "React", "TypeScript", "Node.js", "REST API"],
    highlights: ["Responsive design", "SEO optimized", "Fast performance"],
    imageUrl: "https://zewailcity.edu.eg/Images/zcLogo.svg",
    imageFit: "contain",
    confidential: false,
    featured: true,
    category: "Web",
    platforms: {
      website: "https://zewailcity.edu.eg/",
    },
  },
  {
    id: "2",
    slug: createSlug("Alkanz"),
    title: "Alkanz",
    client: "Alkanz",
    industry: "E-commerce",
    year: "2023",
    description:
      "A comprehensive e-commerce platform with mobile applications, offering seamless shopping experiences across web and mobile platforms.",
    problem:
      "The client required a unified shopping experience across multiple platforms with synchronized inventory and user accounts.",
    solution:
      "We developed a full-stack e-commerce solution with responsive web design and native mobile apps, integrated payment systems, and real-time inventory management.",
    impact:
      "Increased sales conversion rates and provided customers with flexible shopping options across all devices.",
    metrics: [
      { label: "Products", value: "10k+" },
      { label: "Orders", value: "100k+" },
      { label: "Users", value: "50k+" },
    ],
    techStack: ["React", "Flutter", "laravel", "MySQL", "REST API"],
    highlights: ["Multi-platform", "Payment integration", "Real-time sync"],
    imageUrl:
      "https://play-lh.googleusercontent.com/qkHAqkQZFK3SA-XcNOdK8R-m4hh4fLmBBQc0j2cnfmhTQi14PtcECK1zTXB94We4qfg=w480-h960-rw",
    confidential: false,
    imageFit: "contain",
    featured: true,
    category: "Platform",
    platforms: {
      website: "https://kenz.hashtaghostings.com/",
      playStore:
        "https://play.google.com/store/apps/details?id=com.metagate.alkanzz&hl=en",
      appStore: "https://apps.apple.com/eg/app/dar-alkahrba/id1597367206",
    },
  },
  {
    id: "3",
    slug: createSlug("Dar Alkahraba"),
    title: "Dar Alkahraba",
    client: "Dar Alkahraba",
    industry: "Utilities",
    year: "2021",
    description:
      "A mobile application for electricity services, enabling users to manage their accounts, pay bills, and access utility services on the go.",
    problem:
      "Customers needed convenient access to electricity services and bill management without visiting physical locations.",
    solution:
      "We created an intuitive iOS application with secure payment processing, bill management, and service request features.",
    impact:
      "Reduced customer service visits and improved user satisfaction with convenient mobile access.",
    metrics: [
      { label: "Users", value: "100k+" },
      { label: "Transactions", value: "500k+" },
      { label: "Rating", value: "4.7" },
    ],
    techStack: [
      "Flutter",
      "Firebase",
      "Firebase Auth",
      "Cloud Firestore",
      "FCM",
      "REST API",
    ],
    highlights: ["Secure payments", "Bill management", "Service requests"],
    imageUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/97/c0/25/97c0257a-32ae-00fc-5969-8aa20af2ce85/AppIcon-1x_U007emarketing-0-10-0-85-220.png/400x400ia-75.webp",
    confidential: false,
    imageFit: "contain",
    featured: false,
    category: "Mobile",
    platforms: {
      appStore: "https://apps.apple.com/eg/app/dar-alkahrba/id1597367206",
    },
  },
  {
    id: "4",
    slug: createSlug("DU V DU"),
    title: "DU V DU",
    client: "DU V DU",
    industry: "Productivity",
    year: "2024",
    description:
      "A social networking platform connecting users through innovative features and seamless cross-platform experiences.",
    problem:
      "Users needed a modern social platform with consistent experiences across web and mobile devices.",
    solution:
      "We built a scalable social platform with responsive web design and native mobile apps, featuring real-time messaging and content sharing.",
    impact:
      "Created an engaged community with high user retention and active daily usage.",
    metrics: [
      { label: "Users", value: "200k+" },
      { label: "Daily Active", value: "50k+" },
      { label: "Messages", value: "1M+" },
    ],
    techStack: ["React", "Flutter", "Node.js", "Socket.io", "Real-time APIs"],
    highlights: ["Real-time chat", "Cross-platform", "Content sharing"],
    imageUrl: "https://duvdu.com/assets/imgs/theme/logo.svg",
    imageFit: "contain",
    confidential: false,
    featured: true,
    category: "Platform",
    platforms: {
      website: "https://duvdu.com",
      playStore:
        "https://play.google.com/store/apps/details?id=com.duvdu.duvdu_app",
      appStore: "https://apps.apple.com/eg/app/duvdu/id6743176883",
    },
  },
  {
    id: "5",
    slug: createSlug("Discount Emy"),
    title: "Discount Emy",
    client: "Discount Emy",
    industry: "Retail",
    year: "2024",
    description:
      "A discount and deals platform helping users discover the best offers and savings across various retailers and services.",
    problem:
      "Consumers needed a centralized platform to find and access discounts from multiple retailers.",
    solution:
      "We developed a comprehensive platform with web and mobile apps, featuring deal aggregation, user accounts, and push notifications for new offers.",
    impact:
      "Helped users save money while driving traffic to partner retailers and increasing sales.",
    metrics: [
      { label: "Deals", value: "5k+" },
      { label: "Users", value: "150k+" },
      { label: "Savings", value: "$2M+" },
    ],
    techStack: ["Flutter", "Firebase", "REST API", "Push Notifications"],
    highlights: ["Deal aggregation", "Push notifications", "User accounts"],
    imageUrl: "https://emydiscount.com/views/images/logo.png",
    imageFit: "contain",
    confidential: false,
    featured: false,
    category: "Platform",
    platforms: {
      website: "https://emydiscount.com/",
      playStore:
        "https://play.google.com/store/apps/details?id=com.technospace.emy_discount",
      appStore: "https://apps.apple.com/eg/app/discount-emy/id1617326763",
    },
  },
  {
    id: "6",
    slug: createSlug("Order FS"),
    title: "Order FS",
    client: "Order FS",
    industry: "Food Service",
    year: "2022",
    description:
      "A complete food service management platform with customer-facing apps, restaurant dashboard, and order management system.",
    problem:
      "Restaurants needed an integrated solution for online ordering, delivery management, and business analytics.",
    solution:
      "We built a comprehensive platform including customer mobile apps, restaurant dashboard, order management, and real-time tracking.",
    impact:
      "Streamlined operations, increased order volume, and improved customer satisfaction with faster service.",
    metrics: [
      { label: "Orders", value: "500k+" },
      { label: "Restaurants", value: "1k+" },
      { label: "Users", value: "200k+" },
    ],
    techStack: ["React", "Flutter", "Laravel", "MySQL", "REST API"],
    highlights: [
      "Order management",
      "Real-time tracking",
      "Analytics dashboard",
    ],
    imageUrl: "https://orderfs.com/static/media/logor.f2b420ef445a9b76a69c.png",
    imageFit: "contain",
    confidential: false,
    featured: true,
    category: "Platform",
    platforms: {
      website: "https://www.orderfs.com",
      playStore:
        "https://play.google.com/store/apps/details?id=com.order.order",
      appStore: "https://apps.apple.com/eg/app/order-fs/id6450720518",
    },
  },
  {
    id: "7",
    slug: createSlug("MAAT"),
    title: "MAAT",
    client: "MAAT",
    industry: "Business",
    year: "2024",
    description:
      "A professional business platform providing services and solutions to clients with modern web technology.",
    problem:
      "The client needed a professional online presence to showcase services and connect with potential clients.",
    solution:
      "We developed a sleek, modern website with responsive design, service showcases, and contact integration.",
    impact:
      "Enhanced brand visibility and improved client acquisition through professional online presence.",
    metrics: [
      { label: "Visitors", value: "50k+" },
      { label: "Conversion", value: "5%" },
      { label: "Uptime", value: "99.9%" },
    ],
    techStack: ["Next.js", "React", "TypeScript", "Laravel", "REST API"],
    highlights: ["Responsive design", "SEO optimized", "Fast loading"],
    imageUrl: "https://maat.vip/assets/logo-256-B-nat6oH.png",
    imageFit: "contain",
    confidential: false,
    featured: false,
    category: "Web",
    platforms: {
      website: "https://maat.vip",
    },
  },
  {
    id: "8",
    slug: createSlug("Maqdia"),
    title: "Maqdia",
    client: "Maqdia",
    industry: "E-commerce",
    year: "2025",
    description:
      "An e-commerce platform with mobile applications and comprehensive admin dashboard for managing products, orders, and customers.",
    problem:
      "The business needed a complete e-commerce solution with mobile apps for customers and a powerful dashboard for management.",
    solution:
      "We created mobile applications for iOS and Android, along with a comprehensive admin dashboard for inventory and order management.",
    impact:
      "Increased sales through mobile channels and improved operational efficiency with centralized management.",
    metrics: [
      { label: "Products", value: "5k+" },
      { label: "Orders", value: "50k+" },
      { label: "Users", value: "30k+" },
    ],
    techStack: ["React", "Flutter", "Laravel", "MySQL", "REST API"],
    highlights: ["Admin dashboard", "Mobile apps", "Order management"],
    imageUrl:
      "https://play-lh.googleusercontent.com/8c_accW6PO-NNx1sgDv6KRAeNRtyyQqkiaUsHCC9tUtrLAGdtZy3o9FjBE_SGnFkutQ8-RoCiPV4ZggsoaO5EA=w480-h960-rw",
    imageFit: "contain",
    confidential: false,
    featured: false,
    category: "Platform",
    platforms: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.maqdyya.maqdyya",
      appStore: "https://apps.apple.com/eg/app/maqdia/id6753150399",
    },
  },
  {
    id: "9",
    slug: createSlug("M6lob"),
    title: "M6lob",
    client: "M6lob",
    industry: "Jobs",
    year: "2023",
    description:
      "A job marketplace platform connecting job seekers with employers, featuring mobile applications for convenient access.",
    problem:
      "Job seekers and employers needed a modern, accessible platform for job postings and applications.",
    solution:
      "We built a comprehensive job platform with web and mobile apps, featuring job search, application tracking, and employer tools.",
    impact:
      "Facilitated thousands of job matches and improved the hiring process for both job seekers and employers.",
    metrics: [
      { label: "Jobs", value: "10k+" },
      { label: "Users", value: "100k+" },
      { label: "Matches", value: "50k+" },
    ],
    techStack: ["React", "Flutter", "Laravel", "MySQL", "REST API"],
    highlights: ["Job search", "Application tracking", "Employer tools"],
    imageUrl:
      "https://play-lh.googleusercontent.com/2mmBUfMFOMQ9EIw4rHAaz_cCBLenGmKGLbRRvu2Rw2ZQxY0UgSoWhC-nr3JRPuRxEkt3=w480-h960-rw",
    imageFit: "contain",
    confidential: false,
    featured: true,
    category: "Platform",
    platforms: {
      website: "https://m6lob.org",
      playStore: "https://play.google.com/store/apps/details?id=com.jobs.m6lob",
      appStore:
        "https://apps.apple.com/eg/app/mtlob-%D9%85%D8%B7%D9%84%D9%88%D8%A8/id6499473889",
    },
  },
  {
    id: "10",
    slug: createSlug("Goffa"),
    title: "Goffa",
    client: "Goffa",
    industry: "E-commerce",
    year: "2023",
    description:
      "An e-commerce platform specializing in fashion and lifestyle products, with mobile applications for iOS and Android.",
    problem:
      "The business needed a modern e-commerce presence with mobile apps to reach customers on all devices.",
    solution:
      "We developed a responsive web platform and native mobile apps with seamless shopping experiences, secure payments, and order tracking.",
    impact:
      "Increased mobile sales and improved customer satisfaction with convenient shopping options.",
    metrics: [
      { label: "Products", value: "3k+" },
      { label: "Orders", value: "75k+" },
      { label: "Users", value: "40k+" },
    ],
    techStack: ["Flutter", "WooCommerce", "WordPress", "Odoo", "REST API"],
    highlights: ["Mobile apps", "Secure payments", "Order tracking"],
    imageUrl:
      "https://play-lh.googleusercontent.com/PbDY_nXGPvv3UEvjSTa7MyWwqbHzGvbhAo9TPYpgvFDzHLjQqDXqmDfxVy8a7DOkzo8=w480-h960-rw",
    imageFit: "contain",
    confidential: false,
    featured: false,
    category: "Platform",
    platforms: {
      website: "https://goffa-eg.com",
      playStore:
        "https://play.google.com/store/apps/details?id=com.peacode.goffa",
      appStore: "https://apps.apple.com/eg/app/goffa/id6479247414",
    },
  },
  {
    id: "11",
    slug: createSlug("Teens Hangouts"),
    title: "Teens Hangouts",
    client: "Teens Hangouts",
    industry: "Social",
    year: "2018",
    description:
      "A social platform designed for teenagers to connect, share experiences, and build communities in a safe environment.",
    problem:
      "Teenagers needed a safe, age-appropriate social platform for connecting with peers.",
    solution:
      "We developed mobile applications with safety features, content moderation, and age-appropriate social tools.",
    impact:
      "Created a positive social environment for teenagers with strong safety measures and engaging features.",
    metrics: [
      { label: "Users", value: "80k+" },
      { label: "Daily Active", value: "20k+" },
      { label: "Rating", value: "4.6" },
    ],
    techStack: ["React", "Flutter", "Laravel", "Firebase", "REST API"],
    highlights: ["Safety features", "Content moderation", "Age-appropriate"],
    imageUrl:
      "https://play-lh.googleusercontent.com/WPBUYhTvE-HOyTC8F74P-oZa3ICCfgzNNXmiWXVB9d9zaRltxk2eJzVkqaGlxu39hto=w480-h960-rw",
    imageFit: "contain",
    confidential: false,
    featured: false,
    category: "Mobile",
    platforms: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.elshafey.hangouts",
      appStore: "https://apps.apple.com/us/app/teens-hangouts/id1527844249",
    },
  },
  {
    id: "12",
    slug: createSlug("Inovara"),
    title: "Inovara",
    client: "Inovara",
    industry: "Technology",
    year: "2022",
    description:
      "A technology solutions platform offering innovative services and products to businesses and individuals.",
    problem:
      "The company needed a professional web presence to showcase technology solutions and attract clients.",
    solution:
      "We developed a modern website with service showcases, case studies, and integrated contact forms.",
    impact:
      "Enhanced brand visibility and generated qualified leads through professional web presence.",
    metrics: [
      { label: "Visitors", value: "40k+" },
      { label: "Leads", value: "2k+" },
      { label: "Uptime", value: "99.9%" },
    ],
    techStack: ["Next.js", "React", "TypeScript", "Laravel", "REST API"],
    highlights: ["Service showcases", "Case studies", "Lead generation"],
    imageUrl: "https://inovara.net/inovara.svg",
    imageFit: "contain",
    confidential: false,
    featured: false,
    category: "Web",
    platforms: {
      website: "https://inovara.net",
    },
  },
  {
    id: "13",
    slug: createSlug("Waffar Cash"),
    title: "Waffar Cash",
    client: "Waffar Cash",
    industry: "Finance",
    year: "2024",
    description:
      "A financial services mobile application offering cashback rewards, payment solutions, and financial management tools.",
    problem:
      "Users needed a convenient way to earn rewards and manage financial transactions through mobile devices.",
    solution:
      "We developed native mobile applications with secure payment processing, reward tracking, and financial management features.",
    impact:
      "Increased user engagement and provided convenient financial services with attractive rewards.",
    metrics: [
      { label: "Users", value: "120k+" },
      { label: "Transactions", value: "1M+" },
      { label: "Rewards", value: "$500k+" },
    ],
    techStack: ["Flutter", "Firebase", "OneSignal", "REST API"],
    highlights: ["Cashback rewards", "Secure payments", "Financial tools"],
    imageUrl:
      "https://play-lh.googleusercontent.com/zIQoPb68PqYMyU6676usZaLc1yubCr4T37Fa6ffO67th-YUNHIs1AuKxxjGV3flVgg=w480-h960-rw",
    confidential: false,
    imageFit: "contain",
    featured: true,
    category: "Mobile",
    platforms: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.gao.waffar_cash&hl=en",
      appStore: "https://apps.apple.com/eg/app/waffar-cash/id1626369167",
    },
  },
  {
    id: "14",
    slug: createSlug("Uzex"),
    title: "Uzex",
    client: "Uzex",
    industry: "Business",
    year: "2024",
    description:
      "A business platform providing services and solutions with web presence and mobile application access.",
    problem:
      "The client needed a comprehensive platform accessible via web and mobile to serve customers effectively.",
    solution:
      "We developed a responsive web platform and Android mobile application with consistent user experiences.",
    impact:
      "Improved customer accessibility and engagement through multiple platform access points.",
    metrics: [
      { label: "Users", value: "60k+" },
      { label: "Services", value: "100+" },
      { label: "Uptime", value: "99.9%" },
    ],
    techStack: ["React", "Flutter", "Laravel", "MySQL", "REST API"],
    highlights: ["Multi-platform", "Consistent UX", "Service management"],
    imageUrl:
      "https://play-lh.googleusercontent.com/D7_A9DYkzkoS9jR0YcAkLuZApBH1zJHq2yY1hUgakRWKF0YIWq3XugZQV4dLUyCq9w=w480-h960-rw",
    imageFit: "contain",
    confidential: false,
    featured: false,
    category: "Platform",
    platforms: {
      website: "https://uzex.org",
      playStore:
        "https://play.google.com/store/apps/details?id=com.uzex.uzexAppApp",
    },
  },
  {
    id: "15",
    slug: createSlug("Teb & Aafya"),
    title: "Teb & Aafya",
    client: "Teb & Aafya",
    industry: "Healthcare",
    year: "2024",
    description:
      "A healthcare mobile application providing medical services, health information, and appointment booking.",
    problem:
      "Patients needed convenient access to healthcare services and information through mobile devices.",
    solution:
      "We developed an Android application with appointment booking, health records, and medical information access.",
    impact:
      "Improved patient access to healthcare services and streamlined appointment management.",
    metrics: [
      { label: "Users", value: "70k+" },
      { label: "Appointments", value: "150k+" },
      { label: "Rating", value: "4.5" },
    ],
    techStack: ["Flutter", "React", "Laravel", "MySQL", "REST API"],
    highlights: ["Appointment booking", "Health records", "Medical info"],
    imageUrl:
      "https://play-lh.googleusercontent.com/bkNolEF2pftIpFwaRB3uuMfT1GQDd8NhWFAwdXY2cdaWkTrA1Unc8DbXiOOgfKmeR8xM-rdvriQz_mi3-Y0G=w480-h960-rw",
    imageFit: "contain",
    confidential: false,
    featured: false,
    category: "Mobile",
    platforms: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.peacode.tebw3fyaandroid",
    },
  },
  {
    id: "16",
    slug: createSlug("Shotreed"),
    title: "Shotreed",
    client: "Shotreed",
    industry: "E-commerce",
    year: "2024",
    description:
      "An e-commerce mobile application offering quick shopping experiences with fast delivery options.",
    problem:
      "Customers needed a fast, convenient mobile shopping experience with quick delivery.",
    solution:
      "We developed native mobile applications with streamlined shopping, quick checkout, and delivery tracking.",
    impact:
      "Increased mobile sales and improved customer satisfaction with fast, convenient shopping.",
    metrics: [
      { label: "Users", value: "85k+" },
      { label: "Orders", value: "200k+" },
      { label: "Rating", value: "4.6" },
    ],
    techStack: ["Flutter", "WooCommerce", "WordPress", "REST API"],
    highlights: ["Quick checkout", "Delivery tracking", "Fast shopping"],
    imageUrl:
      "https://play-lh.googleusercontent.com/AEzLqoXwBcOgewBfl3CbStPkWEXyP7kSxv2UvcDkcOHz_m5OEV9nF_TbAGQepzuNyA=w480-h960-rw",
    imageFit: "contain",
    confidential: false,
    featured: false,
    category: "Mobile",
    platforms: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.hashtag.shotreed",
      appStore: "https://apps.apple.com/eg/app/shotreed/id6474687946",
    },
  },
  {
    id: "17",
    slug: createSlug("Woodex"),
    title: "Woodex",
    client: "Woodex",
    industry: "E-commerce",
    year: "2024",
    description:
      "A specialized e-commerce platform for wood products and furniture, with mobile applications for convenient shopping.",
    problem:
      "Customers needed a mobile-friendly way to browse and purchase wood products and furniture.",
    solution:
      "We developed mobile applications with product catalogs, customization options, and secure payment processing.",
    impact:
      "Increased mobile sales and provided customers with convenient access to wood products.",
    metrics: [
      { label: "Products", value: "2k+" },
      { label: "Orders", value: "30k+" },
      { label: "Users", value: "25k+" },
    ],
    techStack: ["Flutter", "WooCommerce", "WordPress", "REST API"],
    highlights: ["Product catalog", "Customization", "Secure payments"],
    imageUrl: "https://woodex-eg.com/wp-content/uploads/2023/02/woodexlogo.png",
    imageFit: "contain",
    confidential: false,
    featured: false,
    category: "Mobile",
    platforms: {
      website: "https://woodex-eg.com",
      playStore:
        "https://play.google.com/store/apps/details?id=com.hashtag.woodex",
      appStore: "https://apps.apple.com/eg/app/woodex/id6466213030",
    },
  },
  {
    id: "18",
    slug: createSlug("Gefires"),
    title: "Gefires",
    client: "Gefires",
    industry: "Business",
    year: "2024",
    description:
      "A professional business platform providing services and solutions with modern web technology.",
    problem:
      "The client needed a professional website to showcase services and connect with clients.",
    solution:
      "We developed a modern, responsive website with service showcases and contact integration.",
    impact: "Enhanced brand visibility and improved client acquisition.",
    metrics: [
      { label: "Visitors", value: "35k+" },
      { label: "Conversion", value: "4%" },
      { label: "Uptime", value: "99.9%" },
    ],
    techStack: ["Next.js", "React", "TypeScript", "Laravel", "REST API"],
    highlights: ["Responsive design", "SEO optimized", "Fast loading"],
    imageFit: "contain",
    imageUrl: "https://gefires.com//assets/logo-BEEtURtm.png",
    confidential: false,
    featured: false,
    category: "Web",
    platforms: {
      website: "https://gefires.com/",
    },
  },
  {
    id: "19",
    slug: createSlug("Rosto"),
    title: "Rosto",
    client: "Rosto",
    industry: "Food",
    year: "2024",
    description:
      "A food service mobile application offering restaurant services, ordering, and delivery options.",
    problem:
      "Customers needed a convenient way to order food and access restaurant services through mobile devices.",
    solution:
      "We developed native mobile applications with menu browsing, ordering, and delivery tracking.",
    impact:
      "Increased orders and improved customer satisfaction with convenient mobile access.",
    metrics: [
      { label: "Users", value: "95k+" },
      { label: "Orders", value: "300k+" },
      { label: "Rating", value: "4.7" },
    ],
    techStack: ["React", "Flutter", "Laravel", "Firebase", "REST API"],
    highlights: ["Menu browsing", "Ordering", "Delivery tracking"],
    imageUrl:
      "https://play-lh.googleusercontent.com/5BD1X9oRKT9aQhtosOcpR37h1TtQNJbVym354kBdSWJfxmGThlEkHKuORBV_x1OZIbU=w480-h960-rw",
    imageFit: "contain",
    confidential: false,
    featured: false,
    category: "Mobile",
    platforms: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.rosto.rosto",
      appStore: "https://apps.apple.com/eg/app/rosto/id6478112917",
    },
  },
  {
    id: "20",
    slug: createSlug("Vooo Menu"),
    title: "Vooo Menu",
    client: "Vooo Menu",
    industry: "Food",
    year: "2024",
    description:
      "A digital menu platform for restaurants, enabling customers to browse menus and place orders through mobile applications.",
    problem:
      "Restaurants needed a digital menu solution accessible to customers through mobile devices.",
    solution:
      "We developed mobile applications with digital menus, ordering capabilities, and restaurant integration.",
    impact:
      "Modernized restaurant ordering and improved customer experience with digital menus.",
    metrics: [
      { label: "Restaurants", value: "200+" },
      { label: "Users", value: "40k+" },
      { label: "Orders", value: "80k+" },
    ],
    techStack: ["React", "Flutter", "Laravel", "MySQL", "REST API"],
    highlights: ["Digital menus", "Ordering", "Restaurant integration"],
    imageUrl:
      "https://play-lh.googleusercontent.com/jF_jM__SZpmUoAAqT-SDm3KbWN9pz7MYvE1XbIS4V-Y7qrD2h6COM0Ijjj8pAQTElw=w480-h960-rw",
    confidential: false,
    featured: false,
    category: "Mobile",
    platforms: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.LinkedGates.vooo_menue&hl=en",
      appStore: "https://apps.apple.com/eg/app/vooo-menu/id1661463351",
    },
  },
  {
    id: "21",
    slug: createSlug("Vending"),
    title: "Vending",
    client: "Inovara",
    industry: "Retail",
    year: "2024",
    description:
      "A vending machine management platform providing remote monitoring, inventory management, and analytics.",
    problem:
      "Vending machine operators needed a centralized platform to manage machines, inventory, and sales.",
    solution:
      "We developed a web platform with machine monitoring, inventory tracking, and sales analytics.",
    impact:
      "Improved operational efficiency and increased profitability through better machine management.",
    metrics: [
      { label: "Machines", value: "500+" },
      { label: "Transactions", value: "1M+" },
      { label: "Uptime", value: "99.9%" },
    ],
    techStack: ["React", "Laravel", "MySQL", "REST API"],
    highlights: ["Machine monitoring", "Inventory tracking", "Sales analytics"],
    imageUrl: "https://vending.inovara.net/assets/logo-CdXygyIl.svg",
    confidential: false,
    imageFit: "contain",
    featured: false,
    category: "Web",
    platforms: {
      website: "https://vending.inovara.net",
    },
  },
  {
    id: "22",
    slug: createSlug("Shopisonic"),
    title: "Shopisonic",
    client: "Shopisonic",
    industry: "E-commerce",
    year: "2024",
    description:
      "An e-commerce platform offering a wide range of products with modern web technology and seamless shopping experiences.",
    problem:
      "The business needed a professional e-commerce website to sell products online effectively.",
    solution:
      "We developed a responsive e-commerce platform with product catalogs, secure checkout, and order management.",
    impact:
      "Increased online sales and provided customers with a seamless shopping experience.",
    metrics: [
      { label: "Products", value: "8k+" },
      { label: "Orders", value: "150k+" },
      { label: "Users", value: "60k+" },
    ],
    techStack: ["Next.js", "React", "Laravel", "MySQL", "REST API"],
    highlights: ["Product catalog", "Secure checkout", "Order management"],
    imageFit: "contain",
    imageUrl: "https://shopisonic.com/icon.svg",
    confidential: false,
    featured: false,
    category: "Web",
    platforms: {
      website: "https://shopisonic.com/",
    },
  },
  {
    id: "23",
    slug: createSlug("M3lesh"),
    title: "M3lesh",
    client: "M3lesh",
    industry: "Services",
    year: "2023",
    description:
      "A service platform mobile application connecting users with service providers for various needs.",
    problem:
      "Users needed a convenient way to find and book services through mobile devices.",
    solution:
      "We developed an Android application with service search, booking, and provider management.",
    impact:
      "Facilitated service bookings and connected users with service providers efficiently.",
    metrics: [
      { label: "Users", value: "55k+" },
      { label: "Services", value: "500+" },
      { label: "Bookings", value: "100k+" },
    ],
    techStack: ["Flutter", "Firebase", "REST API"],
    highlights: ["Service search", "Booking", "Provider management"],
    imageUrl:
      "https://play-lh.googleusercontent.com/2augLqz59Qd0UGRtAcbCcDahOedBixj-y_K8ekEe7bU3tPDuAHpW9MSVDW9DVmxcVA=w480-h960-rw",
    imageFit: "contain",
    confidential: false,
    featured: false,
    category: "Mobile",
    platforms: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.goldscrum.m3lesh",
    },
  },
  {
    id: "24",
    slug: createSlug("Elmongez"),
    title: "Elmongez",
    client: "Elmongez",
    industry: "E-commerce",
    year: "2023",
    description:
      "An e-commerce mobile application offering products and services with convenient shopping experiences.",
    problem:
      "The business needed a mobile application to reach customers and provide convenient shopping.",
    solution:
      "We developed an Android application with product browsing, secure checkout, and order tracking.",
    impact:
      "Expanded customer reach and increased sales through mobile channels.",
    metrics: [
      { label: "Products", value: "3k+" },
      { label: "Orders", value: "60k+" },
      { label: "Users", value: "35k+" },
    ],
    techStack: ["Flutter", "WooCommerce", "WordPress", "REST API"],
    highlights: ["Product browsing", "Secure checkout", "Order tracking"],
    imageUrl:
      "https://play-lh.googleusercontent.com/JIi4G0UT3QIeTisJ1F_iF2kwuSI692zL7uu9AA_PSWezAGMhxQuuYIdhz1ssVi2lHA=w480-h960-rw",
    confidential: false,
    imageFit: "contain",
    featured: false,
    category: "Mobile",
    platforms: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.hashtag.elmongez",
    },
  },
  {
    id: "25",
    slug: createSlug("IBDL"),
    title: "IBDL",
    client: "IBDL",
    industry: "Education",
    year: "2022",
    description:
      "An educational platform providing learning resources and services through modern web technology.",
    problem:
      "The institution needed a professional website to provide educational resources and information.",
    solution:
      "We developed a responsive web platform with resource management and information dissemination.",
    impact:
      "Improved access to educational resources and enhanced institutional communication.",
    metrics: [
      { label: "Users", value: "25k+" },
      { label: "Resources", value: "1k+" },
      { label: "Uptime", value: "99.9%" },
    ],
    techStack: ["Next.js", "React", "TypeScript", "Laravel", "REST API"],
    highlights: [
      "Resource management",
      "Responsive design",
      "Fast performance",
    ],
    imageFit: "contain",
    imageUrl: "https://ibdl.net/site/images/logo.png",
    confidential: false,
    featured: false,
    category: "Web",
    platforms: {
      website: "https://ibdl.net/",
    },
  },
  {
    id: "26",
    slug: createSlug("Hafawa"),
    title: "Hafawa",
    client: "Hafawa",
    industry: "Services",
    year: "2024",
    description:
      "A service platform mobile application for users to access and request various services.",
    problem:
      "Users needed a mobile application to access services and make requests conveniently.",
    solution:
      "We developed an iOS application with service browsing, request management, and user accounts.",
    impact:
      "Improved user access to services and streamlined service requests.",
    metrics: [
      { label: "Users", value: "65k+" },
      { label: "Services", value: "300+" },
      { label: "Requests", value: "120k+" },
    ],
    techStack: ["Flutter", "React", "Node.js", "MongoDB", "REST API"],
    highlights: ["Service browsing", "Request management", "User accounts"],
    imageUrl: "https://saharadvocates.ae/img/logo/logo.svg",
    imageFit: "contain",
    confidential: false,
    featured: false,
    category: "Mobile",
    platforms: {
      appStore: "https://apps.apple.com/eg/app/hafawa/id6745311601",
    },
  },
  {
    id: "27",
    slug: createSlug("Govet"),
    title: "Govet",
    client: "Govet",
    industry: "Services",
    year: "2024",
    description:
      "A service platform mobile application connecting users with service providers for various needs.",
    problem:
      "Users needed a convenient mobile application to find and book services.",
    solution:
      "We developed an Android application with service search, booking, and provider management features.",
    impact:
      "Facilitated service bookings and improved user access to services.",
    metrics: [
      { label: "Users", value: "75k+" },
      { label: "Services", value: "400+" },
      { label: "Bookings", value: "150k+" },
    ],
    techStack: ["Flutter", "Firebase", "REST API"],
    highlights: ["Service search", "Booking", "Provider management"],
    imageUrl:
      "https://play-lh.googleusercontent.com/Fyo65Hfdqr2fCNRrnxmtFx6J4ER5cuARvErQPuQGahz6T050NECbT-pAmp2yBXCVupBo=w240-h480-rw",
    imageFit: "contain",
    confidential: false,
    featured: false,
    category: "Mobile",
    platforms: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.technospace.govet",
    },
  },
  {
    id: "28",
    slug: createSlug("Saharad"),
    title: "Saharad",
    client: "Saharad Advocates",
    industry: "Legal",
    year: "2024",
    description:
      "A professional legal services platform providing information, services, and client resources through modern web technology.",
    problem:
      "The law firm needed a professional website to showcase services and provide information to clients.",
    solution:
      "We developed a modern, professional website with service showcases, team information, and contact integration.",
    impact:
      "Enhanced professional presence and improved client engagement through professional web platform.",
    metrics: [
      { label: "Visitors", value: "20k+" },
      { label: "Engagement", value: "65%" },
      { label: "Uptime", value: "99.9%" },
    ],
    techStack: ["Next.js", "React", "TypeScript", "Node.js", "REST API"],
    highlights: [
      "Professional design",
      "Service showcases",
      "Client resources",
    ],
    imageUrl: "https://saharadvocates.ae/img/logo/logo.svg",
    imageFit: "contain",
    confidential: false,
    featured: false,
    category: "Web",
    platforms: {
      website: "https://saharadvocates.ae",
    },
  },
];