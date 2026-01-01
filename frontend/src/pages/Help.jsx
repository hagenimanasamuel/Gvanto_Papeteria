import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  HelpCircle, 
  Search, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  CheckCircle,
  ArrowLeft,
  ChevronRight,
  ShoppingBag,
  Printer,
  Building,
  CreditCard,
  Truck,
  FileText,
  Package,
  Book,
  Smartphone,
  Globe,
  Users,
  MapPin,
  Shield,
  Zap,
  AlertCircle,
  Download,
  Headphones
} from 'lucide-react'
import Button from '@/components/UI/Button'

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [openFaq, setOpenFaq] = useState(null)

  const helpCategories = [
    {
      id: 'orders',
      icon: ShoppingBag,
      title: 'Orders & Purchases',
      color: 'from-blue-500 to-cyan-500',
      questions: 12
    },
    {
      id: 'services',
      icon: Printer,
      title: 'Services',
      color: 'from-green-500 to-emerald-500',
      questions: 8
    },
    {
      id: 'delivery',
      icon: Truck,
      title: 'Delivery & Shipping',
      color: 'from-purple-500 to-pink-500',
      questions: 6
    },
    {
      id: 'payments',
      icon: CreditCard,
      title: 'Payments',
      color: 'from-amber-500 to-orange-500',
      questions: 10
    },
    {
      id: 'government',
      icon: Building,
      title: 'Government Services',
      color: 'from-red-500 to-rose-500',
      questions: 15
    },
    {
      id: 'account',
      icon: Users,
      title: 'Account & Profile',
      color: 'from-indigo-500 to-blue-500',
      questions: 5
    },
    {
      id: 'technical',
      icon: Smartphone,
      title: 'Technical Support',
      color: 'from-teal-500 to-emerald-500',
      questions: 7
    },
    {
      id: 'other',
      icon: HelpCircle,
      title: 'Other Questions',
      color: 'from-gray-500 to-gray-700',
      questions: 9
    }
  ]

  const popularQuestions = [
    {
      id: 1,
      category: 'orders',
      question: 'How do I place an order?',
      answer: 'You can place an order through our website, mobile app, or by visiting our physical store. Online orders require creating an account or proceeding as a guest.',
      popular: true
    },
    {
      id: 2,
      category: 'delivery',
      question: 'What are your delivery times?',
      answer: 'Delivery times vary by location and product. In Musanze, we offer same-day delivery for orders placed before 3 PM. Outside Musanze, delivery takes 2-3 business days.',
      popular: true
    },
    {
      id: 3,
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept cash, mobile money (MTN & Airtel), bank transfers, and credit/debit cards. All online payments are processed securely.',
      popular: true
    },
    {
      id: 4,
      category: 'government',
      question: 'How long does IREMBO service processing take?',
      answer: 'Most IREMBO services are processed within 24-48 hours. Complex services may take up to 3 business days. We provide regular updates throughout the process.',
      popular: true
    },
    {
      id: 5,
      category: 'services',
      question: 'Do you offer printing services?',
      answer: 'Yes! We offer professional printing, photocopying, binding, laminating, and passport photo services. Visit our store or upload documents online.',
      popular: true
    },
    {
      id: 6,
      category: 'orders',
      question: 'Can I modify or cancel my order?',
      answer: 'You can modify or cancel your order within 1 hour of placement. After that, please contact our customer service team immediately.',
      popular: true
    },
    {
      id: 7,
      category: 'delivery',
      question: 'Do you deliver outside Musanze?',
      answer: 'Yes, we deliver nationwide across Rwanda. Delivery charges vary based on location. Contact us for specific delivery quotes.',
      popular: true
    },
    {
      id: 8,
      category: 'technical',
      question: 'How do I track my order?',
      answer: 'You can track your order through your account dashboard or by contacting our customer service team. We provide tracking numbers for all deliveries.',
      popular: true
    }
  ]

  const faqSections = [
    {
      title: 'Ordering & Products',
      icon: ShoppingBag,
      questions: [
        {
          q: 'How do I check product availability?',
          a: 'Product availability is shown on each product page. For real-time stock information, you can contact our customer service team.'
        },
        {
          q: 'Do you offer bulk discounts?',
          a: 'Yes, we offer special discounts for bulk orders from schools, businesses, and government institutions. Contact our sales team for customized quotes.'
        },
        {
          q: 'Can I pre-order items?',
          a: 'Yes, we accept pre-orders for upcoming products. A deposit may be required for certain items.'
        }
      ]
    },
    {
      title: 'Services & Support',
      icon: Headphones,
      questions: [
        {
          q: 'What services do you offer?',
          a: 'We offer office supplies, school materials, printing services, government service assistance, banking services, digital services, and document processing.'
        },
        {
          q: 'How fast is your printing service?',
          a: 'Standard printing is completed within 30 minutes. Large orders may take 2-4 hours. Express service is available for urgent requests.'
        },
        {
          q: 'Do you offer CV writing services?',
          a: 'Yes, we provide professional CV writing, editing, and formatting services. Delivery typically takes 24-48 hours.'
        }
      ]
    },
    {
      title: 'Delivery & Returns',
      icon: Truck,
      questions: [
        {
          q: 'What is your return policy?',
          a: 'We accept returns within 7 days of purchase. Products must be unused and in original packaging. Service fees are generally non-refundable.'
        },
        {
          q: 'Is delivery free?',
          a: 'We offer free delivery within Musanze for orders above RWF 10,000. Outside Musanze, delivery charges apply based on location.'
        },
        {
          q: 'What if my order arrives damaged?',
          a: 'Contact us immediately with photos of the damaged items. We will arrange for replacement or refund within 24 hours.'
        }
      ]
    },
    {
      title: 'Payment & Security',
      icon: Shield,
      questions: [
        {
          q: 'Is my payment information secure?',
          a: 'Yes, all payments are processed through secure, encrypted channels. We do not store credit card information on our servers.'
        },
        {
          q: 'Can I pay on delivery?',
          a: 'Yes, cash on delivery is available for orders within Musanze. A small surcharge may apply for this service.'
        },
        {
          q: 'Do you offer invoice for businesses?',
          a: 'Yes, we provide professional invoices for all business purchases. You can request invoices through your account or by contacting us.'
        }
      ]
    }
  ]

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our support team',
      details: '0785 383 927',
      action: 'tel:0785383927',
      color: 'from-green-500 to-emerald-500',
      available: 'Mon-Sat: 8AM-6PM, Sun: 9AM-2PM'
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us detailed questions',
      details: 'gashakavinc@gmail.com',
      action: 'mailto:gashakavinc@gmail.com',
      color: 'from-blue-500 to-cyan-500',
      available: 'Response within 4 hours'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Instant messaging support',
      details: 'Available on website',
      action: '',
      color: 'from-purple-500 to-pink-500',
      available: 'Mon-Sat: 9AM-5PM'
    },
    {
      icon: MapPin,
      title: 'Visit Store',
      description: 'In-person assistance',
      details: '30m from main Road, INES RUHENGERI Road, Musanze',
      action: 'https://www.google.com/maps/place/GVANTO+NETWORK+PAPETERIA/@-1.5038924,29.6083611,841m/data=!3m2!1e3!4b1!4m6!3m5!1s0x19dc5b33a8f7afcd:0x794aaef516ffd1bd!8m2!3d-1.5038978!4d29.610936!16s%2Fg%2F11wvqksybb?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D',
      color: 'from-amber-500 to-orange-500',
      available: 'Mon-Sat: 8AM-6PM, Sun: 9AM-2PM'
    }
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search logic
    console.log('Searching for:', searchQuery)
  }

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const filteredQuestions = popularQuestions.filter(q => 
    activeCategory === 'all' || q.category === activeCategory
  )

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
                <HelpCircle size={40} />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                How Can We <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Help You?</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                Find answers to common questions or get in touch with our support team.
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search for answers... (e.g., 'delivery', 'payment', 'printing')"
                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 shadow-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-primary-600 to-secondary-600 text-black px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Help Categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {helpCategories.map((category) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                      activeCategory === category.id
                        ? `border-transparent bg-gradient-to-r ${category.color} text-white shadow-lg transform -translate-y-1`
                        : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-md'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                      activeCategory === category.id ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                      <Icon size={24} className={activeCategory === category.id ? 'text-white' : 'text-gray-600'} />
                    </div>
                    <h3 className="font-semibold mb-1">{category.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs opacity-90">{category.questions} questions</span>
                      {activeCategory === category.id && (
                        <ChevronRight size={16} />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Popular Questions */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Popular Questions</h2>
              <span className="text-sm text-gray-600">
                {filteredQuestions.length} questions found
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {filteredQuestions.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-50 rounded-lg flex items-center justify-center">
                          <HelpCircle size={20} className="text-primary-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                          {item.question}
                        </h3>
                        <div className="flex items-center">
                          <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {helpCategories.find(c => c.id === item.category)?.title}
                          </span>
                          {item.popular && (
                            <span className="inline-flex items-center px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full ml-2">
                              <Zap size={10} className="mr-1" />
                              Popular
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      {openFaq === index ? (
                        <ChevronRight size={20} className="text-primary-600 transform rotate-90" />
                      ) : (
                        <ChevronRight size={20} className="text-gray-400 group-hover:text-primary-600 transition-colors" />
                      )}
                    </div>
                  </button>
                  
                  <div 
                    className={`px-6 overflow-hidden transition-all duration-300 ${
                      openFaq === index ? 'max-h-48 pb-5' : 'max-h-0'
                    }`}
                  >
                    <div className="pl-14 pr-4 pt-2">
                      <div className="prose prose-sm text-gray-600">
                        <p>{item.answer}</p>
                      </div>
                      <div className="mt-4 flex items-center space-x-4">
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock size={12} className="mr-1" />
                          Updated recently
                        </span>
                        <span className="text-xs text-primary-600 flex items-center cursor-pointer hover:text-primary-700">
                          <CheckCircle size={12} className="mr-1" />
                          Was this helpful?
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Sections */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-8">
              {faqSections.map((section, sectionIndex) => {
                const Icon = section.icon
                return (
                  <div key={sectionIndex} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl flex items-center justify-center mr-4">
                          <Icon size={24} className="text-primary-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
                      </div>
                    </div>
                    
                    <div className="divide-y divide-gray-100">
                      {section.questions.map((faq, faqIndex) => {
                        const uniqueIndex = sectionIndex * 10 + faqIndex
                        return (
                          <div key={uniqueIndex} className="group">
                            <button
                              onClick={() => toggleFaq(uniqueIndex)}
                              className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                                </div>
                                <span className="ml-4 font-medium text-gray-900 group-hover:text-primary-600">
                                  {faq.q}
                                </span>
                              </div>
                              <div className="flex-shrink-0 ml-4">
                                {openFaq === uniqueIndex ? (
                                  <ChevronRight size={20} className="text-primary-600 transform rotate-90" />
                                ) : (
                                  <ChevronRight size={20} className="text-gray-400 group-hover:text-primary-600" />
                                )}
                              </div>
                            </button>
                            
                            <div 
                              className={`px-6 overflow-hidden transition-all duration-300 ${
                                openFaq === uniqueIndex ? 'max-h-48 pb-5' : 'max-h-0'
                              }`}
                            >
                              <div className="pl-10 pr-4">
                                <div className="prose prose-sm text-gray-600 bg-gray-50 rounded-lg p-4">
                                  <p>{faq.a}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Contact Methods */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Need More Help? Contact Us
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon
                return (
                  <a
                    key={index}
                    href={method.action}
                    target={method.action.startsWith('http') ? '_blank' : '_self'}
                    rel={method.action.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 h-full">
                      <div className={`w-14 h-14 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={28} className="text-black" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{method.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                      <div className="text-primary-600 font-semibold mb-2">{method.details}</div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Clock size={12} className="mr-1" />
                        {method.available}
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-primary-600 group-hover:text-primary-700">
                        <span className="text-sm font-medium">Get Help</span>
                        <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 mb-12 border border-primary-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <AlertCircle size={24} className="mr-3 text-primary-600" />
              Quick Tips for Faster Help
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                  <FileText size={20} className="mr-2 text-blue-600" />
                  Prepare Before Contacting
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    Have your order number ready
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    Take photos of any issues
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    Note down specific details
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                  <Download size={20} className="mr-2 text-green-600" />
                  Useful Resources
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <ChevronRight size={16} className="text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                    <Link to="/privacy" className="text-primary-600 hover:text-primary-700">
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={16} className="text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                    <Link to="/terms" className="text-primary-600 hover:text-primary-700">
                      Terms of Service
                    </Link>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={16} className="text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                    <Link to="/feedback" className="text-primary-600 hover:text-primary-700">
                      Submit Feedback
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-50 rounded-lg flex items-center justify-center">
                    <Headphones size={24} className="text-primary-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Still Need Help?</h4>
                  <p className="text-gray-600">
                    Our customer service team is available to assist you with any questions or concerns.
                  </p>
                </div>
                <div className="ml-auto">
                  <a href="tel:0785383927">
                    <Button variant="primary" className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 !text-black">
                      Call Support Now
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Back to Home */}
          <div className="text-center">
            <Link to="/">
              <Button variant="outline" size="lg" className="group">
                <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Help