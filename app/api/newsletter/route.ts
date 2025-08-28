import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import sgMail from '@sendgrid/mail'

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

const NEWSLETTER_FILE = path.join(process.cwd(), 'data', 'newsletter-subscribers.json')

// Rate limiting configuration
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '5')
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

// Ensure data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.dirname(NEWSLETTER_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Load newsletter subscribers
const loadSubscribers = () => {
  ensureDataDirectory()
  
  if (!fs.existsSync(NEWSLETTER_FILE)) {
    return []
  }
  
  try {
    const data = fs.readFileSync(NEWSLETTER_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error loading newsletter subscribers:', error)
    return []
  }
}

// Save newsletter subscribers
const saveSubscribers = (subscribers: any[]) => {
  ensureDataDirectory()
  fs.writeFileSync(NEWSLETTER_FILE, JSON.stringify(subscribers, null, 2))
}

// Send welcome email
const sendWelcomeEmail = async (email: string) => {
  try {
    const msg = {
      to: email,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || 'noreply@catchtheevent.com',
        name: process.env.SENDGRID_FROM_NAME || 'Catch The Event'
      },
      subject: 'Welcome to Catch The Event Newsletter! 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <!-- Catch The Event Logo -->
            <div style="margin-bottom: 20px;">
              <div style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 18px 32px; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.2); box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3); backdrop-filter: blur(10px);">
                <span style="font-size: 26px; font-weight: 700; color: white; text-shadow: 0 2px 8px rgba(0,0,0,0.2); letter-spacing: 0.5px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  Catch The Event
                </span>
              </div>
            </div>
            <h1 style="margin: 0; font-size: 28px; color: white;">🎉 Welcome to Catch The Event!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">You're now part of our exclusive community!</p>
          </div>
          
          <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="margin: 0 0 15px 0; font-size: 20px;">What's Next?</h2>
            <ul style="margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">🎫 Get early access to exclusive events</li>
              <li style="margin-bottom: 8px;">💎 Receive special discounts and offers</li>
              <li style="margin-bottom: 8px;">📢 Stay updated with the latest announcements</li>
              <li style="margin-bottom: 8px;">🎭 Be the first to know about new shows</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="margin: 0; font-size: 14px; opacity: 0.8;">
              Thank you for subscribing to our newsletter!<br>
              We're excited to share amazing events with you.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.2);">
            <!-- Footer Logo -->
            <div style="margin-bottom: 15px;">
              <div style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 10px 20px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 4px 16px rgba(102, 126, 234, 0.25); backdrop-filter: blur(8px);">
                <span style="font-size: 16px; font-weight: 600; color: white; text-shadow: 0 1px 4px rgba(0,0,0,0.15); letter-spacing: 0.3px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                  Catch The Event
                </span>
              </div>
            </div>
            <p style="margin: 0; font-size: 12px; opacity: 0.7;">
              Catch The Event Team<br>
              <a href="mailto:info@catchtheevent.com" style="color: white;">info@catchtheevent.com</a>
            </p>
          </div>
        </div>
      `,
      text: `
Welcome to Catch The Event! 🎉

You're now part of our exclusive community!

What's Next?
• 🎫 Get early access to exclusive events
• 💎 Receive special discounts and offers
• 📢 Stay updated with the latest announcements
• 🎭 Be the first to know about new shows

Thank you for subscribing to our newsletter!
We're excited to share amazing events with you.

Catch The Event Team
info@catchtheevent.com
      `
    }

    await sgMail.send(msg)
    return true
  } catch (error) {
    console.error('Error sending welcome email:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many subscription attempts. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Load existing subscribers
    const subscribers = loadSubscribers()
    
    // Check if email already exists
    const existingSubscriber = subscribers.find((sub: any) => sub.email.toLowerCase() === email.toLowerCase())
    
    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'This email address is already subscribed to our newsletter' },
        { status: 409 }
      )
    }

    // Add new subscriber
    const newSubscriber = {
      email: email.toLowerCase(),
      subscribedAt: new Date().toISOString(),
      status: 'active'
    }

    subscribers.push(newSubscriber)
    saveSubscribers(subscribers)

    // Send welcome email (don't block the response if it fails)
    sendWelcomeEmail(email).catch(error => {
      console.error('Failed to send welcome email:', error)
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to our newsletter! Welcome aboard! 🎉'
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const subscribers = loadSubscribers()
    
    return NextResponse.json({
      total: subscribers.length,
      active: subscribers.filter((sub: any) => sub.status === 'active').length,
      subscribers: subscribers.map((sub: any) => ({
        email: sub.email,
        subscribedAt: sub.subscribedAt,
        status: sub.status
      }))
    })
  } catch (error) {
    console.error('Error getting newsletter subscribers:', error)
    return NextResponse.json(
      { error: 'Failed to load subscribers' },
      { status: 500 }
    )
  }
}
