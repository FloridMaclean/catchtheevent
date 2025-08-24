'use client'

import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="glass-effect border-t border-white/30">
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
              <a href="#" className="text-slate-500 hover:text-slate-800 transition-all duration-300 hover:scale-110">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-slate-500 hover:text-slate-800 transition-all duration-300 hover:scale-110">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-slate-500 hover:text-slate-800 transition-all duration-300 hover:scale-110">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-slate-500 hover:text-slate-800 transition-all duration-300 hover:scale-110">
                <Youtube className="w-6 h-6" />
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