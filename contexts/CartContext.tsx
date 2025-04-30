import { createContext, useContext, useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: any;
  category?: string;
  brand?: string;
  rating?: number;
  reviews?: number;
  oldPrice?: number;
  description?: string;
  specifications?: Record<string, string>;
  colors?: string[];
  quantity?: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
  getTotalBeforeDiscount: () => number;
  getTotalDiscount: () => number;
  getShippingCost: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart(currentCart =>
      currentCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalBeforeDiscount = () => {
    return cart.reduce((total, item) => 
      total + ((item.oldPrice || item.price) * item.quantity), 0);
  };

  const getTotalDiscount = () => {
    return cart.reduce((total, item) => {
      if (!item.oldPrice) return total;
      return total + ((item.oldPrice - item.price) * item.quantity);
    }, 0);
  };

  const getShippingCost = () => {
    const subtotal = getTotalBeforeDiscount() - getTotalDiscount();
    return subtotal > 100 ? 0 : 10; // Free shipping over $100
  };

  const getTotalPrice = () => {
    const subtotal = getTotalBeforeDiscount();
    const discount = getTotalDiscount();
    const shipping = getShippingCost();
    const tax = (subtotal - discount) * 0.1;
    return subtotal - discount + shipping + tax;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemCount,
        getTotalPrice,
        getTotalBeforeDiscount,
        getTotalDiscount,
        getShippingCost,
      }}
    >
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