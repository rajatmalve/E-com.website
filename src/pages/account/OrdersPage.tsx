import React, { useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function OrdersPage() {
  const { isAuthenticated } = useAuth();
  const orders = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('orders') || '[]');
    } catch {
      return [];
    }
  }, []);

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <div key={order.id} className="p-4 rounded-xl border bg-white">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Order #{order.id}</span>
                <span className="text-sm text-gray-500">{new Date(order.date).toLocaleString()}</span>
              </div>
              <div className="text-sm text-gray-700">Items: {order.items.length}</div>
              <div className="font-bold">Total: ₹{order.total?.toFixed?.(2) ?? order.total}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


