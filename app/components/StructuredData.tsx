export default function StructuredData() {
  return (
    <>
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
            "description": "Premier event organizer for amazing events and celebrations. Specializing in event management, ticket sales, and community celebrations.",
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
              "name": "Event Tickets",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Event Tickets",
                    "description": "Tickets for upcoming events"
                  }
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
                "name": "New Event",
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
                "name": "What events do you organize?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We organize various types of events including cultural celebrations, music performances, community gatherings, and special events. Stay tuned for our upcoming event announcements!"
                }
              },
              {
                "@type": "Question",
                "name": "How can I book tickets for events?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ticket booking information will be available when events are announced. You can check our website for updates or contact us directly for more information."
                }
              },
              {
                "@type": "Question",
                "name": "Where do your events take place?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Event venues and locations vary depending on the type of event. Specific venue information will be provided when events are announced."
                }
              },
              {
                "@type": "Question",
                "name": "How can I stay updated about new events?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can subscribe to our newsletter, follow us on social media, or check our website regularly for updates about new events and ticket availability."
                }
              },
              {
                "@type": "Question",
                "name": "Do you offer refunds for event tickets?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Refund policies vary by event and will be clearly communicated when tickets become available. Please check the specific event details for refund information."
                }
              }
            ]
          })
        }}
      />
    </>
  )
} 