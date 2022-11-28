import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import cartReducer from "./redux/cartItem";

const customMiddleware = [
  ...getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
];

export const store = configureStore({
  reducer: {
    cartItems: cartReducer,
  },
  middleware: [...customMiddleware],
});
