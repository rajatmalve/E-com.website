import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, AlertCircle } from 'lucide-react';

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [error, setError] = useState('');

  // Mock tracking data - replace with actual API call
  const mockTrackingData = {
    orderId: "ORD123456",
    status: "in_transit",
    estimatedDelivery: "2025-08-16",
    currentLocation: "Mumbai, India",
    timeline: [
      { 
        status: "ordered",
        date: "2025-08-12",
        location: "Nagpur, India",
        description: "Order placed successfully"
      },
      { 
        status: "processed",
        date: "2025-08-13",
        location: "Nagpur, India",
        description: "Order processed and ready for shipping"
      },
      { 
        status: "shipped",
        date: "2025-08-14",
        location: "Nagpur, India",
        description: "Order shipped via express delivery"
      },
      { 
        status: "in_transit",
        date: "2025-08-14",
        location: "Mumbai, India",
        description: "Package in transit to delivery location"
      }
    ]
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (!orderNumber.trim()) {
      setError('Please enter an order number');
      return;
    }
    
    // Mock API call - replace with actual API integration
    setTrackingData(mockTrackingData);
    setError('');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ordered':
        return <Package className="w-6 h-6 text-blue-500" />;
      case 'processed':
        return <CheckCircle className="w-6 h-6 text-yellow-500" />;
      case 'shipped':
        return <Truck className="w-6 h-6 text-purple-500" />;
      case 'in_transit':
        return <Truck className="w-6 h-6 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      default:
        return <AlertCircle className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Track Your Order</h1>

      <form onSubmit={handleTrackOrder} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="Enter your order number"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Track Order
          </button>
        </div>
        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
      </form>

      {trackingData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Order Number</h3>
                <p className="text-lg font-semibold text-gray-900">{trackingData.orderId}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Current Location</h3>
                <p className="text-lg font-semibold text-gray-900">{trackingData.currentLocation}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Estimated Delivery</h3>
                <p className="text-lg font-semibold text-gray-900">{new Date(trackingData.estimatedDelivery).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Shipping Timeline</h2>
            <div className="space-y-4">
              {trackingData.timeline.map((event, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(event.status)}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {event.description}
                        </h3>
                        <p className="text-sm text-gray-500">{event.location}</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </div>
                    {index < trackingData.timeline.length - 1 && (
                      <div className="w-0.5 h-8 bg-gray-200 ml-3 mt-2"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TrackOrder;
