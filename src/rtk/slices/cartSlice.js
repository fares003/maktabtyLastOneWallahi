import { createSlice } from "@reduxjs/toolkit";
import useAxiosPrivate from "../../hook/useAxiosPrivate";
import useAuth from '../../hook/useAuth';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../api/axios";

export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async ({ userId, bookId }) => {
    
        console.log(userId)
        console.log(bookId)
        const response = await axiosPrivate.post(`/cart/${userId}`, { id:bookId });
        return response.data;
   
    }
  );
  const initialState = {
    cart: [], // Initialize cart as an empty array
    loading: false,
    error: null
  };
const cartSlice = createSlice({
    initialState,
    name: 'cartSlice',  
      reducers: {
  
        fetchCartStart: state => {

          state.loading = true;
          state.error = null;
        },
        fetchCartSuccess: (state, action) => {
          state.cart = action.payload;
          state.loading = false;
        },
        fetchCartFailure: (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
        addToCartSuccess: (state, action) => {
            state.cart = [...state.cart, action.payload];
          }
        // Add other reducers as needed
      
    }
    
  });
  export const { fetchCartStart, fetchCartSuccess, fetchCartFailure, addToCartSuccess } = cartSlice.actions;
  export const fetchCart = () => async dispatch => {

    dispatch(fetchCartStart());
    try {
        const axiosPrivatee=useAxiosPrivate()

      const response = await axiosPrivatee.get("/cart");
      dispatch(fetchCartSuccess(response.data));
    } catch (error) {
      dispatch(fetchCartFailure(error.message));
    }
  };
  
export default cartSlice.reducer