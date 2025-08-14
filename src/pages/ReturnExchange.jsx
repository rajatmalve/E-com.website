import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, AlertCircle } from 'lucide-react';

const ReturnExchange = () => {
  const [formType, setFormType] = useState('return'); // 'return' or 'exchange'
  const [formData, setFormData] = useState({
    orderNumber: '',
    reason: '',
    itemCondition: '',
    description: '',
    images: [],
    preferredMethod: 'refund', // 'refund' or 'exchange'
    exchangeSize: '',
    exchangeColor: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const reasons = [
    "Wrong size",
    "Wrong item received",
    "Defective/Damaged item",
    "Not as described",
    "Changed mind",
    "Other"
  ];

  const conditions = [
    "Unused with tags",
    "Unused without tags",
    "Used once",
    "Used multiple times",
    "Damaged"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 3) {
      alert('Maximum 3 images allowed');
      return;
    }
    
    // Convert files to URLs for preview
    const newImages = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Mock API call - replace with actual API integration
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Request submitted successfully!');
      // Reset form
      setFormData({
        orderNumber: '',
        reason: '',
        itemCondition: '',
        description: '',
        images: [],
        preferredMethod: 'refund',
        exchangeSize: '',
        exchangeColor: '',
      });
    } catch (error) {
      alert('Error submitting request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => window.history.back()}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">
          {formType === 'return' ? 'Return Request' : 'Exchange Request'}
        </h1>
      </div>

      <div className="mb-8">
        <div className="flex space-x-4">
          <button
            onClick={() => setFormType('return')}
            className={`px-6 py-2 rounded-lg ${
              formType === 'return'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            } transition-colors duration-200`}
          >
            Return
          </button>
          <button
            onClick={() => setFormType('exchange')}
            className={`px-6 py-2 rounded-lg ${
              formType === 'exchange'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            } transition-colors duration-200`}
          >
            Exchange
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Order Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Order Information</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Order Number *
              </label>
              <input
                type="text"
                id="orderNumber"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your order number"
              />
            </div>
          </div>
        </div>

        {/* Return/Exchange Details */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">
            {formType === 'return' ? 'Return Details' : 'Exchange Details'}
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                Reason for {formType} *
              </label>
              <select
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a reason</option>
                {reasons.map(reason => (
                  <option key={reason} value={reason}>{reason}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="itemCondition" className="block text-sm font-medium text-gray-700 mb-1">
                Item Condition *
              </label>
              <select
                id="itemCondition"
                name="itemCondition"
                value={formData.itemCondition}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select condition</option>
                {conditions.map(condition => (
                  <option key={condition} value={condition}>{condition}</option>
                ))}
              </select>
            </div>

            {formType === 'exchange' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="exchangeSize" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Size
                  </label>
                  <input
                    type="text"
                    id="exchangeSize"
                    name="exchangeSize"
                    value={formData.exchangeSize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter preferred size"
                  />
                </div>
                <div>
                  <label htmlFor="exchangeColor" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Color
                  </label>
                  <input
                    type="text"
                    id="exchangeColor"
                    name="exchangeColor"
                    value={formData.exchangeColor}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter preferred color"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Details
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Provide any additional details about your request"
              />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Upload Images</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-50 text-gray-500 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100">
                <Upload className="w-8 h-8 mb-2" />
                <span className="text-sm">Upload up to 3 images</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  disabled={formData.images.length >= 3}
                />
              </label>
            </div>
            
            {formData.images.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
              submitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {submitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ReturnExchange;
