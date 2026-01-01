import emailjs from '@emailjs/browser'

// EmailJS Configuration
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_yv2qcki',
  TEMPLATE_IDS: {
    STANDARD_ORDER: 'template_u20fe0i',
    CUSTOM_ORDER: 'template_2rfvf57'
  },
  PUBLIC_KEY: '9GnJ0BTRNu0YmN5BP',
  ADMIN_EMAIL: 'gashakavinc@gmail.com',
  STORE_INFO: {
    name: 'GVANTO Papeterie',
    phone: '0785 383 927',
    email: 'gashakavinc@gmail.com',
    address: '30m from main Road, INES RUHENGERI Road, Musanze, Rwanda',
    hours: 'Monday - Saturday: 8:00 AM - 6:00 PM | Sunday: 9:00 AM - 2:00 PM'
  }
}

// Initialize EmailJS
export const initEmailJS = () => {
  if (EMAILJS_CONFIG.PUBLIC_KEY) {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
    console.log('✅ EmailJS initialized')
  }
}

// Generate order ID
const generateOrderId = (type = 'ORD') => {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `${type}${timestamp}${random}`
}

// Format date
const formatDate = () => {
  return new Date().toLocaleString('en-RW', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// ==============================================
// MAIN EMAIL FUNCTIONS
// ==============================================

// Send Standard/Quick Order
export const sendStandardOrder = async (orderData) => {
  try {
    console.log('📧 Preparing standard order email...')
    
    const orderId = generateOrderId('ORD')
    
    // Calculate totals
    const subtotal = orderData.items ? 
      orderData.items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0) : 
      0
    
    const deliveryFee = orderData.deliveryMethod === 'delivery' ? 1000 : 0
    const total = subtotal + deliveryFee
    
    // Format items as text
    let orderItemsText = ''
    if (orderData.items && Array.isArray(orderData.items)) {
      orderData.items.forEach((item, index) => {
        orderItemsText += `${index + 1}. ${item.name}`
        if (item.variant?.name || item.variant) {
          orderItemsText += ` (${item.variant.name || item.variant})`
        }
        orderItemsText += `\n   Quantity: ${item.quantity || 1}`
        orderItemsText += `\n   Unit Price: RWF ${item.price?.toLocaleString() || '0'}`
        orderItemsText += `\n   Total: RWF ${((item.price || 0) * (item.quantity || 1)).toLocaleString()}`
        orderItemsText += '\n\n'
      })
    } else {
      orderItemsText = 'No items specified'
    }
    
    // Prepare template parameters - SIMPLE VARIABLES ONLY
    const templateParams = {
      // Order Information
      order_id: orderId,
      order_date: formatDate(),
      order_type: 'QUICK ORDER',
      urgency: orderData.urgency || 'NORMAL',
      
      // Customer Information
      customer_name: orderData.fullName || 'Not provided',
      customer_phone: orderData.phone || 'Not provided',
      customer_email: orderData.email || 'Not provided',
      customer_address: orderData.address || 'Not provided',
      customer_city: orderData.city || 'Musanze',
      
      // Order Details
      order_items: orderItemsText,
      payment_method: orderData.paymentMethod || 'Cash',
      delivery_method: orderData.deliveryMethod || 'Pickup',
      special_instructions: orderData.specialInstructions || 'None',
      
      // Financial Information
      subtotal: `RWF ${subtotal.toLocaleString()}`,
      delivery_fee: deliveryFee === 0 ? 'FREE' : `RWF ${deliveryFee.toLocaleString()}`,
      total_amount: `RWF ${total.toLocaleString()}`,
      
      // Store Information
      store_name: EMAILJS_CONFIG.STORE_INFO.name,
      store_phone: EMAILJS_CONFIG.STORE_INFO.phone,
      store_email: EMAILJS_CONFIG.STORE_INFO.email,
      store_address: EMAILJS_CONFIG.STORE_INFO.address,
      store_hours: EMAILJS_CONFIG.STORE_INFO.hours,
      
      // EmailJS required fields
      to_email: EMAILJS_CONFIG.ADMIN_EMAIL,
      subject: `Quick Order #${orderId} - GVANTO Papeterie`
    }
    
    console.log('📤 Sending standard order:', templateParams)
    
    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_IDS.STANDARD_ORDER,
      templateParams
    )
    
    console.log('✅ Standard order email sent successfully!')
    
    return {
      success: true,
      orderId,
      message: 'Order submitted successfully! We will contact you within 30 minutes.'
    }
    
  } catch (error) {
    console.error('❌ Error sending standard order email:', error)
    
    // Fallback to mailto
    const fallbackBody = `
Quick Order Details:

Order ID: ${generateOrderId('ORD')}
Date: ${formatDate()}

Customer:
Name: ${orderData.fullName}
Phone: ${orderData.phone}
Email: ${orderData.email}

Items:
${orderData.items ? orderData.items.map(item => `- ${item.name} x ${item.quantity}`).join('\n') : 'No items'}

Total: RWF ${orderData.items ? orderData.items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0) : 0}
    `.trim()
    
    window.open(`mailto:${EMAILJS_CONFIG.ADMIN_EMAIL}?subject=Quick Order&body=${encodeURIComponent(fallbackBody)}`, '_blank')
    
    return {
      success: false,
      error: error.message,
      message: 'Failed to send order. Opening email client...'
    }
  }
}

