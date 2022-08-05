import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import storeReducer from "./features/storeSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    store: storeReducer,
  },
});
