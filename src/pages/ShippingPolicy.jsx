import React from 'react';
import { motion } from 'framer-motion';

const ShippingPolicy = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Shipping & Returns Policy</h1>
      
      {/* Shipping Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Shipping Information</h2>
        <div className="space-y-4 text-gray-600">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-semibold mb-2">Processing Time</h3>
            <p>Orders are typically processed within 1-2 business days.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-semibold mb-2">Shipping Methods & Times</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Standard Shipping: 5-7 business days</li>
              <li>Express Shipping: 2-3 business days</li>
              <li>Next Day Delivery: Available for select locations</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-semibold mb-2">Shipping Costs</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Free standard shipping on orders over $50</li>
              <li>Standard Shipping: $4.99</li>
              <li>Express Shipping: $9.99</li>
              <li>Next Day Delivery: $14.99</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Returns Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Returns Policy</h2>
        <div className="space-y-4 text-gray-600">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-semibold mb-2">Return Window</h3>
            <p>You have 30 days from the date of delivery to return your items.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-semibold mb-2">Return Conditions</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Items must be unused and in original packaging</li>
              <li>All tags and labels must be attached</li>
              <li>Include the original receipt or order confirmation</li>
              <li>Items on sale or marked as final sale cannot be returned</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-semibold mb-2">Return Process</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Initiate a return through your account dashboard</li>
              <li>Print the provided return shipping label</li>
              <li>Pack the item securely with all original materials</li>
              <li>Drop off the package at the nearest shipping location</li>
              <li>Refund will be processed within 5-7 business days after receipt</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Exchange Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Exchange Policy</h2>
        <div className="space-y-4 text-gray-600">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-semibold mb-2">Exchange Process</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Exchanges are available for different sizes or colors of the same item</li>
              <li>Exchange requests must be made within 30 days of delivery</li>
              <li>Items must be unused and in original condition</li>
              <li>Shipping costs for exchanges are free</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-semibold mb-2">Contact Us</h3>
            <p>For any questions about our shipping and returns policy, please contact our customer service:</p>
            <ul className="mt-2 space-y-1">
              <li>Email: support@boltstore.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Hours: Monday - Friday, 9:00 AM - 5:00 PM EST</li>
            </ul>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ShippingPolicy;
