import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import cartReducer from "./redux/cartItem";
import authReducer from "./redux/auth";

const customMiddleware = [
  ...getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
];

export const store = configureStore({
  reducer: {
    cartItems: cartReducer,
    auth: authReducer,
  },
  middleware: [...customMiddleware],
});
