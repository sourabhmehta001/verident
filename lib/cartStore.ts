import { create } from 'zustand'
import { Product } from './store'

interface CartItem {
  product: Product & { 
    ingredients?: string[]
    material?: string
    packaging?: string
    whyItWorks?: string
  }
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  
  addItem: (product: CartItem['product']) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  setOpen: (open: boolean) => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  
  addItem: (product) => {
    set((state) => {
      const existingItem = state.items.find(item => item.product.id === product.id)
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }
      return { items: [...state.items, { product, quantity: 1 }] }
    })
  },
  
  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter(item => item.product.id !== productId),
    }))
  },
  
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId)
      return
    }
    set((state) => ({
      items: state.items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    }))
  },
  
  clearCart: () => set({ items: [] }),
  
  setOpen: (open) => set({ isOpen: open }),
  
  getTotal: () => {
    const items = get().items
    return items.reduce((total, item) => {
      const price = parseInt(item.product.price.replace(/[₹,]/g, '')) || 0
      return total + price * item.quantity
    }, 0)
  },
  
  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0)
  },
}))

