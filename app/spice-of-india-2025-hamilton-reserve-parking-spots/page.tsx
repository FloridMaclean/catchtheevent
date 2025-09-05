'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin, Sparkles, ArrowRight, Star, Users, Car, Utensils } from 'lucide-react'
import Head from 'next/head'

import TicketSelector from '../../components/TicketSelector'
import Newsletter from '../../components/Newsletter'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Home() {
  const [showTicketSelector, setShowTicketSelector] = useState(false)

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (showTicketSelector) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showTicketSelector])

  const eventDetails = {
    title: "SPICE OF INDIA 2025",
    subtitle: "Food Festival | Open-Air Garba",
    date: "September 13-14, 2025",
    time: "All Day (Garba after 6:00 PM)",
    venue: "Bayfront Park",
    address: "Bayfront Park, Hamilton, ON, Canada",
    description: "Spice of India 2025 is a free, open-air cultural and food festival featuring live music, dance performances, DJs, food vendors, and an open-air Garba event. Experience the vibrant flavors and culture of India with all-day entertainment, shopping opportunities, and delicious food from selected vendors.",
    seoDescription: "Experience Spice of India 2025 - Free cultural and food festival in Hamilton! Live music, dance, DJs, open-air Garba, and food vendors at Bayfront Park on September 13-14, 2025.",
    features: [
      "Free entry for the public",
      "All-day live music, DJs, and dance performances",
      "Open-air Garba event after 6:00 PM",
      "Array of food and non-food vendors",
      "Shopping opportunities",
      "Cultural celebration and community gathering"
    ],
    seoKeywords: [
      "spice of india 2025",
      "hamilton cultural festival",
      "free indian festival",
      "bayfront park hamilton",
      "open air garba",
      "indian food festival",
      "cultural celebration hamilton",
      "live music hamilton",
      "dance performance hamilton",
      "food vendors hamilton"
    ],
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Spice of India 2025 - Free Cultural & Food Festival | Hamilton | Catch The Event</title>
        <meta name="title" content="Spice of India 2025 - Free Cultural & Food Festival | Hamilton | Catch The Event" />
        <meta name="description" content="Experience Spice of India 2025 - Free cultural and food festival in Hamilton! Live music, dance, DJs, open-air Garba, and food vendors at Bayfront Park on September 13-14, 2025." />
        <meta name="keywords" content="spice of india 2025, hamilton cultural festival, free indian festival, bayfront park hamilton, open air garba, indian food festival, cultural celebration hamilton, live music hamilton, dance performance hamilton, food vendors hamilton, september 13-14 2025, hamilton ontario events" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="event" />
        <meta property="og:url" content="https://catchtheevent.com/spice-of-india-2025-hamilton-reserve-parking-spots" />
        <meta property="og:title" content="Spice of India 2025 - Free Cultural & Food Festival | Hamilton | Catch The Event" />
        <meta property="og:description" content="Experience Spice of India 2025 - Free cultural and food festival in Hamilton! Live music, dance, DJs, open-air Garba, and food vendors at Bayfront Park on September 13-14, 2025." />
        <meta property="og:image" content="https://catchtheevent.com/images/logo-no-background.png" />
        <meta property="og:site_name" content="Catch The Event" />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:country-name" content="Canada" />
        <meta property="og:region" content="Ontario" />
        <meta property="og:locality" content="Hamilton" />
        <meta property="og:street-address" content="Bayfront Park" />
        <meta property="og:postal-code" content="L8L 1C8" />
        <meta property="og:latitude" content="43.2557" />
        <meta property="og:longitude" content="-79.8711" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://catchtheevent.com/spice-of-india-2025-hamilton-reserve-parking-spots" />
        <meta property="twitter:title" content="Spice of India 2025 - Free Cultural & Food Festival | Hamilton | Catch The Event" />
        <meta property="twitter:description" content="Experience Spice of India 2025 - Free cultural and food festival in Hamilton! Live music, dance, DJs, open-air Garba, and food vendors at Bayfront Park on September 13-14, 2025." />
        <meta property="twitter:image" content="https://catchtheevent.com/images/logo-no-background.png" />
        <meta property="twitter:site" content="@catch_the_event" />
        <meta property="twitter:creator" content="@catch_the_event" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Catch The Event" />
        <meta name="creator" content="Catch The Event" />
        <meta name="publisher" content="Catch The Event" />
        <meta name="language" content="English" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Event Specific Meta Tags */}
        <meta name="event:start_time" content="2025-09-13T09:00:00-04:00" />
        <meta name="event:end_time" content="2025-09-14T23:00:00-04:00" />
        <meta name="event:location" content="Bayfront Park, Hamilton, ON, Canada" />
        <meta name="event:organizer" content="Catch The Event" />
        <meta name="event:category" content="Cultural Festival" />
        <meta name="event:price" content="Free" />
        <meta name="event:currency" content="CAD" />
        
        {/* Local Business Meta Tags */}
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Hamilton, Ontario, Canada" />
        <meta name="geo.position" content="43.2557;-79.8711" />
        <meta name="ICBM" content="43.2557, -79.8711" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://catchtheevent.com/spice-of-india-2025-hamilton-reserve-parking-spots" />
        
        {/* Structured Data for Event */}
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
                  "streetAddress": "Bayfront Park",
                  "addressLocality": "Hamilton",
                  "addressRegion": "ON",
                  "addressCountry": "CA",
                  "postalCode": "L8L 1C8"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 43.2557,
                  "longitude": -79.8711
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
                "url": "https://catchtheevent.com/spice-of-india-2025-hamilton-reserve-parking-spots",
                "description": "Free entry to Spice of India 2025 cultural festival"
              },
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
              "category": "Cultural Festival",
              "image": [
                "https://catchtheevent.com/images/logo-no-background.png"
              ],
              "url": "https://catchtheevent.com/spice-of-india-2025-hamilton-reserve-parking-spots",
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
              "typicalAgeRange": "All ages",
              "performer": [
                {
                  "@type": "Organization",
                  "name": "Live Music Performers"
                },
                {
                  "@type": "Organization",
                  "name": "Dance Groups"
                },
                {
                  "@type": "Organization",
                  "name": "DJs"
                }
              ]
            })
          }}
        />
      </Head>

      <div className="min-h-screen">
        {/* Skip Links for Accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-lg z-50">
          Skip to main content
        </a>
        <a href="#ticket-section" className="sr-only focus:not-sr-only focus:absolute focus:top-16 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-lg z-50">
          Skip to parking reservation section
        </a>
        
        <Header />
        
        {/* Live Region for Screen Readers */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          <div id="page-status">Spice of India 2025 event page loaded successfully</div>
        </div>
        
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 lg:pt-24 safe-area-top">
          {/* Device-specific safe areas */}
          <div className="absolute top-0 left-0 right-0 h-safe-area-inset-top bg-black/20"></div>
          <div className="absolute bottom-0 left-0 right-0 h-safe-area-inset-bottom bg-black/20"></div>
          
          {/* Mobile-specific background overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30 md:bg-black/20 z-5"></div>
        {/* Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-transparent to-red-900/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          
          {/* Enhanced Background Patterns */}
          <div className="absolute inset-0 opacity-20">
            {/* Diagonal Lines */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(251, 146, 60, 0.1) 35px, rgba(251, 146, 60, 0.1) 70px)'
            }}></div>
            
            {/* Dot Pattern */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(239, 68, 68, 0.1) 2px, transparent 2px)',
              backgroundSize: '50px 50px'
            }}></div>
            
            {/* Wave Pattern */}
            <div className="absolute bottom-0 left-0 w-full h-32 opacity-30">
              <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M0,0 C300,120 600,0 900,120 L1200,120 L1200,0 Z" fill="url(#waveGradient)"/>
                <defs>
                  <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor: 'rgba(251, 146, 60, 0.3)'}}/>
                    <stop offset="50%" style={{stopColor: 'rgba(239, 68, 68, 0.3)'}}/>
                    <stop offset="100%" style={{stopColor: 'rgba(251, 146, 60, 0.3)'}}/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        
                  {/* Main Content */}
          <div id="main-content" className="relative z-10 text-center text-white px-3 sm:px-4 md:px-6 lg:px-8 max-w-4xl lg:max-w-5xl mx-auto w-full">
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {/* Organizer Badge */}
            <div className="inline-flex items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500/20 to-red-600/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium border border-white/30 shadow-lg">
              <span className="mr-2 sm:mr-3 text-base sm:text-lg">✨</span>
              <span className="text-white font-semibold text-xs sm:text-sm lg:text-base">Organized by Florentines Events</span>
            </div>

            {/* Main Title */}
            <div className="relative">
              {/* Title Background for Better Readability */}
              <div className="absolute inset-0 -z-5 bg-black/40 backdrop-blur-sm rounded-2xl"></div>
              {/* Decorative Background Elements */}
              <div className="absolute inset-0 -z-10">
                {/* Floating Orbs */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-orange-400/20 to-red-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-red-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
                
                {/* Geometric Patterns */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <div className="absolute top-10 left-10 w-16 h-16 border-2 border-orange-400/30 rotate-45"></div>
                  <div className="absolute top-20 right-20 w-12 h-12 border-2 border-red-400/30 rotate-12"></div>
                  <div className="absolute bottom-20 left-20 w-20 h-20 border-2 border-yellow-400/30 -rotate-45"></div>
                  <div className="absolute bottom-10 right-10 w-14 h-14 border-2 border-orange-400/30 rotate-90"></div>
                </div>
                
                {/* Sparkle Effects */}
                <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
                <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-orange-300 rounded-full animate-ping delay-300"></div>
                <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-red-300 rounded-full animate-ping delay-700"></div>
                
                {/* Curved Lines */}
                <div className="absolute top-0 left-0 w-full h-full">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,50 Q25,20 50,50 T100,50" stroke="rgba(251, 146, 60, 0.2)" strokeWidth="0.5" fill="none" className="animate-pulse"/>
                    <path d="M0,60 Q25,30 50,60 T100,60" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="0.5" fill="none" className="animate-pulse delay-500"/>
                  </svg>
                </div>
              </div>
              
              {/* Enhanced Title with Better Readability */}
              <h1 className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-bold text-white leading-tight relative z-10 px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6" 
                  style={{
                    textShadow: '6px 6px 12px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.8)',
                    filter: 'drop-shadow(0 0 70px rgba(251, 191, 36, 0.4)) drop-shadow(0 0 140px rgba(239, 68, 68, 0.3))'
                  }}>
                {eventDetails.title}
              </h1>
              
              {/* Title Underline Effect */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full opacity-60"></div>
              
              {/* Corner Accents */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-orange-400 rounded-tl-lg"></div>
              <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-red-400 rounded-tr-lg"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-yellow-400 rounded-bl-lg"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-orange-400 rounded-br-lg"></div>
            </div>

                          {/* Subtitle */}
              <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-white max-w-xs xs:max-w-sm sm:max-w-2xl lg:max-w-3xl mx-auto font-semibold leading-relaxed px-3 sm:px-4" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.9), 0 0 15px rgba(0,0,0,0.8)'}}>
                {eventDetails.subtitle}
              </p>

              <p className="text-xs xs:text-sm sm:text-base md:text-lg text-orange-300 font-medium max-w-xs xs:max-w-sm sm:max-w-2xl mx-auto leading-relaxed px-3 sm:px-4 whitespace-nowrap" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.9)'}}>
                FREE Entry + $5 Food Voucher with Parking Reservation
              </p>

                          {/* Event Details */}
              <div className="flex flex-col xs:flex-row flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-xs xs:text-sm px-3 sm:px-4">
                <div className="flex items-center bg-black/60 backdrop-blur-sm px-3 xs:px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-white/50 touch-target min-h-[44px]">
                  <Calendar className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-white flex-shrink-0" />
                  <span className="font-bold text-white text-xs xs:text-sm sm:text-base whitespace-nowrap">{eventDetails.date}</span>
                </div>
                <div className="flex items-center bg-black/60 backdrop-blur-sm px-3 xs:px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-white/50 touch-target min-h-[44px]">
                  <Clock className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-white flex-shrink-0" />
                  <span className="font-bold text-white text-xs xs:text-sm sm:text-base whitespace-nowrap">{eventDetails.time}</span>
                </div>
                <div className="flex items-center bg-black/60 backdrop-blur-sm px-3 xs:px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-white/50 touch-target min-h-[44px]">
                  <MapPin className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-white flex-shrink-0" />
                  <span className="font-bold text-white text-xs xs:text-sm sm:text-base whitespace-nowrap">{eventDetails.venue}</span>
                </div>
              </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8">
              <button
                onClick={() => setShowTicketSelector(true)}
                className="btn-primary text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl px-10 xs:px-12 sm:px-16 md:px-20 lg:px-24 py-5 sm:py-6 md:py-8 lg:py-10 min-h-[64px] sm:min-h-[72px] md:min-h-[80px] lg:min-h-[88px] touch-target"
                id="ticket-section"
                aria-describedby="ticket-description"
                tabIndex={0}
              >
                Reserve Your Parking Spot Now
              </button>
              <div id="ticket-description" className="sr-only">Click to open parking reservation modal for Spice of India 2025 event</div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gradient">
              About the Event
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              {eventDetails.description}
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-20">
            <h3 className="text-3xl font-bold mb-12 text-center text-slate-800">
              Event Highlights
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {eventDetails.features.map((feature, index) => (
                <div key={index} className="card card-hover">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg text-slate-700 font-medium">{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Venue Information */}
          <div className="card max-w-5xl mx-auto text-center p-4 sm:p-6">
            <h3 className="text-2xl xs:text-3xl font-bold mb-6 sm:mb-8 md:mb-12 text-gradient">
              Venue Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-6">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-slate-800">Location</h4>
                <p className="text-slate-600 font-medium">{eventDetails.venue}</p>
                <p className="text-slate-500 text-sm mt-1">{eventDetails.address}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-slate-800">Timing</h4>
                <p className="text-slate-600 font-medium">{eventDetails.time}</p>
                <p className="text-slate-500 text-sm mt-1">Open-air festival</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-slate-800">Event Type</h4>
                <p className="text-slate-600 font-medium">Free Festival</p>
                <p className="text-slate-500 text-sm mt-1">Cultural celebration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

              {/* Parking & Food Voucher Section */}
        <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6 lg:px-8 bg-gradient-to-r from-orange-50 to-red-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
                Premium Parking & Food Vouchers
              </h2>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-xs xs:max-w-sm sm:max-w-2xl lg:max-w-3xl mx-auto px-2">
                Choose from 3 exclusive time slots and reserve your parking spot right beside the event venue with a $5 food voucher included!
              </p>
            </div>

            {/* Time Slot Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg border-2 border-orange-200 sm:col-span-2 lg:col-span-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <span className="text-white text-base sm:text-lg font-bold">1</span>
                </div>
                <h4 className="text-base sm:text-lg font-semibold mb-2 text-gray-900">September 13th</h4>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">3:00 PM onwards</p>
                <p className="text-xs text-gray-500">Evening (Garba Event)</p>
              </div>
              
              <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <span className="text-white text-base sm:text-lg font-bold">2</span>
                </div>
                <h4 className="text-base sm:text-lg font-semibold mb-2 text-gray-900">September 14th</h4>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">9:00 AM - 2:00 PM</p>
                <p className="text-xs text-gray-500">Morning (Cricket Match)</p>
              </div>
              
              <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg border-2 border-orange-200 sm:col-span-2 lg:col-span-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <span className="text-white text-base sm:text-lg font-bold">3</span>
                </div>
                <h4 className="text-base sm:text-lg font-semibold mb-2 text-gray-900">September 14th</h4>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">3:00 PM onwards</p>
                <p className="text-xs text-gray-500">Evening (Garba Event)</p>
              </div>
            </div>



            {/* Final Call to Action */}
            <div className="text-center">
              <div className="card text-center p-4 sm:p-6">
                <h3 className="text-xl xs:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">
                  Reserve Your Parking Spot Today
                </h3>
                <p className="text-sm xs:text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 px-2">
                  Don't miss out on convenient parking right beside the event venue! 
                  Reserve your spot now and get your $5 food voucher included.
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowTicketSelector(true)}
                    className="btn-primary text-sm xs:text-base sm:text-lg px-8 xs:px-12 sm:px-16 py-3 sm:py-4 md:py-5 rounded-full min-h-[44px] touch-target"
                  >
                    Reserve your Parking Spot
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <Newsletter />

        {/* Footer */}
        <Footer />

        {/* Ticket Selector Modal */}
        {showTicketSelector && (
          <TicketSelector
            eventDetails={eventDetails}
            onClose={() => setShowTicketSelector(false)}
          />
        )}


      </div>
    </>
  )
} 