import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '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', {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, customerInfo, selectedTickets, eventDetails } = body

    // Validate required fields
    if (!amount || !customerInfo || !selectedTickets || !eventDetails) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: 'cad',
      metadata: {
        customerEmail: customerInfo.email,
        customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
        customerPhone: customerInfo.phone,
        eventTitle: eventDetails.title,
        eventDate: eventDetails.date,
        tickets: JSON.stringify(selectedTickets),
        totalTickets: Object.values(selectedTickets).reduce((sum: number, count: any) => sum + (count as number), 0).toString(),
      },
      description: `Tickets for ${eventDetails.title} - ${customerInfo.firstName} ${customerInfo.lastName}`,
      receipt_email: customerInfo.email,
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error: any) {
    console.error('Error creating payment intent:', error)
    
    if (error.type === 'StripeCardError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    } else if (error.type === 'StripeInvalidRequestError') {
      return NextResponse.json(
        { error: 'Invalid request to Stripe' },
        { status: 400 }
      )
    } else {
      return NextResponse.json(
        { error: 'Failed to create payment intent' },
        { status: 500 }
      )
    }
  }
}
