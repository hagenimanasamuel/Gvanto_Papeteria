import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  Search,
  Filter,
  ChevronRight,
  Star,
  Clock,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  Zap,
  ShoppingBag,
  X,
  SlidersHorizontal,
  Grid3x3,
  List,
  ChevronLeft,
  ChevronDown,
  TrendingDown
} from 'lucide-react'
import Button from '@/components/UI/Button'
import { 
  getAllCategories, 
  getItemsByCategory, 
  searchItems,
  getIconComponent,
  getCartCount,
  addToCart
} from '@/utils/dataUtils'
import QuickOrderModal from '@/components/QuickOrderModal'

const AllServices = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredItems, setFilteredItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [showQuickOrderModal, setShowQuickOrderModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('default')
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 1000000 })
  const [featuredFilter, setFeaturedFilter] = useState(false)
  const [fastDeliveryFilter, setFastDeliveryFilter] = useState(false)
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)
  const location = useLocation();
  const navigate = useNavigate();
  const sortDropdownRef = useRef(null);

  const categories = getAllCategories()
  const allItems = getItemsByCategory('all')

  // Parse URL parameters on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const categoryParam = params.get('category')
    const searchParam = params.get('search')
    
    if (categoryParam) {
      setActiveCategory(categoryParam)
    }
    
    if (searchParam) {
      setSearchQuery(searchParam)
    }
  }, [location.search])
  
  // Update URL when filtering
  useEffect(() => {
    const params = new URLSearchParams()
    
    if (activeCategory !== 'all') {
      params.set('category', activeCategory)
    }
    
    if (searchQuery.trim()) {
      params.set('search', searchQuery)
    }
    
    const queryString = params.toString()
    const newUrl = queryString ? `${location.pathname}?${queryString}` : location.pathname
    
    // Update URL without page reload
    navigate(newUrl, { replace: true })
  }, [activeCategory, searchQuery, navigate, location.pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setShowSortDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Calculate active filters count
  useEffect(() => {
    let count = 0
    if (activeCategory !== 'all') count++
    if (searchQuery.trim()) count++
    if (featuredFilter) count++
    if (fastDeliveryFilter) count++
    if (priceFilter.min > 0 || priceFilter.max < 1000000) count++
    if (sortBy !== 'default') count++
    setActiveFiltersCount(count)
  }, [activeCategory, searchQuery, featuredFilter, fastDeliveryFilter, priceFilter, sortBy])

  // Filter and sort items
  useEffect(() => {
    let items = searchQuery.trim() ? searchItems(searchQuery) : getItemsByCategory(activeCategory)
    
    // Apply additional filters
    if (activeCategory !== 'all' && !searchQuery.trim()) {
      items = items.filter(item => item.category === activeCategory)
    }
    
    // Price filter
    items = items.filter(item => 
      item.price >= priceFilter.min && item.price <= priceFilter.max
    )
    
    // Featured filter
    if (featuredFilter) {
      items = items.filter(item => item.featured)
    }
    
    // Fast delivery filter
    if (fastDeliveryFilter) {
      items = items.filter(item => item.deliveryTime?.includes('Same') || item.deliveryTime?.includes('24'))
    }
    
    // Apply sorting
    items = sortItems(items, sortBy)
    
    setFilteredItems(items)
    setCartCount(getCartCount())
  }, [activeCategory, searchQuery, priceFilter, featuredFilter, fastDeliveryFilter, sortBy])

  // Sorting function
  const sortItems = (items, sortMethod) => {
    const sorted = [...items]
    switch (sortMethod) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price)
      case 'rating-desc':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return sorted
    }
  }

  const handleAddToCart = (item) => {
    addToCart(item, 1)
    setCartCount(getCartCount())
    alert(`Added ${item.name} to cart!`)
  }

  const handleQuickOrder = (item) => {
    setSelectedProduct(item)
    setShowQuickOrderModal(true)
  }

  const resetFilters = () => {
    setActiveCategory('all')
    setSearchQuery('')
    setPriceFilter({ min: 0, max: 1000000 })
    setFeaturedFilter(false)
    setFastDeliveryFilter(false)
    setSortBy('default')
  }

  const CategoryIcon = ({ category }) => {
    const Icon = getIconComponent(category?.icon || 'ShoppingBag')
    return <Icon size={18} />
  }

  const ItemIcon = ({ item }) => {
    const Icon = getIconComponent(item?.icon || 'ShoppingBag')
    return <Icon size={48} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-50 via-white to-secondary-50 py-16">
        <div className="container-custom px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our Complete{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text">
                Products & Services
              </span>
            </h1>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products and services..."
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 shadow-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Cart Button */}
            <div className="flex justify-center items-center space-x-4">
              <Link to="/cart" className="relative">
                <Button variant="outline" className="flex items-center">
                  <ShoppingBag size={20} className="mr-2" />
                  View Cart
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-black text-xs rounded-full w-6 h-6 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
              <a href="tel:0785383927">
                <Button variant="primary">
                  <Phone size={20} className="mr-2" />
                  Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filter Section */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container-custom px-4">
          {/* Main Filter Bar */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between py-4 gap-4">
            {/* Left Section: Category Scroll */}
            <div className="flex-1 w-full lg:w-auto overflow-x-auto">
              <div className="flex items-center space-x-2 min-w-max">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="lg:hidden flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  <SlidersHorizontal size={18} className="mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 bg-primary-600 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                {/* All Categories Button */}
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-300 whitespace-nowrap ${activeCategory === 'all'
                      ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-black shadow-lg'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                >
                  <Grid3x3 size={18} className="mr-2" />
                  All Items
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-white/20">
                    {allItems.length}
                  </span>
                </button>

                {/* Scrollable Categories */}
                <div className="flex items-center space-x-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-300 whitespace-nowrap ${activeCategory === category.id
                          ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-black shadow-lg'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                    >
                      <CategoryIcon category={category} />
                      <span className="font-medium ml-2">{category.name}</span>
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${activeCategory === category.id
                          ? 'bg-white/20'
                          : 'bg-gray-200'
                        }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section: View Controls */}
            <div className="flex items-center space-x-4 w-full lg:w-auto">
              {/* Results Count */}
              <div className="hidden lg:flex items-center">
                <span className="text-sm text-gray-600 font-medium">
                  <span className="font-bold text-gray-900">{filteredItems.length}</span> items found
                </span>
              </div>

              {/* Sort Dropdown */}
              <div className="relative" ref={sortDropdownRef}>
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  <TrendingUp size={18} className="mr-2" />
                  Sort: {sortBy === 'default' ? 'Default' : 
                        sortBy === 'price-asc' ? 'Price: Low to High' :
                        sortBy === 'price-desc' ? 'Price: High to Low' :
                        sortBy === 'rating-desc' ? 'Top Rated' : 'Name: A-Z'}
                  <ChevronDown size={16} className="ml-2" />
                </button>
                
                {showSortDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Sort Options
                    </div>
                    {[
                      { id: 'default', label: 'Default Sorting', icon: TrendingUp },
                      { id: 'price-asc', label: 'Price: Low to High', icon: TrendingDown },
                      { id: 'price-desc', label: 'Price: High to Low', icon: TrendingUp },
                      { id: 'rating-desc', label: 'Top Rated', icon: Star },
                      { id: 'name-asc', label: 'Name: A-Z', icon: ChevronRight }
                    ].map((option) => {
                      const Icon = option.icon
                      return (
                        <button
                          key={option.id}
                          onClick={() => {
                            setSortBy(option.id)
                            setShowSortDropdown(false)
                          }}
                          className={`w-full flex items-center px-4 py-3 hover:bg-gray-50 transition-colors ${sortBy === option.id ? 'bg-primary-50 text-primary-600' : 'text-gray-700'}`}
                        >
                          <Icon size={16} className="mr-3" />
                          {option.label}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* View Toggle */}
              <div className="hidden lg:flex items-center bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-md' : 'hover:bg-gray-200'}`}
                >
                  <Grid3x3 size={20} className={viewMode === 'grid' ? 'text-primary-600' : 'text-gray-600'} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-md' : 'hover:bg-gray-200'}`}
                >
                  <List size={20} className={viewMode === 'list' ? 'text-primary-600' : 'text-gray-600'} />
                </button>
              </div>

              {/* Clear Filters Button (when active) */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X size={16} className="mr-2" />
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filters Panel */}
          {showMobileFilters && (
            <div className="lg:hidden bg-white border-t border-gray-200 py-4 animate-slideDown">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Price Range
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      value={priceFilter.min}
                      onChange={(e) => setPriceFilter(prev => ({ ...prev, min: Number(e.target.value) }))}
                    />
                    <span className="text-gray-400">to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      value={priceFilter.max}
                      onChange={(e) => setPriceFilter(prev => ({ ...prev, max: Number(e.target.value) }))}
                    />
                  </div>
                </div>

                {/* Quick Filters */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setFeaturedFilter(!featuredFilter)}
                    className={`flex items-center justify-center px-4 py-2.5 rounded-lg transition-colors ${featuredFilter
                        ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-black'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                  >
                    <Star size={16} className="mr-2" />
                    Featured
                  </button>
                  <button
                    onClick={() => setFastDeliveryFilter(!fastDeliveryFilter)}
                    className={`flex items-center justify-center px-4 py-2.5 rounded-lg transition-colors ${fastDeliveryFilter
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-black'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                  >
                    <Zap size={16} className="mr-2" />
                    Fast Delivery
                  </button>
                </div>

                {/* View Mode Toggle for Mobile */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">View Mode</span>
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-md' : 'hover:bg-gray-200'}`}
                    >
                      <Grid3x3 size={18} className={viewMode === 'grid' ? 'text-primary-600' : 'text-gray-600'} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-md' : 'hover:bg-gray-200'}`}
                    >
                      <List size={18} className={viewMode === 'list' ? 'text-primary-600' : 'text-gray-600'} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Active Filters Bar */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center space-x-2 py-3 border-t border-gray-100 overflow-x-auto">
              <span className="text-sm text-gray-600 font-medium whitespace-nowrap">Active filters:</span>
              <div className="flex items-center space-x-2">
                {activeCategory !== 'all' && (
                  <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    {categories.find(c => c.id === activeCategory)?.name}
                    <button
                      onClick={() => setActiveCategory('all')}
                      className="ml-2 hover:text-primary-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    Search: "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery('')}
                      className="ml-2 hover:text-gray-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {featuredFilter && (
                  <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                    Featured Only
                    <button
                      onClick={() => setFeaturedFilter(false)}
                      className="ml-2 hover:text-yellow-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {fastDeliveryFilter && (
                  <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Fast Delivery
                    <button
                      onClick={() => setFastDeliveryFilter(false)}
                      className="ml-2 hover:text-green-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {(priceFilter.min > 0 || priceFilter.max < 1000000) && (
                  <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Price: {priceFilter.min.toLocaleString()} - {priceFilter.max.toLocaleString()} RWF
                    <button
                      onClick={() => setPriceFilter({ min: 0, max: 1000000 })}
                      className="ml-2 hover:text-blue-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {sortBy !== 'default' && (
                  <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    Sorted: {
                      sortBy === 'price-asc' ? 'Price ↑' :
                      sortBy === 'price-desc' ? 'Price ↓' :
                      sortBy === 'rating-desc' ? 'Top Rated' : 'Name A-Z'
                    }
                    <button
                      onClick={() => setSortBy('default')}
                      className="ml-2 hover:text-purple-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Rest of the component remains exactly the same... */}
      {/* Products & Services Grid */}
      <div className="container-custom px-4 py-12">
        {activeCategory !== 'all' && (
          <div className="mb-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <div className={`p-3 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 mr-4`}>
                    <CategoryIcon category={categories.find(c => c.id === activeCategory)} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {categories.find(c => c.id === activeCategory)?.name}
                    </h2>
                    <p className="text-gray-600">
                      {categories.find(c => c.id === activeCategory)?.description}
                    </p>
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={() => setActiveCategory('all')}
              >
                View All Categories
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Services Grid - Updated to support list view */}
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6`}>
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden ${viewMode === 'list' ? 'flex' : ''}`}
            >
              {/* Product Image/Icon Area */}
              <div className={`${viewMode === 'list' ? 'w-1/3 min-w-[200px]' : 'h-48'} relative ${item.bgColor || 'bg-gradient-to-br from-gray-50 to-blue-50'} p-6 overflow-hidden`}>
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {item.popular && (
                    <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-black text-xs font-bold rounded-full">
                      <TrendingUp size={12} className="mr-1" />
                      Popular
                    </span>
                  )}
                  {item.featured && (
                    <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-black text-xs font-bold rounded-full">
                      <Star size={12} className="mr-1" />
                      Featured
                    </span>
                  )}
                  {item.type === 'service' && (
                    <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-black text-xs font-bold rounded-full">
                      <CheckCircle size={12} className="mr-1" />
                      Service
                    </span>
                  )}
                </div>

                {/* Main Icon/Image */}
                <div className="flex items-center justify-center h-full">
                  <div className={`p-6 rounded-2xl bg-gradient-to-br ${item.color || 'from-primary-500 to-secondary-500'} transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                    <ItemIcon item={item} />
                  </div>
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-4 left-4">
                  <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
                    <div className="text-lg font-bold text-gray-900">
                      {item.currency || 'RWF'} {item.price?.toLocaleString() || '0'}
                      {item.unit && <span className="text-sm font-normal">/{item.unit}</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`${viewMode === 'list' ? 'flex-1' : ''} p-6`}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center bg-gray-100 px-2 py-1 rounded-lg">
                    <Star size={14} className="text-yellow-500 fill-current mr-1" />
                    <span className="text-sm font-bold text-gray-900">{item.rating || 4.5}</span>
                    {item.reviews && (
                      <span className="text-xs text-gray-500 ml-1">({item.reviews})</span>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Delivery Info */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center text-gray-700">
                    <Clock size={16} className="mr-2 text-primary-600" />
                    <span className="text-sm font-medium">{item.deliveryTime || '1-2 Days'} delivery</span>
                  </div>
                  {item.deliveryTime?.includes('Same') && (
                    <div className="flex items-center text-green-600">
                      <Zap size={14} className="mr-1" />
                      <span className="text-xs font-bold">FAST</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link 
                    to={`/${item.category}/${item.id}/${item.slug}`}
                    className="flex-1"
                  >
                    <Button 
                      variant="outline" 
                      className="w-full group/btn"
                    >
                      View Details
                      <ChevronRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Button 
                    variant="outline"
                    onClick={() => handleAddToCart(item)}
                    className="text-black"
                  >
                    <ShoppingBag size={18} className="mr-1" />
                    Add
                  </Button>
                  
                  {/* Quick Order Button */}
                  <button
                    onClick={() => handleQuickOrder(item)}
                    className="px-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-black rounded-lg font-medium flex items-center transition-all duration-200"
                    title="Quick Order"
                  >
                    <Zap size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Search size={40} className="text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No results found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We couldn't find any products or services matching "{searchQuery}" in {activeCategory !== 'all' ? categories.find(c => c.id === activeCategory)?.name : 'all categories'}.
            </p>
            <Button 
              variant="outline"
              onClick={resetFilters}
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-primary-100">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Can't find what you need?
              </h3>
              <p className="text-gray-700">
                Contact us for custom orders, bulk purchases, or special requests.
              </p>
            </div>
            <div className="flex gap-4 mt-6 lg:mt-0">
              <a href="tel:0785383927">
                <Button variant="primary" className="group">
                  <Phone size={18} className="mr-2" />
                  0785 383 927
                </Button>
              </a>
              <a href="mailto:gashakavinc@gmail.com">
                <Button variant="outline">
                  <Mail size={18} className="mr-2" />
                  Email Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Order Modal */}
      {showQuickOrderModal && selectedProduct && (
        <QuickOrderModal
          product={selectedProduct}
          onClose={() => {
            setShowQuickOrderModal(false)
            setSelectedProduct(null)
          }}
          onSuccess={() => {
            // Show success message
            alert('Order submitted successfully! Our team will contact you within 30 minutes.')
          }}
        />
      )}
    </div>
  )
}

export default AllServices