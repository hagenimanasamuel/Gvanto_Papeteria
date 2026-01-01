// pages/ContactPage.js
import React, { useState } from 'react'
import { 
  Phone, Mail, MapPin, Clock, MessageSquare, User, 
  CheckCircle, AlertCircle, Loader2, Sparkles, Store,
  Users, Award, Globe, Heart, Package, Shield
} from 'lucide-react'
import Button from '@/components/UI/Button'
import { sendCustomOrder } from '@/utils/emailService'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    subject: 'general',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.fullName.trim()) {
      setError('Please enter your name')
      return
    }
    
    if (!formData.phone.trim()) {
      setError('Please enter your phone number')
      return
    }
    
    if (!formData.message.trim()) {
      setError('Please enter your message')
      return
    }
    
    setError('')
    setIsSubmitting(true)

    try {
      // Clean phone number
      const cleanPhone = formData.phone.replace(/\D/g, '')
      
      // Send as custom order to use the custom email template
      const result = await sendCustomOrder({
        fullName: formData.fullName.trim(),
        phone: cleanPhone,
        email: formData.email.trim(),
        customRequest: formData.message,
        specialRequirements: `Contact Form - Subject: ${formData.subject}`,
        urgency: 'normal',
        productName: 'General Inquiry',
        productCategory: 'Contact Form',
        productPrice: 'N/A'
      })

      if (result.success) {
        setSubmitSuccess(true)
        
        // Reset form
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          subject: 'general',
          message: ''
        })
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false)
        }, 5000)
        
      } else {
        throw new Error(result.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      setError('Failed to send message. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatPhone = (value) => {
    const phone = value.replace(/\D/g, '')
    if (phone.length <= 4) return phone
    if (phone.length <= 7) return `${phone.slice(0, 4)} ${phone.slice(4)}`
    return `${phone.slice(0, 4)} ${phone.slice(4, 7)} ${phone.slice(7, 10)}`
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value)
    setFormData(prev => ({
      ...prev,
      phone: formatted
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-900 to-secondary-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-custom py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
              <MessageSquare size={32} />
            </div>
            <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl opacity-90">
              We're here to help with all your stationery and printing needs. 
              Reach out and let's create something amazing together!
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-12 px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mr-4">
                  <MessageSquare size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                  <p className="text-gray-600">We'll respond within 24 hours</p>
                </div>
              </div>

              {/* Success Message */}
              {submitSuccess && (
                <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 animate-fade-in">
                  <div className="flex items-center">
                    <CheckCircle size={24} className="text-green-600 mr-3" />
                    <div>
                      <h3 className="font-bold text-green-800 text-lg">Message Sent Successfully!</h3>
                      <p className="text-green-700">
                        Thank you for contacting GVANTO Papeterie. We've received your message and 
                        will get back to you within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle size={20} className="text-red-500 mr-3" />
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
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
                      placeholder="John Doe"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Phone */}
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
                      onChange={handlePhoneChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="0785 383 927"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail size={14} className="inline mr-2" />
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { value: 'general', label: 'General Inquiry' },
                      { value: 'quote', label: 'Get Quote' },
                      { value: 'order', label: 'Order Status' },
                      { value: 'custom', label: 'Custom Order' }
                    ].map((option) => (
                      <label 
                        key={option.value}
                        className={`cursor-pointer ${formData.subject === option.value ? 'border-2 border-primary-500 bg-primary-50' : 'border border-gray-300'} rounded-lg p-3 hover:border-primary-300 transition-all duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <input
                          type="radio"
                          name="subject"
                          value={option.value}
                          checked={formData.subject === option.value}
                          onChange={handleChange}
                          className="sr-only"
                          disabled={isSubmitting}
                        />
                        <div className="text-center">
                          <div className="font-medium text-gray-900 text-sm">
                            {option.label}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare size={14} className="inline mr-2" />
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your project, question, or concern..."
                    disabled={isSubmitting}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Please provide as much detail as possible so we can help you better.
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="outline"
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 shadow-lg hover:shadow-xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="mr-2 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <MessageSquare size={20} className="mr-2" />
                      Send Message
                    </>
                  )}
                </Button>

                {/* Privacy Note */}
                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    By submitting this form, you agree to our{' '}
                    <a href="/privacy" className="text-primary-600 hover:text-primary-700">privacy policy</a>.
                    We respect your privacy and will never share your information.
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Contact Info & About */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">📞 Contact Information</h3>
              
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Phone size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Call Us</h4>
                    <a 
                      href="tel:0785383927" 
                      className="text-lg text-primary-600 hover:text-primary-700 font-semibold block mt-1"
                    >
                      0785 383 927
                    </a>
                    <p className="text-sm text-gray-600 mt-1">Available 8AM - 6PM</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Mail size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Email Us</h4>
                    <a 
                      href="mailto:gashakavinc@gmail.com" 
                      className="text-lg text-primary-600 hover:text-primary-700 font-semibold block mt-1"
                    >
                      gashakavinc@gmail.com
                    </a>
                    <p className="text-sm text-gray-600 mt-1">Response within 24 hours</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
                    <MapPin size={20} className="text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Visit Us</h4>
                    <p className="text-gray-700 mt-1">
                      30m from main Road, INES RUHENGERI Road, Musanze<br />
                      Rwanda
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      <Clock size={14} className="inline mr-1" />
                      Mon-Sat: 8AM-6PM • Sun: 9AM-2PM
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-xl">💬</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">WhatsApp</h4>
                    <a 
                      href="https://wa.me/250785383927" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lg text-primary-600 hover:text-primary-700 font-semibold block mt-1"
                    >
                      Chat with us
                    </a>
                    <p className="text-sm text-gray-600 mt-1">Quick responses</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4">⚡ Quick Actions</h4>
                <div className="space-y-3">
                  <a 
                    href="tel:0785383927"
                    className="block w-full text-center py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-medium transition-colors"
                  >
                    <Phone size={18} className="inline mr-2" />
                    Call Now
                  </a>
                  <a 
                    href="https://wa.me/250785383927"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-3 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg font-medium transition-colors"
                  >
                    <span className="text-lg mr-2">💬</span>
                    WhatsApp Chat
                  </a>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl shadow-xl p-8 border border-primary-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mr-4">
                  <Store size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">About GVANTO Papeterie</h3>
                  <p className="text-gray-600">Your trusted stationery partner</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Award size={18} className="text-primary-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Premium quality stationery & printing</span>
                </div>
                <div className="flex items-center">
                  <Users size={18} className="text-primary-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Serving businesses & individuals since 2020</span>
                </div>
                <div className="flex items-center">
                  <Package size={18} className="text-primary-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Fast delivery across Musanze</span>
                </div>
                <div className="flex items-center">
                  <Heart size={18} className="text-primary-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Customer satisfaction guarantee</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-primary-200">
                <h4 className="font-bold text-gray-900 mb-3">Our Values</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white border border-primary-200 text-primary-700 rounded-full text-sm">
                    Quality
                  </span>
                  <span className="px-3 py-1 bg-white border border-primary-200 text-primary-700 rounded-full text-sm">
                    Reliability
                  </span>
                  <span className="px-3 py-1 bg-white border border-primary-200 text-primary-700 rounded-full text-sm">
                    Innovation
                  </span>
                  <span className="px-3 py-1 bg-white border border-primary-200 text-primary-700 rounded-full text-sm">
                    Service
                  </span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-xl p-8 border border-amber-200">
              <div className="flex items-center mb-4">
                <Sparkles size={24} className="text-amber-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Urgent Needs?</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Need immediate assistance or have an urgent order?
              </p>
              <a 
                href="tel:0785383927"
                className="inline-flex items-center justify-center w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Phone size={20} className="mr-2" />
                Call for Urgent Support
              </a>
              <p className="text-sm text-gray-600 mt-3 text-center">
                24/7 support for urgent orders
              </p>
            </div>
          </div>
        </div>

        {/* Map & Location Section */}
        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Our Location</h3>
                  <p className="text-gray-600">30m from main Road, INES RUHENGERI Road, Musanze</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => window.open('https://www.google.com/maps/place/GVANTO+NETWORK+PAPETERIA/@-1.5038924,29.6083611,841m/data=!3m2!1e3!4b1!4m6!3m5!1s0x19dc5b33a8f7afcd:0x794aaef516ffd1bd!8m2!3d-1.5038978!4d29.610936!16s%2Fg%2F11wvqksybb?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D', '_blank')}
                  >
                    Open in Google Maps
                  </Button>
                </div>
              </div>

              {/* Business Hours */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">🕒 Business Hours</h3>
                <div className="space-y-4">
                  {[
                    { day: 'Monday - Saturday', hours: '8:00 AM - 6:00 PM' },
                    { day: 'Sunday', hours: '9:00 AM - 2:00 PM' },
                    { day: 'Public Holidays', hours: '10:00 AM - 4:00 PM' }
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-900">{schedule.day}</span>
                      <span className="text-primary-600 font-semibold">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center">
                    <Shield size={20} className="text-blue-600 mr-3" />
                    <div>
                      <h4 className="font-bold text-blue-800">Service Guarantee</h4>
                      <p className="text-sm text-blue-700">
                        We guarantee response within 24 hours for all inquiries and 
                        same-day service for urgent orders.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about our products and services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "How long does delivery take?",
                answer: "Standard delivery within Musanze takes 1-2 business days. Express delivery is available for urgent orders."
              },
              {
                question: "Do you offer custom printing?",
                answer: "Yes! We specialize in custom printing for business cards, brochures, banners, and more. Contact us with your requirements."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept cash, mobile money (MTN/Airtel), and bank transfers. All payments are secure."
              },
              {
                question: "Can I track my order?",
                answer: "Yes, we provide order tracking via WhatsApp or SMS. You'll receive updates at every stage."
              },
              {
                question: "What's your return policy?",
                answer: "We offer 7-day returns for defective products. Custom orders are non-returnable but we guarantee satisfaction."
              },
              {
                question: "Do you deliver outside Musanze?",
                answer: "Yes! We deliver nationwide with delivery times varying by location. Contact us for specific rates."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                <h4 className="font-bold text-gray-900 mb-3">Q: {faq.question}</h4>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage