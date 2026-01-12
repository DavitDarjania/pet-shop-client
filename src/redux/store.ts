import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cart.slice";
import whishlistReducer from "./whishlist/whishlist.slice";

const rootReducer = combineReducers({
  cartReducer,
  whishlistReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
