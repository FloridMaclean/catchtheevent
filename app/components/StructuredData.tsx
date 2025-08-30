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
              "rangtaali garba hamilton",
              "aishwarya majmudar hamilton",
              "garba event hamilton",
              "navratri celebration hamilton",
              "hamilton event tickets",
              "gage park hamilton events",
              "indian cultural event hamilton",
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
              "ontario cultural festival",
              "live garba performance hamilton",
              "hamilton cultural events",
              "indian dance hamilton",
              "garba music hamilton",
              "navratri celebration canada",
              "hamilton ontario events",
              "cultural festival hamilton",
              "indian community events hamilton",
              "garba performance hamilton",
              "aishwarya majmudar live hamilton"
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

      {/* Organization Schema */}
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

      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Catch The Event",
            "description": "Premier event organizer for cultural celebrations in Hamilton, Ontario. Specializing in Indian cultural events, Garba performances, and community celebrations.",
            "url": "https://rangtaali.catchtheevent.com",
            "telephone": "+1-905-XXX-XXXX",
            "email": "info@catchtheevent.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Hamilton",
              "addressRegion": "ON",
              "addressCountry": "CA"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 43.2439,
              "longitude": -79.8897
            },
            "openingHours": "Mo-Su 09:00-18:00",
            "priceRange": "$",
            "currenciesAccepted": "CAD",
            "paymentAccepted": "Cash, Credit Card, Online Payment",
            "areaServed": {
              "@type": "City",
              "name": "Hamilton"
            },
            "serviceArea": {
              "@type": "City",
              "name": "Hamilton"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Event Tickets",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Rangtaali Garba Pass",
                    "description": "Exclusive $20 Garba Pass for Rangtaali Hamilton 2025"
                  },
                  "price": "20.00",
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
                "item": "https://rangtaali.catchtheevent.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Events",
                "item": "https://rangtaali.catchtheevent.com/events"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Rangtaali Hamilton 2025",
                "item": "https://rangtaali.catchtheevent.com/rangtaali-hamilton-2025"
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
                "name": "What is Rangtaali Hamilton 2025?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Rangtaali Hamilton 2025 is a live Garba event featuring Aishwarya Majmudar, one of the most loved voices in the Garba world. It's a Navratri celebration taking place at Gage Park, Hamilton, ON on August 31st, 2025."
                }
              },
              {
                "@type": "Question",
                "name": "How much are tickets for Rangtaali Hamilton 2025?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Tickets for Rangtaali Hamilton 2025 are $20 for the exclusive Garba Pass, which is 43% cheaper than competitor prices."
                }
              },
              {
                "@type": "Question",
                "name": "Where is Rangtaali Hamilton 2025 taking place?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Rangtaali Hamilton 2025 is taking place at Gage Park, located at 1000 Main St E, Hamilton, ON L8M 1N2, Canada."
                }
              },
              {
                "@type": "Question",
                "name": "Who is performing at Rangtaali Hamilton 2025?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Aishwarya Majmudar, one of the most loved voices in the Garba world, will be performing live at Rangtaali Hamilton 2025."
                }
              },
              {
                "@type": "Question",
                "name": "When is Rangtaali Hamilton 2025?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Rangtaali Hamilton 2025 is taking place on Sunday, August 31st, 2025, starting at 6:30 PM at Gage Park, Hamilton."
                }
              }
            ]
          })
        }}
      />
    </>
  )
} 