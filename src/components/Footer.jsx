import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Heart,
  ArrowRight,
  Shield,
  Truck,
  RefreshCw,
  CreditCard
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleTrackOrderClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate('/track-order');
    } else {
      setIsLoginOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    navigate('/track-order');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Payment",
      description: "100% secure payment processing"
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Free Shipping",
      description: "Free shipping on orders over $50"
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Easy Returns",
      description: "30-day return policy"
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Multiple Payment",
      description: "Pay with card, PayPal, or crypto"
    }
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Track Order", href: "/track-order" },
    { name: "Return/Exchange", href: "/return-exchange" },
    { name: "Shipping Policy", href: "/shipping-policy" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" }
  ];

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Books",
    "Beauty",
    "Toys",
    "Automotive"
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Features Section */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center space-x-3 group"
              >
                <div className="p-3 bg-primary-gradient rounded-xl group-hover:scale-110 transition-all duration-300 shadow-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{feature.title}</h3>
                  <p className="text-gray-400 text-xs">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="mb-4">
              <img
                src="/Pocho Logo.jpg"
                alt="Pocho"
                className="h-10 w-auto object-contain"
                loading="lazy"
              />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your one-stop destination for premium products. We bring you the best quality items with exceptional service and competitive prices.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Linkedin, href: "#", label: "LinkedIn" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-primary-gradient rounded-full hover:scale-110 transition-all duration-300 shadow-lg"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.name === "Track Order" ? (
                    <button
                      onClick={handleTrackOrderClick}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group w-full text-left"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Login Modal */}
          <LoginModal
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            onSuccess={handleLoginSuccess}
          />          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/products?category=${category.toLowerCase()}`}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  {category}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Newsletter & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <form onSubmit={handleNewsletterSubmit} className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-gradient rounded-r-lg transition-all duration-300 shadow-lg hover:opacity-90"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400 text-sm">support@boltstore.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400 text-sm">123 dighori, Nagpur, 12345</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Design and Developed by</span>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-white"
              >
                RIGHT SERVE INFOTECH SYSTEM PVT. LTD.
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-400">
               <div className="flex items-center space-x-2 text-sm text-gray-400">
              
              <span>Design and Developed by</span>
              <span>© {new Date().getFullYear()}</span>
              <a
                href="https://rsinfotechsys.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-white"
              >
                RIGHT SERVE INFOTECH SYSTEM PVT. LTD.
              </a>
            </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


