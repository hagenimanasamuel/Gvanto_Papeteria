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
  Users,
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
  Star,
  CheckCircle,
  TrendingUp,
  Zap
} from 'lucide-react'
import Logo from './Logo'

// Safe icon mapping
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
  Star: Star,
  CheckCircle: CheckCircle,
  TrendingUp: TrendingUp,
  Zap: Zap,
}

const SafeIcon = ({ name, size = 18, className = '', ...props }) => {
  const IconComponent = iconMap[name] || Home
  return <IconComponent size={size} className={className} {...props} />
}

// Mock data for search - similar to what's in AllServices
const mockSearchData = [
  {
    id: 1,
    name: 'Office Stationery Set',
    category: 'office-supplies',
    price: 5000,
    slug: 'office-stationery',
    icon: 'Package',
    description: 'Complete office stationery package',
    rating: 4.5,
    reviews: 24,
    deliveryTime: '1-2 Days',
    popular: true,
    type: 'product'
  },
  {
    id: 2,
    name: 'Document Printing',
    category: 'printing-services',
    price: 100,
    slug: 'document-printing',
    icon: 'Printer',
    description: 'High-quality document printing',
    rating: 4.8,
    reviews: 36,
    deliveryTime: 'Same Day',
    popular: true,
    type: 'service'
  },
  {
    id: 3,
    name: 'Student Kit',
    category: 'school-supplies',
    price: 15000,
    slug: 'student-kit',
    icon: 'Book',
    description: 'Complete student essentials package',
    rating: 4.3,
    reviews: 18,
    deliveryTime: '1-3 Days',
    featured: true,
    type: 'product'
  },
  {
    id: 4,
    name: 'Government Services Assistance',
    category: 'government-services',
    price: 2000,
    slug: 'government-services',
    icon: 'Building',
    description: 'IREMBO, RRA, RDB documentation',
    rating: 4.7,
    reviews: 42,
    deliveryTime: '2-3 Days',
    popular: true,
    type: 'service'
  },
  {
    id: 5,
    name: 'Banking Services',
    category: 'banking-services',
    price: 1500,
    slug: 'banking-services',
    icon: 'CreditCard',
    description: 'Financial transactions and payments',
    rating: 4.6,
    reviews: 29,
    deliveryTime: '1 Day',
    type: 'service'
  },
  {
    id: 6,
    name: 'Smartphone Accessories',
    category: 'electronics',
    price: 8000,
    slug: 'smartphone-accessories',
    icon: 'Smartphone',
    description: 'Phone chargers and accessories',
    rating: 4.4,
    reviews: 31,
    deliveryTime: '1-2 Days',
    type: 'product'
  },
  {
    id: 7,
    name: 'CV Writing Service',
    category: 'digital-services',
    price: 3000,
    slug: 'cv-writing',
    icon: 'FileText',
    description: 'Professional CV writing and editing',
    rating: 4.9,
    reviews: 55,
    deliveryTime: '2 Days',
    featured: true,
    type: 'service'
  },
  {
    id: 8,
    name: 'Paper Products Pack',
    category: 'paper-products',
    price: 2500,
    slug: 'paper-products',
    icon: 'FileText',
    description: 'Various paper types and sizes',
    rating: 4.2,
    reviews: 16,
    deliveryTime: '1-2 Days',
    type: 'product'
  },
  {
    id: 9,
    name: 'Photocopy Services',
    category: 'printing-services',
    price: 50,
    slug: 'photocopy-services',
    icon: 'Printer',
    description: 'High-speed photocopying',
    rating: 4.5,
    reviews: 28,
    deliveryTime: 'Same Day',
    type: 'service'
  },
  {
    id: 10,
    name: 'Laptop Accessories',
    category: 'electronics',
    price: 12000,
    slug: 'laptop-accessories',
    icon: 'Laptop',
    description: 'Laptop bags and accessories',
    rating: 4.3,
    reviews: 22,
    deliveryTime: '2-3 Days',
    type: 'product'
  }
]

