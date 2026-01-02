import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, MessageSquare, HelpCircle } from 'lucide-react'
import Logo from './Logo'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Government Services', path: '/government' },
    { name: 'Banking Services', path: '/banking' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  const services = [
    'Printing & Documentation',
    'Public Secretariat',
    'IREMBO Services',
    'RRA Tax Services',
    'RDB Business Registration',
    'Land & Title Services',
    'MIFOTRA Applications',
    'Education Services',
    'Immigration Services',
    'Banking & Payment Services'
  ]

  const products = [
    'Office Materials & Supplies',
    'School Stationery',
    'Electronic Devices',
    'Telephones & Accessories',
    'Paper Products',
    'Printing Materials'
  ]

  const contactInfo = [
    { icon: Phone, text: '0785 383 927', link: 'tel:0785383927' },
    { icon: Mail, text: 'gashakavinc@gmail.com', link: 'mailto:gashakavinc@gmail.com' },
    { icon: MapPin, text: '30m from main Road, INES RUHENGERI Road, Musanze' },
  ]

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container-custom py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="mb-4">
              <Logo size="md" />
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your trusted partner for office supplies, school materials, digital government services, 
              and professional printing solutions in Musanze, Rwanda.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="bg-gray-800 hover:bg-primary-600 p-2 rounded-lg transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index} className="text-gray-300 flex items-start">
                  <span className="text-primary-400 mr-2">•</span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Products & Contact */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800">Our Products</h3>
              <ul className="space-y-2">
                {products.map((product, index) => (
                  <li key={index} className="text-gray-300 flex items-start">
                    <span className="text-primary-400 mr-2">•</span>
                    {product}
                </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800">Contact Info</h3>
              <div className="space-y-3">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3 group">
                    <div className="bg-gray-800 group-hover:bg-primary-600 p-2 rounded-lg transition-colors duration-200">
                      <info.icon size={16} className="text-primary-400 group-hover:text-white" />
                    </div>
                    {info.link ? (
                      <a 
                        href={info.link} 
                        className="text-gray-300 hover:text-white transition-colors flex-1"
                      >
                        {info.text}
                      </a>
                    ) : (
                      <span className="text-gray-300 flex-1">{info.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Oliviuus Ltd. All rights reserved.
            </p>

            {/* Legal & Help Links */}
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link 
                to="/privacy" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              
              <div className="w-px h-4 bg-gray-700"></div>
              
              <Link 
                to="/terms" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Terms of Service
              </Link>
              
              <div className="w-px h-4 bg-gray-700"></div>
              
              <Link 
                to="/feedback" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center"
              >
                <MessageSquare size={14} className="mr-1.5" />
                Feedback
              </Link>
              
              <div className="w-px h-4 bg-gray-700"></div>
              
              <Link 
                to="/help" 
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center"
              >
                <HelpCircle size={14} className="mr-1.5" />
                Help
              </Link>
            </div>
          </div>

          {/* Business Info */}
          <div className="mt-4 pt-4 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-500">
              Registered Business in Rwanda • VAT Registered • Professional Services Provider
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Operating Hours: Mon-Sat 8:00 AM - 6:00 PM | Sun 9:00 AM - 2:00 PM
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons for Mobile */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <div className="flex flex-col space-y-2">
          <a 
            href="tel:0785383927" 
            className="bg-black hover:bg-primary-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center"
            aria-label="Call us"
          >
            <Phone size={20} />
          </a>
          <a 
            href="mailto:gashakavinc@gmail.com" 
            className="bg-black hover:bg-secondary-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center"
            aria-label="Email us"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer