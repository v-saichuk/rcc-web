import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

import { Container } from './components/Containter/Container';

import './styles/index.scss';

ReactDOM.render(
    <Provider store={store}>
        <Container />
    </Provider>,
    document.getElementById('root'),
);
