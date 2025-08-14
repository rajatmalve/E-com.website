import React, { useMemo, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { CheckCircle, Circle, Truck, Package, MapPin, Home } from 'lucide-react';

export default function TrackPage() {
  const { isAuthenticated } = useAuth();
  const [queryId, setQueryId] = useState('');
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');

  const orders = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('orders') || '[]');
    } catch {
      return [];
    }
  }, []);

  if (!isAuthenticated) return <Navigate to="/" replace />;

  const handleTrack = () => {
    setError('');
    const idStr = queryId.trim();
    if (!idStr) {
      setSelected(null);
      setError('Please enter a valid Order ID');
      return;
    }
    const found = orders.find((o) => String(o.id) === idStr);
    if (!found) {
      setSelected(null);
      setError('Order not found. Please check the Order ID.');
      return;
    }
    setSelected(found);
  };

  const computeProgressIndex = (order) => {
    const placedAt = new Date(order.date).getTime();
    const now = Date.now();
    const hours = Math.max(0, (now - placedAt) / 36e5);
    if (hours >= 72) return 4; // Delivered
    if (hours >= 48) return 3; // Out for Delivery
    if (hours >= 24) return 2; // Shipped
    if (hours >= 12) return 1; // Packed
    return 0; // Placed
  };

  const steps = [
    { label: 'Order Placed', icon: CheckCircle },
    { label: 'Packed', icon: Package },
    { label: 'Shipped', icon: Truck },
    { label: 'Out for Delivery', icon: MapPin },
    { label: 'Delivered', icon: Home },
  ];

  const eta = (order) => {
    const d = new Date(order.date);
    d.setDate(d.getDate() + 3);
    return d.toDateString();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Track Shipment</h1>
      <div className="p-4 rounded-xl border bg-white">
        <p className="text-gray-600 text-sm">Enter your Order ID to check current status.</p>
        <div className="mt-4 flex gap-3">
          <input
            className="flex-1 px-3 py-2 border rounded-lg"
            placeholder="Order ID (e.g., 1719900000000)"
            value={queryId}
            onChange={(e) => setQueryId(e.target.value)}
          />
          <button onClick={handleTrack} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Track</button>
        </div>
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      </div>

      {selected && (
        <div className="mt-6 p-5 bg-white rounded-xl border">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-sm text-gray-500">Order ID</div>
              <div className="font-semibold">{selected.id}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Placed</div>
              <div className="font-semibold">{new Date(selected.date).toLocaleString()}</div>
            </div>
          </div>

          <div className="mb-4 text-sm text-gray-600">Estimated Delivery: <span className="font-semibold text-gray-800">{eta(selected)}</span></div>

          {/* Timeline */}
          <div className="relative pl-6">
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200" />
            {steps.map((s, idx) => {
              const Icon = s.icon;
              const activeIdx = computeProgressIndex(selected);
              const isDone = idx <= activeIdx;
              return (
                <div key={s.label} className="flex items-start mb-6">
                  <div className={`mt-0.5 mr-3 ${isDone ? 'text-green-600' : 'text-gray-300'}`}>
                    {isDone ? <CheckCircle className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className={`font-medium ${isDone ? 'text-gray-900' : 'text-gray-500'}`}>{s.label}</div>
                    {idx === activeIdx && (
                      <div className="text-xs text-blue-600 mt-1">In progress…</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}




