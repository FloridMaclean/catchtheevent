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
  title: {
    default: 'Rangtaali Hamilton 2025 - By Aishwarya Majmudar | $20 Garba Pass | Catch The Event',
    template: '%s | Rangtaali Hamilton 2025 | Catch The Event'
  },
  description: 'Experience an Unforgettable Night of Garba in Hamilton! Purchase exclusive $20 Rangtaali Garba Pass for Rangtaali Hamilton 2025 featuring Aishwarya Majmudar. Live Navratri celebration at Gage Park, Hamilton, ON. Book your tickets now!',
  authors: [{ name: 'Catch The Event', url: 'https://catchtheevent.com' }],
  keywords: [
    'rangtaali hamilton 2025',
    'rangtaali garba hamilton',
    'aishwarya majmudar hamilton',
    'garba event hamilton',
    'navratri celebration hamilton',
    'hamilton event tickets',
    'gage park hamilton events',
    'indian cultural event hamilton',
    'garba dance hamilton',
    'rangtaali tickets',
    'aishwarya majmudar concert',
    'navratri hamilton 2025',
    'indian music event',
    'cultural celebration hamilton',
    'garba night hamilton',
    'exclusive garba pass',
    '$20 tickets hamilton',
    'hamilton navratri 2025',
    'canada garba event',
    'ontario cultural festival',
    'live garba performance hamilton',
    'hamilton cultural events',
    'indian dance hamilton',
    'garba music hamilton',
    'navratri celebration canada',
    'hamilton ontario events',
    'cultural festival hamilton',
    'indian community events hamilton',
    'garba performance hamilton',
    'aishwarya majmudar live hamilton'
  ],
  creator: 'Catch The Event',
  publisher: 'Catch The Event',
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
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://rangtaali.catchtheevent.com',
    siteName: 'Catch The Event',
    title: 'Rangtaali Hamilton 2025 - By Aishwarya Majmudar | $20 Garba Pass',
    description: 'Experience an Unforgettable Night of Garba in Hamilton! Live Navratri celebration featuring Aishwarya Majmudar. Exclusive $20 Garba Pass available now!',
    images: [
      {
        url: 'https://rangtaali.catchtheevent.com/images/Rangtaali_bg.png',
        width: 1200,
        height: 630,
        alt: 'Rangtaali Hamilton 2025 - Live Garba Event with Aishwarya Majmudar',
      },
      {
        url: 'https://rangtaali.catchtheevent.com/images/logo-no-background.png',
        width: 512,
        height: 512,
        alt: 'Catch The Event Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@catch_the_event',
    creator: '@catch_the_event',
    title: 'Rangtaali Hamilton 2025 - By Aishwarya Majmudar | $20 Garba Pass | Catch The Event',
    description: 'Experience an Unforgettable Night of Garba in Hamilton! Purchase tickets for Rangtaali Hamilton 2025 featuring Aishwarya Majmudar. Live Navratri celebration at Gage Park, Hamilton, ON. Book your tickets now!',
    images: ['https://rangtaali.catchtheevent.com/images/Rangtaali_bg.png'],
  },
  alternates: {
    canonical: 'https://rangtaali.catchtheevent.com',
  },
  category: 'Event',
  classification: 'Cultural Event',
  other: {
    'geo.region': 'CA-ON',
    'geo.placename': 'Hamilton',
    'geo.position': '43.2439;-79.8897',
    'ICBM': '43.2439, -79.8897',
    'event:start_date': '2025-08-31T18:30:00-04:00',
    'event:end_date': '2025-08-31T23:00:00-04:00',
    'event:location': 'Gage Park, Hamilton, ON',
    'event:performer': 'Aishwarya Majmudar',
    'event:price': '20.00',
    'event:currency': 'CAD',
    'og:price:amount': '20.00',
    'og:price:currency': 'CAD',
    'og:type': 'event',
    'og:site_name': 'Catch The Event',
    'og:locale': 'en_CA',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  userScalable: false,
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
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/images/Rangtaali_bg.png" as="image" />
        <link rel="preload" href="/images/logo-no-background.png" as="image" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
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