import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import murmursReducer from './slices/murmursSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    murmurs: murmursReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
