import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constant/url";


const initialState = {
    isLoading: false,
    cart: {},
    error: null,
}


// -------- get cart --------
export const getCart = createAsyncThunk(
    "cart1/getCart",
    async (id) => {
        console.log("hjhjgjhgjh")
        try {
            const response = await axios.get(`${BASE_URL}/cart?userid=${id}`)
            console.log(response.data[0]);

            return response.data[0];
        } catch (error) {
            console.log(error);
        }
    }
)


// -------- Add cart --------
export const addtoCart1 = createAsyncThunk(
    "cart1/addtoCart1",
    async (data) => {
        console.log(data);
        try {
            console.log(`${BASE_URL}/cart?userid=${data.userid}`);

            const response = await axios.get(`${BASE_URL}/cart?userid=${data.userid}`)
            console.log(response.data[0]);

            let userCart = response.data[0];

            if (response.data.length === 0) {
                const upData = { ...data, cart: [data.cart] }
                console.log(data, upData);


                const response = await axios.post(`${BASE_URL}/cart`, upData)
                console.log(response.data);

                return response.data;
            } else {
                const index = userCart?.cart?.findIndex(v => v.id === data.cart.id);
                console.log(index);

                if (index === undefined || index === -1) {
                    if (!userCart?.cart) {
                        userCart = { userid: data.userid, cart: [data.cart] }
                    } else {
                        userCart?.cart?.push(data.cart)
                    }
                } else {
                    let sumQty = userCart.cart[index].qty + data.cart.qty;
                    if (sumQty <= 10) {
                        userCart.cart[index].qty += data.cart.qty;
                    }
                }

                const response = await axios.put(`${BASE_URL}/cart/${userCart.id}`, userCart);
                console.log(response);

                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }
);


export const incremetQty1 = createAsyncThunk(
    'cart1/incremetQty1',
    async (id) => {

    }

);


// -------- Slice --------
export const cart1Slice = createSlice({
    name: "cart1",
    initialState,
    extraReducers: (builder) => {
        builder

            // get
            .addCase(getCart.fulfilled, (state, action) => {
                console.log(action);

                state.cart = action.payload;
            })

            // Upload
            .addCase(addtoCart1.fulfilled, (state, action) => {
                console.log(action);

                state.cart = action.payload;
            })

    }
})

export default cart1Slice.reducer;