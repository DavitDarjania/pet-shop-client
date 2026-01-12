import { createSlice } from "@reduxjs/toolkit";
import type { IPet } from "../../interfaces/Pet";

const initialState: {
  whishlist: IPet[];
  counter: number;
} = {
  whishlist: [],
  counter: 0,
};

const whishlistSlice = createSlice({
  name: "whishlist",
  initialState,
  reducers: {
    addToWhishlist(state, action) {
      state.whishlist.push(action.payload);
      state.counter++;
    },
    removeFromWhishlist(state, action) {
      state.whishlist = state.whishlist.filter(
        (el) => el.petsId !== action.payload
      );
      state.counter--;
    },
  },
});
export default whishlistSlice.reducer;
export const { addToWhishlist, removeFromWhishlist } = whishlistSlice.actions;
