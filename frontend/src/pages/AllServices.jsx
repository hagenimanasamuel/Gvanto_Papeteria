import React, { useState, useEffect } from 'react'
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
  ShoppingBag
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
  const location = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredItems(getItemsByCategory(activeCategory))
    } else {
      const results = searchItems(searchQuery)
      if (activeCategory !== 'all') {
        setFilteredItems(results.filter(item => item.category === activeCategory))
      } else {
        setFilteredItems(results)
      }
    }
    setCartCount(getCartCount())
  }, [activeCategory, searchQuery])

  const handleAddToCart = (item) => {
    addToCart(item, 1)
    setCartCount(getCartCount())
    alert(`Added ${item.name} to cart!`)
  }

  const handleQuickOrder = (item) => {
    setSelectedProduct(item)
    setShowQuickOrderModal(true)
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
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
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
              </div>
            </div>

            {/* Cart Button */}
            <div className="flex justify-center items-center space-x-4">
              <Link to="/cart" className="relative">
                <Button variant="outline" className="flex items-center">
                  <ShoppingBag size={20} className="mr-2" />
                  View Cart
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
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

      {/* Categories Filter */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-4">
        <div className="container-custom px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Filter size={20} className="mr-2" />
              Filter by Category
            </h2>
            <span className="text-sm text-gray-600">
              {filteredItems.length} items found
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-300 ${activeCategory === category.id
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 overflow-hidden"
            >
              {/* Product Image/Icon Area */}
              <div className={`relative h-48 ${item.bgColor || 'bg-gradient-to-br from-gray-50 to-blue-50'} p-6 overflow-hidden`}>
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {item.popular && (
                    <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-bold rounded-full">
                      <TrendingUp size={12} className="mr-1" />
                      Popular
                    </span>
                  )}
                  {item.featured && (
                    <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full">
                      <Star size={12} className="mr-1" />
                      Featured
                    </span>
                  )}
                  {item.type === 'service' && (
                    <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full">
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
              <div className="p-6">
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
                    variant="primary"
                    onClick={() => handleAddToCart(item)}
                    className="px-4"
                  >
                    <ShoppingBag size={18} className="mr-1" />
                    Add
                  </Button>
                  
                  {/* Quick Order Button */}
                  <button
                    onClick={() => handleQuickOrder(item)}
                    className="px-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-medium flex items-center transition-all duration-200"
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
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('all')
              }}
            >
              Clear Filters
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