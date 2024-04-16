import { CreateApi,fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery =fetchBaseQuery({
    baseUrl:"http://localhost:5000/users/",
    credentials: "include",
    prepareHeaders: (Headers,{getState})=>{
        const token=getState().auth.token;
        if(token){
            Headers.set("authorization", `bearer ${token}`);
        }
        return Headers;
    }
})


const baseQueryWithReauth=async(args,api,extraOptions)=>{
    let result =await baseQuery(args,api,extraOptions)
    if(result?.error.originalStatus===403){
        console.log('sending refresh token')
    }
    const refreshResult=await baseQuery('/refresh')
}