import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const item = window.localStorage.getItem('cart');
      if (item) {
        const parsed = JSON.parse(item);
        if (Array.isArray(parsed)) {
          return parsed.filter(i => i && i.product && i.offer);
        }
      }
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.log(error);
    }
  }, [cartItems]);

  const addToCart = (product, offer, quantity = 1) => {
    setCartItems(prevItems => {
      // Find if we already have this offer in cart
      const existing = prevItems.find(item => item.offer.id === offer.id);
      if (existing) {
        return prevItems.map(item =>
          item.offer.id === offer.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, offer, quantity }];
    });
  };

  const removeFromCart = (offerId) => {
    setCartItems(prevItems => prevItems.filter(item => item.offer.id !== offerId));
  };

  const updateQuantity = (offerId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(offerId);
      return;
    }
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.offer.id === offerId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + ((item.offer?.price || 0) * (item.quantity || 1)), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount: cartItems.reduce((count, item) => count + item.quantity, 0)
    }}>
      {children}
    </CartContext.Provider>
  );
};
