import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthenticationView from './views/Auth.view.jsx';
import storage from './storage.js';

// to have another copy of the app id in case the storage gets corrupted
const savedAppId = localStorage.getItem('appId');
if (!storage.has('appId') && savedAppId) {
  storage.set('appId', savedAppId);
} else if (storage.has('appId') && !savedAppId) {
  localStorage.setItem('appId', storage.get('appId'));
}

export default class App extends PureComponent {

  render() {
    return (
      <Switch>
        <Route exact path='/' component={AuthenticationView} />
      </Switch>
    );
  }
}
