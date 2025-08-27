import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import crypto from 'crypto'

// In production, these should be environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'rangtaali2025'
const SESSION_SECRET = process.env.SESSION_SECRET || 'rangtaali-secret-key-2025'

// Generate session token
const generateSessionToken = () => {
  return crypto.randomBytes(32).toString('hex')
}

// Verify session token
const verifySessionToken = (token: string) => {
  // In production, you'd want to store sessions in a database
  // For now, we'll use a simple approach with cookies
  return token && token.length === 64
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, username, password } = body

    if (action === 'login') {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const sessionToken = generateSessionToken()
        
        // Set secure cookie
        const response = NextResponse.json({ 
          success: true, 
          message: 'Login successful' 
        })
        
        response.cookies.set('admin_session', sessionToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 // 24 hours
        })
        
        return response
      } else {
        return NextResponse.json({ 
          success: false, 
          message: 'Invalid credentials' 
        }, { status: 401 })
      }
    }

    if (action === 'logout') {
      const response = NextResponse.json({ 
        success: true, 
        message: 'Logout successful' 
      })
      
      response.cookies.delete('admin_session')
      return response
    }

    return NextResponse.json({ 
      success: false, 
      message: 'Invalid action' 
    }, { status: 400 })
  } catch (error) {
    console.error('Auth API error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Server error' 
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('admin_session')?.value

    if (verifySessionToken(sessionToken)) {
      return NextResponse.json({ 
        authenticated: true 
      })
    } else {
      return NextResponse.json({ 
        authenticated: false 
      }, { status: 401 })
    }
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json({ 
      authenticated: false 
    }, { status: 401 })
  }
}
