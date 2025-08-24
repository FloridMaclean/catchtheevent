export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Rangtaali Hamilton 2025",
    "description": "Experience an Unforgettable Night of Garba in Hamilton! Live Navratri celebration featuring Aishwarya Majmudar.",
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
      }
    },
    "performer": {
      "@type": "Person",
      "name": "Aishwarya Majmudar",
      "description": "One of the most loved voices in the Garba world"
    },
    "organizer": {
      "@type": "Organization",
      "name": "Panghat Entertainment Ltd.",
      "url": "https://catchtheevent.com"
    },
    "offers": {
      "@type": "Offer",
      "price": "34.99",
      "priceCurrency": "CAD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-01-01T00:00:00-04:00",
      "url": "https://rangtaali.catchtheevent.com"
    },
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "category": "Cultural Event",
    "image": "https://rangtaali.catchtheevent.com/images/Rangtaali_bg.png",
    "url": "https://rangtaali.catchtheevent.com"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
} 