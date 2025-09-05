'use client'

import { useEffect } from 'react'

export default function ServiceWorker() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Check if service workers are supported
    if ('serviceWorker' in navigator) {
      const registerServiceWorker = async () => {
        try {
          // Register service worker
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
          })

          console.log('Service Worker registered successfully:', registration)

          // Handle service worker updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker available
                  console.log('New service worker available')
                  
                  // Show update notification to user
                  if (confirm('A new version is available. Would you like to update?')) {
                    newWorker.postMessage({ type: 'SKIP_WAITING' })
                    window.location.reload()
                  }
                }
              })
            }
          })

          // Handle service worker state changes
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('Service Worker controller changed')
          })

          // Handle service worker messages
          navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'RELOAD_PAGE') {
              window.location.reload()
            }
          })

        } catch (error) {
          console.error('Service Worker registration failed:', error)
        }
      }

      // Register service worker
      registerServiceWorker()

      // Handle offline/online events
      window.addEventListener('online', () => {
        console.log('Application is online')
        // Update UI to show online status
        document.body.classList.remove('offline')
        document.body.classList.add('online')
      })

      window.addEventListener('offline', () => {
        console.log('Application is offline')
        // Update UI to show offline status
        document.body.classList.remove('online')
        document.body.classList.add('offline')
      })

      // Check initial online status
      if (!navigator.onLine) {
        document.body.classList.add('offline')
      } else {
        document.body.classList.add('online')
      }
    }

    // Install prompt for PWA
    let deferredPrompt: any
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later
      deferredPrompt = e
      
      // Show install button or notification
      console.log('PWA install prompt available')
      
      // You can show a custom install button here
      // showInstallPromotion()
    })

    // Handle successful PWA installation
    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed')
      // Hide the install promotion
      // hideInstallPromotion()
      
      // Clear the deferredPrompt
      deferredPrompt = null
      
      // Optionally, send analytics event
      // gtag('event', 'pwa_install')
    })

    // Cleanup function
    return () => {
      // Remove event listeners if needed
      window.removeEventListener('online', () => {})
      window.removeEventListener('offline', () => {})
    }
  }, [])

  return null // This component doesn't render anything
} 