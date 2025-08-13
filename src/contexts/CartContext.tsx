import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  category: string;
  specifications: {
    width: string;
    length: string;
    weight: string;
    material: string;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  wishlist: Product[];
  total: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; productId: number }
  | { type: 'UPDATE_QUANTITY'; productId: number; quantity: number }
  | { type: 'ADD_TO_WISHLIST'; product: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; productId: number }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
  wishlist: [],
  total: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
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
      const updatedItems = state.items.map(item =>
        item.id === action.productId
          ? { ...item, quantity: Math.max(0, action.quantity) }
          : item
      ).filter(item => item.quantity > 0);
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
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

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