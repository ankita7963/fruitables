import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constant/url";

const initialState = {
    isLoading: false,
    category: [],
    error: null,
};


// -------- Get All Categories --------
export const getAllCategory = createAsyncThunk(
    "category/getAllCategory",
    async () => {
        const response = await fetch(`${BASE_URL}/category`);
        const data = await response.json();
        return data;
    }
);


// -------- Add Category --------
export const addCategory = createAsyncThunk(
    "category/addCategory",
    async (data) => {
        const response = await fetch("http://localhost:3000/category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const dataRef = await response.json();
        return dataRef;
    }
);


// -------- Update Category --------
export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async (data) => {
        const response = await fetch(`http://localhost:3000/category/` + data.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const updated = await response.json();
        return updated;
    }
);


// -------- Delete Category --------
export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async (id) => {
        await fetch(`http://localhost:3000/category/${id}`, {
            method: 'DELETE',
        });
        return id;
    }
);


// -------- Slice --------
export const categorySlice = createSlice({
    name: "category",
    initialState,
    extraReducers: (builder) => {

        // Upload
        builder.addCase(getAllCategory.fulfilled, (state, action) => {
            state.category = action.payload;
            state.isLoading = false;
            state.error = null;
        });

        // Add
        builder.addCase(addCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.category = state.category.concat(action.payload);
            state.error = null;
        });

        // Update        
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            const index = state.category.findIndex(cat => cat.id === action.payload.id);
            console.log(index);
            if (index !== -1) {
                state.category[index] = action.payload;
            }
            state.error = null;
        });

        // Delete
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.category = state.category.filter(cat => cat.id !== action.payload);
            state.error = null;
        });
    },
});

export default categorySlice.reducer;
