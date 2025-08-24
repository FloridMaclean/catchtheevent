import React from 'react'

export default function SEOHead() {
  return (
    <>
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      
      {/* Critical Resources Preload */}
      <link rel="preload" href="/images/Rangtaali_bg.png" as="image" />
      <link rel="preload" href="/images/logo-no-background.png" as="image" />
      
      {/* PWA Manifest */}
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Basic Meta Tags */}
      <meta name="author" content="Catch The Event" />
      <meta name="copyright" content="Catch The Event" />
      <meta name="language" content="en" />
      
      {/* Geographic Meta Tags */}
      <meta name="geo.region" content="CA-ON" />
      <meta name="geo.placename" content="Hamilton" />
      <meta name="geo.position" content="43.2439;-79.8897" />
      <meta name="ICBM" content="43.2439, -79.8897" />
      
      {/* Event-Specific Meta Tags */}
      <meta name="event:start_date" content="2025-08-31T18:30:00-04:00" />
      <meta name="event:end_date" content="2025-08-31T23:00:00-04:00" />
      <meta name="event:location" content="Gage Park, Hamilton, ON" />
      <meta name="event:performer" content="Aishwarya Majmudar" />
      <meta name="event:price" content="20.00" />
      <meta name="event:currency" content="CAD" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:site_name" content="Catch The Event" />
      <meta property="og:locale" content="en_CA" />
      <meta property="og:type" content="event" />
      <meta property="og:price:amount" content="20.00" />
      <meta property="og:price:currency" content="CAD" />
      
      {/* Enhanced Open Graph */}
      <meta property="og:title" content="Rangtaali Hamilton 2025 - By Aishwarya Majmudar | Catch The Event" />
      <meta property="og:description" content="Experience an Unforgettable Night of Garba in Hamilton! Live Navratri celebration featuring Aishwarya Majmudar. Exclusive $20 Garba Pass available now!" />
      <meta property="og:url" content="https://rangtaali.catchtheevent.com" />
      <meta property="og:site_name" content="Catch The Event" />
      <meta property="og:locale" content="en_CA" />
      <meta property="og:image" content="https://rangtaali.catchtheevent.com/images/Rangtaali_bg.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Rangtaali Hamilton 2025 - Live Garba Event with Aishwarya Majmudar" />
      <meta property="og:type" content="website" />
      
      {/* Enhanced Meta Tags for SEO */}
      <meta name="description" content="Experience an Unforgettable Night of Garba in Hamilton! Purchase exclusive $20 Rangtaali Garba Pass for Rangtaali Hamilton 2025 featuring Aishwarya Majmudar. Live Navratri celebration at Gage Park, Hamilton, ON. Book your tickets now!" />
      <meta name="author" content="Catch The Event" />
      <meta name="keywords" content="rangtaali hamilton 2025,aishwarya majmudar,garba event hamilton,navratri celebration canada,live garba performance,hamilton event tickets,gage park hamilton,indian cultural event,garba dance hamilton,rangtaali tickets,aishwarya majmudar concert,navratri hamilton 2025,indian music event,cultural celebration hamilton,garba night hamilton,exclusive garba pass,$20 tickets hamilton,hamilton navratri 2025,canada garba event,ontario cultural festival" />
      <meta name="creator" content="Catch The Event" />
      <meta name="publisher" content="Catch The Event" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://rangtaali.catchtheevent.com" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="format-detection" content="telephone=no, address=no, email=no" />
      <meta name="google-site-verification" content="your-google-verification-code" />
      <meta name="y_key" content="your-yahoo-verification-code" />
      <meta name="yandex-verification" content="your-yandex-verification-code" />
      
      {/* Local Business Schema */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Catch The Event",
            "url": "https://rangtaali.catchtheevent.com",
            "logo": "https://rangtaali.catchtheevent.com/images/logo-no-background.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "info@catchtheevent.com",
              "contactType": "customer service"
            },
            "sameAs": [
              "https://www.instagram.com/catch_the_event/"
            ]
          })
        }}
      />
    </>
  )
} 