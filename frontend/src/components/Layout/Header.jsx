import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  Phone, 
  MapPin, 
  ChevronDown, 
  ShoppingBag, 
  Menu, 
  X, 
  Search, 
  Clock, 
  HelpCircle,
  Home,
  Building,
  Printer,
  FileText,
  CreditCard,
  Globe,
  Smartphone,
  Package,
  Book,
  Award,
  Users,
  FileCheck,
  Layers,
  Calculator,
  Camera,
  Scissors,
  PenTool,
  Laptop,
  Download,
  BookOpen,
  Headphones,
  ShieldCheck,
  Heart,
  Sparkles,
  Truck,
  Star,
  CheckCircle,
  TrendingUp,
  Zap
} from 'lucide-react'
import Logo from './Logo'
import Button from '../UI/Button'

// Safe icon mapping - ensure all icons are properly defined
const iconMap = {
  Home: Home,
  ShoppingBag: ShoppingBag,
  Phone: Phone,
  Building: Building,
  Printer: Printer,
  FileText: FileText,
  CreditCard: CreditCard,
  Globe: Globe,
  Smartphone: Smartphone,
  Package: Package,
  Book: Book,
  Users: Users,
  FileCheck: FileCheck,
  Layers: Layers,
  Calculator: Calculator,
  Camera: Camera,
  Scissors: Scissors,
  PenTool: PenTool,
  Laptop: Laptop,
  Download: Download,
  BookOpen: BookOpen,
  Headphones: Headphones,
  ShieldCheck: ShieldCheck,
  Heart: Heart,
  MapPin: MapPin,
  Clock: Clock,
  HelpCircle: HelpCircle,
  Search: Search,
  Menu: Menu,
  X: X,
  ChevronDown: ChevronDown,
  // Add any other icons you use
}

