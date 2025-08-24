'use client'

import { useEffect } from 'react'
import { onCLS, onFCP, onLCP, onTTFB } from 'web-vitals'

export default function WebVitals() {
  useEffect(() => {
    // Function to send metrics to analytics
    function sendToAnalytics(metric: any) {
      // Log to console for development
      console.log('Web Vital:', metric.name, metric.value)
      
      // Send to your analytics service
      // Example: gtag('event', metric.name, {
      //   event_category: 'Web Vitals',
      //   event_label: metric.id,
      //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      //   non_interaction: true,
      // })
      
      // You can also send to your own API
      // fetch('/api/analytics/web-vitals', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(metric)
      // })
    }

    // Measure Core Web Vitals
    onCLS(sendToAnalytics)
    onFCP(sendToAnalytics)
    onLCP(sendToAnalytics)
    onTTFB(sendToAnalytics)

    // Additional performance monitoring
    if (typeof window !== 'undefined') {
      // Monitor page load time
      window.addEventListener('load', () => {
        const loadTime = performance.now()
        console.log('Page Load Time:', loadTime)
        
        // Send load time to analytics
        // sendToAnalytics({
        //   name: 'PageLoadTime',
        //   value: loadTime,
        //   id: 'page-load'
        // })
      })

      // Monitor memory usage (if available)
      if ('memory' in performance) {
        const memory = (performance as any).memory
        console.log('Memory Usage:', {
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
          limit: memory.jsHeapSizeLimit
        })
      }

      // Monitor network information (if available)
      if ('connection' in navigator) {
        const connection = (navigator as any).connection
        console.log('Network Info:', {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt
        })
      }
    }
  }, [])

  return null
} 