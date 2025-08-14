import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart } from '../contexts/CartContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product, index }) {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  
  const isInWishlist = state.wishlist.some(item => item.id === product.id);
  const isInCart = state.items.some(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', product });
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', productId: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', product });
    }
  };

  const handleProductClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={handleProductClick}
    >
      <div className="relative group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-44 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.div
            className="bg-white p-2 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Eye className="h-6 w-6 text-gray-700" />
          </motion.div>
        </div>
        
        {/* Wishlist Button */}
        <motion.button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isInWishlist 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-500'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart className={`h-4 w-4 ₹{isInWishlist ? 'fill-current' : ''}`} />
        </motion.button>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-blue-600">
            ₹{product.price}
          </span>
          
          <motion.button
            onClick={handleAddToCart}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              isInCart
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>{isInCart ? 'Added' : 'Add'}</span>
          </motion.button>
        </div>
        
      </div>
    </motion.div>
  );
}



