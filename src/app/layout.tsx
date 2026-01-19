import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import ScrollToTop from './components/ScrollToTop'

const DMSans = DM_Sans({
  variable: '--font-DM-Sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Oraixen - Premium Technology Solutions',
  description: 'Oraixen delivers premium mobile app development, web development, corporate software platforms, and integrated AI solutions with exceptional attention to detail and reliability.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${DMSans.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}
