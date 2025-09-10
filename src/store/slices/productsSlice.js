import { createSlice } from "@reduxjs/toolkit";
import products from "../../data/products.json";
import categories from "../../data/categories.json";

export const productsSlice = createSlice({
    name: "products",
    initialState: {
        products,
        productSelected: {},
        categories,
        categorySelected: ''
    },
    reducers: {
        setCategorySelected: (state, action) => {
            state.categorySelected = action.payload
        },
        setProductSelected: (state, action) => {
            state.productSelected = action.payload;
        }
    }
});

export const { setCategorySelected, setProductSelected } = productsSlice.actions
export default productsSlice.reducer