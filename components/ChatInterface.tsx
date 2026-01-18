'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { RotateCcw, Leaf, ShoppingCart } from 'lucide-react'
import { useChatStore } from '@/lib/store'
import { useCartStore } from '@/lib/cartStore'
import { Logo } from './Logo'
import { questions, greetings, transitions, categories, brandInfo } from '@/lib/data'
import { ChatMessage, TypingIndicator } from './ChatMessage'
import { RecommendationCard } from './RecommendationCard'
import { ProgressBar } from './ProgressBar'

export function ChatInterface() {
  const {
    messages,
    currentStep,
    totalSteps,
    userProfile,
    isTyping,
    recommendation,
    isComplete,
    addMessage,
    setTyping,
    updateProfile,
    updateAnswer,
    setStep,
    setRecommendation,
    setComplete,
    reset,
  } = useChatStore()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // Initialize chat with greeting
  useEffect(() => {
    if (!initialized.current && messages.length === 0) {
      initialized.current = true
      const greeting = greetings[Math.floor(Math.random() * greetings.length)]

      setTyping(true)
      setTimeout(() => {
        setTyping(false)
        addMessage({
          id: 'greeting',
          role: 'assistant',
          content: greeting,
        })

        // Ask first question after greeting
        setTimeout(() => {
          askQuestion(0)
        }, 500)
      }, 1000)
    }
  }, [messages.length])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  const askQuestion = (step: number) => {
    if (step >= questions.length) {
      generateRecommendation()
      return
    }

    const question = questions[step]
    setTyping(true)

    setTimeout(() => {
      setTyping(false)
      addMessage({
        id: `question-${question.id}`,
        role: 'assistant',
        content: question.text,
        options: question.options,
        type: 'options',
      })
    }, 800)
  }

  const handleOptionSelect = async (
    optionId: string,
    value: string,
    score: number,
    profileKey: string
  ) => {
    const question = questions[currentStep]
    const selectedOption = question.options.find((o) => o.id === optionId)

    // Add user's response
    addMessage({
      id: `answer-${optionId}`,
      role: 'user',
      content: selectedOption?.label || value,
    })

    // Update profile based on the answer
    // For Q1 (primary issue), set the corresponding issue score to 10
    if (question.id === 'q1') {
      // Map the value to the correct profile key
      const issueMapping: Record<string, string> = {
        'sensitivity': 'sensitivity',
        'plaque': 'plaque',
        'ulcers': 'ulcers',
        'badBreath': 'badBreath',
      }
      const issueKey = issueMapping[value]
      if (issueKey) {
        updateProfile(issueKey as any, 10)
      }
    } else if (profileKey && profileKey !== 'general' && profileKey !== 'brushStyle' && profileKey !== 'bristlePreference' && profileKey !== 'trigger') {
      updateProfile(profileKey as any, score)
    }
    updateAnswer(question.id, value)

    const nextStep = currentStep + 1
    setStep(nextStep)

    // Show transition message
    const category = categories.find((c) => c.id === question.categoryId)
    if (category) {
      setTyping(true)
      setTimeout(() => {
        setTyping(false)
        const transitionMsg = transitions[category.id as keyof typeof transitions]
        if (transitionMsg) {
          addMessage({
            id: `transition-${currentStep}`,
            role: 'assistant',
            content: transitionMsg,
          })
        }

        // Ask next question or generate recommendation
        setTimeout(() => {
          askQuestion(nextStep)
        }, 500)
      }, 600)
    } else {
      askQuestion(nextStep)
    }
  }

  const generateRecommendation = async () => {
    setTyping(true)
    addMessage({
      id: 'analyzing',
      role: 'assistant',
      content: '🌿 Analyzing your dental profile and finding the perfect sustainable products for you...',
    })

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'getRecommendation',
          profile: userProfile,
        }),
      })

      const data = await response.json()

      setTimeout(() => {
        setTyping(false)
        if (data.success) {
          setRecommendation(data.recommendation)
          setComplete(true)
          addMessage({
            id: 'complete',
            role: 'assistant',
            content: '🎋 Great news! I\'ve found the perfect Verident products for your sustainable smile!',
            type: 'recommendation',
          })
        }
      }, 1500)
    } catch (error) {
      setTyping(false)
      addMessage({
        id: 'error',
        role: 'assistant',
        content: 'Oops! Something went wrong. Please try again.',
      })
    }
  }

  const handleReset = () => {
    initialized.current = false
    reset()
  }

  const cartItemCount = useCartStore((state) => state.items.reduce((count, item) => count + item.quantity, 0))

  return (
    <div className="flex flex-col h-screen" style={{ background: 'linear-gradient(135deg, #F6F8F7 0%, #BFE6D3 50%, #F6F8F7 100%)' }}>
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b px-4 py-4 sticky top-0 z-50" style={{ borderColor: '#BFE6D3' }}>
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="md" />
            <div>
              <h1 className="text-xl font-bold" style={{ color: '#6FAF8E' }}>{brandInfo.agentName}</h1>
              <p className="text-xs flex items-center gap-1" style={{ color: '#4A90E2' }}>
                <Leaf className="w-3 h-3" />
                by {brandInfo.brandName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <button
                onClick={handleReset}
                className="p-2 rounded-xl transition-colors hover:bg-gray-100"
                style={{ color: '#6FAF8E' }}
                title="Start Over"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            )}
            
            {/* Cart Icon */}
            <Link href="/cart" className="relative p-2 rounded-xl transition-colors hover:bg-gray-100">
              <ShoppingCart className="w-5 h-5" style={{ color: '#6FAF8E' }} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white"
                      style={{ background: '#8B7CF6' }}>
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      {!isComplete && messages.length > 1 && (
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      )}

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onOptionSelect={handleOptionSelect}
              />
            ))}
          </AnimatePresence>

          {isTyping && <TypingIndicator />}

          {/* Recommendation Results */}
          {isComplete && recommendation && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <RecommendationCard recommendation={recommendation} onReset={handleReset} />
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t px-4 py-4" style={{ borderColor: '#BFE6D3' }}>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 text-center justify-center">
            <Leaf className="w-3 h-3" style={{ color: '#6FAF8E' }} />
            <span className="text-xs" style={{ color: '#6FAF8E' }}>
              {brandInfo.tagline} • 100% Sustainable Products
            </span>
            <Leaf className="w-3 h-3" style={{ color: '#6FAF8E' }} />
          </div>
        </div>
      </footer>
    </div>
  )
}
