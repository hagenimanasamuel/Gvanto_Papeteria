import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { 
  ChevronLeft, 
  ChevronRight, 
  ShoppingBag, 
  Printer, 
  FileText, 
  Building, 
  Banknote, 
  Shield, 
  Clock, 
  CheckCircle,
  Sparkles,
  ArrowRight,
  Phone,
  MapPin,
  Mail,
  Star,
  Users,
  Award,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Package,
  CreditCard,
  FileCheck
} from 'lucide-react'
import Button from '@/components/UI/Button'

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const slideRef = useRef(null)

  // Enhanced products for slider
  const featuredProducts = [
    {
      id: 1,
      name: 'Premium Office Stationery',
      category: 'Office Materials',
      description: 'High-quality files, folders, pens, staplers, printers & office essentials',
      image: '📁',
      icon: ShoppingBag,
      features: ['Premium Quality Materials', 'Bulk Order Discounts', 'Same Day Delivery'],
      stats: { sales: '500+', rating: '4.9' },
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-50 via-white to-cyan-50'
    },
    {
      id: 2,
      name: 'Complete School Supplies',
      category: 'Education Materials',
      description: 'Exercise books, pens, pencils, rulers, school bags & mathematical sets',
      image: '📚',
      icon: FileText,
      features: ['Complete Student Kits', 'School Discounts', 'Custom Branding'],
      stats: { sales: '300+', rating: '4.8' },
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-green-50 via-white to-emerald-50'
    },
    {
      id: 3,
      name: 'Professional Printing Services',
      category: 'Printing & Documentation',
      description: 'Document printing, photocopying, binding, laminating & passport photos',
      image: '🖨️',
      icon: Printer,
      features: ['High-Quality Prints', 'Same Day Service', 'Large Format Available'],
      stats: { sales: '1000+', rating: '4.9' },
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-50 via-white to-pink-50'
    },
    {
      id: 4,
      name: 'Government Services Assistance',
      category: 'Digital Services',
      description: 'IREMBO, RRA tax, RDB registration, land services & immigration',
      image: '🏛️',
      icon: Building,
      features: ['Expert Assistance', 'Fast Processing', 'Document Support'],
      stats: { sales: '200+', rating: '5.0' },
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-gradient-to-br from-red-50 via-white to-orange-50'
    },
    {
      id: 5,
      name: 'Banking & Payment Services',
      category: 'Financial Services',
      description: 'Deposits, withdrawals, school fees payments & bank transactions',
      image: '🏦',
      icon: Banknote,
      features: ['Multiple Banks', 'Secure Transactions', 'Quick Processing'],
      stats: { sales: '400+', rating: '4.8' },
      color: 'from-amber-500 to-yellow-500',
      bgColor: 'bg-gradient-to-br from-amber-50 via-white to-yellow-50'
    }
  ]

  // Services
  const services = [
    {
      icon: Printer,
      title: 'Printing Services',
      description: 'Document printing, photocopying, binding & laminating',
      count: '500+',
      label: 'Pages Daily'
    },
    {
      icon: FileText,
      title: 'Documentation',
      description: 'CV writing, application letters, online form filling',
      count: '200+',
      label: 'Clients Monthly'
    },
    {
      icon: Building,
      title: 'Government Services',
      description: 'IREMBO, RRA, RDB, Land services assistance',
      count: '50+',
      label: 'Services Available'
    },
    {
      icon: Shield,
      title: 'Secure Services',
      description: 'Banking, payments, and confidential document handling',
      count: '100%',
      label: 'Secure Processing'
    }
  ]

  // Stats
  const stats = [
    { number: '5,000+', label: 'Happy Customers', icon: Users },
    { number: '10+', label: 'Years Experience', icon: Award },
    { number: '50+', label: 'Services Offered', icon: CheckCircle },
    { number: '98%', label: 'Satisfaction Rate', icon: Star }
  ]

  // FAQ Items
  const faqItems = [
    {
      question: 'What services do you offer at GVANTO Papeterie?',
      answer: 'We offer a complete range of services including office supplies, school materials, professional printing, government service assistance (IREMBO, RRA, RDB), banking services, document processing, CV writing, and digital services.'
    },
    {
      question: 'Do you offer bulk discounts for schools or businesses?',
      answer: 'Yes! We provide special discounts for bulk orders from schools, businesses, and government institutions. Contact us with your requirements for a customized quote.'
    },
    {
      question: 'How fast can I get government services processed?',
      answer: 'Our expert team ensures fastest processing for all government services. Most IREMBO services are completed within 24-48 hours, while document processing time depends on specific requirements.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept cash, mobile money (MTN, Airtel), bank transfers, and credit/debit cards. We also assist with banking transactions including deposits and withdrawals.'
    },
    {
      question: 'What are your business hours?',
      answer: 'We are open Monday to Saturday from 8:00 AM to 6:00 PM, and Sunday from 9:00 AM to 2:00 PM. You can also reach us via phone for urgent inquiries outside business hours.'
    }
  ]

  // Enhanced slide animation
  const handleSlideChange = (direction) => {
    if (isAnimating) return
    setIsAnimating(true)
    
    if (direction === 'next') {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length)
    } else {
      setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length)
    }
    
    setTimeout(() => setIsAnimating(false), 700)
  }

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 700)
  }

  // Auto slide with enhanced timing
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      if (!isAnimating) {
        setCurrentSlide((prev) => (prev + 1) % featuredProducts.length)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isAnimating])

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container-custom py-12 md:py-20 px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Enhanced Hero Content */}
            <div className="space-y-6 animate-fade-up">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-black rounded-full text-sm font-medium animate-pulse-slow shadow-lg">
                <Sparkles size={16} className="mr-2 animate-spin-slow" />
                Premium Stationery & Digital Services
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Complete{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text">
                    Business Solution
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-3 bg-primary-200 opacity-40 rounded-lg transform -rotate-1"></span>
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                GVANTO Papeterie delivers premium office supplies, school materials, professional printing, 
                government service assistance, and banking services—all in one convenient location in Musanze.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
  variant="primary" 
  size="lg"
  className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 !text-black shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group"
>
  <ShoppingBag size={20} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
  Shop Products
  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
</Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-primary-600 text-primary-600 hover:bg-primary-50 hover:border-primary-700 hover:text-primary-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Phone size={20} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Call Now: 0785 383 927
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <CheckCircle size={20} className="text-green-500 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-700">Quality Guaranteed</span>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <Clock size={20} className="text-primary-500 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-700">Fast Service</span>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <Shield size={20} className="text-secondary-500 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-700">Secure Processing</span>
                </div>
              </div>
            </div>
            
            {/* Enhanced Product Slider */}
            <div className="relative" ref={slideRef}>
              <div 
                className="relative h-[450px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl group"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setTimeout(() => setIsAutoPlaying(true), 1000)}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Slides with enhanced animations */}
                {featuredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${
                      index === currentSlide
                        ? 'opacity-100 scale-100 rotate-0'
                        : index < currentSlide
                        ? 'opacity-0 scale-90 -translate-x-full rotate-[-5deg]'
                        : 'opacity-0 scale-90 translate-x-full rotate-[5deg]'
                    }`}
                  >
                    <div className={`h-full ${product.bgColor} p-8 flex flex-col justify-between relative overflow-hidden`}>
                      {/* Product Header */}
                      <div>
                        <div className="flex justify-between items-start mb-6">
                          <div className="text-7xl transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                            {product.image}
                          </div>
                          <div className="text-right">
                            <span className="inline-block px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold shadow-lg">
                              {product.category}
                            </span>
                            <div className="mt-2 flex items-center justify-end space-x-1">
                              <Star size={14} className="text-yellow-500 fill-current" />
                              <span className="text-sm font-bold">{product.stats.rating}</span>
                              <span className="text-xs text-gray-500">({product.stats.sales})</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Product Title with gradient */}
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                          <span className={`bg-gradient-to-r ${product.color} bg-clip-text text-transparent`}>
                            {product.name}
                          </span>
                        </h3>
                        
                        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                          {product.description}
                        </p>
                        
                        {/* Features */}
                        <ul className="space-y-3">
                          {product.features.map((feature, idx) => (
                            <li 
                              key={idx} 
                              className="flex items-center text-gray-600"
                            >
                              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mr-3 shadow-sm">
                                <CheckCircle size={12} className="text-white" />
                              </div>
                              <span className="font-medium">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Action Button */}
                      <div className="pt-6 border-t border-white/30 mt-4">
                        <button className="w-full group/btn">
                          <div className="relative overflow-hidden rounded-xl">
                            <div className={`absolute inset-0 bg-gradient-to-r ${product.color} opacity-90 group-hover/btn:opacity-100 transition-opacity duration-300`}></div>
                            <div className="relative bg-white/10 backdrop-blur-sm py-4 px-6 flex items-center justify-between group-hover/btn:bg-white/20 transition-all duration-300">
                              <div className="flex items-center">
                                <div className="bg-white/20 p-2 rounded-lg mr-3 group-hover/btn:bg-white/30 transition-colors duration-300">
                                  <product.icon size={20} className="text-white" />
                                </div>
                                <div className="text-left">
                                  <div className="text-white font-bold text-lg">View Details</div>
                                  <div className="text-white/80 text-sm">Click to explore</div>
                                </div>
                              </div>
                              <div className="bg-white/20 p-2 rounded-full group-hover/btn:bg-white/30 group-hover/btn:translate-x-1 transition-all duration-300">
                                <ArrowRight size={20} className="text-black" />
                              </div>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Enhanced Navigation Arrows */}
                <button
                  onClick={() => handleSlideChange('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full shadow-2xl transition-all duration-300 group/arrow opacity-0 group-hover:opacity-100"
                  aria-label="Previous slide"
                  disabled={isAnimating}
                >
                  <div className="relative">
                    <ChevronLeft size={24} className="text-black group-hover/arrow:text-primary-600 transition-colors duration-300" />
                    <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover/arrow:scale-100 transition-transform duration-300"></div>
                  </div>
                </button>
                
                <button
                  onClick={() => handleSlideChange('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full shadow-2xl transition-all duration-300 group/arrow opacity-0 group-hover:opacity-100"
                  aria-label="Next slide"
                  disabled={isAnimating}
                >
                  <div className="relative">
                    <ChevronRight size={24} className="text-black group-hover/arrow:text-primary-600 transition-colors duration-300" />
                    <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover/arrow:scale-100 transition-transform duration-300"></div>
                  </div>
                </button>
                
                {/* Enhanced Slide Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {featuredProducts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      disabled={isAnimating}
                      className={`relative transition-all duration-500 ease-out ${
                        index === currentSlide ? 'w-10' : 'w-2 hover:w-4'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    >
                      <div className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? 'bg-gradient-to-r from-white to-gray-200 shadow-lg' 
                          : 'bg-white/60 hover:bg-white/80'
                      }`}></div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-2 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-50 text-primary-600 rounded-lg mb-4">
                  <stat.icon size={24} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-black">Premium Services</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions for all your office, school, and digital service needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-50 text-primary-600 rounded-xl mb-6 group-hover:bg-gradient-to-br group-hover:from-primary-600 group-hover:to-secondary-600 group-hover:text-white transition-all duration-300">
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <div className="text-2xl font-bold text-primary-600 group-hover:text-secondary-600 transition-colors duration-300">{service.count}</div>
                    <div className="text-sm text-gray-500">{service.label}</div>
                  </div>
                  <ArrowRight size={20} className="text-gray-400 group-hover:text-primary-600 transition-all duration-300 group-hover:translate-x-2" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline" size="lg" className="group">
                View All Services
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get quick answers to common questions about our products and services
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-50 text-primary-600 rounded-lg flex items-center justify-center mr-4">
                      <HelpCircle size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    {openFaq === index ? (
                      <ChevronUp size={20} className="text-primary-600" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-400" />
                    )}
                  </div>
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}
                >
                  <div className="pl-14 pr-4">
                    <div className="prose prose-lg text-gray-600">
                      <p>{item.answer}</p>
                    </div>
                    {index === 0 && (
                      <div className="mt-4 flex items-center space-x-4 text-sm">
                        <span className="flex items-center text-primary-600">
                          <Package size={16} className="mr-1" />
                          Products
                        </span>
                        <span className="flex items-center text-secondary-600">
                          <FileCheck size={16} className="mr-1" />
                          Services
                        </span>
                        <span className="flex items-center text-green-600">
                          <CreditCard size={16} className="mr-1" />
                          Payments
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Still have questions? We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg"
                className="group"
              >
                <Phone size={20} className="mr-2" />
                Call for Assistance
              </Button>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="container-custom px-4">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Location Info */}
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Visit Our Store in <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Musanze</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 group">
                    <div className="bg-gradient-to-br from-primary-100 to-primary-50 p-3 rounded-lg group-hover:from-primary-600 group-hover:to-secondary-600 group-hover:text-white transition-all duration-300">
                      <MapPin size={24} className="text-primary-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Our Location</h3>
                      <p className="text-gray-600">NM 155 Musanze Kalisimbi, Musanze, Rwanda</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 group">
                    <div className="bg-gradient-to-br from-primary-100 to-primary-50 p-3 rounded-lg group-hover:from-primary-600 group-hover:to-secondary-600 group-hover:text-white transition-all duration-300">
                      <Phone size={24} className="text-primary-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                      <a href="tel:0785383927" className="text-primary-600 hover:text-primary-700 text-lg font-medium">
                        0785 383 927
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 group">
                    <div className="bg-gradient-to-br from-primary-100 to-primary-50 p-3 rounded-lg group-hover:from-primary-600 group-hover:to-secondary-600 group-hover:text-white transition-all duration-300">
                      <Mail size={24} className="text-primary-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                      <a href="mailto:gashakavinc@gmail.com" className="text-primary-600 hover:text-primary-700">
                        gashakavinc@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-2">Business Hours</h4>
                  <div className="space-y-1 text-gray-600">
                    <div className="flex justify-between">
                      <span>Monday - Saturday:</span>
                      <span className="font-medium">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span className="font-medium">9:00 AM - 2:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map Placeholder/Contact Form */}
              <div className="bg-gradient-to-br from-gray-100 to-white p-8 md:p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin size={40} className="text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Easy to Find Location
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Located in central Musanze for convenient access. Ample parking available.
                  </p>
                  <Button variant="primary" size="lg" className="group">
                    <p className='text-gray-600'>Get Directions</p>
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300 text-gray-600" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-black">
        <div className="container-custom px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Visit us today or contact us for all your stationery and service needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              className="bg-black text-white hover:bg-white/10 border-2 border-white/20 group"
            >
              <ShoppingBag size={20} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
              Browse Products
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 group"
            >
              <Phone size={20} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
              Call Now: 0785 383 927
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home