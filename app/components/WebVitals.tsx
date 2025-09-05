'use client'

import { useEffect } from 'react'

export default function WebVitals() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Web Vitals measurement
    const measureWebVitals = async () => {
      try {
                        // Import web-vitals library dynamically
                const { onCLS, onFCP, onINP, onLCP, onTTFB } = await import('web-vitals')

                // Measure Core Web Vitals
                onCLS(console.log)
                onFCP(console.log)
                onINP(console.log)
                onLCP(console.log)
                onTTFB(console.log)

        // Custom performance monitoring
        if ('PerformanceObserver' in window) {
          // Monitor Largest Contentful Paint
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1]
            console.log('LCP:', lastEntry.startTime)
            
            // Send to analytics if LCP is poor
            if (lastEntry.startTime > 2500) {
              console.warn('Poor LCP detected:', lastEntry.startTime)
            }
          })
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

                                // Monitor Interaction to Next Paint (INP) - replaces FID in newer metrics
                      const inpObserver = new PerformanceObserver((list) => {
                        const entries = list.getEntries()
                        entries.forEach((entry: any) => {
                          console.log('INP:', entry.value)
                          
                          // Send to analytics if INP is poor
                          if (entry.value > 200) {
                            console.warn('Poor INP detected:', entry.value)
                          }
                        })
                      })
                      inpObserver.observe({ entryTypes: ['interaction'] })

          // Monitor Cumulative Layout Shift
          const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0
            const entries = list.getEntries()
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value
              }
            })
            console.log('CLS:', clsValue)
            
            // Send to analytics if CLS is poor
            if (clsValue > 0.1) {
              console.warn('Poor CLS detected:', clsValue)
            }
          })
          clsObserver.observe({ entryTypes: ['layout-shift'] })
        }

        // Monitor page load performance
        window.addEventListener('load', () => {
          setTimeout(() => {
                                    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
                        if (navigation) {
                          const metrics = {
                            // DNS lookup time
                            dns: navigation.domainLookupEnd - navigation.domainLookupStart,
                            // TCP connection time
                            tcp: navigation.connectEnd - navigation.connectStart,
                            // Time to first byte
                            ttfb: navigation.responseStart - navigation.requestStart,
                            // DOM content loaded
                            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
                            // Page load complete
                            loadComplete: navigation.loadEventEnd - navigation.fetchStart,
                            // Total page load time
                            total: navigation.loadEventEnd - navigation.fetchStart
                          }

              console.log('Performance Metrics:', metrics)

              // Send poor performance metrics to analytics
              if (metrics.total > 3000) {
                console.warn('Slow page load detected:', metrics.total)
              }
              if (metrics.ttfb > 600) {
                console.warn('Slow TTFB detected:', metrics.ttfb)
              }
            }
          }, 0)
        })

        // Monitor resource loading
        const resourceObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            if (entry.initiatorType === 'img' || entry.initiatorType === 'script' || entry.initiatorType === 'css') {
              if (entry.duration > 1000) {
                console.warn('Slow resource load:', entry.name, entry.duration)
              }
            }
          })
        })
        resourceObserver.observe({ entryTypes: ['resource'] })

      } catch (error) {
        console.warn('Web Vitals measurement failed:', error)
      }
    }

    // Initialize web vitals measurement
    measureWebVitals()

    // Cleanup function
    return () => {
      // Cleanup observers if needed
    }
  }, [])

  return null // This component doesn't render anything
} 