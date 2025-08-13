import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProfilePage() {
  const { isAuthenticated, user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [msg, setMsg] = useState('');

  if (!isAuthenticated || !user) return <Navigate to="/" replace />;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: name.trim() });
    setMsg('Profile updated');
    setTimeout(() => setMsg(''), 2000);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <form onSubmit={onSubmit} className="space-y-4 bg-white p-4 rounded-xl border">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input className="w-full px-3 py-2 border rounded-lg" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input className="w-full px-3 py-2 border rounded-lg bg-gray-50" value={user.email} disabled />
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Save</button>
        {msg && <div className="text-green-600 text-sm">{msg}</div>}
      </form>
    </div>
  );
}


