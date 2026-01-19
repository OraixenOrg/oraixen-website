import { NextResponse } from 'next/server'

import { NavLinkType } from '../../types/navlink'
import { ProjectType } from '../../types/project'
import { RecordType } from '../../types/record'
import { ReviewType } from '../../types/review'
import { SpecializeType } from '../../types/specialize'
import { PlanType } from '../../types/plan'
import { CategoryType } from '../../types/category'
import { FooterLinkType } from '../../types/footerlinks'
import { HeroType } from '../../types/hero'

const HeroData: HeroType[] = [
  {
    imgSrc: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600',
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
    coverImg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    name: 'Zewail City',
    platforms: {
      website: 'https://zewailcity.edu.eg/',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    name: 'Abdelrhman Mohamed',
    platforms: {
      playStore: 'https://play.google.com/store/apps/details?id=com.elshafey.abd',
      appStore: 'https://apps.apple.com/eg/app/abdelrhman-mohamed/id1600160743',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800',
    name: 'Alkanz',
    platforms: {
      website: 'https://kenz.hashtaghostings.com/',
      playStore: 'https://play.google.com/store/apps/details?id=com.metagate.alkanzz&hl=en',
      appStore: 'https://apps.apple.com/eg/app/dar-alkahrba/id1597367206',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
    name: 'Dar Alkahraba',
    platforms: {
      appStore: 'https://apps.apple.com/eg/app/dar-alkahrba/id1597367206',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    name: 'DU V DU',
    platforms: {
      website: 'https://duvdu.com',
      playStore: 'https://play.google.com/store/apps/details?id=com.duvdu.duvdu',
      appStore: 'https://apps.apple.com/eg/app/duvdu/id6743176883',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    name: 'Discount Emy',
    platforms: {
      website: 'https://emydiscount.com/',
      playStore: 'https://play.google.com/store/apps/details?id=com.technospace.emy_discount',
      appStore: 'https://apps.apple.com/eg/app/discount-emy/id1617326763',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    name: 'Order FS',
    platforms: {
      website: 'https://www.orderfs.online',
      dashboard: 'https://dashboard.orderfs.online',
      playStore: 'https://play.google.com/store/apps/details?id=com.order.order',
      appStore: 'https://apps.apple.com/eg/app/order-fs/id6450720518',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    name: 'MAAT',
    platforms: {
      website: 'https://maat.vip',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    name: 'Maqdia',
    platforms: {
      dashboard: 'https://maqdya.com/admin',
      playStore: 'https://play.google.com/store/apps/details?id=com.maqdyya.maqdyya',
      appStore: 'https://apps.apple.com/eg/app/maqdia/id6753150399',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800',
    name: 'CarX',
    platforms: {
      website: 'https://carx.asusapps.com/',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
    name: 'M6lob',
    platforms: {
      website: 'https://m6lob.org',
      playStore: 'https://play.google.com/store/apps/details?id=com.jobs.m6lob',
      appStore: 'https://apps.apple.com/eg/app/mtlob-%D9%85%D8%B7%D9%84%D9%88%D8%A8/id6499473889',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    name: 'Goffa',
    platforms: {
      website: 'https://goffa-eg.com',
      playStore: 'https://play.google.com/store/apps/details?id=com.peacode.goffa',
      appStore: 'https://apps.apple.com/eg/app/goffa/id6479247414',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    name: 'Shaaml',
    platforms: {
      website: 'https://shaaml.com',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    name: 'Teens Hangouts',
    platforms: {
      playStore: 'https://play.google.com/store/apps/details?id=com.elshafey.hangouts',
      appStore: 'https://apps.apple.com/us/app/teens-hangouts/id1527844249',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    name: 'Inovara',
    platforms: {
      website: 'https://inovara.net',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    name: 'Waffar Cash',
    platforms: {
      playStore: 'https://play.google.com/store/apps/details?id=com.gao.waffar',
      appStore: 'https://apps.apple.com/eg/app/waffar-cash/id1626369167',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800',
    name: 'Lookfindr',
    platforms: {
      website: 'https://www.lookfindr.com/',
      playStore: 'https://play.google.com/store/apps/details?id=com.naya.lookfindr',
      appStore: 'https://apps.apple.com/eg/app/lookfindr/id6477915683',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
    name: 'Lookfindr Business',
    platforms: {
      playStore: 'https://play.google.com/store/apps/details?id=com.naya.lookfindr.business',
      appStore: 'https://apps.apple.com/eg/app/lookfindr-business/id6566175689',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    name: 'Uzex',
    platforms: {
      website: 'https://uzex.org',
      playStore: 'https://play.google.com/store/apps/details?id=com.uzex.uzexAppApp',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    name: 'Teb & Aafya',
    platforms: {
      playStore: 'https://play.google.com/store/apps/details?id=com.peacode.tebw3fyaandroid',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    name: 'Shotreed',
    platforms: {
      playStore: 'https://play.google.com/store/apps/details?id=com.hashtag.shotreed',
      appStore: 'https://apps.apple.com/eg/app/shotreed/id6474687946',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    name: 'Woodex',
    platforms: {
      playStore: 'https://play.google.com/store/apps/details?id=com.hashtag.woodex',
      appStore: 'https://apps.apple.com/eg/app/woodex/id6466213030',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    name: 'Montgatk',
    platforms: {
      playStore: 'https://play.google.com/store/apps/details?id=com.hashtag.montgatk',
      appStore: 'https://apps.apple.com/eg/app/montgatk/id6468681893',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800',
    name: 'Gefires',
    platforms: {
      website: 'https://gefires.com/',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
    name: 'Rosto',
    platforms: {
      playStore: 'https://play.google.com/store/apps/details?id=com.rosto.rosto',
      appStore: 'https://apps.apple.com/eg/app/rosto/id6478112917',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    name: 'Vooo Menu',
    platforms: {
      playStore: 'https://play.google.com/store/apps/details?id=com.LinkedGates.vooo_',
      appStore: 'https://apps.apple.com/eg/app/vooo-menu/id1661463351',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    name: 'Vending',
    platforms: {
      website: 'https://vending.inovara.net',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    name: 'Shopisonic',
    platforms: {
      website: 'https://shopisonic.com/',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    name: 'M3lesh',
    platforms: {
      playStore: 'https://play.google.com/store/apps/details?id=com.goldscrum.m3lesh',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    name: 'Elmongez',
    platforms: {
      playStore: 'https://play.google.com/store/apps/details?id=com.hashtag.elmongez',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800',
    name: 'Alkanzz',
    platforms: {
      playStore: 'https://play.google.com/store/apps/details?id=com.metagate.alkanzz',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
    name: 'IBDL',
    platforms: {
      website: 'https://ibdl.techiesonic.com',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    name: 'Hafawa User',
    platforms: {
      appStore: 'https://apps.apple.com/eg/app/hafawa/id6745311601',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    name: 'Hafawa Business',
    platforms: {
      appStore: 'https://apps.apple.com/eg/app/hafawa-business/id6745311661',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    name: 'Hafawa Delivery',
    platforms: {
      appStore: 'https://apps.apple.com/eg/app/hafawa-delivery/id6745311686',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    name: 'Govet',
    platforms: {
      playStore: 'https://play.google.com/store/apps/details?id=com.technospace.govet',
    },
  },
  {
    coverImg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    name: 'Saharad',
    platforms: {
      website: 'https://saharadvocates.ae',
    },
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
