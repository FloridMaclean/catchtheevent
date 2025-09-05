import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'
import { getUserByEmail } from '../../../lib/database'

// Initialize SendGrid with API key
const sendgridApiKey = process.env.SENDGRID_API_KEY
if (!sendgridApiKey || !sendgridApiKey.startsWith('SG.')) {
  console.error('Invalid SendGrid API key. API key must start with "SG."')
}
sgMail.setApiKey(sendgridApiKey || 'your_sendgrid_api_key_here')

// Track sent emails to prevent duplicates
const sentEmails = new Set()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      customerInfo, 
      eventDetails, 
      selectedTickets, 
      paymentIntentId, 
      qrCodeDataUrl,
      isFreeTicket = false,
      freeTicketAmount = 0,
      eventName,
      basePrice = 20.00,
      convenienceFee = 1.00,
      processingFee = 1.10,
      taxRate = 0.13
    } = body

    // Check if email was already sent for this payment
    const emailKey = `${customerInfo.email}-${paymentIntentId}`
    if (sentEmails.has(emailKey)) {
      console.log(`Email already sent for ${emailKey}`)
      return NextResponse.json({ 
        success: true, 
        message: 'Email already sent' 
      })
    }

    // Optionally fetch user data from database if customerInfo is incomplete
    let enhancedCustomerInfo = { ...customerInfo }
    try {
      if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.phone) {
        const dbUser = await getUserByEmail(customerInfo.email)
        if (dbUser) {
          enhancedCustomerInfo = {
            firstName: customerInfo.firstName || dbUser.first_name,
            lastName: customerInfo.lastName || dbUser.last_name,
            email: customerInfo.email,
            phone: customerInfo.phone || dbUser.phone_number || '',
            licensePlate: customerInfo.licensePlate || dbUser.license_plate || ''
          }
        }
      }
    } catch (dbError) {
      console.error('Failed to fetch user data from database:', dbError)
      // Continue with original customerInfo
    }

    const totalTickets = Object.values(selectedTickets).reduce((sum: number, count: any) => sum + (count as number), 0)
    // Calculate proper pricing for email
    const getTicketPrice = (totalTickets: number) => {
      return isFreeTicket ? 0 : basePrice // Free for discount codes, otherwise use base price
    }

    const getSubtotal = (totalTickets: number) => {
      const pricePerTicket = getTicketPrice(totalTickets)
      return totalTickets * pricePerTicket
    }

    const getConvenienceFee = (totalTickets: number) => {
      return isFreeTicket ? 0 : totalTickets * convenienceFee
    }

    const getProcessingFee = (totalTickets: number) => {
      return isFreeTicket ? 0 : totalTickets * processingFee
    }

    const getHST = (totalTickets: number) => {
      const subtotal = getSubtotal(totalTickets)
      // HST only applies to the base ticket price (subtotal), not to fees
      return isFreeTicket ? 0 : subtotal * taxRate
    }

    const totalAmount = isFreeTicket ? '0.00' : (getSubtotal(totalTickets) + getConvenienceFee(totalTickets) + getProcessingFee(totalTickets) + getHST(totalTickets)).toFixed(2)

    // Determine event-specific styling and content
    const isMeetGreet = eventName && eventName.includes('Meet & Greet')
    
    // Event-specific colors and styling
    const headerGradient = isMeetGreet 
      ? 'linear-gradient(135deg, #8b5cf6, #ec4899)' 
      : 'linear-gradient(135deg, #ed7519, #0ea5e9)'
    const highlightColor = isMeetGreet ? '#8b5cf6' : '#ed7519'
    const borderColor = isMeetGreet ? '#8b5cf6' : '#ed7519'
    
    // Event-specific title and emoji
    const eventTitle = eventName || 'Rangtaali Hamilton 2025'
    const eventEmoji = isMeetGreet ? '🤝' : '🎫'
    
    // Event-specific important notes
    const importantNotes = isMeetGreet 
      ? [
          'Indoor venue - dress appropriately for the occasion',
          'Bring QR code (digital or printed) for entry',
          'Limited spots - arrive on time',
          'Meet & Greet session will be strictly timed'
        ]
      : [
          'Open Ground venue - wear proper footwear',
          'Bring QR code (digital or printed) for entry',
          'Event may change due to weather conditions'
        ]

    // Create email HTML content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${eventTitle} - Ticket Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 500px; margin: 0 auto; background: #ffffff; }
          .header { background: ${headerGradient}; color: white; padding: 25px; text-align: center; }
          .content { padding: 25px; }
          .event-details { background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid ${borderColor}; }
          .qr-section { text-align: center; margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 8px; }
          .important { background: #fff3cd; padding: 15px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #ffc107; }
          .footer { text-align: center; padding: 20px; background: #f8f9fa; color: #666; font-size: 12px; }
          .highlight { color: ${highlightColor}; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">${eventEmoji} ${eventTitle}</h1>
            <p style="margin: 10px 0 0 0;">Ticket Confirmation</p>
          </div>
          
          <div class="content">
            <h2 style="margin-top: 0;">Hello ${enhancedCustomerInfo.firstName} ${enhancedCustomerInfo.lastName},</h2>
            
            <p>Your tickets for <span class="highlight">${eventTitle}</span> have been confirmed!</p>
            
            <div class="event-details">
              <h3 style="margin-top: 0;">📅 Event Details</h3>
              <p><strong>Event:</strong> ${eventDetails.title}</p>
              <p><strong>Date:</strong> ${eventDetails.date}</p>
              <p><strong>Venue:</strong> ${eventDetails.venue}</p>
              <p><strong>Address:</strong> ${eventDetails.address}</p>
              <p><strong>Phone:</strong> ${enhancedCustomerInfo.phone}</p>
              <p><strong>License Plate:</strong> ${enhancedCustomerInfo.licensePlate || 'Not provided'}</p>
              <p><strong>Tickets:</strong> ${totalTickets} × $${getTicketPrice(totalTickets).toFixed(2)} = $${getSubtotal(totalTickets).toFixed(2)}</p>
              ${isFreeTicket ? '<p><strong>Discount Applied:</strong> <span style="color: #28a745; font-weight: bold;">FREE TICKET</span></p>' : ''}
              <p><strong>Convenience Fee:</strong> $${getConvenienceFee(totalTickets).toFixed(2)}</p>
              <p><strong>Payment Processing:</strong> $${getProcessingFee(totalTickets).toFixed(2)}</p>
              <p><strong>HST (13% on base price):</strong> $${getHST(totalTickets).toFixed(2)}</p>
              <p><strong>Total:</strong> <span style="color: #28a745; font-weight: bold;">$${totalAmount}</span></p>
            </div>
            
            <div class="qr-section">
              <h3 style="margin-top: 0;">📱 Entry QR Code</h3>
              <p><strong>Your QR code is attached to this email. Present it at the event entrance.</strong></p>
              <p style="margin-top: 10px; font-size: 13px; color: #666; background: #f0f8ff; padding: 10px; border-radius: 5px;">
                <strong>QR Code contains:</strong><br>
                • Secure Booking ID and Security Token<br>
                • Your name: ${enhancedCustomerInfo.firstName} ${enhancedCustomerInfo.lastName}<br>
                • Email: ${enhancedCustomerInfo.email}<br>
                • Phone: ${enhancedCustomerInfo.phone}<br>
                • License Plate: ${enhancedCustomerInfo.licensePlate || 'Not provided'}<br>
                • Ticket details and payment information
              </p>
              <p style="margin-top: 15px; font-size: 14px; color: #666;">
                <strong>Payment ID:</strong> ${paymentIntentId}<br>
                <strong>Purchase Date:</strong> ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            
            <div class="important">
              <h4 style="margin-top: 0;">📍 Important</h4>
              <ul style="margin: 10px 0; padding-left: 20px;">
                ${importantNotes.map(note => `<li>${note}</li>`).join('')}
              </ul>
            </div>
            
            <div class="footer">
              <p style="margin: 0;">Catch The Event</p>
              <p style="margin: 5px 0;">Contact: info@catchtheevent.com</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    // Create email text content (fallback)
    const emailText = `
      ${eventTitle} - Ticket Confirmation

      Hello ${enhancedCustomerInfo.firstName} ${enhancedCustomerInfo.lastName},

      Your tickets for ${eventTitle} have been confirmed!

      Event Details:
      - Event: ${eventDetails.title}
      - Date: ${eventDetails.date}
      - Venue: ${eventDetails.venue}
      - Address: ${eventDetails.address}
      - Phone: ${enhancedCustomerInfo.phone}
      - License Plate: ${enhancedCustomerInfo.licensePlate || 'Not provided'}
      - Tickets: ${totalTickets} × $${getTicketPrice(totalTickets).toFixed(2)} = $${getSubtotal(totalTickets).toFixed(2)}
      ${isFreeTicket ? '- Discount Applied: FREE TICKET' : ''}
      - Convenience Fee: $${getConvenienceFee(totalTickets).toFixed(2)}
      - Payment Processing: $${getProcessingFee(totalTickets).toFixed(2)}
      - HST (13% on base price): $${getHST(totalTickets).toFixed(2)}
      - Total: $${totalAmount}

      Entry QR Code:
      Your QR code is attached to this email. Present it at the event entrance.

      QR Code contains:
      - Secure Booking ID and Security Token
      - Your name: ${enhancedCustomerInfo.firstName} ${enhancedCustomerInfo.lastName}
      - Email: ${enhancedCustomerInfo.email}
      - Phone: ${enhancedCustomerInfo.phone}
      - License Plate: ${enhancedCustomerInfo.licensePlate || 'Not provided'}
      - Ticket details and payment information

      Payment ID: ${paymentIntentId}
      Purchase Date: ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}

      Important:
      ${importantNotes.map(note => `- ${note}`).join('\n      ')}

      Contact: info@catchtheevent.com

      Catch The Event
    `

    // Send email
    const msg = {
      to: customerInfo.email,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@catchtheevent.com',
      subject: `${eventEmoji} ${eventTitle} - ${isFreeTicket ? 'Free Ticket' : 'Ticket'} Confirmation (${paymentIntentId})`,
      text: emailText,
      html: emailHtml,
      attachments: [
        {
          content: qrCodeDataUrl.split(',')[1], // Remove data:image/png;base64, prefix
          filename: `ticket-qr-${paymentIntentId}.png`,
          type: 'image/png',
          disposition: 'attachment'
        }
      ]
    }

    console.log(`Sending email to ${customerInfo.email} with QR code attachment`)

    await sgMail.send(msg)

    // Mark this email as sent
    sentEmails.add(emailKey)

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully' 
    })
  } catch (error: any) {
    console.error('Error sending email:', error)
    
    // Handle specific SendGrid errors
    if (error.code === 401) {
      return NextResponse.json(
        { error: 'Invalid SendGrid API key. Please check your configuration.' },
        { status: 401 }
      )
    } else if (error.code === 403) {
      return NextResponse.json(
        { error: 'SendGrid API key does not have permission to send emails.' },
        { status: 403 }
      )
    } else {
      return NextResponse.json(
        { error: `Failed to send email: ${error.message || 'Unknown error'}` },
        { status: 500 }
      )
    }
  }
} 