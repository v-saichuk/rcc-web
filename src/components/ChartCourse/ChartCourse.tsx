import { FC, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { getDynamicsCourse } from '../../store/Slices/ChartSlice';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import './ChartCourse.scss';

export const ChartCourse: FC = () => {
    const dispatch = useAppDispatch();
    const { dynamicsCourse } = useAppSelector((state) => state.ChartSlice);
    const { defaultValue } = useAppSelector((state) => state.CurrencyListSlice);

    const propsCurrensy = {
        iHave: defaultValue.iHave,
        iWillGet: defaultValue.iWillGet,
    };

    useEffect(() => {
        dispatch(getDynamicsCourse(propsCurrensy));
    }, [dispatch, defaultValue]);

    return (
        <div className="chart-course">
            <h3 className="chart-course__title">
                Course dynamics
                <span className="chart-course__money-to">
                    {defaultValue.iHave} <ChevronRightIcon /> {defaultValue.iWillGet}
                </span>
            </h3>
            <div className="chart-course__main">
                <ResponsiveContainer width="100%" aspect={5.0 / 1.3}>
                    <BarChart
                        data={dynamicsCourse}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                        barSize={20}>
                        <XAxis dataKey="date" scale="point" padding={{ left: 10, right: 10 }} />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="course" fill="#ffa633" background={{ fill: '#eee' }} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
