import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import { shopApi } from "../services/shopApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../services/authApi";
import { profileApi } from "../services/profileApi";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        user: userReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer
    }, middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(shopApi.middleware)
        .concat(authApi.middleware)
        .concat(profileApi.middleware)
})

setupListeners(store.dispatch)