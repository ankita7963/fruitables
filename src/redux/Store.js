import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./Slice/counter.slice";
import  categorySlice  from "./Slice/category.slice";
import  subCategorySlice  from "./Slice/subcategory.slice";
import  productSlice  from "./Slice/product.slice";

export const store = configureStore({
    reducer: {
        count: counterSlice.reducer,
        category: categorySlice,
        subCategory: subCategorySlice,
        product: productSlice
    }

})