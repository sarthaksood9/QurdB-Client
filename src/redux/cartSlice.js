import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingProduct = state.cart.find(item => item._id === product._id);

            if (existingProduct) {
                existingProduct.quantity += product.quantity;
            } else {
                state.cart.push({ ...product, quantity: product.quantity || 1 });
            }
        },
        setCart: (state, action) => {
            state.cart = action.payload;
        }
    }
});

export const { addToCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
