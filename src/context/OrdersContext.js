import React, { createContext, useContext, useState, useEffect } from 'react';
import useAxiosPrivate from '../hook/useAxiosPrivate';
import useAuth from '../hook/useAuth';
const OrdersContext = createContext();

export const OrderProvider = ({ children }) => {
    const axiosPrivate = useAxiosPrivate();
    const {auth}=useAuth()
    const [orders,setOrders]=useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosPrivate.get('/order');
                setOrders(res.data); // Update state with the data from the response
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [auth.id]);

    const addOrder=async(Order)=>{
        try {
            const res = await axiosPrivate.post('/order', {
              
                email: Order.email ,
                city: Order.city,
                street: Order.street,
                building: Order.building,
                phone:Order.phone,
                state:Order.state,
                amount:Order.amount,
                payment:Order.payment,
                books:Order.books     
                
                
             })
                setOrders(res.data)
          } catch (error) {
            console.error("Error fetching data:", error);
          }
    }
  return (
    <OrdersContext.Provider value={{ orders,addOrder }}>{children}</OrdersContext.Provider>
  );
};

export const useOrder= () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useGenre must be used within a CartProvider');
  }
  return context;
};
