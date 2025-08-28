# 🔧 Fix RLS Policies Guide

## Issue Identified
The Row Level Security (RLS) policies in your Supabase database are preventing data insertion. This is causing the newsletter subscription and other features to fail when trying to save data to the database.

## Solution
You need to run the `fix-rls-policies.sql` file in your Supabase SQL Editor to fix the RLS policies.

## Steps to Fix

### 1. Open Supabase Dashboard
- Go to [supabase.com](https://supabase.com)
- Sign in to your account
- Open your Catch The Event project

### 2. Navigate to SQL Editor
- Click on "SQL Editor" in the left sidebar
- Click "New query"

### 3. Run the Fix Script
- Copy the entire contents of `fix-rls-policies.sql`
- Paste it into the SQL Editor
- Click "Run" to execute the script

### 4. Verify the Fix
After running the script, test the newsletter subscription again:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"email":"test-after-fix@example.com"}' http://localhost:3000/api/newsletter
```

## What This Fix Does
- **Removes restrictive RLS policies** that were blocking data insertion
- **Creates comprehensive policies** that allow:
  - Public read access to all tables
  - Public insert access for users and subscriptions
  - Public update access for all tables
- **Maintains security** while allowing the application to function

## Expected Result
After running this fix:
- ✅ Newsletter subscriptions will save to both JSON and database
- ✅ User creation will work properly
- ✅ All API endpoints will function correctly
- ✅ Data will be stored in the centralized database

## Next Steps
Once the RLS policies are fixed:
1. Test the newsletter subscription
2. Verify data appears in the database
3. Continue with the gradual migration of other API routes
4. Eventually remove the JSON file fallback

## Troubleshooting
If you still encounter issues:
1. Check the Supabase logs for any errors
2. Verify the SQL script executed successfully
3. Test the database connection again
4. Check if the tables have the correct structure
