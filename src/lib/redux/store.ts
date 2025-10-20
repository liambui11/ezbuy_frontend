"use client";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import cartDrawerReducer from "./slices/cartDrawerSlice";

export const makeStore = () =>
  configureStore({
    reducer: { cart: cartReducer, cartDrawer: cartDrawerReducer },
  });
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
