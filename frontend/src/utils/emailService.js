import emailjs from '@emailjs/browser'

// EmailJS Configuration - YOU NEED TO REPLACE THESE WITH YOUR ACTUAL IDs
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_yv2qcki', 
  TEMPLATE_ID: 'template_6ylnfp7',
  PUBLIC_KEY: '9GnJ0BTRNu0YmN5BP'
}

// Initialize EmailJS
export const initEmailJS = () => {
  if (EMAILJS_CONFIG.PUBLIC_KEY && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
  }
}

// Send order email to GVANTO Papeterie
export const sendOrderEmail = async (orderData) => {
  try {
    // Check if EmailJS is properly configured
    if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      console.warn('EmailJS not configured. Please add your EmailJS credentials.')
      return { success: false, error: 'EmailJS not configured' }
    }

    const templateParams = {
      order_id: orderData.orderId,
      customer_name: orderData.fullName,
      customer_phone: orderData.phone,
      customer_email: orderData.email || 'Not provided',
      customer_address: orderData.address,
      customer_city: orderData.city,
      payment_method: orderData.paymentMethod,
      delivery_method: orderData.deliveryMethod,
      special_instructions: orderData.specialInstructions || 'None',
      order_date: new Date().toLocaleString('en-RW', {
        timeZone: 'Africa/Kigali'
      }),
      
      // Order items formatted for email
      order_items: orderData.items?.map(item => `
        • ${item.name} 
          Variant: ${item.variant?.name || 'Standard'}
          Quantity: ${item.quantity}
          Unit Price: RWF ${item.price?.toLocaleString() || '0'}
          Total: RWF ${((item.price || 0) * item.quantity).toLocaleString()}
      `).join('\n') || 'No items',
      
      subtotal: `RWF ${orderData.subtotal?.toLocaleString() || '0'}`,
      delivery_fee: `RWF ${orderData.delivery?.toLocaleString() || '0'}`,
      total_amount: `RWF ${orderData.total?.toLocaleString() || '0'}`,
      
      // Store information
      store_name: 'GVANTO Papeterie',
      store_phone: '0785 383 927',
      store_email: 'gashakavinc@gmail.com',
      store_address: 'NM 155 Musanze Kalisimbi, Musanze, Rwanda',
      store_hours: 'Mon-Sat: 8AM-6PM, Sun: 9AM-2PM'
    }

    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    )

    console.log('Email sent successfully:', result.text)
    return { success: true, result }
    
  } catch (error) {
    console.error('Error sending email:', error)
    // Fallback: Open email client
    const fallbackEmail = `mailto:gashakavinc@gmail.com?subject=New Order - ${orderData.orderId}&body=Order ID: ${orderData.orderId}%0D%0ACustomer: ${orderData.fullName}%0D%0APhone: ${orderData.phone}`
    window.open(fallbackEmail, '_blank')
    return { success: false, error, fallback: true }
  }
}

// Quick order function for direct ordering
export const sendQuickOrder = async (product, customerInfo) => {
  try {
    // Check if EmailJS is properly configured
    if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      console.warn('EmailJS not configured. Using fallback email.')
      // Fallback to mailto
      const subject = `Quick Order - ${product.name}`
      const body = `
Quick Order Request:

Product: ${product.name}
Price: ${product.currency || 'RWF'} ${product.price?.toLocaleString() || '0'}
Quantity: ${customerInfo.quantity || 1}
Variant: ${customerInfo.variant?.name || 'Standard'}
Total: ${product.currency || 'RWF'} ${((product.price || 0) * (customerInfo.quantity || 1)).toLocaleString()}

Customer Details:
Name: ${customerInfo.fullName}
Phone: ${customerInfo.phone}
Email: ${customerInfo.email || 'Not provided'}
Delivery: ${customerInfo.deliveryMethod}
Payment: ${customerInfo.paymentMethod}
Instructions: ${customerInfo.specialInstructions || 'None'}
      `.trim()
      
      const mailtoLink = `mailto:gashakavinc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      window.open(mailtoLink, '_blank')
      return { success: true, orderId: 'QO' + Date.now(), fallback: true }
    }

    const orderId = 'QO' + Date.now() + Math.floor(Math.random() * 1000)
    const totalPrice = (product.price || 0) * (customerInfo.quantity || 1)

    const templateParams = {
      order_id: orderId,
      customer_name: customerInfo.fullName,
      customer_phone: customerInfo.phone,
      customer_email: customerInfo.email || 'Not provided',
      product_name: product.name,
      product_category: product.category,
      quantity: customerInfo.quantity || 1,
      variant: customerInfo.variant?.name || 'Standard',
      unit_price: `${product.currency || 'RWF'} ${product.price?.toLocaleString() || '0'}`,
      total_amount: `${product.currency || 'RWF'} ${totalPrice.toLocaleString()}`,
      order_date: new Date().toLocaleString('en-RW', {
        timeZone: 'Africa/Kigali'
      }),
      special_instructions: customerInfo.specialInstructions || 'None',
      delivery_method: customerInfo.deliveryMethod || 'pickup',
      payment_method: customerInfo.paymentMethod || 'cash',
      order_type: 'Quick Order (Direct)',
      store_name: 'GVANTO Papeterie',
      store_phone: '0785 383 927'
    }

    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    )

    return { success: true, orderId, result }
    
  } catch (error) {
    console.error('Error sending quick order:', error)
    // Fallback
    alert('Failed to send order automatically. Opening email client...')
    const subject = `Quick Order - ${product.name}`
    const body = `Quick order for ${product.name}. Customer: ${customerInfo.fullName}, Phone: ${customerInfo.phone}`
    window.open(`mailto:gashakavinc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank')
    return { success: false, error }
  }
}