// Send Custom Order
export const sendCustomOrder = async (customData) => {
  try {
    console.log('🎨 Preparing custom order email...')
    
    const orderId = generateOrderId('CST')
    
    // Prepare template parameters - SIMPLE VARIABLES ONLY
    const templateParams = {
      // Order Information
      order_id: orderId,
      request_date: formatDate(),
      order_type: 'CUSTOM ORDER',
      urgency: customData.urgency || 'NORMAL',
      
      // Customer Information
      customer_name: customData.fullName || 'Not provided',
      customer_phone: customData.phone || 'Not provided',
      customer_email: customData.email || 'Not provided',
      
      // Custom Request Details
      custom_request: customData.customRequest || 'No details provided',
      quantity: customData.quantity || 'Not specified',
      deadline: customData.deadline || 'Flexible',
      budget_range: customData.budget || 'To be discussed',
      project_type: customData.projectType || 'Custom Stationery',
      special_requirements: customData.specialRequirements || 'None',
      
      // Product Information
      product_name: customData.productName || 'Custom Product',
      product_category: customData.productCategory || 'Custom',
      product_price: customData.productPrice || 'To be quoted',
      
      // Store Information
      store_name: EMAILJS_CONFIG.STORE_INFO.name,
      store_phone: EMAILJS_CONFIG.STORE_INFO.phone,
      store_email: EMAILJS_CONFIG.STORE_INFO.email,
      store_address: EMAILJS_CONFIG.STORE_INFO.address,
      store_hours: EMAILJS_CONFIG.STORE_INFO.hours,
      
      // EmailJS required fields
      to_email: EMAILJS_CONFIG.ADMIN_EMAIL,
      subject: `Custom Order #${orderId} - GVANTO Papeterie`
    }
    
    console.log('📤 Sending custom order:', templateParams)
    
    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_IDS.CUSTOM_ORDER,
      templateParams
    )
    
    console.log('✅ Custom order email sent successfully!')
    
    return {
      success: true,
      orderId,
      message: 'Custom order request submitted! Our team will contact you within 24 hours.'
    }
    
  } catch (error) {
    console.error('❌ Error sending custom order email:', error)
    
    // Fallback to mailto
    const fallbackBody = `
Custom Order Request:

Order ID: ${generateOrderId('CST')}
Date: ${formatDate()}

Customer:
Name: ${customData.fullName}
Phone: ${customData.phone}
Email: ${customData.email}

Request:
${customData.customRequest}

Quantity: ${customData.quantity}
Requirements: ${customData.specialRequirements}
    `.trim()
    
    window.open(`mailto:${EMAILJS_CONFIG.ADMIN_EMAIL}?subject=Custom Order Request&body=${encodeURIComponent(fallbackBody)}`, '_blank')
    
    return {
      success: false,
      error: error.message,
      message: 'Failed to submit request. Opening email client...'
    }
  }
}

