'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Sparkles, ArrowRight, Star, Users, CheckCircle } from 'lucide-react'

// Import TicketSelector directly to test
import TicketSelector from '../../components/TicketSelector'
import Newsletter from '../../components/Newsletter'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function MeetGreetAishwaryaPage() {
  const [showTicketSelector, setShowTicketSelector] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
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
    title: "Meet & Greet with Aishwarya Majmudar",
    subtitle: "Exclusive Meet & Greet Experience | Photo Opportunity & Autograph Session",
    date: "September 1st, 2025",
    time: "6:00 PM - 8:30 PM",
    venue: "Madras Chettinaad",
    address: "509 Wilon Ave #16, Kitchener, ON N2C 2M4",
    description: "Join us for an exclusive Meet & Greet with the sensational Aishwarya Majmudar! This intimate event offers you the unique opportunity to meet one of the most loved voices in the Garba world. Get up close and personal with Aishwarya, take photos, get autographs, and create unforgettable memories. Limited spots available for this exclusive experience.",
    seoDescription: "Exclusive Meet & Greet with Aishwarya Majmudar in Kitchener! Photo opportunity, autograph session, and intimate experience. Limited spots available. Book your $35 ticket now!",
    price: 35,
    convenienceFee: 1,
    processingFee: 1.10,
    taxRate: 0.13,
    totalPrice: 35 + 1 + 1.10 + ((35 + 1 + 1.10) * 0.13),
    limitedSpots: true,
    presenters: [
      "Catch The Event",
      "Panghat Entertainment Ltd",
      "Mitul Shah at International Promoter"
    ],
    features: [
      "Exclusive Meet & Greet with Aishwarya Majmudar",
      "Photo Opportunity",
      "Autograph Session",
      "Intimate Experience",
      "Limited Spots Available",
      "Professional Photography"
    ],
    seoKeywords: [
      "meet and greet aishwarya majmudar",
      "aishwarya majmudar kitchener",
      "exclusive meet and greet",
      "photo opportunity aishwarya",
      "autograph session",
      "kitchener event tickets",
      "madras chettinaad",
      "aishwarya majmudar 2025",
      "meet and greet tickets",
      "exclusive event kitchener",
      "aishwarya majmudar photo",
      "autograph aishwarya majmudar",
      "kitchener meet and greet",
      "exclusive experience",
      "limited spots available",
      "$35 meet and greet",
      "aishwarya majmudar canada",
      "ontario meet and greet",
      "exclusive access",
      "personal experience"
    ]
  }



  // Render a simple loading state during SSR to prevent hydration mismatches
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-slate-700 mb-2">Loading Meet & Greet Event</h2>
            <p className="text-slate-500">Preparing your exclusive experience...</p>
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
        <div id="page-status">Meet & Greet with Aishwarya Majmudar event page loaded successfully</div>
      </div>
      
      {/* Hero Section with Cross-Device Compatibility */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 safe-area-top">
        <div className="absolute inset-0 z-0">
          {/* Aishwarya Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/images/Aishwarya.png)',
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          ></div>
          
          {/* Dark Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-black/70 to-gray-900/80"></div>
          
          {/* Subtle Color Accents */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-transparent to-pink-900/40"></div>
          
          {/* Additional Depth Layer */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
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
              <span className="text-white font-semibold text-xs sm:text-sm lg:text-base">Organized by Catch The Event</span>
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
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight relative z-10 text-responsive-xl" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6)'}}>
                Meet & Greet with Aishwarya Majmudar
              </h1>
              
              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl md:text-2xl text-gray-200 mt-6 max-w-3xl mx-auto leading-relaxed"
              >
                {eventDetails.subtitle}
              </motion.p>
            </motion.div>

            {/* Event Details Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-sm sm:text-base"
            >
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <Calendar className="w-4 h-4 text-pink-400" />
                <span className="text-white font-medium">{eventDetails.date}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="text-white font-medium">{eventDetails.time}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <MapPin className="w-4 h-4 text-pink-400" />
                <span className="text-white font-medium">{eventDetails.venue}</span>
              </div>
            </motion.div>

            {/* Limited Spots Warning */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-yellow-400/30"
            >
              <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-yellow-300 font-semibold text-sm sm:text-base">Limited Spots Available - Book Early!</span>
              <Star className="w-5 h-5 text-yellow-400 animate-pulse" style={{animationDelay: '0.5s'}} />
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="pt-4"
            >
              <button
                onClick={() => setShowTicketSelector(true)}
                className="group relative inline-flex items-center justify-center px-8 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl font-bold text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg border border-white/20 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center space-x-2">
                  <span>Book Your Exclusive Spot</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              About This Exclusive Experience
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {eventDetails.description}
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventDetails.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{feature}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

            {/* Event Details Section */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Event Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Calendar className="w-6 h-6 mr-3 text-pink-400" />
                  Event Details
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center text-white">
                    <Calendar className="w-5 h-5 mr-3 text-pink-400" />
                    <span className="font-medium">{eventDetails.date}</span>
                  </div>
                  
                  <div className="flex items-center text-white">
                    <Clock className="w-5 h-5 mr-3 text-purple-400" />
                    <span className="font-medium">{eventDetails.time}</span>
                  </div>
                  
                  <div className="flex items-start text-white">
                    <MapPin className="w-5 h-5 mr-3 text-pink-400 mt-1" />
                    <div>
                      <div className="font-medium">{eventDetails.venue}</div>
                      <div className="text-gray-300 text-sm">{eventDetails.address}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Presenters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Users className="w-6 h-6 mr-3 text-purple-400" />
                  Presented By
                </h3>
                
                <div className="space-y-3">
                  {eventDetails.presenters.map((presenter, index) => (
                    <div key={index} className="flex items-center text-white">
                      <CheckCircle className="w-4 h-4 mr-3 text-green-400" />
                      <span>{presenter}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* What's Included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full">
                <h3 className="text-2xl font-bold text-white mb-6">What's Included</h3>
                
                <div className="space-y-3 text-white">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    <span>Meet & Greet with Aishwarya Majmudar</span>
                  </div>
                  
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    <span>Photo Opportunity</span>
                  </div>
                  
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    <span>Autograph Session</span>
                  </div>
                  
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    <span>Purchase Summary Email</span>
                  </div>
                  
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    <span>Limited Spots - Book Early!</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Booking Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => setShowTicketSelector(true)}
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-6 px-12 rounded-2xl text-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl mx-auto"
              >
                <Sparkles className="w-6 h-6" />
                <span>Book Your Exclusive Spot</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </motion.div>

            {/* Limited Spots Warning */}
            <div className="bg-yellow-500/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/30 max-w-2xl mx-auto">
              <div className="flex items-center justify-center text-yellow-300">
                <Star className="w-5 h-5 mr-3 animate-pulse" />
                <span className="font-semibold">Limited Spots Available - Book Early to Secure Your Place!</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Footer */}
      <Footer />

        {/* Ticket Selector Modal */}
        {showTicketSelector && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <TicketSelector 
                eventDetails={eventDetails}
                eventName="Meet & Greet with Aishwarya Majmudar"
                basePrice={eventDetails.price}
                convenienceFee={eventDetails.convenienceFee}
                processingFee={eventDetails.processingFee}
                taxRate={eventDetails.taxRate}
                onClose={() => setShowTicketSelector(false)}
              />
            </motion.div>
          </div>
        )}
      </div>
    )
  }
