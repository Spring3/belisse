import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createMemoryHistory';
import { addLocaleData } from 'react-intl';

import initStore from './store.js';
import './App.css';
import App from './App.jsx';
import IntlProvider from './components/intl/IntlProvider.jsx';

const history = createHistory();
const store = initStore(history);

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
);
