import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { supabase } from '../../../lib/supabase'

const DISCOUNT_CODES_FILE = path.join(process.cwd(), 'data', 'discount-codes.json')
const AMBE100_USAGE_FILE = path.join(process.cwd(), 'data', 'ambe100-usage.json')

// Rate limiting configuration
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '20')
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

// Save discount codes to file
const saveDiscountCodes = (codes: any[]) => {
  try {
    const dataDir = path.dirname(DISCOUNT_CODES_FILE)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    fs.writeFileSync(DISCOUNT_CODES_FILE, JSON.stringify(codes, null, 2))
  } catch (error) {
    console.error('Error saving discount codes:', error)
  }
}

// Load AMBE100 usage counter
const loadAmbe100Usage = () => {
  try {
    if (!fs.existsSync(AMBE100_USAGE_FILE)) {
      return { usedCount: 0, maxUsage: 100, usageHistory: [] }
    }
    const data = fs.readFileSync(AMBE100_USAGE_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error loading AMBE100 usage:', error)
    return { usedCount: 0, maxUsage: 100, usageHistory: [] }
  }
}

// Save AMBE100 usage counter
const saveAmbe100Usage = (usage: any) => {
  try {
    const dataDir = path.dirname(AMBE100_USAGE_FILE)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    fs.writeFileSync(AMBE100_USAGE_FILE, JSON.stringify(usage, null, 2))
  } catch (error) {
    console.error('Error saving AMBE100 usage:', error)
  }
}

// Mark code as used
const markCodeAsUsed = async (code: string, userEmail: string) => {
  try {
    // Special handling for AMBE100
    if (code === 'AMBE100') {
      const { data: ambe100Usage, error: ambe100Error } = await supabase
        .from('ambe100_usage')
        .select('*')
        .single()
      
      if (ambe100Error) {
        console.error('AMBE100 usage error:', ambe100Error)
        // Fallback to JSON file
        return markCodeAsUsedFallback(code, userEmail)
      }
      
      if (ambe100Usage.used_count >= ambe100Usage.max_usage) {
        return false
      }
      
      // Update AMBE100 usage in database
      const { error: updateError } = await supabase
        .from('ambe100_usage')
        .update({
          used_count: ambe100Usage.used_count + 1,
          usage_history: [...(ambe100Usage.usage_history || []), {
            usedBy: userEmail,
            usedAt: new Date().toISOString()
          }]
        })
        .eq('id', ambe100Usage.id)
      
      if (updateError) {
        console.error('AMBE100 update error:', updateError)
        return false
      }
      
      return true
    }
    
    // Regular discount codes
    const { data: discountCode, error: discountError } = await supabase
      .from('discount_codes')
      .select('*')
      .eq('code', code)
      .eq('is_special', false)
      .single()
    
    if (discountError) {
      console.error('Discount code lookup error:', discountError)
      // Fallback to JSON file
      return markCodeAsUsedFallback(code, userEmail)
    }
    
    if (!discountCode || discountCode.used) {
      return false
    }
    
    // Update discount code in database
    const { error: updateError } = await supabase
      .from('discount_codes')
      .update({
        used: true,
        used_by: userEmail,
        used_at: new Date().toISOString()
      })
      .eq('id', discountCode.id)
    
    if (updateError) {
      console.error('Discount code update error:', updateError)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Database mark code as used error, falling back to JSON:', error)
    return markCodeAsUsedFallback(code, userEmail)
  }
}

// Fallback function using JSON files
const markCodeAsUsedFallback = (code: string, userEmail: string) => {
  // Special handling for AMBE100
  if (code === 'AMBE100') {
    const usage = loadAmbe100Usage()
    if (usage.usedCount >= usage.maxUsage) {
      return false
    }
    
    usage.usedCount += 1
    usage.usageHistory.push({
      usedBy: userEmail,
      usedAt: new Date().toISOString()
    })
    
    saveAmbe100Usage(usage)
    return true
  }
  
  // Regular discount codes
  const codes = loadDiscountCodes()
  const discountCode = codes.find(c => c.code === code)
  
  if (!discountCode || discountCode.used) {
    return false
  }
  
  discountCode.used = true
  discountCode.usedBy = userEmail
  discountCode.usedAt = new Date().toISOString()
  
  saveDiscountCodes(codes)
  return true
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
    const { code, userEmail } = body
    
    if (!code || !userEmail) {
      return NextResponse.json(
        { error: 'Discount code and user email are required' },
        { status: 400 }
      )
    }

    const success = await markCodeAsUsed(code, userEmail)
    if (success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Discount code applied successfully'
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to apply discount code' 
      })
    }
  } catch (error) {
    console.error('Use discount API error:', error)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}
