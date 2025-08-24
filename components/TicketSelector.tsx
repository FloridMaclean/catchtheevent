'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, CreditCard, CheckCircle, AlertCircle } from 'lucide-react'
import CheckoutForm from './CheckoutForm'

interface TicketType {
  id: string
  name: string
  price: number
  description: string
  available: number
  benefits?: string[]
}

interface TicketSelectorProps {
  onClose: () => void
  eventDetails: any
}

export default function TicketSelector({ onClose, eventDetails }: TicketSelectorProps) {
  const [selectedTickets, setSelectedTickets] = useState<{ [key: string]: number }>({})
  const [currentStep, setCurrentStep] = useState<'selection' | 'checkout'>('selection')
  const [isProcessing, setIsProcessing] = useState(false)

  const ticketTypes: TicketType[] = [
    {
      id: 'regular',
      name: 'Regular Ticket',
      price: 34.99,
      description: 'Standard admission to the Garba event',
      available: 1000
    }
  ]



  const getTotalTickets = () => {
    return Object.values(selectedTickets).reduce((sum, count) => sum + count, 0)
  }

  const getTicketPrice = () => {
    const totalTickets = getTotalTickets()
    if (totalTickets >= 10) {
      return 28.00 // Group of 10+ tickets
    } else if (totalTickets >= 5) {
      return 30.00 // Group of 5+ tickets
    } else {
      return 34.99 // Regular ticket price
    }
  }

  const getSubtotal = () => {
    const totalTickets = getTotalTickets()
    const pricePerTicket = getTicketPrice()
    return totalTickets * pricePerTicket
  }

  const getConvenienceFee = () => {
    const totalTickets = getTotalTickets()
    return totalTickets * 1.00 // $1.00 per ticket
  }

  const getProcessingFee = () => {
    const totalTickets = getTotalTickets()
    return totalTickets * 1.10 // $1.10 per ticket
  }

  const getHST = () => {
    const subtotal = getSubtotal()
    const convenienceFee = getConvenienceFee()
    const processingFee = getProcessingFee()
    return (subtotal + convenienceFee + processingFee) * 0.13 // 13% HST
  }

  const getTotalPrice = () => {
    const subtotal = getSubtotal()
    const convenienceFee = getConvenienceFee()
    const processingFee = getProcessingFee()
    const hst = getHST()
    return subtotal + convenienceFee + processingFee + hst
  }

  const handleProceedToCheckout = () => {
    if (getTotalTickets() > 0) {
      setCurrentStep('checkout')
    }
  }

  const handleBackToSelection = () => {
    setCurrentStep('selection')
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-sm sm:max-w-2xl lg:max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Select Your Tickets</h2>
              <p className="text-sm sm:text-base text-gray-600">{eventDetails.title}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(95vh-140px)] sm:max-h-[calc(90vh-140px)]">
            {currentStep === 'selection' ? (
              <div className="p-4 sm:p-6">
                {/* Ticket Selection */}
                <div className="card mb-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Select Number of Tickets</h3>
                    <p className="text-sm sm:text-base text-gray-600">Choose your quantity and see the pricing tiers</p>
                  </div>

                  {/* Pricing Tiers Display */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">Ticket Pricing Tiers</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      <div className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                        getTotalTickets() >= 1 && getTotalTickets() < 5 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}>
                        <div className="text-2xl font-bold text-gray-900 mb-1">$34.99</div>
                        <div className="text-sm text-gray-600 mb-2">Regular Ticket</div>
                        <div className="text-xs text-gray-500">1-4 tickets</div>
                      </div>
                      
                      <div className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                        getTotalTickets() >= 5 && getTotalTickets() < 10 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}>
                        <div className="text-2xl font-bold text-gray-900 mb-1">$30.00</div>
                        <div className="text-sm text-gray-600 mb-2">Group Discount</div>
                        <div className="text-xs text-gray-500">5-9 tickets</div>
                        <div className="text-xs text-green-600 font-medium">Save $4.99 each!</div>
                      </div>
                      
                      <div className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                        getTotalTickets() >= 10 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}>
                        <div className="text-2xl font-bold text-gray-900 mb-1">$28.00</div>
                        <div className="text-sm text-gray-600 mb-2">Best Value</div>
                        <div className="text-xs text-gray-500">10+ tickets</div>
                        <div className="text-xs text-green-600 font-medium">Save $6.99 each!</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <label htmlFor="ticketQuantity" className="text-lg font-semibold text-gray-900">
                      Number of Tickets:
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => {
                          const currentValue = selectedTickets['regular'] || 0
                          if (currentValue > 0) {
                            setSelectedTickets({ regular: currentValue - 1 })
                          }
                        }}
                        disabled={(selectedTickets['regular'] || 0) === 0}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <input
                        id="ticketQuantity"
                        type="number"
                        min="0"
                        max="1000"
                        value={selectedTickets['regular'] || 0}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0
                          setSelectedTickets({ regular: value })
                        }}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center text-lg font-semibold focus:ring-2 focus:ring-primary-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button
                        onClick={() => {
                          const currentValue = selectedTickets['regular'] || 0
                          if (currentValue < 1000) {
                            setSelectedTickets({ regular: currentValue + 1 })
                          }
                        }}
                        disabled={(selectedTickets['regular'] || 0) >= 1000}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                   {/* Combined Price Display */}
                   {getTotalTickets() > 0 && (
                     <div className="text-center p-4 bg-primary-50 rounded-lg border-2 border-primary-200">
                       <p className="text-lg font-semibold text-gray-900 mb-1">
                         {getTotalTickets()} ticket{getTotalTickets() !== 1 ? 's' : ''} selected
                       </p>
                       <p className="text-3xl font-bold text-primary-600 mb-1">
                         ${getTicketPrice().toFixed(2)} per ticket
                       </p>
                       <p className="text-sm text-gray-600">
                         {getTotalTickets() >= 10 ? 'Group of 10+ discount' : 
                          getTotalTickets() >= 5 ? 'Group of 5+ discount' : 'Regular price'}
                       </p>
                       {getTotalTickets() >= 5 && (
                         <p className="text-sm text-green-600 font-medium mt-1">
                           🎉 Group discount applied!
                         </p>
                       )}
                     </div>
                   )}
                </div>

                {/* Summary */}
                {getTotalTickets() > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card bg-primary-50 border-primary-200"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-lg font-semibold text-gray-900">
                            {getTotalTickets()} ticket{getTotalTickets() !== 1 ? 's' : ''} selected
                          </p>
                        </div>
                      </div>
                      
                      {/* Price Breakdown */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal:</span>
                          <span className="text-gray-900">${getSubtotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Convenience Fee:</span>
                          <span className="text-gray-900">${getConvenienceFee().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Payment Processing:</span>
                          <span className="text-gray-900">${getProcessingFee().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">HST (13%):</span>
                          <span className="text-gray-900">${getHST().toFixed(2)}</span>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="border-t border-primary-200 pt-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span className="text-gray-900">Total:</span>
                          <span className="text-primary-600">${getTotalPrice().toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={handleProceedToCheckout}
                        className="w-full btn-primary flex items-center justify-center"
                      >
                        <CreditCard className="w-5 h-5 mr-2" />
                        Proceed to Checkout
                      </button>
                    </div>
                  </motion.div>
                )}

                {getTotalTickets() === 0 && (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Please select at least one ticket to continue</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6">
                <CheckoutForm
                  selectedTickets={selectedTickets}
                  ticketTypes={ticketTypes}
                  totalPrice={getTotalPrice()}
                  eventDetails={eventDetails}
                  onBack={handleBackToSelection}
                  onSuccess={onClose}
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
} 