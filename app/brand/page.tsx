'use client'

import React from 'react'
import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function BrandPage() {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Catch The Event - Brand & Company Information | Premier Event Platform & Event Management Software | Eventbrite Alternative Canada</title>
        <meta name="title" content="Catch The Event - Brand & Company Information | Premier Event Platform & Event Management Software | Eventbrite Alternative Canada" />
        <meta name="description" content="Learn about Catch The Event - the premier event platform and event management software serving Hamilton, Toronto, and Ontario. Leading Eventbrite alternative and Ticketmaster competitor in Canada with low fee event ticketing platform." />
        <meta name="keywords" content="Catch The Event, catchtheevent, catchtheevent.com, www.catchtheevent.com, event platform, event management software, online ticketing platform, event registration software, event hosting platform, event solutions Canada, ticketing solutions Canada, event organizer platform, Eventbrite alternative Canada, Ticketmaster competitor Canada, event platform Toronto, ticketing software Toronto, event management Ontario, online event registration Toronto, event organizer tools Toronto, local event ticketing Toronto, event solutions Ontario, event management companies Toronto, event planners near me Toronto, event planning services Toronto, low fee event ticketing platform Canada, event management software for small businesses Toronto, virtual event platform with attendee engagement features, sustainable event planning tools Ontario, AI powered event registration Canada, event platform with pre-event payouts Canada, event platform for professional services Toronto, ticketing platform with secure payment processing Canada, how to choose event management software for festivals, corporate event platform Toronto, music festival ticketing Ontario, community event registration Toronto, conference management software Canada, horror convention ticketing Ontario, quilter's conference registration Canada, how to reduce event ticketing fees Canada, easy event registration for small businesses, event platform with real-time analytics, secure online payment processing for events Canada, event ticketing platform, hamilton events, toronto events, ontario events, cultural festival, event management, company information, brand identity" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://catchtheevent.com/brand" />
        <meta property="og:title" content="Catch The Event - Brand & Company Information | Premier Event Ticketing Platform" />
        <meta property="og:description" content="Learn about Catch The Event - the premier event ticketing platform serving Hamilton, Toronto, and Ontario." />
        <meta property="og:image" content="https://catchtheevent.com/images/logo-no-background.png" />
        <meta property="og:site_name" content="Catch The Event" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://catchtheevent.com/brand" />
        <meta property="twitter:title" content="Catch The Event - Brand & Company Information | Premier Event Ticketing Platform" />
        <meta property="twitter:description" content="Learn about Catch The Event - the premier event ticketing platform serving Hamilton, Toronto, and Ontario." />
        <meta property="twitter:image" content="https://catchtheevent.com/images/logo-no-background.png" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Catch The Event" />
        <meta name="creator" content="Catch The Event" />
        <meta name="publisher" content="Catch The Event" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://catchtheevent.com/brand" />
        
        {/* Structured Data for Brand */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Brand",
              "name": "Catch The Event",
              "alternateName": ["CTE", "catchtheevent", "catchtheevent.com", "www.catchtheevent.com"],
              "description": "Premier event ticketing platform serving Hamilton, Toronto, and Ontario",
              "url": "https://catchtheevent.com/brand",
              "logo": "https://catchtheevent.com/images/logo-no-background.png",
              "slogan": "Premier Event Ticketing Platform",
              "brand": "Catch The Event",
              "category": "Event Ticketing",
              "industry": "Entertainment",
              "foundingDate": "2025",
              "knowsAbout": ["Event Management", "Cultural Festivals", "Live Music Events", "Sports Events", "Family Entertainment"],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Event Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Event Ticketing",
                      "description": "Online ticket booking and event management"
                    }
                  }
                ]
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
                Catch The Event
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl text-slate-600 mb-8 max-w-4xl mx-auto">
                Premier Event Platform & Event Management Software
              </p>
              <p className="text-lg sm:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
                Leading Eventbrite alternative and Ticketmaster competitor in Canada. Low fee event ticketing platform with secure payment processing and comprehensive event solutions for Hamilton, Toronto, and Ontario.
              </p>
            </div>
          </div>
        </section>

        {/* Brand Identity Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-8">
                  Our Brand Identity
                </h2>
                <div className="space-y-6 text-lg text-slate-600">
                  <p>
                    <strong>Catch The Event</strong> represents more than just a ticketing platform - we're your gateway to extraordinary experiences that bring communities together.
                  </p>
                  <p>
                    Our name embodies the excitement and anticipation of discovering amazing events, while our platform ensures you never miss out on the moments that matter.
                  </p>
                  <p>
                    From cultural festivals to live music, sports events to family entertainment, we're committed to making event discovery and booking seamless, secure, and enjoyable.
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-8 sm:p-12 text-white text-center">
                <div className="text-6xl sm:text-7xl mb-6">🎉</div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">Catch The Event</h3>
                <p className="text-lg opacity-90">Premier Event Ticketing Platform</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
                Mission & Values
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Driving our commitment to excellence in event management and community engagement
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Our Mission</h3>
                <p className="text-slate-600">
                  To connect communities with extraordinary events through innovative ticketing solutions and exceptional service, making cultural experiences accessible to everyone.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Our Values</h3>
                <p className="text-slate-600">
                  Excellence, innovation, community focus, accessibility, and trust. We believe in creating meaningful connections through shared experiences.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Our Vision</h3>
                <p className="text-slate-600">
                  To become the leading event ticketing platform in Ontario, known for reliability, innovation, and community impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Company Information Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-8 sm:p-12 text-white">
                <h3 className="text-2xl sm:text-3xl font-bold mb-6">Company Details</h3>
                <div className="space-y-4 text-lg">
                  <div>
                    <strong>Company Name:</strong> Catch The Event
                  </div>
                  <div>
                    <strong>Founded:</strong> 2025
                  </div>
                  <div>
                    <strong>Industry:</strong> Event Ticketing & Management
                  </div>
                  <div>
                    <strong>Location:</strong> Hamilton, Ontario, Canada
                  </div>
                  <div>
                    <strong>Website:</strong> catchtheevent.com
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-8">
                  About Our Company
                </h2>
                <div className="space-y-6 text-lg text-slate-600">
                  <p>
                    <strong>Catch The Event</strong> was established in 2025 with a clear vision: to revolutionize how people discover, book, and experience events in Ontario.
                  </p>
                  <p>
                    Based in Hamilton, we serve communities across the Greater Toronto Area and beyond, bringing world-class events closer to home.
                  </p>
                  <p>
                    Our platform combines cutting-edge technology with deep local knowledge to deliver seamless event experiences that enrich our communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
                Our Services
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Comprehensive event solutions designed to meet every need
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="text-4xl mb-4">🎫</div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">Event Ticketing</h3>
                <p className="text-slate-600 text-sm">
                  Secure online ticket booking for all types of events
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="text-4xl mb-4">🚗</div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">Parking Reservation</h3>
                <p className="text-slate-600 text-sm">
                  Convenient parking solutions for event attendees
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="text-4xl mb-4">🍽️</div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">Food Vouchers</h3>
                <p className="text-slate-600 text-sm">
                  Enhanced event experience with food vouchers
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="text-4xl mb-4">🎭</div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">Event Management</h3>
                <p className="text-slate-600 text-sm">
                  Full-service event planning and coordination
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-8">
              Get in Touch
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Ready to discover amazing events? Contact us today!
            </p>
            <div className="space-y-4 text-lg text-slate-600">
              <div>
                <strong>Email:</strong> info@catchtheevent.com
              </div>
              <div>
                <strong>Phone:</strong> +1-905-XXX-XXXX
              </div>
              <div>
                <strong>Location:</strong> Hamilton, Ontario, Canada
              </div>
              <div>
                <strong>Website:</strong> catchtheevent.com
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
