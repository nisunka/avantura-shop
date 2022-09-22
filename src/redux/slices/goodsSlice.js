import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

// делаем асинхронный экшн, переводим сюда бизнес логику
export const fetchGoods = createAsyncThunk(
    'goods/fetchGoodsStatus',
    async ({ category, sortBy, order, search }) => {
        const { data } = await axios.get(`https://631717b482797be77ff302e4.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data
    }
)

const initialState = {
    items: [],
    // вместо isLoading
    status: 'loading', //  будет 3 статуса, чтобы было понимание, что рендерить: loading|success|error
};

export const goodsSlice = createSlice({
    name: 'goods',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        }
    },
    // расширенный reducers
    extraReducers: {
        [fetchGoods.pending]: (state, action) => {
            state.status = 'loading'
            state.items = [] // перед запросом очищаем старые поиски
        },
        [fetchGoods.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        },
        [fetchGoods.rejected]: (state, action) => {
            state.status = 'error'
            state.items = [] // чтобы не подгрузились продукты с прошлых запросов
        }
    }
});

export const { setItems } = goodsSlice.actions;

export default goodsSlice.reducer;
