// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from '../../api/axios';

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAxiosPrivate from "../../hook/useAxiosPrivate";
import useRefresh from'../../hook/useRefresh'
export const fetchProducts = createAsyncThunk(
    "products_slice/fetchProducts",
    async () => {

        try {
            const axiosPrivate=useAxiosPrivate()
            const res = await axiosPrivate.get("/books");
            return res.data;
        } catch (error) {
            console.error('Failed to fetch products:', error);
            throw error;
        }
    }
  );
const products_slice=createSlice({
    initialState:[],
    name:"products_slice",
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            return action.payload;
        })
    }
})
export const {}=products_slice.actions;
export default products_slice.reducer;
