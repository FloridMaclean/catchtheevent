'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  DollarSign, 
  Ticket, 
  TrendingUp, 
  Calendar,
  Phone,
  Mail,
  User,
  LogOut,
  RefreshCw,
  Download
} from 'lucide-react'

interface TicketPurchase {
  id: string
  user_id: string
  event_name: string
  ticket_type: string
  quantity: number
  total_amount: number
  payment_status: string
  discount_code: string | null
  purchase_date: string
  created_at: string
  users: {
    first_name: string
    last_name: string
    email: string
    phone_number: string | null
  }
}

interface SalesStats {
  totalTickets: number
  totalRevenue: number
  totalPurchases: number
  averageTicketPrice: number
  discountedTickets: number
  regularTickets: number
}

export default function TicketSalesPage() {
  const [purchases, setPurchases] = useState<TicketPurchase[]>([])
  const [stats, setStats] = useState<SalesStats>({
    totalTickets: 0,
    totalRevenue: 0,
    totalPurchases: 0,
    averageTicketPrice: 0,
    discountedTickets: 0,
    regularTickets: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'discounted' | 'regular'>('all')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    fetchTicketSales()
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchTicketSales()
    }, 30000) // 30 seconds
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval)
  }, [])

  const fetchTicketSales = async () => {
    try {
      setLoading(true)
      setError('')
      
      const response = await fetch('/api/ticket-sales', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch ticket sales data')
      }

      const data = await response.json()
      setPurchases(data.purchases || [])
      setStats(data.stats || {
        totalTickets: 0,
        totalRevenue: 0,
        totalPurchases: 0,
        averageTicketPrice: 0,
        discountedTickets: 0,
        regularTickets: 0
      })
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error fetching ticket sales:', error)
      setError('Failed to load ticket sales data')
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    fetchTicketSales()
  }

  const handleLogout = () => {
    // Clear admin session
    document.cookie = 'admin-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    window.location.href = '/admin/login'
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const calculateRevenueWithTax = (totalAmount: number) => {
    // Calculate the original ticket price (without fees and tax)
    // Assuming the total_amount includes all fees and taxes
    // For display purposes, we'll show the total amount as revenue
    return totalAmount
  }

  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = 
      purchase.users.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.users.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.users.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (purchase.users.phone_number && purchase.users.phone_number.includes(searchTerm))
    
    const matchesFilter = 
      filterType === 'all' ||
      (filterType === 'discounted' && purchase.discount_code) ||
      (filterType === 'regular' && !purchase.discount_code)
    
    return matchesSearch && matchesFilter
  })

  const exportToCSV = () => {
    const headers = [
      'Purchase Date',
      'First Name',
      'Last Name',
      'Email',
      'Phone',
      'Ticket Type',
      'Quantity',
      'Total Amount',
      'Revenue (with Tax)',
      'Payment Status',
      'Discount Code'
    ]

    const csvData = filteredPurchases.map(purchase => [
      formatDate(purchase.purchase_date),
      purchase.users.first_name,
      purchase.users.last_name,
      purchase.users.email,
      purchase.users.phone_number || '',
      purchase.ticket_type,
      purchase.quantity,
      formatCurrency(purchase.total_amount),
      formatCurrency(calculateRevenueWithTax(purchase.total_amount)),
      purchase.payment_status,
      purchase.discount_code || ''
    ])

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ticket-sales-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading ticket sales data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Ticket className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Ticket Sales Dashboard</h1>
                <p className="text-sm text-gray-600">Rangtaali Hamilton 2025</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/admin/discount-codes"
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <span>Discount Codes</span>
              </a>
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Last Updated Indicator */}
        {lastUpdated && (
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
            <p className="text-xs text-gray-500">
              Auto-refreshes every 30 seconds
            </p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border p-6"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Ticket className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTickets}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border p-6"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border p-6"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Purchases</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPurchases}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border p-6"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Ticket Price</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.averageTicketPrice)}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as 'all' | 'discounted' | 'regular')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Tickets</option>
                <option value="discounted">Discounted Tickets</option>
                <option value="regular">Regular Tickets</option>
              </select>
            </div>
          </div>
        </div>

        {/* Ticket Sales Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Ticket Purchases ({filteredPurchases.length})</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Purchase Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPurchases.map((purchase) => (
                  <motion.tr
                    key={purchase.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {purchase.users.first_name} {purchase.users.last_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-900">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          {purchase.users.email}
                        </div>
                        {purchase.users.phone_number && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                            {purchase.users.phone_number}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-900">
                          <span className="font-medium">{purchase.quantity}</span> × {purchase.ticket_type}
                        </div>
                        {purchase.discount_code && (
                          <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full inline-block">
                            Discount: {purchase.discount_code}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">
                        {formatCurrency(calculateRevenueWithTax(purchase.total_amount))}
                      </div>
                      <div className="text-xs text-gray-500">
                        Base: {formatCurrency(purchase.total_amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {formatDate(purchase.purchase_date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        purchase.payment_status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {purchase.payment_status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPurchases.length === 0 && (
            <div className="text-center py-12">
              <Ticket className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No ticket purchases found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
