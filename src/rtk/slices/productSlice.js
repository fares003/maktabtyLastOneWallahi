import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../api/axios';
import useRefresh from '../../hook/useRefresh';

export const fetchProduct = createAsyncThunk(
    "productSlice/fetchProduct",
    async (id) => {
        const refresh = useRefresh();
        try {
            const accessToken = await refresh();
            console.log("access token: " + accessToken);
            const res = await axios.get(`/books/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return res.data;
        } catch (error) {
            console.error('Failed to fetch product:', error);
            throw error;
        }
    }
);

const productSlice = createSlice({
    name: "productSlice",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export const {} = productSlice.actions;
export default productSlice.reducer;
