'use client'

import { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Instagram } from 'lucide-react'

export default function Footer() {
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Render a simple loading state during SSR to prevent hydration mismatches
  if (!isClient) {
    return (
      <footer className="glass-effect border-t border-white/30">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            <div className="sm:col-span-2">
              <div className="flex items-center mb-6">
                <div className="h-14 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-8"></div>
              <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div>
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div>
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse mb-6"></div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/30 mt-12 pt-8 text-center">
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="glass-effect border-t border-white/30" suppressHydrationWarning>
      <div className="container-max px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2">
            <div className="flex items-center mb-6">
              <a href="/" className="hover:opacity-80 transition-all duration-300 hover:scale-105">
                <img 
                  src="/images/logo-no-background.png" 
                  alt="Catch The Event Logo" 
                  className="h-14 w-auto"
                />
              </a>
            </div>
            <p className="text-slate-600 mb-8 max-w-lg leading-relaxed">
              Your premier event ticketing platform. We host and manage the best events, bringing unforgettable experiences to communities across Canada.
            </p>
            <div className="flex space-x-6">
              <a 
                href="https://www.instagram.com/catch_the_event/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-800 transition-all duration-300 hover:scale-110"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-slate-800">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-slate-600 hover:text-slate-800 transition-all duration-200 hover:translate-x-1 inline-block">
                  About Us
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-slate-600 hover:text-slate-800 transition-all duration-200 hover:translate-x-1 inline-block">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-slate-600 hover:text-slate-800 transition-all duration-200 hover:translate-x-1 inline-block">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/accessibility" className="text-slate-600 hover:text-slate-800 transition-all duration-200 hover:translate-x-1 inline-block">
                  Accessibility
                </a>
              </li>
              <li>
                <a href="/community" className="text-slate-600 hover:text-slate-800 transition-all duration-200 hover:translate-x-1 inline-block">
                  Community Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-slate-800">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span className="text-slate-600 font-medium">info@catchtheevent.com</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="text-slate-600 font-medium">Toronto, ON</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/30 mt-12 pt-8 text-center">
          <p className="text-slate-500">
            © 2025 Catch The Event. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 