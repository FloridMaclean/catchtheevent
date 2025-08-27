import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// File to store discount codes and their usage status
const DISCOUNT_CODES_FILE = path.join(process.cwd(), 'data', 'discount-codes.json')

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

// Add special AMBE100 code with usage limit
const addSpecialCodes = (codes: any[]) => {
  // Add AMBE100 code with usage limit of 100
  codes.push({
    code: 'AMBE100',
    used: false,
    usedBy: null,
    usedAt: null,
    createdAt: new Date().toISOString(),
    usageLimit: 100,
    usageCount: 0
  })
  
  return codes
}

// Load discount codes from file
const loadDiscountCodes = () => {
  ensureDataDirectory()
  
  if (!fs.existsSync(DISCOUNT_CODES_FILE)) {
    // Generate new codes if file doesn't exist
    const codes = generateDiscountCodes()
    const codesWithSpecial = addSpecialCodes(codes)
    fs.writeFileSync(DISCOUNT_CODES_FILE, JSON.stringify(codesWithSpecial, null, 2))
    return codesWithSpecial
  }
  
  try {
    const data = fs.readFileSync(DISCOUNT_CODES_FILE, 'utf8')
    const codes = JSON.parse(data)
    
    // Check if AMBE100 exists, if not add it
    const hasAmbe100 = codes.some((code: any) => code.code === 'AMBE100')
    if (!hasAmbe100) {
      const codesWithSpecial = addSpecialCodes(codes)
      fs.writeFileSync(DISCOUNT_CODES_FILE, JSON.stringify(codesWithSpecial, null, 2))
      return codesWithSpecial
    }
    
    return codes
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
  const codesWithSpecial = addSpecialCodes(codes)
  fs.writeFileSync(DISCOUNT_CODES_FILE, JSON.stringify(codesWithSpecial, null, 2))
  return codesWithSpecial
}

// Save discount codes to file
const saveDiscountCodes = (codes: any[]) => {
  ensureDataDirectory()
  fs.writeFileSync(DISCOUNT_CODES_FILE, JSON.stringify(codes, null, 2))
}

// Validate discount code
const validateDiscountCode = (code: string) => {
  const codes = loadDiscountCodes()
  const discountCode = codes.find(c => c.code === code.toUpperCase())
  
  if (!discountCode) {
    return { valid: false, message: 'Invalid discount code' }
  }
  
  // Special handling for AMBE100 with usage limit
  if (code.toUpperCase() === 'AMBE100') {
    if (discountCode.usageCount >= discountCode.usageLimit) {
      return { valid: false, message: 'AMBE100 discount code has reached its usage limit of 100 tickets' }
    }
    return { valid: true, discountCode }
  }
  
  // Regular codes (one-time use)
  if (discountCode.used) {
    return { valid: false, message: 'Discount code has already been used' }
  }
  
  return { valid: true, discountCode }
}

// Mark discount code as used
const markCodeAsUsed = (code: string, userEmail: string) => {
  const codes = loadDiscountCodes()
  const codeIndex = codes.findIndex(c => c.code === code.toUpperCase())
  
  if (codeIndex !== -1) {
    // Special handling for AMBE100 with usage limit
    if (code.toUpperCase() === 'AMBE100') {
      codes[codeIndex].usageCount = (codes[codeIndex].usageCount || 0) + 1
      codes[codeIndex].usedBy = userEmail
      codes[codeIndex].usedAt = new Date().toISOString()
      
      // Mark as used only if usage limit is reached
      if (codes[codeIndex].usageCount >= codes[codeIndex].usageLimit) {
        codes[codeIndex].used = true
      }
    } else {
      // Regular codes (one-time use)
      codes[codeIndex].used = true
      codes[codeIndex].usedBy = userEmail
      codes[codeIndex].usedAt = new Date().toISOString()
    }
    
    saveDiscountCodes(codes)
    return true
  }
  
  return false
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

export async function GET() {
  try {
    const codes = loadDiscountCodes()
    const unusedCodes = codes.filter(c => !c.used)
    const usedCodes = codes.filter(c => c.used)
    
    return NextResponse.json({
      total: codes.length,
      unused: unusedCodes.length,
      used: usedCodes.length,
      codes: codes.map(c => ({
        code: c.code,
        used: c.used,
        usedBy: c.used ? c.usedBy : null,
        usedAt: c.used ? c.usedAt : null,
        usageLimit: c.usageLimit || null,
        usageCount: c.usageCount || null
      }))
    })
  } catch (error) {
    console.error('Error getting discount codes:', error)
    return NextResponse.json({ error: 'Failed to load discount codes' }, { status: 500 })
  }
}
