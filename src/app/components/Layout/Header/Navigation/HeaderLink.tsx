'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavLinkType } from '@/app/types/navlink'

const HeaderLink: React.FC<{ item: NavLinkType }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false)

  const handleMouseEnter = () => {
    if (item.submenu) {
      setSubmenuOpen(true)
    }
  }

  const handleMouseLeave = () => {
    setSubmenuOpen(false)
  }

  const path = usePathname()

  return (
    <li
      className='relative'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <Link
        href={item.href}
        className={`text-base flex font-normal text-darkblue hover:text-primary transition-colors duration-300 ${
          item.href === path ? '!text-primary' : null
        } ${
          path.startsWith(`/${item.label.toLowerCase()}`)
            ? 'text-primary'
            : null
        }`}>
        {item.label}
        {item.submenu && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1.5em'
            height='1.5em'
            viewBox='0 0 24 24'>
            <path
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
              d='m7 10l5 5l5-5'
            />
          </svg>
        )}
      </Link>
      {submenuOpen && (
        <ul className='absolute py-2 left-0 mt-0.5 w-60 bg-white shadow-lg rounded-lg'>
          {item.submenu?.map((subItem, index) => (
            <li key={index}>
              <Link
                href={subItem.href}
                className='block px-4 py-2 text-darkblue hover:bg-neutral-50 hover:text-primary transition-all duration-300'>
                {subItem.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

export default HeaderLink
