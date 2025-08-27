import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protected routes that require authentication
const PROTECTED_ROUTES = [
  '/admin',
  '/api/send-email',
  '/api/create-payment-intent'
]

// Admin-only API actions
const ADMIN_API_ACTIONS = ['regenerate', 'get']

// Public routes that should always be accessible
const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/accessibility',
  '/community',
  '/api/auth'
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes
  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Check if it's a protected route
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route))
  
  if (isProtectedRoute) {
    // For API routes, check for admin session
    if (pathname.startsWith('/api/')) {
      const adminSession = request.cookies.get('admin_session')
      
      if (!adminSession?.value) {
        return NextResponse.json(
          { error: 'Unauthorized access' },
          { status: 401 }
        )
      }
    }
    
    // For admin pages, redirect to login if not authenticated
    if (pathname.startsWith('/admin')) {
      const adminSession = request.cookies.get('admin_session')
      
      if (!adminSession?.value) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
    }
  }

  // Special handling for discount-codes API - allow public access for validation/use
  if (pathname === '/api/discount-codes' && request.method === 'POST') {
    try {
      const body = await request.clone().json()
      const { action } = body
      
      // If it's an admin action, require authentication
      if (ADMIN_API_ACTIONS.includes(action)) {
        const adminSession = request.cookies.get('admin_session')
        
        if (!adminSession?.value) {
          return NextResponse.json(
            { error: 'Unauthorized access' },
            { status: 401 }
          )
        }
      }
    } catch (error) {
      // If we can't parse the body, allow the request to continue
      // The API will handle the error appropriately
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
