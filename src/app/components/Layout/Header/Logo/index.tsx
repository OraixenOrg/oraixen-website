import Link from 'next/link'
import Image from 'next/image'

const Logo = () => {
  return (
    <Link href='/'>
      <Image
        src='/images/logo/logo.svg'
        alt='logo'
        width={151}
        height={56}
        className='w-full block'        
      />
    </Link>
  )
}

export default Logo
