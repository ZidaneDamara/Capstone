import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productSlice";
import cartReducer from "./reducers/cartSlice";
import authReducer from "./reducers/authSlice";
import searchReducer from "./reducers/searchSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    search: searchReducer,
  },
});
