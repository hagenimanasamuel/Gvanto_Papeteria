import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { 
  CreditCard,
  Smartphone,
  Building,
  User,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Shield,
  CheckCircle,
  ShoppingBag,
  ArrowLeft,
  Truck 
} from 'lucide-react'
import Button from '@/components/UI/Button'

const Checkout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { cart } = location.state || {}
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Musanze',
    paymentMethod: 'cash',
    deliveryMethod: 'pickup',
    specialInstructions: ''
  })

  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    delivery: 0,
    total: 0,
    items: []
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    if (cart) {
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const delivery = formData.deliveryMethod === 'delivery' ? 0 : 0 // Free delivery
      setOrderSummary({
        subtotal,
        delivery,
        total: subtotal + delivery,
        items: cart
      })
    }
  }, [cart, formData.deliveryMethod])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const generateOrderId = () => {
    return 'GV' + Date.now() + Math.floor(Math.random() * 1000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const orderData = {
      orderId: generateOrderId(),
      ...formData,
      ...orderSummary,
      cart: cart,
      timestamp: new Date().toISOString(),
      status: 'pending'
    }

    try {
      // Send email to GVANTO Papeterie
      const emailBody = `
New Order Received!

Order ID: ${orderData.orderId}
Date: ${new Date().toLocaleString()}
Customer: ${orderData.fullName}
Phone: ${orderData.phone}
Email: ${orderData.email}
Address: ${orderData.address}
City: ${orderData.city}
Payment Method: ${orderData.paymentMethod}
Delivery Method: ${orderData.deliveryMethod}
Special Instructions: ${orderData.specialInstructions}

ORDER DETAILS:
${orderData.items.map(item => `
- ${item.name} (${item.variant?.name || 'Standard'})
  Quantity: ${item.quantity}
  Price: RWF ${item.price.toLocaleString()}
  Total: RWF ${(item.price * item.quantity).toLocaleString()}
`).join('\n')}

SUBTOTAL: RWF ${orderData.subtotal.toLocaleString()}
DELIVERY: RWF ${orderData.delivery.toLocaleString()}
TOTAL: RWF ${orderData.total.toLocaleString()}
      `.trim()

      // Create mailto link for email
      const mailtoLink = `mailto:smlhagenimana@gmail.com?subject=New Order - ${orderData.orderId}&body=${encodeURIComponent(emailBody)}`
      
      // Also send copy to customer if email provided
      if (formData.email) {
        const customerEmailBody = `
Thank you for your order!

Order ID: ${orderData.orderId}
Date: ${new Date().toLocaleString()}

Your order has been received and will be processed shortly.
Our team will contact you within 24 hours to confirm your order.

Order Summary:
${orderData.items.map(item => `
- ${item.name} (${item.variant?.name || 'Standard'}) x ${item.quantity}: RWF ${(item.price * item.quantity).toLocaleString()}
`).join('\n')}

Total: RWF ${orderData.total.toLocaleString()}
Delivery Method: ${orderData.deliveryMethod}
Payment Method: ${orderData.paymentMethod}

For any questions, please contact us:
Phone: 0785 383 927
Email: smlhagenimana@gmail.com

Thank you for choosing GVANTO Papeterie!
        `.trim()

        const customerMailto = `mailto:${formData.email}?subject=Order Confirmation - ${orderData.orderId}&body=${encodeURIComponent(customerEmailBody)}`
        window.location.href = customerMailto
      }

      // Open email client
      window.location.href = mailtoLink

      // Save order to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('gvanto_orders') || '[]')
      existingOrders.push(orderData)
      localStorage.setItem('gvanto_orders', JSON.stringify(existingOrders))

      // Clear cart
      localStorage.removeItem('gvanto_cart')

      // Set success state
      setOrderId(orderData.orderId)
      setOrderSuccess(true)

      // Auto-redirect after 5 seconds
      setTimeout(() => {
        navigate('/')
      }, 5000)

    } catch (error) {
      console.error('Error submitting order:', error)
      alert('There was an error submitting your order. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={48} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
            <p className="text-lg text-gray-700 mb-2">
              Your order ID is: <span className="font-bold text-primary-600">{orderId}</span>
            </p>
            <p className="text-gray-600 mb-8">
              We've sent a confirmation to your email. Our team will contact you within 24 hours to confirm your order.
            </p>
            
            <div className="bg-white rounded-xl p-6 mb-8 shadow-lg">
              <h3 className="font-bold text-gray-900 mb-4">Next Steps:</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Phone size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">1. We'll call you</div>
                    <div className="text-sm text-gray-600">To confirm order details</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <ShoppingBag size={16} className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">2. Prepare your order</div>
                    <div className="text-sm text-gray-600">Items will be ready for pickup/delivery</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <CreditCard size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium">3. Payment & Collection</div>
                    <div className="text-sm text-gray-600">Complete payment when you receive order</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={() => navigate('/services')}
                variant="primary"
              >
                Continue Shopping
              </Button>
              <div className="text-sm text-gray-500">
                You will be redirected to homepage in 5 seconds...
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary-600 mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Cart
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p className="text-gray-600 mb-8">Complete your order by filling the details below</p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Customer Info Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <User size={20} className="mr-2" />
                  Personal Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
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
                      Email Address
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Musanze"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="NM 155 Musanze Kalisimbi"
                  />
                </div>
              </div>

              {/* Delivery Method */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Truck size={20} className="mr-2" />
                  Delivery Method
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <label className={`cursor-pointer ${formData.deliveryMethod === 'pickup' ? 'border-2 border-primary-500' : 'border border-gray-300'} rounded-xl p-4 hover:border-primary-300 transition-colors`}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={formData.deliveryMethod === 'pickup'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                        <Building size={20} className="text-primary-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Store Pickup</div>
                        <div className="text-sm text-gray-600">Pick up from our store</div>
                      </div>
                    </div>
                    <div className="mt-2 text-green-600 font-medium">FREE</div>
                  </label>
                  <label className={`cursor-pointer ${formData.deliveryMethod === 'delivery' ? 'border-2 border-primary-500' : 'border border-gray-300'} rounded-xl p-4 hover:border-primary-300 transition-colors`}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="delivery"
                      checked={formData.deliveryMethod === 'delivery'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <Truck size={20} className="text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Home Delivery</div>
                        <div className="text-sm text-gray-600">Delivered to your address</div>
                      </div>
                    </div>
                    <div className="mt-2 text-green-600 font-medium">FREE within Musanze</div>
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <CreditCard size={20} className="mr-2" />
                  Payment Method
                </h2>
                <div className="space-y-3">
                  <label className={`cursor-pointer ${formData.paymentMethod === 'cash' ? 'border-2 border-primary-500' : 'border border-gray-300'} rounded-xl p-4 hover:border-primary-300 transition-colors`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                          💵
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Cash on Delivery</div>
                          <div className="text-sm text-gray-600">Pay when you receive order</div>
                        </div>
                      </div>
                    </div>
                  </label>
                  <label className={`cursor-pointer ${formData.paymentMethod === 'mobile' ? 'border-2 border-primary-500' : 'border border-gray-300'} rounded-xl p-4 hover:border-primary-300 transition-colors`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mobile"
                      checked={formData.paymentMethod === 'mobile'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <Smartphone size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Mobile Money</div>
                          <div className="text-sm text-gray-600">MTN or Airtel Money</div>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <MessageSquare size={20} className="mr-2" />
                  Special Instructions
                </h2>
                <textarea
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Any special requirements or instructions for your order..."
                />
              </div>

              {/* Submit Button */}
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100">
                <div className="flex items-center mb-4">
                  <Shield size={20} className="text-primary-600 mr-2" />
                  <span className="font-medium text-gray-900">Secure Checkout</span>
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 shadow-lg hover:shadow-xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </Button>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  By placing your order, you agree to our terms and conditions
                </p>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {orderSummary.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-600">
                        {item.quantity} x RWF {item.price.toLocaleString()}
                      </div>
                      {item.variant && (
                        <div className="text-xs text-gray-500">{item.variant.name}</div>
                      )}
                    </div>
                    <div className="font-medium">
                      RWF {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">RWF {orderSummary.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium text-green-600">
                    {orderSummary.delivery === 0 ? 'FREE' : `RWF ${orderSummary.delivery.toLocaleString()}`}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        RWF {orderSummary.total.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">Including all charges</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-bold text-gray-900 mb-3">Need Help?</h3>
                <div className="space-y-2">
                  <a 
                    href="tel:0785383927"
                    className="flex items-center text-gray-700 hover:text-primary-600"
                  >
                    <Phone size={16} className="mr-2" />
                    0785 383 927
                  </a>
                  <a 
                    href="mailto:smlhagenimana@gmail.com"
                    className="flex items-center text-gray-700 hover:text-primary-600"
                  >
                    <Mail size={16} className="mr-2" />
                    smlhagenimana@gmail.com
                  </a>
                  <div className="flex items-center text-gray-700">
                    <MapPin size={16} className="mr-2" />
                    <span>NM 155 Musanze Kalisimbi</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-3">
                <Shield size={20} className="text-green-600 mr-2" />
                <span className="font-bold text-gray-900">Secure Order</span>
              </div>
              <p className="text-sm text-gray-600">
                Your personal and payment information is secure. We do not store any payment details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout