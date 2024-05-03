import React, { createContext, useContext, useState, useEffect } from 'react';
import useAxiosPrivate from '../hook/useAxiosPrivate';
import useAuth from '../hook/useAuth';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const {auth}=useAuth()
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosPrivate.get(`/cart/${auth.id}`);
        console.log('Cart data:', response.data);
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, [auth.id]);
  
  const deleteItemFromCart=async(bookId)=>{
    try {
      await axiosPrivate.delete(`/cart/${auth.id}/${bookId}`);
      // Assuming the response contains the updated cart
      const response = await axiosPrivate.get(`/cart/${auth.id}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }
  const deleteAllCart=async()=>{
    try {
      await axiosPrivate.delete(`/cart/${auth.id}`);
      // Assuming the response contains the updated cart
      const response = await axiosPrivate.get(`/cart/${auth.id}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }

  const addItemToCart = async (itemId) => {
    try {
      await axiosPrivate.post(`/cart/${auth.id}`, { id: itemId });
      // Assuming the response contains the updated cart
      const response = await axiosPrivate.get(`/cart/${auth.id}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart,deleteItemFromCart,deleteAllCart }}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
