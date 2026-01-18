'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  Leaf, 
  Recycle,
  Lock,
  CreditCard,
  Truck,
  Shield,
  AlertCircle
} from 'lucide-react'
import { useCartStore } from '@/lib/cartStore'
import { brandInfo } from '@/lib/data'
import { Logo } from '@/components/Logo'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const total = getTotal()
  const shipping = total > 0 ? 49 : 0
  const grandTotal = total + shipping

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #F6F8F7 0%, #BFE6D3 50%, #F6F8F7 100%)' }}>
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-50" style={{ borderColor: '#BFE6D3' }}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5" style={{ color: '#6FAF8E' }} />
            <span className="font-medium" style={{ color: '#6FAF8E' }}>Back to TIM TIM</span>
          </Link>
          <div className="flex items-center gap-2">
            <Logo size="md" />
            <span className="font-bold" style={{ color: '#6FAF8E' }}>{brandInfo.brandName}</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold mb-2" style={{ color: '#2E2E2E' }}>Your Cart</h1>
          <p className="text-sm mb-6" style={{ color: '#4a4a4a' }}>
            Review your personalized Verident bundle
          </p>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-12 text-center border"
              style={{ borderColor: '#BFE6D3' }}
            >
              <ShoppingBag className="w-16 h-16 mx-auto mb-4" style={{ color: '#BFE6D3' }} />
              <h2 className="text-xl font-bold mb-2" style={{ color: '#2E2E2E' }}>Your cart is empty</h2>
              <p className="mb-6" style={{ color: '#4a4a4a' }}>
                Let TIM TIM help you find the perfect products for your oral care needs.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium"
                style={{ background: 'linear-gradient(135deg, #6FAF8E 0%, #4A90E2 100%)' }}
              >
                🎋 Start with TIM TIM
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {/* Sustainability Banner */}
                <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: '#BFE6D3' }}>
                  <Leaf className="w-5 h-5" style={{ color: '#6FAF8E' }} />
                  <span className="text-sm font-medium" style={{ color: '#2E2E2E' }}>
                    All items are 100% vegan, sustainable & eco-friendly
                  </span>
                  <Recycle className="w-5 h-5" style={{ color: '#6FAF8E' }} />
                </div>

                {/* Items */}
                {items.map((item, index) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-5 border"
                    style={{ borderColor: '#BFE6D3' }}
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl flex-shrink-0"
                           style={{ background: 'linear-gradient(135deg, #F6F8F7 0%, #BFE6D3 100%)' }}>
                        {item.product.type === 'toothpaste' ? '🧴' : '🎋'}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold" style={{ color: '#2E2E2E' }}>{item.product.name}</h3>
                            <p className="text-sm" style={{ color: '#6FAF8E' }}>{item.product.brand}</p>
                            
                            {/* Product type badge */}
                            <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full"
                                  style={{ background: '#F6F8F7', color: '#4a4a4a' }}>
                              {item.product.type === 'toothpaste' ? '🧴 Toothpaste' : '🎋 Bamboo Toothbrush'}
                            </span>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                            style={{ color: '#ef4444' }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-gray-50"
                              style={{ borderColor: '#BFE6D3' }}
                            >
                              <Minus className="w-4 h-4" style={{ color: '#6FAF8E' }} />
                            </button>
                            <span className="w-8 text-center font-medium" style={{ color: '#2E2E2E' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-gray-50"
                              style={{ borderColor: '#BFE6D3' }}
                            >
                              <Plus className="w-4 h-4" style={{ color: '#6FAF8E' }} />
                            </button>
                          </div>
                          
                          <span className="text-lg font-bold" style={{ color: '#6FAF8E' }}>
                            {item.product.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Clear Cart */}
                <button
                  onClick={clearCart}
                  className="text-sm flex items-center gap-1 hover:underline"
                  style={{ color: '#ef4444' }}
                >
                  <Trash2 className="w-4 h-4" />
                  Clear cart
                </button>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 border sticky top-24" style={{ borderColor: '#BFE6D3' }}>
                  <h2 className="text-lg font-bold mb-4" style={{ color: '#2E2E2E' }}>Order Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: '#4a4a4a' }}>Subtotal ({items.length} items)</span>
                      <span style={{ color: '#2E2E2E' }}>₹{total}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: '#4a4a4a' }}>Shipping</span>
                      <span style={{ color: '#2E2E2E' }}>₹{shipping}</span>
                    </div>
                    <div className="border-t pt-3" style={{ borderColor: '#BFE6D3' }}>
                      <div className="flex justify-between">
                        <span className="font-bold" style={{ color: '#2E2E2E' }}>Total</span>
                        <span className="text-xl font-bold" style={{ color: '#6FAF8E' }}>₹{grandTotal}</span>
                      </div>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="mb-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo code"
                        className="flex-1 px-3 py-2 rounded-lg border text-sm"
                        style={{ borderColor: '#BFE6D3' }}
                        disabled
                      />
                      <button
                        className="px-4 py-2 rounded-lg text-sm font-medium border"
                        style={{ borderColor: '#BFE6D3', color: '#6FAF8E' }}
                        disabled
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Pay Now Button (Disabled) */}
                  <button
                    disabled
                    className="w-full py-4 px-6 rounded-xl text-white font-semibold flex items-center justify-center gap-2 opacity-60 cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg, #6FAF8E 0%, #4A90E2 100%)' }}
                  >
                    <Lock className="w-4 h-4" />
                    Pay Now - ₹{grandTotal}
                  </button>

                  {/* Prototype Notice */}
                  <div className="mt-3 p-3 rounded-lg flex items-start gap-2" style={{ background: '#FEF3C7' }}>
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#92400E' }} />
                    <p className="text-xs" style={{ color: '#78350F' }}>
                      <span className="font-medium">Prototype Mode:</span> Payment is disabled. This is a demonstration of the Verident shopping experience.
                    </p>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-4 pt-4 border-t space-y-2" style={{ borderColor: '#BFE6D3' }}>
                    <div className="flex items-center gap-2 text-xs" style={{ color: '#4a4a4a' }}>
                      <Shield className="w-4 h-4" style={{ color: '#6FAF8E' }} />
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: '#4a4a4a' }}>
                      <Truck className="w-4 h-4" style={{ color: '#6FAF8E' }} />
                      <span>Free shipping over ₹499</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: '#4a4a4a' }}>
                      <CreditCard className="w-4 h-4" style={{ color: '#6FAF8E' }} />
                      <span>All payment methods accepted</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 border-t px-4 py-6 mt-12" style={{ borderColor: '#BFE6D3' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Leaf className="w-4 h-4" style={{ color: '#6FAF8E' }} />
            <span className="font-medium" style={{ color: '#6FAF8E' }}>{brandInfo.brandName}</span>
            <Leaf className="w-4 h-4" style={{ color: '#6FAF8E' }} />
          </div>
          <p className="text-xs" style={{ color: '#4a4a4a' }}>
            {brandInfo.tagline} • 100% Vegan • Cruelty-Free • Sustainable Packaging
          </p>
        </div>
      </footer>
    </div>
  )
}

