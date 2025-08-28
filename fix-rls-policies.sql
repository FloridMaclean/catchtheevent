-- Fix Row Level Security (RLS) policies for the Catch The Event database

-- Drop existing policies first
DROP POLICY IF EXISTS "Allow public read access to discount codes" ON discount_codes;
DROP POLICY IF EXISTS "Allow public insert for newsletter subscriptions" ON newsletter_subscriptions;
DROP POLICY IF EXISTS "Allow public insert for users" ON users;
DROP POLICY IF EXISTS "Allow public update for discount codes" ON discount_codes;
DROP POLICY IF EXISTS "Allow public update for ambe100_usage" ON ambe100_usage;

-- Users table policies
CREATE POLICY "Allow public insert for users" ON users
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to users" ON users
    FOR SELECT USING (true);

CREATE POLICY "Allow public update for users" ON users
    FOR UPDATE USING (true);

-- Newsletter subscriptions table policies
CREATE POLICY "Allow public insert for newsletter subscriptions" ON newsletter_subscriptions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to newsletter subscriptions" ON newsletter_subscriptions
    FOR SELECT USING (true);

CREATE POLICY "Allow public update for newsletter subscriptions" ON newsletter_subscriptions
    FOR UPDATE USING (true);

-- Ticket purchases table policies
CREATE POLICY "Allow public insert for ticket purchases" ON ticket_purchases
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to ticket purchases" ON ticket_purchases
    FOR SELECT USING (true);

CREATE POLICY "Allow public update for ticket purchases" ON ticket_purchases
    FOR UPDATE USING (true);

-- Discount codes table policies
CREATE POLICY "Allow public read access to discount codes" ON discount_codes
    FOR SELECT USING (true);

CREATE POLICY "Allow public update for discount codes" ON discount_codes
    FOR UPDATE USING (true);

-- AMBE100 usage table policies
CREATE POLICY "Allow public read access to ambe100_usage" ON ambe100_usage
    FOR SELECT USING (true);

CREATE POLICY "Allow public update for ambe100_usage" ON ambe100_usage
    FOR UPDATE USING (true);

-- Allow public insert for ambe100_usage (in case it's empty)
CREATE POLICY "Allow public insert for ambe100_usage" ON ambe100_usage
    FOR INSERT WITH CHECK (true);
