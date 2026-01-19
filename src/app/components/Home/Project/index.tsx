'use client'

import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect, useState } from 'react'
import { ProjectType } from '@/app/types/project'
import ProjectSkeleton from '../../Skeleton/Project'

const Project = () => {
  const [project, setProject] = useState<ProjectType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setProject(data.ProjectData || [])
      } catch (error) {
        console.error('Error fetching service', error)
        setProject([]) // Set empty array on error to prevent crashes
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
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <div id='project' className='scroll-mt-12'>
      <section className='bg-darkazure/5 overflow-hidden'>
        <div className='container relative'>
          <div className='mb-4'>
            <h2 className='text-center'>Our Work</h2>
          </div>
          <div className='md:max-w-45 mx-auto mb-8'>
            <p className='text-xl font-normal text-center leading-8'>
              Enterprise-grade solutions delivered with precision and reliability.
            </p>
          </div>
          {/* slider */}
          <div className='relative z-20'>
            <Slider {...settings}>
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <ProjectSkeleton key={i} />
                  ))
                : project.map((item, i) => (
                    <div key={i}>
                      <div className='p-5 bg-white m-3 rounded-lg border border-darkazure/10'>
                        <div className='w-full mb-4 relative aspect-square overflow-hidden rounded-lg bg-gray-200'>
                          <Image
                            src={item.coverImg}
                            alt={item.name || 'Project image'}
                            width={234}
                            height={236}
                            className='w-full h-full object-cover rounded-lg'
                            onError={(e) => {
                              // Fallback to placeholder on error
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800';
                            }}
                          />
                        </div>
                        <div className='flex items-center gap-2 mb-3'>
                          <Image
                            src={'/images/project/get-nextjs-logo.svg'}
                            alt={'logo'}
                            width={31}
                            height={31}
                            className='rounded-full'
                          />
                          <p className='text-base font-medium text-darkblue'>
                            {item.name}
                          </p>
                        </div>
                        {item.platforms && (
                          <div className='flex flex-wrap gap-2'>
                            {item.platforms.website && (
                              <a
                                href={item.platforms.website}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-xs px-2 py-1 bg-darkazure/10 text-darkblue rounded hover:bg-darkazure/20 transition-colors'
                              >
                                Website
                              </a>
                            )}
                            {item.platforms.playStore && (
                              <a
                                href={item.platforms.playStore}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-xs px-2 py-1 bg-darkazure/10 text-darkblue rounded hover:bg-darkazure/20 transition-colors'
                              >
                                Play Store
                              </a>
                            )}
                            {item.platforms.appStore && (
                              <a
                                href={item.platforms.appStore}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-xs px-2 py-1 bg-darkazure/10 text-darkblue rounded hover:bg-darkazure/20 transition-colors'
                              >
                                App Store
                              </a>
                            )}
                            {item.platforms.dashboard && (
                              <a
                                href={item.platforms.dashboard}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-xs px-2 py-1 bg-darkazure/10 text-darkblue rounded hover:bg-darkazure/20 transition-colors'
                              >
                                Dashboard
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
            </Slider>
          </div>
          {/* Floating decorative images */}
          <div className='absolute top-28 -left-9'>
            <Image
              src={'/images/banner/pattern1.svg'}
              alt='ptrn1'
              width={141}
              height={141}
            />
          </div>
          <div className='absolute -bottom-7 -right-7 z-10'>
            <Image
              src={'/images/banner/pattern2.svg'}
              alt='ptrn1'
              width={141}
              height={141}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Project
