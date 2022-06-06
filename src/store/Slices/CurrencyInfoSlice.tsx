import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface IcourseInfo {
    USD: number;
    EUR: number;
}

interface IinitialState {
    isLoading: boolean;
    error: string | null | unknown;
    courseInfo: IcourseInfo;
}

export const handleGetCourseInfo = createAsyncThunk<
    IcourseInfo,
    undefined,
    { rejectValue?: string | null }
>('currencyInfo/handleGetCourseInfo', async (_, { rejectWithValue }) => {
    try {
        const responce = await fetch('https://minfin.com.ua/api/currency/ratelist/', {
            method: 'GET',
        });
        const {
            data: {
                rates: {
                    buy: { USD, EUR },
                },
            },
        } = await responce.json();
        return { USD, EUR };
    } catch (e) {
        return rejectWithValue(e);
    }
});

const initialState: IinitialState = {
    isLoading: false,
    error: null,
    courseInfo: {
        USD: 0,
        EUR: 0,
    },
};

const CurrencyInfoSlice = createSlice({
    name: 'currencyInfo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(handleGetCourseInfo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(handleGetCourseInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.courseInfo.USD = action.payload.USD;
                state.courseInfo.EUR = action.payload.EUR;
            })
            .addCase(handleGetCourseInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default CurrencyInfoSlice.reducer;
