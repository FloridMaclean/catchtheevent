export default function SEOHead() {
  return (
    <>
      {/* Preconnect to external domains for faster loading */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch for performance */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      
      {/* Preload critical resources */}
      <link rel="preload" href="/images/Rangtaali_bg.png" as="image" />
      <link rel="preload" href="/images/logo-no-background.png" as="image" />
      
      {/* Manifest for PWA */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Apple Touch Icons */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="author" content="Catch The Event" />
      <meta name="copyright" content="Catch The Event" />
      <meta name="language" content="en" />
      <meta name="geo.region" content="CA-ON" />
      <meta name="geo.placename" content="Hamilton" />
      <meta name="geo.position" content="43.2439;-79.8897" />
      <meta name="ICBM" content="43.2439, -79.8897" />
      
      {/* Event-specific meta tags */}
      <meta name="event:start_date" content="2025-08-31T18:30:00-04:00" />
      <meta name="event:end_date" content="2025-08-31T23:00:00-04:00" />
      <meta name="event:location" content="Gage Park, Hamilton, ON" />
      <meta name="event:performer" content="Aishwarya Majmudar" />
      
      {/* Social Media Meta Tags */}
      <meta property="og:site_name" content="Catch The Event" />
      <meta property="og:locale" content="en_CA" />
      <meta property="og:type" content="event" />
      <meta property="og:price:amount" content="34.99" />
      <meta property="og:price:currency" content="CAD" />
      
      {/* Twitter Additional Tags */}
      <meta name="twitter:site" content="@catchtheevent" />
      <meta name="twitter:creator" content="@catchtheevent" />
      
      {/* Additional Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
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
            "https://facebook.com/catchtheevent",
            "https://twitter.com/catchtheevent",
            "https://instagram.com/catchtheevent"
          ]
        })
      }} />
    </>
  )
} 