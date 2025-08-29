import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'

export async function GET() {
  try {
    // Fetch all ticket purchases with user details
    const { data: purchases, error: purchasesError } = await supabase
      .from('ticket_purchases')
      .select(`
        *,
        users (
          first_name,
          last_name,
          email,
          phone_number
        )
      `)
      .order('created_at', { ascending: false })

    if (purchasesError) {
      console.error('Error fetching ticket purchases:', purchasesError)
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch ticket purchases'
      }, { status: 500 })
    }

    // Calculate statistics
    const totalTickets = purchases?.reduce((sum, purchase) => sum + purchase.quantity, 0) || 0
    const totalRevenue = purchases?.reduce((sum, purchase) => sum + purchase.total_amount, 0) || 0
    const totalPurchases = purchases?.length || 0
    const averageTicketPrice = totalTickets > 0 ? totalRevenue / totalTickets : 0
    
    const discountedTickets = purchases?.filter(p => p.discount_code).reduce((sum, purchase) => sum + purchase.quantity, 0) || 0
    const regularTickets = totalTickets - discountedTickets

    const stats = {
      totalTickets,
      totalRevenue,
      totalPurchases,
      averageTicketPrice,
      discountedTickets,
      regularTickets
    }

    return NextResponse.json({
      success: true,
      purchases: purchases || [],
      stats
    })

  } catch (error) {
    console.error('Ticket sales API error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch ticket sales data'
    }, { status: 500 })
  }
}
