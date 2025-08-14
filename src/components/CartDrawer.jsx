import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, CreditCard } from 'lucide-react';
import { useCart } from '../contexts/CartContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import PaymentModal from './PaymentModal.jsx';
import LoginModal from './LoginModal.jsx';

export default function CartDrawer({ isOpen, onClose }) {
  const { state, dispatch } = useCart();
  const { isAuthenticated, needsLoginForCheckout } = useAuth();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const removeItem = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  const handleCheckout = () => {
    const mustLogin = !isAuthenticated || needsLoginForCheckout(30);
    if (mustLogin) {
      setShowLogin(true);
      return;
    }
    setShowPaymentModal(true);
    onClose();
  };

  const afterLogin = () => {
    setShowLogin(false);
    setShowPaymentModal(true);
    onClose();
  };

  return (
    <>
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
                  <h2 className="text-lg font-semibold">Shopping Cart</h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {state.items.length} {state.items.length === 1 ? 'item' : 'items'}
                </p>
              </div>

              <div className="flex-1 p-4">
                {state.items.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.items.map((item) => (
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
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-2 py-1 bg-white rounded border">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
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

              {state.items.length > 0 && (
                <div className="border-t p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-xl font-bold text-blue-600">
                      ${state.total.toFixed(2)}
                    </span>
                  </div>
                  <motion.button
                    onClick={handleCheckout}
                    className="w-full text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-lg bg-primary-gradient hover:opacity-90"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <CreditCard className="h-5 w-5" />
                      <span>Proceed to Checkout</span>
                    </div>
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        product={state.items[0]}
        quantity={state.items.reduce((total, item) => total + item.quantity, 0)}
        isCartCheckout={true}
        cartItems={state.items}
        cartTotal={state.total}
      />

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} onSuccess={afterLogin} />
    </>
  );
}


