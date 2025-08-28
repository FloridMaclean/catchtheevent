import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'

export async function GET() {
  try {
    // Test 1: Basic connection
    console.log('Testing Supabase connection...')
    
    // Test 2: Check if tables exist
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('count')
      .limit(1)
    
    if (usersError) {
      console.error('Users table error:', usersError)
      return NextResponse.json({
        success: false,
        error: 'Users table not accessible',
        details: usersError.message
      }, { status: 500 })
    }

    // Test 3: Check discount codes
    const { data: discountCodes, error: discountError } = await supabase
      .from('discount_codes')
      .select('code, used, max_usage')
      .limit(5)
    
    if (discountError) {
      console.error('Discount codes error:', discountError)
      return NextResponse.json({
        success: false,
        error: 'Discount codes table not accessible',
        details: discountError.message
      }, { status: 500 })
    }

    // Test 4: Check AMBE100 usage
    const { data: ambe100Usage, error: ambe100Error } = await supabase
      .from('ambe100_usage')
      .select('*')
      .limit(1)
    
    if (ambe100Error) {
      console.error('AMBE100 usage error:', ambe100Error)
      return NextResponse.json({
        success: false,
        error: 'AMBE100 usage table not accessible',
        details: ambe100Error.message
      }, { status: 500 })
    }

    // Test 5: Check newsletter subscriptions
    const { data: subscriptions, error: subscriptionError } = await supabase
      .from('newsletter_subscriptions')
      .select('count')
      .limit(1)
    
    if (subscriptionError) {
      console.error('Newsletter subscriptions error:', subscriptionError)
      return NextResponse.json({
        success: false,
        error: 'Newsletter subscriptions table not accessible',
        details: subscriptionError.message
      }, { status: 500 })
    }

    console.log('✅ All Supabase tests passed!')

    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful!',
      data: {
        usersTable: '✅ Accessible',
        discountCodes: discountCodes?.length || 0,
        ambe100Usage: ambe100Usage,
        newsletterSubscriptions: '✅ Accessible'
      }
    })

  } catch (error) {
    console.error('Supabase test error:', error)
    return NextResponse.json({
      success: false,
      error: 'Supabase connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { testType, data } = body

    switch (testType) {
      case 'create_user':
        // Test creating a user
        const { data: newUser, error: userError } = await supabase
          .from('users')
          .insert([{
            first_name: data.first_name || 'Test',
            last_name: data.last_name || 'User',
            email: data.email || 'test@example.com',
            user_type: 'subscriber'
          }])
          .select()
          .single()

        if (userError) throw userError

        return NextResponse.json({
          success: true,
          message: 'User created successfully',
          data: newUser
        })

      case 'create_newsletter_subscription':
        // Test creating a newsletter subscription
        const { data: newSubscription, error: subError } = await supabase
          .from('newsletter_subscriptions')
          .insert([{
            user_id: data.user_id,
            status: 'active'
          }])
          .select()
          .single()

        if (subError) throw subError

        return NextResponse.json({
          success: true,
          message: 'Newsletter subscription created successfully',
          data: newSubscription
        })

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid test type'
        }, { status: 400 })
    }

  } catch (error) {
    console.error('Supabase POST test error:', error)
    return NextResponse.json({
      success: false,
      error: 'Test operation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
