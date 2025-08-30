'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Calendar, Clock, MapPin, Sparkles, ArrowRight, Star, Users } from 'lucide-react'
import dynamic from 'next/dynamic'

// Import TicketSelector directly to test
import TicketSelector from '../components/TicketSelector'
import Newsletter from '../components/Newsletter'



const Header = dynamic(() => import('../components/Header'), {
  ssr: false
})

const Footer = dynamic(() => import('../components/Footer'), {
  ssr: false
})

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
    title: "RANGTAALI Hamilton 2025",
    subtitle: "By Aishwarya Majmudar | Experience an Unforgettable Night of Garba in Hamilton!",
    date: "Sunday, August 31st, 2025",
    time: "6:30 PM",
    venue: "Gage Park",
    address: "1000 Main St E, Hamilton, ON L8M 1N2, Canada",
    description: "Catch The Event proudly presents Rangtaali Hamilton 2025 featuring the sensational Aishwarya Majmudar – one of the most loved voices in the Garba world. Get ready for an evening filled with vibrant rhythms, cultural pride, and electrifying energy. Aishwarya Majmudar is set to light up the stage with her dynamic vocals and captivating performance. This Navratri celebration promises an authentic experience for all ages, uniting the community through music, tradition, and joy.",
    seoDescription: "Experience an Unforgettable Night of Garba in Hamilton! Purchase exclusive $20 Rangtaali Garba Pass for Rangtaali Hamilton 2025 featuring Aishwarya Majmudar. Live Navratri celebration at Gage Park, Hamilton, ON. Book your tickets now!",
    features: [
      "Live Garba performance by Aishwarya Majmudar",
      "Authentic Navratri celebration experience",
      "Open ground venue - India's Open Ground Garba experience in Canada",
      "Community gathering for all ages",
      "Cultural pride and tradition celebration",
      "Vibrant rhythms and electrifying energy"
    ],
    seoKeywords: [
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
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }

  // Render a simple loading state during SSR to prevent hydration mismatches
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-slate-700 mb-2">Loading Rangtaali Hamilton 2025</h2>
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
        Skip to ticket section
      </a>
      
      <Header />
      
      {/* Live Region for Screen Readers */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        <div id="page-status">Rangtaali Hamilton 2025 event page loaded successfully</div>
      </div>
      
      {/* Hero Section with Cross-Device Compatibility */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 safe-area-top">
        <div className="absolute inset-0 z-0">
          {/* Dark Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
          
          {/* Subtle Color Accents */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-pink-900/30"></div>
          
          {/* Additional Depth Layer */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          
          {/* Subtle Animated Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating Orbs */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-600/15 to-pink-600/15 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-600/15 to-purple-600/15 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
            <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-r from-pink-600/15 to-purple-600/15 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
            
            {/* Subtle Light Rays - Repositioned to avoid text overlap */}
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/5 to-transparent animate-pulse"></div>
            <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-pink-500/5 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/5 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/5 to-transparent animate-pulse" style={{animationDelay: '3s'}}></div>
          </div>
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div id="main-content" className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl lg:max-w-5xl mx-auto spacing-safe">
          {/* Animated background elements */}
          <div className="absolute top-20 left-10 w-4 h-4 bg-pink-400 rounded-full opacity-60 animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <div className="absolute top-32 right-16 w-3 h-3 bg-purple-400 rounded-full opacity-50 animate-bounce" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute bottom-32 left-20 w-5 h-5 bg-pink-300 rounded-full opacity-40 animate-bounce" style={{animationDelay: '1.4s'}}></div>
          <div className="absolute bottom-20 right-10 w-3 h-3 bg-purple-300 rounded-full opacity-60 animate-bounce" style={{animationDelay: '0.6s'}}></div>
          <div className="absolute top-40 left-0 w-20 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-40 transform rotate-45"></div>
          <div className="absolute bottom-40 right-0 w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-40 transform -rotate-45"></div>
          
          <div className="space-y-8 gpu-accelerated">
            {/* Organizer Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative inline-flex items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium border border-white/30 shadow-lg"
            >
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
              <span className="mr-2 sm:mr-3 text-base sm:text-lg">✨</span>
              <span className="text-white font-semibold text-xs sm:text-sm lg:text-base">Organized by Panghat Entertainment Ltd.</span>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute -bottom-6 -left-4 w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>
              <div className="absolute -bottom-8 -right-8 w-14 h-14 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20 animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-60"></div>
              {/* <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60"></div> */}
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight relative z-10 text-responsive-xl" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6)'}}>
                RANGTAALI Hamilton 2025
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
              By Aishwarya Majmudar | Experience an Unforgettable Night of Garba in Hamilton, ON!
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-sm sm:text-base md:text-lg text-pink-300 font-medium max-w-2xl mx-auto leading-relaxed px-4 text-responsive"
              style={{textShadow: '1px 1px 2px rgba(0,0,0,0.9)'}}
            >
              Exclusive Discount brought to you by Catch The Event
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
              aria-label="Purchase tickets for Rangtaali Hamilton 2025"
              aria-describedby="ticket-description"
              className="bg-[rgb(175,254,0)] hover:bg-[rgb(155,234,0)] text-black text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl px-8 sm:px-12 md:px-16 lg:px-16 xl:px-20 py-4 sm:py-6 md:py-8 lg:py-8 xl:py-10 flex items-center justify-center mx-auto shadow-2xl focus:outline-none focus:ring-4 focus:ring-[rgb(175,254,0)] focus:ring-offset-2 touch-target rounded-full font-black transition-all duration-300 transform hover:scale-110 border-3 sm:border-4 md:border-6 border-black/20 min-h-[56px] sm:min-h-[64px] md:min-h-[72px] lg:min-h-[68px] xl:min-h-[75px] w-[90%] sm:w-[85%] md:w-[80%] lg:w-auto text-center"
              tabIndex={0}
            >
              <Sparkles className="w-5 h-5 mr-3" aria-hidden="true" />
              Buy for $20 only
              <ArrowRight className="w-5 h-5 ml-3" aria-hidden="true" />
            </motion.button>
            <div id="ticket-description" className="sr-only">Click to open ticket selection modal for Rangtaali Hamilton 2025 event</div>
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
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
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
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
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
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-slate-800">Timing</h4>
                <p className="text-slate-600 font-medium">{eventDetails.time}</p>
                <p className="text-slate-500 text-sm mt-1">Open ground event</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-slate-800">Event Type</h4>
                <p className="text-slate-600 font-medium">Open Ground</p>
                <p className="text-slate-500 text-sm mt-1">Navratri celebration</p>
              </motion.div>
            </div>
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
                  <h4 className="font-semibold text-gray-900 mb-2">Open Ground Venue</h4>
                  <p className="text-gray-600">This is an Open Ground venue. We are bringing India's Open Ground Garba experience to Canada.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Footwear Requirement</h4>
                  <p className="text-gray-600">No barefoot Garba allowed. Make sure to wear adequate shoes/footwear to ensure safety. We are not responsible for any damage.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Weather Policy</h4>
                  <p className="text-gray-600">Event Date/Venue might change in case of bad weather conditions. If such a scenario happens you will be given the option of a Refund or still participate on another Date/Venue.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Pricing Policy</h4>
                  <p className="text-gray-600">The price of the tickets may increase or decrease based on the availability of tickets and demand. You are not entitled to refund the difference in such a scenario.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Refund Policy</h4>
                  <p className="text-gray-600">Strictly No refund in any other scenarios apart from the weather-related changes mentioned above.</p>
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
              Don't Miss Hamilton's Most Extravagant Navratri Night!
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Join us with your friends and family for an unforgettable Garba celebration
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowTicketSelector(true)}
              className="bg-white text-primary-600 font-semibold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-all duration-200"
            >
              Book Your Tickets Now
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
              Rangtaali Hamilton 2025 - Premier Garba Event in Canada
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join us for the most spectacular Navratri celebration in Hamilton featuring Aishwarya Majmudar, 
              one of the most loved voices in the Garba world. Experience authentic Indian culture and 
              traditional Garba dance at Gage Park, Hamilton.
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
              <h3 className="text-xl font-bold mb-4 text-gray-900">Why Choose Rangtaali Hamilton 2025?</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  <span>Exclusive $20 Garba Pass - Best value in Hamilton</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  <span>Live performance by Aishwarya Majmudar</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  <span>Open ground venue - Authentic Garba experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  <span>Family-friendly Navratri celebration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  <span>Priority entry and exclusive benefits</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Event Highlights</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">🎭</span>
                  <span>Traditional Garba dance performance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">🎵</span>
                  <span>Live music by Aishwarya Majmudar</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">🌟</span>
                  <span>Cultural celebration and community gathering</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">🎁</span>
                  <span>Exclusive event memorabilia included</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">⚡</span>
                  <span>Priority entry for all pass holders</span>
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
              Book Your Rangtaali Hamilton 2025 Tickets Today
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Don't miss the most extravagant Navratri night in Hamilton! Secure your exclusive 
              $20 Garba Pass for Rangtaali Hamilton 2025 featuring Aishwarya Majmudar. 
              Limited tickets available at Gage Park, Hamilton.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowTicketSelector(true)}
                className="btn-primary text-lg px-8 py-4"
              >
                Get Your $20 Garba Pass
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