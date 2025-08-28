'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, CreditCard, User, CheckCircle, AlertCircle } from 'lucide-react'
import PurchaseSummary from './PurchaseSummary'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import React from 'react'

// Load Stripe with better error handling and fallback
const loadStripeSafely = async () => {
  try {
    // Try both environment variable names for compatibility
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 
                          process.env.STRIPE_PUBLISHABLE_KEY || 
                          'pk_test_51RK06wRvqInccQHjbZjqsjP8sc2RKy4IQT6arWCPC6zAcvlVgVkr7avQXz0RMOsEJI8KNKnatFpasL7IJRfft9rv001mscOZcy'
    
    if (!publishableKey || publishableKey === 'your-stripe-publishable-key') {
      throw new Error('Stripe publishable key not configured')
    }
    
    // Check if using live keys in development
    if (publishableKey.startsWith('pk_live_') && process.env.NODE_ENV === 'development') {
      console.warn('⚠️ Using live Stripe keys in development mode. This may cause issues.')
      // For development with live keys, use a fallback approach
      return await loadStripe(publishableKey, {
        apiVersion: '2023-10-16',
        stripeAccount: undefined
      })
    }
    
    console.log('Loading Stripe with key:', publishableKey.substring(0, 20) + '...')
    
    // Load Stripe with explicit options
    return await loadStripe(publishableKey, {
      apiVersion: '2023-10-16'
    })
  } catch (error) {
    console.error('Failed to load Stripe:', error)
    return null
  }
}

// Create a more robust Stripe promise
const stripePromise = (async () => {
  try {
    console.log('CheckoutForm: Starting Stripe load...')
    const result = await loadStripeSafely()
    console.log('CheckoutForm: Stripe load result -', !!result)
    return result
  } catch (error) {
    console.error('CheckoutForm: Stripe load error -', error)
    return null
  }
})()

interface CheckoutFormProps {
  selectedTickets: { [key: string]: number }
  ticketTypes: any[]
  totalPrice: number
  eventDetails: any
  onBack: () => void
  onSuccess: () => void
  onClose: () => void
  isDiscountApplied?: boolean
  discountCode?: string
}

const getTotalTickets = (selectedTickets: { [key: string]: number }) => {
  return Object.values(selectedTickets).reduce((sum, count) => sum + count, 0)
}

const getTicketPrice = (selectedTickets: { [key: string]: number }, isDiscountApplied: boolean = false) => {
  return isDiscountApplied ? 0 : 20.00 // Free for discount codes, otherwise fixed price
}

const getSubtotal = (selectedTickets: { [key: string]: number }, ticketTypes: any[], isDiscountApplied: boolean = false) => {
  const totalTickets = getTotalTickets(selectedTickets)
  const pricePerTicket = getTicketPrice(selectedTickets, isDiscountApplied)
  return totalTickets * pricePerTicket
}

const getConvenienceFee = (selectedTickets: { [key: string]: number }, isDiscountApplied: boolean = false) => {
  const totalTickets = getTotalTickets(selectedTickets)
  return isDiscountApplied ? 0 : totalTickets * 1.00 // No fees for discount codes
}

const getProcessingFee = (selectedTickets: { [key: string]: number }, isDiscountApplied: boolean = false) => {
  const totalTickets = getTotalTickets(selectedTickets)
  return isDiscountApplied ? 0 : totalTickets * 1.10 // No fees for discount codes
}

const getHST = (selectedTickets: { [key: string]: number }, ticketTypes: any[], isDiscountApplied: boolean = false) => {
  const subtotal = getSubtotal(selectedTickets, ticketTypes, isDiscountApplied)
  const convenienceFee = getConvenienceFee(selectedTickets, isDiscountApplied)
  const processingFee = getProcessingFee(selectedTickets, isDiscountApplied)
  return isDiscountApplied ? 0 : (subtotal + convenienceFee + processingFee) * 0.13 // No HST for discount codes
}

const getTotalAmount = (selectedTickets: { [key: string]: number }, ticketTypes: any[], isDiscountApplied: boolean = false) => {
  const subtotal = getSubtotal(selectedTickets, ticketTypes, isDiscountApplied)
  const convenienceFee = getConvenienceFee(selectedTickets, isDiscountApplied)
  const processingFee = getProcessingFee(selectedTickets, isDiscountApplied)
  const hst = getHST(selectedTickets, ticketTypes, isDiscountApplied)
  return subtotal + convenienceFee + processingFee + hst
}

// Stripe Card Element styling
const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
}

