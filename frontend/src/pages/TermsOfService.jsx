import React from 'react'
import { Link } from 'react-router-dom'
import { 
  FileText, 
  Scale, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  ArrowLeft,
  HelpCircle,
  ShoppingBag,
  CreditCard,
  Truck,
  Shield,
  RefreshCw,
  Clock,
  UserCheck,
  BookOpen,
  Award,
  Phone 
} from 'lucide-react'
import Button from '@/components/UI/Button'

const TermsOfService = () => {
  const effectiveDate = "December 15, 2024"
  
  const sections = [
    {
      icon: UserCheck,
      title: "Acceptance of Terms",
      content: "By accessing and using GVANTO Papeterie's services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please discontinue use of our services immediately.",
      points: [
        "You must be at least 18 years old to use our services",
        "Agreement to all terms and conditions is mandatory",
        "Terms apply to all services, products, and platforms",
        "Continued use constitutes ongoing acceptance"
      ]
    },
    {
      icon: ShoppingBag,
      title: "Products & Services",
      content: "We strive to provide accurate product descriptions and pricing. However, we reserve the right to correct errors, update information, and modify offerings without prior notice.",
      points: [
        "Product availability is subject to change",
        "Prices are subject to change without notice",
        "We reserve the right to limit quantities",
        "Descriptions and images are for reference only"
      ]
    },
    {
      icon: CreditCard,
      title: "Orders & Payments",
      content: "All orders are subject to acceptance and availability. We accept various payment methods and process transactions securely.",
      points: [
        "Order confirmation does not guarantee availability",
        "Payment must be completed before processing",
        "We accept cash, mobile money, and bank transfers",
        "Prices are in Rwandan Francs (RWF)"
      ]
    },
    {
      icon: Truck,
      title: "Delivery & Fulfillment",
      content: "We aim to fulfill orders promptly. Delivery times may vary based on location, product availability, and service type.",
      points: [
        "Delivery times are estimates only",
        "Additional charges may apply for remote areas",
        "Risk of loss transfers upon delivery",
        "Signature may be required for delivery"
      ]
    },
    {
      icon: RefreshCw,
      title: "Returns & Refunds",
      content: "We accept returns and provide refunds under specific conditions. Please review our return policy carefully.",
      points: [
        "Returns must be initiated within 7 days",
        "Products must be in original condition",
        "Service fees may be non-refundable",
        "Refunds processed within 5-10 business days"
      ]
    },
    {
      icon: Shield,
      title: "Limitation of Liability",
      content: "GVANTO Papeterie's liability is limited to the maximum extent permitted by law. We are not liable for indirect or consequential damages.",
      points: [
        "Maximum liability limited to order value",
        "Not liable for service delays beyond our control",
        "Not responsible for third-party service issues",
        "Liability limitations survive termination"
      ]
    }
  ]

  const importantClauses = [
    {
      icon: CheckCircle,
      title: "Your Responsibilities",
      color: "text-blue-600",
      items: [
        "Provide accurate information for orders",
        "Maintain security of your account",
        "Comply with all applicable laws",
        "Respect intellectual property rights"
      ]
    },
    {
      icon: AlertCircle,
      title: "Important Limitations",
      color: "text-amber-600",
      items: [
        "Services provided 'as is' without warranties",
        "We may modify or discontinue services",
        "Terms may change with notice",
        "Disputes governed by Rwandan law"
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
                <Scale size={40} />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Terms of <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Service</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-6">
                Legal terms governing your use of GVANTO Papeterie's products and services.
              </p>
              
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 text-primary-700 rounded-full text-sm font-medium border border-primary-200">
                <Clock size={16} className="mr-2" />
                Effective Date: {effectiveDate}
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
              <BookOpen size={24} className="mr-3 text-primary-600" />
              Welcome to GVANTO Papeterie
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                These Terms of Service ("Terms") govern your access to and use of GVANTO Papeterie's website, mobile applications, products, and services ("Services"). Please read these Terms carefully before using our Services.
              </p>
              <p className="mb-4">
                By accessing or using our Services, you agree to be bound by these Terms. If you are using our Services on behalf of an organization, you are agreeing to these Terms for that organization and promising that you have the authority to bind that organization to these Terms.
              </p>
              <p className="mb-4">
                Our Services are provided by GVANTO Papeterie, located at 30m from main Road, INES RUHENGERI Road, Musanze, Rwanda. For any questions about these Terms, please contact us at <a href="mailto:gashakavinc@gmail.com" className="text-primary-600 hover:text-primary-700">gashakavinc@gmail.com</a>.
              </p>
            </div>
          </div>

          {/* Important Clauses */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {importantClauses.map((clause, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 ${clause.color.replace('text', 'bg')}/10 rounded-lg flex items-center justify-center mr-3`}>
                    <clause.icon size={24} className={clause.color} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{clause.title}</h3>
                </div>
                <ul className="space-y-3">
                  {clause.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className={`w-2 h-2 rounded-full ${clause.color.replace('text', 'bg')}`}></div>
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

          {/* Additional Terms */}
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 mb-12 border border-primary-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Award size={28} className="mr-3 text-primary-600" />
              Additional Legal Terms
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-3">Intellectual Property</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• All content on our platforms is protected by copyright</li>
                  <li>• GVANTO Papeterie trademarks are our property</li>
                  <li>• No unauthorized use of our intellectual property</li>
                  <li>• Limited license granted for personal use only</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-3">Governing Law</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• These Terms are governed by Rwandan law</li>
                  <li>• Disputes resolved in Musanze courts</li>
                  <li>• English version prevails over translations</li>
                  <li>• Severability clause included</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-3">Changes to Terms</h4>
              <p className="text-gray-600 mb-3">
                We may modify these Terms at any time. We will provide notice of significant changes through our website or direct communication. Your continued use of our Services after changes constitutes acceptance of the new Terms.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <AlertCircle size={16} className="mr-2" />
                Check this page regularly for updates
              </div>
            </div>
          </div>

          {/* Contact & Questions */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <HelpCircle size={24} className="mr-3 text-primary-600" />
              Questions & Contact
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Need Clarification?</h4>
                <p className="text-gray-700 mb-6">
                  If you have any questions about these Terms of Service, please don't hesitate to contact us. We're here to help clarify any provisions and ensure you understand your rights and responsibilities.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                      <FileText size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Legal Inquiries</h5>
                      <a 
                        href="mailto:gashakavinc@gmail.com" 
                        className="text-primary-600 hover:text-primary-700 text-sm"
                      >
                        gashakavinc@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                      <Phone size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">General Questions</h5>
                      <a 
                        href="tel:0785383927" 
                        className="text-primary-600 hover:text-primary-700"
                      >
                        0785 383 927
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Visit Us</h4>
                <p className="text-gray-700 mb-6">
                  For in-person discussions about our terms or any other concerns, visit our physical location during business hours.
                </p>
                
                <div className="bg-gray-50 rounded-xl p-5">
                  <h5 className="font-semibold text-gray-900 mb-2">GVANTO Papeterie</h5>
                  <p className="text-gray-600 text-sm mb-3">
                    30m from main Road, INES RUHENGERI Road, Musanze,<br />
                     Rwanda
                  </p>
                  <div className="text-xs text-gray-500">
                    <div className="flex justify-between mb-1">
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
            </div>
          </div>
          
          {/* Agreement Notice */}
          <div className="mt-8 bg-amber-50 rounded-xl p-6 border border-amber-200">
            <div className="flex items-start">
              <AlertCircle size={24} className="text-amber-600 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Important Notice</h4>
                <p className="text-gray-700">
                  By using GVANTO Papeterie's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these Terms, please discontinue use of our services immediately.
                </p>
                <div className="mt-4 text-sm text-gray-600 flex items-center">
                  <Clock size={14} className="mr-2" />
                  These Terms are effective as of {effectiveDate}
                </div>
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

export default TermsOfService