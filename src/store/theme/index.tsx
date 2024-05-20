import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light', // default theme
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      AsyncStorage.setItem('appTheme', action.payload);
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      AsyncStorage.setItem('appTheme', state.theme);
    },
    loadTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme, toggleTheme, loadTheme } = themeSlice.actions;

export const loadThemeFromStorage = () => async (dispatch) => {
  const savedTheme = await AsyncStorage.getItem('appTheme');
  if (savedTheme) {
    dispatch(loadTheme(savedTheme));
  }
};

export default themeSlice.reducer;
