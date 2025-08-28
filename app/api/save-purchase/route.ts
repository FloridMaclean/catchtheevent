import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'
import { createUser, createTicketPurchase, getUserByEmail } from '../../../lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      customerInfo,
      selectedTickets,
      eventDetails,
      isFreeTicket,
      totalAmount,
      paymentStatus,
      discountCode,
      stripePaymentIntentId,
      qrCodeDataUrl
    } = body

    // Validate required fields
    if (!customerInfo || !selectedTickets || !eventDetails) {
      return NextResponse.json({
        success: false,
        error: 'Missing required purchase data'
      }, { status: 400 })
    }

    // Check if user already exists in database
    let userId: string
    const existingUser = await getUserByEmail(customerInfo.email)
    
    if (existingUser) {
      userId = existingUser.id
    } else {
      // Create new user
      const newUser = await createUser({
        first_name: customerInfo.firstName,
        last_name: customerInfo.lastName,
        email: customerInfo.email,
        phone_number: customerInfo.phone,
        user_type: 'ticket_buyer'
      })
      
      if (!newUser) {
        throw new Error('Failed to create user')
      }
      
      userId = newUser.id
    }

    // Calculate total tickets
    const totalTickets = Object.values(selectedTickets).reduce((sum: number, count: number) => sum + count, 0)

    // Create ticket purchase record
    const purchaseData = {
      user_id: userId,
      event_name: eventDetails.title || 'RANGTAALI Hamilton 2025',
      ticket_type: Object.keys(selectedTickets).join(', '),
      quantity: totalTickets,
      total_amount: totalAmount,
      payment_status: paymentStatus,
      discount_code: discountCode,
      qr_code_url: qrCodeDataUrl,
      stripe_payment_intent_id: stripePaymentIntentId || null
    }

    const purchase = await createTicketPurchase(purchaseData)

    if (!purchase) {
      throw new Error('Failed to create ticket purchase record')
    }

    return NextResponse.json({
      success: true,
      message: 'Purchase data saved successfully',
      data: {
        purchaseId: purchase.id,
        userId: userId
      }
    })

  } catch (error) {
    console.error('Save purchase error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to save purchase data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
