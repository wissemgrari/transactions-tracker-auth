import { createSlice } from '@reduxjs/toolkit';

const darkMode = JSON.parse(localStorage.getItem('darkMode'));

const initialState = {
  darkMode: darkMode ? darkMode : false,
};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode);
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
