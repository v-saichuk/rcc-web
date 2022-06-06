import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';

import { ConverterBox } from '../ConverterBox/ConverterBox';
import { getCourse } from '../../store/Slices/CourseSlice';
import { getCurrencyList } from '../../store/Slices/CurrencyListSlice';

import './Converter.scss';

const TODAYS_DATE = new Date().toLocaleDateString().split('.').reverse().join('-');

export const Converter: FC = () => {
    const dispatch = useAppDispatch();
    const { cyrrencyList, defaultValue } = useAppSelector((state) => state.CurrencyListSlice);

    useEffect(() => {
        // Получаем список кода валют
        dispatch(getCurrencyList());
    }, [dispatch]);

    useEffect(() => {
        // Получаем курс валюты
        dispatch(getCourse(defaultValue));
    }, [defaultValue, dispatch]);

    return (
        <div className="converter">
            <h3 className="converter__title">React Currency Converter</h3>
            <div className="converter__info">
                Source: <strong>minfin.com.ua</strong> Update date:
                <strong>{TODAYS_DATE}</strong>
            </div>
            <div className="converter__main">
                <ConverterBox
                    title="I have"
                    defaultCurrencyValue={defaultValue.iHave}
                    selectCurrency={cyrrencyList}
                />

                <svg className="converter__svg" fill="none">
                    <path d="M9.09189 1.72687L4.74054 6.93832H5.98378H24.1351" stroke="#000" />
                    <path d="M20.0432 16.2114L24.3946 11H23.1513H5" stroke="#000" />
                </svg>

                <ConverterBox
                    title="I will get"
                    defaultCurrencyValue={defaultValue.iWillGet}
                    selectCurrency={cyrrencyList}
                />
            </div>
        </div>
    );
};
