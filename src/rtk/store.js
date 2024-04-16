import { configureStore } from "@reduxjs/toolkit";
import products_slice from "./slices/products-slice";


export const store=configureStore({
    reducer:{
        products: products_slice,
      
        
    }
})