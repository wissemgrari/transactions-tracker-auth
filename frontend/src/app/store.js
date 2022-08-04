import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from '../features/transactions/transactionSlice';
import authReducer from '../features/auth/authSlice';
import darkModeReducer from '../features/global/darkModeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer,
    darkMode: darkModeReducer,
  },
});
