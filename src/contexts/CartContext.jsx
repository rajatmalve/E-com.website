import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext.jsx';

const initialState = {
  items: [],
  wishlist: [],
  total: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.product.id);
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        };
      }
      const newItems = [...state.items, { ...action.product, quantity: 1 }];
      return {
        ...state,
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      };
    }
    case 'REMOVE_FROM_CART': {
      const filteredItems = state.items.filter(item => item.id !== action.productId);
      return {
        ...state,
        items: filteredItems,
        total: filteredItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      };
    }
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items
        .map(item => (item.id === action.productId ? { ...item, quantity: Math.max(0, action.quantity) } : item))
        .filter(item => item.quantity > 0);
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      };
    }
    case 'ADD_TO_WISHLIST': {
      if (state.wishlist.find(item => item.id === action.product.id)) {
        return state;
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.product],
      };
    }
    case 'REMOVE_FROM_WISHLIST': {
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.productId),
      };
    }
    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
        total: 0,
      };
    }
    case 'HYDRATE': {
      return {
        ...state,
        ...action.state,
      };
    }
    default:
      return state;
  }
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useAuth();

  const storageKey = user?.email ? `cart_${user.email}` : 'cart_guest';

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        const total = parsed.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        dispatch({ type: 'HYDRATE', state: { ...parsed, total } });
      } else {
        dispatch({ type: 'HYDRATE', state: initialState });
      }
    } catch (e) {
      console.error('Failed to hydrate cart from storage', e);
    }
  }, [user?.email]);

  useEffect(() => {
    try {
      const toStore = {
        items: state.items,
        wishlist: state.wishlist,
        total: state.total,
      };
      localStorage.setItem(storageKey, JSON.stringify(toStore));
    } catch (e) {
      console.error('Failed to persist cart to storage', e);
    }
  }, [state.items, state.wishlist, state.total, storageKey]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}


