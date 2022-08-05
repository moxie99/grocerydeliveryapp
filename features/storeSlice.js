import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  store: {
    id: null,
    imgUrl: null,
    title: null,
    rating: null,
    genre: null,
    address: null,
    quantities: null,
    long: null,
    lat: null,
    short_desc: null,
    groceries: null,
  },
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setStore: (state, action) => {
      state.store = action.payload;
    },
  },
});

export const { setStore } = storeSlice.actions;

export const selectStore = (state) => state.store.store;

export default storeSlice.reducer;
