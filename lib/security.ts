import crypto from 'crypto'

// Secret key for HMAC generation (should be stored in environment variables)
const SECRET_KEY = process.env.QR_SECRET_KEY || 'default-secret-key-change-in-production'

/**
 * Generate a secure HMAC token for QR codes
 * @param bookingId - The unique booking identifier
 * @param timestamp - Timestamp when the token was generated
 * @returns HMAC token
 */
export const generateSecurityToken = (bookingId: string, timestamp: string): string => {
  const data = `${bookingId}:${timestamp}`
  return crypto.createHmac('sha256', SECRET_KEY).update(data).digest('hex')
}

/**
 * Verify a security token
 * @param bookingId - The booking identifier
 * @param timestamp - Timestamp when the token was generated
 * @param token - The token to verify
 * @returns boolean indicating if token is valid
 */
export const verifySecurityToken = (bookingId: string, timestamp: string, token: string): boolean => {
  const expectedToken = generateSecurityToken(bookingId, timestamp)
  return crypto.timingSafeEqual(Buffer.from(token, 'hex'), Buffer.from(expectedToken, 'hex'))
}

/**
 * Generate a unique booking ID
 * @returns Unique booking identifier
 */
export const generateBookingId = (): string => {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `BK${timestamp}${random}`.toUpperCase()
}

/**
 * Create secure QR code data
 * @param bookingId - The booking identifier
 * @returns Object containing booking ID, timestamp, and security token
 */
export const createSecureQRData = () => {
  const bookingId = generateBookingId()
  const timestamp = new Date().toISOString()
  const token = generateSecurityToken(bookingId, timestamp)
  
  return {
    bookingId,
    timestamp,
    token,
    qrData: `booking_id=${bookingId}&token=${token}&ts=${timestamp}`
  }
}

/**
 * Parse and verify QR code data
 * @param qrData - The QR code data string
 * @returns Parsed data or null if invalid
 */
export const parseAndVerifyQRData = (qrData: string) => {
  try {
    const params = new URLSearchParams(qrData)
    const bookingId = params.get('booking_id')
    const token = params.get('token')
    const timestamp = params.get('ts')
    
    if (!bookingId || !token || !timestamp) {
      return null
    }
    
    // Verify the token
    if (!verifySecurityToken(bookingId, timestamp, token)) {
      return null
    }
    
    return {
      bookingId,
      timestamp,
      token
    }
  } catch (error) {
    console.error('Error parsing QR data:', error)
    return null
  }
}
