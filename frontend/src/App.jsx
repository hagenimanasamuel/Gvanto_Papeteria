import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import LayoutWrapper from './components/Layout/LayoutWrapper'
import Home from './pages/Home'
import GovernmentServices from './pages/GovernmentServices'
import About from './pages/About'
import Contact from './pages/Contact'
import AllServices from './pages/AllServices'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import QuickOrderModal from './components/QuickOrderModal'
import { initEmailJS } from './utils/emailService'
import CustomOrder from './pages/CustomOrder'

function App() {
  useEffect(() => {
    // Initialize EmailJS when app starts
    initEmailJS()
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutWrapper />}>
          <Route index element={<Home />} />
          <Route path="/government-services" element={<GovernmentServices />} />
          <Route path="/about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/services" element={<AllServices />} />
          <Route path="/products" element={<AllServices />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/:category/:id/:slug?" element={<ProductDetail />} />
          <Route path="/custom-order" element={<CustomOrder />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App