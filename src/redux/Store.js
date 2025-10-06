import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./Slice/counter.slice";
import categorySlice from "./Slice/category.slice";
import subCategorySlice from "./Slice/subcategory.slice";
import productSlice from "./Slice/product.slice";
import cartSlice from "./Slice/cart.slice";
import reviewSlice from "./Slice/review.slice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import cart1Slice from "./Slice/cart1.slice";
import favSlice from "./Slice/fav.slice";
import { couponApi } from "./api/couponApi";
import {categoryApi} from "./api/categoryApi";



//--- Redux Persist methods ---
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    count: counterSlice.reducer,
    // category: categorySlice,
    subCategory: subCategorySlice,
    product: productSlice,
    review: reviewSlice,
    cart: cartSlice,
    cart1: cart1Slice,
    fav: favSlice,
    [couponApi.reducerPath]: couponApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer

});
const persistedReducer = persistReducer(persistConfig, rootReducer)


//--- Persisting state with Redux Persist ---
// const createReduxStore = () => {
//     let persistor = persistStore(store)
//     return { store, persistor }
// }

// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
//             },
//         }).concat(
//             couponApi.middleware

//         ),
// });



const createReduxStore = () => {
    const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
                },
            }).concat(
                couponApi.middleware,
                categoryApi.middleware
            ),
    })

    let persistor = persistStore(store)
    return { store, persistor }
}



export default createReduxStore;