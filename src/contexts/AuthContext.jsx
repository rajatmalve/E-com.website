import React, { createContext, useContext, useState } from 'react';

const mockUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@poscho.com',
    phone: '+15550000001',
    isAdmin: true,
    purchases: [
      {
        id: 1,
        date: '2025-01-10',
        items: [
          { name: 'Premium White Paper Roll', quantity: 2, price: 120 },
          { name: 'Recycled Brown Paper Roll', quantity: 1, price: 95 }
        ],
        total: 335
      }
    ]
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+15550000002',
    isAdmin: false,
    purchases: [
      {
        id: 2,
        date: '2025-01-08',
        items: [
          { name: 'Kraft Paper Roll', quantity: 3, price: 85 }
        ],
        total: 255
      }
    ]
  },
  {
    id: 3,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    phone: '+15550000003',
    isAdmin: false,
    purchases: [
      {
        id: 3,
        date: '2025-01-05',
        items: [
          { name: 'Glossy Paper Roll', quantity: 1, price: 140 },
          { name: 'Newsprint Paper Roll', quantity: 2, price: 75 }
        ],
        total: 290
      }
    ]
  }
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(mockUsers);

  const setLastLoginAt = (emailOrPhone) => {
    try {
      const ts = Date.now().toString();
      if (emailOrPhone) {
        localStorage.setItem(`last_login_at:${emailOrPhone}`, ts);
      }
      localStorage.setItem('last_login_at', ts);
    } catch {}
  };

  const getLastLoginAt = (email) => {
    try {
      const byEmail = email ? localStorage.getItem(`last_login_at:${email}`) : null;
      const generic = localStorage.getItem('last_login_at');
      const value = byEmail || generic;
      return value ? Number(value) : null;
    } catch {
      return null;
    }
  };

  const needsLoginForCheckout = (maxAgeDays = 30) => {
    if (!user) return true;
    const last = getLastLoginAt(user.email);
    if (!last) return true;
    const ms = maxAgeDays * 24 * 60 * 60 * 1000;
    return Date.now() - last > ms;
  };

  const findUserByIdentifier = (identifier) => {
    if (!identifier) return undefined;
    const id = identifier.trim().toLowerCase();
    const byEmail = users.find(u => (u.email || '').toLowerCase() === id);
    if (byEmail) return byEmail;
    // Normalize phone by stripping spaces/dashes
    const norm = id.replace(/[^+\d]/g, '');
    return users.find(u => (u.phone || '').replace(/[^+\d]/g, '') === norm);
  };

  const login = (identifier, password) => {
    const foundUser = findUserByIdentifier(identifier);
    if (foundUser) {
      const isValid = foundUser.password !== undefined ? (foundUser.password === password) : (password === 'password');
      if (isValid) {
        setUser(foundUser);
        setLastLoginAt(identifier);
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const signup = (name, email, password, phone) => {
    const exists = users.some(u => (
      (email && u.email && u.email.toLowerCase() === email.toLowerCase()) ||
      (phone && u.phone && u.phone.replace(/[^+\d]/g, '') === phone.replace(/[^+\d]/g, ''))
    ));
    if (exists) return false;

    const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = {
      id: nextId,
      name,
      email: email || '',
      phone: phone || '',
      password,
      isAdmin: false,
      purchases: []
    };
    const updated = [...users, newUser];
    setUsers(updated);
    setUser(newUser);
    setLastLoginAt(email || phone);
    return true;
  };

  const updateProfile = (updates) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    setUsers(prev => prev.map(u => (u.id === updatedUser.id ? updatedUser : u)));
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user,
        isAuthenticated: !!user,
        login,
        logout,
        signup,
        updateProfile,
        users,
        needsLoginForCheckout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


