import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type TGoods = {
  age: number;
  category: string;
  descr: string;
  detail: string;
  direction: string;
  id: string;
  imgUrl: string;
  name: string;
  price: number;
  rating: number;
};

// type TFetchGoodsArgs = Record<string, string>; // ключ:значение - строки

export type TSearchInputParams = {
  category: string;
  sortBy: string;
  order: string;
  search: string;
};

// делаем асинхронный экшн, переводим сюда бизнес логику
// <TCartItem[] - что функция возвращает, Record<string, string> - аргументы функции>
export const fetchGoods = createAsyncThunk<TGoods[], TSearchInputParams>(
  'goods/fetchGoodsStatus',
  async ({ category, sortBy, order, search }) => {
    const { data } = await axios.get<TGoods[]>(
      `https://631717b482797be77ff302e4.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);

export enum EStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface IGoodsSliceState {
  items: TGoods[];
  status: EStatus;
}

const initialState: IGoodsSliceState = {
  items: [],
  // вместо isLoading
  status: EStatus.LOADING, //  будет 3 статуса, чтобы было понимание, что рендерить: loading|success|error
};

export const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TGoods[]>) {
      state.items = action.payload;
    },
  },
  // расширенный reducers
  extraReducers: (builder) => {
    builder.addCase(fetchGoods.pending, (state, action) => {
      state.status = EStatus.LOADING;
      state.items = []; // перед запросом очищаем старые поиски
    });

    builder.addCase(fetchGoods.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = EStatus.SUCCESS;
    });

    builder.addCase(fetchGoods.rejected, (state, action) => {
      state.status = EStatus.ERROR;
      state.items = []; // чтобы не подгрузились продукты с прошлых запросов
    });
    // for js, not ts
    // extraReducers: {
    //   [fetchGoods.pending]: (state, action) => {
    //     state.status = 'loading';
    //     state.items = []; // перед запросом очищаем старые поиски
    //   },
    //   [fetchGoods.fulfilled]: (state, action) => {
    //     state.items = action.payload;
    //     state.status = 'success';
    //   },
    //   [fetchGoods.rejected]: (state, action) => {
    //     state.status = 'error';
    //     state.items = []; // чтобы не подгрузились продукты с прошлых запросов
    //   },
    // },
  },
});

export const { setItems } = goodsSlice.actions;

export default goodsSlice.reducer;
