export default function StructuredData() {
  return (
    <>
      {/* Event Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "Spice of India 2025 - Cultural & Food Festival",
            "alternateName": "Spice of India 2025",
            "description": "Free cultural and food festival featuring live music, dance performances, DJs, food vendors, and an open-air Garba event. Experience the vibrant flavors and culture of India with all-day entertainment, shopping opportunities, and delicious food from selected vendors.",
            "startDate": "2025-09-13T09:00:00-04:00",
            "endDate": "2025-09-14T23:00:00-04:00",
            "location": {
              "@type": "Place",
              "name": "Bayfront Park",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Hamilton",
                "addressRegion": "ON",
                "addressCountry": "CA"
              },
              "url": "https://www.hamilton.ca/parks-recreation/parks-trails/parks/bayfront-park"
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
              "price": "0",
              "priceCurrency": "CAD",
              "availability": "https://schema.org/InStock",
              "validFrom": "2024-01-01T00:00:00-04:00",
              "url": "https://catchtheevent.com",
              "description": "Free entry to Spice of India 2025 cultural festival"
            },
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "category": "Cultural Festival",
            "image": [
              "https://catchtheevent.com/images/logo-no-background.png"
            ],
            "url": "https://catchtheevent.com",
            "keywords": [
              "spice of india 2025",
              "hamilton cultural festival",
              "free indian festival",
              "bayfront park hamilton",
              "open air garba",
              "indian food festival",
              "cultural celebration hamilton"
            ],
            "audience": {
              "@type": "Audience",
              "audienceType": "All ages welcome"
            },
            "inLanguage": "en",
            "isAccessibleForFree": true,
            "maximumAttendeeCapacity": 5000,
            "typicalAgeRange": "All ages"
          })
        }}
      />

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Catch The Event",
            "url": "https://catchtheevent.com",
            "logo": "https://catchtheevent.com/images/logo-no-background.png",
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

      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Catch The Event",
            "description": "Premier event organizer for cultural celebrations and festivals. Specializing in Indian cultural events, food festivals, and community celebrations.",
            "url": "https://catchtheevent.com",
            "telephone": "+1-XXX-XXX-XXXX",
            "email": "info@catchtheevent.com",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "CA"
            },
            "openingHours": "Mo-Su 09:00-18:00",
            "priceRange": "$",
            "currenciesAccepted": "CAD",
            "paymentAccepted": "Cash, Credit Card, Online Payment",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Event Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Parking Reservation",
                    "description": "Parking spot reservation for Spice of India 2025 with $5 food voucher included"
                  },
                  "price": "13.90",
                  "priceCurrency": "CAD"
                }
              ]
            }
          })
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://catchtheevent.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Events",
                "item": "https://catchtheevent.com/events"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Spice of India 2025",
                "item": "https://catchtheevent.com"
              }
            ]
          })
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is Spice of India 2025?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Spice of India 2025 is a free, open-air cultural and food festival featuring live music, dance performances, DJs, food vendors, and an open-air Garba event at Bayfront Park, Hamilton on September 13-14, 2025."
                }
              },
              {
                "@type": "Question",
                "name": "Is Spice of India 2025 free to attend?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Spice of India 2025 is completely free to attend. No tickets are required for entry to the festival."
                }
              },
              {
                "@type": "Question",
                "name": "Where is Spice of India 2025 taking place?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Spice of India 2025 is taking place at Bayfront Park, Hamilton, Ontario, Canada."
                }
              },
              {
                "@type": "Question",
                "name": "How can I reserve a parking spot?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can reserve a parking spot through our website for $13.90 total (includes $10 parking, $1.10 convenience fee, $1.50 processing fee, and 13% tax). Each reservation includes a $5 food voucher."
                }
              },
              {
                "@type": "Question",
                "name": "What's included with the parking reservation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Each parking reservation includes a parking spot for both event days and a $5 food voucher that can be redeemed with selected food vendors at the venue."
                }
              }
            ]
          })
        }}
      />
    </>
  )
} 