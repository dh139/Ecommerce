import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([
    {
      id: "forma-time",
      name: "FORMA TIME",
      category: "Horology",
      price: 249,
      color: "Space Graphite",
      quantity: 1,
      image: "/images/forma-time.jpg"
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const addToCart = (product, selectedColor = null, quantity = 1) => {
    const colorName = selectedColor?.name || product.colors?.[0]?.name || "Default";
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.id === product.id && item.color === colorName);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          color: colorName,
          quantity: quantity,
          image: product.image
        }
      ];
    });

    setToastMessage(`Acquired "${product.name}" into your reserve.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const removeFromCart = (id, color) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.color === color)));
  };

  const updateQuantity = (id, color, delta) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.id === id && item.color === color) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      setCartItems([]);
    }, 1500);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        subtotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        isCheckingOut,
        checkoutSuccess,
        setCheckoutSuccess,
        handleCheckout,
        toastMessage,
        setToastMessage
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
