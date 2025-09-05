import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import './globals.css'
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
    default: 'Catch The Event - Premier Event Ticketing Platform | Hamilton, Toronto, Ontario',
    template: '%s | Catch The Event'
  },
  alternates: {
    canonical: 'https://catchtheevent.com',
    languages: {
      'en-CA': 'https://catchtheevent.com',
      'en': 'https://catchtheevent.com'
    }
  },
  description: 'Discover and book tickets for amazing events in Hamilton, Toronto, and across Ontario. From cultural festivals to live music, sports, and family events. Secure parking, food vouchers, and exclusive experiences.',
  authors: [{ name: 'Catch The Event', url: 'https://catchtheevent.com' }],
  keywords: [
    'event ticketing',
    'hamilton events',
    'toronto events',
    'ontario events',
    'cultural festival',
    'live music events',
    'sports events',
    'family events',
    'food festival',
    'parking reservation',
    'event tickets',
    'hamilton ontario',
    'canada events',
    'indian cultural festival',
    'garba event',
    'spice of india 2025',
    'bayfront park hamilton',
    'event management',
    'ticket booking',
    'online ticketing'
  ],
  creator: 'Catch The Event',
  publisher: 'Catch The Event',
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE || 'your-google-verification-code',
    yahoo: process.env.YAHOO_VERIFICATION_CODE || 'your-yahoo-verification-code',
    yandex: process.env.YANDEX_VERIFICATION_CODE || 'your-yandex-verification-code',
  },
  appleWebApp: {
    capable: true,
    title: 'Catch The Event',
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
    title: 'Catch The Event - Premier Event Ticketing Platform',
    description: 'Discover and book tickets for amazing events in Hamilton, Toronto, and across Ontario. From cultural festivals to live music, sports, and family events.',
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
    title: 'Catch The Event - Premier Event Ticketing Platform',
    description: 'Discover and book tickets for amazing events in Hamilton, Toronto, and across Ontario. From cultural festivals to live music, sports, and family events.',
    images: ['https://catchtheevent.com/images/logo-no-background.png'],
  },
  category: 'Event Ticketing',
  classification: 'Entertainment',
  other: {
    'og:type': 'website',
    'og:site_name': 'Catch The Event',
    'og:locale': 'en_CA',
    'og:country-name': 'Canada',
    'og:region': 'Ontario',
    'og:locality': 'Hamilton',
    'og:street-address': 'Bayfront Park',
    'og:postal-code': 'L8L 1C8',
    'og:latitude': '43.2557',
    'og:longitude': '-79.8711',
    'twitter:label1': 'Est. 2025',
    'twitter:data1': 'Event Ticketing Platform',
    'twitter:label2': 'Location',
    'twitter:data2': 'Hamilton, Ontario, Canada'
  }
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
        <WebVitals />
        <ServiceWorker />
        
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google.com" />
        <link rel="dns-prefetch" href="//www.bing.com" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/images/logo-no-background.png" as="image" />
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Performance and SEO */}
        <meta name="theme-color" content="#667eea" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Catch The Event" />
        
        {/* Additional SEO */}
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Hamilton, Ontario, Canada" />
        <meta name="geo.position" content="43.2557;-79.8711" />
        <meta name="ICBM" content="43.2557, -79.8711" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="English" />
        <meta name="coverage" content="Worldwide" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        
        {/* Social Media Verification */}
        <meta name="facebook-domain-verification" content="your-facebook-verification-code" />
        <meta name="pinterest-site-verification" content="your-pinterest-verification-code" />
        <meta name="instagram:site" content="catch_the_event" />
        <meta name="linkedin:company" content="catch-the-event" />
        
        {/* Business Information */}
        <meta name="business:contact_data:street_address" content="Bayfront Park" />
        <meta name="business:contact_data:locality" content="Hamilton" />
        <meta name="business:contact_data:administrative_area" content="Ontario" />
        <meta name="business:contact_data:postal_code" content="L8L 1C8" />
        <meta name="business:contact_data:country_name" content="Canada" />
        <meta name="business:contact_data:phone_number" content="+1-905-XXX-XXXX" />
        <meta name="business:contact_data:email" content="info@catchtheevent.com" />
        <meta name="business:contact_data:website" content="https://catchtheevent.com" />
        
        {/* Domain and Brand Visibility */}
        <meta name="application-name" content="Catch The Event" />
        <meta name="apple-mobile-web-app-title" content="Catch The Event" />
        <meta name="msapplication-TileTitle" content="Catch The Event" />
        <meta name="msapplication-TileColor" content="#667eea" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Brand Keywords for Search */}
        <meta name="keywords" content="Catch The Event, catchtheevent, catchtheevent.com, www.catchtheevent.com, event platform, event management software, online ticketing platform, event registration software, event hosting platform, event solutions Canada, ticketing solutions Canada, event organizer platform, Eventbrite alternative Canada, Ticketmaster competitor Canada, event platform Toronto, ticketing software Toronto, event management Ontario, online event registration Toronto, event organizer tools Toronto, local event ticketing Toronto, event solutions Ontario, event management companies Toronto, event planners near me Toronto, event planning services Toronto, low fee event ticketing platform Canada, event management software for small businesses Toronto, virtual event platform with attendee engagement features, sustainable event planning tools Ontario, AI powered event registration Canada, event platform with pre-event payouts Canada, event platform for professional services Toronto, ticketing platform with secure payment processing Canada, how to choose event management software for festivals, corporate event platform Toronto, music festival ticketing Ontario, community event registration Toronto, conference management software Canada, horror convention ticketing Ontario, quilter's conference registration Canada, how to reduce event ticketing fees Canada, easy event registration for small businesses, event platform with real-time analytics, secure online payment processing for events Canada, event ticketing, hamilton events, toronto events, ontario events, cultural festival, live music events, sports events, family events, food festival, parking reservation, event tickets, hamilton ontario, canada events, indian cultural festival, garba event, spice of india 2025, bayfront park hamilton, event management, ticket booking, online ticketing" />
        
        {/* Brand Identity */}
        <meta name="brand" content="Catch The Event" />
        <meta name="company" content="Catch The Event" />
        <meta name="organization" content="Catch The Event" />
        <meta name="product" content="Event Ticketing Platform" />
        <meta name="service" content="Event Management and Ticketing" />
        
        {/* Domain Variations */}
        <link rel="alternate" href="https://www.catchtheevent.com" hrefLang="en-CA" />
        <link rel="alternate" href="https://catchtheevent.com" hrefLang="en-CA" />
        <link rel="alternate" href="https://catchtheevent.com" hrefLang="x-default" />
        
        {/* Search Engine Directives */}
        <meta name="google" content="notranslate" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="slurp" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="duckduckbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* French Language Support & Keywords */}
        <meta name="language" content="en-CA, fr-CA" />
        <meta name="lang" content="en-CA, fr-CA" />
        <link rel="alternate" hrefLang="en-CA" href="https://catchtheevent.com" />
        <link rel="alternate" hrefLang="fr-CA" href="https://catchtheevent.com/fr" />
        <link rel="alternate" hrefLang="x-default" href="https://catchtheevent.com" />
        
        {/* French Keywords for SEO */}
        <meta name="keywords" lang="fr-CA" content="plateforme événementielle, logiciel de gestion d'événements, plateforme de billetterie en ligne, logiciel d'inscription aux événements, plateforme d'hébergement d'événements, solutions événementielles Canada, solutions de billetterie Canada, plateforme pour organisateur d'événements, alternative Eventbrite Canada, concurrent Ticketmaster Canada, plateforme événementielle Toronto, logiciel de billetterie Toronto, gestion d'événements Ontario, inscription en ligne événements Toronto, outils organisateur d'événements Toronto, billetterie événements locaux Toronto, solutions événementielles Ontario, entreprises de gestion d'événements Toronto, planificateurs d'événements près de moi Toronto, services de planification d'événements Toronto, plateforme de billetterie événements à faible coût Canada, logiciel de gestion d'événements pour petites entreprises Toronto, plateforme événementielle virtuelle avec fonctionnalités d'engagement des participants, outils de planification d'événements durables Ontario, inscription événements alimentée par l'IA Canada, plateforme événementielle avec paiements anticipés Canada, plateforme événementielle pour services professionnels Toronto, plateforme de billetterie avec traitement sécurisé des paiements Canada, comment choisir un logiciel de gestion d'événements pour festivals, plateforme événements corporatifs Toronto, billetterie festival de musique Ontario, inscription événements communautaires Toronto, logiciel de gestion de conférences Canada, billetterie convention horreur Ontario, inscription conférence courtepointe Canada, comment réduire les frais de billetterie événements Canada, inscription événements facile pour petites entreprises, plateforme événementielle avec analyses en temps réel, traitement sécurisé des paiements en ligne pour événements Canada" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
          {children}
        </div>
      </body>
    </html>
  )
} 