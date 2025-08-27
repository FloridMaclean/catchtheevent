'use client'

import { useState, useEffect } from 'react'

interface DiscountCode {
  code: string
  used: boolean
  usedBy: string | null
  usedAt: string | null
  usageLimit?: number | null
  usageCount?: number | null
}

interface DiscountCodesData {
  total: number
  unused: number
  used: number
  codes: DiscountCode[]
}

export default function DiscountCodesAdmin() {
  const [data, setData] = useState<DiscountCodesData | null>(null)
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading discount codes...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadDiscountCodes}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">No data available</p>
      </div>
    )
  }

  const unusedCodes = data.codes.filter(c => !c.used)
  const usedCodes = data.codes.filter(c => c.used)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Discount Codes Management</h1>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900">Total Codes</h3>
              <p className="text-3xl font-bold text-blue-600">{data.total}</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900">Available</h3>
              <p className="text-3xl font-bold text-green-600">{data.unused}</p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-red-900">Used</h3>
              <p className="text-3xl font-bold text-red-600">{data.used}</p>
            </div>
          </div>

          {/* Available Codes */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Codes ({unusedCodes.length})</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {unusedCodes.map((code) => (
                  <div
                    key={code.code}
                    className="bg-white p-3 rounded border text-center font-mono text-sm"
                  >
                    <div>{code.code}</div>
                    {code.usageLimit && (
                      <div className="text-xs text-gray-500 mt-1">
                        {code.usageCount || 0}/{code.usageLimit} used
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Used Codes */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Used Codes ({usedCodes.length})</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Used By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Used At
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {usedCodes.map((code) => (
                    <tr key={code.code}>
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-900">
                        {code.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {code.usedBy || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {code.usedAt ? new Date(code.usedAt).toLocaleString() : 'Unknown'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
