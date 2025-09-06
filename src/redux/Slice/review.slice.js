import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    review: [],
    error: null,
};


// -------- Get All Categories --------
export const getAllReviewData = createAsyncThunk(
    "review/getAllReviewData",
    async () => {
        const response = await fetch("http://localhost:3000/review");
        const data = await response.json();
        return data;
    }
);


// -------- Add Review --------
export const addReviewData = createAsyncThunk(
    "review/addReviewData",
    async (data) => {
        const response = await fetch("http://localhost:3000/review", {
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
export const updateReview = createAsyncThunk(
    "review/updateReview",
    async (data) => {
        const response = await fetch(`http://localhost:3000/review/` + data.id, {
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



// -------- Slice --------
export const reviewSlice = createSlice({
    name: "review",
    initialState,
    extraReducers: (builder) => {

        // pending
        builder.addCase(getAllReviewData.pending, (state) => {
            state.isLoading = true;
        })

        // Upload
        builder.addCase(getAllReviewData.fulfilled, (state, action) => {
            state.review = action.payload;
            state.isLoading = false;
            state.error = null;

        });


        // false
        builder.addCase(getAllReviewData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        // Add
        builder.addCase(addReviewData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.review = state.review.concat(action.payload);
            state.error = null;
        });

        // Update        
        builder.addCase(updateReview.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log("jhjkbhjkbjhkjkg ugyhkjhkjhkjh");
            const index = state.review.findIndex(rev => rev.id === action.payload.id);
            console.log("jhjkbhjkbjhkjkg",index);
            if (index !== -1) {
                state.review[index] = action.payload;
            }
            state.error = null;
        });


    },

});


export default reviewSlice.reducer;   //export reducer
