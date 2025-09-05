import React from 'react'

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Catch The Event",
    "alternateName": ["CTE", "catchtheevent", "catchtheevent.com", "www.catchtheevent.com", "Eventbrite Alternative Canada", "Ticketmaster Competitor Canada"],
    "url": "https://catchtheevent.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://catchtheevent.com/images/logo-no-background.png",
      "width": 512,
      "height": 512
    },
    "description": "Premier event platform and event management software for Hamilton, Toronto, and across Ontario. Leading Eventbrite alternative and Ticketmaster competitor in Canada with low fee event ticketing platform, secure payment processing, and comprehensive event solutions.",
    "foundingDate": "2025",
    "brand": "Catch The Event",
    "slogan": "Premier Event Platform & Event Management Software",
    "knowsAbout": [
      "Event Management Software", 
      "Online Ticketing Platform", 
      "Event Registration Software", 
      "Event Hosting Platform", 
      "Event Solutions Canada", 
      "Ticketing Solutions Canada", 
      "Event Organizer Platform", 
      "Eventbrite Alternative", 
      "Ticketmaster Competitor", 
      "Low Fee Event Ticketing", 
      "Event Management Software for Small Businesses", 
      "Virtual Event Platform", 
      "AI Powered Event Registration", 
      "Secure Payment Processing", 
      "Real-time Analytics", 
      "Cultural Festivals", 
      "Live Music Events", 
      "Sports Events", 
      "Family Entertainment", 
      "Corporate Events", 
      "Conference Management", 
      "Community Events"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bayfront Park",
      "addressLocality": "Hamilton",
      "addressRegion": "Ontario",
      "postalCode": "L8L 1C8",
      "addressCountry": "CA"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-905-XXX-XXXX",
      "contactType": "customer service",
      "email": "info@catchtheevent.com",
      "availableLanguage": ["English", "French"]
    },
    "sameAs": [
      "https://www.instagram.com/catch_the_event/",
      "https://www.linkedin.com/company/catch-the-event/about/"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Event Platform Solutions",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Event Platform",
            "description": "Comprehensive event platform with online ticketing, registration, and management software"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Event Management Software",
            "description": "Professional event management software for small businesses and large organizations"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Low Fee Ticketing",
            "description": "Competitive low fee event ticketing platform as Eventbrite alternative in Canada"
          }
        }
      ]
    },
    "identifier": {
      "@type": "PropertyValue",
      "name": "Domain",
      "value": "catchtheevent.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Canada"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 43.2557,
        "longitude": -79.8711
      },
      "geoRadius": "500000"
    }
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Catch The Event",
    "image": "https://catchtheevent.com/images/logo-no-background.png",
    "description": "Premier event ticketing platform serving Hamilton, Toronto, and Ontario",
    "url": "https://catchtheevent.com",
    "telephone": "+1-905-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bayfront Park",
      "addressLocality": "Hamilton",
      "addressRegion": "Ontario",
      "postalCode": "L8L 1C8",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.2557,
      "longitude": -79.8711
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "Online Payment"],
    "currenciesAccepted": "CAD",
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 43.2557,
        "longitude": -79.8711
      },
      "geoRadius": "50000"
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Catch The Event",
    "url": "https://catchtheevent.com",
    "description": "Discover and book tickets for amazing events in Hamilton, Toronto, and across Ontario",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://catchtheevent.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Catch The Event"
    },
    "inLanguage": "en-CA",
    "isAccessibleForFree": true
  }

  const breadcrumbSchema = {
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
      }
    ]
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I book event tickets?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can book event tickets directly through our website. Simply select your event, choose your tickets, and complete the booking process online."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer parking reservations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer secure parking reservations for many events with convenient locations near the venue."
        }
      },
      {
        "@type": "Question",
        "name": "Are there food vouchers included?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, many of our events include food vouchers with parking reservations, providing a complete event experience."
        }
      }
    ]
  }

  const brandSchema = {
    "@context": "https://schema.org",
    "@type": "Brand",
    "name": "Catch The Event",
    "alternateName": ["CTE", "catchtheevent", "catchtheevent.com", "www.catchtheevent.com", "Eventbrite Alternative", "Ticketmaster Competitor"],
    "description": "Premier event platform and event management software serving Hamilton, Toronto, and Ontario. Leading Eventbrite alternative and Ticketmaster competitor in Canada with low fee event ticketing platform.",
    "url": "https://catchtheevent.com",
    "logo": "https://catchtheevent.com/images/logo-no-background.png",
    "slogan": "Premier Event Platform & Event Management Software",
    "brand": "Catch The Event",
    "category": "Event Platform",
    "industry": "Event Management Software",
    "foundingDate": "2025",
    "knowsAbout": [
      "Event Management Software", 
      "Online Ticketing Platform", 
      "Event Registration Software", 
      "Event Hosting Platform", 
      "Event Solutions Canada", 
      "Ticketing Solutions Canada", 
      "Event Organizer Platform", 
      "Eventbrite Alternative", 
      "Ticketmaster Competitor", 
      "Low Fee Event Ticketing", 
      "Event Management Software for Small Businesses", 
      "Virtual Event Platform", 
      "AI Powered Event Registration", 
      "Secure Payment Processing", 
      "Real-time Analytics"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Event Platform Solutions",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Event Platform",
            "description": "Comprehensive event platform with online ticketing, registration, and management software"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Event Management Software",
            "description": "Professional event management software for small businesses and large organizations"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Low Fee Ticketing",
            "description": "Competitive low fee event ticketing platform as Eventbrite alternative in Canada"
          }
        }
      ]
    }
  }

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "itemReviewed": {
      "@type": "Organization",
      "name": "Catch The Event"
    },
    "ratingValue": "4.9",
    "reviewCount": "150",
    "bestRating": "5",
    "worstRating": "1"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(brandSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewSchema)
        }}
      />
    </>
  )
} 