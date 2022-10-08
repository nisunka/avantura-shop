import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum ESortProperty {
  RATING = 'rating',
  PRICE = 'price',
  M_PRICE = '-price',
}

type TSort = {
  name: string;
  sortProperty: ESortProperty;
};

export interface IFilterSliceState {
  searchValue: string;
  categoryId: number;
  sort: TSort;
}

const initialState: IFilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sort: {
    name: 'Сначала популярные',
    sortProperty: ESortProperty.RATING,
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<TSort>) {
      state.sort = action.payload;
    },
    setFilters(state, action: PayloadAction<IFilterSliceState>) {
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
