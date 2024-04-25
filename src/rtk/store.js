import { configureStore } from "@reduxjs/toolkit";
import products_slice from "./slices/products-slice";
import productSlice from "./slices/productSlice";


export const store=configureStore({
    reducer:{
        products: products_slice,
        product: productSlice
        
    }
})