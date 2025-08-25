import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        incremet: (state) => {
            state.count += 1
        },
        decrement: (state) => {
            state.count -= 1
        }
    }
});

export const {incremet, decrement} = counterSlice.actions;
export default counterSlice.reducer;