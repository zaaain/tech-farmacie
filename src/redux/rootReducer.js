import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice/authReducer";
import { productsSlice } from "./slices/products/productsReducer";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  products:productsSlice.reducer
});