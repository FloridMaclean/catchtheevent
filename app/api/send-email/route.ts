import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

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
      qrCodeDataUrl 
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

    const totalTickets = Object.values(selectedTickets).reduce((sum: number, count: any) => sum + (count as number), 0)
    // Calculate proper pricing for email
    const getTicketPrice = (totalTickets: number) => {
      if (totalTickets >= 10) {
        return 28.00
      } else if (totalTickets >= 5) {
        return 30.00
      } else {
        return 34.99
      }
    }

    const getSubtotal = (totalTickets: number) => {
      const pricePerTicket = getTicketPrice(totalTickets)
      return totalTickets * pricePerTicket
    }

    const getConvenienceFee = (totalTickets: number) => {
      return totalTickets * 1.00
    }

    const getProcessingFee = (totalTickets: number) => {
      return totalTickets * 1.10
    }

    const getHST = (totalTickets: number) => {
      const subtotal = getSubtotal(totalTickets)
      const convenienceFee = getConvenienceFee(totalTickets)
      const processingFee = getProcessingFee(totalTickets)
      return (subtotal + convenienceFee + processingFee) * 0.13
    }

    const totalAmount = (getSubtotal(totalTickets) + getConvenienceFee(totalTickets) + getProcessingFee(totalTickets) + getHST(totalTickets)).toFixed(2)

    // Create email HTML content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Rangtaali Hamilton 2025 - Ticket Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 500px; margin: 0 auto; background: #ffffff; }
          .header { background: linear-gradient(135deg, #ed7519, #0ea5e9); color: white; padding: 25px; text-align: center; }
          .content { padding: 25px; }
          .event-details { background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #ed7519; }
          .qr-section { text-align: center; margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 8px; }
          .important { background: #fff3cd; padding: 15px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #ffc107; }
          .footer { text-align: center; padding: 20px; background: #f8f9fa; color: #666; font-size: 12px; }
          .highlight { color: #ed7519; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">🎫 Rangtaali Hamilton 2025</h1>
            <p style="margin: 10px 0 0 0;">Ticket Confirmation</p>
          </div>
          
          <div class="content">
            <h2 style="margin-top: 0;">Hello ${customerInfo.firstName} ${customerInfo.lastName},</h2>
            
            <p>Your tickets for <span class="highlight">Rangtaali Hamilton 2025</span> have been confirmed!</p>
            
            <div class="event-details">
              <h3 style="margin-top: 0;">📅 Event Details</h3>
              <p><strong>Event:</strong> ${eventDetails.title}</p>
              <p><strong>Date:</strong> ${eventDetails.date}</p>
              <p><strong>Venue:</strong> ${eventDetails.venue}</p>
              <p><strong>Address:</strong> ${eventDetails.address}</p>
              <p><strong>Tickets:</strong> ${totalTickets} × $${getTicketPrice(totalTickets).toFixed(2)} = $${getSubtotal(totalTickets).toFixed(2)}</p>
              <p><strong>Convenience Fee:</strong> $${getConvenienceFee(totalTickets).toFixed(2)}</p>
              <p><strong>Payment Processing:</strong> $${getProcessingFee(totalTickets).toFixed(2)}</p>
              <p><strong>HST (13%):</strong> $${getHST(totalTickets).toFixed(2)}</p>
              <p><strong>Total:</strong> $${totalAmount}</p>
            </div>
            
            <div class="qr-section">
              <h3 style="margin-top: 0;">📱 Entry QR Code</h3>
              <p><strong>Your QR code is attached to this email. Present it at the event entrance.</strong></p>
              <p style="margin-top: 15px; font-size: 14px; color: #666;">
                <strong>Payment ID:</strong> ${paymentIntentId}<br>
                <strong>Purchase Date:</strong> ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            
            <div class="important">
              <h4 style="margin-top: 0;">📍 Important</h4>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Open Ground venue - wear proper footwear</li>
                <li>Bring QR code (digital or printed) for entry</li>
                <li>Event may change due to weather conditions</li>
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
      Rangtaali Hamilton 2025 - Ticket Confirmation

      Hello ${customerInfo.firstName} ${customerInfo.lastName},

      Your tickets for Rangtaali Hamilton 2025 have been confirmed!

      Event Details:
      - Event: ${eventDetails.title}
      - Date: ${eventDetails.date}
      - Venue: ${eventDetails.venue}
      - Address: ${eventDetails.address}
      - Tickets: ${totalTickets} × $${getTicketPrice(totalTickets).toFixed(2)} = $${getSubtotal(totalTickets).toFixed(2)}
      - Convenience Fee: $${getConvenienceFee(totalTickets).toFixed(2)}
      - Payment Processing: $${getProcessingFee(totalTickets).toFixed(2)}
      - HST (13%): $${getHST(totalTickets).toFixed(2)}
      - Total: $${totalAmount}

      Entry QR Code:
      Your QR code is attached to this email. Present it at the event entrance.

      Payment ID: ${paymentIntentId}
      Purchase Date: ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}

      Important:
      - Open Ground venue - wear proper footwear
      - Bring QR code (digital or printed) for entry
      - Event may change due to weather conditions

      Contact: info@catchtheevent.com

      Catch The Event
    `

    // Send email
    const msg = {
      to: customerInfo.email,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@catchtheevent.com',
      subject: `🎫 Rangtaali Hamilton 2025 - Ticket Confirmation (${paymentIntentId})`,
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