import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LayoutWrapper from './components/Layout/LayoutWrapper'
import Home from './pages/Home'
import Products from './pages/Products'
import Services from './pages/Services'
import GovernmentServices from './pages/GovernmentServices'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutWrapper />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="services" element={<Services />} />
          <Route path="government-services" element={<GovernmentServices />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App