// Search function similar to AllServices component
const searchItems = (query) => {
  if (!query.trim()) return []
  
  const searchTerm = query.toLowerCase().trim()
  
  return mockSearchData.filter(item => {
    // Search in multiple fields
    return (
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm) ||
      item.type.toLowerCase().includes(searchTerm)
    )
  })
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const searchRef = useRef(null)
  const searchInputRef = useRef(null)
  const mobileSearchInputRef = useRef(null)
  const searchResultsRef = useRef(null)

  // Close dropdowns when clicking outside - IMPROVED VERSION
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close dropdowns
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
      
      // Close mobile menu
      if (mobileMenuRef.current && 
          !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest('button[aria-label*="Menu"]') &&
          !event.target.closest('button[aria-label*="Close"]')) {
        setIsMenuOpen(false)
      }
      
      // Close search results
      if (searchRef.current && 
          !searchRef.current.contains(event.target) &&
          !event.target.closest('.search-result-item')) {
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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }, [location])

  // Focus mobile search input when menu opens
  useEffect(() => {
    if (isMenuOpen && mobileSearchInputRef.current) {
      setTimeout(() => {
        mobileSearchInputRef.current?.focus()
      }, 100)
    }
  }, [isMenuOpen])

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query.trim().length > 1) {
      const results = searchItems(query)
      setSearchResults(results)
      setShowSearchResults(true)
    } else {
      setShowSearchResults(false)
      setSearchResults([])
    }
  }

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/services?search=${encodeURIComponent(searchQuery)}`)
      setShowSearchResults(false)
      setSearchQuery('')
      setIsMenuOpen(false)
    }
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setShowSearchResults(false)
    setSearchResults([])
    searchInputRef.current?.focus()
    mobileSearchInputRef.current?.focus()
  }

  const handleResultClick = () => {
    setShowSearchResults(false)
    setSearchQuery('')
    setSearchResults([])
    setIsMenuOpen(false)
  }

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

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

  const TopAnnouncementBar = () => (
    <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 text-black py-2">
      <div className="container-custom px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex flex-wrap items-center gap-3 mb-2 md:mb-0">
            <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
              <Phone size={14} className="mr-2 text-black" />
              <a href="tel:0785383927" className="font-semibold hover:text-black/90 transition-colors">
                0785 383 927
              </a>
            </div>
            <div className="hidden lg:flex items-center bg-white/10 px-3 py-1 rounded-full">
              <MapPin size={14} className="mr-2 text-black" />
              <span className="font-medium">30m from main Road, INES RUHENGERI Road, Musanze</span>
            </div>
            <div className="hidden xl:flex items-center bg-white/10 px-3 py-1 rounded-full">
              <Clock size={14} className="mr-2 text-black" />
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

  const SearchResults = () => {
    if (!showSearchResults) return null

    return (
      <div 
        ref={searchResultsRef}
        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden animate-fadeIn"
      >
        <div className="p-3">
          <div className="flex items-center justify-between mb-2 px-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Search Results
            </span>
            <span className="text-xs text-gray-500">
              {searchResults.length} {searchResults.length === 1 ? 'item' : 'items'} found
            </span>
          </div>
          
          {searchResults.length === 0 ? (
            <div className="text-center py-6">
              <Search size={32} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-700 font-medium">No results found for "{searchQuery}"</p>
              <p className="text-sm text-gray-500 mt-1">Try different keywords</p>
            </div>
          ) : (
            <>
              <div className="max-h-72 overflow-y-auto">
                {searchResults.map((item) => (
                  <Link
                    key={item.id}
                    to={`/${item.category}/${item.id}/${item.slug}`}
                    className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors group border-b border-gray-100 last:border-b-0 search-result-item"
                    onClick={handleResultClick}
                  >
                    <div className={`p-2 rounded-lg ${
                      item.type === 'service' 
                        ? 'bg-gradient-to-br from-green-100 to-emerald-100'
                        : 'bg-gradient-to-br from-blue-100 to-indigo-100'
                    } mr-3 flex-shrink-0`}>
                      <SafeIcon name={item.icon} size={18} className={
                        item.type === 'service' ? 'text-emerald-600' : 'text-indigo-600'
                      } />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="font-semibold text-gray-900 truncate group-hover:text-primary-600">
                          {item.name}
                        </div>
                        {item.popular && (
                          <span className="flex-shrink-0 inline-flex items-center px-2 py-0.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold rounded-full">
                            <TrendingUp size={10} className="mr-1" />
                            Popular
                          </span>
                        )}
                        {item.featured && (
                          <span className="flex-shrink-0 inline-flex items-center px-2 py-0.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full">
                            <Star size={10} className="mr-1" />
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 capitalize mt-0.5">
                        {item.category?.replace('-', ' ') || 'Product'}
                        {item.type && ` • ${item.type}`}
                      </div>
                      <div className="flex items-center mt-1">
                        <Star size={12} className="text-yellow-500 fill-current mr-1" />
                        <span className="text-xs font-bold text-gray-900">{item.rating || 4.5}</span>
                        {item.reviews && (
                          <span className="text-xs text-gray-500 ml-1">({item.reviews})</span>
                        )}
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-xs text-gray-600">{item.deliveryTime}</span>
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
                  className="block text-center py-3 text-sm font-semibold text-primary-600 hover:text-primary-700 border-t border-gray-100 mt-2 bg-gray-50 hover:bg-gray-100 transition-colors search-result-item"
                  onClick={handleResultClick}
                >
                  View all {searchResults.length} results for "{searchQuery}"
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    )
  }

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
                    className="block w-full text-center bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-black font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
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
                    onFocus={() => {
                      setIsSearchFocused(true)
                      if (searchQuery.trim().length > 1) {
                        setShowSearchResults(true)
                      }
                    }}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
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
                  onClick={() => navigate('/services')}
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-black font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center group"
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

          {/* Mobile Menu - Appears as dropdown below header */}
          {isMenuOpen && (
            <div 
              ref={mobileMenuRef}
              className="xl:hidden absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-[85vh] overflow-y-auto"
            >
              {/* Mobile Search - Enhanced with search button */}
              <div className="p-4 border-b border-gray-100" ref={searchRef}>
                <div className="flex items-center gap-2">
                  <form onSubmit={handleSearchSubmit} className="flex-1 relative">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        ref={mobileSearchInputRef}
                        type="text"
                        placeholder="Search products, services..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        onFocus={() => {
                          setIsSearchFocused(true)
                          if (searchQuery.trim().length > 1) {
                            setShowSearchResults(true)
                          }
                        }}
                        onBlur={() => setIsSearchFocused(false)}
                        enterKeyHint="search"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={handleClearSearch}
                          className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                    {showSearchResults && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-10 max-h-64 overflow-y-auto">
                        {searchResults.length === 0 ? (
                          <div className="p-4 text-center">
                            <Search size={24} className="mx-auto text-gray-400 mb-2" />
                            <p className="text-gray-700 font-medium">No results found</p>
                            <p className="text-sm text-gray-500">Try different keywords</p>
                          </div>
                        ) : (
                          <>
                            {searchResults.slice(0, 5).map((item) => (
                              <Link
                                key={item.id}
                                to={`/${item.category}/${item.id}/${item.slug}`}
                                className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 search-result-item"
                                onClick={handleResultClick}
                              >
                                <div className={`p-2 rounded-lg ${
                                  item.type === 'service' 
                                    ? 'bg-gradient-to-br from-green-100 to-emerald-100'
                                    : 'bg-gradient-to-br from-blue-100 to-indigo-100'
                                } mr-3`}>
                                  <SafeIcon name={item.icon} size={18} className={
                                    item.type === 'service' ? 'text-emerald-600' : 'text-indigo-600'
                                  } />
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold text-gray-900">{item.name}</div>
                                  <div className="text-xs text-gray-500">{item.category?.replace('-', ' ')}</div>
                                </div>
                              </Link>
                            ))}
                            <button
                              onClick={handleSearchSubmit}
                              className="w-full py-3 text-center bg-primary-50 hover:bg-primary-100 text-primary-600 font-semibold border-t border-gray-100 flex items-center justify-center gap-2 search-result-item"
                            >
                              <Search size={16} />
                              Search for "{searchQuery}"
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </form>
                  {/* Mobile Search Button */}
                  <button
                    onClick={handleSearchSubmit}
                    disabled={!searchQuery.trim()}
                    className={`flex items-center justify-center h-full px-4 rounded-xl transition-all duration-200 ${
                      searchQuery.trim()
                        ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-black shadow-md hover:shadow-lg'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                    style={{ height: '48px' }}
                    aria-label="Search"
                  >
                    <Search size={20} />
                  </button>
                </div>
                {searchQuery.trim() && !showSearchResults && (
                  <div className="mt-2 text-xs text-gray-500 flex items-center">
                    <Search size={12} className="mr-1" />
                    Press Enter or click search button
                  </div>
                )}
              </div>

              {/* Mobile Navigation Items */}
              <div className="p-4 space-y-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div className="mb-1">
                        {/* Mobile: Clicking the main item goes to its page, clicking arrow shows dropdown */}
                        <div className="flex items-center">
                          <Link
                            to={item.path}
                            className={`flex items-center flex-1 px-4 py-3 font-semibold rounded-lg transition-colors ${
                              isActive(item.path)
                                ? 'text-primary-700 bg-primary-50'
                                : 'text-gray-800 hover:bg-gray-50'
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <SafeIcon name={item.icon} size={20} className="mr-3" />
                            {item.name}
                          </Link>
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              setActiveDropdown(activeDropdown === item.name ? null : item.name)
                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg ml-1"
                            aria-label={`Toggle ${item.name} dropdown`}
                          >
                            <ChevronDown
                              size={16}
                              className={`transition-transform duration-200 ${
                                activeDropdown === item.name ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        </div>

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
                                <div className="flex-1">
                                  <div className="font-medium">{subItem.name}</div>
                                  <div className="text-xs text-gray-500">{subItem.description}</div>
                                </div>
                              </Link>
                            ))}
                            {/* View All link for mobile dropdown */}
                            <Link
                              to={item.path}
                              className="flex items-center px-4 py-2.5 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg font-medium"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <SafeIcon name={item.icon} size={18} className="mr-3" />
                              View All {item.name}
                            </Link>
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
              <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Link
                    to="/cart"
                    className="w-full border-2 border-gray-300 text-gray-800 hover:border-primary-600 hover:text-primary-600 font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingBag size={20} className="mr-2" />
                    View Cart
                  </Link>
                  <button
                    onClick={() => {
                      navigate('/services')
                      setIsMenuOpen(false)
                    }}
                    className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-black font-semibold py-3 px-4 rounded-xl shadow-md transition-colors flex items-center justify-center"
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
                      onClick={() => setIsMenuOpen(false)}
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
                        <div className="text-sm text-gray-600">30m from main Road, INES RUHENGERI Road, Musanze</div>
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
        </div>
      </header>
    </>
  )
}

export default Header