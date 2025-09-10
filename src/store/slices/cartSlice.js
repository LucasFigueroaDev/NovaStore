import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [], 
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existing = state.items.find(item => item.id === product.id);
            if (existing) {
                existing.count += 1; // si ya existe, solo aumenta count
            } else {
                state.items.push({ ...product, count: 1 });
            }
        },
        increment: (state, action) => {
            const id = action.payload.id;
            const item = state.items.find(i => i.id === id);
            if (item) item.count += 1;
        },
        decrement: (state, action) => {
            const id = action.payload.id;
            const item = state.items.find(i => i.id === id);
            if (item) {
                item.count -= 1;
                if (item.count <= 0) {
                    // elimina item si count llega a 0
                    state.items = state.items.filter(i => i.id !== id);
                }
            }
        },
        removeFromCart: (state, action) => {
            const id = action.payload.id;
            state.items = state.items.filter(i => i.id !== id);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, increment, decrement, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
