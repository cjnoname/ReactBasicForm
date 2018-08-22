import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import registerServiceWorker from './registerServiceWorker';
import Routes from './routes';
import './global.css';
import { App } from './app';

const history = createBrowserHistory({ basename: document.getElementsByTagName('base')[0].getAttribute('href')! });
ReactDOM.render(
  <App history={history}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </App>,
  document.getElementById('root')
);

registerServiceWorker();
