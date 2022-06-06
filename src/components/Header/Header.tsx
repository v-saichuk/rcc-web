import { FC } from 'react';

import { Logo } from '../Logo/Logo';
import { CurrencyInfo } from '../CurrencyInfo/CurrencyInfo';

import './Header.scss';

export const Header: FC = () => (
    <header className="header">
        <Logo />
        <CurrencyInfo />
    </header>
);
