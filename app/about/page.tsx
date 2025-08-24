'use client'

import { motion } from 'framer-motion'
import { Users, Shield, CreditCard, Globe, Star, Zap, CheckCircle } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your ultimate online hub for unforgettable experiences
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                We are
              </h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  Welcome to Catch The Event, your ultimate online hub for unforgettable experiences. We empower event organizers—from intimate community gatherings to vibrant local shows—with free listings and powerful tools for seamless creation, impactful promotion, and secure ticket management.
                </p>
                <p>
                  Attendees effortlessly find and purchase tickets, enjoying a transparent, safe buying journey. Supporting Canadian and US dollars, and deeply committed to accessibility and trusted payments via Stripe/PayPal, Catch The Event actively cultivates thriving communities.
                </p>
                <p>
                  Connect, create, and celebrate the diverse world of events, all accessible in one intuitive platform.
                </p>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="text-center mb-6">
                <Star className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-xl text-gray-700 text-center italic font-medium mb-6">
                  "Crafting Timeless Moments, Exceeding Every Expectation"
                </p>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p>Empower event organizers with powerful, accessible tools</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p>Create seamless experiences for attendees worldwide</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p>Build thriving communities through memorable events</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p>Ensure security, transparency, and accessibility for all</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              What We Offer
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* For Organizers */}
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <Users className="w-8 h-8 text-primary-500 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">For Organizers</h3>
                </div>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>Free event listings</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>Real-time sales tracking</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>Comprehensive attendee reports</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>Secure web-based check-in system with unique QR codes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>Support for recurring events</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>Streamlined event management</span>
                  </li>
                </ul>
              </div>

              {/* For Attendees */}
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <Zap className="w-8 h-8 text-primary-500 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">For Attendees</h3>
                </div>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>100% secure ticket-buying experience</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>100% real tickets guaranteed</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>Clear all-in pricing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>Easy social sharing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>Seamless event discovery</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>Transparent, safe buying journey</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Security & Trust Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <Shield className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Security First</h3>
              <p className="text-gray-600">
                Robust fraud detection and data encryption ensure your information and transactions are always protected.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <CreditCard className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Trusted Payments</h3>
              <p className="text-gray-600">
                Secure payments via Stripe/PayPal with support for Canadian and US dollars.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <Globe className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Accessibility</h3>
              <p className="text-gray-600">
                Deeply committed to accessibility, ensuring our platform is available to everyone.
              </p>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Create Unforgettable Moments?
            </h2>
            <p className="text-xl mb-6 text-primary-100">
              Join thousands of organizers and attendees who trust Catch The Event for their event needs.
            </p>
            <p className="text-lg mb-8 text-primary-100">
              Contact us: <a href="mailto:info@catchtheevent.com" className="text-white hover:underline font-semibold">info@catchtheevent.com</a>
            </p>
            <div className="flex justify-center">
              <a href="/" className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200">
                Browse Events
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 