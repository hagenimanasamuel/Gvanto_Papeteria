import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CreditCard,
  Phone,
  Mail,
  Package,
  Truck,
  Shield,
  CheckCircle
} from 'lucide-react'
import Button from '@/components/UI/Button'
import { 
  getCart, 
  updateCartQuantity, 
  removeFromCart, 
  clearCart,
  getCartTotal,
  getItemById 
} from '@/utils/dataUtils'

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()

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
  }

  const handleQuantityChange = (itemId, variantId, newQuantity) => {
    updateCartQuantity(itemId, variantId, newQuantity)
    loadCart()
  }

  const handleRemove = (itemId, variantId) => {
    removeFromCart(itemId, variantId)
    loadCart()
  }

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart()
      loadCart()
    }
  }

  const handleCheckout = () => {
    navigate('/checkout', { state: { cart: cartData } })
  }

  const subtotal = getCartTotal()
  const deliveryFee = 0 // Free delivery
  const tax = 0 // No tax
  const total = subtotal + deliveryFee + tax

  if (cartData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom px-4">
          <button
            onClick={() => navigate('/services')}
            className="flex items-center text-gray-600 hover:text-primary-600 mb-8"
          >
            <ArrowLeft size={20} className="mr-2" />
            Continue Shopping
          </button>

          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag size={40} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products or services to your cart yet.
            </p>
            <Link to="/services">
              <Button variant="primary" size="lg">
                <ShoppingBag size={20} className="mr-2" />
                Browse Products & Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom px-4">
        <button
          onClick={() => navigate('/services')}
          className="flex items-center text-gray-600 hover:text-primary-600 mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Continue Shopping
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">
                    {cartData.length} {cartData.length === 1 ? 'Item' : 'Items'} in Cart
                  </h2>
                  <button
                    onClick={handleClearCart}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-200">
                {cartData.map((item) => (
                  <div key={`${item.id}-${item.variantId}`} className="p-6">
                    <div className="flex items-start">
                      {/* Item Image/Icon */}
                      <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-50 rounded-lg flex items-center justify-center mr-4">
                        <Package size={24} className="text-primary-600" />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-bold text-gray-900">{item.name}</h3>
                            {item.variant && (
                              <p className="text-sm text-gray-600 mt-1">{item.variant.name}</p>
                            )}
                            <p className="text-sm text-gray-500 mt-1 capitalize">{item.category}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                              RWF {(item.price * item.quantity).toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">
                              RWF {item.price.toLocaleString()} each
                            </div>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.variantId, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l hover:bg-gray-50"
                            >
                              <Minus size={16} />
                            </button>
                            <div className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300 font-medium">
                              {item.quantity}
                            </div>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.variantId, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r hover:bg-gray-50"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemove(item.id, item.variantId)}
                            className="text-red-600 hover:text-red-700 flex items-center"
                          >
                            <Trash2 size={16} className="mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">RWF {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">RWF 0</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        RWF {total.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">Including all charges</div>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                variant="primary" 
                size="lg"
                className="w-full mt-6 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
                onClick={handleCheckout}
              >
                <CreditCard size={20} className="mr-2" />
                Proceed to Checkout
              </Button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  or{' '}
                  <Link to="/services" className="text-primary-600 hover:text-primary-700 font-medium">
                    Continue Shopping
                  </Link>
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Benefits</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <Truck size={16} className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Free Delivery</div>
                    <div className="text-sm text-gray-600">Same day in Musanze</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <Shield size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Quality Guarantee</div>
                    <div className="text-sm text-gray-600">30-day return policy</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <CheckCircle size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Secure Payment</div>
                    <div className="text-sm text-gray-600">Multiple payment options</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help? */}
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100">
              <h3 className="font-bold text-gray-900 mb-3">Need Help?</h3>
              <p className="text-gray-700 mb-4">
                Contact us for any questions about your order.
              </p>
              <div className="space-y-2">
                <a 
                  href="tel:0785383927"
                  className="flex items-center text-gray-700 hover:text-primary-600"
                >
                  <Phone size={16} className="mr-2" />
                  0785 383 927
                </a>
                <a 
                  href="mailto:gashakavinc@gmail.com"
                  className="flex items-center text-gray-700 hover:text-primary-600"
                >
                  <Mail size={16} className="mr-2" />
                  gashakavinc@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart