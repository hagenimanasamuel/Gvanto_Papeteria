import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Phone, MapPin, ChevronDown, ShoppingBag, Menu, X, Search, Clock, HelpCircle } from 'lucide-react'
import Logo from './Logo'
import Button from '../UI/Button'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)
  const mobileMenuRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('button[aria-label="Menu"]')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    {
      name: 'Home',
      path: '/',
      icon: '🏠'
    },
    {
      name: 'Products',
      path: '/products',
      dropdown: [
        { name: 'Office Materials', path: '/products/office', icon: '📁' },
        { name: 'School Materials', path: '/products/school', icon: '📚' },
        { name: 'Electronics', path: '/products/electronics', icon: '🔌' },
        { name: 'Telephones', path: '/products/phones', icon: '📱' },
        { name: 'Paper Products', path: '/products/paper', icon: '📄' }
      ]
    },
    {
      name: 'Services',
      path: '/services',
      dropdown: [
        { name: 'Printing Services', path: '/services/printing', icon: '🖨️' },
        { name: 'Documentation', path: '/services/documentation', icon: '📝' },
        { name: 'Secretariat', path: '/services/secretariat', icon: '💼' },
        { name: 'CV Writing', path: '/services/cv-writing', icon: '✍️' }
      ]
    },
    {
      name: 'Government',
      path: '/government',
      dropdown: [
        { name: 'IREMBO Services', path: '/government/irembo', icon: '🏛️' },
        { name: 'RRA Tax Services', path: '/government/rra', icon: '💰' },
        { name: 'RDB Registration', path: '/government/rdb', icon: '📋' },
        { name: 'Land Services', path: '/government/land', icon: '🏡' },
        { name: 'MIFOTRA', path: '/government/mifotra', icon: '👨‍💼' },
        { name: 'Education Services', path: '/government/education', icon: '🎓' },
        { name: 'Immigration', path: '/government/immigration', icon: '🛂' }
      ]
    },
    {
      name: 'Banking',
      path: '/banking',
      dropdown: [
        { name: 'Deposits/Withdrawals', path: '/banking/transactions', icon: '🏦' },
        { name: 'School Fees Payment', path: '/banking/school-fees', icon: '🎒' },
        { name: 'Supported Banks', path: '/banking/banks', icon: '💳' }
      ]
    },
    {
      name: 'Support',
      path: '/support',
      dropdown: [
        { name: 'FAQ', path: '/support/faq', icon: '❓' },
        { name: 'How-to Guides', path: '/support/guides', icon: '📖' },
        { name: 'Contact Support', path: '/support/contact', icon: '💬' },
        { name: 'Service Status', path: '/support/status', icon: '📊' }
      ]
    }
  ]

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  const handleOrderClick = () => {
    navigate('/order')
    setIsMenuOpen(false)
  }

  const handleQuickOrder = (service) => {
    navigate('/order', { state: { service } })
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }

  return (
    <>
      {/* Top Announcement Bar - FIXED: Updated address and phone */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container-custom px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="flex items-center space-x-4 mb-2 md:mb-0">
              <div className="flex items-center">
                <Phone size={14} className="mr-2" />
                <span className="font-medium">0785 383 927</span>
              </div>
              <div className="hidden lg:flex items-center">
                <MapPin size={14} className="mr-2" />
                <span>NM 155 Musanze Kalisimbi, Musanze</span>
              </div>
              <div className="hidden xl:flex items-center">
                <Clock size={14} className="mr-2" />
                <span>Mon-Sat: 8AM-6PM | Sun: 9AM-2PM</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="hidden sm:inline-flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                <span>Online Services Available 24/7</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white shadow-md'
          }`}
      >
        <div className="container-custom py-3 px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <Logo size="md" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1" ref={dropdownRef}>
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  {item.dropdown ? (
                    <>
                      <button
                        className={`flex items-center px-4 py-3 font-medium rounded-lg transition-all duration-200 ${isActive(item.path)
                            ? 'text-primary-700 bg-primary-50'
                            : 'text-gray-800 hover:text-primary-600 hover:bg-gray-50'
                          }`}
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      >
                        <span className="mr-2">{item.icon}</span>
                        {item.name}
                        <ChevronDown
                          size={16}
                          className={`ml-1 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''
                            }`}
                        />
                      </button>

                      {/* Mega Dropdown */}
                      <div
                        className={`absolute left-0 mt-1 min-w-[280px] bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2`}
                      >
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="mr-2">{item.icon}</span>
                            {item.name} Services
                          </h3>
                          <div className="space-y-1">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                className="flex items-center px-4 py-3 text-gray-800 hover:bg-primary-50 hover:text-primary-600 rounded-lg group/sub transition-all duration-150"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <span className="mr-3 text-lg">{subItem.icon}</span>
                                <div className="flex-1">
                                  <div className="font-medium">{subItem.name}</div>
                                </div>
                                <div className="opacity-0 group-hover/sub:opacity-100 transition-opacity">
                                  <ChevronDown size={16} className="rotate-90" />
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <button
                              onClick={() => handleQuickOrder(item.name)}
                              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                            >
                              Order {item.name}
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-3 font-medium rounded-lg transition-all duration-200 ${isActive(item.path)
                          ? 'text-primary-700 bg-primary-50'
                          : 'text-gray-800 hover:text-primary-600 hover:bg-gray-50'
                        }`}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Side Actions - REMOVED: Cart button, FIXED: Order Now button */}
            <div className="flex items-center space-x-3">
              {/* Search Button */}
              <button className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors">
                <Search size={20} className="text-gray-600" />
              </button>

              {/* Order Button - Desktop - FIXED: Proper button styling */}
              <div className="hidden lg:block">
                <button
                  onClick={handleOrderClick}
                  className="bg-primary-600 hover:bg-primary-700 text-black font-medium py-2.5 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center"
                >
                  <ShoppingBag size={18} className="mr-2" />
                  Order Now
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="xl:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div
            className="xl:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100 max-h-[calc(100vh-140px)] overflow-y-auto"
            ref={mobileMenuRef}
          >
            <div className="container-custom py-4">
              {/* Mobile Search */}
              <div className="mb-4 px-2">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products & services..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Mobile Navigation Items */}
              <div className="space-y-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div className="mb-1">
                        <button
                          className={`flex items-center justify-between w-full px-4 py-3 text-left font-medium rounded-lg transition-colors ${isActive(item.path)
                              ? 'text-primary-700 bg-primary-50'
                              : 'text-gray-800 hover:bg-gray-50'
                            }`}
                          onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        >
                          <div className="flex items-center">
                            <span className="mr-3 text-lg">{item.icon}</span>
                            {item.name}
                          </div>
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''
                              }`}
                          />
                        </button>

                        {activeDropdown === item.name && (
                          <div className="ml-8 mt-1 space-y-1 border-l-2 border-gray-200 pl-4">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                className="flex items-center px-4 py-2.5 text-gray-800 hover:text-primary-600 hover:bg-gray-50 rounded-lg"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <span className="mr-3">{subItem.icon}</span>
                                {subItem.name}
                              </Link>
                            ))}
                            <button
                              onClick={() => handleQuickOrder(item.name)}
                              className="w-full mt-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                            >
                              Quick Order
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className={`flex items-center px-4 py-3 font-medium rounded-lg transition-colors ${isActive(item.path)
                            ? 'text-primary-700 bg-primary-50'
                            : 'text-gray-800 hover:bg-gray-50'
                          }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="mr-3 text-lg">{item.icon}</span>
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Action Buttons */}
              <div className="mt-6 pt-6 border-t border-gray-200 px-2">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      navigate('/support')
                      setIsMenuOpen(false)
                    }}
                    className="w-full border-2 border-gray-300 text-gray-800 hover:border-primary-600 hover:text-primary-600 font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <HelpCircle size={18} className="mr-2" />
                    Support
                  </button>
                  <button
                    onClick={handleOrderClick}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-black font-medium py-2.5 px-4 rounded-lg shadow-md transition-colors flex items-center justify-center"
                  >
                    <ShoppingBag size={18} className="mr-2" />
                    Order Now
                  </button>
                </div>

                {/* Quick Contact */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm text-gray-800">Need help?</p>
                      <p className="text-sm text-gray-600">Call us now</p>
                    </div>
                    <a
                      href="tel:0785383927"
                      className="flex items-center text-primary-600 font-semibold hover:text-primary-700"
                    >
                      <Phone size={16} className="mr-2" />
                      0785 383 927
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default Header