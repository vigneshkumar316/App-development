// src/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice'; // Relative to src/pages

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
