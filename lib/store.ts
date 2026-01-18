import { create } from 'zustand'

export interface Message {
  id: string
  role: 'assistant' | 'user'
  content: string
  options?: AnswerOption[]
  type?: 'text' | 'options' | 'recommendation'
}

export interface AnswerOption {
  id: string
  label: string
  value: string
  emoji?: string
  score: number
  description?: string
}

export interface UserProfile {
  // Primary issues (scores)
  sensitivity: number
  plaque: number
  ulcers: number
  badBreath: number
  // Additional metrics
  frequency: number
  severity: number
  // Raw answers
  answers: Record<string, string>
}

export interface Product {
  id: string
  name: string
  brand: string
  type: 'toothpaste' | 'toothbrush'
  price: string
  image: string
  rating: number
  features: string[]
  bestFor?: string[]
  doctorScore: number
  description: string
  targetIssue?: string
}

export interface Recommendation {
  toothpaste: Product[]
  toothbrush: Product[]
  advice: string
  profile: UserProfile
  primaryIssue?: string
  issueLabel?: string
  alternatives?: {
    toothpaste?: Product
    toothbrush?: Product
  }
}

interface ChatState {
  messages: Message[]
  currentStep: number
  totalSteps: number
  userProfile: UserProfile
  isTyping: boolean
  recommendation: Recommendation | null
  isComplete: boolean
  
  addMessage: (message: Message) => void
  setTyping: (typing: boolean) => void
  updateProfile: (key: keyof UserProfile, value: number | string) => void
  updateAnswer: (questionId: string, answer: string) => void
  setStep: (step: number) => void
  setRecommendation: (rec: Recommendation) => void
  setComplete: (complete: boolean) => void
  reset: () => void
}

const initialProfile: UserProfile = {
  sensitivity: 0,
  plaque: 0,
  ulcers: 0,
  badBreath: 0,
  frequency: 0,
  severity: 0,
  answers: {},
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  currentStep: 0,
  totalSteps: 5,
  userProfile: initialProfile,
  isTyping: false,
  recommendation: null,
  isComplete: false,
  
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
    
  setTyping: (typing) => set({ isTyping: typing }),
  
  updateProfile: (key, value) =>
    set((state) => ({
      userProfile: { ...state.userProfile, [key]: value },
    })),
    
  updateAnswer: (questionId, answer) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        answers: { ...state.userProfile.answers, [questionId]: answer },
      },
    })),
    
  setStep: (step) => set({ currentStep: step }),
  
  setRecommendation: (rec) => set({ recommendation: rec }),
  
  setComplete: (complete) => set({ isComplete: complete }),
  
  reset: () =>
    set({
      messages: [],
      currentStep: 0,
      userProfile: initialProfile,
      isTyping: false,
      recommendation: null,
      isComplete: false,
    }),
}))