// Safe icon component that won't crash
const SafeIcon = ({ name, size = 18, className = '', ...props }) => {
  const IconComponent = iconMap[name] || Home // Fallback to Home icon
  return <IconComponent size={size} className={className} {...props} />
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const searchRef = useRef(null)
  const searchInputRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest('button[aria-label="Menu"]')) {
        setIsMenuOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false)
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

  // Handle search - simplified to avoid dataUtils import errors
  const handleSearch = (query) => {
    setSearchQuery(query)
    // In a real app, you would call searchItems here
    // For now, just show/hide results
    if (query.trim().length > 2) {
      // Mock search results
      setSearchResults([
        { id: 1, name: 'Office Stationery Set', category: 'office-supplies', price: 5000, slug: 'office-stationery' },
        { id: 2, name: 'Document Printing', category: 'printing-services', price: 100, slug: 'document-printing' },
        { id: 3, name: 'Student Kit', category: 'school-supplies', price: 15000, slug: 'student-kit' }
      ])
      setShowSearchResults(true)
    } else {
      setShowSearchResults(false)
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/services?search=${encodeURIComponent(searchQuery)}`)
      setShowSearchResults(false)
      setSearchQuery('')
      setIsMenuOpen(false)
    }
  }

  const handleQuickOrder = () => {
    navigate('/services')
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }

  const handleViewCart = () => {
    navigate('/cart')
    setIsMenuOpen(false)
  }

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  // Enhanced navigation with safe icon references
  const navigation = [
    {
      name: 'Home',
      path: '/',
      icon: 'Home'
    },
    {
      name: 'Products',
      path: '/products',
      dropdown: [
        {
          name: 'Office Supplies',
          path: '/services?category=office-supplies',
          icon: 'Package',
          description: 'Premium stationery & office materials'
        },
        {
          name: 'School Materials',
          path: '/services?category=school-supplies',
          icon: 'Book',
          description: 'Complete educational supplies'
        },
        {
          name: 'Electronics',
          path: '/services?category=electronics',
          icon: 'Smartphone',
          description: 'Phones, chargers & accessories'
        },
        {
          name: 'Paper Products',
          path: '/services?category=paper-products',
          icon: 'FileText',
          description: 'Various paper types & sizes'
        }
      ]
    },
    {
      name: 'Services',
      path: '/services',
      dropdown: [
        {
          name: 'Printing Services',
          path: '/services?category=printing-services',
          icon: 'Printer',
          description: 'Document printing & finishing'
        },
        {
          name: 'Government Services',
          path: '/services?category=government-services',
          icon: 'Building',
          description: 'IREMBO, RRA, RDB assistance'
        },
        {
          name: 'Banking Services',
          path: '/services?category=banking-services',
          icon: 'CreditCard',
          description: 'Financial transactions & payments'
        },
        {
          name: 'Digital Services',
          path: '/services?category=digital-services',
          icon: 'Globe',
          description: 'CV writing & online services'
        }
      ]
    },
    {
      name: 'About',
      path: '/about',
      icon: 'Users'
    },
    {
      name: 'Contact',
      path: '/contact',
      icon: 'Phone'
    }
  ]

  // Enhanced top bar with gradient
  const TopAnnouncementBar = () => (
    <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 text-white py-2">
      <div className="container-custom px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex flex-wrap items-center gap-3 mb-2 md:mb-0">
            <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
              <Phone size={14} className="mr-2 text-white" />
              <a href="tel:0785383927" className="font-semibold hover:text-white/90 transition-colors">
                0785 383 927
              </a>
            </div>
            <div className="hidden lg:flex items-center bg-white/10 px-3 py-1 rounded-full">
              <MapPin size={14} className="mr-2 text-white" />
              <span className="font-medium">NM 155 Musanze Kalisimbi</span>
            </div>
            <div className="hidden xl:flex items-center bg-white/10 px-3 py-1 rounded-full">
              <Clock size={14} className="mr-2 text-white" />
              <span className="font-medium">Mon-Sat: 8AM-6PM | Sun: 9AM-2PM</span>
            </div>
          </div>
          <div className="flex items-center">
            <span className="inline-flex items-center bg-white/10 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
              <span className="font-medium">Online Orders 24/7</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )

  // Search Results Component
  const SearchResults = () => {
    if (!showSearchResults || searchResults.length === 0) return null

    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-fade-in">
        <div className="p-3">
          <div className="flex items-center justify-between mb-2 px-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Search Results
            </span>
            <span className="text-xs text-gray-500">{searchResults.length} found</span>
          </div>
          
          <div className="max-h-72 overflow-y-auto">
            {searchResults.map((item) => (
              <Link
                key={item.id}
                to={`/${item.category}/${item.id}/${item.slug}`}
                className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors group border-b border-gray-100 last:border-b-0"
                onClick={() => {
                  setShowSearchResults(false)
                  setSearchQuery('')
                }}
              >
                <div className={`p-2 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 mr-3 flex-shrink-0`}>
                  <SafeIcon name="Package" size={18} className="text-gray-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 truncate group-hover:text-primary-600">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-500 capitalize mt-0.5">
                    {item.category?.replace('-', ' ') || 'Product'}
                  </div>
                </div>
                <div className="text-sm font-bold text-primary-600 ml-3 flex-shrink-0">
                  RWF {item.price?.toLocaleString() || '0'}
                </div>
              </Link>
            ))}
          </div>
          
          {searchQuery.trim() && (
            <Link
              to={`/services?search=${encodeURIComponent(searchQuery)}`}
              className="block text-center py-3 text-sm font-semibold text-primary-600 hover:text-primary-700 border-t border-gray-100 mt-2 bg-gray-50"
              onClick={() => {
                setShowSearchResults(false)
                setSearchQuery('')
              }}
            >
              View all results for "{searchQuery}"
            </Link>
          )}
        </div>
      </div>
    )
  }

  // Desktop Navigation Item - Fixed with SafeIcon
  const DesktopNavItem = ({ item }) => {
    return (
      <div className="relative group" key={item.name}>
        {item.dropdown ? (
          <>
            <button
              className={`flex items-center px-4 py-3 font-semibold rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? 'text-primary-700 bg-primary-50'
                  : 'text-gray-800 hover:text-primary-600 hover:bg-gray-50'
              }`}
              onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
            >
              <SafeIcon name={item.icon} size={18} className="mr-2" />
              {item.name}
              <ChevronDown
                size={16}
                className={`ml-1 transition-transform duration-200 ${
                  activeDropdown === item.name ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Enhanced Mega Dropdown */}
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 mt-1 min-w-[320px] bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}
            >
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-primary-100 rounded-lg mr-3">
                    <SafeIcon name={item.icon} size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-600">Browse all {item.name.toLowerCase()}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.path}
                      className="flex items-center p-3 text-gray-800 hover:bg-primary-50 hover:text-primary-600 rounded-lg group/sub transition-all duration-150"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <SafeIcon name={subItem.icon} size={18} className="mr-3 text-gray-600 group-hover/sub:text-primary-600" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 group-hover/sub:text-primary-600">
                          {subItem.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">{subItem.description}</div>
                      </div>
                      <ChevronDown size={16} className="rotate-90 opacity-0 group-hover/sub:opacity-100 transition-opacity text-gray-400" />
                    </Link>
                  ))}
                </div>
                
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <Link
                    to={item.path}
                    className="block w-full text-center bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    onClick={() => setActiveDropdown(null)}
                  >
                    View All {item.name}
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Link
            to={item.path}
            className={`flex items-center px-4 py-3 font-semibold rounded-lg transition-all duration-200 ${
              isActive(item.path)
                ? 'text-primary-700 bg-primary-50'
                : 'text-gray-800 hover:text-primary-600 hover:bg-gray-50'
            }`}
          >
            <SafeIcon name={item.icon} size={18} className="mr-2" />
            {item.name}
          </Link>
        )}
      </div>
    )
  }

  return (
    <>
      <TopAnnouncementBar />

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
            : 'bg-white border-b border-gray-100'
        }`}
      >
        <div className="container-custom py-2 px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 mr-8">
              <Logo size="md" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1" ref={dropdownRef}>
              {navigation.map((item) => (
                <DesktopNavItem key={item.name} item={item} />
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:block relative flex-1 max-w-md mx-6" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search products, services, categories..."
                    className="w-full pl-12 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-200"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => searchQuery && setShowSearchResults(true)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('')
                        setShowSearchResults(false)
                        searchInputRef.current?.focus()
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
                <SearchResults />
              </form>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Cart Button */}
              <Link to="/cart" className="relative">
                <button className="hidden lg:flex items-center justify-center w-12 h-12 rounded-xl hover:bg-gray-100 transition-colors group relative">
                  <ShoppingBag size={22} className="text-gray-700 group-hover:text-primary-600" />
                </button>
              </Link>

              {/* Order Button - Desktop */}
              <div className="hidden lg:block">
                <button
                  onClick={handleQuickOrder}
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center group"
                >
                  <ShoppingBag size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                  Order Now
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="xl:hidden flex items-center justify-center w-12 h-12 rounded-xl hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? (
                  <X size={24} className="text-gray-700" />
                ) : (
                  <Menu size={24} className="text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div
            className="xl:hidden fixed top-0 left-0 right-0 bottom-0 bg-white z-50 overflow-y-auto"
            ref={mobileMenuRef}
          >
            {/* Mobile Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
              <div className="text-xl font-bold text-primary-600">GVANTO</div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={24} className="text-gray-700" />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="p-4 border-b border-gray-100" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search products, services..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => searchQuery && setShowSearchResults(true)}
                  />
                </div>
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-10 max-h-64 overflow-y-auto">
                    {searchResults.map((item) => (
                      <Link
                        key={item.id}
                        to={`/${item.category}/${item.id}/${item.slug}`}
                        className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                        onClick={() => {
                          setShowSearchResults(false)
                          setSearchQuery('')
                          setIsMenuOpen(false)
                        }}
                      >
                        <div className={`p-2 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 mr-3`}>
                          <SafeIcon name="Package" size={18} className="text-gray-700" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{item.name}</div>
                          <div className="text-xs text-gray-500">{item.category?.replace('-', ' ')}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </form>
            </div>

            {/* Mobile Navigation Items */}
            <div className="p-4 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div className="mb-1">
                      <button
                        className={`flex items-center justify-between w-full px-4 py-3 text-left font-semibold rounded-lg transition-colors ${
                          isActive(item.path)
                            ? 'text-primary-700 bg-primary-50'
                            : 'text-gray-800 hover:bg-gray-50'
                        }`}
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      >
                        <div className="flex items-center">
                          <SafeIcon name={item.icon} size={20} className="mr-3" />
                          {item.name}
                        </div>
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {activeDropdown === item.name && (
                        <div className="ml-12 mt-1 space-y-1 pl-2 border-l-2 border-primary-100">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className="flex items-center px-4 py-2.5 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <SafeIcon name={subItem.icon} size={18} className="mr-3" />
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-3 font-semibold rounded-lg transition-colors ${
                        isActive(item.path)
                          ? 'text-primary-700 bg-primary-50'
                          : 'text-gray-800 hover:bg-gray-50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <SafeIcon name={item.icon} size={20} className="mr-3" />
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Action Buttons */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={handleViewCart}
                  className="w-full border-2 border-gray-300 text-gray-800 hover:border-primary-600 hover:text-primary-600 font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center"
                >
                  <ShoppingBag size={20} className="mr-2" />
                  View Cart
                </button>
                <button
                  onClick={handleQuickOrder}
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center"
                >
                  <ShoppingBag size={20} className="mr-2" />
                  Order Now
                </button>
              </div>

              {/* Quick Contact */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <HelpCircle size={18} className="mr-2 text-primary-600" />
                  Need Help?
                </h4>
                <div className="space-y-3">
                  <a
                    href="tel:0785383927"
                    className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Phone size={18} className="text-primary-600 mr-3" />
                    <div>
                      <div className="font-semibold text-gray-900">Call Us</div>
                      <div className="text-sm text-gray-600">0785 383 927</div>
                    </div>
                  </a>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <MapPin size={18} className="text-primary-600 mr-3" />
                    <div>
                      <div className="font-semibold text-gray-900">Location</div>
                      <div className="text-sm text-gray-600">NM 155 Musanze Kalisimbi</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Clock size={18} className="text-primary-600 mr-3" />
                    <div>
                      <div className="font-semibold text-gray-900">Hours</div>
                      <div className="text-sm text-gray-600">Mon-Sat: 8AM-6PM</div>
                    </div>
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