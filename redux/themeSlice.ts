import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleColorMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleColorMode } = themeSlice.actions;

export default themeSlice.reducer;