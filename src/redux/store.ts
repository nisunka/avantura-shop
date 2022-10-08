import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import goods from './slices/goodsSlice';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    goods,
  },
});

// type of State
export type RootState = ReturnType<typeof store.getState>;
// type of Dispatch
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
