import React, { useState, useEffect } from 'react'
import { 
  X, Phone, Mail, User, MessageSquare, Zap, CheckCircle, 
  PartyPopper, Clock, Truck, Shield, Sparkles, PartyPopper as Confetti 
} from 'lucide-react'
import Button from '@/components/UI/Button'
import { sendQuickOrder } from '@/utils/emailService'

const QuickOrderModal = ({ product, selectedVariant = 0, quantity = 1, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    deliveryMethod: 'pickup',
    paymentMethod: 'cash',
    specialInstructions: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)

  const variant = product?.variants?.[selectedVariant]
  const totalPrice = (variant?.price || product?.price || 0) * quantity

  useEffect(() => {
    if (submitSuccess) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [submitSuccess])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.fullName || !formData.phone) {
      alert('Please enter your name and phone number')
      return
    }

    setIsSubmitting(true)

    try {
      const result = await sendQuickOrder(product, {
        ...formData,
        quantity,
        variant
      })

      if (result.success) {
        setOrderId(result.orderId)
        setSubmitSuccess(true)
        
        // Clear form
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          deliveryMethod: 'pickup',
          paymentMethod: 'cash',
          specialInstructions: ''
        })

        // Call success callback
        if (onSuccess) onSuccess()
        
        // Auto-close after 5 seconds
        setTimeout(() => {
          onClose()
        }, 5000)
      } else {
        throw new Error('Failed to send order')
      }
    } catch (error) {
      console.error('Quick order error:', error)
      alert('Failed to submit order. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2'][i % 5],
                left: `${Math.random() * 100}%`,
                top: '-10px',
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                <Zap size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Quick Order</h3>
                <p className="text-sm text-gray-600">Order in 30 seconds</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Success Message */}
          {submitSuccess ? (
            <div className="text-center py-8">
              {/* Animated Success Icon */}
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <CheckCircle size={48} className="text-green-600" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center animate-bounce">
                    <PartyPopper size={20} className="text-white" />
                  </div>
                </div>
              </div>
              
              <h4 className="text-2xl font-bold text-gray-900 mb-2 animate-fade-in">
                Order Confirmed! 🎉
              </h4>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6 border border-green-200 animate-slide-up">
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-600 mb-1">Order Reference</div>
                  <div className="text-2xl font-bold text-gray-900 font-mono tracking-wide">
                    {orderId}
                  </div>
                </div>
                
                <div className="space-y-3 text-left">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Phone size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">We'll Call You</div>
                      <div className="text-sm text-gray-600">Within 30 minutes</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <Clock size={16} className="text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Fast Processing</div>
                      <div className="text-sm text-gray-600">Ready in 1-2 hours</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <Shield size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Secure Order</div>
                      <div className="text-sm text-gray-600">Confirmed via SMS</div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-6">
                Thank you for your order! Our team is already processing it and will contact you shortly.
              </p>

              <div className="space-y-3">
                <a 
                  href="tel:0785383927"
                  className="inline-flex items-center justify-center w-full py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-medium hover:from-primary-700 hover:to-secondary-700 transition-all duration-200"
                >
                  <Phone size={18} className="mr-2" />
                  Call Us Now: 0785 383 927
                </a>
                <button
                  onClick={onClose}
                  className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-primary-600 hover:text-primary-600 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Modal will close automatically in 5 seconds...
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Order Summary */}
              <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 mb-6 border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-lg">{product?.name}</h4>
                    {variant && (
                      <p className="text-sm text-gray-600 mt-1">{variant.name}</p>
                    )}
                    <div className="mt-2 flex items-center">
                      <span className="text-xs font-medium px-2 py-1 bg-primary-100 text-primary-700 rounded">
                        {product?.category?.replace('-', ' ') || 'Product'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right pl-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {product?.currency || 'RWF'} {totalPrice.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      {quantity} × {product?.currency || 'RWF'} {(variant?.price || product?.price || 0).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User size={14} className="inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="John Doe"
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
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="0785 383 927"
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
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Delivery Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Method
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className={`cursor-pointer ${formData.deliveryMethod === 'pickup' ? 'border-2 border-primary-500 bg-primary-50' : 'border border-gray-300'} rounded-lg p-3 hover:border-primary-300 transition-all duration-200`}>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="pickup"
                        checked={formData.deliveryMethod === 'pickup'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="font-medium text-gray-900">Store Pickup</div>
                        <div className="text-xs text-gray-600">Free</div>
                      </div>
                    </label>
                    <label className={`cursor-pointer ${formData.deliveryMethod === 'delivery' ? 'border-2 border-primary-500 bg-primary-50' : 'border border-gray-300'} rounded-lg p-3 hover:border-primary-300 transition-all duration-200`}>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="delivery"
                        checked={formData.deliveryMethod === 'delivery'}
                        onChange={handleChange}
                        className="sr-only"
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
                    <label className={`cursor-pointer ${formData.paymentMethod === 'cash' ? 'border-2 border-primary-500 bg-primary-50' : 'border border-gray-300'} rounded-lg p-3 hover:border-primary-300 transition-all duration-200`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === 'cash'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="font-medium text-gray-900">Cash</div>
                        <div className="text-xs text-gray-600">On delivery</div>
                      </div>
                    </label>
                    <label className={`cursor-pointer ${formData.paymentMethod === 'mobile' ? 'border-2 border-primary-500 bg-primary-50' : 'border border-gray-300'} rounded-lg p-3 hover:border-primary-300 transition-all duration-200`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="mobile"
                        checked={formData.paymentMethod === 'mobile'}
                        onChange={handleChange}
                        className="sr-only"
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
                    value={formData.specialInstructions}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Any special requirements, preferred colors, sizes, etc..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    We'll do our best to accommodate your requests
                  </p>
                </div>

                {/* Custom Order Option */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
                  <div className="flex items-center mb-2">
                    <Sparkles size={16} className="text-amber-600 mr-2" />
                    <span className="font-medium text-gray-900">Need something custom?</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Don't see exactly what you need? Describe your custom request below:
                  </p>
                  <textarea
                    placeholder="E.g., Custom printing, bulk order, special size, specific brand..."
                    rows="2"
                    className="w-full px-3 py-2 text-sm border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl mt-2 group relative overflow-hidden"
                  disabled={isSubmitting}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Zap size={20} className="mr-2 group-hover:animate-pulse" />
                        Place Quick Order
                      </>
                    )}
                  </span>
                </Button>

                {/* Note */}
                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    By placing this order, you agree to our{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-700">terms</a>.
                    Our team will contact you within 30 minutes.
                  </p>
                </div>
              </form>

              {/* Alternative Contact */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center mb-3">
                  Prefer to order by phone or WhatsApp?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <a 
                    href="tel:0785383927"
                    className="flex items-center justify-center p-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                  >
                    <Phone size={18} className="mr-2" />
                    Call Us
                  </a>
                  <a 
                    href="https://wa.me/250785383927"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-3 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg font-medium transition-colors"
                  >
                    <span className="text-lg mr-2">💬</span>
                    WhatsApp
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default QuickOrderModal