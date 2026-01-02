import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import LayoutWrapper from './components/Layout/LayoutWrapper'
import Home from './pages/Home'
import GovernmentServices from './pages/GovernmentServices'
import AboutPage from './pages/AboutPage'
import AllServices from './pages/AllServices'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import QuickOrderModal from './components/QuickOrderModal'
import { initEmailJS } from './utils/emailService'
import CustomOrder from './pages/CustomOrder'
import ContactPage from './pages/ContactPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import Feedback from './pages/Feedback'
import Help from './pages/Help'
import NotFound from './pages/NotFound'

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
          <Route path="/government-services" element={<AllServices />} />
          <Route path="/government" element={<AllServices />} />
          <Route path="/banking" element={<AllServices />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<AllServices />} />
          <Route path="/products" element={<AllServices />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/:category/:id/:slug?" element={<ProductDetail />} />
          <Route path="/custom-order" element={<CustomOrder />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App