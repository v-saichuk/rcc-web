import { FC } from 'react';
import { ChartCourse } from '../ChartCourse/ChartCourse';
import { Converter } from '../Converter/Converter';

import './Main.scss';

export const Main: FC = () => (
    <main className="main">
        <Converter />
        <ChartCourse />
    </main>
);
