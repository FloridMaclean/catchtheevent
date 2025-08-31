import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'

export async function POST() {
  try {
    console.log('Initializing database with required data...')

    // 1. Initialize AMBE100 usage table
    const { data: ambe100Data, error: ambe100Error } = await supabase
      .from('ambe100_usage')
      .select('*')
      .single()

    if (ambe100Error && ambe100Error.code === 'PGRST116') {
      // No data exists, create initial AMBE100 usage record
      console.log('Creating initial AMBE100 usage record...')
      const { data: newAmbe100, error: createAmbe100Error } = await supabase
        .from('ambe100_usage')
        .insert([{
          used_count: 0,
          max_usage: 100,
          usage_history: [],
          updated_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (createAmbe100Error) {
        console.error('Error creating AMBE100 usage record:', createAmbe100Error)
        return NextResponse.json({
          success: false,
          error: 'Failed to create AMBE100 usage record',
          details: createAmbe100Error
        }, { status: 500 })
      }

      console.log('✅ AMBE100 usage record created successfully')
    } else if (ambe100Error) {
      console.error('Error checking AMBE100 usage:', ambe100Error)
      return NextResponse.json({
        success: false,
        error: 'Failed to check AMBE100 usage',
        details: ambe100Error
      }, { status: 500 })
    } else {
      console.log('✅ AMBE100 usage record already exists')
    }

    // 2. Check if discount codes exist
    const { data: discountCodes, error: discountCodesError } = await supabase
      .from('discount_codes')
      .select('*')
      .eq('is_special', false)

    if (discountCodesError) {
      console.error('Error checking discount codes:', discountCodesError)
      return NextResponse.json({
        success: false,
        error: 'Failed to check discount codes',
        details: discountCodesError
      }, { status: 500 })
    }

    if (!discountCodes || discountCodes.length === 0) {
      // No discount codes exist, create 10 regular codes
      console.log('Creating 10 regular discount codes...')
      
      const regularCodes = []
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      
      for (let i = 0; i < 10; i++) {
        let code = ''
        for (let j = 0; j < 6; j++) {
          code += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        
        regularCodes.push({
          code,
          used: false,
          used_by: null,
          used_at: null,
          is_special: false,
          max_usage: 1,
          current_usage: 0,
          created_at: new Date().toISOString()
        })
      }

      const { data: newCodes, error: createCodesError } = await supabase
        .from('discount_codes')
        .insert(regularCodes)
        .select()

      if (createCodesError) {
        console.error('Error creating discount codes:', createCodesError)
        return NextResponse.json({
          success: false,
          error: 'Failed to create discount codes',
          details: createCodesError
        }, { status: 500 })
      }

      console.log('✅ 10 regular discount codes created successfully')
    } else {
      console.log(`✅ ${discountCodes.length} discount codes already exist`)
    }

    // 3. Verify the initialization
    const [finalAmbe100, finalCodes] = await Promise.all([
      supabase.from('ambe100_usage').select('*').single(),
      supabase.from('discount_codes').select('*').eq('is_special', false)
    ])

    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
      data: {
        ambe100: finalAmbe100.data,
        discountCodes: finalCodes.data,
        totalCodes: finalCodes.data?.length || 0
      }
    })

  } catch (error) {
    console.error('Database initialization error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to initialize database',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
