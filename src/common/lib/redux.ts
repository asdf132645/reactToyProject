import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

export const storeRedux = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof storeRedux.getState>;
export type AppDispatch = typeof storeRedux.dispatch;