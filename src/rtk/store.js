import { configureStore } from "@reduxjs/toolkit";
import Products from "../users/Products";
import products_slice from "./slices/products-slice";

export const store=configureStore({
    reducer:{
        products: products_slice
    }
})