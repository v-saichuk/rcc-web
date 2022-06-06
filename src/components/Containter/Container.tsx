import { FC } from 'react';

import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Footer } from '../Footer/Footer';

import './Container.scss';

export const Container: FC = () => {
    return (
        <div className="container">
            <Header />
            <Main />
            <Footer />
        </div>
    );
};
