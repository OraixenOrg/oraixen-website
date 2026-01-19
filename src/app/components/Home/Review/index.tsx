'use client'

import { useEffect, useState } from 'react'
import { ReviewType } from '@/app/types/review'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ReviewSkeleton from '../../Skeleton/Review'

const Review = () => {
  const [review, setReview] = useState<ReviewType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setReview(data.ReviewData)
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
    slidesToShow: 3,
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
          slidesToShow: 1,
        },
      },
    ],
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const halfStars = rating % 1 >= 0.5 ? 1 : 0
    const emptyStars = 5 - fullStars - halfStars

    return (
      <div className='flex items-center gap-0.5'>
        {[...Array(fullStars)].map((_, i) => (
          <Icon
            key={`full-${i}`}
            icon='tabler:star-filled'
            className='text-yellow-500 text-base'
          />
        ))}
        {halfStars > 0 && (
          <Icon
            key='half'
            icon='tabler:star-half-filled'
            className='text-yellow-500 text-base'
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Icon
            key={`empty-${i}`}
            icon='tabler:star-filled'
            className='text-gray-400 text-base'
          />
        ))}
      </div>
    )
  }

  return (
    <section className='bg-darkazure/5'>
      <div className='container'>
        <div className='mb-10 text-center'>
          <h2>Client Testimonials</h2>
          <p className='text-lg font-normal max-w-2xl mx-auto mt-4'>
            Trusted by top-tier brands for reliable delivery and exceptional results.
          </p>
        </div>
        {/* slider */}
        <Slider {...settings}>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <ReviewSkeleton key={i} />
              ))
            : review.map((item, i) => (
                <div key={i}>
                  <div className='m-3 p-6 bg-white rounded-lg border border-darkazure/10'>
                    <div className='flex items-center gap-4 mb-5'>
                      <div className='relative'>
                        <Image
                          src={item.imgSrc}
                          alt={item.name}
                          width={48}
                          height={48}
                          className='rounded-full'
                        />
                        <div className='absolute bottom-0 right-0'>
                          <Image
                            src={'/images/banner/greentick.svg'}
                            alt='tick'
                            width={15}
                            height={15}
                          />
                        </div>
                      </div>
                      <div>
                        <h6>{item.name}</h6>
                        <div>
                          {renderStars(item.rating)} {/* Dynamic stars */}
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className='text-base font-normal'>{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
        </Slider>
      </div>
    </section>
  )
}

export default Review
