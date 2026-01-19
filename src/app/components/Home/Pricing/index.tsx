'use client'

import { PlanType } from '@/app/types/plan'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import PricingSkeleton from '../../Skeleton/Pricing'

const Pricing = () => {
  const [plan, setPlan] = useState<PlanType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setPlan(data.PlanData)
      } catch (error) {
        console.error('Error fetching service', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])


  return (
    <section id='pricing' className='scroll-mt-12'>
      <div className='container'>
        <div className='text-center'>
          <h2>Enterprise Solutions</h2>
          <p className='text-lg font-normal max-w-lg mx-auto my-6'>
            Custom pricing tailored to your enterprise needs and long-term objectives.
          </p>
        </div>
        {/* grid layout */}
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-6 max-w-5xl mx-auto'>
          {/* plans card */}
          {loading
            ? Array.from({ length: 2 }).map((_, i) => (
                <PricingSkeleton key={i} />
              ))
            : plan.map((item, i) => (
                <div key={i}>
                  <div className='bg-white rounded-lg shadow-lg border border-darkazure/20 px-7 py-10 h-full'>
                    <div className='flex flex-col gap-6 border-b border-darkazure/20 pb-6'>
                      <p className='text-2xl font-bold'>{item.type}</p>
                      <p className='text-5xl font-bold text-lightdarkblue'>
                        Custom
                      </p>
                      <p className='text-base font-normal text-lightgrey mt-2'>
                        Pricing tailored to your requirements
                      </p>
                      <p className='text-base font-normal'>{item.desc}</p>
                    </div>
                    {/* options */}
                    <div>
                      <ul className='flex flex-col gap-6 my-6'>
                        {item.option.map((feat, i) => (
                          <li key={i}>
                            <div className='flex items-center gap-3'>
                              <div className='p-1 rounded-full bg-darkazure/10 text-darkazure'>
                                <Icon
                                  icon={'material-symbols:check-rounded'}
                                  width={19}
                                  height={19}
                                />
                              </div>
                              <p className='text-base font-normal'>{feat}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button className='bg-primary border border-primary py-3 w-full rounded-lg text-white hover:bg-transparent hover:text-primary hover:cursor-pointer transition-all duration-300'>
                      Get Started
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
