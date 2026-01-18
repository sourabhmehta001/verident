import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://akqhzqmuzpxjkhcmldnw.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_secret_XtuYRsYebGZ9V1HyfKonVw_8LYQSvb8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Category {
  id: string
  name: string
  icon: string
  description: string
  order_index: number
  created_at: string
}

export interface Question {
  id: string
  category_id: string
  text: string
  type: 'choice' | 'scale' | 'boolean'
  order_index: number
  is_active: boolean
  created_at: string
}

export interface AnswerOption {
  id: string
  question_id: string
  label: string
  value: string
  emoji: string
  score: number
  profile_key: string
  order_index: number
}

export interface Brand {
  id: string
  name: string
  logo_url: string
  description: string
  trust_score: number
  created_at: string
}

export interface Product {
  id: string
  brand_id: string
  name: string
  type: 'toothpaste' | 'toothbrush'
  image_url: string
  price: string
  description: string
  features: string[]
  best_for: string[]
  doctor_score: number
  is_active: boolean
  created_at: string
}

export interface Rule {
  id: string
  name: string
  conditions: Record<string, { min?: number; max?: number }>
  recommended_toothpaste: string[]
  recommended_toothbrush: string[]
  advice: string
  priority: number
  is_active: boolean
  created_at: string
}

export interface Session {
  id: string
  answers: Record<string, string>
  profile: Record<string, number>
  recommendations: {
    toothpaste: string[]
    toothbrush: string[]
  }
  created_at: string
}

