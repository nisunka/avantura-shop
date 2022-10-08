import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TCartItem = {
  id: string;
  name: string;
  price: number;
  rating?: number;
  age?: number;
  imgUrl: string;
  category: string;
  direction: string;
  descr: string;
  detail: string;
  count: number;
};

interface ICartSliceState {
  totalPrice: number;
  items: TCartItem[];
}

const initialState: ICartSliceState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TCartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        }); // вычисляем сумму и объекты не дублируются, а ищутся по айди
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

// export const selectCart = (state: RootState) = state.cart // можно сделать селекторы, чтобы не каждый раз писать ()=> ф-ю в компонентах

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
