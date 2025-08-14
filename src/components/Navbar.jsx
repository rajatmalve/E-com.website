import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, User, Menu, X, LogOut, Search, ChevronDown } from 'lucide-react';
import { useCart } from '../contexts/CartContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { getSuggestions } from '../services/products.js';
import CartDrawer from './CartDrawer.jsx';
import WishlistDrawer from './WishlistDrawer.jsx';
import LoginModal from './LoginModal.jsx';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const [isSuggestLoading, setIsSuggestLoading] = useState(false);
  let suggestTimer;

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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get('q') || '');
  }, [location.search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    navigate({ pathname: '/products', search: query ? `?q=${encodeURIComponent(query)}` : '' });
    setIsMobileMenuOpen(false);
    setShowSuggest(false);
  };

  const handleQueryChange = async (value) => {
    setSearchQuery(value);
    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggest(false);
      return;
    }
    setShowSuggest(true);
    clearTimeout(suggestTimer);
    suggestTimer = setTimeout(async () => {
      setIsSuggestLoading(true);
      try {
        const res = await getSuggestions(value);
        setSuggestions(res);
      } catch {
        setSuggestions([]);
      } finally {
        setIsSuggestLoading(false);
      }
    }, 200);
  };

  const handleSelectSuggestion = (s) => {
    setShowSuggest(false);
    if (s?.id) {
      navigate(`/products/${s.id}`);
    } else if (s?.name) {
      navigate({ pathname: '/products', search: `?q=${encodeURIComponent(s.name)}` });
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
          <div className="flex justify-between items-center h-14 md:h-16">
            {/* Logo */}
            <Link to="/" aria-label="Pocho" className="inline-flex items-center">
              <motion.img
                src="/pochoLogo.png"
                alt="Pocho"
                className="block h-auto max-h-12 sm:max-h-14 md:max-h-16 w-48 sm:w-56 md:w-64 object-cover rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
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
                      className="absolute bottom-0 left-0 right-0 h-1 bg-primary-gradient rounded-full"
                      layoutId="activeTab"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search (Desktop) */}
              <form onSubmit={handleSearchSubmit} className="hidden lg:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleQueryChange(e.target.value)}
                    onFocus={() => searchQuery.trim() && setShowSuggest(true)}
                    onBlur={() => setTimeout(() => setShowSuggest(false), 150)}
                    placeholder="Search products..."
                    className="w-56 lg:w-64 pl-9 pr-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  />
                  {/* Suggestions */}
                  <AnimatePresence>
                    {showSuggest && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="absolute mt-2 w-64 lg:w-[22rem] bg-white rounded-xl shadow-lg border p-2 z-50"
                      >
                        {isSuggestLoading ? (
                          <div className="px-3 py-2 text-sm text-gray-500">Loading…</div>
                        ) : suggestions.length === 0 ? (
                          <div className="px-3 py-2 text-sm text-gray-500">No suggestions</div>
                        ) : (
                          suggestions.map((s) => (
                            <button
                              key={`${s.id || s.name}`}
                              className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => handleSelectSuggestion(s)}
                            >
                              {s.name}
                            </button>
                          ))
                        )}
                        <div className="border-t mt-1 pt-1">
                          <button
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-primary"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleSearchSubmit({ preventDefault: () => {} })}
                          >
                            Search for “{searchQuery}”
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
              {/* Wishlist */}
              <motion.button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 sm:p-3 text-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg rounded-full hover-text-primary hover-bg-primary-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="h-6 w-6" />
                {state.wishlist.length > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-secondary-gradient text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg"
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
                className="relative p-2 sm:p-3 text-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg rounded-full hover-text-primary hover-bg-primary-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="h-6 w-6" />
                {state.items.length > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-primary-gradient text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </motion.span>
                )}
              </motion.button>

              {/* Account / Auth */}
              {isAuthenticated ? (
                <div className="relative">
                  {/* Compact account button on small screens */}
                  <motion.button
                    onClick={() => setShowAccountMenu((s) => !s)}
                    className="sm:hidden p-2 rounded-full border bg-white text-gray-800 hover:shadow transition-all"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <User className="h-5 w-5" />
                  </motion.button>
                  {/* Full button from sm and up */}
                  <motion.button
                    onClick={() => setShowAccountMenu((s) => !s)}
                    className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-white text-gray-800 rounded-xl border hover:shadow transition-all"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline font-semibold">Account</span>
                    <ChevronDown className="h-4 w-4" />
                  </motion.button>
                  <AnimatePresence>
                    {showAccountMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border p-2 z-50"
                        onMouseLeave={() => setShowAccountMenu(false)}
                      >
                        <Link to="/account/profile" className="block px-3 py-2 rounded-lg hover:bg-gray-50">Profile</Link>
                        <div className="border-t my-1"></div>
                        <Link to="/account/orders" className="block px-3 py-2 rounded-lg hover:bg-gray-50">My Orders</Link>
                        <Link to="/account/reviews" className="block px-3 py-2 rounded-lg hover:bg-gray-50">My Reviews</Link>
                        <div className="border-t my-1"></div>
                        <Link to="/track-order" className="block px-3 py-2 rounded-lg hover:bg-gray-50">Track Order</Link>
                        <Link to="/shipping-policy" className="block px-3 py-2 rounded-lg hover:bg-gray-50">Shipping Info</Link>
                        <Link to="/return-exchange" className="block px-3 py-2 rounded-lg hover:bg-gray-50">Returns & Exchange</Link>
                        <div className="border-t my-1"></div>
                        <button onClick={logout} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-red-600 flex items-center space-x-2"><LogOut className="h-4 w-4" /><span>Sign Out</span></button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  {/* Compact sign-in icon on small screens */}
                  <motion.button
                    onClick={handleAuthClick}
                    className="sm:hidden p-2 rounded-full bg-primary-gradient text-white transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Sign In"
                  >
                    <User className="h-5 w-5" />
                  </motion.button>
                  {/* Full button from sm and up */}
                  <motion.button
                    onClick={handleAuthClick}
                    className="hidden sm:flex items-center space-x-2 px-6 py-2 bg-primary-gradient text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline font-semibold">Sign In</span>
                  </motion.button>
                </>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 sm:p-3 text-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg rounded-full hover-text-primary hover-bg-primary-10"
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
              <div className="px-4 py-2 space-y-3">
                {/* Search (Mobile) */}
                <form onSubmit={handleSearchSubmit} className="pt-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => handleQueryChange(e.target.value)}
                      placeholder="Search products..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-white/90"
                    />
                  </div>
                </form>
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


