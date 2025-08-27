import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DISCOUNT_CODES_FILE = path.join(process.cwd(), 'data', 'discount-codes.json')
const AMBE100_USAGE_FILE = path.join(process.cwd(), 'data', 'ambe100-usage.json')

// Ensure data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.dirname(DISCOUNT_CODES_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Generate 100 unique 6-character alphanumeric discount codes
const generateDiscountCodes = () => {
  const codes = new Set<string>()
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  
  while (codes.size < 100) {
    let code = ''
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    codes.add(code)
  }
  
  return Array.from(codes).map(code => ({
    code,
    used: false,
    usedBy: null,
    usedAt: null,
    createdAt: new Date().toISOString()
  }))
}

// Load discount codes from file
const loadDiscountCodes = () => {
  ensureDataDirectory()
  
  if (!fs.existsSync(DISCOUNT_CODES_FILE)) {
    // Generate new codes if file doesn't exist
    const codes = generateDiscountCodes()
    fs.writeFileSync(DISCOUNT_CODES_FILE, JSON.stringify(codes, null, 2))
    return codes
  }
  
  try {
    const data = fs.readFileSync(DISCOUNT_CODES_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error loading discount codes:', error)
    return []
  }
}

// Force regenerate discount codes (delete existing and create new)
const regenerateDiscountCodes = () => {
  ensureDataDirectory()
  
  // Delete existing file if it exists
  if (fs.existsSync(DISCOUNT_CODES_FILE)) {
    fs.unlinkSync(DISCOUNT_CODES_FILE)
  }
  
  // Generate new codes
  const codes = generateDiscountCodes()
  fs.writeFileSync(DISCOUNT_CODES_FILE, JSON.stringify(codes, null, 2))
  return codes
}

// Save discount codes to file
const saveDiscountCodes = (codes: any[]) => {
  ensureDataDirectory()
  fs.writeFileSync(DISCOUNT_CODES_FILE, JSON.stringify(codes, null, 2))
}

// Load AMBE100 usage counter
const loadAmbe100Usage = () => {
  ensureDataDirectory()
  
  if (!fs.existsSync(AMBE100_USAGE_FILE)) {
    const usage = {
      usedCount: 0,
      maxUsage: 100,
      usageHistory: []
    }
    fs.writeFileSync(AMBE100_USAGE_FILE, JSON.stringify(usage, null, 2))
    return usage
  }
  
  try {
    const data = fs.readFileSync(AMBE100_USAGE_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error loading AMBE100 usage:', error)
    return { usedCount: 0, maxUsage: 100, usageHistory: [] }
  }
}

// Save AMBE100 usage counter
const saveAmbe100Usage = (usage: any) => {
  ensureDataDirectory()
  fs.writeFileSync(AMBE100_USAGE_FILE, JSON.stringify(usage, null, 2))
}

// Validate discount code
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
        used: false,
        usedBy: null,
        usedAt: null,
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
    discountCode
  }
}

// Mark code as used
const markCodeAsUsed = (code: string, userEmail: string) => {
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

export async function GET() {
  try {
    const codes = loadDiscountCodes()
    const ambe100Usage = loadAmbe100Usage()
    
    const usedCodes = codes.filter(c => c.used)
    const unusedCodes = codes.filter(c => !c.used)
    
    return NextResponse.json({
      total: codes.length,
      unused: unusedCodes.length,
      used: usedCodes.length,
      ambe100: {
        usedCount: ambe100Usage.usedCount,
        maxUsage: ambe100Usage.maxUsage,
        remainingUses: ambe100Usage.maxUsage - ambe100Usage.usedCount,
        usageHistory: ambe100Usage.usageHistory
      },
      codes: unusedCodes
    })
  } catch (error) {
    console.error('Error getting discount codes:', error)
    return NextResponse.json({ error: 'Failed to load discount codes' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, action, userEmail } = body
    
    if (action === 'validate') {
      const result = validateDiscountCode(code)
      return NextResponse.json(result)
    }
    
    if (action === 'use') {
      const validation = validateDiscountCode(code)
      if (!validation.valid) {
        return NextResponse.json(validation)
      }
      
      const success = markCodeAsUsed(code, userEmail)
      if (success) {
        return NextResponse.json({ 
          valid: true, 
          message: 'Discount code applied successfully',
          used: true 
        })
      } else {
        return NextResponse.json({ 
          valid: false, 
          message: 'Failed to apply discount code' 
        })
      }
    }
    
    if (action === 'regenerate') {
      const codes = regenerateDiscountCodes()
      return NextResponse.json({ 
        success: true, 
        message: 'Discount codes regenerated successfully',
        total: codes.length
      })
    }
    
    return NextResponse.json({ valid: false, message: 'Invalid action' })
  } catch (error) {
    console.error('Discount code API error:', error)
    return NextResponse.json({ valid: false, message: 'Server error' }, { status: 500 })
  }
}
