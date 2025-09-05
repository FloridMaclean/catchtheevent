import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'
import { createUser, createTicketPurchase, getUserByEmail, updateUser } from '../../../lib/database'
import { createSecureQRData } from '../../../lib/security'

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

    console.log('Save purchase request:', {
      customerInfo: {
        firstName: customerInfo?.firstName,
        lastName: customerInfo?.lastName,
        email: customerInfo?.email,
        phone: customerInfo?.phone
      },
      isFreeTicket,
      discountCode,
      totalAmount
    })

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
      console.log('Existing user found:', {
        id: existingUser.id,
        firstName: existingUser.first_name,
        lastName: existingUser.last_name,
        phone: existingUser.phone_number
      })
      
      // Update user information if it's missing or different
      const updateData: any = {}
      if (!existingUser.first_name && customerInfo.firstName) updateData.first_name = customerInfo.firstName
      if (!existingUser.last_name && customerInfo.lastName) updateData.last_name = customerInfo.lastName
      if (!existingUser.phone_number && customerInfo.phone) updateData.phone_number = customerInfo.phone
      if (!existingUser.license_plate && customerInfo.licensePlate) updateData.license_plate = customerInfo.licensePlate
      
      if (Object.keys(updateData).length > 0) {
        console.log('Updating user with:', updateData)
        await updateUser(existingUser.id, updateData)
      }
    } else {
      // Create new user
      console.log('Creating new user with:', {
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        email: customerInfo.email,
        phone: customerInfo.phone,
        licensePlate: customerInfo.licensePlate
      })
      
      const newUser = await createUser({
        first_name: customerInfo.firstName,
        last_name: customerInfo.lastName,
        email: customerInfo.email,
        phone_number: customerInfo.phone,
        license_plate: customerInfo.licensePlate,
        user_type: 'ticket_buyer'
      })
      
      if (!newUser) {
        throw new Error('Failed to create user')
      }
      
      userId = newUser.id
      console.log('New user created with ID:', userId)
    }

    // Calculate total tickets
    const totalTickets = Object.values(selectedTickets).reduce((sum: number, count: any) => sum + (count as number), 0)

    // Generate secure booking data for QR code
    const secureQRData = createSecureQRData()
    
    // Create ticket purchase record
    const purchaseData = {
      user_id: userId,
      event_name: eventDetails.title || 'SPICE OF INDIA 2025',
      ticket_type: discountCode ? 'discounted_ticket' : Object.keys(selectedTickets).join(', '),
      quantity: totalTickets,
      total_amount: totalAmount,
      payment_status: paymentStatus,
      discount_code: discountCode,
      qr_code_url: qrCodeDataUrl,
      stripe_payment_intent_id: stripePaymentIntentId || null,
      purchase_date: new Date().toISOString(),
      booking_id: secureQRData.bookingId,
      security_token: secureQRData.token,
      qr_generated_at: secureQRData.timestamp
    }

    console.log('Creating ticket purchase with data:', purchaseData)
    
    const purchase = await createTicketPurchase(purchaseData)

    if (!purchase) {
      throw new Error('Failed to create ticket purchase record')
    }
    
    console.log('Ticket purchase created successfully:', purchase.id)

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
