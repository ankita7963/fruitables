import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    cart: {},
    error: null,
}

const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            console.log(action);
            console.log("Cart", state.cart);
            console.log("Action Payload:", action.payload);


            // const index = state.cart.findIndex(v => v.id === action.payload.id);
            const index = state.cart?.cart?.findIndex(v => v.id === action.payload.cart.id);
            console.log(index);

            if (index === undefined || index === -1) {
                if (!state.cart?.cart) {
                    // console.log("www");
                    state.cart = { userid: action.payload.userid, cart: [action.payload.cart] }
                } else {
                    // console.log("yyy");
                    state.cart?.cart?.push(action.payload.cart)
                }
            } else {
                console.log(state.cart.cart[index].qty);
                let sumQty = state.cart.cart[index].qty + action.payload.cart.qty;
                
                if (sumQty <= 10) {
                    state.cart.cart[index].qty += action.payload.cart.qty;
                }
            }

            //     // if (index === -1) {
            //     //     state.cart.push(action.payload);
            //     // } else {
            //     //     state.cart[index].qty += action.payload.qty;
            //     // }
        },


        incremetQty: (state, action) => {
            console.log(action);

            const index = state.cart.cart.findIndex((v) => v.id === action.payload)
            if (state.cart.cart[index].qty < 10) {
                state.cart.cart[index].qty++
            }
        },

        decrementQty: (state, action) => {

            const index = state.cart.cart.findIndex((v) => v.id === action.payload)
            if (state.cart.cart[index].qty > 1) {
                state.cart.cart[index].qty--
            }
        },

        upDateQty: (state, action) => {
            console.log(action);
            
            const index = state.cart.cart.findIndex((v) => v.id === action.payload.id)
            console.log(index);

            if (action.payload.qty <= 10) {
                state.cart.cart[index].qty = action.payload.qty
            }
        },


        removeQty: (state, action) => {
            console.log(action);
            
            const index = state.cart.cart.findIndex((v) => v.id === action.payload)
            state.cart.cart.splice(index, 1)
        }


    }
});

export const { addToCart, incremetQty, decrementQty, upDateQty, removeQty } = cartSlice.actions;
export default cartSlice.reducer;