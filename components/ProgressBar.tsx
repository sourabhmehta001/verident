'use client'

import { motion } from 'framer-motion'
import { categories } from '@/lib/data'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b px-4 py-3" style={{ borderColor: '#BFE6D3' }}>
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #6FAF8E 0%, #4A90E2 50%, #8B7CF6 100%)' }}
          />
        </div>

        {/* Category indicators */}
        <div className="flex justify-between">
          {categories.map((category, index) => {
            const isActive = index === currentStep
            const isComplete = index < currentStep

            return (
              <div
                key={category.id}
                className={`flex flex-col items-center transition-all duration-300 ${
                  isActive ? 'scale-110' : ''
                }`}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-300"
                  style={
                    isComplete
                      ? { background: '#6FAF8E', color: 'white' }
                      : isActive
                      ? { background: '#BFE6D3', color: '#6FAF8E', boxShadow: '0 0 0 2px #6FAF8E, 0 0 0 4px white' }
                      : { background: '#F6F8F7', color: '#999' }
                  }
                >
                  {isComplete ? '✓' : category.icon}
                </div>
                <span
                  className="text-[10px] mt-1 font-medium transition-colors duration-300 hidden sm:block"
                  style={{ color: isActive ? '#6FAF8E' : '#999' }}
                >
                  {category.name.split(' ')[0]}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
