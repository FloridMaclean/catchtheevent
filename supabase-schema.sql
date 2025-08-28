-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (ticket buyers + subscribers)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_type VARCHAR(20) DEFAULT 'subscriber' CHECK (user_type IN ('ticket_buyer', 'subscriber'))
);

-- Ticket purchases table
CREATE TABLE ticket_purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  event_name VARCHAR(255) NOT NULL,
  ticket_type VARCHAR(100) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
  payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  discount_code VARCHAR(50),
  purchase_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  qr_code_url TEXT,
  stripe_payment_intent_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter subscriptions table
CREATE TABLE newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  email_preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Discount codes table
CREATE TABLE discount_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) UNIQUE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  used_by VARCHAR(255),
  used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  max_usage INTEGER DEFAULT 1,
  current_usage INTEGER DEFAULT 0,
  is_special BOOLEAN DEFAULT FALSE -- For AMBE100 type codes
);

-- AMBE100 usage tracking table
CREATE TABLE ambe100_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  used_count INTEGER DEFAULT 0,
  max_usage INTEGER DEFAULT 100,
  usage_history JSONB DEFAULT '[]',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_user_type ON users(user_type);
CREATE INDEX idx_ticket_purchases_user_id ON ticket_purchases(user_id);
CREATE INDEX idx_ticket_purchases_event_name ON ticket_purchases(event_name);
CREATE INDEX idx_ticket_purchases_payment_status ON ticket_purchases(payment_status);
CREATE INDEX idx_newsletter_subscriptions_user_id ON newsletter_subscriptions(user_id);
CREATE INDEX idx_newsletter_subscriptions_status ON newsletter_subscriptions(status);
CREATE INDEX idx_discount_codes_code ON discount_codes(code);
CREATE INDEX idx_discount_codes_used ON discount_codes(used);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to users table
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE ambe100_usage ENABLE ROW LEVEL SECURITY;

-- Allow public read access to discount codes (for validation)
CREATE POLICY "Allow public read access to discount codes" ON discount_codes
    FOR SELECT USING (true);

-- Allow public insert for newsletter subscriptions
CREATE POLICY "Allow public insert for newsletter subscriptions" ON newsletter_subscriptions
    FOR INSERT WITH CHECK (true);

-- Allow public insert for users
CREATE POLICY "Allow public insert for users" ON users
    FOR INSERT WITH CHECK (true);

-- Allow public update for discount codes
CREATE POLICY "Allow public update for discount codes" ON discount_codes
    FOR UPDATE USING (true);

-- Allow public update for ambe100_usage
CREATE POLICY "Allow public update for ambe100_usage" ON ambe100_usage
    FOR UPDATE USING (true);

-- Insert initial AMBE100 usage record
INSERT INTO ambe100_usage (used_count, max_usage, usage_history) 
VALUES (0, 100, '[]')
ON CONFLICT DO NOTHING;

-- Insert AMBE100 discount code
INSERT INTO discount_codes (code, used, max_usage, current_usage, is_special)
VALUES ('AMBE100', FALSE, 100, 0, TRUE)
ON CONFLICT (code) DO NOTHING;

-- Generate 10 regular discount codes
INSERT INTO discount_codes (code, used, max_usage, current_usage, is_special)
SELECT 
  'CODE' || LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0'),
  FALSE,
  1,
  0,
  FALSE
FROM generate_series(1, 10)
ON CONFLICT (code) DO NOTHING;
