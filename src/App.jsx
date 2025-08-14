import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import OrdersPage from './pages/account/OrdersPage.jsx';
import TrackPage from './pages/account/TrackPage.jsx';
import ProfilePage from './pages/account/ProfilePage.jsx';
import ReviewsPage from './pages/account/ReviewsPage.jsx';
import TrackOrder from './pages/TrackOrder.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-1">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/account/orders" element={<OrdersPage />} />
                  <Route path="/account/track" element={<TrackPage />} />
                  <Route path="/account/profile" element={<ProfilePage />} />
                  <Route path="/account/reviews" element={<ReviewsPage />} />
                  <Route path="/track-order" element={<TrackOrder />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
            <WhatsAppButton />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;


