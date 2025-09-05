import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'
import { parseAndVerifyQRData } from '../../../lib/security'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { qrData } = body

    if (!qrData) {
      return NextResponse.json({
        success: false,
        error: 'QR code data is required'
      }, { status: 400 })
    }

    // Parse and verify the QR code data
    const parsedData = parseAndVerifyQRData(qrData)
    
    if (!parsedData) {
      return NextResponse.json({
        success: false,
        error: 'Invalid or expired QR code',
        code: 'INVALID_QR'
      }, { status: 401 })
    }

    // Check if the booking exists in the database
    const { data: purchase, error } = await supabase
      .from('ticket_purchases')
      .select(`
        *,
        users (
          first_name,
          last_name,
          email,
          phone_number,
          license_plate
        )
      `)
      .eq('booking_id', parsedData.bookingId)
      .eq('security_token', parsedData.token)
      .eq('payment_status', 'completed')
      .single()

    if (error || !purchase) {
      return NextResponse.json({
        success: false,
        error: 'Booking not found or payment not completed',
        code: 'BOOKING_NOT_FOUND'
      }, { status: 404 })
    }

    // Check if the QR code has been used before (optional - for single-use tickets)
    if (purchase.qr_used) {
      return NextResponse.json({
        success: false,
        error: 'QR code has already been used',
        code: 'QR_ALREADY_USED'
      }, { status: 409 })
    }

    // Mark QR code as used (optional)
    await supabase
      .from('ticket_purchases')
      .update({ qr_used: true, qr_used_at: new Date().toISOString() })
      .eq('id', purchase.id)

    // Return successful verification with customer details
    return NextResponse.json({
      success: true,
      message: 'QR code verified successfully',
      data: {
        bookingId: parsedData.bookingId,
        customerName: `${purchase.users.first_name} ${purchase.users.last_name}`,
        customerEmail: purchase.users.email,
        customerPhone: purchase.users.phone_number,
        customerLicensePlate: purchase.users.license_plate,
        eventName: purchase.event_name,
        ticketType: purchase.ticket_type,
        quantity: purchase.quantity,
        purchaseDate: purchase.purchase_date,
        verifiedAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('QR verification error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to verify QR code',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// GET endpoint for testing QR code verification
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const qrData = searchParams.get('qr')
  
  if (!qrData) {
    return NextResponse.json({
      success: false,
      error: 'QR code data is required as query parameter'
    }, { status: 400 })
  }

  // Parse and verify the QR code data
  const parsedData = parseAndVerifyQRData(qrData)
  
  if (!parsedData) {
    return NextResponse.json({
      success: false,
      error: 'Invalid or expired QR code',
      code: 'INVALID_QR'
    }, { status: 401 })
  }

  return NextResponse.json({
    success: true,
    message: 'QR code format is valid',
    data: {
      bookingId: parsedData.bookingId,
      timestamp: parsedData.timestamp,
      token: parsedData.token
    }
  })
}
