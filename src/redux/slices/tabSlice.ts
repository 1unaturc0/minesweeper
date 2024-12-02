import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTab: "main",
};

export const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    changeTab: (state, { payload: tab }) => {
      state.currentTab = tab;
    },
  },
});

export const { actions, reducer } = tabSlice;
