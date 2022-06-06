import { FC } from 'react';
import ContentLoader from 'react-content-loader';

export const CourseLoader: FC = () => (
    <ContentLoader height={30} viewBox="0 0 130 40">
        <rect x="0" y="0" rx="4" ry="4" width="100%" height="15" />
        <rect x="0" y="20" rx="3" ry="3" width="100%" height="15" />
    </ContentLoader>
);

export const CourseConverterBox: FC = () => (
    <ContentLoader height={15} viewBox="0 0 150 15">
        <rect x="0" y="0" rx="4" ry="4" width="100%" height="15" />
    </ContentLoader>
);
