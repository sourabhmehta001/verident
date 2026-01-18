'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Message } from '@/lib/store'
import { brandInfo } from '@/lib/data'
import { Logo } from './Logo'

interface ChatMessageProps {
  message: Message
  onOptionSelect?: (optionId: string, value: string, score: number, profileKey: string) => void
}

export function ChatMessage({ message, onOptionSelect }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={cn('flex w-full', isAssistant ? 'justify-start' : 'justify-end')}
    >
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-5 py-4',
          isAssistant
            ? 'bg-white shadow-lg border'
            : 'text-white shadow-lg'
        )}
        style={isAssistant 
          ? { borderColor: '#BFE6D3', boxShadow: '0 4px 14px rgba(111, 175, 142, 0.15)' }
          : { background: 'linear-gradient(135deg, #6FAF8E 0%, #4A90E2 100%)', boxShadow: '0 4px 14px rgba(74, 144, 226, 0.25)' }
        }
      >
        {isAssistant && (
          <div className="flex items-center gap-2 mb-2">
            <Logo size="sm" />
            <span className="text-xs font-medium uppercase tracking-wide" style={{ color: '#8B7CF6' }}>
              {brandInfo.agentName}
            </span>
          </div>
        )}

        <p className={cn('text-[15px] leading-relaxed', isAssistant ? '' : 'text-white')}
           style={isAssistant ? { color: '#2E2E2E' } : {}}>
          {message.content}
        </p>

        {message.options && message.options.length > 0 && (
          <div className="mt-4 space-y-2">
            {message.options.map((option, index) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
                onClick={() =>
                  onOptionSelect?.(
                    option.id,
                    option.value,
                    option.score,
                    (option as any).profileKey || 'general'
                  )
                }
                className="w-full text-left px-4 py-3 rounded-xl border 
                           transition-all duration-200 hover:shadow-md hover:scale-[1.02]
                           flex items-center gap-3 group"
                style={{ 
                  background: 'linear-gradient(135deg, #F6F8F7 0%, #BFE6D3 100%)',
                  borderColor: '#BFE6D3'
                }}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {option.emoji}
                </span>
                <span className="font-medium" style={{ color: '#2E2E2E' }}>{option.label}</span>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className="bg-white rounded-2xl px-5 py-4 shadow-lg border" style={{ borderColor: '#BFE6D3' }}>
        <div className="flex items-center gap-2">
          <Logo size="sm" />
          <div className="flex gap-1">
            <span className="typing-dot w-2 h-2 rounded-full" style={{ background: '#6FAF8E' }}></span>
            <span className="typing-dot w-2 h-2 rounded-full" style={{ background: '#6FAF8E' }}></span>
            <span className="typing-dot w-2 h-2 rounded-full" style={{ background: '#6FAF8E' }}></span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
