import { NextResponse } from 'next/server'

import { NavLinkType } from '@/app/types/navlink'
import { ProjectType } from '@/app/types/project'
import { RecordType } from '@/app/types/record'
import { ReviewType } from '@/app/types/review'
import { SpecializeType } from '@/app/types/specialize'
import { PlanType } from '@/app/types/plan'
import { CategoryType } from '@/app/types/category'
import { FooterLinkType } from '@/app/types/footerlinks'
import { HeroType } from '@/app/types/hero'

const HeroData: HeroType[] = [
  {
    imgSrc: '/images/banner/blogforgeCover.webp',
  },
  {
    imgSrc: '/images/banner/gleamerCover.webp',
  },
  {
    imgSrc: '/images/banner/learnaxisCover.webp',
  },
  {
    imgSrc: '/images/banner/studiovaCover.webp',
  },
]

const NavLinkData: NavLinkType[] = [
  {
    label: 'About',
    href: '/#about',
  },
  {
    label: 'Work',
    href: '/#project',
  },
  {
    label: 'Expertise',
    href: '/#expertise',
  },
  {
    label: 'Services',
    href: '/#categories',
  },
]

const ProjectData: ProjectType[] = [
  {
    coverImg: '/images/project/blogforge.webp',
    name: 'Blog Forge',
  },
  {
    coverImg: '/images/project/gleamer.webp',
    name: 'Gleamer',
  },
  {
    coverImg: '/images/project/learnaxis.webp',
    name: 'Learnaxis',
  },
  {
    coverImg: '/images/project/studiova.webp',
    name: 'Studiova',
  },
  {
    coverImg: '/images/project/homely.webp',
    name: 'Homely',
  },
  {
    coverImg: '/images/project/awake.webp',
    name: 'Awake',
  },
  {
    coverImg: '/images/project/endeavor.webp',
    name: 'Endeavor',
  },
]

const RecordData: RecordType[] = [
  {
    imgSrc: '/images/records/star.svg',
    digit: '100% On-Time',
    desc: 'Consistent delivery with perfect-quality execution and reliability',
  },
  {
    imgSrc: '/images/records/user.svg',
    digit: 'Top-Tier Brands',
    desc: 'Trusted by enterprise clients for premium technology solutions',
  },
  {
    imgSrc: '/images/records/cart.svg',
    digit: 'Long-Term Partnerships',
    desc: 'Building lasting relationships through exceptional service and results',
  },
  {
    imgSrc: '/images/records/star.svg',
    digit: 'Premium Execution',
    desc: 'World-class digital experiences with exceptional attention to detail',
  },
];


const ReviewData: ReviewType[] = [
  {
    imgSrc: '/images/review/daniel.webp',
    name: 'Daniel Reid',
    rating: 5.0,
    desc: 'Oraixen delivered our enterprise platform on time with exceptional quality. Their attention to detail and reliability is unmatched.',
  },
  {
    imgSrc: '/images/review/sophia.webp',
    name: 'Sophia Turner',
    rating: 5.0,
    desc: 'The mobile application exceeded our expectations. Premium execution and seamless integration with our existing systems.',
  },
  {
    imgSrc: '/images/review/marcus.webp',
    name: 'Marcus Lee',
    rating: 5.0,
    desc: 'Long-term partnership with Oraixen has transformed our technology infrastructure. Trustworthy, reliable, and detail-obsessed.',
  },
]

const SpecializeData: SpecializeType[] = [
  {
    imgSrc: '/images/specialization/mobileapp.svg',
    title: 'Mobile App Development',
    desc: 'Enterprise-grade iOS and Android applications built for scale, performance, and reliability.',
  },
  {
    imgSrc: '/images/specialization/webdesign.svg',
    title: 'Web Development',
    desc: 'Premium web platforms and corporate software solutions with exceptional attention to detail.',
  },
  {
    imgSrc: '/images/specialization/webdesign.svg',
    title: 'Corporate Software Platforms',
    desc: 'Custom enterprise solutions designed for long-term scalability and seamless integration.',
  },
  {
    imgSrc: '/images/specialization/webdesign.svg',
    title: 'Integrated AI Solutions',
    desc: 'Intelligent systems combining hardware, software, and AI for next-generation experiences.',
  },
]

const PlanData: PlanType[] = [
  {
    type: 'Enterprise',
    price: {
      monthly: 0,
      yearly: 0,
    },
    desc: 'Custom solutions tailored to your enterprise needs.',
    option: [
      'Dedicated project management',
      'Premium development and execution',
      'Unlimited revisions and iterations',
      'Enterprise-grade security and scalability',
      '24/7 priority support and maintenance',
      'Long-term partnership framework',
    ],
  },
  {
    type: 'Custom',
    price: {
      monthly: 0,
      yearly: 0,
    },
    desc: 'Bespoke solutions for unique requirements.',
    option: [
      'Strategic consultation and planning',
      'Custom hardware and software integration',
      'AI and machine learning solutions',
      'Full-stack development expertise',
      'Ongoing optimization and support',
      'Flexible engagement models',
    ],
  },
]

const CategoryData: CategoryType[] = [
  {
    imgSrc: '/images/category/mobileapp.webp',
    title: 'Mobile App Development',
  },
  {
    imgSrc: '/images/category/webdev.webp',
    title: 'Web Development',
  },
  {
    imgSrc: '/images/category/webdev.webp',
    title: 'Corporate Software',
  },
  {
    imgSrc: '/images/category/webdev.webp',
    title: 'AI Solutions',
  },
]

const FooterLinkData: FooterLinkType[] = [
  {
    section: 'Company',
    links: [
      {
        label: 'About',
        href: '/#about',
      },
      {
        label: 'Work',
        href: '/#project',
      },
      {
        label: 'Expertise',
        href: '/#expertise',
      },
      {
        label: 'Services',
        href: '/#categories',
      },
    ],
  },
  {
    section: 'Support',
    links: [
      { label: 'Contact', href: '/#contact' },
      { label: 'Terms of Service', href: '/' },
      { label: 'Privacy Policy', href: '/' },
      { label: 'Legal', href: '/' },
    ],
  },
]

export const GET = () => {
  return NextResponse.json({
    HeroData,
    NavLinkData,
    ProjectData,
    RecordData,
    ReviewData,
    SpecializeData,
    PlanData,
    CategoryData,
    FooterLinkData,
  })
}
