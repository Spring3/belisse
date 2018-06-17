import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthenticationView from './views/Auth.view.jsx';

export default class App extends PureComponent {

  render() {
    return (
      <Switch>
        <Route exact path='/' component={AuthenticationView} />
      </Switch>
    );
  }
}
