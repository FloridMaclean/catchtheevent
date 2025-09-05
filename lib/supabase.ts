import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  phone_number?: string
  license_plate?: string
  created_at: string
  updated_at: string
  user_type: 'ticket_buyer' | 'subscriber'
}

export interface TicketPurchase {
  id: string
  user_id: string
  event_name: string
  ticket_type: string
  quantity: number
  total_amount: number
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
  discount_code?: string
  purchase_date: string
  qr_code_url?: string
  booking_id?: string
  security_token?: string
  qr_generated_at?: string
  qr_used?: boolean
  qr_used_at?: string
}

export interface NewsletterSubscription {
  id: string
  user_id: string
  subscribed_at: string
  status: 'active' | 'unsubscribed'
  email_preferences?: any
}

export interface DiscountCode {
  id: string
  code: string
  used: boolean
  used_by?: string
  used_at?: string
  created_at: string
  max_usage?: number
  current_usage?: number
}

export interface Ambe100Usage {
  id: string
  used_count: number
  max_usage: number
  usage_history: Array<{
    used_by: string
    used_at: string
  }>
  updated_at: string
}
