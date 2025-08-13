import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CreditCard, 
  Lock, 
  CheckCircle, 
  AlertCircle,
  Eye,
  EyeOff,
  ShoppingBag,
  Shield,
  Truck
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  quantity?: number;
  isCartCheckout?: boolean;
  cartItems?: any[];
  cartTotal?: number;
}

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  product, 
  quantity = 1, 
  isCartCheckout = false, 
  cartItems = [], 
  cartTotal = 0 
}: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: ''
  });
  const [errors, setErrors] = useState<any>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalAmount = isCartCheckout ? cartTotal : (product.price * quantity);

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
    else if (formData.cardNumber.length < 16) newErrors.cardNumber = 'Invalid card number';

    if (!formData.cardHolder) newErrors.cardHolder = 'Card holder name is required';

    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) newErrors.expiryDate = 'Invalid expiry date';

    if (!formData.cvv) newErrors.cvv = 'CVV is required';
    else if (formData.cvv.length < 3) newErrors.cvv = 'Invalid CVV';

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';

    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    if (!formData.country) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCardNumberChange = (value: string) => {
    const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    handleInputChange('cardNumber', formatted.substring(0, 19));
  };

  const handleExpiryChange = (value: string) => {
    const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
    handleInputChange('expiryDate', formatted.substring(0, 5));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Close modal after 3 seconds
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({
          cardNumber: '',
          cardHolder: '',
          expiryDate: '',
          cvv: '',
          email: '',
          address: '',
          city: '',
          zipCode: '',
          country: ''
        });
        
        // Clear cart if it's a cart checkout
        if (isCartCheckout) {
          // You can add cart clearing logic here if needed
          console.log('Cart cleared after successful payment');
        }
      }, 3000);
    }, 2000);
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'paypal', name: 'PayPal', icon: Lock },
    { id: 'crypto', name: 'Cryptocurrency', icon: Shield }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShoppingBag className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Checkout</h2>
                  <p className="text-sm text-gray-600">Complete your purchase</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Success State */}
            {isSuccess && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-8 text-center"
              >
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                                 <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
                 <p className="text-gray-600 mb-4">
                   {isCartCheckout 
                     ? `Your order with ${cartItems.length} item${cartItems.length > 1 ? 's' : ''} has been placed successfully.`
                     : 'Your order has been placed successfully.'
                   }
                 </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800">
                    Order confirmation has been sent to your email.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Payment Form */}
            {!isSuccess && (
              <div className="p-6">
                                 {/* Order Summary */}
                 <div className="bg-gray-50 rounded-xl p-4 mb-6">
                   <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
                   {isCartCheckout ? (
                     <div className="space-y-3">
                       {cartItems.map((item, index) => (
                         <div key={index} className="flex items-center space-x-3">
                           <img 
                             src={item.image} 
                             alt={item.name}
                             className="w-12 h-12 object-cover rounded-lg"
                           />
                           <div className="flex-1">
                             <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                             <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                           </div>
                           <div className="text-right">
                             <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                           </div>
                         </div>
                       ))}
                       <div className="border-t pt-3 mt-3">
                         <div className="flex justify-between items-center">
                           <span className="font-semibold text-gray-900">Total Items:</span>
                           <span className="font-medium text-gray-700">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
                         </div>
                       </div>
                     </div>
                   ) : (
                     <div className="flex items-center space-x-3">
                       <img 
                         src={product.images[0]} 
                         alt={product.name}
                         className="w-16 h-16 object-cover rounded-lg"
                       />
                       <div className="flex-1">
                         <h4 className="font-medium text-gray-900">{product.name}</h4>
                         <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                       </div>
                       <div className="text-right">
                         <p className="font-bold text-gray-900">${totalAmount.toFixed(2)}</p>
                       </div>
                     </div>
                   )}
                 </div>

                {/* Payment Methods */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          paymentMethod === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <method.icon className="h-5 w-5 text-gray-600" />
                          <span className="font-medium text-gray-900">{method.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                                 {/* Payment Form */}
                 {paymentMethod === 'card' && (
                   <form onSubmit={handleSubmit} className="space-y-8">
                     {/* Card Preview */}
                     <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white mb-6">
                       <div className="flex justify-between items-start mb-6">
                         <div className="flex items-center space-x-3">
                           <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                             <CreditCard className="h-4 w-4" />
                           </div>
                           <span className="font-semibold">Credit Card</span>
                         </div>
                         <div className="text-right">
                           <div className="w-12 h-8 bg-white/20 rounded-lg mb-2"></div>
                           <span className="text-xs opacity-80">Chip</span>
                         </div>
                       </div>
                       
                       <div className="mb-6">
                         <div className="text-2xl font-mono mb-2 tracking-wider">
                           {formData.cardNumber || '•••• •••• •••• ••••'}
                         </div>
                         <div className="flex justify-between items-center">
                           <div>
                             <div className="text-xs opacity-80 mb-1">Card Holder</div>
                             <div className="font-medium">
                               {formData.cardHolder || 'YOUR NAME'}
                             </div>
                           </div>
                           <div className="text-right">
                             <div className="text-xs opacity-80 mb-1">Expires</div>
                             <div className="font-medium">
                               {formData.expiryDate || 'MM/YY'}
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Card Details Form */}
                     <div className="space-y-6">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <motion.div
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.1 }}
                         >
                           <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                             <CreditCard className="h-4 w-4 mr-2 text-blue-600" />
                             Card Number
                           </label>
                           <div className="relative">
                             <input
                               type="text"
                               value={formData.cardNumber}
                               onChange={(e) => handleCardNumberChange(e.target.value)}
                               placeholder="1234 5678 9012 3456"
                               className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                                 errors.cardNumber ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                               }`}
                             />
                             <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                               <div className="w-8 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
                             </div>
                           </div>
                           {errors.cardNumber && (
                             <motion.p 
                               initial={{ opacity: 0, y: -10 }}
                               animate={{ opacity: 1, y: 0 }}
                               className="text-red-500 text-sm mt-2 flex items-center"
                             >
                               <AlertCircle className="h-4 w-4 mr-1" />
                               {errors.cardNumber}
                             </motion.p>
                           )}
                         </motion.div>

                         <motion.div
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.2 }}
                         >
                           <label className="block text-sm font-semibold text-gray-700 mb-3">
                             Card Holder Name
                           </label>
                           <input
                             type="text"
                             value={formData.cardHolder}
                             onChange={(e) => handleInputChange('cardHolder', e.target.value)}
                             placeholder="John Doe"
                             className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                               errors.cardHolder ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                             }`}
                           />
                           {errors.cardHolder && (
                             <motion.p 
                               initial={{ opacity: 0, y: -10 }}
                               animate={{ opacity: 1, y: 0 }}
                               className="text-red-500 text-sm mt-2 flex items-center"
                             >
                               <AlertCircle className="h-4 w-4 mr-1" />
                               {errors.cardHolder}
                             </motion.p>
                           )}
                         </motion.div>

                         <motion.div
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.3 }}
                         >
                           <label className="block text-sm font-semibold text-gray-700 mb-3">
                             Expiry Date
                           </label>
                           <input
                             type="text"
                             value={formData.expiryDate}
                             onChange={(e) => handleExpiryChange(e.target.value)}
                             placeholder="MM/YY"
                             className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                               errors.expiryDate ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                             }`}
                           />
                           {errors.expiryDate && (
                             <motion.p 
                               initial={{ opacity: 0, y: -10 }}
                               animate={{ opacity: 1, y: 0 }}
                               className="text-red-500 text-sm mt-2 flex items-center"
                             >
                               <AlertCircle className="h-4 w-4 mr-1" />
                               {errors.expiryDate}
                             </motion.p>
                           )}
                         </motion.div>

                         <motion.div
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.4 }}
                         >
                           <label className="block text-sm font-semibold text-gray-700 mb-3">
                             CVV
                           </label>
                           <div className="relative">
                             <input
                               type={showPassword ? 'text' : 'password'}
                               value={formData.cvv}
                               onChange={(e) => handleInputChange('cvv', e.target.value)}
                               placeholder="123"
                               maxLength={4}
                               className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 pr-12 transition-all duration-200 ${
                                 errors.cvv ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                               }`}
                             />
                             <button
                               type="button"
                               onClick={() => setShowPassword(!showPassword)}
                               className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                             >
                               {showPassword ? (
                                 <EyeOff className="h-5 w-5 text-gray-400" />
                               ) : (
                                 <Eye className="h-5 w-5 text-gray-400" />
                               )}
                             </button>
                           </div>
                           {errors.cvv && (
                             <motion.p 
                               initial={{ opacity: 0, y: -10 }}
                               animate={{ opacity: 1, y: 0 }}
                               className="text-red-500 text-sm mt-2 flex items-center"
                             >
                               <AlertCircle className="h-4 w-4 mr-1" />
                               {errors.cvv}
                             </motion.p>
                           )}
                         </motion.div>
                       </div>
                     </div>

                                         {/* Shipping Information */}
                     <motion.div
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.5 }}
                       className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100"
                     >
                       <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                         <Truck className="h-5 w-5 mr-2 text-blue-600" />
                         Shipping Information
                       </h4>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                           <label className="block text-sm font-semibold text-gray-700 mb-2">
                             Email Address
                           </label>
                           <input
                             type="email"
                             value={formData.email}
                             onChange={(e) => handleInputChange('email', e.target.value)}
                             placeholder="john@example.com"
                             className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                               errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                             }`}
                           />
                           {errors.email && (
                             <motion.p 
                               initial={{ opacity: 0, y: -10 }}
                               animate={{ opacity: 1, y: 0 }}
                               className="text-red-500 text-sm mt-2 flex items-center"
                             >
                               <AlertCircle className="h-4 w-4 mr-1" />
                               {errors.email}
                             </motion.p>
                           )}
                         </div>

                         <div>
                           <label className="block text-sm font-semibold text-gray-700 mb-2">
                             Country
                           </label>
                           <select
                             value={formData.country}
                             onChange={(e) => handleInputChange('country', e.target.value)}
                             className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                               errors.country ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                             }`}
                           >
                             <option value="">Select Country</option>
                             <option value="US">United States</option>
                             <option value="CA">Canada</option>
                             <option value="UK">United Kingdom</option>
                             <option value="IN">India</option>
                           </select>
                           {errors.country && (
                             <motion.p 
                               initial={{ opacity: 0, y: -10 }}
                               animate={{ opacity: 1, y: 0 }}
                               className="text-red-500 text-sm mt-2 flex items-center"
                             >
                               <AlertCircle className="h-4 w-4 mr-1" />
                               {errors.country}
                             </motion.p>
                           )}
                         </div>

                         <div className="md:col-span-2">
                           <label className="block text-sm font-semibold text-gray-700 mb-2">
                             Street Address
                           </label>
                           <input
                             type="text"
                             value={formData.address}
                             onChange={(e) => handleInputChange('address', e.target.value)}
                             placeholder="123 Main Street"
                             className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                               errors.address ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                             }`}
                           />
                           {errors.address && (
                             <motion.p 
                               initial={{ opacity: 0, y: -10 }}
                               animate={{ opacity: 1, y: 0 }}
                               className="text-red-500 text-sm mt-2 flex items-center"
                             >
                               <AlertCircle className="h-4 w-4 mr-1" />
                               {errors.address}
                             </motion.p>
                           )}
                         </div>

                         <div>
                           <label className="block text-sm font-semibold text-gray-700 mb-2">
                             City
                           </label>
                           <input
                             type="text"
                             value={formData.city}
                             onChange={(e) => handleInputChange('city', e.target.value)}
                             placeholder="New York"
                             className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                               errors.city ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                             }`}
                           />
                           {errors.city && (
                             <motion.p 
                               initial={{ opacity: 0, y: -10 }}
                               animate={{ opacity: 1, y: 0 }}
                               className="text-red-500 text-sm mt-2 flex items-center"
                             >
                               <AlertCircle className="h-4 w-4 mr-1" />
                               {errors.city}
                             </motion.p>
                           )}
                         </div>

                         <div>
                           <label className="block text-sm font-semibold text-gray-700 mb-2">
                             ZIP Code
                           </label>
                           <input
                             type="text"
                             value={formData.zipCode}
                             onChange={(e) => handleInputChange('zipCode', e.target.value)}
                             placeholder="10001"
                             className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 ${
                               errors.zipCode ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                             }`}
                           />
                           {errors.zipCode && (
                             <motion.p 
                               initial={{ opacity: 0, y: -10 }}
                               animate={{ opacity: 1, y: 0 }}
                               className="text-red-500 text-sm mt-2 flex items-center"
                             >
                               <AlertCircle className="h-4 w-4 mr-1" />
                               {errors.zipCode}
                             </motion.p>
                           )}
                         </div>
                       </div>
                     </motion.div>

                     {/* Total and Submit */}
                     <motion.div
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.6 }}
                       className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100"
                     >
                       <div className="flex justify-between items-center mb-6">
                         <span className="text-xl font-bold text-gray-900">Total Amount:</span>
                         <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                           ${totalAmount.toFixed(2)}
                         </span>
                       </div>
                       
                       <motion.button
                         type="submit"
                         disabled={isProcessing}
                         className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
                         whileHover={{ scale: 1.02, y: -2 }}
                         whileTap={{ scale: 0.98 }}
                       >
                         {isProcessing ? (
                           <div className="flex items-center justify-center space-x-3">
                             <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                             <span className="text-lg">Processing Payment...</span>
                           </div>
                         ) : (
                           <div className="flex items-center justify-center space-x-2">
                             <CreditCard className="h-5 w-5" />
                             <span className="text-lg">Pay ${totalAmount.toFixed(2)}</span>
                           </div>
                         )}
                       </motion.button>
                     </motion.div>
                  </form>
                )}

                {/* PayPal Option */}
                {paymentMethod === 'paypal' && (
                  <div className="text-center py-8">
                    <div className="bg-blue-50 p-6 rounded-xl mb-4">
                      <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">PayPal Checkout</h3>
                      <p className="text-gray-600">You will be redirected to PayPal to complete your payment.</p>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Continue with PayPal
                    </button>
                  </div>
                )}

                {/* Crypto Option */}
                {paymentMethod === 'crypto' && (
                  <div className="text-center py-8">
                    <div className="bg-purple-50 p-6 rounded-xl mb-4">
                      <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Cryptocurrency Payment</h3>
                      <p className="text-gray-600">Pay with Bitcoin, Ethereum, or other cryptocurrencies.</p>
                    </div>
                    <button className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                      Pay with Crypto
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
