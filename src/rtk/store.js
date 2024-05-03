import { configureStore } from "@reduxjs/toolkit";
import products_slice from "./slices/products-slice";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";


export const store=configureStore({
    reducer:{
       cart:cartSlice
        
    }
})