'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Calendar, MapPin, Clock, Users, Star, Grid, List } from 'lucide-react'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Newsletter from '../components/Newsletter'

interface Event {
  id: string
  title: string
  subtitle: string
  date: string
  time: string
  venue: string
  location: string
  price: string
  category: string
  featured: boolean
  attendees: number
  rating: number
  description: string
  url: string
  image?: string
}

function HomeContent() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [isClient, setIsClient] = useState(true)
  const [mounted, setMounted] = useState(true)

  // Sample events data
  const events: Event[] = [
    {
      id: 'spice-of-india-2025',
      title: 'Spice of India 2025',
      subtitle: 'Hamilton\'s Premier Indian Cultural Festival',
      date: 'September 13-14, 2025',
      time: '3:00 PM onwards',
      venue: 'Bayfront Park',
      location: 'Hamilton, ON',
      price: 'FREE Entry + $5 Food Voucher',
      category: 'cultural',
      featured: true,
      attendees: 30000,
      rating: 4.9,
      description: 'Join us for Hamilton\'s most vibrant Indian cultural festival featuring live music, dance performances, DJs, food vendors, open-air Garba, shopping, and much more!',
      url: '/spice-of-india-2025-hamilton-reserve-parking-spots',
      image: '/images/SPICE OF INDIA 2025 Hamilton, ON 13-14 September.png'
    }
  ]

  // Ensure client-side rendering and prevent hydration issues
  useEffect(() => {
    setIsClient(true)
    setMounted(true)
  }, [])


  const categories = [
    { id: 'all', name: 'All Events', icon: '🎉' },
    { id: 'cultural', name: 'Cultural', icon: '🎭' },
    { id: 'music', name: 'Music', icon: '🎵' },
    { id: 'food', name: 'Food & Drink', icon: '🍽️' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'family', name: 'Family', icon: '👨‍👩‍👧‍👦' }
  ]

  useEffect(() => {
    let filtered = events

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory)
    }

    setFilteredEvents(filtered)
  }, [events, searchQuery, selectedCategory])

  const handleEventClick = (eventUrl: string) => {
    router.push(eventUrl)
  }

  // Show loading state during hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-slate-700 mb-2">Loading Events</h2>
          <p className="text-slate-500">Discovering amazing events...</p>
        </div>
      </div>
    )
  }

  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Header */}
        <Header />
        
        {/* Hero Section */}
        <section className="pt-32 pb-12 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
                Premier Event Platform & Event Management Software
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                Leading Eventbrite alternative and Ticketmaster competitor in Canada. Low fee event ticketing platform with secure payment processing and comprehensive event solutions.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for events, venues, or categories..."
                    value={mounted ? searchQuery : ''}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
                    disabled={!mounted}
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary px-6 py-2">
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="mb-8">
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      mounted && selectedCategory === category.id
                        ? 'btn-primary'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-primary-300 hover:shadow-md'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <h3 className="text-xl font-semibold text-slate-800">
                  {filteredEvents.length} Event{filteredEvents.length !== 1 ? 's' : ''} Found
                </h3>
                {searchQuery && (
                  <span className="text-sm text-slate-500">
                    for "{searchQuery}"
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    mounted && viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    mounted && viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Events Grid/List */}
            {filteredEvents.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => handleEventClick(event.url)}
                    className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    {/* Event Image */}
                    <div className={`relative ${viewMode === 'list' ? 'w-64 h-48 flex-shrink-0' : 'h-48'} overflow-hidden`}>
                      {event.image ? (
                        <Image
                          src={event.image}
                          alt={`${event.title} - ${event.subtitle}`}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                          sizes={viewMode === 'list' ? '256px' : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="text-4xl mb-2">🎉</div>
                            <div className="text-sm font-medium">Event Image</div>
                          </div>
                        </div>
                      )}
                      {event.featured && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Featured
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      </div>
                    </div>
                    
                    {/* Event Details */}
                    <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-slate-800 mb-1 line-clamp-1">
                            {event.title}
                          </h4>
                          <p className="text-slate-600 text-sm mb-2 line-clamp-2">
                            {event.subtitle}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1 ml-4">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-slate-700">{event.rating}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-slate-600">
                          <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-sm text-slate-600">
                          <Clock className="w-4 h-4 mr-2 text-primary-500" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-slate-600">
                          <MapPin className="w-4 h-4 mr-2 text-primary-500" />
                          <span>{event.venue}, {event.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-slate-600">
                          <Users className="w-4 h-4 mr-2 text-primary-500" />
                          <span>{event.attendees.toLocaleString()} attendees</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-green-600">
                          {event.price}
                        </div>
                        <button className="btn-primary px-6 py-2 text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">No events found</h3>
                <p className="text-slate-600 mb-6">
                  {searchQuery 
                    ? `No events match your search for "${searchQuery}"`
                    : 'No events available in this category'
                  }
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                  }}
                  className="btn-primary px-6 py-3"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Subscription */}
        <Newsletter />

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}

export default function Home() {
  return (
    <div>
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-slate-700 mb-2">Loading Events</h2>
            <p className="text-slate-500">Discovering amazing events...</p>
          </div>
        </div>
      }>
        <HomeContent />
      </Suspense>
    </div>
  )
}