// Send Quick Order
export const sendQuickOrder = async (product, customerInfo) => {
  console.log('⚡ Processing quick order...')
  
  const orderData = {
    fullName: customerInfo.fullName || 'Customer',
    phone: customerInfo.phone || 'Not provided',
    email: customerInfo.email || 'Not provided',
    address: customerInfo.address || 'Not provided',
    city: customerInfo.city || 'Musanze',
    paymentMethod: customerInfo.paymentMethod || 'cash',
    deliveryMethod: customerInfo.deliveryMethod || 'pickup',
    specialInstructions: customerInfo.specialInstructions || 'None',
    urgency: 'NORMAL',
    
    // Product information
    items: [{
      name: product?.name || 'Product',
      variant: customerInfo.variant,
      price: customerInfo.variant?.price || product?.price || 0,
      quantity: customerInfo.quantity || 1
    }]
  }
  
  return sendStandardOrder(orderData)
}

// ==============================================
// TEST FUNCTION
// ==============================================

export const testEmailTemplates = async () => {
  try {
    console.log('🧪 Testing email templates...')
    
    // Test Standard Template
    const standardTest = {
      to_email: EMAILJS_CONFIG.ADMIN_EMAIL,
      order_id: 'TEST123',
      order_date: formatDate(),
      order_type: 'TEST ORDER',
      urgency: 'NORMAL',
      customer_name: 'Test Customer',
      customer_phone: '0785000000',
      customer_email: 'test@example.com',
      customer_address: 'Test Address',
      customer_city: 'Musanze',
      order_items: '1. Test Product\n   Quantity: 1\n   Price: RWF 1000',
      payment_method: 'Cash',
      delivery_method: 'Pickup',
      special_instructions: 'Test instructions',
      subtotal: 'RWF 1000',
      delivery_fee: 'FREE',
      total_amount: 'RWF 1000',
      store_name: 'Test Store',
      store_phone: '0785 383 927',
      store_email: 'test@store.com',
      store_address: 'Test Address',
      store_hours: 'Mon-Sat: 8AM-6PM',
      subject: 'Test Standard Order'
    }
    
    const result1 = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_IDS.STANDARD_ORDER,
      standardTest
    )
    
    console.log('✅ Standard template test sent')
    
    // Test Custom Template
    const customTest = {
      to_email: EMAILJS_CONFIG.ADMIN_EMAIL,
      order_id: 'CST123',
      request_date: formatDate(),
      order_type: 'CUSTOM ORDER',
      urgency: 'NORMAL',
      customer_name: 'Test Client',
      customer_phone: '0785000001',
      customer_email: 'client@example.com',
      custom_request: 'This is a test custom request',
      quantity: '10 units',
      deadline: '2 weeks',
      budget_range: 'RWF 50,000 - 100,000',
      project_type: 'Test Project',
      special_requirements: 'Test requirements',
      product_name: 'Test Product',
      product_category: 'Test Category',
      product_price: 'To be quoted',
      store_name: 'Test Store',
      store_phone: '0785 383 927',
      store_email: 'test@store.com',
      store_address: 'Test Address',
      store_hours: 'Mon-Sat: 8AM-6PM',
      subject: 'Test Custom Order'
    }
    
    const result2 = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_IDS.CUSTOM_ORDER,
      customTest
    )
    
    console.log('✅ Custom template test sent')
    
    return {
      success: true,
      standard: result1,
      custom: result2
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Export all functions
export default {
  initEmailJS,
  sendStandardOrder,
  sendCustomOrder,
  sendQuickOrder,
  testEmailTemplates
}