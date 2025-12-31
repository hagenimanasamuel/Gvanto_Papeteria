import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Package, 
  Printer, 
  Palette, 
  Ruler, 
  Hash, 
  MessageSquare,
  User,
  Phone,
  Mail,
  CheckCircle,
  Zap
} from 'lucide-react'
import Button from '@/components/UI/Button'

const CustomOrder = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    orderType: 'custom-product',
    productDescription: '',
    quantity: '',
    specialRequirements: '',
    urgency: 'normal'
  })
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, send this to your backend/email
    console.log('Custom order submitted:', formData)
    setSubmitSuccess(true)
    
    // Auto-redirect after 5 seconds
    setTimeout(() => {
      navigate('/services')
    }, 5000)
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
              <CheckCircle size={48} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Custom Order Request Received!</h1>
            <p className="text-lg text-gray-700 mb-8">
              Our team will review your custom request and contact you within 24 hours 
              with pricing and availability details.
            </p>
            <div className="space-y-4">
              <Button 
                onClick={() => navigate('/services')}
                variant="primary"
              >
                Browse Regular Products
              </Button>
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
              >
                Return to Homepage
              </Button>
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
          Back
        </button>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Custom Order Request</h1>
            <p className="text-lg text-gray-600">
              Tell us what you need and we'll provide you with a custom quote
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="grid md:grid-cols-3 gap-4">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone size={14} className="inline mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                    />
                  </div>
                </div>

                {/* Order Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What type of custom order do you need?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { value: 'custom-product', label: 'Custom Product', icon: Package },
                      { value: 'printing', label: 'Custom Printing', icon: Printer },
                      { value: 'branding', label: 'Branding/Logo', icon: Palette },
                      { value: 'bulk', label: 'Bulk Order', icon: Hash },
                    ].map((type) => (
                      <label
                        key={type.value}
                        className={`cursor-pointer ${formData.orderType === type.value ? 'border-2 border-primary-500 bg-primary-50' : 'border border-gray-300'} rounded-lg p-4 text-center hover:border-primary-300 transition-all duration-200`}
                      >
                        <input
                          type="radio"
                          name="orderType"
                          value={type.value}
                          checked={formData.orderType === type.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className="flex flex-col items-center">
                          <type.icon size={24} className="mb-2 text-gray-700" />
                          <span className="font-medium">{type.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Product Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Package size={14} className="inline mr-2" />
                    Describe what you need *
                  </label>
                  <textarea
                    name="productDescription"
                    required
                    value={formData.productDescription}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Please describe in detail what you're looking for..."
                  />
                </div>

                {/* Quantity & Requirements */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Hash size={14} className="inline mr-2" />
                      Estimated Quantity
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="E.g., 50 units, 100 pages"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MessageSquare size={14} className="inline mr-2" />
                      Special Requirements
                    </label>
                    <textarea
                      name="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Color preferences, sizes, materials, deadlines..."
                    />
                  </div>
                </div>

                {/* Urgency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Zap size={14} className="inline mr-2" />
                    How urgent is this request?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'low', label: 'No Rush', color: 'from-gray-400 to-gray-500' },
                      { value: 'normal', label: 'Normal', color: 'from-blue-400 to-blue-500' },
                      { value: 'urgent', label: 'Urgent', color: 'from-red-400 to-red-500' },
                    ].map((urgency) => (
                      <label
                        key={urgency.value}
                        className={`cursor-pointer ${formData.urgency === urgency.value ? 'border-2 border-primary-500' : 'border border-gray-300'} rounded-lg p-4 text-center hover:border-primary-300 transition-all duration-200`}
                      >
                        <input
                          type="radio"
                          name="urgency"
                          value={urgency.value}
                          checked={formData.urgency === urgency.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${urgency.color} mx-auto mb-2 flex items-center justify-center`}>
                          {urgency.value === 'urgent' && <Zap size={16} className="text-white" />}
                        </div>
                        <span className="font-medium">{urgency.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-gray-200">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 shadow-lg hover:shadow-xl"
                  >
                    Submit Custom Order Request
                  </Button>
                  <p className="text-sm text-gray-500 text-center mt-4">
                    Our team will review your request and contact you within 24 hours with pricing and availability.
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Quick Order Options */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Prefer to discuss your custom order?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="tel:0785383927"
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                Call: 0785 383 927
              </a>
              <a 
                href="https://wa.me/250785383927"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg font-medium transition-colors"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomOrder