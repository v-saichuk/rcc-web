import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface ICyrrencyList {
    code: string;
    name: string;
}

interface ICurrencyListSlice {
    isLoading: boolean;
    error: string | null | unknown;
    cyrrencyList: any[];
    defaultValue: {
        iHave: string | null;
        iWillGet: string | null;
    };
}

export const getCurrencyList = createAsyncThunk<
    ICyrrencyList[],
    undefined,
    { rejectValue?: string }
>('cyrrency/getCurrencyList', async (_, { rejectWithValue }) => {
    try {
        const responce = await fetch(
            'https://minfin.com.ua/api/currency/list/?locale=uk&type=money&start=0&cpp=113',
            { method: 'GET' },
        );
        const { list } = await responce.json();
        return list;
    } catch (e) {
        return rejectWithValue(e);
    }
});

const initialState: ICurrencyListSlice = {
    isLoading: false,
    error: null,
    defaultValue: {
        iHave: 'USD',
        iWillGet: 'UAH',
    },
    cyrrencyList: [],
};

const CurrencyListSlice = createSlice({
    name: 'cyrrency',
    initialState,
    reducers: {
        onIHave: (state, action) => {
            state.defaultValue.iHave = action.payload;
        },
        onIwillGet: (state, action) => {
            state.defaultValue.iWillGet = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrencyList.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCurrencyList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cyrrencyList = action.payload.map((el: ICyrrencyList) => el.code);
            })
            .addCase(getCurrencyList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default CurrencyListSlice.reducer;
export const { onIHave, onIwillGet } = CurrencyListSlice.actions;

// Получаем все коды валют которые есть на minfine
//  https://minfin.com.ua/api/currency/list/?locale=uk&type=money&start=0&cpp=50

// Получаем курс валют
// https://minfin.com.ua/api/coin/day/USD/UAH/2022-06-01

// https://minfin.com.ua/api/coin/365/usd/uah
