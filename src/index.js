import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import 'bootstrap/dist/css/bootstrap.css';

import store from './store';
import { history } from './router';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

const root = document.getElementById('root');
const dom = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(dom, root);
registerServiceWorker();
