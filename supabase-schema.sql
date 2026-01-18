-- Smile Please Database Schema
-- Run this in your Supabase SQL Editor to create all tables

-- Categories (Sensitivity, Gum Health, etc.)
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Questions
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  type TEXT DEFAULT 'choice',
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Answer Options
CREATE TABLE IF NOT EXISTS answer_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  emoji TEXT,
  score INT DEFAULT 0,
  profile_key TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Brands
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  description TEXT,
  trust_score INT DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('toothpaste', 'toothbrush')),
  image_url TEXT,
  price TEXT,
  description TEXT,
  features JSONB DEFAULT '[]',
  best_for JSONB DEFAULT '[]',
  doctor_score INT DEFAULT 5,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recommendation Rules
CREATE TABLE IF NOT EXISTS rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  conditions JSONB NOT NULL DEFAULT '{}',
  recommended_toothpaste JSONB DEFAULT '[]',
  recommended_toothbrush JSONB DEFAULT '[]',
  advice TEXT,
  priority INT DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat Sessions (for analytics)
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  answers JSONB DEFAULT '{}',
  profile JSONB DEFAULT '{}',
  recommendations JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answer_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access on questions" ON questions FOR SELECT USING (true);
CREATE POLICY "Allow public read access on answer_options" ON answer_options FOR SELECT USING (true);
CREATE POLICY "Allow public read access on brands" ON brands FOR SELECT USING (true);
CREATE POLICY "Allow public read access on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access on rules" ON rules FOR SELECT USING (true);
CREATE POLICY "Allow public insert on sessions" ON sessions FOR INSERT WITH CHECK (true);

-- Insert sample data
-- Categories
INSERT INTO categories (name, icon, description, order_index) VALUES
('Tooth Sensitivity', '🦷', 'Understanding your sensitivity levels', 0),
('Gum Health', '🩸', 'Checking your gum condition', 1),
('Whitening & Appearance', '✨', 'Your aesthetic preferences', 2),
('Brushing Habits', '🪥', 'Understanding your routine', 3),
('Special Concerns', '💭', 'Any specific issues', 4);

-- Brands
INSERT INTO brands (name, description, trust_score) VALUES
('Sensodyne', 'Specialist in sensitivity care', 10),
('Colgate', 'Trusted oral care brand', 9),
('Parodontax', 'Expert in gum health', 9),
('Oral-B', 'Innovation in dental care', 9);

