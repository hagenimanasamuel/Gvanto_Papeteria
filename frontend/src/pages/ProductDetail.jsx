import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    ArrowLeft,
    ShoppingBag,
    Star,
    CheckCircle,
    Clock,
    Shield,
    Truck,
    Phone,
    Mail,
    MapPin,
    Share2,
    ChevronRight,
    Package,
    Users,
    Award,
    TrendingUp,
    HelpCircle,
    CreditCard,
    FileText,
    Printer,
    Building,
    Banknote,
    Globe,
    X,
    Zap,
    Sparkles 
} from 'lucide-react'
import Button from '@/components/UI/Button'
import {
    getItemById,
    getIconComponent,
    addToCart,
    getRelatedItems,
    getCategoryById
} from '@/utils/dataUtils'
import QuickOrderModal from '@/components/QuickOrderModal'
import CustomOrderForm from '../components/CustomOrderForm'

const ProductDetail = () => {
    const { category, id, slug } = useParams()
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)
    const [selectedVariant, setSelectedVariant] = useState(0)
    const [showShareModal, setShowShareModal] = useState(false)
    const [showQuickOrderModal, setShowQuickOrderModal] = useState(false)
    const [product, setProduct] = useState(null)
    const [relatedItems, setRelatedItems] = useState([])
    const [categoryInfo, setCategoryInfo] = useState(null)
    const [orderSuccess, setOrderSuccess] = useState(false)

    useEffect(() => {
        const item = getItemById(id)
        if (item) {
            setProduct(item)
            if (item.relatedServices) {
                setRelatedItems(getRelatedItems(item.id, item.relatedServices))
            }
            setCategoryInfo(getCategoryById(item.category))
        }
    }, [id])

    const handleAddToCart = () => {
        if (product) {
            const variant = product.variants?.[selectedVariant]
            addToCart(product, quantity, variant)
            alert(`Added ${quantity} x ${product.name} to cart!`)
        }
    }

    const handleQuickOrder = () => {
        setShowQuickOrderModal(true)
    }

    const handleOrderNow = () => {
        if (product) {
            navigate('/checkout', {
                state: {
                    cart: [{
                        ...product,
                        quantity,
                        variant: product.variants?.[selectedVariant]
                    }]
                }
            })
        }
    }

    const handleShare = () => {
        setShowShareModal(true)
    }

    const handleSystemShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product?.name,
                    text: product?.description,
                    url: window.location.href,
                })
            } catch (error) {
                console.log('Error sharing:', error)
            }
        } else {
            navigator.clipboard.writeText(window.location.href)
            alert('Link copied to clipboard!')
        }
        setShowShareModal(false)
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
        setShowShareModal(false)
    }

    const handleWhatsAppShare = () => {
        const message = `Check out ${product?.name} at ${window.location.href}`
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
        setShowShareModal(false)
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-4xl mb-4">📦</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
                    <Button onClick={() => navigate('/services')}>
                        Browse Products
                    </Button>
                </div>
            </div>
        )
    }

    const Icon = getIconComponent(product.icon)
    const CategoryIcon = categoryInfo ? getIconComponent(categoryInfo.icon) : Package

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <div className="bg-white border-b border-gray-200">
                <div className="container-custom py-4 px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center text-gray-600 hover:text-primary-600 mr-4"
                            >
                                <ArrowLeft size={20} className="mr-2" />
                                Back
                            </button>
                            <div className="flex items-center text-sm text-gray-500">
                                <button onClick={() => navigate('/')} className="hover:text-primary-600">Home</button>
                                <ChevronRight size={16} className="mx-2" />
                                <button onClick={() => navigate('/services')} className="hover:text-primary-600">Services</button>
                                <ChevronRight size={16} className="mx-2" />
                                <span className="text-gray-800 font-medium capitalize">{category}</span>
                            </div>
                        </div>
                        <button
                            onClick={handleShare}
                            className="flex items-center text-gray-600 hover:text-primary-600"
                        >
                            <Share2 size={20} className="mr-2" />
                            Share
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Order Success Message */}
            {orderSuccess && (
                <div className="container-custom px-4 py-4">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-center">
                            <CheckCircle size={24} className="text-green-600 mr-3" />
                            <div>
                                <h3 className="font-bold text-green-800">Order Submitted Successfully!</h3>
                                <p className="text-green-700 text-sm">
                                    Our team will contact you within 30 minutes to confirm your order.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Product Detail */}
            <div className="container-custom py-8 px-4">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        {/* Product Header */}
                        <div className="mb-6">
                            <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-primary-100 to-primary-50 text-primary-700 rounded-full text-sm font-medium mb-3">
                                <CategoryIcon size={14} className="mr-2" />
                                {categoryInfo?.name?.toUpperCase() || category?.toUpperCase()} CATEGORY
                            </span>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

                            {/* Rating */}
                            <div className="flex items-center mb-4">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={20}
                                            className={`${i < Math.floor(product.rating || 4.5) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <span className="ml-2 font-bold text-gray-900">{product.rating || 4.5}</span>
                                <span className="ml-2 text-gray-600">({product.reviews || 0} reviews)</span>
                                {product.inStock && (
                                    <span className="ml-4 flex items-center text-green-600">
                                        <CheckCircle size={16} className="mr-1" />
                                        In Stock
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Price */}
                        <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-3xl font-bold text-gray-900">
                                        {product.currency || 'RWF'} {product.price?.toLocaleString() || '0'}
                                        {product.unit && <span className="text-lg font-normal">/{product.unit}</span>}
                                    </div>
                                    {product.originalPrice && (
                                        <div className="text-lg text-gray-500 line-through">
                                            {product.currency || 'RWF'} {product.originalPrice.toLocaleString()}
                                        </div>
                                    )}
                                    <div className="text-sm text-gray-600 mt-1">Price includes all taxes</div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center text-green-600">
                                        <Truck size={20} className="mr-2" />
                                        <div>
                                            <div className="font-semibold">
                                                {product.deliveryFee === 0 ? 'Free' : `${product.currency || 'RWF'} ${product.deliveryFee}`} Delivery
                                            </div>
                                            <div className="text-sm">{product.deliveryTime || '1-2 Days'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Fast Order Button */}
                        <div className="mb-8">
                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl"
                                onClick={handleQuickOrder}
                            >
                                <Zap size={20} className="mr-2" />
                                Order Fast (No Cart)
                            </Button>
                            <p className="text-sm text-gray-600 text-center mt-2">
                                Skip the cart and order directly in 30 seconds
                            </p>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
                            <div className="text-gray-700 space-y-3">
                                {(product.longDescription || product.description || '').split('\n\n').map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        {product.features && product.features.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Key Features</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {product.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <CheckCircle size={16} className="text-green-500 mr-3 flex-shrink-0" />
                                            <span className="text-gray-800">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Specifications */}
                        {product.specifications && Object.keys(product.specifications).length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Specifications</h3>
                                <div className="bg-gray-50 rounded-lg overflow-hidden">
                                    {Object.entries(product.specifications).map(([key, value], idx) => (
                                        <div
                                            key={key}
                                            className={`flex justify-between items-center px-4 py-3 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                                        >
                                            <span className="font-medium text-gray-700">{key}</span>
                                            <span className="text-gray-900">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Variant Selection */}
                        {product.variants && product.variants.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Select Package</h3>
                                <div className="space-y-3">
                                    {product.variants.map((variant, idx) => (
                                        <button
                                            key={variant.id}
                                            onClick={() => setSelectedVariant(idx)}
                                            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${selectedVariant === idx
                                                ? 'border-primary-500 bg-primary-50'
                                                : 'border-gray-200 hover:border-primary-300'
                                                }`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="font-bold text-gray-900">{variant.name}</div>
                                                    <div className="text-sm text-gray-600 mt-1">
                                                        {variant.includes?.map((item, i) => (
                                                            <span key={i} className="block">{item}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xl font-bold text-gray-900">
                                                        {product.currency || 'RWF'} {variant.price?.toLocaleString() || '0'}
                                                    </div>
                                                    {selectedVariant === idx && (
                                                        <div className="text-sm text-green-600 font-medium mt-1">Selected</div>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Custom Order Section */}
                        <CustomOrderForm product={product} />

                        {/* Quantity & Actions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Quantity</h3>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-lg hover:bg-gray-50"
                                    >
                                        -
                                    </button>
                                    <div className="w-16 h-10 flex items-center justify-center border-t border-b border-gray-300 font-bold text-gray-900">
                                        {quantity}
                                    </div>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-lg hover:bg-gray-50"
                                    >
                                        +
                                    </button>
                                    <div className="ml-4 text-gray-600">
                                        <span className="font-semibold">Total:</span>{' '}
                                        <span className="text-xl font-bold text-gray-900">
                                            {product.currency || 'RWF'} {(
                                                (product.variants?.[selectedVariant]?.price || product.price || 0) * quantity
                                            ).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 shadow-lg hover:shadow-xl"
                                    onClick={handleOrderNow}
                                >
                                    <ShoppingBag size={20} className="mr-2" />
                                    Add to Cart & Checkout
                                </Button>

                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full"
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart Only
                                </Button>

                                {/* Quick Order Button */}
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                                    onClick={handleQuickOrder}
                                >
                                    <Zap size={20} className="mr-2" />
                                    Quick Order Directly
                                </Button>
                            </div>
                        </div>

                        {/* Quick Info */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Info</h3>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                                        <Truck size={20} className="text-primary-600" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Free Delivery</div>
                                        <div className="text-sm text-gray-600">{product.deliveryTime || '1-2 Days'}</div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                        <Shield size={20} className="text-green-600" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Quality Guarantee</div>
                                        <div className="text-sm text-gray-600">30-day return policy</div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                        <Clock size={20} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Fast Service</div>
                                        <div className="text-sm text-gray-600">Processed within 24 hours</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Related Services */}
                        {relatedItems.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Related Services</h3>
                                <div className="space-y-3">
                                    {relatedItems.slice(0, 3).map((service) => {
                                        const ServiceIcon = getIconComponent(service.icon)
                                        return (
                                            <button
                                                key={service.id}
                                                onClick={() => navigate(`/${service.category}/${service.id}/${service.slug}`)}
                                                className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group text-left"
                                            >
                                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary-100 transition-colors">
                                                    <ServiceIcon size={20} className="text-gray-600 group-hover:text-primary-600" />
                                                </div>
                                                <span className="font-medium text-gray-900 group-hover:text-primary-600">
                                                    {service.name}
                                                </span>
                                                <ChevronRight size={16} className="ml-auto text-gray-400 group-hover:text-primary-600" />
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Contact CTA */}
                        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Need Help?</h3>
                            <p className="text-gray-700 mb-4">
                                Our team is ready to assist you with any questions about this product.
                            </p>
                            <div className="space-y-3">
                                <a
                                    href="tel:0785383927"
                                    className="flex items-center justify-center p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-900 font-medium"
                                >
                                    <Phone size={18} className="mr-2" />
                                    Call: 0785 383 927
                                </a>
                                <a
                                    href="mailto:gashakavinc@gmail.com"
                                    className="flex items-center justify-center p-3 bg-primary-600 hover:bg-primary-700 rounded-lg text-white font-medium"
                                >
                                    <Mail size={18} className="mr-2" />
                                    Send Message
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Share Product</h3>
                                <button
                                    onClick={() => setShowShareModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={handleSystemShare}
                                    className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50"
                                >
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                                            <Share2 size={20} className="text-primary-600" />
                                        </div>
                                        <div className="text-left">
                                            <div className="font-semibold text-gray-900">Share via System</div>
                                            <div className="text-sm text-gray-600">Share using apps on your device</div>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={handleWhatsAppShare}
                                    className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50"
                                >
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                            <span className="text-xl">💬</span>
                                        </div>
                                        <div className="text-left">
                                            <div className="font-semibold text-gray-900">Share on WhatsApp</div>
                                            <div className="text-sm text-gray-600">Share with your contacts</div>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={handleCopyLink}
                                    className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50"
                                >
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                            <span className="text-xl">🔗</span>
                                        </div>
                                        <div className="text-left">
                                            <div className="font-semibold text-gray-900">Copy Link</div>
                                            <div className="text-sm text-gray-600">Copy product link to clipboard</div>
                                        </div>
                                    </div>
                                </button>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => setShowShareModal(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Quick Order Modal */}
            {showQuickOrderModal && (
                <QuickOrderModal
                    product={product}
                    selectedVariant={selectedVariant}
                    quantity={quantity}
                    onClose={() => setShowQuickOrderModal(false)}
                    onSuccess={() => {
                        setOrderSuccess(true)
                        setShowQuickOrderModal(false)
                        setTimeout(() => setOrderSuccess(false), 5000)
                    }}
                />
            )}
        </div>
    )
}

export default ProductDetail