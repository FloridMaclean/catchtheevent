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

    // Test 5: Check newsletter subscriptions with user details
    const { data: subscriptions, error: subscriptionError } = await supabase
      .from('newsletter_subscriptions')
      .select(`
        *,
        users (
          email,
          first_name,
          last_name
        )
      `)
      .limit(5)
    
    if (subscriptionError) {
      console.error('Newsletter subscriptions error:', subscriptionError)
      return NextResponse.json({
        success: false,
        error: 'Newsletter subscriptions table not accessible',
        details: subscriptionError.message
      }, { status: 500 })
    }

    // Test 6: Get user count
    const { count: userCount, error: userCountError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
    
    if (userCountError) {
      console.error('User count error:', userCountError)
    }

    // Test 7: Get subscription count
    const { count: subscriptionCount, error: subscriptionCountError } = await supabase
      .from('newsletter_subscriptions')
      .select('*', { count: 'exact', head: true })
    
    if (subscriptionCountError) {
      console.error('Subscription count error:', subscriptionCountError)
    }

    console.log('✅ All Supabase tests passed!')

    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful!',
      data: {
        usersTable: '✅ Accessible',
        userCount: userCount || 0,
        discountCodes: discountCodes?.length || 0,
        ambe100Usage: ambe100Usage?.length || 0,
        newsletterSubscriptions: '✅ Accessible',
        subscriptionCount: subscriptionCount || 0,
        recentSubscriptions: subscriptions?.slice(0, 3) || []
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

        if (userError) {
          console.error('User creation error:', userError)
          return NextResponse.json({
            success: false,
            error: 'Failed to create user',
            details: userError.message
          }, { status: 500 })
        }

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

        if (subError) {
          console.error('Subscription creation error:', subError)
          return NextResponse.json({
            success: false,
            error: 'Failed to create subscription',
            details: subError.message
          }, { status: 500 })
        }

        return NextResponse.json({
          success: true,
          message: 'Newsletter subscription created successfully',
          data: newSubscription
        })

      case 'debug_newsletter':
        // Debug newsletter subscription process
        const email = data.email || 'debug@example.com'
        
        // Step 1: Check if user exists
        const { data: existingUser, error: userCheckError } = await supabase
          .from('users')
          .select('*')
          .eq('email', email)
          .single()
        
        if (userCheckError && userCheckError.code !== 'PGRST116') {
          return NextResponse.json({
            success: false,
            error: 'User check failed',
            details: userCheckError.message
          }, { status: 500 })
        }

        let userId: string

        if (existingUser) {
          userId = existingUser.id
        } else {
          // Create new user
          const { data: newUser, error: createUserError } = await supabase
            .from('users')
            .insert([{
              first_name: email.split('@')[0],
              last_name: '',
              email: email,
              user_type: 'subscriber'
            }])
            .select()
            .single()

          if (createUserError) {
            return NextResponse.json({
              success: false,
              error: 'Failed to create user',
              details: createUserError.message
            }, { status: 500 })
          }

          userId = newUser.id
        }

        // Step 2: Create subscription
        const { data: subscription, error: subCreateError } = await supabase
          .from('newsletter_subscriptions')
          .insert([{
            user_id: userId,
            status: 'active'
          }])
          .select()
          .single()

        if (subCreateError) {
          return NextResponse.json({
            success: false,
            error: 'Failed to create subscription',
            details: subCreateError.message
          }, { status: 500 })
        }

        return NextResponse.json({
          success: true,
          message: 'Debug newsletter process completed',
          data: {
            user: existingUser || { id: userId, email },
            subscription
          }
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
