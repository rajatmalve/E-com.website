import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ShoppingCart, DollarSign, Package, Eye, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { Navigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { user, users } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);

  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  const stats = [
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Total Users',
      value: users.length.toString(),
      color: 'blue'
    },
    {
      icon: <ShoppingCart className="h-8 w-8" />,
      title: 'Total Orders',
      value: users.reduce((sum, u) => sum + u.purchases.length, 0).toString(),
      color: 'green'
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: 'Total Revenue',
      value: '$' + users.reduce((sum, u) => sum + u.purchases.reduce((s, p) => s + p.total, 0), 0).toLocaleString(),
      color: 'yellow'
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: 'Products Sold',
      value: users.reduce((sum, u) => sum + u.purchases.reduce((s, p) => s + p.items.reduce((i, item) => i + item.quantity, 0), 0), 0).toString(),
      color: 'purple'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      purple: 'bg-purple-500'
    };
    return colors[color] || colors.blue;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user.name}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md p-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center">
                <div className={`${getColorClasses(stat.color)} text-white p-3 rounded-lg`}>
                  {stat.icon}
                </div>
                <div className="ml-4">
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{u.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{u.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{u.purchases.length}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${u.purchases.reduce((sum, purchase) => sum + purchase.total, 0).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        u.isAdmin 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {u.isAdmin ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedUser(selectedUser === u.id ? null : u.id)}
                        className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Orders
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Purchase Details */}
        {selectedUser && (
          <motion.div
            className="bg-white rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Purchase History - {users.find(u => u.id === selectedUser)?.name}
              </h3>
            </div>
            <div className="p-6">
              {users.find(u => u.id === selectedUser)?.purchases.map((purchase) => (
                <div key={purchase.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-900">Order #{purchase.id}</h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {purchase.date}
                    </div>
                  </div>
                  <div className="space-y-2 mb-3">
                    {purchase.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">{item.name} × {item.quantity}</span>
                        <span className="font-medium text-gray-900">${item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-2 flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total:</span>
                    <span className="font-bold text-blue-600 text-lg">${purchase.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}


