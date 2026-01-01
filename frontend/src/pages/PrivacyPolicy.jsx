import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  FileText, 
  CheckCircle, 
  XCircle,
  ArrowLeft,
  HelpCircle,
  Mail,
  Phone,
  Globe,
  AlertCircle,
  Server,
  Database
} from 'lucide-react'
import Button from '@/components/UI/Button'

const PrivacyPolicy = () => {
  const lastUpdated = "December 15, 2024"
  
  const sections = [
    {
      icon: FileText,
      title: "Information Collection",
      content: "We collect minimal information necessary to process your orders and improve our services. This includes contact information, order details, and preferences. We do not store sensitive financial information.",
      points: [
        "Name and contact details for order processing",
        "Order history and preferences for better service",
        "Device information for website optimization",
        "No collection of sensitive payment information"
      ]
    },
    {
      icon: Shield,
      title: "Data Usage",
      content: "Your information is used exclusively for order fulfillment, customer support, and service improvement. We never sell or share your data with third parties for marketing purposes.",
      points: [
        "Order processing and delivery",
        "Customer support and communication",
        "Service improvement and optimization",
        "Legal compliance when required"
      ]
    },
    {
      icon: Lock,
      title: "Data Storage & Security",
      content: "We implement industry-standard security measures to protect your information. Most data is processed in real-time and not stored long-term.",
      points: [
        "Cart data stored locally in your browser",
        "No long-term storage of personal data",
        "Regular security audits and updates",
        "Encrypted communication channels"
      ]
    },
    {
      icon: EyeOff,
      title: "Third-Party Services",
      content: "We only share information with essential service providers (payment processors, delivery services) and only to the extent necessary for order fulfillment.",
      points: [
        "Payment processors for transaction completion",
        "Delivery services for order fulfillment",
        "No data sharing for advertising purposes",
        "Strict data protection agreements with partners"
      ]
    },
    {
      icon: Globe,
      title: "Your Rights",
      content: "You have complete control over your information. You can request access, correction, or deletion of your data at any time.",
      points: [
        "Right to access your information",
        "Right to correct inaccurate data",
        "Right to request deletion",
        "Right to opt-out of communications"
      ]
    },
    {
      icon: Database,
      title: "Local Storage Usage",
      content: "We use browser local storage to temporarily store your shopping cart items. This data is only accessible on your device and is automatically cleared when you close your browser.",
      points: [
        "Cart items stored locally on your device",
        "No server-side storage of cart data",
        "Automatic clearing on browser closure",
        "You can manually clear cart data anytime"
      ]
    }
  ]

  const keyPoints = [
    {
      icon: CheckCircle,
      title: "We Do",
      color: "text-green-600",
      bgColor: "bg-green-50",
      items: [
        "Use minimal data for order processing",
        "Protect your information with security measures",
        "Allow control over your data",
        "Clear local storage data regularly"
      ]
    },
    {
      icon: XCircle,
      title: "We Don't",
      color: "text-red-600",
      bgColor: "bg-red-50",
      items: [
        "Store sensitive payment information",
        "Share data with advertisers",
        "Keep long-term personal data records",
        "Track your browsing outside our site"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-50 via-white to-secondary-50 py-16 border-b border-gray-200">
        <div className="container-custom px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-6">
              <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors">
                <ArrowLeft size={20} className="mr-2" />
                Back to Home
              </Link>
            </div>
            
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-50 text-primary-600 rounded-2xl mb-6 shadow-lg">
                <Shield size={40} />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Privacy <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Policy</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-6">
                Your privacy is our priority. Learn how GVANTO Papeterie protects your information.
              </p>
              
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 text-primary-700 rounded-full text-sm font-medium border border-primary-200">
                <AlertCircle size={16} className="mr-2" />
                Last Updated: {lastUpdated}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FileText size={24} className="mr-3 text-primary-600" />
              Our Commitment to Privacy
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                At <strong>GVANTO Papeterie</strong>, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and protect your data when you use our services.
              </p>
              <p className="mb-4">
                We believe in transparency and want you to understand exactly how your information is handled. Unlike many modern businesses, we intentionally minimize data collection and storage to protect your privacy.
              </p>
              <p className="mb-4">
                This policy applies to all information collected through our website, mobile applications, and in-store services. By using our services, you agree to the practices described in this policy.
              </p>
            </div>
          </div>

          {/* Key Points Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {keyPoints.map((point, index) => (
              <div 
                key={index}
                className={`rounded-2xl p-6 ${point.bgColor} border border-gray-200 shadow-sm`}
              >
                <div className="flex items-center mb-4">
                  <point.icon size={24} className={`mr-3 ${point.color}`} />
                  <h3 className="text-xl font-bold text-gray-900">{point.title}</h3>
                </div>
                <ul className="space-y-3">
                  {point.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle size={16} className={point.color} />
                      </div>
                      <span className="ml-3 text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Detailed Sections */}
          <div className="space-y-8 mb-12">
            {sections.map((section, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-50 rounded-lg flex items-center justify-center mr-4">
                      <section.icon size={24} className="text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {section.title}
                      </h3>
                      <p className="text-gray-700 mb-4">
                        {section.content}
                      </p>
                      <ul className="space-y-2">
                        {section.points.map((point, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                            </div>
                            <span className="ml-3 text-gray-600">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Local Storage Explanation */}
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 mb-12 border border-primary-100">
            <div className="flex items-start mb-6">
              <div className="flex-shrink-0 w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center mr-4">
                <Server size={28} className="text-primary-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  About Local Storage Usage
                </h3>
                <p className="text-gray-700">
                  We use your browser's local storage to temporarily save your shopping cart items. This approach enhances your shopping experience while protecting your privacy.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                  <Eye size={20} className="mr-2 text-green-600" />
                  What We Store Locally
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Cart items and quantities</li>
                  <li>• Product preferences</li>
                  <li>• Session information</li>
                  <li>• No personal identification data</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                  <Lock size={20} className="mr-2 text-blue-600" />
                  Privacy Protection
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Data stays on your device only</li>
                  <li>• Automatically cleared when you close browser</li>
                  <li>• You can manually clear it anytime</li>
                  <li>• Never transmitted to our servers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact & Questions */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <HelpCircle size={24} className="mr-3 text-primary-600" />
              Questions & Contact
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                    <Mail size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <a 
                      href="mailto:gashakavinc@gmail.com" 
                      className="text-primary-600 hover:text-primary-700 text-sm"
                    >
                      gashakavinc@gmail.com
                    </a>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  For privacy-related inquiries and data requests
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                    <Phone size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <a 
                      href="tel:0785383927" 
                      className="text-primary-600 hover:text-primary-700"
                    >
                      0785 383 927
                    </a>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  For urgent privacy concerns during business hours
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                    <FileText size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-sm text-gray-700">
                      30m from main Road, INES RUHENGERI Road, Musanze
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Visit us for in-person privacy discussions
                </p>
              </div>
            </div>
            
            <div className="bg-primary-50 rounded-xl p-6 border border-primary-100">
              <h4 className="font-bold text-gray-900 mb-3">Policy Updates</h4>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the new policy on our website with an updated effective date.
              </p>
              <div className="flex items-center text-sm text-gray-600">
                <AlertCircle size={16} className="mr-2" />
                Last updated: {lastUpdated}
              </div>
            </div>
          </div>
          
          {/* Back to Home */}
          <div className="text-center mt-12">
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

export default PrivacyPolicy