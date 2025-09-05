'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Calendar, MapPin, Clock, Users, Star, Grid, List } from 'lucide-react'
import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Newsletter from '../../components/Newsletter'

export default function FrenchHomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-slate-700 mb-2">Chargement des événements</h2>
          <p className="text-slate-500">Découverte d'événements incroyables...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Catch The Event - Plateforme Événementielle de Premier Plan | Logiciel de Gestion d'Événements | Alternative Eventbrite Canada | Hamilton, Toronto, Ontario</title>
        <meta name="title" content="Catch The Event - Plateforme Événementielle de Premier Plan | Logiciel de Gestion d'Événements | Alternative Eventbrite Canada | Hamilton, Toronto, Ontario" />
        <meta name="description" content="Plateforme événementielle de premier plan et logiciel de gestion d'événements au Canada. Alternative Eventbrite et concurrent Ticketmaster avec plateforme de billetterie à faible coût, traitement sécurisé des paiements et solutions événementielles complètes pour Hamilton, Toronto et l'Ontario." />
        <meta name="keywords" content="plateforme événementielle, logiciel de gestion d'événements, plateforme de billetterie en ligne, logiciel d'inscription aux événements, plateforme d'hébergement d'événements, solutions événementielles Canada, solutions de billetterie Canada, plateforme pour organisateur d'événements, alternative Eventbrite Canada, concurrent Ticketmaster Canada, plateforme événementielle Toronto, logiciel de billetterie Toronto, gestion d'événements Ontario, inscription en ligne événements Toronto, outils organisateur d'événements Toronto, billetterie événements locaux Toronto, solutions événementielles Ontario, entreprises de gestion d'événements Toronto, planificateurs d'événements près de moi Toronto, services de planification d'événements Toronto, plateforme de billetterie événements à faible coût Canada, logiciel de gestion d'événements pour petites entreprises Toronto, plateforme événementielle virtuelle avec fonctionnalités d'engagement des participants, outils de planification d'événements durables Ontario, inscription événements alimentée par l'IA Canada, plateforme événementielle avec paiements anticipés Canada, plateforme événementielle pour services professionnels Toronto, plateforme de billetterie avec traitement sécurisé des paiements Canada, comment choisir un logiciel de gestion d'événements pour festivals, plateforme événements corporatifs Toronto, billetterie festival de musique Ontario, inscription événements communautaires Toronto, logiciel de gestion de conférences Canada, billetterie convention horreur Ontario, inscription conférence courtepointe Canada, comment réduire les frais de billetterie événements Canada, inscription événements facile pour petites entreprises, plateforme événementielle avec analyses en temps réel, traitement sécurisé des paiements en ligne pour événements Canada" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://catchtheevent.com/fr" />
        <meta property="og:title" content="Catch The Event - Plateforme Événementielle de Premier Plan | Logiciel de Gestion d'Événements | Alternative Eventbrite Canada" />
        <meta property="og:description" content="Plateforme événementielle de premier plan et logiciel de gestion d'événements au Canada. Alternative Eventbrite et concurrent Ticketmaster avec plateforme de billetterie à faible coût." />
        <meta property="og:image" content="https://catchtheevent.com/images/logo-no-background.png" />
        <meta property="og:site_name" content="Catch The Event" />
        <meta property="og:locale" content="fr_CA" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://catchtheevent.com/fr" />
        <meta property="twitter:title" content="Catch The Event - Plateforme Événementielle de Premier Plan | Logiciel de Gestion d'Événements | Alternative Eventbrite Canada" />
        <meta property="twitter:description" content="Plateforme événementielle de premier plan et logiciel de gestion d'événements au Canada. Alternative Eventbrite et concurrent Ticketmaster avec plateforme de billetterie à faible coût." />
        <meta property="twitter:image" content="https://catchtheevent.com/images/logo-no-background.png" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Catch The Event" />
        <meta name="creator" content="Catch The Event" />
        <meta name="publisher" content="Catch The Event" />
        <meta name="language" content="French" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://catchtheevent.com/fr" />
        
        {/* Structured Data for Website in French */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Catch The Event",
              "url": "https://catchtheevent.com/fr",
              "description": "Plateforme événementielle de premier plan et logiciel de gestion d'événements au Canada",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://catchtheevent.com/fr/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Catch The Event"
              },
              "inLanguage": "fr-CA",
              "isAccessibleForFree": true
            })
          }}
        />
        
        {/* Structured Data for Organization in French */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Catch The Event",
              "alternateName": ["CTE", "catchtheevent", "catchtheevent.com", "www.catchtheevent.com", "Alternative Eventbrite Canada", "Concurrent Ticketmaster Canada"],
              "url": "https://catchtheevent.com/fr",
              "logo": {
                "@type": "ImageObject",
                "url": "https://catchtheevent.com/images/logo-no-background.png",
                "width": 512,
                "height": 512
              },
              "description": "Plateforme événementielle de premier plan et logiciel de gestion d'événements pour Hamilton, Toronto et l'Ontario. Alternative Eventbrite et concurrent Ticketmaster au Canada avec plateforme de billetterie à faible coût, traitement sécurisé des paiements et solutions événementielles complètes.",
              "foundingDate": "2025",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Bayfront Park",
                "addressLocality": "Hamilton",
                "addressRegion": "Ontario",
                "postalCode": "L8L 1C8",
                "addressCountry": "CA"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-905-XXX-XXXX",
                "contactType": "customer service",
                "email": "info@catchtheevent.com",
                "availableLanguage": "French"
              },
              "sameAs": [
                "https://www.instagram.com/catch_the_event/",
                "https://www.linkedin.com/company/catch-the-event/about/"
              ]
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
                Catch The Event
              </h1>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
                Plateforme Événementielle de Premier Plan & Logiciel de Gestion d'Événements
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                Alternative Eventbrite et concurrent Ticketmaster au Canada. Plateforme de billetterie à faible coût avec traitement sécurisé des paiements et solutions événementielles complètes.
              </p>
              
              {/* Language Switcher */}
              <div className="flex justify-center space-x-4 mb-8">
                <a href="/" className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                  English
                </a>
                <span className="px-4 py-2 bg-secondary-500 text-white rounded-lg">
                  Français
                </span>
              </div>
            </div>

            {/* Search Section */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                      <input
                        type="text"
                        placeholder="Rechercher des événements..."
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button className="bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold">
                    Rechercher
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Events Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
                Événements Vedettes
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Découvrez les meilleurs événements organisés avec notre plateforme événementielle
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Spice of India 2025 Event */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-br from-orange-400 to-red-500 p-6 text-white text-center">
                  <h3 className="text-xl font-bold mb-2">Spice of India 2025</h3>
                  <p className="text-sm opacity-90">Festival Culturel & Gastronomique</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-slate-600 text-sm mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>13-14 Septembre 2025</span>
                  </div>
                  <div className="flex items-center text-slate-600 text-sm mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>Bayfront Park, Hamilton</span>
                  </div>
                  <div className="flex items-center text-slate-600 text-sm mb-6">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>9h00 - 23h00</span>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-slate-600">
                      <span className="text-green-500 mr-2">✓</span>
                      Entrée gratuite
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <span className="text-green-500 mr-2">✓</span>
                      Bon alimentaire de 5$ inclus
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <span className="text-green-500 mr-2">✓</span>
                      Réservation de stationnement
                    </div>
                  </div>
                  <a
                    href="/spice-of-india-2025-hamilton-reserve-parking-spots"
                    className="block w-full bg-primary-500 text-white text-center py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold"
                  >
                    Réserver Maintenant
                  </a>
                </div>
              </div>

              {/* Platform Features */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-6 text-white text-center">
                  <h3 className="text-xl font-bold mb-2">Plateforme Événementielle</h3>
                  <p className="text-sm opacity-90">Solution Complète</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center text-sm text-slate-600">
                      <span className="text-blue-500 mr-2">✓</span>
                      Logiciel de gestion d'événements
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <span className="text-blue-500 mr-2">✓</span>
                      Billetterie en ligne sécurisée
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <span className="text-blue-500 mr-2">✓</span>
                      Alternative Eventbrite au Canada
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <span className="text-blue-500 mr-2">✓</span>
                      Frais de billetterie réduits
                    </div>
                  </div>
                  <a
                    href="/brand"
                    className="block w-full bg-blue-500 text-white text-center py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                  >
                    En Savoir Plus
                  </a>
                </div>
              </div>

              {/* Event Management Software */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-br from-green-400 to-teal-500 p-6 text-white text-center">
                  <h3 className="text-xl font-bold mb-2">Logiciel de Gestion</h3>
                  <p className="text-sm opacity-90">Pour Organisateurs</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center text-sm text-slate-600">
                      <span className="text-green-500 mr-2">✓</span>
                      Gestion d'événements professionnelle
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <span className="text-green-500 mr-2">✓</span>
                      Inscription en ligne automatisée
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <span className="text-green-500 mr-2">✓</span>
                      Analyses en temps réel
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <span className="text-green-500 mr-2">✓</span>
                      Support 24/7
                    </div>
                  </div>
                  <a
                    href="/about-catch-the-event"
                    className="block w-full bg-green-500 text-white text-center py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
                  >
                    Découvrir
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Benefits Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
                Pourquoi Choisir Catch The Event?
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Alternative Eventbrite et concurrent Ticketmaster au Canada avec des avantages uniques
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Frais Réduits</h3>
                <p className="text-slate-600">
                  Plateforme de billetterie à faible coût, alternative économique à Eventbrite au Canada
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Paiements Sécurisés</h3>
                <p className="text-slate-600">
                  Traitement sécurisé des paiements en ligne pour tous vos événements
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Analyses en Temps Réel</h3>
                <p className="text-slate-600">
                  Plateforme événementielle avec analyses en temps réel pour optimiser vos événements
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">IA Intégrée</h3>
                <p className="text-slate-600">
                  Inscription événements alimentée par l'IA pour une expérience optimale
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="text-4xl mb-4">🏢</div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Solutions Professionnelles</h3>
                <p className="text-slate-600">
                  Plateforme événementielle pour services professionnels et entreprises
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Développement Durable</h3>
                <p className="text-slate-600">
                  Outils de planification d'événements durables pour l'Ontario
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              Restez Informé
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Recevez les dernières nouvelles sur nos événements et fonctionnalités de plateforme
            </p>
            <Newsletter />
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
