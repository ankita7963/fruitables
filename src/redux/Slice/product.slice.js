import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    product: [],
    error: null,
};


// -------- GET all product --------
export const getAllProduct = createAsyncThunk(
    "product/getAllProduct",
    async () => {
        const response = await fetch("http://localhost:3000/product");
        return await response.json();
    }
);


// -------- Add Product --------
export const addProductData = createAsyncThunk(
    "product/addProductData",
    async (data) => {
        const response = await fetch("http://localhost:3000/product", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return await response.json();
    }
);


// -------- Update Product --------
export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async (data) => {
        const response = await fetch(`http://localhost:3000/product/` + data.id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return await response.json();
    }
);


// -------- Delete Product --------
export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (id) => {
        await fetch(`http://localhost:3000/product/${id}`, {
            method: "DELETE"
        });
        return id;
    }
);


// -------- Slice --------
export const productSlice = createSlice({
    name: "product",
    initialState,
    extraReducers: (builder) => {
        builder

            // Upload
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.product = action.payload;
                state.isLoading = false;
                state.error = null;
            })

            // Add
            .addCase(addProductData.fulfilled, (state, action) => {
                state.product.push(action.payload);
                state.isLoading = false;
                state.error = null;
            })

            // Update        
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.product.findIndex(pro => pro.id === action.payload.id);
                if (index !== -1) {
                    state.product[index] = action.payload;
                }
                state.isLoading = false;
                state.error = null;
            })

            // Delete
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.product = state.product.filter(pro => pro.id !== action.payload);
                state.isLoading = false;
                state.error = null;
            });
    },
});


export default productSlice.reducer;













