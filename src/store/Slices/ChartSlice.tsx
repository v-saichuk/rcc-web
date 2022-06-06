import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface ICurrency {
    iHave: string | null;
    iWillGet: string | null;
}

interface IdunamicCourse {
    date: string;
    course: number;
}

interface IinitialState {
    isLoading: boolean;
    error: string | null | unknown;
    dynamicsCourse: IdunamicCourse[];
}

export const getDynamicsCourse = createAsyncThunk<
    IdunamicCourse[],
    ICurrency,
    { rejectValue: string | null | unknown }
>('chart/getDynamicsCourse', async ({ iHave, iWillGet }, { rejectWithValue }) => {
    try {
        const responce = await fetch(`https://minfin.com.ua/api/coin/365/${iHave}/${iWillGet}`, {
            method: 'GET',
        });
        const { data } = await responce.json();
        return data;
    } catch (e) {
        return rejectWithValue(e);
    }
});

const initialState: IinitialState = {
    isLoading: false,
    error: null,
    dynamicsCourse: [],
};

const ChartSlice = createSlice({
    name: 'chart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDynamicsCourse.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getDynamicsCourse.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dynamicsCourse = action.payload;
            })
            .addCase(getDynamicsCourse.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default ChartSlice.reducer;
