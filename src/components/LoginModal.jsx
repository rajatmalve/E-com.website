import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function LoginModal({ isOpen, onClose, onSuccess }) {
  const [mode, setMode] = useState('signin');
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' | 'phone'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();

  const resetFields = () => {
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (mode === 'signin') {
      const identifier = loginMethod === 'email' ? email : phone;
      if (!identifier.trim()) {
        setError(loginMethod === 'email' ? 'Email is required' : 'Phone is required');
        return;
      }
      const success = login(identifier, password);
      if (success) {
        onClose();
        if (typeof onSuccess === 'function') onSuccess();
        resetFields();
      } else {
        setError('Invalid credentials');
      }
    } else {
      if (!name.trim()) return setError('Name is required');
      if (!email.trim() && !phone.trim()) return setError('Provide email or phone');
      const success = signup(name.trim(), email.trim(), password, phone.trim());
      if (success) {
        onClose();
        if (typeof onSuccess === 'function') onSuccess();
        resetFields();
        setMode('signin');
      } else {
        setError('Account already exists with this email/phone');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="bg-white rounded-xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{mode === 'signin' ? 'Sign In' : 'Create Account'}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Toggle for email/phone login */}
              {mode === 'signin' && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button
                    className={`px-3 py-2 rounded-lg border ${loginMethod === 'email' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white'}`}
                    onClick={() => setLoginMethod('email')}
                  >
                    Email
                  </button>
                  <button
                    className={`px-3 py-2 rounded-lg border ${loginMethod === 'phone' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white'}`}
                    onClick={() => setLoginMethod('phone')}
                  >
                    Phone
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your name"
                      required={mode === 'signup'}
                    />
                  </div>
                )}

                {/* Email or Phone input */}
                {mode === 'signin' ? (
                  loginMethod === 'email' ? (
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                      />
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your phone"
                      />
                    </div>
                  )
                ) : (
                  <>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email (optional if phone provided)
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone (optional if email provided)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your phone"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm">{error}</p>
                )}

                <motion.button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {mode === 'signin' ? 'Sign In' : 'Sign Up'}
                </motion.button>
              </form>

              {mode === 'signin' ? (
                <div className="mt-4 text-center text-sm">
                  <span className="text-gray-600">Don't have an account? </span>
                  <button
                    className="text-blue-600 font-semibold hover:underline"
                    onClick={() => { setMode('signup'); setError(''); }}
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="mt-4 text-center text-sm">
                  <span className="text-gray-600">Already have an account? </span>
                  <button
                    className="text-blue-600 font-semibold hover:underline"
                    onClick={() => { setMode('signin'); setError(''); setLoginMethod('email'); }}
                  >
                    Sign In
                  </button>
                </div>
              )}

              {mode === 'signin' && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 mb-2">Demo Credentials:</p>
                  <p className="text-xs text-gray-500">
                    Admin: admin@poscho.com / password<br />
                    User: john@example.com / password<br />
                    Phone examples: +15550000001 / password
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


