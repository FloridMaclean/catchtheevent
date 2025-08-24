'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error occurred:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="mb-8">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-12 h-12 text-red-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Critical Error</h1>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Application Error</h2>
              <p className="text-gray-600 mb-6">
                We're experiencing technical difficulties. Please try refreshing the page or contact our support team.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={reset}
                className="w-full bg-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Refresh Page
              </button>
              
              <Link
                href="/"
                className="w-full bg-white text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
              >
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Link>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-2">Error Details:</p>
              <p className="text-xs text-gray-400 font-mono break-all">
                {error.message || 'Unknown error occurred'}
              </p>
              {error.digest && (
                <p className="text-xs text-gray-400 font-mono mt-1">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            <div className="mt-8 text-sm text-gray-500">
              <p>Need help? Contact us at:</p>
              <a 
                href="mailto:info@catchtheevent.com"
                className="text-red-600 hover:text-red-700 font-medium"
              >
                info@catchtheevent.com
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
