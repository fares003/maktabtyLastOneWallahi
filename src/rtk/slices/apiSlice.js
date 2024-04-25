import { createSlice } from "@reduxjs/toolkit";
import { CreateApi,createApi,fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery =fetchBaseQuery({
    baseUrl:"http://localhost:3500",
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
    
    const refreshResult=await baseQuery('/refresh',api,extraOptions)
    if(refreshResult?.data){
        const user=api.getState().auth.user
        api.dispatch(setCredentials([...refreshResult.data],user))
        result =await baseQuery(args,api,extraOptions)
    }else{
        api.dispatch(logOut())
    }
}
return result
}

export default apiSlice=createApi(
    {
    baseQuery:baseQueryWithReauth,
    endpoints:builder=>({})
    }
)