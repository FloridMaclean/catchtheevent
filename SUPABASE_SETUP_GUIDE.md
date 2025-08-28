# 🚀 Supabase Setup Guide for Catch The Event

## 📋 Overview
This guide will help you set up Supabase as your centralized database for storing ticket buyer details, newsletter subscribers, and discount code information.

## 🎯 What We're Setting Up
- **Centralized Database**: PostgreSQL database with proper schema
- **User Management**: Store ticket buyers and newsletter subscribers
- **Ticket Purchases**: Track all ticket transactions
- **Discount Codes**: Manage AMBE100 and regular discount codes
- **Real-time Features**: Live updates for admin dashboard
- **Security**: Row Level Security (RLS) policies

## 📝 Step-by-Step Setup

### 1. Create Supabase Project

1. **Go to [supabase.com](https://supabase.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Fill in project details:**
   - **Name**: `catch-the-event`
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
5. **Click "Create new project"**
6. **Wait for setup** (2-3 minutes)

### 2. Get Your API Keys

1. **Go to Settings → API**
2. **Copy these values:**
   - **Project URL** (starts with `https://`)
   - **anon public** key (starts with `eyJ`)

### 3. Update Environment Variables

1. **Open your `.env.local` file**
2. **Add these lines:**
```env
NEXT_PUBLIC_SUPABASE_URL="your-project-url-here"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"
```

### 4. Set Up Database Schema

1. **Go to SQL Editor** in your Supabase dashboard
2. **Copy the entire content** from `supabase-schema.sql`
3. **Paste and run** the SQL commands
4. **Verify tables are created** in the Table Editor

### 5. Test the Connection

1. **Start your development server:**
```bash
npm run dev
```

2. **Check the console** for any connection errors
3. **Test the database** by visiting your app

## 🗄️ Database Schema Overview

### Tables Created:

#### **users**
- Stores all user information (ticket buyers + subscribers)
- Fields: `id`, `first_name`, `last_name`, `email`, `phone_number`, `user_type`

#### **ticket_purchases**
- Tracks all ticket transactions
- Fields: `user_id`, `event_name`, `ticket_type`, `quantity`, `total_amount`, `payment_status`

#### **newsletter_subscriptions**
- Manages newsletter subscriptions
- Fields: `user_id`, `subscribed_at`, `status`, `email_preferences`

#### **discount_codes**
- Handles discount code validation and usage
- Fields: `code`, `used`, `used_by`, `max_usage`, `current_usage`

#### **ambe100_usage**
- Tracks AMBE100 special discount usage
- Fields: `used_count`, `max_usage`, `usage_history`

## 🔒 Security Features

### Row Level Security (RLS)
- **Enabled on all tables** for data protection
- **Public policies** for necessary operations
- **Admin-only access** for sensitive data

### Policies Configured:
- ✅ **Public read access** to discount codes (for validation)
- ✅ **Public insert** for newsletter subscriptions
- ✅ **Public insert** for users
- ✅ **Public update** for discount codes and AMBE100 usage

## 📊 Data Migration

### From JSON Files to Database
The system will automatically migrate existing data:

1. **Newsletter subscribers** from `data/newsletter-subscribers.json`
2. **Discount codes** from `data/discount-codes.json`
3. **AMBE100 usage** from `data/ambe100-usage.json`

### Migration Process:
1. **API routes updated** to use Supabase
2. **Existing data preserved** during transition
3. **Gradual migration** to avoid downtime

## 🎛️ Admin Dashboard Features

### Real-time Updates
- **Live ticket sales** monitoring
- **Real-time subscriber count**
- **Instant discount code usage** updates

### Analytics Dashboard
- **Total revenue** tracking
- **Ticket sales** by status
- **User demographics** analysis
- **Discount code** performance

## 🔧 Troubleshooting

### Common Issues:

#### **Connection Errors**
```bash
# Check environment variables
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
```

#### **RLS Policy Errors**
- Verify policies are created in SQL Editor
- Check table permissions in Supabase dashboard

#### **Migration Issues**
- Ensure existing JSON files are readable
- Check database connection before migration

### Support Resources:
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Discord Community**: [discord.gg/supabase](https://discord.gg/supabase)
- **GitHub Issues**: [github.com/supabase/supabase](https://github.com/supabase/supabase)

## 🚀 Next Steps

After setup completion:

1. **Test all features** thoroughly
2. **Update API routes** to use Supabase
3. **Deploy to production** with new database
4. **Monitor performance** and usage
5. **Set up backups** and monitoring

## 📈 Performance Optimization

### Indexes Created:
- ✅ **Email lookups** for fast user searches
- ✅ **Payment status** for quick filtering
- ✅ **Event names** for ticket analytics
- ✅ **Discount codes** for validation

### Query Optimization:
- **Efficient joins** between users and purchases
- **Optimized aggregations** for analytics
- **Proper indexing** for common queries

## 🔐 Security Best Practices

1. **Never expose** service role key in frontend
2. **Use RLS policies** for data protection
3. **Validate inputs** before database operations
4. **Monitor access** through Supabase dashboard
5. **Regular backups** of critical data

---

## ✅ Setup Checklist

- [ ] Supabase project created
- [ ] API keys added to `.env.local`
- [ ] Database schema executed
- [ ] Tables verified in dashboard
- [ ] Connection tested locally
- [ ] Migration script ready
- [ ] Admin dashboard updated
- [ ] Security policies configured
- [ ] Performance monitoring set up

**🎉 Congratulations! Your centralized database is ready!**
