import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constant/url";

const initialState = {
    isLoading: false,
    fav: [],
    error: null,
};

// -------- get fav --------
export const getFav = createAsyncThunk(
    "fav/getFav",
    async (id) => {
        console.log("hjhjgjhgjh")
        try {
            const response = await axios.get(`${BASE_URL}/fav?userid=${id}`)
            console.log(response.data[0]);

            return response.data[0];
        } catch (error) {
            console.log(error);
        }
    }
)


// -------- Add fav --------
export const addToFav = createAsyncThunk(
    "fav/addToFav",
    async (data) => {
        console.log(data);
        try {
            console.log(`${BASE_URL}/fav?userid=${data.userid}`);

            const response = await axios.get(`${BASE_URL}/fav?userid=${data.userid}`)
            console.log(response.data[0]);

            let userFav = response.data[0];

            if (response.data.length === 0) {
                const upData = { ...data, fav: [data.fav] }
                console.log(data, upData);


                const response = await axios.post(`${BASE_URL}/fav`, upData)
                console.log(response.data);

                return response.data;
            } else {
                const index = userFav?.fav?.findIndex(v => v === data.fav);
                console.log(index);

                if (index === undefined || index === -1) {
                    if (!userFav?.fav) {
                        userFav = { userid: data.userid, fav: [data.fav] }
                    } else {
                        userFav?.fav?.push(data.fav)
                    }
                }

                const response = await axios.put(`${BASE_URL}/fav/${userFav.id}`, userFav);
                console.log(response);

                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }
);

// -------- fav qty (delete) --------
export const removeFav = createAsyncThunk(
    'fav/removeFav',
    async (id) => {
        const response = await axios.get(`${BASE_URL}/fav?userid=ghjghj`);
        console.log(response.data[0]);

        let userFav = response.data[0];

        userFav.fav = userFav.fav.filter((v) => v != id);

        const response1 = await axios.put(`${BASE_URL}/fav/${userFav.id}`, userFav);
        console.log(response1);

        return response1.data;
    }
);


export const favSlice = createSlice({
    name: "fav",
    initialState,
    extraReducers: (builder) => {
        builder
            // get
            .addCase(getFav.fulfilled, (state, action) => {
                console.log(action);

                state.fav = action.payload;
            })

            // Upload
            .addCase(addToFav.fulfilled, (state, action) => {
                console.log(action);

                state.fav = action.payload;
            })

            // delete
            .addCase(removeFav.fulfilled, (state, action) => {
                console.log(action);

                state.fav = action.payload;
            })
    }

});

export default favSlice.reducer;