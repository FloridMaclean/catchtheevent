'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Render a simple loading state during SSR to prevent hydration mismatches
  if (!isClient) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-slate-200">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="h-12 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="md:hidden">
              <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-slate-200" suppressHydrationWarning>
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <a href="/" className="hover:opacity-80 transition-all duration-300 hover:scale-105">
              <img 
                src="/images/logo-no-background.png" 
                alt="Catch The Event Logo" 
                className="h-12 w-auto"
              />
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/about" className="btn-ghost">
              About Us
            </a>
            <a href="/contact" className="btn-ghost">
              Contact
            </a>
            <a href="/" className="btn-primary">
              Browse Events
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn-ghost p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-slate-200 bg-white"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              <a
                href="/about"
                className="block px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </a>
              <a
                href="/contact"
                className="block px-4 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <a
                href="/"
                className="w-full mt-4 btn-primary block text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Events
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
} 