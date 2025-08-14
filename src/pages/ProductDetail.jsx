import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Heart, Truck, Shield, RotateCcw, CreditCard } from 'lucide-react';
import { products } from '../data/products.js';
import { useCart } from '../contexts/CartContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import PaymentModal from '../components/PaymentModal.jsx';
import LoginModal from '../components/LoginModal.jsx';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const { isAuthenticated, needsLoginForCheckout } = useAuth();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showLogin, setShowLogin] = useState(false);
  
  const product = products.find(p => p.id === Number(id));
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Product not found</p>
      </div>
    );
  }

  const isInWishlist = state.wishlist.some(item => item.id === product.id);
  const isInCart = state.items.some(item => item.id === product.id);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', product });
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', productId: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', product });
    }
  };

  const handleCheckout = () => {
    const mustLogin = !isAuthenticated || needsLoginForCheckout(30);
    if (mustLogin) {
      setShowLogin(true);
      return;
    }
    setShowPaymentModal(true);
  };

  const afterLogin = () => {
    setShowLogin(false);
    setShowPaymentModal(true);
  };

  const activeVariantPrice = product.price;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Products</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-xl overflow-hidden shadow-md">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden shadow-sm border-2 transition-colors ₹{
                    selectedImageIndex === index ? 'border-blue-500' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`₹{product.name} view ₹{index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="mb-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-xl text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Price and Quantity */}
            <div className="border-t border-b py-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-4xl font-bold text-blue-600">₹{activeVariantPrice}</span>
                  <span className="text-gray-500 ml-2">per roll</span>
                </div>
                <div className="flex items-center space-x-3">
                  <label className="text-sm font-medium text-gray-700">Quantity:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 border-x border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg text-gray-600">Total: </span>
                <span className="text-2xl font-bold text-blue-600">₹{(activeVariantPrice * quantity).toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <motion.button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                    isInCart
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>{isInCart ? 'Added to Cart' : 'Add to Cart'}</span>
                </motion.button>

                <motion.button
                  onClick={handleToggleWishlist}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ₹{
                    isInWishlist
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className={`h-5 w-5 ₹{isInWishlist ? 'fill-current' : ''}`} />
                </motion.button>
              </div>

              {/* Checkout Button */}
              <motion.button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <CreditCard className="h-5 w-5" />
                <span>Buy Now - Rs{(activeVariantPrice * quantity).toFixed(2)}</span>
              </motion.button>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Product Features</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Free shipping on orders over ₹200</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Quality guarantee</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        product={product}
        quantity={quantity}
      />

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} onSuccess={afterLogin} />
    </motion.div>
  );
}



