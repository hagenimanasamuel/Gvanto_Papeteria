import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Search, 
  Home, 
  ShoppingBag, 
  ArrowRight, 
  MapPin, 
  Phone,
  AlertTriangle,
  Compass,
  Package,
  RefreshCw,
  X,
  TrendingUp,
  Star,
  Zap
} from 'lucide-react'
import Button from '@/components/UI/Button'
import { searchItems, getIconComponent } from '@/utils/dataUtils'

const NotFound = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef(null)
  const navigate = useNavigate()

  const popularPages = [
    {
      title: 'All Products & Services',
      description: 'Browse our complete catalog',
      icon: ShoppingBag,
      path: '/services',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Homepage',
      description: 'Return to main page',
      icon: Home,
      path: '/',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Contact Us',
      description: 'Get in touch with our team',
      icon: Phone,
      path: '/contact',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Help Center',
      description: 'Find answers to questions',
      icon: Search,
      path: '/help',
      color: 'from-amber-500 to-orange-500'
    }
  ]

  const troubleshootingTips = [
    'Check the URL for typos',
    'Use our search function to find what you need',
    'Navigate using the menu above',
    'Clear your browser cache and refresh',
    'Contact us if you believe this is an error'
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Perform search
  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([])
      setShowSearchDropdown(false)
      return
    }

    setIsLoading(true)
    const results = searchItems(query)
    setSearchResults(results.slice(0, 5)) // Show only top 5 results
    setIsLoading(false)
    setShowSearchDropdown(true)
  }

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    performSearch(value)
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
    }
  }

  // Handle result click
  const handleResultClick = (item) => {
    navigate(`/${item.category}/${item.id}/${item.slug}`)
    setShowSearchDropdown(false)
    setSearchQuery('')
  }

  // Handle key press (Enter)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit()
    }
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    setShowSearchDropdown(false)
  }

  const ItemIcon = ({ item }) => {
    const Icon = getIconComponent(item?.icon || 'ShoppingBag')
    return <Icon size={20} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Header */}
      <header className="py-6 border-b border-gray-200">
        <div className="container-custom px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              GVANTO
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm" className="group">
                  <Home size={16} className="mr-2 group-hover:scale-110 transition-transform" />
                  Home
                </Button>
              </Link>
              <a href="tel:0785383927">
                <Button variant="primary" size="sm" className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 !text-black">
                  <Phone size={16} className="mr-2" />
                  Call Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container-custom px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto">
            {/* Error Illustration & Message */}
            <div className="text-center mb-12">
              <div className="relative inline-block mb-8">
                <div className="w-48 h-48 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto shadow-xl">
                  <div className="relative">
                    <AlertTriangle size={80} className="text-primary-600 animate-pulse" />
                    <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                      404
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full opacity-20 animate-blob"></div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-20 animate-blob animation-delay-2000"></div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Page <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Not Found</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Oops! The page you're looking for seems to have wandered off. Don't worry, we'll help you find your way back.
              </p>
              
              <div className="inline-flex items-center px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium border border-amber-200 mb-8">
                <AlertTriangle size={16} className="mr-2" />
                Error Code: 404 - Page Not Found
              </div>
            </div>

            {/* Enhanced Search Bar with Dropdown */}
            <div className="max-w-xl mx-auto mb-12 relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={20} />
                  <input
                    type="text"
                    placeholder="Search for products, services, or information..."
                    className="w-full pl-12 pr-12 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 shadow-lg"
                    value={searchQuery}
                    onChange={handleSearchChange}
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
              </form>

              {/* Search Results Dropdown */}
              {showSearchDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                  {isLoading ? (
                    <div className="p-4 text-center text-gray-500">
                      Searching...
                    </div>
                  ) : searchResults.length > 0 ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-700">
                            Search Results ({searchResults.length})
                          </span>
                          <button
                            onClick={() => navigate(`/services?search=${encodeURIComponent(searchQuery)}`)}
                            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                          >
                            View all results →
                          </button>
                        </div>
                      </div>
                      
                      {searchResults.map((item, index) => (
                        <button
                          key={item.id}
                          onClick={() => handleResultClick(item)}
                          className="w-full p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 text-left"
                        >
                          <div className="flex items-start">
                            <div className={`p-3 rounded-lg ${item.color || 'bg-gradient-to-br from-primary-100 to-secondary-100'} mr-3 flex-shrink-0`}>
                              <ItemIcon item={item} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-1">
                                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                <span className="text-sm font-bold text-gray-900">
                                  {item.currency || 'RWF'} {item.price?.toLocaleString()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                                {item.description}
                              </p>
                              <div className="flex items-center gap-2">
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
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </>
                  ) : searchQuery.trim() ? (
                    <div className="p-8 text-center">
                      <Search size={32} className="mx-auto text-gray-400 mb-3" />
                      <h4 className="font-semibold text-gray-900 mb-2">No results found</h4>
                      <p className="text-gray-600 text-sm mb-4">
                        We couldn't find any products or services matching "{searchQuery}"
                      </p>
                      <button
                        onClick={() => navigate(`/services?search=${encodeURIComponent(searchQuery)}`)}
                        className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                      >
                        Browse all products and services →
                      </button>
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            {/* Popular Pages */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                <Compass size={24} className="mr-3 text-primary-600" />
                Popular Pages You Might Like
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {popularPages.map((page, index) => {
                  const Icon = page.icon
                  return (
                    <Link
                      key={index}
                      to={page.path}
                      className="group"
                    >
                      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 h-full">
                        <div className={`w-14 h-14 bg-gradient-to-r ${page.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon size={28} className="text-black" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                          {page.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{page.description}</p>
                        <div className="flex items-center text-primary-600 group-hover:text-primary-700">
                          <span className="font-medium">Visit Page</span>
                          <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Troubleshooting Tips */}
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 mb-12 border border-primary-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <RefreshCw size={24} className="mr-3 text-primary-600" />
                Troubleshooting Tips
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <ul className="space-y-3">
                    {troubleshootingTips.slice(0, 3).map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3 shadow-sm">
                          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <ul className="space-y-3">
                    {troubleshootingTips.slice(3).map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3 shadow-sm">
                          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Help */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-12">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Still Lost?</h3>
                  <p className="text-gray-600">
                    Our team is here to help you find exactly what you're looking for.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="tel:0785383927">
                    <Button 
                      variant="primary" 
                      size="lg"
                      className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 !text-black shadow-lg hover:shadow-xl"
                    >
                      <Phone size={20} className="mr-2" />
                      Call for Help
                    </Button>
                  </a>
                  <Link to="/contact">
                    <Button variant="outline" size="lg">
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Store Info */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-50 text-primary-600 rounded-2xl mb-6">
                <MapPin size={32} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visit Our Physical Store</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Can't find what you need online? Visit us in person at our Musanze location for personalized assistance.
              </p>
              
              <div className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-medium shadow-sm border border-gray-200">
                <Package size={16} className="mr-2 text-primary-600" />
                30m from main Road, INES RUHENGERI Road, Musanze • 0785 383 927
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 bg-white">
        <div className="container-custom px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <div className="text-2xl font-bold text-primary-600 mb-2">GVANTO</div>
              <p className="text-sm text-gray-600">
                Premium Stationery & Digital Services
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/privacy" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                Terms of Service
              </Link>
              <Link to="/help" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                Help Center
              </Link>
              <Link to="/feedback" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
                Feedback
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Oliviuus Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default NotFound