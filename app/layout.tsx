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
  metadataBase: new URL('https://catchtheevent.com'),
  title: {
    default: 'Spice of India 2025 - Free Cultural & Food Festival | Hamilton | Catch The Event',
    template: '%s | Spice of India 2025 | Catch The Event'
  },
  description: 'Experience Spice of India 2025 - Free cultural and food festival in Hamilton! Live music, dance, DJs, open-air Garba, and food vendors at Bayfront Park on September 13-14, 2025.',
  authors: [{ name: 'Catch The Event', url: 'https://catchtheevent.com' }],
  keywords: [
    'spice of india 2025',
    'hamilton cultural festival',
    'free indian festival',
    'bayfront park hamilton',
    'open air garba',
    'indian food festival',
    'cultural celebration hamilton',
    'live music hamilton',
    'dance performance hamilton',
    'food vendors hamilton',
    'parking reservation hamilton',
    'food voucher hamilton',
    'september 13-14 2025',
    'hamilton ontario events'
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
    yandex: 'your-yahoo-verification-code',
  },
  appleWebApp: {
    capable: true,
    title: 'Spice of India 2025',
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
    url: 'https://catchtheevent.com',
    siteName: 'Catch The Event',
    title: 'Spice of India 2025 - Free Cultural & Food Festival',
    description: 'Experience Spice of India 2025 - Free cultural and food festival in Hamilton! Live music, dance, DJs, open-air Garba, and food vendors at Bayfront Park on September 13-14, 2025.',
    images: [
      {
        url: 'https://catchtheevent.com/images/logo-no-background.png',
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
    title: 'Spice of India 2025 - Free Cultural & Food Festival | Hamilton | Catch The Event',
    description: 'Experience Spice of India 2025 - Free cultural and food festival in Hamilton! Live music, dance, DJs, open-air Garba, and food vendors at Bayfront Park on September 13-14, 2025.',
    images: ['https://catchtheevent.com/images/logo-no-background.png'],
  },
  alternates: {
    canonical: 'https://catchtheevent.com',
  },
  category: 'Event',
  classification: 'Cultural Festival',
  other: {
    'og:type': 'website',
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