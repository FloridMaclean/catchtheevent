'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, CreditCard, CheckCircle, AlertCircle, Calendar, Clock, MapPin } from 'lucide-react'
import CheckoutForm from './CheckoutForm'

interface TicketType {
  id: string
  name: string
  price: number
  description: string
  available: number
  benefits: string[]
}

interface TicketSelectorProps {
  onClose: () => void
  eventDetails: any
}

export default function TicketSelector({ onClose, eventDetails }: TicketSelectorProps) {
  const [selectedTickets, setSelectedTickets] = useState<{ [key: string]: number }>({})
  const [currentStep, setCurrentStep] = useState<'selection' | 'checkout'>('selection')
  const [isProcessing, setIsProcessing] = useState(false)
  const [discountCode, setDiscountCode] = useState('')
  const [isDiscountApplied, setIsDiscountApplied] = useState(false)
  const [discountError, setDiscountError] = useState('')
  const [isSpecialDiscount, setIsSpecialDiscount] = useState(false)

  const ticketTypes: TicketType[] = [
    {
      id: 'exclusive-pass',
      name: 'Catch The Event Exclusive Rangtaali Garba Pass',
      price: 20.00,
      description: 'Exclusive admission to the Garba event with special benefits',
      available: 1000,
      benefits: [
        'Exclusive event access',
        'Special Garba experience',
        'Priority entry',
        'Event memorabilia'
      ]
    }
  ]

  const getTotalTickets = () => {
    return Object.values(selectedTickets).reduce((sum, count) => sum + count, 0)
  }

  const getTicketPrice = (ticketId: string) => {
    const ticket = ticketTypes.find(t => t.id === ticketId)
    // Return 0 if discount is applied, otherwise return original price
    return ticket && isDiscountApplied ? 0 : (ticket ? ticket.price : 0)
  }

  const getSubtotal = () => {
    return Object.entries(selectedTickets).reduce((total, [ticketId, count]) => {
      return total + (getTicketPrice(ticketId) * count)
    }, 0)
  }

  const getConvenienceFee = () => {
    // No fees when discount is applied
    return isDiscountApplied ? 0 : getTotalTickets() * 1.00 // $1.00 per ticket
  }

  const getProcessingFee = () => {
    // No fees when discount is applied
    return isDiscountApplied ? 0 : getTotalTickets() * 1.10 // $1.10 per ticket
  }

  const getHST = () => {
    const subtotal = getSubtotal()
    const convenienceFee = getConvenienceFee()
    const processingFee = getProcessingFee()
    // No HST when discount is applied
    return isDiscountApplied ? 0 : (subtotal + convenienceFee + processingFee) * 0.13 // 13% HST
  }

  const getTotalAmount = () => {
    const subtotal = getSubtotal()
    const convenienceFee = getConvenienceFee()
    const processingFee = getProcessingFee()
    const hst = getHST()
    return subtotal + convenienceFee + processingFee + hst
  }

  const handleTicketChange = (ticketId: string, change: number) => {
    const currentCount = selectedTickets[ticketId] || 0
    const newCount = Math.max(0, currentCount + change)
    
    // If discount is applied and this is a regular discount code (not special), limit to 1 ticket
    if (isDiscountApplied && !isSpecialDiscount && newCount > 1) {
      setDiscountError('Regular discount codes can only be used for 1 ticket. Please remove the discount code to buy multiple tickets.')
      return
    }
    
    // Clear any previous error when user reduces quantity
    if (newCount <= 1) {
      setDiscountError('')
    }
    
    if (newCount === 0) {
      const { [ticketId]: removed, ...rest } = selectedTickets
      setSelectedTickets(rest)
    } else {
      setSelectedTickets(prev => ({
        ...prev,
        [ticketId]: newCount
      }))
    }
  }

  const validateDiscountCode = async (code: string, ticketQuantity: number = 1) => {
    try {
      const response = await fetch('/api/validate-discount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          ticketQuantity: ticketQuantity
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to validate discount code')
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Error validating discount code:', error)
      return { valid: false, message: 'Failed to validate discount code' }
    }
  }

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      setDiscountError('Please enter a discount code')
      return
    }

    setDiscountError('')
    
    // Get current total tickets for validation
    const totalTickets = getTotalTickets()
    
    const result = await validateDiscountCode(discountCode, totalTickets)
    
    if (result.valid) {
      setIsDiscountApplied(true)
      setDiscountError('')
      // Set special discount flag
      setIsSpecialDiscount(discountCode === 'AMBE100')
      // For regular discount codes, ensure only 1 ticket is selected
      if (result.discountCode?.maxTickets === 1 && totalTickets > 1) {
        setSelectedTickets({ 'exclusive-pass': 1 })
      }
    } else {
      setDiscountError(result.message || 'Invalid discount code')
      setIsDiscountApplied(false)
      setIsSpecialDiscount(false)
    }
  }

  const handleRemoveDiscount = () => {
    setIsDiscountApplied(false)
    setDiscountCode('')
    setDiscountError('')
    setIsSpecialDiscount(false)
    setSelectedTickets({})
  }

  const handleProceedToCheckout = () => {
    // Proceed to checkout validation
    
    // Validate ticket quantity for regular discount codes
    if (isDiscountApplied && !isSpecialDiscount && getTotalTickets() > 1) {
      setDiscountError('Regular discount codes can only be used for 1 ticket. Please reduce the quantity or remove the discount code.')
      return
    }
    
    if (getTotalTickets() > 0) {
      setCurrentStep('checkout')
    } else {
      // No tickets selected
    }
  }

  const handleBackToSelection = () => {
    setCurrentStep('selection')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto modal-container" suppressHydrationWarning>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] flex flex-col my-2 mx-auto"
      >
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-3 flex-1 justify-center">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900">Select Your Tickets</h2>
              <p className="text-sm text-gray-600">Rangtaali Hamilton 2025</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close ticket selector"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 flex">
          {currentStep === 'selection' ? (
            <div className="p-4 flex flex-col items-center w-full max-w-2xl">
              {/* Event Details */}
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 mb-6 w-full">
                <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">Event Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-pink-500 mr-2" />
                    <span className="text-sm text-gray-700">{eventDetails.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-pink-500 mr-2" />
                    <span className="text-sm text-gray-700">{eventDetails.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-pink-500 mr-2" />
                    <span className="text-sm text-gray-700">{eventDetails.venue}</span>
                  </div>
                </div>
              </div>

              {/* Discount Code Section */}
              <div className="w-full mb-6">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">Have a Discount Code?</h3>
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Enter discount code"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      disabled={isDiscountApplied}
                    />
                    {!isDiscountApplied ? (
                      <button
                        onClick={handleApplyDiscount}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                      >
                        Apply
                      </button>
                    ) : (
                      <button
                        onClick={handleRemoveDiscount}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {discountError && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700 text-sm text-center font-medium flex items-center justify-center">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        {discountError}
                      </p>
                    </div>
                  )}
                  {isDiscountApplied && (
                    <div className="mt-3 p-3 bg-green-100 rounded-lg">
                      <p className="text-green-800 text-sm text-center font-semibold">
                        ✅ Discount applied! Your ticket is now FREE!
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Ticket Types */}
              <div className="space-y-4 w-full">
                {ticketTypes.map((ticket) => (
                  <div key={ticket.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-4">
                      <div className="flex-1">
                        <h4 className="text-base font-semibold text-gray-900 mb-2">{ticket.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
                        <div className="text-xl font-bold text-pink-600">${ticket.price.toFixed(2)}</div>
                      </div>
                      <div className="flex-shrink-0 self-center sm:self-start">
                        <div className="flex flex-col items-center space-y-1">
                          <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
                            <button
                              onClick={() => handleTicketChange(ticket.id, -1)}
                              disabled={(selectedTickets[ticket.id] || 0) === 0}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              aria-label="Decrease ticket quantity"
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="w-12 text-center font-bold text-lg text-gray-900 bg-gray-50 rounded px-2 py-1 min-w-0">
                              {selectedTickets[ticket.id] || 0}
                            </span>
                            <button
                              onClick={() => handleTicketChange(ticket.id, 1)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                              aria-label="Increase ticket quantity"
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                          {/* Show limit warning for regular discount codes */}
                          {isDiscountApplied && !isSpecialDiscount && (
                            <div className="text-xs text-orange-600 font-medium">
                              Max 1 ticket with regular discount code
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Benefits */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h5 className="font-semibold text-gray-900 mb-2 text-sm">Included Benefits:</h5>
                      <ul className="space-y-1">
                        {ticket.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center text-xs text-gray-700">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              {getTotalTickets() > 0 && (
                <div className="mt-6 bg-gray-50 rounded-xl p-4 w-full">
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Order Summary</h3>
                  <div className="space-y-2">
                    {Object.entries(selectedTickets).map(([ticketId, count]) => {
                      const ticket = ticketTypes.find(t => t.id === ticketId)
                      return (
                        <div key={ticketId} className="flex justify-between text-sm">
                          <span className="text-gray-700">{ticket?.name} x {count}</span>
                          <span className="font-semibold">${(ticket?.price || 0) * count}</span>
                        </div>
                      )
                    })}
                    
                    {/* Price Breakdown */}
                    <div className="border-t border-gray-200 pt-2 mt-3 space-y-1">
                      {isDiscountApplied && (
                        <div className="flex justify-between text-xs">
                          <span className="text-green-600 font-semibold">Discount Applied:</span>
                          <span className="text-green-600 font-semibold">-${(20.00).toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="text-gray-900">${getSubtotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Convenience Fee:</span>
                        <span className="text-gray-900">${getConvenienceFee().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Payment Processing:</span>
                        <span className="text-gray-900">${getProcessingFee().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">HST (13%):</span>
                        <span className="text-gray-900">${getHST().toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between text-base font-bold">
                        <span>Total</span>
                        <span>${getTotalAmount().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <CheckoutForm
              selectedTickets={selectedTickets}
              ticketTypes={ticketTypes}
              totalPrice={getTotalAmount()}
              eventDetails={eventDetails}
              onBack={handleBackToSelection}
              onSuccess={() => {
                onClose()
              }}
              onClose={onClose}
              isDiscountApplied={isDiscountApplied}
              discountCode={discountCode}
            />
          )}
        </div>

        {/* Footer - Fixed */}
        {currentStep === 'selection' && (
          <div className="border-t border-gray-200 p-4 flex-shrink-0 bg-white modal-footer">
            <div className="flex items-center justify-between w-full max-w-2xl mx-auto">
              <div className="text-sm text-gray-600">
                {getTotalTickets()} ticket{getTotalTickets() !== 1 ? 's' : ''} selected
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProceedToCheckout}
                  disabled={getTotalTickets() === 0}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
} 