import apiSlice from "./apiSlice";

const authApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>{
        login:builder.mutation({
            query:Credentials({
                url:'/login',
                method:post
            })
        })
    }
})