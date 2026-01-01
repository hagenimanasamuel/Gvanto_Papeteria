import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  MessageSquare, 
  Star, 
  ThumbsUp, 
  Send, 
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Smile,
  Frown,
  Meh,
  User,
  Mail,
  ShoppingBag,
  Headphones,
  Truck,
  FileText,
  Award,
  Heart,
  Phone,
  Loader2
} from 'lucide-react'
import Button from '@/components/UI/Button'
import { sendCustomOrder } from '@/utils/emailService'

const Feedback = () => {
  const [feedbackType, setFeedbackType] = useState('general')
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    allowContact: true,
    feedbackCategory: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const feedbackTypes = [
    {
      id: 'general',
      icon: MessageSquare,
      title: 'General Feedback',
      description: 'Share your overall experience with GVANTO Papeterie',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50'
    },
    {
      id: 'product',
      icon: ShoppingBag,
      title: 'Product Feedback',
      description: 'Feedback about specific products or services',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50'
    },
    {
      id: 'service',
      icon: Headphones,
      title: 'Service Experience',
      description: 'Share your experience with our customer service',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50'
    },
    {
      id: 'delivery',
      icon: Truck,
      title: 'Delivery Feedback',
      description: 'Feedback about order delivery and logistics',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50'
    },
    {
      id: 'suggestion',
      icon: FileText,
      title: 'Suggestions',
      description: 'Ideas to improve our products or services',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-blue-50'
    },
    {
      id: 'complaint',
      icon: AlertCircle,
      title: 'Complaint',
      description: 'Report issues or concerns',
      color: 'from-red-500 to-rose-500',
      bgColor: 'bg-gradient-to-br from-red-50 to-rose-50'
    }
  ]

  const ratingLabels = [
    { value: 1, icon: Frown, label: 'Very Poor', color: 'text-red-500' },
    { value: 2, icon: Meh, label: 'Poor', color: 'text-orange-500' },
    { value: 3, icon: Meh, label: 'Average', color: 'text-yellow-500' },
    { value: 4, icon: Smile, label: 'Good', color: 'text-green-500' },
    { value: 5, icon: Heart, label: 'Excellent', color: 'text-emerald-500' }
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name.trim()) {
      setSubmitError('Please enter your name')
      return
    }
    
    if (!formData.email.trim()) {
      setSubmitError('Please enter your email address')
      return
    }
    
    if (!formData.message.trim()) {
      setSubmitError('Please enter your feedback message')
      return
    }
    
    if (rating === 0) {
      setSubmitError('Please rate your experience')
      return
    }
    
    setSubmitError('')
    setIsSubmitting(true)

    try {
      // Get feedback type details
      const selectedType = feedbackTypes.find(type => type.id === feedbackType)
      
      // Prepare feedback content
      const feedbackContent = `
FEEDBACK TYPE: ${selectedType?.title || 'General Feedback'}
RATING: ${rating}/5 (${ratingLabels.find(l => l.value === rating)?.label})
SUBJECT: ${formData.subject}

FEEDBACK MESSAGE:
${formData.message}

CUSTOMER INFORMATION:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Contact Allowed: ${formData.allowContact ? 'Yes' : 'No'}

FEEDBACK METADATA:
Submitted: ${new Date().toLocaleString()}
Page: Feedback Page
Rating: ${rating} stars
Category: ${feedbackType}
      `.trim()

      // Send using custom order template (similar to contact form)
      const result = await sendCustomOrder({
        fullName: formData.name.trim(),
        phone: formData.phone.replace(/\D/g, '') || 'Not provided',
        email: formData.email.trim(),
        customRequest: feedbackContent,
        specialRequirements: `Feedback Type: ${selectedType?.title || 'General'} | Rating: ${rating}/5`,
        urgency: feedbackType === 'complaint' ? 'high' : 'normal',
        productName: 'Feedback Submission',
        productCategory: 'Customer Feedback',
        productPrice: 'N/A',
        project_type: selectedType?.title || 'Feedback',
        quantity: '1',
        deadline: 'For review',
        budget_range: 'N/A'
      })

      if (result.success) {
        setIsSubmitted(true)
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          allowContact: true,
          feedbackCategory: 'general'
        })
        setRating(0)
        setFeedbackType('general')
        
        // Reset success message after 8 seconds
        setTimeout(() => {
          setIsSubmitted(false)
        }, 8000)
        
      } else {
        throw new Error(result.error || 'Failed to submit feedback')
      }
    } catch (error) {
      console.error('Feedback submission error:', error)
      setSubmitError('Failed to submit feedback. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const recentTestimonials = [
    {
      name: 'NSABIYERA Innocent',
      role: 'Airtel Tsm',
      rating: 5,
      comment: 'Excellent office supplies and timely delivery. Our users love the quality!',
      date: '2 days ago'
    },
    {
      name: 'HAGENIMANA Samuel',
      role: 'Oliviuus Founder & Chairman',
      rating: 4,
      comment: 'Great office supplies and printing services. The team is very professional.',
      date: '1 week ago'
    },
    {
      name: 'MANISHIMWE Olivier',
      role: 'Customer',
      rating: 5,
      comment: 'Fast IREMBO service processing. Saved me hours of waiting time.',
      date: '3 days ago'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-50 via-white to-secondary-50 py-16 border-b border-gray-200">
        <div className="container-custom px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-6">
              <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors group">
                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </div>
            
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-50 text-primary-600 rounded-2xl mb-6 shadow-lg">
                <MessageSquare size={40} />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Share Your <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Feedback</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-6">
                Your opinion matters! Help us improve GVANTO Papeterie by sharing your experience.
              </p>
              
              <div className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-medium shadow-sm border border-gray-200">
                <ThumbsUp size={16} className="mr-2 text-green-500" />
                We respond to all feedback within 24 hours
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {isSubmitted && (
        <div className="container-custom px-4 mt-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 shadow-lg animate-fade-in">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircle size={32} className="text-green-500 mr-4" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You for Your Feedback! 🎉</h3>
                  <p className="text-gray-700 mb-4">
                    We appreciate you taking the time to share your experience. Your feedback has been sent to our team and we'll review it carefully to improve our services.
                  </p>
                  
                  <div className="bg-white rounded-lg p-4 border border-green-200 mb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < rating ? "text-amber-500 fill-current" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        {rating}/5 rating ({ratingLabels.find(l => l.value === rating)?.label})
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Feedback Type: <span className="font-semibold">{feedbackTypes.find(ft => ft.id === feedbackType)?.title}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="flex items-center mr-4">
                      <Mail size={14} className="mr-1" />
                      Confirmation sent to: {formData.email}
                    </div>
                    <div className="text-xs text-gray-500">
                      This message will auto-close in 8 seconds
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container-custom px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Feedback Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Send size={24} className="mr-3 text-primary-600" />
                  Send Your Feedback
                </h2>
                
                {/* Error Message */}
                {submitError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
                    <div className="flex items-center">
                      <AlertCircle size={20} className="text-red-500 mr-3" />
                      <p className="text-red-700">{submitError}</p>
                    </div>
                  </div>
                )}
                
                {/* Feedback Type Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">What type of feedback would you like to share?</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {feedbackTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => {
                            setFeedbackType(type.id)
                            setFormData(prev => ({ ...prev, feedbackCategory: type.id }))
                          }}
                          disabled={isSubmitting}
                          className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                            feedbackType === type.id
                              ? `border-transparent bg-gradient-to-r ${type.color} text-white shadow-lg transform -translate-y-1`
                              : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-md'
                          } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                            feedbackType === type.id ? 'bg-white/20' : type.bgColor
                          }`}>
                            <Icon size={24} className={feedbackType === type.id ? 'text-white' : `text-gradient-to-r ${type.color.split(' ')[1]}`} />
                          </div>
                          <h4 className="font-semibold mb-1">{type.title}</h4>
                          <p className="text-xs opacity-90">{type.description}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>
                
                {/* Rating */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">How would you rate your experience?</h3>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center space-x-2 mb-4">
                      {ratingLabels.map((label) => {
                        const Icon = label.icon
                        const isActive = (hoverRating || rating) >= label.value
                        return (
                          <button
                            key={label.value}
                            type="button"
                            onClick={() => !isSubmitting && setRating(label.value)}
                            onMouseEnter={() => !isSubmitting && setHoverRating(label.value)}
                            onMouseLeave={() => !isSubmitting && setHoverRating(0)}
                            disabled={isSubmitting}
                            className={`relative group ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                              isActive
                                ? `bg-gradient-to-r ${feedbackTypes.find(ft => ft.id === feedbackType)?.color || 'from-primary-500 to-secondary-500'} shadow-lg transform scale-110`
                                : 'bg-gray-100 group-hover:bg-gray-200'
                            }`}>
                              <Icon size={28} className={isActive ? 'text-white' : label.color} />
                            </div>
                            {!isSubmitting && (
                              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {label.label}
                              </div>
                            )}
                          </button>
                        )
                      })}
                    </div>
                    <div className="text-sm text-gray-600">
                      {rating === 0 ? 'Select a rating' : `You rated: ${ratingLabels.find(l => l.value === rating)?.label}`}
                    </div>
                  </div>
                </div>
                
                {/* Feedback Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2 flex items-center">
                        <User size={16} className="mr-2 text-gray-500" />
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="John Doe"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2 flex items-center">
                        <Mail size={16} className="mr-2 text-gray-500" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="john@example.com"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2 flex items-center">
                        <Phone size={16} className="mr-2 text-gray-500" />
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="0785 383 927"
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2 flex items-center">
                        <FileText size={16} className="mr-2 text-gray-500" />
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="Brief description of your feedback"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2 flex items-center">
                      <MessageSquare size={16} className="mr-2 text-gray-500" />
                      Detailed Feedback *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                      placeholder="Please share your detailed feedback, suggestions, or concerns..."
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="allowContact"
                      name="allowContact"
                      checked={formData.allowContact}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      disabled={isSubmitting}
                    />
                    <label htmlFor="allowContact" className="ml-2 text-sm text-gray-700">
                      I allow GVANTO Papeterie to contact me regarding this feedback
                    </label>
                  </div>
                  
                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={20} className="mr-3 animate-spin" />
                          Sending Feedback...
                        </>
                      ) : (
                        <>
                          <Send size={20} className="mr-2 group-hover:translate-y-[-2px] transition-transform" />
                          Submit Feedback
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-gray-500 text-center mt-3">
                      We value your feedback and will respond within 24 hours
                    </p>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Recent Testimonials & Info */}
            <div className="space-y-6">
              {/* Recent Testimonials */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Star size={20} className="mr-2 text-amber-500" />
                  Recent Testimonials
                </h3>
                <div className="space-y-4">
                  {recentTestimonials.map((testimonial, index) => (
                    <div 
                      key={index}
                      className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < testimonial.rating ? "text-amber-500 fill-current" : "text-gray-300"}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">{testimonial.date}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">"{testimonial.comment}"</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">{testimonial.name}</div>
                          <div className="text-xs text-gray-600">{testimonial.role}</div>
                        </div>
                        <Award size={16} className="text-primary-500" />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 text-center">
                    💬 See more testimonials on our{' '}
                    <a href="/testimonials" className="text-primary-600 hover:text-primary-700 font-medium">
                      Testimonials page
                    </a>
                  </p>
                </div>
              </div>
              
              {/* Why Feedback Matters */}
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Heart size={20} className="mr-2 text-primary-600" />
                  Why Your Feedback Matters
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Helps us improve product quality</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Guides service enhancement</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Informs future product offerings</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Creates better customer experiences</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Helps us serve you better</span>
                  </li>
                </ul>
              </div>
              
              {/* Alternative Contact */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Other Ways to Reach Us</h3>
                <div className="space-y-3">
                  <a
                    href="tel:0785383927"
                    className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                  >
                    <Phone size={18} className="text-primary-600 mr-3" />
                    <div>
                      <div className="font-semibold text-gray-900">Call Us</div>
                      <div className="text-sm text-gray-600">0785 383 927</div>
                    </div>
                  </a>
                  <a
                    href="mailto:feedback@gvanto-papeterie.com"
                    className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                  >
                    <Mail size={18} className="text-primary-600 mr-3" />
                    <div>
                      <div className="font-semibold text-gray-900">Email Us</div>
                      <div className="text-sm text-gray-600">feedback@gvanto-papeterie.com</div>
                    </div>
                  </a>
                  <Link
                    to="/contact"
                    className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                  >
                    <Headphones size={18} className="text-primary-600 mr-3" />
                    <div>
                      <div className="font-semibold text-gray-900">Visit Contact Page</div>
                      <div className="text-sm text-gray-600">Send a detailed message</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Privacy Notice */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-start">
                <AlertCircle size={20} className="text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">📋 Feedback Processing</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Your feedback is sent directly to our management team via email. We review all submissions personally and use them to make meaningful improvements.
                  </p>
                  <p className="text-sm text-gray-600">
                    Your information is confidential. We do not share personal details with third parties. For more details, read our{' '}
                    <Link to="/privacy-policy" className="text-primary-600 hover:text-primary-700 font-medium">
                      Privacy Policy
                    </Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feedback