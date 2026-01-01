import React, { useState } from 'react'
import { Mail, User, Phone, MessageSquare, Loader2, CheckCircle } from 'lucide-react'
import Button from '@/components/UI/Button'
import { sendCustomOrder } from '@/utils/emailService'

const CustomOrderForm = ({ product }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        customRequest: '',
        quantity: '',
        specialRequirements: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Basic validation
        if (!formData.fullName.trim() || !formData.phone.trim() || !formData.customRequest.trim()) {
            setError('Please fill in all required fields')
            return
        }

        if (formData.phone.length < 10) {
            setError('Please enter a valid phone number')
            return
        }

        setIsSubmitting(true)
        setError('')

        try {
            const result = await sendCustomOrder({
                fullName: formData.fullName,
                phone: formData.phone,
                email: formData.email,
                customRequest: formData.customRequest,
                quantity: formData.quantity,
                specialRequirements: formData.specialRequirements,
                productName: product?.name,
                productPrice: product?.price,
                productCurrency: product?.currency
            })

            if (result.success) {
                setSubmitSuccess(true)

                // Reset form
                setFormData({
                    fullName: '',
                    phone: '',
                    email: '',
                    customRequest: '',
                    quantity: '',
                    specialRequirements: ''
                })

                // Auto-reset success message after 5 seconds
                setTimeout(() => {
                    setSubmitSuccess(false)
                }, 5000)
            } else {
                throw new Error(result.error || 'Failed to send request')
            }
        } catch (error) {
            console.error('Custom order submission error:', error)
            setError('Failed to submit request. Please try again or contact us directly.')

            // Fallback: Open email client
            const subject = `Custom Order Request - ${product?.name || 'Product'}`
            const body = `
Custom Order Request Details:

Product: ${product?.name || 'Not specified'}
Request: ${formData.customRequest}
Quantity: ${formData.quantity || 'Not specified'}
Requirements: ${formData.specialRequirements || 'None'}

Customer Information:
Name: ${formData.fullName}
Phone: ${formData.phone}
Email: ${formData.email || 'Not provided'}

Page URL: ${window.location.href}
      `.trim()

            window.open(`mailto:gashakavinc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (submitSuccess) {
        return (
            <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Request Sent Successfully!</h4>
                <p className="text-gray-700 mb-4">
                    We've received your custom order request. Our team will review it and
                    contact you within 24 hours with pricing and availability.
                </p>
                <div className="text-sm text-gray-600">
                    You'll receive a confirmation SMS to {formData.phone}
                </div>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-700 text-sm">{error}</p>
                </div>
            )}

            {/* Request Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare size={14} className="inline mr-2" />
                    What do you need? *
                </label>
                <textarea
                    name="customRequest"
                    value={formData.customRequest}
                    onChange={handleChange}
                    rows="3"
                    required
                    placeholder="Describe your custom order in detail (e.g., custom printing, specific brand, special size, bulk quantity...)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                />
            </div>

            {/* Quantity */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Quantity (Optional)
                </label>
                <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="E.g., 50 units, 100 pages, 5 sets"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                />
            </div>

            {/* Special Requirements */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requirements (Optional)
                </label>
                <textarea
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleChange}
                    rows="2"
                    placeholder="Any specific colors, materials, deadlines, or other requirements..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                />
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User size={14} className="inline mr-2" />
                        Your Name *
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone size={14} className="inline mr-2" />
                        Phone Number *
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="0785 383 927"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail size={14} className="inline mr-2" />
                        Email (Optional)
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                    />
                </div>
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                variant="primary"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        <Loader2 size={18} className="mr-2 animate-spin" />
                        Sending Request...
                    </>
                ) : (
                    <>
                        <Mail size={18} className="mr-2" />
                        Request Custom Quote
                    </>
                )}
            </Button>

            {/* Note */}
            <div className="text-center">
                <p className="text-xs text-gray-500">
                    By submitting this request, you agree to our terms.
                    We'll contact you within 24 hours with pricing and availability.
                </p>
                <div className="mt-2 flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <span className="flex items-center">
                        <Phone size={12} className="mr-1" />
                        Need immediate help?
                    </span>
                    <a href="tel:0785383927" className="text-primary-600 hover:text-primary-700 font-medium">
                        Call: 0785 383 927
                    </a>
                </div>
            </div>
        </form>
    )
}

export default CustomOrderForm