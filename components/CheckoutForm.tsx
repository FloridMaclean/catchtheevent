'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, CreditCard, User, CheckCircle, AlertCircle } from 'lucide-react'
import PurchaseSummary from './PurchaseSummary'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

// Load Stripe
const stripePromise = loadStripe('pk_live_51RK06wRvqInccQHjbZjqsjP8sc2RKy4IQT6arWCPC6zAcvlVgVkr7avQXz0RMOsEJI8KNKnatFpasL7IJRfft9rv001mscOZcy')

interface CheckoutFormProps {
  selectedTickets: { [key: string]: number }
  ticketTypes: any[]
  totalPrice: number
  eventDetails: any
  onBack: () => void
  onSuccess: () => void
}

const getTotalTickets = (selectedTickets: { [key: string]: number }) => {
  return Object.values(selectedTickets).reduce((sum, count) => sum + count, 0)
}

const getTicketPrice = (selectedTickets: { [key: string]: number }) => {
  const totalTickets = getTotalTickets(selectedTickets)
  if (totalTickets >= 10) {
    return 28.00 // Group of 10+ tickets
  } else if (totalTickets >= 5) {
    return 30.00 // Group of 5+ tickets
  } else {
    return 34.99 // Regular ticket price
  }
}

const getSubtotal = (selectedTickets: { [key: string]: number }, ticketTypes: any[]) => {
  const totalTickets = getTotalTickets(selectedTickets)
  const pricePerTicket = getTicketPrice(selectedTickets)
  return totalTickets * pricePerTicket
}

const getConvenienceFee = (selectedTickets: { [key: string]: number }) => {
  const totalTickets = getTotalTickets(selectedTickets)
  return totalTickets * 1.00 // $1.00 per ticket
}

const getProcessingFee = (selectedTickets: { [key: string]: number }) => {
  const totalTickets = getTotalTickets(selectedTickets)
  return totalTickets * 1.10 // $1.10 per ticket
}

const getHST = (selectedTickets: { [key: string]: number }, ticketTypes: any[]) => {
  const subtotal = getSubtotal(selectedTickets, ticketTypes)
  const convenienceFee = getConvenienceFee(selectedTickets)
  const processingFee = getProcessingFee(selectedTickets)
  return (subtotal + convenienceFee + processingFee) * 0.13 // 13% HST
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
function PaymentForm({
  selectedTickets,
  ticketTypes,
  totalPrice,
  eventDetails,
  onBack,
  onSuccess
}: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  
  // Show loading state while Stripe is initializing
  if (!stripe || !elements) {
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
        </div>
      </div>
    )
  }
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [paymentIntent, setPaymentIntent] = useState<any>(null)
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    // Validate customer info
    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email) {
      setError('Please fill in all required fields')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // Create payment intent with Stripe
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(totalPrice * 100), // Convert to cents
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
                <p className="text-sm text-gray-600">Qty: {getTotalTickets(selectedTickets)} × ${getTicketPrice(selectedTickets)} each</p>
              </div>
              <p className="font-semibold text-gray-900">${getSubtotal(selectedTickets, ticketTypes).toFixed(2)}</p>
            </div>
            
            {/* Price Breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900">${getSubtotal(selectedTickets, ticketTypes).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Convenience Fee:</span>
                <span className="text-gray-900">${getConvenienceFee(selectedTickets).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Processing:</span>
                <span className="text-gray-900">${getProcessingFee(selectedTickets).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">HST (13%):</span>
                <span className="text-gray-900">${getHST(selectedTickets, ticketTypes).toFixed(2)}</span>
              </div>
            </div>
            
            {/* Total */}
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-gray-900">Total</p>
                <p className="text-2xl font-bold text-primary-600">${totalPrice.toFixed(2)}</p>
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
          </div>
        </div>

        {/* Payment Information */}
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
            `Pay $${totalPrice.toFixed(2)}`
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
  onSuccess
}: CheckoutFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        selectedTickets={selectedTickets}
        ticketTypes={ticketTypes}
        totalPrice={totalPrice}
        eventDetails={eventDetails}
        onBack={onBack}
        onSuccess={onSuccess}
      />
    </Elements>
  )
} 