import { NextRequest, NextResponse } from 'next/server'

// Admin credentials (in production, use environment variables)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

// Rate limiting configuration
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '100')
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

// Basic authentication function
function authenticateAdmin(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return false
  }
  
  const credentials = Buffer.from(authHeader.slice(6), 'base64').toString('utf-8')
  const [username, password] = credentials.split(':')
  
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

// Session-based authentication (simple implementation)
function checkSessionAuth(request: NextRequest): boolean {
  const sessionToken = request.cookies.get('admin-session')?.value
  
  if (!sessionToken) {
    return false
  }
  
  // In production, validate against a proper session store
  // For now, we'll use a simple token validation
  return sessionToken === 'valid-admin-session'
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  
  // Check rate limiting for all requests
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }
  
  // Protect admin routes
  if (pathname.startsWith('/admin/')) {
    // Check if user is authenticated
    if (!checkSessionAuth(request)) {
      // Redirect to admin login if not authenticated
      if (pathname !== '/admin/login') {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
    } else {
      // If authenticated and trying to access login page, redirect to admin dashboard
      if (pathname === '/admin/login') {
        return NextResponse.redirect(new URL('/admin/discount-codes', request.url))
      }
    }
  }
  
  // Protect sensitive API endpoints
  if (pathname.startsWith('/api/')) {
    // Allow public access to these endpoints
    const publicEndpoints = [
      '/api/contact',
      '/api/create-payment-intent',
      '/api/send-email',
      '/api/auth',
      '/api/validate-discount',
      '/api/use-discount',
      '/api/newsletter',
      '/api/test-supabase',
      '/api/save-purchase'
    ]
    
    if (publicEndpoints.includes(pathname)) {
      return NextResponse.next()
    }
    
    // Protect admin-only API endpoints - ALL ACCESS REQUIRES AUTHENTICATION
    if (pathname === '/api/discount-codes' || pathname === '/api/ticket-sales') {
      // Require authentication for ALL requests to admin APIs
      if (!checkSessionAuth(request)) {
        return NextResponse.json(
          { error: 'Unauthorized. Admin access required.' },
          { status: 401 }
        )
      }
    }
    
    // For all other API endpoints, require authentication
    if (!checkSessionAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*'
  ]
}
