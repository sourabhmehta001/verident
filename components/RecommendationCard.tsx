'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Star, Check, Award, Sparkles, Leaf, Recycle, Info, AlertCircle, RefreshCw, ShoppingCart, Plus, CheckCircle } from 'lucide-react'
import { Logo } from './Logo'
import { Product, Recommendation } from '@/lib/store'
import { brandInfo, disclaimer } from '@/lib/data'
import { useCartStore } from '@/lib/cartStore'

interface ExtendedRecommendation extends Recommendation {
  primaryIssue?: string
  issueLabel?: string
  disclaimer?: string
  alternatives?: {
    toothpaste?: any
    toothbrush?: any
  }
}

interface RecommendationCardProps {
  recommendation: ExtendedRecommendation
  onReset: () => void
}

function ProductCard({ 
  product, 
  rank, 
  showAlternative,
  alternative,
  onRequestAlternative 
}: { 
  product: Product & { ingredients?: string[]; material?: string; packaging?: string; whyItWorks?: string; tradeOffs?: string }
  rank: number
  showAlternative?: boolean
  alternative?: any
  onRequestAlternative?: () => void
}) {
  const [showDetails, setShowDetails] = useState(false)
  const [added, setAdded] = useState(false)
  const { addItem, items } = useCartStore()
  const isToothpaste = product.type === 'toothpaste'
  
  const isInCart = items.some(item => item.product.id === product.id)

  const handleAddToCart = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1 }}
      className="bg-white rounded-2xl p-5 shadow-lg border hover:shadow-xl transition-all duration-300"
      style={{ borderColor: '#BFE6D3', boxShadow: '0 4px 14px rgba(111, 175, 142, 0.15)' }}
    >
      {rank === 0 && (
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
                style={{ background: 'linear-gradient(135deg, #8B7CF6 0%, #6FAF8E 100%)' }}>
            <Award className="w-3 h-3" />
            TimTim's TOP PICK
          </span>
          <span className="text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1"
                style={{ background: '#BFE6D3', color: '#2E2E2E' }}>
            <Leaf className="w-3 h-3" />
            100% Vegan
          </span>
          <span className="text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1"
                style={{ background: '#F6F8F7', color: '#6FAF8E', border: '1px solid #BFE6D3' }}>
            <Recycle className="w-3 h-3" />
            Sustainable
          </span>
        </div>
      )}

      <div className="flex gap-4">
        <div className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl flex-shrink-0 border"
             style={{ background: 'linear-gradient(135deg, #F6F8F7 0%, #BFE6D3 100%)', borderColor: '#BFE6D3' }}>
          {isToothpaste ? '🧴' : '🎋'}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-lg leading-tight" style={{ color: '#2E2E2E' }}>{product.name}</h4>
          <p className="text-sm font-medium flex items-center gap-1" style={{ color: '#6FAF8E' }}>
            {product.brand}
          </p>

          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < product.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>

          <p className="text-sm mt-2" style={{ color: '#4a4a4a' }}>{product.description}</p>

          {/* Features */}
          <div className="flex flex-wrap gap-1 mt-3">
            {product.features.map((feature, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full"
                style={{ background: '#BFE6D3', color: '#2E2E2E' }}
              >
                <Check className="w-3 h-3" style={{ color: '#6FAF8E' }} />
                {feature}
              </span>
            ))}
          </div>

          {/* Why It Works - Explainability */}
          {product.whyItWorks && (
            <div className="mt-3 p-3 rounded-lg border" style={{ background: '#F6F8F7', borderColor: '#BFE6D3' }}>
              <p className="text-xs font-semibold mb-1 flex items-center gap-1" style={{ color: '#8B7CF6' }}>
                <Sparkles className="w-3 h-3" />
                Why This Works For You
              </p>
              <p className="text-xs" style={{ color: '#4a4a4a' }}>{product.whyItWorks}</p>
            </div>
          )}

          {/* Trade-offs - Transparency */}
          {product.tradeOffs && (
            <div className="mt-2 p-2 rounded-lg" style={{ background: '#FEF3C7' }}>
              <p className="text-xs flex items-center gap-1" style={{ color: '#92400E' }}>
                <Info className="w-3 h-3" />
                <span className="font-medium">Trade-off:</span> {product.tradeOffs}
              </p>
            </div>
          )}

          {/* Ingredients / Material */}
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="mt-2 text-xs font-medium flex items-center gap-1 hover:underline"
            style={{ color: '#4A90E2' }}
          >
            {showDetails ? '▼' : '▶'} {isToothpaste ? 'View Ingredients' : 'View Materials'}
          </button>
          
          {showDetails && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-2 p-2 rounded-lg" 
              style={{ background: '#F6F8F7' }}
            >
              {product.ingredients && (
                <p className="text-xs" style={{ color: '#4a4a4a' }}>{product.ingredients.join(' • ')}</p>
              )}
              {product.material && (
                <p className="text-xs" style={{ color: '#4a4a4a' }}>{product.material}</p>
              )}
              {product.packaging && (
                <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#6FAF8E' }}>
                  <Recycle className="w-3 h-3" /> {product.packaging}
                </p>
              )}
            </motion.div>
          )}

          <div className="mt-3 pt-3 border-t flex items-center justify-between" style={{ borderColor: '#BFE6D3' }}>
            <span className="text-xl font-bold" style={{ color: '#6FAF8E' }}>{product.price}</span>
            
            {/* Add to Cart Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={added}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all
                ${added || isInCart 
                  ? 'bg-green-100 text-green-700' 
                  : 'text-white hover:opacity-90'}`}
              style={!added && !isInCart ? { background: 'linear-gradient(135deg, #6FAF8E 0%, #4A90E2 100%)' } : {}}
            >
              {added ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Added!
                </>
              ) : isInCart ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  In Cart
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add to Cart
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function RecommendationCard({ recommendation, onReset }: RecommendationCardProps) {
  const { items, getTotal } = useCartStore()
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Issue Identified Badge */}
      {recommendation.issueLabel && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                style={{ background: '#8B7CF6', color: 'white' }}>
            🎯 Primary Issue Identified: {recommendation.issueLabel}
          </span>
        </motion.div>
      )}

      {/* AI Advice Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 text-white shadow-xl"
        style={{ background: 'linear-gradient(135deg, #8B7CF6 0%, #6FAF8E 100%)' }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center p-1">
            <Logo size="md" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{brandInfo.agentName}'s Analysis</h3>
            <p className="text-white/80 text-sm">Personalized recommendation for your needs</p>
          </div>
        </div>
        <p className="text-white/95 leading-relaxed">{recommendation.advice}</p>
      </motion.div>

      {/* Sustainability Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border"
        style={{ background: '#BFE6D3', borderColor: '#6FAF8E' }}
      >
        <Leaf className="w-5 h-5" style={{ color: '#6FAF8E' }} />
        <span className="text-sm font-medium" style={{ color: '#2E2E2E' }}>
          100% Vegan • Aluminium Tubes • Bamboo Handles • Cruelty-Free
        </span>
        <Recycle className="w-5 h-5" style={{ color: '#6FAF8E' }} />
      </motion.div>

      {/* Toothpaste Recommendations */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#2E2E2E' }}>
          <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#BFE6D3' }}>🧴</span>
          Recommended Toothpaste
        </h3>
        <div className="space-y-4">
          {recommendation.toothpaste.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product as any} 
              rank={index}
              alternative={recommendation.alternatives?.toothpaste}
              onRequestAlternative={recommendation.alternatives?.toothpaste ? () => {} : undefined}
            />
          ))}
        </div>
      </div>

      {/* Toothbrush Recommendations */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#2E2E2E' }}>
          <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#BFE6D3' }}>🎋</span>
          Recommended Bamboo Toothbrush
        </h3>
        <div className="space-y-4">
          {recommendation.toothbrush.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product as any} 
              rank={index}
              alternative={recommendation.alternatives?.toothbrush}
              onRequestAlternative={recommendation.alternatives?.toothbrush ? () => {} : undefined}
            />
          ))}
        </div>
      </div>

      {/* Cart Summary - Shows when items are added */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="sticky bottom-4 z-10"
          >
            <Link href="/cart">
              <div className="bg-white rounded-2xl p-4 shadow-xl border flex items-center justify-between"
                   style={{ borderColor: '#6FAF8E', boxShadow: '0 8px 30px rgba(111, 175, 142, 0.3)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center relative"
                       style={{ background: 'linear-gradient(135deg, #6FAF8E 0%, #4A90E2 100%)' }}>
                    <ShoppingCart className="w-6 h-6 text-white" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white"
                          style={{ background: '#8B7CF6' }}>
                      {itemCount}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold" style={{ color: '#2E2E2E' }}>{itemCount} item{itemCount > 1 ? 's' : ''} in cart</p>
                    <p className="text-sm" style={{ color: '#6FAF8E' }}>₹{getTotal()} total</p>
                  </div>
                </div>
                <button className="px-6 py-3 rounded-xl text-white font-semibold"
                        style={{ background: 'linear-gradient(135deg, #6FAF8E 0%, #4A90E2 100%)' }}>
                  View Cart →
                </button>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-4 rounded-xl border flex items-start gap-3"
        style={{ background: '#FEF3C7', borderColor: '#FCD34D' }}
      >
        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#92400E' }} />
        <div>
          <p className="text-xs font-medium" style={{ color: '#92400E' }}>Important Note</p>
          <p className="text-xs" style={{ color: '#78350F' }}>
            {recommendation.disclaimer || disclaimer.text}
          </p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onReset}
          className="flex-1 py-4 px-6 rounded-xl bg-white border font-semibold transition-colors hover:bg-gray-50"
          style={{ borderColor: '#BFE6D3', color: '#6FAF8E' }}
        >
          🔄 Start Over
        </button>
        <button
          className="flex-1 py-4 px-6 rounded-xl bg-white border font-semibold transition-colors hover:bg-gray-50"
          style={{ borderColor: '#4A90E2', color: '#4A90E2' }}
        >
          📤 Share Results
        </button>
      </div>
    </motion.div>
  )
}
