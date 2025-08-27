import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DISCOUNT_CODES_FILE = path.join(process.cwd(), 'data', 'discount-codes.json')
const AMBE100_USAGE_FILE = path.join(process.cwd(), 'data', 'ambe100-usage.json')

// Rate limiting configuration
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '50')
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

// Load discount codes from file
const loadDiscountCodes = () => {
  try {
    if (!fs.existsSync(DISCOUNT_CODES_FILE)) {
      return []
    }
    const data = fs.readFileSync(DISCOUNT_CODES_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error loading discount codes:', error)
    return []
  }
}

// Load AMBE100 usage counter
const loadAmbe100Usage = () => {
  try {
    if (!fs.existsSync(AMBE100_USAGE_FILE)) {
      return { usedCount: 0, maxUsage: 100 }
    }
    const data = fs.readFileSync(AMBE100_USAGE_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error loading AMBE100 usage:', error)
    return { usedCount: 0, maxUsage: 100 }
  }
}

// Validate discount code (public endpoint)
const validateDiscountCode = (code: string) => {
  // Special handling for AMBE100
  if (code === 'AMBE100') {
    const usage = loadAmbe100Usage()
    if (usage.usedCount >= usage.maxUsage) {
      return {
        valid: false,
        message: 'AMBE100 discount code has reached its maximum usage limit (100 tickets)'
      }
    }
    return {
      valid: true,
      discountCode: {
        code: 'AMBE100',
        remainingUses: usage.maxUsage - usage.usedCount,
        maxUsage: usage.maxUsage
      }
    }
  }
  
  // Regular discount codes
  const codes = loadDiscountCodes()
  const discountCode = codes.find(c => c.code === code)
  
  if (!discountCode) {
    return {
      valid: false,
      message: 'Invalid discount code'
    }
  }
  
  if (discountCode.used) {
    return {
      valid: false,
      message: 'Discount code has already been used'
    }
  }
  
  return {
    valid: true,
    discountCode: {
      code: discountCode.code,
      valid: true
    }
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

    const body = await request.json()
    const { code } = body
    
    if (!code) {
      return NextResponse.json(
        { error: 'Discount code is required' },
        { status: 400 }
      )
    }

    const result = validateDiscountCode(code)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Discount validation API error:', error)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}
