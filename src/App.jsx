import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';

import './App.css';
import actions from './actions/index.js';

class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidCatch(e) {
    console.error(e);
  }

  changeLocale = (e) => {
    this.props.dispatch(actions.changeLocale(e.target.value));
  }

  render() {
    return (
      <div className="bg-grey-light">
        <div className="text-center mt-6">
          <div>{this.props.intl.formatMessage({ id: 'app.counter' })}: {this.props.value}</div>
        </div>
        <div className="text-center mt-2">
          <label htmlFor="lang-select">{this.props.intl.formatMessage({ id: 'app.change-locale-text' })}</label>
          <select id="lang-select" onChange={this.changeLocale} name="locale" value={this.props.locale}>
            {this.props.locales.map((l, i) => <option key={i}>{l}</option>)}
          </select>
        </div>
        <div className="text-center mt-8 pb-8">
          <Link to="/test">
            {this.props.intl.formatMessage({ id: 'app.react-router-test' })}
          </Link>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  intl: intlShape.isRequired
};

const mapDispatchToProps = dispatch => ({ dispatch });
const mapStateToProps = state => ({
  locale: state.intl.locale,
  locales: state.intl.locales
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(App));
