import { createSlice } from "@reduxjs/toolkit";
import type { IPet } from "../../interfaces/Pet";

interface ICart {
  cart: IPet[];
  counter: number;
}

const initialState: ICart = {
  cart: [],
  counter: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cart.push(action.payload);
      state.counter++;
    },
    removeFromCart(state, action) {
      const filteredState = state.cart.filter(
        (el) => el.petsId !== action.payload
      );
      state.cart = filteredState;
      state.counter--;
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;
