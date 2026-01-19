'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import HeaderLink from './Navigation/HeaderLink'
import MobileHeaderLink from './Navigation/MobileHeaderLink'
import { NavLinkType } from '@/app/types/navlink'

const Header: React.FC = () => {
  const [navlink, setNavlink] = useState<NavLinkType[]>([])
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [sticky, setSticky] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setNavlink(data.NavLinkData)
      } catch (error) {
        console.error('Error fetching service', error)
      }
    }
    fetchData()
  }, [])

  const handleScroll = () => {
    setSticky(window.scrollY >= 80)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [navbarOpen])

  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [navbarOpen])

  return (
    <header
      className={`fixed top-0 py-1 z-50 w-full bg-transparent transition-all ${
        sticky ? 'shadow-lg bg-white' : 'shadow-none'
      }`}>
      <div
        className={`container flex items-center justify-between gap-10 duration-300  ${
          sticky ? 'py-3' : 'py-4'
        }`}>
        <Logo />
        <nav>
          <ul className='hidden xl:flex flex-grow items-center justify-start gap-10 '>
            {navlink.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </ul>
        </nav>
        <div className='flex items-center gap-4'>
          <Link
            href='/#contact'
            className='hidden xl:block px-4 py-2 bg-primary text-white rounded-lg outline-none hover:bg-transparent hover:text-primary border border-primary transition-all duration-300 text-base font-semibold'>
            Contact Us
          </Link>
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className='block xl:hidden p-2 rounded-lg hover:cursor-pointer'
            aria-label='Toggle mobile menu'>
            <span className='block w-6 h-0.5 bg-darkblue'></span>
            <span className='block w-6 h-0.5 bg-darkblue mt-1.5'></span>
            <span className='block w-6 h-0.5 bg-darkblue mt-1.5'></span>
          </button>
        </div>
      </div>
      {navbarOpen && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-40' />
      )}
      <div
        ref={mobileMenuRef}
        className={`xl:hidden fixed top-0 right-0 h-full w-full bg-white shadow-lg transform transition-all duration-300 max-w-xs ${
          navbarOpen ? 'translate-x-0' : 'translate-x-full'
        } z-50`}>
        <div className='flex items-center justify-between p-4'>
          <Logo />
          <button
            onClick={() => setNavbarOpen(false)}
            aria-label='Close mobile menu'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              className='hover:text-primary hover:cursor-pointer transition-colors duration-300'>
              <path
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <nav className='flex flex-col items-start p-4'>
          {navlink.map((item, index) => (
            <MobileHeaderLink key={index} item={item} />
          ))}
          <div className='mt-4 flex flex-col gap-4 w-full'>
            <Link
              href='/#contact'
              className='px-4 py-2 bg-primary text-white rounded-lg outline-none hover:bg-transparent hover:text-primary border border-primary transition-all duration-300 text-base font-semibold'
              onClick={() => {
                setNavbarOpen(false)
              }}>
              Contact Us
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
