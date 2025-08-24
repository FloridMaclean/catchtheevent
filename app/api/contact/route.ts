import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

// Rate limiting configuration
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '10')
const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000') // 15 minutes

// In-memory rate limiting store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(ip)
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false
  }
  
  record.count++
  return true
}

// Input validation
function validateContactForm(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long')
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email address is required')
  }
  
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long')
  }
  
  if (data.message && data.message.length > 1000) {
    errors.push('Message must be less than 1000 characters')
  }
  
  // Check for potential spam indicators
  if (data.message && (data.message.includes('http://') || data.message.includes('https://'))) {
    errors.push('Links are not allowed in messages')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }
    
    // Validate request method
    if (request.method !== 'POST') {
      return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
      )
    }
    
    // Parse and validate request body
    const body = await request.json()
    
    // Input validation
    const validation = validateContactForm(body)
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      )
    }
    
    // Sanitize inputs
    const { name, email, message, phone, subject } = body
    const sanitizedName = name.trim().substring(0, 100)
    const sanitizedEmail = email.trim().toLowerCase()
    const sanitizedMessage = message.trim().substring(0, 1000)
    const sanitizedPhone = phone ? phone.trim().substring(0, 20) : ''
    const sanitizedSubject = subject ? subject.trim().substring(0, 200) : 'Contact Form Submission'
    
    // Configure SendGrid
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')
    
    // Email to admin
    const adminEmail = {
      to: 'info@catchtheevent.com',
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@catchtheevent.com',
      subject: `New Contact Form Submission: ${sanitizedSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> ${sanitizedEmail}</p>
            ${sanitizedPhone ? `<p><strong>Phone:</strong> ${sanitizedPhone}</p>` : ''}
            <p><strong>Subject:</strong> ${sanitizedSubject}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
              ${sanitizedMessage.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            <p>This message was sent from the contact form on catchtheevent.com</p>
            <p>IP Address: ${ip}</p>
            <p>Timestamp: ${new Date().toISOString()}</p>
          </div>
        </div>
      `
    }
    
    // Confirmation email to user
    const userEmail = {
      to: sanitizedEmail,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@catchtheevent.com',
      subject: 'Thank you for contacting Catch The Event',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for contacting us!</h2>
          <p>Dear ${sanitizedName},</p>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Message:</h3>
            <p><strong>Subject:</strong> ${sanitizedSubject}</p>
            <div style="background-color: white; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
              ${sanitizedMessage.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p>In the meantime, you can:</p>
          <ul>
            <li>Visit our <a href="https://catchtheevent.com" style="color: #007bff;">website</a> for more information</li>
            <li>Check out our upcoming events</li>
            <li>Follow us on social media for updates</li>
          </ul>
          <p>Best regards,<br>The Catch The Event Team</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            <p>This is an automated response. Please do not reply to this email.</p>
            <p>If you have any urgent questions, please don't hesitate to email us directly at info@catchtheevent.com</p>
          </div>
        </div>
      `
    }
    
    // Send emails
    await Promise.all([
      sgMail.send(adminEmail),
      sgMail.send(userEmail)
    ])
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message. We will get back to you soon!' 
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Contact form error:', error)
    
    return NextResponse.json(
      { 
        error: 'An error occurred while sending your message. Please try again later.' 
      },
      { status: 500 }
    )
  }
} 