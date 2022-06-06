import { createSlice } from '@reduxjs/toolkit';

interface IinitialState {
    iHaveCount: number | string;
    iWillGetCount: number | string;
}

const initialState: IinitialState = {
    iHaveCount: '1',
    iWillGetCount: '',
};

const CalculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        onChangeIhave: (state, action) => {
            state.iHaveCount = action.payload.value;
            state.iWillGetCount =
                Math.trunc(action.payload.value * action.payload.course * 100) / 100;
        },
        onChangeIwiilGet: (state, action) => {
            state.iWillGetCount = action.payload.value;
            state.iHaveCount =
                Math.trunc((action.payload.value / action.payload.course) * 100) / 100;
        },
    },
});

export default CalculatorSlice.reducer;
export const { onChangeIhave, onChangeIwiilGet } = CalculatorSlice.actions;
