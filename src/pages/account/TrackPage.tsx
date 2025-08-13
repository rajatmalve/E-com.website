import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function TrackPage() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Track Shipment</h1>
      <div className="p-4 rounded-xl border bg-white">
        <p className="text-gray-600 text-sm">Enter your Order ID to check current status.</p>
        <div className="mt-4 flex gap-3">
          <input className="flex-1 px-3 py-2 border rounded-lg" placeholder="Order ID" />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Track</button>
        </div>
        <div className="mt-4 text-gray-600 text-sm">Demo: tracking is mocked in this build.</div>
      </div>
    </div>
  );
}


