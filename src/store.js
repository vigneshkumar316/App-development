// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Adjust the path if needed

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
