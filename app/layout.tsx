import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import './globals.css'
import SEOHead from './components/SEOHead'
import StructuredData from './components/StructuredData'
import WebVitals from './components/WebVitals'
import ServiceWorker from './components/ServiceWorker'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  metadataBase: new URL('https://rangtaali.catchtheevent.com'),
  title: 'Rangtaali Hamilton 2025 - By Aishwarya Majmudar | Live Garba Event | Catch The Event',
  description: 'Experience an Unforgettable Night of Garba in Hamilton! Purchase tickets for Rangtaali Hamilton 2025 featuring Aishwarya Majmudar. Live Navratri celebration at Gage Park, Hamilton, ON. Book your tickets now!',
  authors: [{ name: 'Catch The Event' }],
  keywords: ['rangtaali hamilton 2025', 'aishwarya majmudar', 'garba event hamilton', 'navratri celebration canada', 'live garba performance', 'hamilton event tickets', 'gage park hamilton', 'indian cultural event', 'garba dance hamilton', 'rangtaali tickets', 'aishwarya majmudar concert', 'navratri hamilton 2025', 'indian music event', 'cultural celebration hamilton', 'garba night hamilton'],
  creator: 'Catch The Event',
  publisher: 'Catch The Event',
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
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  verification: {
    google: 'your-google-verification-code',
    yahoo: 'your-yahoo-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  appleWebApp: {
    capable: true,
    title: 'Rangtaali Hamilton 2025',
    statusBarStyle: 'default',
  },
  openGraph: {
    title: 'Rangtaali Hamilton 2025 - By Aishwarya Majmudar',
    description: 'Experience an Unforgettable Night of Garba in Hamilton! Live Navratri celebration featuring Aishwarya Majmudar.',
    url: 'https://rangtaali.catchtheevent.com',
    siteName: 'Catch The Event',
    locale: 'en_CA',
    type: 'website',
    images: ['/images/Rangtaali_bg.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rangtaali Hamilton 2025 - By Aishwarya Majmudar | Live Garba Event | Catch The Event',
    description: 'Experience an Unforgettable Night of Garba in Hamilton! Purchase tickets for Rangtaali Hamilton 2025 featuring Aishwarya Majmudar. Live Navratri celebration at Gage Park, Hamilton, ON. Book your tickets now!',
    images: ['/images/Rangtaali_bg.png'],
    creator: '@catch_the_event',
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