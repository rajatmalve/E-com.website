import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, User, Menu, X, LogOut } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import CartDrawer from './CartDrawer';
import WishlistDrawer from './WishlistDrawer';
import LoginModal from './LoginModal';

export default function Navbar() {
  const location = useLocation();
  const { state } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  if (user?.isAdmin) {
    navLinks.push({ name: 'Admin', path: '/admin' });
  }

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      setIsLoginOpen(true);
    }
  };

  return (
    <>
      <motion.nav 
        className="nav-gradient shadow-2xl sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                className="text-3xl font-bold gradient-text-primary"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                BoltStore
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3 py-2 text-sm font-semibold transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'gradient-text-primary'
                      : 'text-gray-700 hover:gradient-text-primary'
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      layoutId="activeTab"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Wishlist */}
              <motion.button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-3 text-gray-700 hover:text-pink-500 transition-all duration-300 hover:scale-110 hover:shadow-lg rounded-full hover:bg-pink-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="h-6 w-6" />
                {state.wishlist.length > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {state.wishlist.length}
                  </motion.span>
                )}
              </motion.button>

              {/* Cart */}
              <motion.button
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg rounded-full hover:bg-blue-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="h-6 w-6" />
                {state.items.length > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </motion.span>
                )}
              </motion.button>

              {/* Auth Button */}
              <motion.button
                onClick={handleAuthClick}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {isAuthenticated ? (
                  <>
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline font-semibold">Sign Out</span>
                  </>
                ) : (
                  <>
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline font-semibold">Sign In</span>
                  </>
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-3 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg rounded-full hover:bg-blue-50"
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden glass border-t border-white/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-2 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block px-3 py-3 text-base font-semibold rounded-xl transition-all duration-300 ${
                      location.pathname === link.path
                        ? 'gradient-text-primary bg-white/20'
                        : 'text-gray-700 hover:gradient-text-primary hover:bg-white/20'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Drawers and Modals */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}