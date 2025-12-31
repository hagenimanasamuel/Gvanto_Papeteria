import {
  ShoppingBag, Package, Book, Printer, Building, CreditCard, Globe,
  FileText, Banknote, Shield, CheckCircle, Star, Clock, Truck, Phone,
  Mail, MapPin, ArrowRight, Search, Filter, ChevronRight, TrendingUp,
  Zap, Award, Users, HelpCircle, Layers, Camera, Calculator, Scissors,
  PenTool, Smartphone, Laptop, Download, BookOpen, Headphones, ShieldCheck,
  Heart, TruckIcon, Home, User, MessageSquare, X, Plus, Minus, Trash2,
  ChevronLeft, ChevronDown, ChevronUp, Menu, Sparkles, GlobeIcon,
  FileCheck, Printer as PrinterIcon, Building as BuildingIcon,
  Banknote as BanknoteIcon, Shield as ShieldIcon, Clock as ClockIcon
} from 'lucide-react'

// Import your JSON data
import data from '@/data/productsServices.json'

// Icon mapping
const iconComponents = {
  ShoppingBag, Package, Book, Printer, Building, CreditCard, Globe,
  FileText, Banknote, Shield, CheckCircle, Star, Clock, Truck, Phone,
  Mail, MapPin, ArrowRight, Search, Filter, ChevronRight, TrendingUp,
  Zap, Award, Users, HelpCircle, Layers, Camera, Calculator, Scissors,
  PenTool, Smartphone, Laptop, Download, BookOpen, Headphones, ShieldCheck,
  Heart, TruckIcon, Home, User, MessageSquare, X, Plus, Minus, Trash2,
  ChevronLeft, ChevronDown, ChevronUp, Menu, Sparkles, GlobeIcon,
  FileCheck, PrinterIcon, BuildingIcon, BanknoteIcon, ShieldIcon, ClockIcon
}

export const getIconComponent = (iconName) => {
  return iconComponents[iconName] || iconComponents.ShoppingBag
}

export const getAllCategories = () => {
  return data.categories
}

export const getCategoryById = (id) => {
  return data.categories.find(cat => cat.id === id)
}

export const getAllProductsServices = () => {
  return data.productsServices
}

export const getItemById = (id) => {
  if (!id) return null
  return data.productsServices.find(item => item.id === parseInt(id))
}

export const getItemBySlug = (slug) => {
  return data.productsServices.find(item => item.slug === slug)
}

export const getItemsByCategory = (categoryId) => {
  if (categoryId === 'all') return data.productsServices
  return data.productsServices.filter(item => item.category === categoryId)
}

export const searchItems = (query) => {
  if (!query) return data.productsServices
  const searchTerm = query.toLowerCase()
  return data.productsServices.filter(item => 
    item.name.toLowerCase().includes(searchTerm) ||
    (item.description && item.description.toLowerCase().includes(searchTerm)) ||
    item.category.toLowerCase().includes(searchTerm) ||
    (item.subcategory && item.subcategory.toLowerCase().includes(searchTerm))
  )
}

export const getRelatedItems = (currentId, relatedIds) => {
  if (!relatedIds || !Array.isArray(relatedIds)) return []
  return data.productsServices.filter(item => 
    relatedIds.includes(item.id) && item.id !== currentId
  )
}

// LocalStorage Cart Functions
export const CART_KEY = 'gvanto_cart'

export const getCart = () => {
  try {
    if (typeof window === 'undefined') return []
    const cart = localStorage.getItem(CART_KEY)
    return cart ? JSON.parse(cart) : []
  } catch (error) {
    console.error('Error getting cart:', error)
    return []
  }
}

export const addToCart = (item, quantity = 1, variant = null) => {
  if (!item || !item.id) return getCart()
  
  const cart = getCart()
  const variantId = variant?.id || 'standard'
  
  const existingIndex = cart.findIndex(cartItem => 
    cartItem.id === item.id && cartItem.variantId === variantId
  )

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += quantity
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: variant ? variant.price : item.price,
      variantId: variantId,
      variant: variant,
      quantity: quantity,
      category: item.category,
      type: item.type || 'product',
      deliveryTime: item.deliveryTime || '1-2 days',
      currency: item.currency || 'RWF'
    })
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart))
  return cart
}

export const updateCartQuantity = (itemId, variantId, quantity) => {
  const cart = getCart()
  const itemIndex = cart.findIndex(item => 
    item.id === itemId && item.variantId === (variantId || 'standard')
  )

  if (itemIndex >= 0) {
    if (quantity <= 0) {
      cart.splice(itemIndex, 1)
    } else {
      cart[itemIndex].quantity = quantity
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }

  return cart
}

export const removeFromCart = (itemId, variantId) => {
  const cart = getCart()
  const filteredCart = cart.filter(item => 
    !(item.id === itemId && item.variantId === (variantId || 'standard'))
  )
  localStorage.setItem(CART_KEY, JSON.stringify(filteredCart))
  return filteredCart
}

export const clearCart = () => {
  localStorage.removeItem(CART_KEY)
  return []
}

export const getCartTotal = () => {
  const cart = getCart()
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
}

export const getCartCount = () => {
  const cart = getCart()
  return cart.reduce((count, item) => count + item.quantity, 0)
}

// Order Functions
export const ORDERS_KEY = 'gvanto_orders'

export const saveOrder = (orderData) => {
  try {
    const existingOrders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]')
    existingOrders.push({
      ...orderData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'pending'
    })
    localStorage.setItem(ORDERS_KEY, JSON.stringify(existingOrders))
    return orderData
  } catch (error) {
    console.error('Error saving order:', error)
    return null
  }
}

export const getOrders = () => {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]')
  } catch (error) {
    console.error('Error getting orders:', error)
    return []
  }
}

export const getNavigationCategories = () => {
  const categories = getAllCategories()
  
  const productCategories = categories.filter(cat => 
    cat.id !== 'all' && 
    !cat.name.includes('Services') && 
    !cat.name.includes('Government') &&
    !cat.name.includes('Banking') &&
    !cat.name.includes('Digital')
  )
  
  const serviceCategories = categories.filter(cat => 
    cat.name.includes('Services') || 
    cat.name.includes('Government') ||
    cat.name.includes('Banking') ||
    cat.name.includes('Digital')
  )
  
  return { productCategories, serviceCategories }
}

export const searchItemsWithFilters = (query, category = null) => {
  let results = searchItems(query)
  
  if (category && category !== 'all') {
    results = results.filter(item => item.category === category)
  }
  
  return results
}