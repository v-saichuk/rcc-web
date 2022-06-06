import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { handleGetCourseInfo } from '../../store/Slices/CurrencyInfoSlice';
import { CourseLoader } from '../Loader/Loader';

import './CurrencyInfo.scss';

export const CurrencyInfo: FC = () => {
    const dispatch = useAppDispatch();
    const { courseInfo, isLoading } = useAppSelector((state) => state.CurrencyInfoSlice);

    useEffect(() => {
        dispatch(handleGetCourseInfo());
    }, [dispatch]);

    return (
        <div className="currency-info">
            {isLoading ? (
                <CourseLoader />
            ) : (
                <>
                    <div className="currency-info__content">
                        EUR: <strong>{Math.trunc(courseInfo.EUR * 100) / 100}</strong> UAH
                    </div>
                    <div className="currency-info__content">
                        USD: <strong>{Math.trunc(courseInfo.USD * 100) / 100}</strong> UAH
                    </div>
                </>
            )}
        </div>
    );
};
