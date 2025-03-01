import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../utils/api';

interface CartItem {
  product: string; // ID del producto
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Cargar el carrito desde el backend al iniciar sesión
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get('/cart');
        setCart(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCart();
  }, []);

  // Agregar un producto al carrito
  const addToCart = async (productId: string) => {
    try {
      const res = await api.post('/cart', { productId });
      setCart(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Eliminar un producto del carrito
  const removeFromCart = async (productId: string) => {
    try {
      const res = await api.delete(`/cart/${productId}`);
      setCart(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Limpiar el carrito
  const clearCart = async () => {
    try {
      const res = await api.delete('/cart');
      setCart(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de un CartProvider');
  return context;
};