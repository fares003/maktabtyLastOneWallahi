import React, { createContext, useContext, useState, useEffect } from 'react';
import useAxiosPrivate from '../hook/useAxiosPrivate';
import useAuth from '../hook/useAuth';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [priceAfterShipping,setPriceAfterShipping]=useState(0)
  const {auth}=useAuth()
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosPrivate.get(`/cart/${auth.id}`);
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, [auth.id]);
  const uniqueBooksMap = new Map();
  cart.forEach((book) => {
    if (uniqueBooksMap.has(book._id)) {
      // Increment the count if the book already exists in the map
      uniqueBooksMap.set(book._id, uniqueBooksMap.get(book._id) + 1);
    } else {
      // Add the book to the map with a count of 1 if it doesn't exist
      uniqueBooksMap.set(book._id, 1);
    }

  });
  const setPrice=(shipping)=>{
setPriceAfterShipping(totalSum+shipping)
  }


  const uniqueBooks = Array.from(uniqueBooksMap, ([id, count]) => ({
    ...cart.find((book) => book._id === id),
    count,
  }));
  const totalSum = uniqueBooks.reduce((sum, item) => {
    const itemPrice = item.sale
      ? item.price - (item.price * item.sale) / 100 // Calculate discounted price
      : item.price; // Use regular price if there's no sale
    return sum + itemPrice * item.count;
  }, 0); 
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
    <CartContext.Provider value={{cart, uniqueBooks, addItemToCart,deleteItemFromCart,deleteAllCart,totalSum,priceAfterShipping,setPrice,uniqueBooksMap }}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
