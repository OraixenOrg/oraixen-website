'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { HeroType } from '@/app/types/hero'
import HeroSkeleton from '../../Skeleton/Hero'
import Link from 'next/link'

const Hero = () => {
  const [heroimg, setHeroimg] = useState<HeroType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setHeroimg(data.HeroData)
      } catch (error) {
        console.error('Error fetching service', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    cssEase: 'linear',
  }

  return (
    <section>
      <div className='overflow-hidden'>
        <div className='container relative z-20 pt-24'>
          <div className='relative z-20 grid lg:grid-cols-12 grid-cols-1 items-center lg:justify-items-normal justify-items-center gap-20 pb-10'>
            <div className='lg:col-span-7 col-span-1'>
              <div className='flex flex-col lg:items-start items-center gap-12'>
                <h1 className='lg:text-start text-center max-w-2xl'>
                  Premium Technology Solutions Built for Enterprise
                </h1>
                <p className='text-lg font-normal text-lightgrey lg:text-start text-center max-w-xl'>
                  Mobile apps, web platforms, and integrated AI solutions delivered with precision, reliability, and exceptional attention to detail.
                </p>
                <div className='flex item-center gap-5'>
                  <Link href={'/#project'}>
                    <button className='px-12 py-3 font-medium text-white border rounded-lg border-primary bg-primary hover:bg-transparent hover:text-primary hover:cursor-pointer transition-all duration-300'>
                      View Our Work
                    </button>
                  </Link>
                  <Link href={'/#contact'}>
                    <button className='px-12 py-3 font-medium text-primary border rounded-lg border-primary bg-transparent hover:bg-primary hover:text-white hover:cursor-pointer transition-all duration-300'>
                      Start a Project
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            {/* slider */}
            <div className='lg:col-span-5 col-span-1 lg:w-full sm:w-[80%] w-full'>
              <div>
                <Slider {...settings}>
                  {loading
                    ? Array.from({ length: 3 }).map((_, i) => (
                        <HeroSkeleton key={i} />
                      ))
                    : heroimg.map((item, i) => (
                        <div key={i}>
                          <Image
                            src={item.imgSrc}
                            alt={item.imgSrc}
                            width={600}
                            height={420}
                            className='rounded-lg w-full'
                          />
                        </div>
                      ))}
                </Slider>
              </div>
            </div>
          </div>
          {/* Floating decorative images */}
          <div className='absolute top-16 -left-10'>
            <Image
              src={'/images/banner/pattern1.svg'}
              alt='ptrn1'
              width={141}
              height={141}
            />
          </div>
          <div className='absolute bottom-0 left-[53%] z-10'>
            <Image
              src={'/images/banner/pattern2.svg'}
              alt='ptrn1'
              width={141}
              height={141}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
