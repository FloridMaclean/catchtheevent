'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Something went wrong!</h2>
          <p className="text-slate-600 mb-4">
            We're sorry, but there was an error loading the page. Please try again.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={reset}
            className="btn-primary w-full"
          >
            Try again
          </button>
          
          <a
            href="/"
            className="btn-secondary w-full block"
          >
            Go back home
          </a>
        </div>
        
        <div className="mt-8 text-sm text-slate-500">
          <p>If the problem persists, please contact us at:</p>
          <a 
            href="mailto:info@catchtheevent.com"
            className="text-primary-600 hover:text-primary-700"
          >
            info@catchtheevent.com
          </a>
        </div>
      </div>
    </div>
  )
} 