// Cart.js - Only add User Info Modal, keep everything else exactly as it was
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Phone,
  Mail,
  Package,
  Truck,
  Shield,
  CheckCircle,
  Zap,
  CheckSquare,
  Square,
  ShoppingCart,
  AlertCircle,
  Loader2,
  Gift,
  Clock,
  Star,
  User,
  MessageSquare,
  X
} from 'lucide-react'
import Button from '@/components/UI/Button'
import { 
  getCart, 
  updateCartQuantity, 
  removeFromCart, 
  clearCart,
  getItemById 
} from '@/utils/dataUtils'
import { sendStandardOrder } from '@/utils/emailService'

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [cartData, setCartData] = useState([])
  const [selectedItems, setSelectedItems] = useState(new Set())
  const [orderMode, setOrderMode] = useState('together')
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [successOrders, setSuccessOrders] = useState([])
  const [showUserInfoModal, setShowUserInfoModal] = useState(false)
  const navigate = useNavigate()

  // User Info Form State
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    deliveryMethod: 'pickup',
    paymentMethod: 'cash',
    specialInstructions: ''
  })

  const [formError, setFormError] = useState('')

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = () => {
    const cart = getCart()
    const itemsWithDetails = cart.map(item => ({
      ...item,
      details: getItemById(item.id) || {}
    }))
    setCartData(itemsWithDetails)
    setCartItems(cart)
    
    // Select all items by default
    const allItemIds = itemsWithDetails.map(item => `${item.id}-${item.variantId}`)
    setSelectedItems(new Set(allItemIds))
  }

  // === EXISTING FUNCTIONS - KEEP EXACTLY AS THEY WERE ===
  const handleQuantityChange = (itemId, variantId, newQuantity) => {
    if (newQuantity < 1) return
    updateCartQuantity(itemId, variantId, newQuantity)
    loadCart()
  }

  const handleRemove = (itemId, variantId) => {
    removeFromCart(itemId, variantId)
    loadCart()
    const itemKey = `${itemId}-${variantId}`
    const newSelected = new Set(selectedItems)
    newSelected.delete(itemKey)
    setSelectedItems(newSelected)
  }

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart()
      loadCart()
      setSelectedItems(new Set())
    }
  }

  const handleSelectItem = (itemId, variantId) => {
    const itemKey = `${itemId}-${variantId}`
    const newSelected = new Set(selectedItems)
    
    if (newSelected.has(itemKey)) {
      newSelected.delete(itemKey)
    } else {
      newSelected.add(itemKey)
    }
    
    setSelectedItems(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedItems.size === cartData.length) {
      setSelectedItems(new Set())
    } else {
      const allItemIds = cartData.map(item => `${item.id}-${item.variantId}`)
      setSelectedItems(new Set(allItemIds))
    }
  }

  // === NEW USER INFO HANDLING FUNCTIONS ===
  const formatPhone = (value) => {
    const phone = value.replace(/\D/g, '')
    if (phone.length <= 4) return phone
    if (phone.length <= 7) return `${phone.slice(0, 4)} ${phone.slice(4)}`
    return `${phone.slice(0, 4)} ${phone.slice(4, 7)} ${phone.slice(7, 10)}`
  }

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target
    if (name === 'phone') {
      setUserInfo(prev => ({
        ...prev,
        phone: formatPhone(value)
      }))
    } else {
      setUserInfo(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const validateUserInfo = () => {
    if (!userInfo.fullName.trim()) {
      setFormError('Please enter your name')
      return false
    }
    
    if (!userInfo.phone.trim()) {
      setFormError('Please enter your phone number')
      return false
    }
    
    const cleanPhone = userInfo.phone.replace(/\D/g, '')
    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid phone number (10 digits minimum)')
      return false
    }
    
    if (userInfo.email && !/\S+@\S+\.\S+/.test(userInfo.email)) {
      setFormError('Please enter a valid email address')
      return false
    }
    
    setFormError('')
    return true
  }

  const handleQuickOrder = () => {
    if (selectedItems.size === 0) {
      alert('Please select at least one item to order')
      return
    }

    // Show user info modal instead of directly processing
    setShowUserInfoModal(true)
  }

  const processOrder = async () => {
    if (!validateUserInfo()) {
      return
    }

    setIsProcessing(true)
    setOrderSuccess(false)
    setSuccessOrders([])

    const selectedCartData = cartData.filter(item => 
      selectedItems.has(`${item.id}-${item.variantId}`)
    )

    try {
      if (orderMode === 'together') {
        const orderData = {
          fullName: userInfo.fullName.trim(),
          phone: userInfo.phone.replace(/\D/g, ''),
          email: userInfo.email.trim(),
          deliveryMethod: userInfo.deliveryMethod,
          paymentMethod: userInfo.paymentMethod,
          specialInstructions: userInfo.specialInstructions,
          items: selectedCartData.map(item => ({
            name: item.name,
            variant: item.variant,
            price: item.price,
            quantity: item.quantity
          })),
          orderType: 'CART ORDER'
        }

        const result = await sendStandardOrder(orderData)
        
        if (result.success) {
          setSuccessOrders([result.orderId])
          setOrderSuccess(true)
          setShowUserInfoModal(false)
          
          selectedCartData.forEach(item => {
            removeFromCart(item.id, item.variantId)
          })
          
          loadCart()
          setSelectedItems(new Set())
          resetUserInfo()
        } else {
          throw new Error(result.error || 'Failed to place order')
        }
      } else {
        const orderResults = []
        
        for (const item of selectedCartData) {
          const orderData = {
            fullName: userInfo.fullName.trim(),
            phone: userInfo.phone.replace(/\D/g, ''),
            email: userInfo.email.trim(),
            deliveryMethod: userInfo.deliveryMethod,
            paymentMethod: userInfo.paymentMethod,
            specialInstructions: userInfo.specialInstructions,
            items: [{
              name: item.name,
              variant: item.variant,
              price: item.price,
              quantity: item.quantity
            }],
            orderType: 'SINGLE ITEM ORDER'
          }

          const result = await sendStandardOrder(orderData)
          
          if (result.success) {
            orderResults.push(result.orderId)
          } else {
            throw new Error(result.error || `Failed to order ${item.name}`)
          }
        }

        setSuccessOrders(orderResults)
        setOrderSuccess(true)
        setShowUserInfoModal(false)
        
        selectedCartData.forEach(item => {
          removeFromCart(item.id, item.variantId)
        })
        
        loadCart()
        setSelectedItems(new Set())
        resetUserInfo()
      }
    } catch (error) {
      console.error('Quick order error:', error)
      alert(`Failed to place order: ${error.message}`)
    } finally {
      setIsProcessing(false)
    }
  }

  const resetUserInfo = () => {
    setUserInfo({
      fullName: '',
      phone: '',
      email: '',
      deliveryMethod: 'pickup',
      paymentMethod: 'cash',
      specialInstructions: ''
    })
    setFormError('')
  }

  const subtotal = cartData.reduce((sum, item) => {
    if (selectedItems.has(`${item.id}-${item.variantId}`)) {
      return sum + (item.price * item.quantity)
    }
    return sum
  }, 0)

  const deliveryFee = 0
  const tax = 0
  const total = subtotal + deliveryFee + tax

  // Keep all your existing JSX exactly as it was, only add the new modal
  if (cartData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12">
        <div className="container-custom px-4">
          <button
            onClick={() => navigate('/services')}
            className="flex items-center text-gray-600 hover:text-primary-600 mb-6 sm:mb-8 group text-sm sm:text-base"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </button>

          <div className="max-w-md mx-auto text-center px-4">
            <div className="relative mb-6 sm:mb-8">
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center animate-pulse">
                <ShoppingBag size={36} className="sm:size-48 text-primary-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                <div className="text-white text-xl sm:text-2xl">😔</div>
              </div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg">
              Add some amazing products to get started!
            </p>
            
            <div className="space-y-3 sm:space-y-4">
              <Link to="/services">
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  <ShoppingBag size={18} className="mr-2" />
                  Explore Our Products
                </Button>
              </Link>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <Link to="/services?category=printing-services">
                  <Button variant="outline" className="w-full text-sm sm:text-base">
                    🖨️ Printing
                  </Button>
                </Link>
                <Link to="/services?category=office-supplies">
                  <Button variant="outline" className="w-full text-sm sm:text-base">
                    📝 Supplies
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
              <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">🌟 Popular Right Now</h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {[
                  { name: 'Business Cards', emoji: '💼' },
                  { name: 'Document Printing', emoji: '📄' },
                  { name: 'Notebooks', emoji: '📒' },
                  { name: 'Custom Designs', emoji: '🎨' }
                ].map((product, idx) => (
                  <div key={idx} className="bg-white p-3 sm:p-4 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200 text-xs sm:text-sm">
                    <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{product.emoji}</div>
                    <div className="font-medium text-gray-900 truncate">{product.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-6 sm:py-8 lg:py-12">
      <div className="container-custom px-4">
        {/* Success Modal */}
        {orderSuccess && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full animate-slide-up mx-4">
              <div className="p-6 sm:p-8 text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-pulse">
                  <CheckCircle size={36} className="sm:size-48 text-green-600" />
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  {successOrders.length === 1 ? 'Order Confirmed!' : 'Orders Placed!'}
                </h3>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-green-200">
                  <div className="text-center mb-3 sm:mb-4">
                    <div className="text-xs sm:text-sm text-gray-600 mb-2">Order Reference{successOrders.length > 1 ? 's' : ''}</div>
                    <div className="space-y-1 sm:space-y-2">
                      {successOrders.map((orderId, idx) => (
                        <div key={idx} className="text-lg sm:text-xl font-bold text-gray-900 font-mono tracking-wide bg-white p-2 sm:p-3 rounded-lg border border-green-200 text-sm sm:text-base">
                          {orderId}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-left space-y-2 sm:space-y-3">
                    <div className="flex items-center">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                        <Phone size={14} className="sm:size-16 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm sm:text-base">We'll Call You</div>
                        <div className="text-xs sm:text-sm text-gray-600">Within 30 minutes</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                        <Clock size={14} className="sm:size-16 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm sm:text-base">Fast Processing</div>
                        <div className="text-xs sm:text-sm text-gray-600">Ready in 1-2 hours</div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
                  Thank you for your order{successOrders.length > 1 ? 's' : ''}! Our team is already processing 
                  {successOrders.length > 1 ? ' them' : ' it'} and will contact you shortly.
                </p>

                <div className="space-y-2 sm:space-y-3">
                  <a 
                    href="tel:0785383927"
                    className="inline-flex items-center justify-center w-full py-2 sm:py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-medium hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 text-sm sm:text-base"
                  >
                    <Phone size={16} className="sm:size-18 mr-2" />
                    Call Us Now: 0785 383 927
                  </a>
                  <button
                    onClick={() => setOrderSuccess(false)}
                    className="w-full py-2 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-primary-600 hover:text-primary-600 transition-colors text-sm sm:text-base"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Info Modal - NEW ADDITION */}
        {showUserInfoModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full animate-slide-up mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-4 sm:p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                      <Zap size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">Complete Your Order</h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {orderMode === 'together' ? 'Ordering selected items together' : 'Ordering items separately'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setShowUserInfoModal(false)
                      resetUserInfo()
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Order Summary */}
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-4 mb-6 border border-gray-200">
                  <div className="text-center mb-3">
                    <div className="text-sm text-gray-600 mb-1">Order Summary</div>
                    <div className="text-xl font-bold text-gray-900">
                      RWF {total.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {selectedItems.size} item{selectedItems.size !== 1 ? 's' : ''} • {orderMode === 'together' ? 'Combined Order' : 'Separate Orders'}
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {formError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{formError}</p>
                  </div>
                )}

                {/* User Info Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User size={14} className="inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={userInfo.fullName}
                      onChange={handleUserInfoChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="John Doe"
                      disabled={isProcessing}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone size={14} className="inline mr-2" />
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={userInfo.phone}
                        onChange={handleUserInfoChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="0785 383 927"
                        disabled={isProcessing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail size={14} className="inline mr-2" />
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleUserInfoChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="john@example.com"
                        disabled={isProcessing}
                      />
                    </div>
                  </div>

                  {/* Delivery Method */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Method
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <label className={`cursor-pointer ${userInfo.deliveryMethod === 'pickup' ? 'border-2 border-primary-500 bg-primary-50' : 'border border-gray-300'} rounded-lg p-3 hover:border-primary-300 transition-all duration-200 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="pickup"
                          checked={userInfo.deliveryMethod === 'pickup'}
                          onChange={handleUserInfoChange}
                          className="sr-only"
                          disabled={isProcessing}
                        />
                        <div className="text-center">
                          <div className="font-medium text-gray-900">Store Pickup</div>
                          <div className="text-xs text-gray-600">Free</div>
                        </div>
                      </label>
                      <label className={`cursor-pointer ${userInfo.deliveryMethod === 'delivery' ? 'border-2 border-primary-500 bg-primary-50' : 'border border-gray-300'} rounded-lg p-3 hover:border-primary-300 transition-all duration-200 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="delivery"
                          checked={userInfo.deliveryMethod === 'delivery'}
                          onChange={handleUserInfoChange}
                          className="sr-only"
                          disabled={isProcessing}
                        />
                        <div className="text-center">
                          <div className="font-medium text-gray-900">Home Delivery</div>
                          <div className="text-xs text-gray-600">Free in Musanze</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <label className={`cursor-pointer ${userInfo.paymentMethod === 'cash' ? 'border-2 border-primary-500 bg-primary-50' : 'border border-gray-300'} rounded-lg p-3 hover:border-primary-300 transition-all duration-200 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={userInfo.paymentMethod === 'cash'}
                          onChange={handleUserInfoChange}
                          className="sr-only"
                          disabled={isProcessing}
                        />
                        <div className="text-center">
                          <div className="font-medium text-gray-900">Cash</div>
                          <div className="text-xs text-gray-600">On delivery</div>
                        </div>
                      </label>
                      <label className={`cursor-pointer ${userInfo.paymentMethod === 'mobile' ? 'border-2 border-primary-500 bg-primary-50' : 'border border-gray-300'} rounded-lg p-3 hover:border-primary-300 transition-all duration-200 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="mobile"
                          checked={userInfo.paymentMethod === 'mobile'}
                          onChange={handleUserInfoChange}
                          className="sr-only"
                          disabled={isProcessing}
                        />
                        <div className="text-center">
                          <div className="font-medium text-gray-900">Mobile Money</div>
                          <div className="text-xs text-gray-600">MTN/Airtel</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Special Instructions */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MessageSquare size={14} className="inline mr-2" />
                      Special Instructions (Optional)
                    </label>
                    <textarea
                      name="specialInstructions"
                      value={userInfo.specialInstructions}
                      onChange={handleUserInfoChange}
                      rows="2"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Any special requirements, deadlines, or notes..."
                      disabled={isProcessing}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl mt-2"
                    onClick={processOrder}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 size={20} className="mr-2 animate-spin" />
                        Processing Order...
                      </>
                    ) : (
                      <>
                        <Zap size={20} className="mr-2" />
                        {orderMode === 'together' ? 'Place Combined Order' : 'Place Orders'}
                      </>
                    )}
                  </Button>

                  {/* Note */}
                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      Our team will contact you within 30 minutes to confirm your order.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* === KEEP ALL YOUR EXISTING JSX EXACTLY AS IT WAS === */}
        {/* Navigation */}
        <button
          onClick={() => navigate('/services')}
          className="flex items-center text-gray-600 hover:text-primary-600 mb-4 sm:mb-6 lg:mb-8 group text-sm sm:text-base"
        >
          <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Continue Shopping
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
              {cartData.length} item{cartData.length !== 1 ? 's' : ''} in your cart
            </p>
          </div>
          
          <div className="mt-3 sm:mt-0">
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 text-sm sm:text-base"
            >
              <Trash2 size={16} className="mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            {/* Order Mode Selection - Mobile Optimized */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
              <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">📦 Ordering Options</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <button
                  onClick={() => setOrderMode('together')}
                  className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-200 text-left ${orderMode === 'together' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center mr-2 sm:mr-3 ${orderMode === 'together' ? 'border-primary-500 bg-primary-500' : 'border-gray-300'}`}>
                      {orderMode === 'together' && <CheckSquare size={12} className="sm:size-14 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm sm:text-base truncate">Order Together</div>
                      <div className="text-xs sm:text-sm text-gray-600 truncate">Single combined order</div>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => setOrderMode('separate')}
                  className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-200 text-left ${orderMode === 'separate' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center mr-2 sm:mr-3 ${orderMode === 'separate' ? 'border-primary-500 bg-primary-500' : 'border-gray-300'}`}>
                      {orderMode === 'separate' && <CheckSquare size={12} className="sm:size-14 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm sm:text-base truncate">Order Separately</div>
                      <div className="text-xs sm:text-sm text-gray-600 truncate">Individual orders</div>
                    </div>
                  </div>
                </button>
              </div>
              
              <p className="text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4">
                {orderMode === 'together' 
                  ? 'All selected items will be ordered together as a single purchase.'
                  : 'Each selected item will be ordered separately with individual order numbers.'
                }
              </p>
            </div>

            {/* Cart Items */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
              {/* Cart Header */}
              <div className="p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center">
                    <button
                      onClick={handleSelectAll}
                      className="flex items-center mr-3 sm:mr-4"
                    >
                      {selectedItems.size === cartData.length ? (
                        <CheckSquare size={18} className="sm:size-20 text-primary-600" />
                      ) : (
                        <Square size={18} className="sm:size-20 text-gray-400" />
                      )}
                    </button>
                    <h2 className="font-bold text-gray-900 text-base sm:text-xl">
                      Selected: {selectedItems.size} of {cartData.length} items
                    </h2>
                  </div>
                  
                  {selectedItems.size > 0 && (
                    <div className="text-sm sm:text-base font-medium text-primary-600">
                      Total: RWF {subtotal.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-100">
                {cartData.map((item) => {
                  const itemKey = `${item.id}-${item.variantId}`
                  const isSelected = selectedItems.has(itemKey)
                  
                  return (
                    <div 
                      key={itemKey} 
                      className={`p-4 sm:p-6 transition-all duration-200 ${isSelected ? 'bg-primary-50/30' : 'hover:bg-gray-50'}`}
                    >
                      <div className="flex items-start">
                        {/* Selection Checkbox */}
                        <button
                          onClick={() => handleSelectItem(item.id, item.variantId)}
                          className="mr-3 sm:mr-4 mt-1"
                        >
                          {isSelected ? (
                            <CheckSquare size={18} className="sm:size-20 text-primary-600" />
                          ) : (
                            <Square size={18} className="sm:size-20 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>

                        {/* Item Image/Icon */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4 relative">
                          <Package size={22} className="sm:size-28 text-primary-600" />
                          {item.details.isPopular && (
                            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                              <Star size={8} className="sm:size-10 inline mr-0.5 sm:mr-1" />
                              Hot
                            </div>
                          )}
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col">
                            {/* Top Section - Name & Price */}
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 sm:mb-0">
                              <div className="flex-1 min-w-0 mb-2 sm:mb-0">
                                <h3 className="font-bold text-gray-900 text-base sm:text-lg truncate">{item.name}</h3>
                                {item.variant && (
                                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5 truncate">{item.variant.name}</p>
                                )}
                                <div className="flex flex-wrap gap-1 mt-1">
                                  <span className="text-xs font-medium px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded capitalize">
                                    {item.category}
                                  </span>
                                  {item.details.inStock && (
                                    <span className="text-xs font-medium px-1.5 py-0.5 bg-green-100 text-green-700 rounded flex items-center">
                                      <CheckCircle size={8} className="mr-0.5" />
                                      In Stock
                                    </span>
                                  )}
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <div className="text-lg sm:text-xl font-bold text-gray-900">
                                  RWF {(item.price * item.quantity).toLocaleString()}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600">
                                  RWF {item.price.toLocaleString()} each
                                </div>
                              </div>
                            </div>

                            {/* Bottom Section - Controls */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-3">
                              {/* Quantity Controls */}
                              <div className="flex items-center justify-between sm:justify-start gap-3">
                                <div className="flex items-center bg-gray-100 rounded-lg">
                                  <button
                                    onClick={() => handleQuantityChange(item.id, item.variantId, item.quantity - 1)}
                                    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-gray-200 rounded-l-lg transition-colors"
                                    disabled={item.quantity <= 1}
                                  >
                                    <Minus size={14} className="sm:size-16" />
                                  </button>
                                  <div className="w-8 sm:w-12 h-8 sm:h-10 flex items-center justify-center border-x border-gray-300 font-bold text-gray-900 text-sm sm:text-base">
                                    {item.quantity}
                                  </div>
                                  <button
                                    onClick={() => handleQuantityChange(item.id, item.variantId, item.quantity + 1)}
                                    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-gray-200 rounded-r-lg transition-colors"
                                  >
                                    <Plus size={14} className="sm:size-16" />
                                  </button>
                                </div>
                                
                                <div className="text-xs sm:text-sm text-gray-600">
                                  {item.quantity} {item.quantity === 1 ? 'unit' : 'units'}
                                </div>
                              </div>
                              
                              {/* Action Buttons */}
                              <div className="flex items-center justify-end gap-3">
                                <button
                                  onClick={() => {
                                    // For single item quick order, still ask for user info
                                    const selectedCartData = cartData.filter(cartItem => 
                                      `${cartItem.id}-${cartItem.variantId}` === itemKey
                                    )
                                    if (selectedCartData.length > 0) {
                                      // Select just this item
                                      setSelectedItems(new Set([itemKey]))
                                      setOrderMode('separate')
                                      setShowUserInfoModal(true)
                                    }
                                  }}
                                  className="flex items-center text-amber-600 hover:text-amber-700 font-medium text-xs sm:text-sm"
                                  disabled={isProcessing}
                                >
                                  <Zap size={14} className="sm:size-16 mr-1 sm:mr-2" />
                                  Quick Order
                                </button>
                                
                                <button
                                  onClick={() => handleRemove(item.id, item.variantId)}
                                  className="flex items-center text-red-600 hover:text-red-700 text-xs sm:text-sm"
                                >
                                  <Trash2 size={14} className="sm:size-16 mr-1 sm:mr-2" />
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            {/* Summary Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                  <ShoppingCart size={18} className="sm:size-20 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">Order Summary</h2>
              </div>
              
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base">Subtotal ({selectedItems.size} items)</span>
                  <span className="font-medium text-base sm:text-lg">RWF {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base">Delivery Fee</span>
                  <span className="font-medium text-green-600 flex items-center text-sm sm:text-base">
                    <CheckCircle size={14} className="sm:size-16 mr-1" />
                    FREE
                  </span>
                </div>
              </div>
              
              {/* Total */}
              <div className="border-t border-gray-200 pt-3 sm:pt-4 mb-4 sm:mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-base sm:text-lg font-bold text-gray-900">Total Amount</span>
                  <div className="text-right">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                      RWF {total.toLocaleString()}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">All inclusive</div>
                  </div>
                </div>
                
                {selectedItems.size === 0 && (
                  <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle size={14} className="sm:size-16 text-amber-600 mr-2" />
                      <span className="text-xs sm:text-sm text-amber-700">Select items to proceed</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-2 sm:space-y-3">
                <Button 
                  variant="primary"
                  size="lg"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg text-sm sm:text-base"
                  onClick={handleQuickOrder}
                  disabled={selectedItems.size === 0 || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={18} className="sm:size-20 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap size={18} className="sm:size-20 mr-2" />
                      {orderMode === 'together' ? 'Quick Order All' : 'Quick Order Selected'}
                    </>
                  )}
                </Button>
                
                <div className="text-center pt-2 sm:pt-3 border-t border-gray-200">
                  <p className="text-xs sm:text-sm text-gray-600">
                    or{' '}
                    <Link to="/services" className="text-primary-600 hover:text-primary-700 font-medium">
                      Continue Shopping
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
              <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base flex items-center">
                <Gift size={18} className="sm:size-20 mr-2 text-primary-600" />
                Benefits You Get
              </h3>
              <div className="space-y-3">
                <div className="flex items-center p-2 sm:p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                    <Truck size={16} className="sm:size-20 text-green-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-gray-900 text-sm sm:text-base truncate">Free Same-Day Delivery</div>
                    <div className="text-xs sm:text-sm text-gray-600 truncate">In Musanze for orders above RWF 5,000</div>
                  </div>
                </div>
                <div className="flex items-center p-2 sm:p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                    <Shield size={16} className="sm:size-20 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-gray-900 text-sm sm:text-base truncate">Quality Guarantee</div>
                    <div className="text-xs sm:text-sm text-gray-600 truncate">30-day return & satisfaction guarantee</div>
                  </div>
                </div>
                <div className="flex items-center p-2 sm:p-3 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                    <CheckCircle size={16} className="sm:size-20 text-purple-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-gray-900 text-sm sm:text-base truncate">Secure Payment</div>
                    <div className="text-xs sm:text-sm text-gray-600 truncate">Multiple safe payment options</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help? */}
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-primary-100">
              <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">💬 Need Help?</h3>
              <p className="text-gray-700 mb-3 sm:mb-4 text-xs sm:text-sm">
                Our team is ready to assist you with your order.
              </p>
              <div className="space-y-2">
                <a 
                  href="tel:0785383927"
                  className="flex items-center justify-center p-2 sm:p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-900 font-medium transition-colors text-sm sm:text-base"
                >
                  <Phone size={16} className="sm:size-18 mr-2" />
                  Call: 0785 383 927
                </a>
                <a 
                  href="https://wa.me/250785383927"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-2 sm:p-3 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  <span className="text-lg mr-2">💬</span>
                  WhatsApp Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Cart