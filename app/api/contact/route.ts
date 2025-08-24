import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if SendGrid API key is configured
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Prepare email content
    const emailContent = {
      to: 'info@catchtheevent.com',
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@catchtheevent.com',
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #374151;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>This message was sent from the Catch The Event contact form.</p>
            <p>Submitted on: ${new Date().toLocaleString('en-US', { 
              timeZone: 'America/Toronto',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })} EST</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Contact Information:
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from the Catch The Event contact form.
Submitted on: ${new Date().toLocaleString('en-US', { 
  timeZone: 'America/Toronto',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})} EST
      `
    }

    // Send email
    await sgMail.send(emailContent)

    // Send confirmation email to the user
    const confirmationEmail = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@catchtheevent.com',
      subject: 'Thank you for contacting Catch The Event',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
            Thank you for contacting us!
          </h2>
          
          <p style="color: #374151; line-height: 1.6;">
            Dear ${name},
          </p>
          
          <p style="color: #374151; line-height: 1.6;">
            Thank you for reaching out to Catch The Event. We have received your message and will get back to you within 24 hours.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your Message Details</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p style="background-color: #fff; padding: 15px; border-radius: 4px; border-left: 4px solid #f59e0b;">
              ${message.replace(/\n/g, '<br>')}
            </p>
          </div>
          
          <p style="color: #374151; line-height: 1.6;">
            If you have any urgent questions, please don't hesitate to email us directly at 
            <a href="mailto:info@catchtheevent.com" style="color: #f59e0b;">info@catchtheevent.com</a>
          </p>
          
          <p style="color: #374151; line-height: 1.6;">
            Best regards,<br>
            The Catch The Event Team
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>This is an automated confirmation email. Please do not reply to this message.</p>
          </div>
        </div>
      `,
      text: `
Thank you for contacting us!

Dear ${name},

Thank you for reaching out to Catch The Event. We have received your message and will get back to you within 24 hours.

Your Message Details:
Subject: ${subject}
Message: ${message}

If you have any urgent questions, please don't hesitate to email us directly at info@catchtheevent.com

Best regards,
The Catch The Event Team

---
This is an automated confirmation email. Please do not reply to this message.
      `
    }

    await sgMail.send(confirmationEmail)

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error sending contact form email:', error)
    
    // Check for specific SendGrid errors
    if (error instanceof Error) {
      if (error.message.includes('401')) {
        return NextResponse.json(
          { error: 'Email service authentication failed' },
          { status: 500 }
        )
      }
      if (error.message.includes('403')) {
        return NextResponse.json(
          { error: 'Email service access denied' },
          { status: 500 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
} 