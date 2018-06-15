import { combineReducers } from 'redux';
import localesReducer from './locales.reducer.js';

export default combineReducers({
  intl: localesReducer
});
