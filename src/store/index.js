import { configureStore } from "@reduxjs/toolkit";
import { shopApi } from "../services/shopApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        [shopApi.reducerPath]: shopApi.reducer
    }, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shopApi.middleware)
})

setupListeners(store.dispatch)