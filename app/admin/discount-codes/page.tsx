'use client'

import { useState, useEffect } from 'react'

interface DiscountCode {
  code: string
  used: boolean
  usedBy: string | null
  usedAt: string | null
  createdAt?: string
}

interface Ambe100Usage {
  usedCount: number
  maxUsage: number
  remainingUses: number
  usageHistory: Array<{
    usedBy: string
    usedAt: string
  }>
}

interface DiscountData {
  total: number
  unused: number
  used: number
  ambe100: Ambe100Usage
  codes: DiscountCode[]
}

export default function DiscountCodesAdmin() {
  const [data, setData] = useState<DiscountData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadDiscountCodes = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/discount-codes')
      if (!response.ok) {
        throw new Error('Failed to load discount codes')
      }
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError('Failed to load discount codes')
      console.error('Error loading discount codes:', err)
    } finally {
      setLoading(false)
    }
  }

  const regenerateCodes = async () => {
    if (!confirm('Are you sure you want to regenerate all discount codes? This will delete all existing codes and create new ones.')) {
      return
    }

    try {
      setLoading(true)
      const response = await fetch('/api/discount-codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'regenerate'
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to regenerate discount codes')
      }

      // Reload the codes after regeneration
      await loadDiscountCodes()
    } catch (err) {
      setError('Failed to regenerate discount codes')
      console.error('Error regenerating discount codes:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDiscountCodes()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading discount codes...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">No data available</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Discount Codes Admin</h1>

          {/* AMBE100 Special Code Section */}
          <div className="mb-8 p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
            <h2 className="text-2xl font-bold mb-4">Special Code: AMBE100</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                <div className="text-sm font-medium">Total Usage</div>
                <div className="text-2xl font-bold">{data.ambe100.usedCount}</div>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                <div className="text-sm font-medium">Max Usage</div>
                <div className="text-2xl font-bold">{data.ambe100.maxUsage}</div>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                <div className="text-sm font-medium">Remaining Uses</div>
                <div className="text-2xl font-bold">{data.ambe100.remainingUses}</div>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                <div className="text-sm font-medium">Status</div>
                <div className="text-2xl font-bold">
                  {data.ambe100.remainingUses > 0 ? 'Active' : 'Exhausted'}
                </div>
              </div>
            </div>
            
            {/* AMBE100 Usage History */}
            {data.ambe100.usageHistory.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Usage History</h3>
                <div className="bg-white bg-opacity-10 rounded-lg p-4 max-h-40 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white border-opacity-30">
                        <th className="text-left py-2">User Email</th>
                        <th className="text-left py-2">Used At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.ambe100.usageHistory.map((usage, index) => (
                        <tr key={index} className="border-b border-white border-opacity-20">
                          <td className="py-2">{usage.usedBy}</td>
                          <td className="py-2">{new Date(usage.usedAt).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Regular Discount Codes Statistics */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Regular Discount Codes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-100 p-4 rounded-lg">
                <div className="text-sm font-medium text-blue-600">Total Codes</div>
                <div className="text-2xl font-bold text-blue-900">{data.total}</div>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <div className="text-sm font-medium text-green-600">Available</div>
                <div className="text-2xl font-bold text-green-900">{data.unused}</div>
              </div>
              <div className="bg-red-100 p-4 rounded-lg">
                <div className="text-sm font-medium text-red-600">Used</div>
                <div className="text-2xl font-bold text-red-900">{data.used}</div>
              </div>
            </div>
          </div>

          {/* Available Codes */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Available Codes</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {data.codes.slice(0, 24).map((code, index) => (
                <div key={index} className="bg-green-50 border border-green-200 p-3 rounded-lg text-center">
                  <div className="font-mono text-sm font-bold text-green-800">{code.code}</div>
                </div>
              ))}
              {data.codes.length > 24 && (
                <div className="col-span-full text-center text-gray-500 mt-4">
                  ... and {data.codes.length - 24} more codes
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 text-center space-x-4">
            <button
              onClick={loadDiscountCodes}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh Data
            </button>
            <button
              onClick={regenerateCodes}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Regenerate All Codes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
