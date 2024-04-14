import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




export const fetchProducts =createAsyncThunk("product_slice/fetchProducts",async ()=> 
{
const res=await fetch("http://localhost:9000/items");
const data= await res.json();
return data;
})
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
