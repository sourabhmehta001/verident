'use client'

import { useState } from 'react'
import Image from 'next/image'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizes = {
  sm: { width: 28, height: 28 },
  md: { width: 48, height: 48 },
  lg: { width: 64, height: 64 },
  xl: { width: 96, height: 96 },
}

// Clear SVG Tooth Logo Fallback
function FallbackLogo({ width, height }: { width: number; height: number }) {
  return (
    <div 
      className="rounded-xl flex items-center justify-center overflow-hidden"
      style={{ 
        width, 
        height, 
        background: 'linear-gradient(135deg, #6FAF8E 0%, #4A90E2 100%)',
        padding: width * 0.1,
      }}
    >
      <svg 
        viewBox="0 0 64 64" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Tooth shape */}
        <path 
          d="M32 4C24 4 18 8 16 14C14 20 14 26 16 32C18 38 18 44 16 52C14 58 18 60 22 58C26 56 26 48 28 42C30 36 34 36 36 42C38 48 38 56 42 58C46 60 50 58 48 52C46 44 46 38 48 32C50 26 50 20 48 14C46 8 40 4 32 4Z" 
          fill="white"
          stroke="white"
          strokeWidth="2"
        />
        {/* Shine effect */}
        <ellipse 
          cx="26" 
          cy="18" 
          rx="4" 
          ry="6" 
          fill="rgba(255,255,255,0.4)"
        />
        {/* Arms - Left */}
        <path 
          d="M12 24C8 22 4 26 6 30C8 34 14 32 16 28" 
          stroke="white" 
          strokeWidth="3" 
          strokeLinecap="round"
          fill="none"
        />
        {/* Arms - Right */}
        <path 
          d="M52 24C56 22 60 26 58 30C56 34 50 32 48 28" 
          stroke="white" 
          strokeWidth="3" 
          strokeLinecap="round"
          fill="none"
        />
        {/* Bicep bumps */}
        <circle cx="8" cy="26" r="3" fill="white" />
        <circle cx="56" cy="26" r="3" fill="white" />
      </svg>
    </div>
  )
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const [error, setError] = useState(false)
  const { width, height } = sizes[size]
  
  if (error) {
    return <FallbackLogo width={width} height={height} />
  }
  
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width, height }}>
      <Image
        src="/logo.png"
        alt="TimTim by Verident"
        width={width}
        height={height}
        className="object-contain"
        priority
        onError={() => setError(true)}
      />
    </div>
  )
}

export function LogoWithText({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  return (
    <div className="flex items-center gap-3">
      <Logo size={size} />
      <div>
        <h1 className="text-xl font-bold" style={{ color: '#6FAF8E' }}>TimTim</h1>
        <p className="text-xs flex items-center gap-1" style={{ color: '#4A90E2' }}>
          by Verident
        </p>
      </div>
    </div>
  )
}
