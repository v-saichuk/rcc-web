import { FC } from 'react';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';

import './Logo.scss';

export const Logo: FC = () => (
    <h3 className="logo">
        <FlipCameraAndroidIcon style={{ color: '#ffa633' }} />
        <span className="logo__text">RCC</span>
    </h3>
);
