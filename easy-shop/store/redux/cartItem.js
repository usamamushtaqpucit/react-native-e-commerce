import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartItems",
  initialState: {
    values: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const index = state.values.findIndex(
        (x) => x.id === action.payload.data.id
      );
      if (index !== -1) {
        let quantity = state.values[index].quantity + 1;
        const updatedItem = { ...action.payload.data, quantity: quantity };
        const updatedProducts = [...state.values];
        updatedProducts[index] = updatedItem;
        state.values = updatedProducts;
      } else {
        state.values.push(action.payload.data);
      }
    },
    removeProductFromCart: (state, action) => {
      state.values = state.values.filter(
        (cartItem) => cartItem.id !== action.payload.data.id
      );
    },
    removeOneProductFromCart: (state, action) => {
      const index = state.values.findIndex(
        (x) => x.id === action.payload.data.id
      );
      if (index !== -1) {
        let item = state.values[index];
        let quantity = item.quantity - 1;
        if (quantity > 0) {
          const updatedItem = {
            ...item,
            quantity: quantity,
          };
          const updatedProducts = [...state.values];
          updatedProducts[index] = updatedItem;
          state.values = updatedProducts;
        } else {
          state.values = state.values.filter(
            (cartItem) => cartItem.id !== action.payload.data.id
          );
        }
      }
    },
    clearCart: (state, action) => {
      state.values = [];
    },
  },
});

export const addToCart = cartSlice.actions.addToCart;
export const removeProductFromCart = cartSlice.actions.removeProductFromCart;
export const removeOneProductFromCart =
  cartSlice.actions.removeOneProductFromCart;
export const clearCart = cartSlice.actions.clearCart;

export default cartSlice.reducer;
