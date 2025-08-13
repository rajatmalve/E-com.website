import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  isAdmin: boolean;
  purchases: Array<{
    id: number;
    date: string;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
    total: number;
  }>;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signup: (name: string, email: string, password: string) => boolean;
  updateProfile: (updates: Partial<Pick<User, 'name'>>) => void;
  users: User[];
}

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@poscho.com',
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

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);

  const login = (email: string, password: string): boolean => {
    // Simple authentication logic
    const foundUser = users.find(u => u.email === email);
    if (foundUser) {
      // If user has a stored password (signed up), use it; otherwise default demo password
      const isValid = foundUser.password !== undefined ? (foundUser.password === password) : (password === 'password');
      if (isValid) {
        setUser(foundUser);
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const signup = (name: string, email: string, password: string): boolean => {
    // Prevent duplicate accounts
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return false;

    const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser: User = {
      id: nextId,
      name,
      email,
      password,
      isAdmin: false,
      purchases: []
    };
    const updated = [...users, newUser];
    setUsers(updated);
    setUser(newUser);
    return true;
  };

  const updateProfile = (updates: Partial<Pick<User, 'name'>>) => {
    if (!user) return;
    const updatedUser: User = { ...user, ...updates };
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
        users
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