import { FC } from 'react';
import CopyrightIcon from '@material-ui/icons/Copyright';
import Tooltip from '@material-ui/core/Tooltip';

import './Footer.scss';

export const Footer: FC = () => (
    <footer className="footer">
        <CopyrightIcon />
        <Tooltip
            arrow
            title={<span className="footer__tooltip">React Currency Converter</span>}
            placement="top">
            <span>RCC</span>
        </Tooltip>
    </footer>
);
