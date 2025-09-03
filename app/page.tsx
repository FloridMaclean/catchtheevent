'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Sparkles, ArrowRight, Star, Users } from 'lucide-react'

import TicketSelector from '../components/TicketSelector'
import Newsletter from '../components/Newsletter'
import Header from '../components/Header'
import Footer from '../components/Footer'

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
    title: "NEW EVENT",
    subtitle: "Event Subtitle - Experience Something Amazing!",
    date: "Date TBA",
    time: "Time TBA",
    venue: "Venue TBA",
    address: "Address TBA",
    description: "This is a placeholder description for your new event. Please update with your actual event details.",
    seoDescription: "Experience an amazing new event! Book your tickets now for an unforgettable experience.",
    features: [
      "Feature 1 - Update with your event features",
      "Feature 2 - Update with your event features",
      "Feature 3 - Update with your event features",
      "Feature 4 - Update with your event features",
      "Feature 5 - Update with your event features",
      "Feature 6 - Update with your event features"
    ],
    seoKeywords: [
      "new event",
      "event tickets",
      "event booking",
      "event venue",
      "event date",
      "event time"
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
            <h2 className="text-xl font-semibold text-slate-700 mb-2">Loading Event</h2>
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
        <div id="page-status">Event page loaded successfully</div>
      </div>
      
      {/* Hero Section with Cross-Device Compatibility */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 safe-area-top">
        <div className="absolute inset-0 z-0">
          {/* Dark Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
          
          {/* Subtle Color Accents */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-green-900/30"></div>
          
          {/* Additional Depth Layer */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          
          {/* Subtle Animated Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating Orbs */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-600/15 to-green-600/15 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-green-600/15 to-blue-600/15 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-r from-blue-600/10 to-green-600/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
            <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-r from-green-600/15 to-blue-600/15 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
            
            {/* Subtle Light Rays - Repositioned to avoid text overlap */}
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/5 to-transparent animate-pulse"></div>
            <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/5 to-transparent animate-pulse" style={{animationDelay: '3s'}}></div>
          </div>
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div id="main-content" className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl lg:max-w-5xl mx-auto spacing-safe">
          {/* Animated background elements */}
          <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <div className="absolute top-32 right-16 w-3 h-3 bg-green-400 rounded-full opacity-50 animate-bounce" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute bottom-32 left-20 w-5 h-5 bg-blue-300 rounded-full opacity-40 animate-bounce" style={{animationDelay: '1.4s'}}></div>
          <div className="absolute bottom-20 right-10 w-3 h-3 bg-green-300 rounded-full opacity-60 animate-bounce" style={{animationDelay: '0.6s'}}></div>
          <div className="absolute top-40 left-0 w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40 transform rotate-45"></div>
          <div className="absolute bottom-40 right-0 w-16 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-40 transform -rotate-45"></div>
          
          <div className="space-y-8 gpu-accelerated">
            {/* Organizer Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative inline-flex items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500/20 to-green-600/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium border border-white/30 shadow-lg"
            >
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
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
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-r from-blue-500 to-green-600 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute -bottom-6 -left-4 w-10 h-10 bg-gradient-to-r from-blue-400 to-green-500 rounded-full opacity-25 animate-pulse" style={{animationDelay: '2s'}}></div>
              <div className="absolute -bottom-8 -right-8 w-14 h-14 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60"></div>
              
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
              className="text-sm sm:text-base md:text-lg text-blue-300 font-medium max-w-2xl mx-auto leading-relaxed px-4 text-responsive"
              style={{textShadow: '1px 1px 2px rgba(0,0,0,0.9)'}}
            >
              Exclusive Event brought to you by Catch The Event
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
              aria-label="Purchase tickets for the event"
              aria-describedby="ticket-description"
              className="bg-[rgb(59,130,246)] hover:bg-[rgb(37,99,235)] text-white text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl px-8 sm:px-12 md:px-16 lg:px-16 xl:px-20 py-4 sm:py-6 md:py-8 lg:py-8 xl:py-10 flex items-center justify-center mx-auto shadow-2xl focus:outline-none focus:ring-4 focus:ring-[rgb(59,130,246)] focus:ring-offset-2 touch-target rounded-full font-black transition-all duration-300 transform hover:scale-110 border-3 sm:border-4 md:border-6 border-black/20 min-h-[56px] sm:min-h-[64px] md:min-h-[72px] lg:min-h-[68px] xl:min-h-[75px] w-[90%] sm:w-[85%] md:w-[80%] lg:w-auto text-center"
              tabIndex={0}
            >
              <Sparkles className="w-5 h-5 mr-3" aria-hidden="true" />
              Get Tickets
              <ArrowRight className="w-5 h-5 ml-3" aria-hidden="true" />
            </motion.button>
            <div id="ticket-description" className="sr-only">Click to open ticket selection modal for the event</div>
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
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
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
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-600 rounded-full flex items-center justify-center mb-6">
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
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-600 rounded-full flex items-center justify-center mb-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-slate-800">Timing</h4>
                <p className="text-slate-600 font-medium">{eventDetails.time}</p>
                <p className="text-slate-500 text-sm mt-1">Event details TBA</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-600 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-slate-800">Event Type</h4>
                <p className="text-slate-600 font-medium">Details TBA</p>
                <p className="text-slate-500 text-sm mt-1">More information coming soon</p>
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
                  <h4 className="font-semibold text-gray-900 mb-2">Event Details</h4>
                  <p className="text-gray-600">Event details and information will be updated soon. Please check back for more information.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Ticket Information</h4>
                  <p className="text-gray-600">Ticket pricing and availability will be announced soon. Stay tuned for updates.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Venue & Timing</h4>
                  <p className="text-gray-600">Venue and timing details will be confirmed and announced shortly.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Refund Policy</h4>
                  <p className="text-gray-600">Refund policy and terms will be clearly communicated when tickets become available.</p>
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
              Don't Miss This Amazing Event!
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Join us for an unforgettable experience
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
              New Event - Coming Soon
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We're preparing something amazing for you. Stay tuned for updates about this exciting new event!
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
              <h3 className="text-xl font-bold mb-4 text-gray-900">Why Choose This Event?</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  <span>Amazing experience - Details coming soon</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  <span>Great venue and atmosphere</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  <span>Professional organization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  <span>Family-friendly event</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  <span>Exclusive benefits for attendees</span>
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Event Highlights</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">🎭</span>
                  <span>Amazing performances - Details TBA</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">🎵</span>
                  <span>Great entertainment - Coming soon</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">🌟</span>
                  <span>Community gathering and celebration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">🎁</span>
                  <span>Special event memorabilia</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">⚡</span>
                  <span>Priority entry for attendees</span>
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
              Book Your Tickets When Available
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              We're working hard to bring you an amazing event experience. 
              Ticket information and booking details will be available soon!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowTicketSelector(true)}
                className="btn-primary text-lg px-8 py-4"
              >
                Get Notified
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