// Payment Form Component
// Free Ticket Form Component (no Stripe dependencies)
function FreeTicketForm({
  selectedTickets,
  ticketTypes,
  totalPrice,
  eventDetails,
  onBack,
  onSuccess,
  onClose,
  isDiscountApplied = false,
  discountCode = ''
}: CheckoutFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [paymentIntent, setPaymentIntent] = useState<any>(null)
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // Validate customer info
    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone) {
      setError('Please fill in all required fields')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // Save purchase data to database first
      const purchaseData = {
        customerInfo,
        selectedTickets,
        eventDetails,
        isFreeTicket: true,
        totalAmount: 0,
        paymentStatus: 'completed',
        discountCode: discountCode || null,
        qrCodeDataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==' // Placeholder QR code
      }

      // Save to database (but don't fail if it doesn't work)
      try {
        await fetch('/api/save-purchase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(purchaseData),
        })
      } catch (dbError) {
        console.error('Database save failed (continuing with email):', dbError)
        // Continue with email even if database save fails
      }

      // Send confirmation email
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerInfo,
          selectedTickets,
          eventDetails,
          isFreeTicket: true,
          freeTicketAmount: 0,
          paymentIntentId: 'free-ticket-' + Date.now(),
          qrCodeDataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==' // Placeholder QR code
        }),
      })

      if (response.ok) {
        setSuccess(true)
        setPaymentIntent({
          id: 'free-ticket-' + Date.now(),
          amount: 0,
          status: 'succeeded',
          customerInfo,
          selectedTickets,
          eventDetails
        })
      } else {
        throw new Error('Failed to send confirmation email')
      }
    } catch (err) {
      setError('Failed to process free ticket. Please try again.')
      console.error('Free ticket error:', err)
    }

    setIsProcessing(false)
  }

  if (success && paymentIntent) {
    return (
      <PurchaseSummary
        paymentIntent={paymentIntent}
        selectedTickets={selectedTickets}
        eventDetails={eventDetails}
        customerInfo={customerInfo}
        onClose={onSuccess}
      />
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to tickets
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Order Summary */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Event Tickets</p>
                <p className="text-sm text-gray-600">Qty: {getTotalTickets(selectedTickets)} × ${getTicketPrice(selectedTickets, isDiscountApplied)} each</p>
              </div>
              <p className="font-semibold text-gray-900">${getSubtotal(selectedTickets, ticketTypes, isDiscountApplied).toFixed(2)}</p>
            </div>
            
            {/* Price Breakdown */}
            <div className="space-y-2 text-sm">
              {isDiscountApplied && (
                <div className="flex justify-between">
                  <span className="text-green-600 font-semibold">Discount Applied:</span>
                  <span className="text-green-600 font-semibold">-${(20.00).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900">${getSubtotal(selectedTickets, ticketTypes, isDiscountApplied).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Convenience Fee:</span>
                <span className="text-gray-900">${getConvenienceFee(selectedTickets, isDiscountApplied).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Processing:</span>
                <span className="text-gray-900">${getProcessingFee(selectedTickets, isDiscountApplied).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">HST (13%):</span>
                <span className="text-gray-900">${getHST(selectedTickets, ticketTypes, isDiscountApplied).toFixed(2)}</span>
              </div>
            </div>
            
            {/* Total */}
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-gray-900">Total</p>
                <p className="text-2xl font-bold text-primary-600">${getTotalAmount(selectedTickets, ticketTypes, isDiscountApplied).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Customer Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={customerInfo.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="input-field"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                value={customerInfo.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="input-field"
                placeholder="Enter your last name"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={customerInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="input-field"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="input-field"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>
        </div>

        {/* Free Ticket Notice */}
        <div className="card bg-green-50 border-green-200">
          <div className="flex items-center">
            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-green-800">🎉 FREE TICKET CONFIRMED!</h3>
              <p className="text-green-700 text-sm font-medium">Your discount code has been applied successfully.</p>
              <p className="text-green-600 text-sm mt-1">✅ No payment required • ✅ No card details needed • ✅ Instant confirmation</p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
            <span className="text-red-700">{error}</span>
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            'Confirm Free Ticket'
          )}
        </button>
      </form>
    </div>
  )
}

// Payment Form Component (with Stripe dependencies)
function PaymentForm({
  selectedTickets,
  ticketTypes,
  totalPrice,
  eventDetails,
  onBack,
  onSuccess,
  onClose,
  isDiscountApplied = false,
  discountCode = ''
}: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  
  // All hooks must be called at the top level, before any conditional returns
  const [stripeError, setStripeError] = useState<string | null>(null)
  const [loadingTimeout, setLoadingTimeout] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [paymentIntent, setPaymentIntent] = useState<any>(null)
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  
  // Add timeout for Stripe loading with debugging
  React.useEffect(() => {
    console.log('PaymentForm: Stripe loading status -', { stripe: !!stripe, elements: !!elements })
    
    const timer = setTimeout(() => {
      if (!stripe || !elements) {
        console.log('PaymentForm: Stripe loading timeout reached')
        setLoadingTimeout(true)
        setStripeError('Stripe is taking too long to load. Please refresh the page.')
      }
    }, 8000) // Reduced to 8 seconds for faster feedback

    return () => clearTimeout(timer)
  }, [stripe, elements])
  
  // Show loading state while Stripe is initializing
  if (!stripe || !elements) {
    console.log('PaymentForm: Showing loading state -', { stripe: !!stripe, elements: !!elements })
    
    // If we've been loading for too long, show a fallback option
    if (loadingTimeout) {
      return (
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to tickets
            </button>
          </div>
          <div className="card text-center py-12">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment System Unavailable</h3>
            <p className="text-gray-600 mb-4">
              We're experiencing technical difficulties with our payment system.
            </p>
            {stripeError && (
              <p className="text-red-600 mt-2 text-sm mb-4">Error: {stripeError}</p>
            )}
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Try Again
              </button>
              <div className="text-sm text-gray-500">
                <p>If the issue persists, please contact us:</p>
                <p className="font-medium">info@catchtheevent.com</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
    
    // Show loading state
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to tickets
          </button>
        </div>
        <div className="card text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading secure payment form...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
        </div>
      </div>
    )
  }

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // Validate customer info
    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone) {
      setError('Please fill in all required fields')
      return
    }

    setIsProcessing(true)
    setError(null)

    const totalAmount = getTotalAmount(selectedTickets, ticketTypes, isDiscountApplied)

    // Handle free tickets (discount applied)
    if (totalAmount === 0) {
      try {
        // Mark discount code as used if it was applied
        if (isDiscountApplied && discountCode) {
          await fetch('/api/use-discount', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              code: discountCode,
              userEmail: customerInfo.email
            }),
          })
        }

        // Save purchase data to database first
        const purchaseData = {
          customerInfo,
          selectedTickets,
          eventDetails,
          isFreeTicket: true,
          totalAmount: 0,
          paymentStatus: 'completed',
          discountCode: discountCode || null,
          qrCodeDataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==' // Placeholder QR code
        }

        // Save to database (but don't fail if it doesn't work)
        try {
          await fetch('/api/save-purchase', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(purchaseData),
          })
        } catch (dbError) {
          console.error('Database save failed (continuing with email):', dbError)
          // Continue with email even if database save fails
        }

        // Send confirmation email
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerInfo,
            selectedTickets,
            eventDetails,
            isFreeTicket: true,
            freeTicketAmount: 0,
            paymentIntentId: 'free-ticket-' + Date.now(),
            qrCodeDataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==' // Placeholder QR code
          }),
        })

        if (response.ok) {
          setSuccess(true)
          setPaymentIntent({
            id: 'free-ticket-' + Date.now(),
            amount: 0,
            status: 'succeeded',
            customerInfo,
            selectedTickets,
            eventDetails
          })
        } else {
          throw new Error('Failed to send confirmation email')
        }
      } catch (err) {
        setError('Failed to process free ticket. Please try again.')
        console.error('Free ticket error:', err)
      }
      setIsProcessing(false)
      return
    }

    // Handle paid tickets with Stripe
    if (!stripe || !elements) {
      setError('Payment system not available')
      setIsProcessing(false)
      return
    }

    try {
      // Create payment intent with Stripe
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(totalAmount * 100), // Convert to cents
          customerInfo,
          selectedTickets,
          eventDetails
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create payment intent')
      }

      const paymentIntentData = await response.json()
      
      // Confirm the payment with Stripe
      const { error: paymentError, paymentIntent: confirmedPaymentIntent } = await stripe.confirmCardPayment(
        paymentIntentData.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              name: `${customerInfo.firstName} ${customerInfo.lastName}`,
              email: customerInfo.email,
            },
          },
        }
      )

      if (paymentError) {
        setError(paymentError.message || 'Payment failed')
        return
      }

      if (confirmedPaymentIntent.status === 'succeeded') {
        // Save purchase data to database
        const purchaseData = {
          customerInfo,
          selectedTickets,
          eventDetails,
          isFreeTicket: false,
          totalAmount: totalAmount,
          paymentStatus: 'completed',
          discountCode: discountCode || null,
          stripePaymentIntentId: confirmedPaymentIntent.id,
          qrCodeDataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==' // Placeholder QR code
        }

        // Save to database (but don't fail if it doesn't work)
        try {
          await fetch('/api/save-purchase', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(purchaseData),
          })
        } catch (dbError) {
          console.error('Database save failed (continuing with success):', dbError)
          // Continue with success even if database save fails
        }

        setSuccess(true)
        setPaymentIntent({
          ...paymentIntentData,
          paymentIntent: confirmedPaymentIntent
        })
      } else {
        setError('Payment was not successful')
      }
    } catch (err) {
      setError('Payment processing failed. Please try again.')
      console.error('Payment error:', err)
    }

    setIsProcessing(false)
  }

  if (success && paymentIntent) {
    return (
      <PurchaseSummary
        paymentIntent={paymentIntent}
        selectedTickets={selectedTickets}
        eventDetails={eventDetails}
        customerInfo={customerInfo}
        onClose={onSuccess}
      />
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to tickets
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Order Summary */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Event Tickets</p>
                <p className="text-sm text-gray-600">Qty: {getTotalTickets(selectedTickets)} × ${getTicketPrice(selectedTickets, isDiscountApplied)} each</p>
              </div>
              <p className="font-semibold text-gray-900">${getSubtotal(selectedTickets, ticketTypes, isDiscountApplied).toFixed(2)}</p>
            </div>
            
            {/* Price Breakdown */}
            <div className="space-y-2 text-sm">
              {isDiscountApplied && (
                <div className="flex justify-between">
                  <span className="text-green-600 font-semibold">Discount Applied:</span>
                  <span className="text-green-600 font-semibold">-${(20.00).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900">${getSubtotal(selectedTickets, ticketTypes, isDiscountApplied).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Convenience Fee:</span>
                <span className="text-gray-900">${getConvenienceFee(selectedTickets, isDiscountApplied).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Processing:</span>
                <span className="text-gray-900">${getProcessingFee(selectedTickets, isDiscountApplied).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">HST (13%):</span>
                <span className="text-gray-900">${getHST(selectedTickets, ticketTypes, isDiscountApplied).toFixed(2)}</span>
              </div>
            </div>
            
            {/* Total */}
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-gray-900">Total</p>
                <p className="text-2xl font-bold text-primary-600">${getTotalAmount(selectedTickets, ticketTypes, isDiscountApplied).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Customer Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={customerInfo.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="input-field"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                value={customerInfo.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="input-field"
                placeholder="Enter your last name"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={customerInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="input-field"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="input-field"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>
        </div>

        {/* Payment Information - Only show for paid tickets */}
        {getTotalAmount(selectedTickets, ticketTypes, isDiscountApplied) > 0 && (
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Payment Information
            </h3>
            <div className="space-y-4">
              <div className="p-4 border border-gray-300 rounded-lg bg-white">
                <CardElement options={cardElementOptions} />
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <p>Your payment is secure and encrypted. We use Stripe to process all payments.</p>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-5 bg-green-100 border border-green-300 rounded flex items-center justify-center">
                    <span className="text-green-600 text-xs font-bold">🔒</span>
                  </div>
                  <span className="text-xs text-green-600 font-medium">SSL Secured</span>
                </div>
              </div>
            </div>
          </div>
        )}



        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
            <span className="text-red-700">{error}</span>
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing || !stripe}
          className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing Payment...
            </div>
          ) : (
            `Pay $${getTotalAmount(selectedTickets, ticketTypes, isDiscountApplied).toFixed(2)}`
          )}
        </button>
      </form>
    </div>
  )
}

export default function CheckoutForm({
  selectedTickets,
  ticketTypes,
  totalPrice,
  eventDetails,
  onBack,
  onSuccess,
  onClose,
  isDiscountApplied = false,
  discountCode = ''
}: CheckoutFormProps) {
  // Check if this is a free ticket (total amount is 0 or discount applied)
  const isFreeTicket = isDiscountApplied || getTotalAmount(selectedTickets, ticketTypes, isDiscountApplied) === 0

  // For free tickets, render FreeTicketForm (no Stripe dependencies)
  if (isFreeTicket) {
    return (
      <FreeTicketForm
        selectedTickets={selectedTickets}
        ticketTypes={ticketTypes}
        totalPrice={totalPrice}
        eventDetails={eventDetails}
        onBack={onBack}
        onSuccess={onSuccess}
        onClose={onClose}
        isDiscountApplied={isDiscountApplied}
        discountCode={discountCode}
      />
    )
  }

  // For paid tickets, wrap with Stripe Elements
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        selectedTickets={selectedTickets}
        ticketTypes={ticketTypes}
        totalPrice={totalPrice}
        eventDetails={eventDetails}
        onBack={onBack}
        onSuccess={onSuccess}
        onClose={onClose}
        isDiscountApplied={isDiscountApplied}
        discountCode={discountCode}
      />
    </Elements>
  )
} 