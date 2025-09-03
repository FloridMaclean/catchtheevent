'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the Spice of India 2025 event page
    router.push('/spice-of-india-2025-hamilton-reserve-parking-spots')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-slate-700 mb-2">Redirecting to Spice of India 2025</h2>
        <p className="text-slate-500">Taking you to the event page...</p>
      </div>
    </div>
  )
} 