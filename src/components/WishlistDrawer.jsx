import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext.jsx';

export default function WishlistDrawer({ isOpen, onClose }) {
  const { state, dispatch } = useCart();

  const moveToCart = (productId) => {
    const product = state.wishlist.find(item => item.id === productId);
    if (product) {
      dispatch({ type: 'ADD_TO_CART', product });
      dispatch({ type: 'REMOVE_FROM_WISHLIST', productId });
    }
  };

  const removeFromWishlist = (productId) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', productId });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-sm md:w-96 bg-white shadow-xl z-50 overflow-y-auto"
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Wishlist</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {state.wishlist.length} {state.wishlist.length === 1 ? 'item' : 'items'}
              </p>
            </div>

            <div className="flex-1 p-4">
              {state.wishlist.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Your wishlist is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.wishlist.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                      layout
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-blue-600 font-semibold">${item.price}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => moveToCart(item.id)}
                            className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                          >
                            <ShoppingCart className="h-3 w-3" />
                            <span>Add to Cart</span>
                          </button>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="p-1 hover:bg-red-100 rounded text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


