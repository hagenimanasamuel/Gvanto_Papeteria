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
  Zap,
  ArrowRight
} from 'lucide-react'
import Logo from './Logo'
import { searchItems, getIconComponent, getCartCount } from '@/utils/dataUtils'

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
  ArrowRight: ArrowRight,
  Star: Star,
  CheckCircle: CheckCircle,
  TrendingUp: TrendingUp,
  Zap: Zap,
}

const SafeIcon = ({ name, size = 18, className = '', ...props }) => {
  const IconComponent = iconMap[name] || Home
  return <IconComponent size={size} className={className} {...props} />
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const desktopSearchRef = useRef(null)
  const mobileSearchRef = useRef(null)
  const searchInputRef = useRef(null)
  const mobileSearchInputRef = useRef(null)

  // Close dropdowns when clicking outside
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
      
      // Close desktop search dropdown
      if (desktopSearchRef.current && 
          !desktopSearchRef.current.contains(event.target) &&
          !event.target.closest('.search-result-item')) {
        setShowSearchDropdown(false)
      }
      
      // Close mobile search dropdown
      if (mobileSearchRef.current && 
          !mobileSearchRef.current.contains(event.target) &&
          !event.target.closest('.search-result-item')) {
        setShowSearchDropdown(false)
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

  // Update cart count
  useEffect(() => {
    setCartCount(getCartCount())
  }, [location])

  // Focus mobile search input when menu opens
  useEffect(() => {
    if (isMenuOpen && mobileSearchInputRef.current) {
      setTimeout(() => {
        mobileSearchInputRef.current?.focus()
      }, 100)
    }
  }, [isMenuOpen])

  // Handle search input change
  const handleSearchChange = (value) => {
    setSearchQuery(value)
    if (value.trim().length > 1) {
      const results = searchItems(value)
      setSearchResults(results.slice(0, 5)) // Show only top 5 results
      setShowSearchDropdown(true)
    } else {
      setShowSearchDropdown(false)
      setSearchResults([])
    }
  }

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e?.preventDefault()
    if (searchQuery.trim()) {
      // If there are search results, navigate to the first one
      if (searchResults.length > 0) {
        const firstResult = searchResults[0]
        navigate(`/${firstResult.category}/${firstResult.id}/${firstResult.slug}`)
      } else {
        // Navigate to services page with search query
        navigate(`/services?search=${encodeURIComponent(searchQuery)}`)
      }
      setShowSearchDropdown(false)
      setSearchQuery('')
      setIsMenuOpen(false)
    }
  }

  // Handle key press (Enter)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e)
    }
  }

  // Handle result click
  const handleResultClick = (item) => {
    navigate(`/${item.category}/${item.id}/${item.slug}`)
    setShowSearchDropdown(false)
    setSearchQuery('')
    setIsMenuOpen(false)
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    setShowSearchDropdown(false)
    searchInputRef.current?.focus()
    mobileSearchInputRef.current?.focus()
  }

  const ItemIcon = ({ item }) => {
    const Icon = getIconComponent(item?.icon || 'ShoppingBag')
    return <Icon size={20} />
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

  // Search Results Dropdown Component
  const SearchResultsDropdown = ({ isMobile = false }) => {
    if (!showSearchDropdown) return null

    return (
      <div className={`absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-96 overflow-y-auto z-50 ${
        isMobile ? 'mobile-search-results' : ''
      }`}>
        {searchResults.length === 0 ? (
          <div className="p-8 text-center">
            <Search size={32} className="mx-auto text-gray-400 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">No results found</h4>
            <p className="text-gray-600 text-sm mb-4">
              We couldn't find any products or services matching "{searchQuery}"
            </p>
            <button
              onClick={() => {
                navigate(`/services?search=${encodeURIComponent(searchQuery)}`)
                setShowSearchDropdown(false)
                setSearchQuery('')
                setIsMenuOpen(false)
              }}
              className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center justify-center mx-auto"
            >
              Browse all products and services <ArrowRight size={14} className="ml-1" />
            </button>
          </div>
        ) : (
          <>
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">
                  Search Results ({searchResults.length})
                </span>
                <button
                  onClick={() => {
                    navigate(`/services?search=${encodeURIComponent(searchQuery)}`)
                    setShowSearchDropdown(false)
                    setSearchQuery('')
                    setIsMenuOpen(false)
                  }}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center"
                >
                  View all results <ArrowRight size={14} className="ml-1" />
                </button>
              </div>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {searchResults.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleResultClick(item)}
                  className="w-full p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 text-left search-result-item"
                >
                  <div className="flex items-start">
                    <div className={`p-3 rounded-lg ${
                      item.type === 'service' 
                        ? 'bg-gradient-to-br from-green-100 to-emerald-100'
                        : 'bg-gradient-to-br from-blue-100 to-indigo-100'
                    } mr-3 flex-shrink-0`}>
                      <ItemIcon item={item} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold text-gray-900 line-clamp-1">{item.name}</h4>
                        <span className="text-sm font-bold text-gray-900 ml-2 whitespace-nowrap">
                          {item.currency || 'RWF'} {item.price?.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.type === 'service' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {item.type === 'service' ? 'Service' : 'Product'}
                        </span>
                        {item.popular && (
                          <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                            <TrendingUp size={10} className="mr-1" />
                            Popular
                          </span>
                        )}
                        {item.featured && (
                          <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                            <Star size={10} className="mr-1" />
                            Featured
                          </span>
                        )}
                        {item.deliveryTime?.includes('Same') && (
                          <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            <Zap size={10} className="mr-1" />
                            Fast Delivery
                          </span>
                        )}
                        <div className="flex items-center ml-auto">
                          <Star size={12} className="text-yellow-500 fill-current mr-1" />
                          <span className="text-xs font-bold text-gray-900">{item.rating || 4.5}</span>
                          {item.reviews && (
                            <span className="text-xs text-gray-500 ml-1">({item.reviews})</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {searchQuery.trim() && (
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <button
                  onClick={() => handleSearchSubmit()}
                  className="w-full flex items-center justify-center bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-black font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Search size={18} className="mr-2" />
                  Search for "{searchQuery}"
                </button>
              </div>
            )}
          </>
        )}
      </div>
    )
  }

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
            <div className="hidden lg:block relative flex-1 max-w-md mx-6" ref={desktopSearchRef}>
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={20} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search prod..."
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 shadow-lg"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={() => searchQuery.trim() && setShowSearchDropdown(true)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                    >
                      <X size={20} />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-primary-600 to-secondary-600 text-black px-4 py-2 rounded-lg hover:opacity-90 transition-opacity z-10"
                  >
                    Search
                  </button>
                </div>
                <SearchResultsDropdown />
              </form>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Cart Button */}
              <Link to="/cart" className="relative">
                <button className="hidden lg:flex items-center justify-center w-12 h-12 rounded-xl hover:bg-gray-100 transition-colors group relative">
                  <ShoppingBag size={22} className="text-gray-700 group-hover:text-primary-600" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-black text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
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
              <div className="p-4 border-b border-gray-100" ref={mobileSearchRef}>
                <div className="flex items-center gap-2">
                  <form onSubmit={handleSearchSubmit} className="flex-1 relative">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={20} />
                      <input
                        ref={mobileSearchInputRef}
                        type="text"
                        placeholder="Search for products, services, or information..."
                        className="w-full pl-12 pr-12 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 shadow-lg"
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        onKeyPress={handleKeyPress}
                        onFocus={() => searchQuery.trim() && setShowSearchDropdown(true)}
                        enterKeyHint="search"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={clearSearch}
                          className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 z-10"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                    <SearchResultsDropdown isMobile={true} />
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
                {searchQuery.trim() && !showSearchDropdown && (
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
                    {cartCount > 0 && (
                      <span className="ml-2 bg-red-500 text-black text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                        {cartCount}
                      </span>
                    )}
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