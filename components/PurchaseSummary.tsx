'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Download, QrCode, Calendar, MapPin, User, AlertCircle } from 'lucide-react'
import QRCode from 'qrcode'
import { createSecureQRData } from '../lib/security'

interface PurchaseSummaryProps {
  paymentIntent: any
  selectedTickets: { [key: string]: number }
  eventDetails: any
  eventName?: string
  basePrice?: number
  convenienceFee?: number
  processingFee?: number
  taxRate?: number
  customerInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    licensePlate: string
  }
  onClose: () => void
  isDiscountApplied?: boolean
  discountCode?: string
}

export default function PurchaseSummary({
  paymentIntent,
  selectedTickets,
  eventDetails,
  eventName,
  basePrice = 20.00,
  convenienceFee = 1.00,
  processingFee = 1.10,
  taxRate = 0.13,
  customerInfo,
  onClose,
  isDiscountApplied = false,
  discountCode = ''
}: PurchaseSummaryProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(true)
  const [emailSent, setEmailSent] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [emailSending, setEmailSending] = useState(false)

  const totalTickets = Object.values(selectedTickets).reduce((sum, count) => sum + count, 0)
  
  const getTicketPrice = () => {
    return isDiscountApplied ? 0 : basePrice // Free for discount codes, otherwise use base price
  }

  const getSubtotal = () => {
    const pricePerTicket = getTicketPrice()
    return totalTickets * pricePerTicket
  }

  const getConvenienceFee = () => {
    return isDiscountApplied ? 0 : totalTickets * convenienceFee // No fees for discount codes
  }

  const getProcessingFee = () => {
    return isDiscountApplied ? 0 : totalTickets * processingFee // No fees for discount codes
  }

  const getHST = () => {
    const subtotal = getSubtotal()
    // HST only applies to the base ticket price (subtotal), not to fees
    return isDiscountApplied ? 0 : subtotal * taxRate
  }

  const totalAmount = (getSubtotal() + getConvenienceFee() + getProcessingFee() + getHST()).toFixed(2)

  useEffect(() => {
    // Only generate QR code and send email if not already done
    if (!qrCodeDataUrl && !emailSent && !emailError) {
      generateQRCode()
    }
  }, [])

  const generateQRCode = async () => {
    try {
      setIsGenerating(true)
      
      // Generate secure QR code data
      const secureQRData = createSecureQRData()
      
      // Create purchase summary data with detailed user information
      const purchaseData = {
        // Event Information
        eventTitle: eventName || eventDetails?.title || 'Event',
        eventDate: eventDetails?.date || 'Date TBA',
        eventVenue: eventDetails?.venue || 'Venue TBA',
        eventAddress: eventDetails?.address || 'Address TBA',
        
        // Customer Information
        customerFirstName: customerInfo.firstName,
        customerLastName: customerInfo.lastName,
        customerFullName: `${customerInfo.firstName} ${customerInfo.lastName}`,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        customerLicensePlate: customerInfo.licensePlate,
        
        // Ticket Information
        totalTickets: totalTickets,
        ticketPrice: getTicketPrice(),
        subtotal: getSubtotal(),
        convenienceFee: getConvenienceFee(),
        processingFee: getProcessingFee(),
        hst: getHST(),
        totalAmount: totalAmount,
        isDiscountApplied: isDiscountApplied,
        discountCode: discountCode,
        
        // Payment Information
        paymentIntentId: paymentIntent.id,
        purchaseDate: new Date().toISOString(),
        
        // Secure QR Code Data
        bookingId: secureQRData.bookingId,
        securityToken: secureQRData.token,
        qrGeneratedAt: secureQRData.timestamp,
        qrVersion: '2.0'
      }

      // Generate QR code with secure data format
      const qrDataUrl = await QRCode.toDataURL(secureQRData.qrData, {
        width: 200,
        margin: 2,
        color: {
          dark: '#1f2937',
          light: '#ffffff'
        }
      })

      setQrCodeDataUrl(qrDataUrl)
      
      // Send email confirmation only once
      if (!emailSent && !emailError && !emailSending) {
        await sendEmailConfirmation(qrDataUrl)
      }
    } catch (error) {
      console.error('Error generating QR code:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const sendEmailConfirmation = async (qrCodeUrl: string) => {
    // Prevent multiple email sends
    if (emailSent || emailError || emailSending) {
      return
    }
    
    setEmailSending(true)
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerInfo,
          eventDetails,
          selectedTickets,
          eventName,
          basePrice,
          convenienceFee,
          processingFee,
          taxRate,
          paymentIntentId: paymentIntent.id,
          qrCodeDataUrl: qrCodeUrl
        }),
      })

      const result = await response.json()

      if (result.success) {
        setEmailSent(true)
      } else {
        setEmailError(result.error || 'Failed to send email')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setEmailError('Failed to send email confirmation')
    } finally {
      setEmailSending(false)
    }
  }

  const downloadQRCode = () => {
    if (qrCodeDataUrl) {
      const link = document.createElement('a')
      link.download = `ticket-qr-${paymentIntent.id}.png`
      link.href = qrCodeDataUrl
      link.click()
    }
  }

  const printSummary = () => {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Purchase Summary - ${eventName || eventDetails?.title || 'Event'}</title>
          <style>
            @media print {
              @page {
                margin: 0.5in;
                size: A4;
              }
            }
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background: white;
              color: #333;
            }
            .print-header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #f59e0b;
              padding-bottom: 20px;
            }
            .print-header h1 {
              color: #f59e0b;
              margin: 0 0 10px 0;
              font-size: 24px;
            }
            .print-header p {
              margin: 0;
              color: #666;
              font-size: 14px;
            }
            .summary-section {
              margin-bottom: 25px;
            }
            .summary-section h2 {
              color: #333;
              margin: 0 0 15px 0;
              font-size: 18px;
              border-bottom: 1px solid #eee;
              padding-bottom: 5px;
            }
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              margin-bottom: 20px;
            }
            .info-item {
              margin-bottom: 10px;
            }
            .info-label {
              font-size: 12px;
              color: #666;
              margin-bottom: 3px;
            }
            .info-value {
              font-size: 14px;
              font-weight: bold;
              color: #333;
            }
            .pricing-section {
              border-top: 1px solid #eee;
              padding-top: 15px;
              margin-bottom: 20px;
            }
            .pricing-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 8px;
            }
            .total-row {
              font-size: 16px;
              font-weight: bold;
              color: #f59e0b;
              border-top: 1px solid #eee;
              padding-top: 8px;
              margin-top: 8px;
            }
            .payment-info {
              background: #f8f9fa;
              padding: 15px;
              border-radius: 5px;
              margin-bottom: 25px;
            }
            .payment-info p {
              margin: 5px 0;
              font-size: 12px;
            }
            .qr-section {
              text-align: center;
              margin-top: 30px;
            }
            .qr-section h2 {
              margin-bottom: 15px;
            }
            .qr-code {
              max-width: 200px;
              margin: 0 auto 15px auto;
            }
            .qr-instructions {
              font-size: 12px;
              color: #666;
              margin-top: 10px;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 10px;
              color: #999;
              border-top: 1px solid #eee;
              padding-top: 15px;
            }
            @media print {
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-header">
            <h1>Payment Successful!</h1>
            <p>Your tickets have been confirmed. Here's your purchase summary and QR code.</p>
          </div>

          <div class="summary-section">
            <h2>Purchase Summary</h2>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Event</div>
                <div class="info-value">${eventName || eventDetails?.title || 'Event'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Date</div>
                <div class="info-value">${formatDate(eventDetails?.date || 'Date TBA')}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Venue</div>
                <div class="info-value">${eventDetails?.venue || 'Venue TBA'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Customer</div>
                <div class="info-value">${customerInfo.firstName} ${customerInfo.lastName}</div>
              </div>
            </div>

            <div class="pricing-section">
              <div class="pricing-row">
                <span>Tickets</span>
                <span>${totalTickets} × $${getTicketPrice().toFixed(2)}</span>
              </div>
              ${isDiscountApplied ? `<div class="pricing-row" style="color: #28a745; font-weight: bold;">
                <span>Discount Applied (${discountCode})</span>
                <span>-$${(20.00 * totalTickets).toFixed(2)}</span>
              </div>` : ''}
              <div class="pricing-row">
                <span>Subtotal</span>
                <span>$${getSubtotal().toFixed(2)}</span>
              </div>
              <div class="pricing-row">
                <span>Convenience Fee</span>
                <span>$${getConvenienceFee().toFixed(2)}</span>
              </div>
              <div class="pricing-row">
                <span>Payment Processing</span>
                <span>$${getProcessingFee().toFixed(2)}</span>
              </div>
              <div class="pricing-row">
                <span>HST (13% on base price)</span>
                <span>$${getHST().toFixed(2)}</span>
              </div>
              <div class="pricing-row total-row">
                <span>Total</span>
                <span>$${totalAmount}</span>
              </div>
            </div>

            <div class="payment-info">
              <p><strong>Payment ID:</strong> ${paymentIntent.id}</p>
              <p><strong>Purchase Date:</strong> ${formatDate(new Date().toISOString())}</p>
            </div>
          </div>

          <div class="qr-section">
            <h2>Entry QR Code</h2>
            <img src="${qrCodeDataUrl}" alt="Ticket QR Code" class="qr-code" />
            <div class="qr-instructions">
              Present this QR code at the event entrance
            </div>
          </div>

          <div class="footer">
            <p>Generated by Catch The Event</p>
            <p>For support, contact: info@catchtheevent.com</p>
          </div>

          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
        </html>
      `)
      printWindow.document.close()
    }
  }

  const formatDate = (dateString: string) => {
    // If it's already a formatted date string (like "Sunday, August 31st, 2025"), return it as is
    if (dateString.includes('Sunday') || dateString.includes('Monday') || dateString.includes('Tuesday') || 
        dateString.includes('Wednesday') || dateString.includes('Thursday') || dateString.includes('Friday') || 
        dateString.includes('Saturday')) {
      return dateString
    }
    
    // Otherwise, try to parse it as a date
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return dateString // Return original string if parsing fails
    }
    
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-50"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <CheckCircle className="w-8 h-8 sm:w-12 sm:h-12 text-green-500 mr-2 sm:mr-3" />
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Payment Successful!</h2>
          </div>
          <p className="text-center text-sm sm:text-base text-gray-600">
            Your tickets have been confirmed. Here's your purchase summary and QR code.
          </p>
        </div>

        <div className="p-4 sm:p-6">
          {/* Purchase Summary */}
          <div className="card mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
              <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Purchase Summary
            </h3>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Event</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">{eventName || eventDetails?.title || 'Event'}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Date</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 flex items-center">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {formatDate(eventDetails?.date || 'Date TBA')}
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Venue</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 flex items-center">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {eventDetails?.venue || 'Venue TBA'}
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Customer</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">{customerInfo.firstName} {customerInfo.lastName}</p>
                </div>
              </div>

              <div className="border-t pt-3 sm:pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs sm:text-sm text-gray-600">Tickets</span>
                  <span className="text-xs sm:text-sm font-semibold">{totalTickets} × ${getTicketPrice().toFixed(2)}</span>
                </div>
                {isDiscountApplied && (
                  <div className="flex justify-between items-center text-xs sm:text-sm text-green-600 font-semibold mb-2">
                    <span>Discount Applied ({discountCode})</span>
                    <span>-${(20.00 * totalTickets).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-gray-600">Convenience Fee</span>
                  <span className="text-gray-900">${getConvenienceFee().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-gray-600">Payment Processing</span>
                  <span className="text-gray-900">${getProcessingFee().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-gray-600">HST (13% on base price)</span>
                  <span className="text-gray-900">${getHST().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-base sm:text-lg font-bold border-t pt-2 mt-2">
                  <span>Total</span>
                  <span className="text-primary-600">${totalAmount}</span>
                </div>
                 {isDiscountApplied && (
                   <p className="text-center text-sm text-green-600 font-medium mt-2">
                     🎉 Free ticket with discount code {discountCode}!
                   </p>
                 )}
                 {!isDiscountApplied && totalTickets >= 5 && (
                   <p className="text-center text-sm text-green-600 font-medium mt-2">
                     🎉 Group discount applied!
                   </p>
                 )}
               </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Payment ID:</strong> {paymentIntent.id}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Purchase Date:</strong> {formatDate(new Date().toISOString())}
                </p>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="card text-center">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center justify-center">
              <QrCode className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Entry QR Code
            </h3>
            
            {isGenerating ? (
              <div className="py-6 sm:py-8">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-primary-600 mx-auto mb-3 sm:mb-4"></div>
                <p className="text-xs sm:text-sm text-gray-600">Generating QR Code...</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-center">
                  <img 
                    src={qrCodeDataUrl} 
                    alt="Ticket QR Code" 
                    className="border-2 border-gray-200 rounded-lg w-32 h-32 sm:w-40 sm:h-40"
                  />
                </div>
                <p className="text-xs sm:text-sm text-gray-600">
                  Present this QR code at the event entrance
                </p>
                <div className="bg-blue-50 p-2 sm:p-3 rounded-lg mt-3">
                  <p className="text-xs text-blue-700 font-medium mb-2">
                    QR Code contains your details:
                  </p>
                  <div className="text-xs text-blue-600 space-y-1">
                    <p>• Name: {customerInfo.firstName} {customerInfo.lastName}</p>
                    <p>• Email: {customerInfo.email}</p>
                    <p>• Phone: {customerInfo.phone}</p>
                    <p>• Tickets: {totalTickets} × ${getTicketPrice()}</p>
                    {isDiscountApplied && (
                      <p>• Discount: {discountCode} (Free Ticket)</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                  <button
                    onClick={downloadQRCode}
                    className="btn-secondary flex items-center justify-center text-sm py-2 px-3"
                  >
                    <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Download QR Code
                  </button>
                  <button
                    onClick={printSummary}
                    className="btn-secondary flex items-center justify-center text-sm py-2 px-3"
                  >
                    <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Print Summary
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Email Status */}
          {emailSending && (
            <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-blue-500 mr-2"></div>
                <span className="text-blue-700 text-xs sm:text-sm">
                  Sending email confirmation...
                </span>
              </div>
            </div>
          )}
          
          {emailSent && (
            <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2" />
                <span className="text-green-700 text-xs sm:text-sm">
                  Email confirmation sent to {customerInfo.email}
                </span>
              </div>
            </div>
          )}
          
          {emailError && (
            <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2" />
                <span className="text-red-700 text-xs sm:text-sm">
                  {emailError}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4 sm:mt-6">
            <button
              onClick={onClose}
              className="btn-primary w-full text-sm sm:text-base py-3 sm:py-4"
            >
              Done
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 