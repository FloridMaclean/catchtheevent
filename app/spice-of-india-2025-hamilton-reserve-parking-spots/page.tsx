'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Sparkles, ArrowRight, Star, Users, Car, Utensils } from 'lucide-react'

import TicketSelector from '../../components/TicketSelector'
import Newsletter from '../../components/Newsletter'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Home() {
  const [showTicketSelector, setShowTicketSelector] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  // Environment check for production readiness
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode - environment variables loaded')
    }
  }, [])

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

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
    subtitle: "Free Cultural & Food Festival | Live Music, Dance, DJs & Open-Air Garba",
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

  // Render a simple loading state during SSR to prevent hydration mismatches
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-slate-700 mb-2">Loading Spice of India 2025</h2>
            <p className="text-slate-500">Preparing your amazing experience...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" suppressHydrationWarning>
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
      
      {/* Hero Section with Cross-Device Compatibility */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 safe-area-top">
        <div className="absolute inset-0 z-0">
          {/* Dark Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
          
          {/* Subtle Color Accents */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-transparent to-red-900/30"></div>
          
          {/* Additional Depth Layer */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          
          {/* Subtle Animated Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating Orbs */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-orange-600/15 to-red-600/15 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-red-600/15 to-orange-600/15 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-r from-orange-600/10 to-red-600/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
            <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-r from-red-600/15 to-orange-600/15 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
            
            {/* Subtle Light Rays - Repositioned to avoid text overlap */}
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-orange-500/5 to-transparent animate-pulse"></div>
            <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-red-500/5 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/5 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/5 to-transparent animate-pulse" style={{animationDelay: '3s'}}></div>
          </div>
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div id="main-content" className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl lg:max-w-5xl mx-auto spacing-safe">
          {/* Animated background elements */}
          <div className="absolute top-20 left-10 w-4 h-4 bg-orange-400 rounded-full opacity-60 animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <div className="absolute top-32 right-16 w-3 h-3 bg-red-400 rounded-full opacity-50 animate-bounce" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute bottom-32 left-20 w-5 h-5 bg-orange-300 rounded-full opacity-40 animate-bounce" style={{animationDelay: '1.4s'}}></div>
          <div className="absolute bottom-20 right-10 w-3 h-3 bg-red-300 rounded-full opacity-60 animate-bounce" style={{animationDelay: '0.6s'}}></div>
          <div className="absolute top-40 left-0 w-20 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-40 transform rotate-45"></div>
          <div className="absolute bottom-40 right-0 w-16 h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent opacity-40 transform -rotate-45"></div>
          
          <div className="space-y-8 gpu-accelerated">
            {/* Organizer Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative inline-flex items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500/20 to-red-600/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium border border-white/30 shadow-lg"
            >
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
              <span className="mr-2 sm:mr-3 text-base sm:text-lg">✨</span>
              <span className="text-white font-semibold text-xs sm:text-sm lg:text-base">Organized by Catch The Event</span>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-full opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute -bottom-6 -left-4 w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>
              <div className="absolute -bottom-8 -right-8 w-14 h-14 bg-gradient-to-r from-red-400 to-orange-500 rounded-full opacity-20 animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-60"></div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight relative z-10 text-responsive-xl" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6)'}}>
                {eventDetails.title}
              </h1>
              
              <div className="absolute top-4 right-8 text-2xl animate-bounce" style={{animationDelay: '0.3s'}}>✨</div>
              <div className="absolute bottom-4 left-8 text-xl animate-bounce" style={{animationDelay: '0.7s'}}>⭐</div>
              <div className="absolute top-1/2 -right-4 text-lg animate-bounce" style={{animationDelay: '1.2s'}}>💫</div>
              <div className="absolute top-1/2 -left-4 text-lg animate-bounce" style={{animationDelay: '0.9s'}}>🌟</div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white max-w-2xl sm:max-w-3xl mx-auto font-semibold leading-relaxed px-4 text-responsive"
              style={{textShadow: '1px 1px 3px rgba(0,0,0,0.9), 0 0 15px rgba(0,0,0,0.8)'}}
            >
              {eventDetails.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-sm sm:text-base md:text-lg text-orange-300 font-medium max-w-2xl mx-auto leading-relaxed px-4 text-responsive"
              style={{textShadow: '1px 1px 2px rgba(0,0,0,0.9)'}}
            >
              FREE Entry + $5 Food Voucher with Parking Reservation
            </motion.p>

            {/* Event Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 text-sm px-4"
            >
              <div className="flex items-center bg-black/60 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-white/50 touch-target">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-white" />
                <span className="font-bold text-white text-sm sm:text-base">{eventDetails.date}</span>
              </div>
              <div className="flex items-center bg-black/60 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-white/50 touch-target">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-white" />
                <span className="font-bold text-white text-sm sm:text-base">{eventDetails.time}</span>
              </div>
              <div className="flex items-center bg-black/60 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-white/50 touch-target">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-white" />
                <span className="font-bold text-white text-sm sm:text-base">{eventDetails.venue}</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowTicketSelector(true)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setShowTicketSelector(true)
                }
              }}
              aria-label="Reserve parking spot for Spice of India 2025"
              aria-describedby="ticket-description"
              className="bg-[rgb(245,101,101)] hover:bg-[rgb(220,38,38)] text-white text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl px-8 sm:px-12 md:px-16 lg:px-16 xl:px-20 py-4 sm:py-6 md:py-8 lg:py-8 xl:py-10 flex items-center justify-center mx-auto shadow-2xl focus:outline-none focus:ring-4 focus:ring-[rgb(245,101,101)] focus:ring-offset-2 touch-target rounded-full font-black transition-all duration-300 transform hover:scale-110 border-3 sm:border-4 md:border-6 border-black/20 min-h-[56px] sm:min-h-[64px] md:min-h-[72px] lg:min-h-[68px] xl:min-h-[75px] w-[90%] sm:w-[85%] md:w-[80%] lg:w-auto text-center"
              tabIndex={0}
            >
              <Car className="w-5 h-5 mr-3" aria-hidden="true" />
              Reserve Parking Spot
              <ArrowRight className="w-5 h-5 ml-3" aria-hidden="true" />
            </motion.button>
            <div id="ticket-description" className="sr-only">Click to open parking reservation modal for Spice of India 2025 event</div>
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gradient">
              About the Event
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              {eventDetails.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-20"
          >
            <h3 className="text-3xl font-bold mb-12 text-center text-slate-800">
              Event Highlights
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {eventDetails.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card card-hover"
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg text-slate-700 font-medium">{feature}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Venue Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="card max-w-5xl mx-auto text-center"
          >
            <h3 className="text-3xl font-bold mb-12 text-gradient">
              Venue Information
            </h3>
            <div className="grid md:grid-cols-3 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-6">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-slate-800">Location</h4>
                <p className="text-slate-600 font-medium">{eventDetails.venue}</p>
                <p className="text-slate-500 text-sm mt-1">{eventDetails.address}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-slate-800">Timing</h4>
                <p className="text-slate-600 font-medium">{eventDetails.time}</p>
                <p className="text-slate-500 text-sm mt-1">Open-air festival</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-slate-800">Event Type</h4>
                <p className="text-slate-600 font-medium">Free Festival</p>
                <p className="text-slate-500 text-sm mt-1">Cultural celebration</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Parking & Food Voucher Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Premium Parking & Food Vouchers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from 3 exclusive time slots and reserve your parking spot right beside the event venue with a $5 food voucher included!
            </p>
          </motion.div>

          {/* Time Slot Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Available Time Slots</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-lg font-bold">1</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">September 13th</h4>
                <p className="text-orange-700 font-semibold">3:00 PM Onwards</p>
                <p className="text-gray-600 text-sm">Afternoon & Evening</p>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-lg font-bold">2</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">September 14th</h4>
                <p className="text-blue-700 font-semibold">9:00 AM - 2:00 PM</p>
                <p className="text-gray-600 text-sm">Live Cricket Match</p>
                <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded-full mt-2">CRICKET MATCH</span>
              </div>
              
              <div className="text-center p-4 bg-red-50 rounded-lg border-2 border-red-200">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-lg font-bold">3</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">September 14th</h4>
                <p className="text-red-700 font-semibold">3:00 PM Onwards</p>
                <p className="text-gray-600 text-sm">Afternoon & Evening</p>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Parking Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Car className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-6 text-gray-900">Parking Reservation</h3>
                <div className="space-y-4 text-left">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Parking Spot:</span>
                    <span className="text-green-600 font-bold">$10.00</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Convenience Fee:</span>
                    <span className="text-orange-600 font-bold">$1.10</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Processing Fee:</span>
                    <span className="text-orange-600 font-bold">$1.50</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Tax (13%):</span>
                    <span className="text-red-600 font-bold">$1.30</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white">
                    <span className="font-bold text-lg">Total:</span>
                    <span className="font-bold text-xl">$13.90</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Limited to 150 parking spots available for both days
                </p>
              </div>
            </motion.div>

            {/* Food Voucher Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Utensils className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-6 text-gray-900">$5 Food Voucher</h3>
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-800 mb-2">What's Included:</h4>
                    <ul className="space-y-2 text-green-700">
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        $5 credit towards food purchases
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        Redeemable with selected vendors
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        Valid for both event days
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        No expiration during event
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-800 mb-2">Vendor Selection:</h4>
                    <p className="text-blue-700">
                      Choose from our curated selection of food vendors offering authentic Indian cuisine, snacks, and beverages.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setShowTicketSelector(true)}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-xl font-bold py-4 px-8 rounded-full hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Reserve Your Parking Spot Now
            </button>
            <p className="text-gray-600 mt-4">
              Limited availability - Only 150 spots for 2 days!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Important Information Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Important Information
            </h2>
            <p className="text-lg text-gray-600">
              Please read the following details and rules carefully
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="card"
          >
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Free Event Entry</h4>
                  <p className="text-gray-600">Spice of India 2025 is completely free to attend. No tickets required for entry to the festival.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Parking Time Slots</h4>
                  <p className="text-gray-600">Choose from 3 exclusive time slots: September 13th (3:00 PM onwards), September 14th morning (9:00 AM - 2:00 PM) for cricket match, or September 14th afternoon (3:00 PM onwards).</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Food Voucher</h4>
                  <p className="text-gray-600">$5 food voucher is included with each parking reservation and can be redeemed with selected food vendors during your specific time slot.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Cricket Match Special</h4>
                  <p className="text-gray-600">September 14th morning slot (9:00 AM - 2:00 PM) includes access to the live cricket match at the venue.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Weather Policy</h4>
                  <p className="text-gray-600">This is an open-air event. In case of severe weather, updates will be provided on our website and social media.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Refund Policy</h4>
                  <p className="text-gray-600">Parking reservations are non-refundable. Food vouchers are valid for the duration of the event.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Don't Miss Hamilton's Most Vibrant Cultural Festival!
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Join us for two days of amazing food, music, dance, and cultural celebration
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowTicketSelector(true)}
              className="bg-white text-primary-600 font-semibold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-all duration-200"
            >
              Reserve Your Parking Spot Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* SEO-Optimized Content Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Spice of India 2025 - Hamilton's Premier Cultural Festival
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Experience the rich culture and flavors of India at Bayfront Park, Hamilton. 
              Enjoy live performances, delicious food, and community celebration in a beautiful open-air setting.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Why Choose Spice of India 2025?</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  <span>Completely free entry for everyone</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  <span>Live music, dance, and DJ performances</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  <span>Open-air Garba event after 6:00 PM</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  <span>Diverse food and shopping vendors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  <span>Family-friendly cultural celebration</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Event Highlights</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">🎭</span>
                  <span>Live cultural performances</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">🎵</span>
                  <span>Music and DJ entertainment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">🌟</span>
                  <span>Open-air Garba celebration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">🍽️</span>
                  <span>Authentic Indian cuisine</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">🛍️</span>
                  <span>Shopping opportunities</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="card text-center"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              Reserve Your Parking Spot Today
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Don't miss out on convenient parking right beside the event venue! 
              Reserve your spot now and get your $5 food voucher included.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowTicketSelector(true)}
                className="btn-primary text-lg px-8 py-4"
              >
                Reserve Parking + Get Food Voucher
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Newsletter />

      <Footer />

      {/* Ticket Selector Modal */}
      {showTicketSelector && (
        <TicketSelector 
          onClose={() => setShowTicketSelector(false)}
          eventDetails={eventDetails}
        />
      )}
    </div>
  )
} 