import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import StructuredData from './components/StructuredData'
import WebVitals from './components/WebVitals'
import ServiceWorker from './components/ServiceWorker'
import SEOHead from './components/SEOHead'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rangtaali Hamilton 2025 - By Aishwarya Majmudar | Live Garba Event | Catch The Event',
  description: 'Experience an Unforgettable Night of Garba in Hamilton! Purchase tickets for Rangtaali Hamilton 2025 featuring Aishwarya Majmudar. Live Navratri celebration at Gage Park, Hamilton, ON. Book your tickets now!',
  keywords: [
    'rangtaali hamilton 2025',
    'aishwarya majmudar',
    'garba event hamilton',
    'navratri celebration canada',
    'live garba performance',
    'hamilton event tickets',
    'gage park hamilton',
    'indian cultural event',
    'garba dance hamilton',
    'rangtaali tickets',
    'aishwarya majmudar concert',
    'navratri hamilton 2025',
    'indian music event',
    'cultural celebration hamilton',
    'garba night hamilton'
  ],
  authors: [{ name: 'Catch The Event' }],
  creator: 'Catch The Event',
  publisher: 'Catch The Event',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://rangtaali.catchtheevent.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Rangtaali Hamilton 2025 - By Aishwarya Majmudar',
    description: 'Experience an Unforgettable Night of Garba in Hamilton! Live Navratri celebration featuring Aishwarya Majmudar.',
    url: 'https://rangtaali.catchtheevent.com',
    siteName: 'Catch The Event',
    images: [
      {
        url: '/images/Rangtaali_bg.png',
        width: 1200,
        height: 630,
        alt: 'Rangtaali Hamilton 2025 - Live Garba Event',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rangtaali Hamilton 2025 - By Aishwarya Majmudar',
    description: 'Experience an Unforgettable Night of Garba in Hamilton! Live Navratri celebration.',
    images: ['/images/Rangtaali_bg.png'],
    creator: '@catchtheevent',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Rangtaali Hamilton 2025',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#ec4899',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
        <SEOHead />
      </head>
      <body className={inter.className}>
        <WebVitals />
        <ServiceWorker />
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
          {children}
        </div>
      </body>
    </html>
  )
} 