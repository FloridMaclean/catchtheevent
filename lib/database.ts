import { supabase } from './supabase'
import type { User, TicketPurchase, NewsletterSubscription, DiscountCode, Ambe100Usage } from './supabase'

// User operations
export const createUser = async (userData: Omit<User, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('users')
    .insert([userData])
    .select()
    .single()

  if (error) throw error
  return data
}

export const getUserByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows returned
  return data
}

export const updateUser = async (id: string, updates: Partial<User>) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

// Ticket purchase operations
export const createTicketPurchase = async (purchaseData: Omit<TicketPurchase, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('ticket_purchases')
    .insert([purchaseData])
    .select()
    .single()

  if (error) throw error
  return data
}

export const getTicketPurchasesByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from('ticket_purchases')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const updateTicketPurchaseStatus = async (id: string, status: TicketPurchase['payment_status']) => {
  const { data, error } = await supabase
    .from('ticket_purchases')
    .update({ payment_status: status })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

// Newsletter subscription operations
export const createNewsletterSubscription = async (subscriptionData: Omit<NewsletterSubscription, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('newsletter_subscriptions')
    .insert([subscriptionData])
    .select()
    .single()

  if (error) throw error
  return data
}

export const getNewsletterSubscriptions = async () => {
  const { data, error } = await supabase
    .from('newsletter_subscriptions')
    .select(`
      *,
      users (
        first_name,
        last_name,
        email
      )
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const unsubscribeFromNewsletter = async (userId: string) => {
  const { data, error } = await supabase
    .from('newsletter_subscriptions')
    .update({ status: 'unsubscribed' })
    .eq('user_id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Discount code operations
export const getDiscountCode = async (code: string) => {
  const { data, error } = await supabase
    .from('discount_codes')
    .select('*')
    .eq('code', code)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

export const updateDiscountCodeUsage = async (code: string, usedBy: string) => {
  const { data, error } = await supabase
    .from('discount_codes')
    .update({
      used: true,
      used_by: usedBy,
      used_at: new Date().toISOString(),
      current_usage: supabase.sql`current_usage + 1`
    })
    .eq('code', code)
    .select()
    .single()

  if (error) throw error
  return data
}

// AMBE100 usage operations
export const getAmbe100Usage = async () => {
  const { data, error } = await supabase
    .from('ambe100_usage')
    .select('*')
    .single()

  if (error) throw error
  return data
}

export const updateAmbe100Usage = async (usedBy: string) => {
  const { data, error } = await supabase
    .from('ambe100_usage')
    .update({
      used_count: supabase.sql`used_count + 1`,
      usage_history: supabase.sql`usage_history || jsonb_build_array(jsonb_build_object('used_by', ${usedBy}, 'used_at', ${new Date().toISOString()}))`,
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Analytics and reporting
export const getTicketPurchaseStats = async () => {
  const { data, error } = await supabase
    .from('ticket_purchases')
    .select('payment_status, total_amount, quantity')

  if (error) throw error

  const stats = {
    totalTickets: 0,
    totalRevenue: 0,
    completedPurchases: 0,
    pendingPurchases: 0,
    failedPurchases: 0
  }

  data?.forEach(purchase => {
    stats.totalTickets += purchase.quantity
    stats.totalRevenue += parseFloat(purchase.total_amount.toString())
    
    switch (purchase.payment_status) {
      case 'completed':
        stats.completedPurchases++
        break
      case 'pending':
        stats.pendingPurchases++
        break
      case 'failed':
        stats.failedPurchases++
        break
    }
  })

  return stats
}

export const getUserStats = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('user_type')

  if (error) throw error

  const stats = {
    totalUsers: data?.length || 0,
    ticketBuyers: data?.filter(user => user.user_type === 'ticket_buyer').length || 0,
    subscribers: data?.filter(user => user.user_type === 'subscriber').length || 0
  }

  return stats
}

// Migration helper to move existing data
export const migrateExistingData = async () => {
  // This function will help migrate existing JSON data to Supabase
  // Implementation will be added when we update the API routes
  console.log('Migration function ready - will be implemented when updating API routes')
}
