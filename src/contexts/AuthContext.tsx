import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
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

  const login = (email: string, password: string): boolean => {
    // Simple authentication logic
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        login, 
        logout, 
        users: mockUsers 
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