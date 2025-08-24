export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          "name": "Rangtaali Hamilton 2025 - By Aishwarya Majmudar",
          "alternateName": "Rangtaali Garba Hamilton 2025",
          "description": "Experience an Unforgettable Night of Garba in Hamilton! Live Navratri celebration featuring Aishwarya Majmudar - one of the most loved voices in the Garba world. Exclusive $20 Garba Pass available now!",
          "startDate": "2025-08-31T18:30:00-04:00",
          "endDate": "2025-08-31T23:00:00-04:00",
          "location": {
            "@type": "Place",
            "name": "Gage Park",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "1000 Main St E",
              "addressLocality": "Hamilton",
              "addressRegion": "ON",
              "postalCode": "L8M 1N2",
              "addressCountry": "CA"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 43.2439,
              "longitude": -79.8897
            },
            "url": "https://www.hamilton.ca/parks-recreation/parks-trails/parks/gage-park"
          },
          "performer": {
            "@type": "Person",
            "name": "Aishwarya Majmudar",
            "description": "One of the most loved voices in the Garba world",
            "url": "https://www.instagram.com/aishwaryamajmudar/",
            "sameAs": [
              "https://www.instagram.com/aishwaryamajmudar/"
            ]
          },
          "organizer": {
            "@type": "Organization",
            "name": "Catch The Event",
            "url": "https://catchtheevent.com",
            "logo": "https://catchtheevent.com/images/logo-no-background.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "info@catchtheevent.com",
              "contactType": "customer service"
            }
          },
          "offers": {
            "@type": "Offer",
            "price": "20.00",
            "priceCurrency": "CAD",
            "availability": "https://schema.org/InStock",
            "validFrom": "2024-01-01T00:00:00-04:00",
            "url": "https://rangtaali.catchtheevent.com",
            "sameAs": [
              "https://www.instagram.com/catch_the_event/"
            ],
            "description": "Catch The Event Exclusive Rangtaali Garba Pass - $20.00"
          },
          "eventStatus": "https://schema.org/EventScheduled",
          "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
          "category": "Cultural Event",
          "subEvent": [],
          "superEvent": {
            "@type": "Event",
            "name": "Navratri 2025 Celebrations"
          },
          "image": [
            "https://rangtaali.catchtheevent.com/images/Rangtaali_bg.png",
            "https://rangtaali.catchtheevent.com/images/logo-no-background.png"
          ],
          "url": "https://rangtaali.catchtheevent.com",
          "sameAs": [
            "https://www.instagram.com/catch_the_event/"
          ],
          "keywords": [
            "rangtaali hamilton 2025",
            "aishwarya majmudar",
            "garba event hamilton",
            "navratri celebration canada",
            "live garba performance",
            "hamilton event tickets",
            "gage park hamilton",
            "indian cultural event",
            "garba dance hamilton",
            "rangtaali tickets",
            "aishwarya majmudar concert",
            "navratri hamilton 2025",
            "indian music event",
            "cultural celebration hamilton",
            "garba night hamilton",
            "exclusive garba pass",
            "$20 tickets hamilton",
            "hamilton navratri 2025",
            "canada garba event",
            "ontario cultural festival"
          ],
          "audience": {
            "@type": "Audience",
            "audienceType": "All ages welcome"
          },
          "inLanguage": "en",
          "isAccessibleForFree": false,
          "maximumAttendeeCapacity": 1000,
          "remainingAttendeeCapacity": 1000,
          "typicalAgeRange": "All ages",
          "doorTime": "18:00",
          "funder": {
            "@type": "Organization",
            "name": "Catch The Event"
          },
          "sponsor": {
            "@type": "Organization",
            "name": "Catch The Event"
          },
          "workFeatured": {
            "@type": "CreativeWork",
            "name": "Garba Performance by Aishwarya Majmudar"
          },
          "workPerformed": {
            "@type": "CreativeWork",
            "name": "Traditional Garba Music and Dance"
          }
        })
      }}
    />
  )
} 