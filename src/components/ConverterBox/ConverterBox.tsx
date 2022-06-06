import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { onIHave, onIwillGet } from '../../store/Slices/CurrencyListSlice';
import { onChangeIhave, onChangeIwiilGet } from '../../store/Slices/CalculatorSlice';
import { CourseConverterBox } from '../Loader/Loader';

import { FormControl, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './ConverterBox.scss';

interface IConverterBox {
    title: string;
    defaultCurrencyValue: string | null;
    selectCurrency: any[];
}

export const ConverterBox: FC<IConverterBox> = ({
    title,
    selectCurrency,
    defaultCurrencyValue,
}) => {
    const dispatch = useAppDispatch();
    const [inputValues, setInputValue] = useState('');
    const { iHaveCount, iWillGetCount } = useAppSelector((state) => state.CalculatorSlice);
    const { defaultValue, isLoading } = useAppSelector((state) => state.CurrencyListSlice);
    const { course } = useAppSelector((state) => state.CourseSlice);

    useEffect(() => {
        const value = iHaveCount;
        dispatch(onChangeIhave({ value, course }));
    }, [course]);

    const handleValue = (newValue: string | null): void => {
        if (title === 'I have') {
            dispatch(onIHave(newValue));
        } else {
            dispatch(onIwillGet(newValue));
        }
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value ? Number(e.target.value.replace(/[^0-9.]/g, '')) : '';
        title === 'I have'
            ? dispatch(onChangeIhave({ value, course }))
            : dispatch(onChangeIwiilGet({ value, course }));
    };
    return (
        <div className="converter-box">
            <h4 className="converter-box__title">{title}</h4>
            <div className="converter-box__action">
                <input
                    className="converter-box__input"
                    type="text"
                    placeholder={isLoading ? 'Loading...' : 'Enter amount'}
                    onChange={handleOnChange}
                    maxLength={14}
                    value={isLoading ? '' : title === 'I have' ? iHaveCount : iWillGetCount}
                />

                <FormControl variant="outlined" className="converter-box__form-control">
                    <Autocomplete
                        autoHighlight={true}
                        disableClearable={true}
                        disabled={isLoading}
                        noOptionsText="No options"
                        popupIcon={<ExpandMoreIcon />}
                        value={defaultCurrencyValue}
                        onChange={(event: any, newValue: string | null) => {
                            handleValue(newValue);
                        }}
                        inputValue={inputValues}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={selectCurrency}
                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                </FormControl>
            </div>
            <span className="converter-box__currency">
                {isLoading ? (
                    <CourseConverterBox />
                ) : title === 'I have' ? (
                    '1 ' +
                    defaultValue.iHave +
                    ' => ' +
                    Math.trunc(course * 100) / 100 +
                    ' ' +
                    defaultValue.iWillGet
                ) : (
                    '1 ' +
                    defaultValue.iWillGet +
                    ' => ' +
                    Math.trunc((1 / course) * 100) / 100 +
                    ' ' +
                    defaultValue.iHave
                )}
            </span>
        </div>
    );
};
